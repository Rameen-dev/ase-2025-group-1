import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

//retrieves user id from Session table using the session cookie token
async function getUserId(req: NextRequest): Promise<number | null> {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      session_token: token,
      revoked_on: null,
      expires_on: { gt: new Date() },
      actor_type: "DONOR",
      user_id: { not: null },
    },
    select: { user_id: true },
  });

  return session?.user_id ?? null;
}
//returns all donation requests for the dashboard, 
//including a count of how many clothing items per request

function formatTimeAgo(createdOn: Date): string {
  const seconds = Math.floor((Date.now() - createdOn.getTime()) / 1000);

  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = seconds;
  let i = 0;

  while (i < units.length && value >= units[i][0]) {
    value = Math.floor(value / units[i][0]);
    i++;
  }

  const label = units[i][1];
  return value === 0
    ? "just now"
    : `${value} ${label}${value > 1 ? "s" : ""} ago`;
}

function toDashboardRequest(r: { created_on: Date } & Record<string, unknown>) {
  return { ...r, createdAgo: formatTimeAgo(r.created_on) };
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    // If user not logged in, stop
    if (userId === null) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch the donor’s requests and include a count of items
    const requests = await prisma.donationRequest.findMany({
      where: { created_by: userId },
      orderBy: { created_on: "desc" },
      include: {
        _count: { select: { ClothingItems: true } },
      },
    });

    return NextResponse.json(requests.map(toDashboardRequest));
  } catch (error) {
    console.error("GET /api/donation-requests ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch donation requests" }, { status: 500 });
  }
}


// creates a new donation request, as well as clothing items
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, items } = body;

    // Basic validation
    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one clothing item is required" },
        { status: 400 }
      );
    }

    // Ensure images exist for each item
    for (const item of items) {
      if (!item.front_image_url || !item.back_image_url) {
        return NextResponse.json(
          { error: "Each item must include front and back images" },
          { status: 400 }
        );
      }
    }

    // Get logged-in donor ID
    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 3) Use a transaction so everything succeeds or fails together
    const donationRequest = await prisma.$transaction(async (tx) => {

      // Create the donation request
      const reqRow = await tx.donationRequest.create({
        data: {
          title: title.trim(),
          status: "PENDING",
          created_by: userId,
        },
      });

      // Create all clothing items linked to the request
      await tx.clothingItems.createMany({
        data: items.map((item) => ({
          donation_request_id: reqRow.donation_request_id,
          type: item.type,
          size: item.size,
          condition: item.condition,
          donor_id: userId,
          donation_id: null,
          owned_by: null,
          front_image_url: item.front_image_url,
          back_image_url: item.back_image_url,
        })),
      });

      // Log AuditEvent (this powers donor activity + analytics)
      await tx.auditEvent.create({
        data: {
          actor_type: "DONOR",
          actor_user_id: userId,
          event_type: "REQUEST_CREATED",
          donation_request_id: reqRow.donation_request_id,
          metadata: {
            title: reqRow.title,
            itemCount: items.length,
          },
        },
      });

      const full = await tx.donationRequest.findUnique({
        where: { donation_request_id: reqRow.donation_request_id },
        include: {
          _count: { select: { ClothingItems: true } },
        },
      });

      if (!full) throw new Error("Failed to fetch created donation request");
      return full;
    });

    // Return created request
    return NextResponse.json(toDashboardRequest(donationRequest), { status: 201 });

  } catch (error) {
    console.error("POST /api/donation-requests ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create donation request" },
      { status: 500 }
    );
  }
}
