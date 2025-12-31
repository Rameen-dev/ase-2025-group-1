import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function requireAdmin(req: NextRequest) {
  const sessionToken = req.cookies.get("session")?.value;
  if (!sessionToken) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
    };
  }

  const session = await prisma.session.findUnique({
    where: { session_token: sessionToken },
    select: { actor_type: true, user_id: true },
  });

  if (!session || session.actor_type !== "ADMIN" || !session.user_id) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, admin_user_id: session.user_id };
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.res;

    const { searchParams } = new URL(req.url);
    const charityIdRaw = searchParams.get("charityId");

    // charityId behaviour:
    // - if present → must be a valid number, filter by that charity
    // - if absent → return items for ALL charities
    let where: any = {};

    if (charityIdRaw !== null) {
      const parsed = Number(charityIdRaw);
      if (Number.isNaN(parsed)) {
        return NextResponse.json(
          { error: "Missing/invalid charityId" },
          { status: 400 }
        );
      }
      where.owned_by = parsed;
    }

    const items = await prisma.clothingItems.findMany({
      where,
      orderBy: { clothing_id: "desc" },
      select: {
        clothing_id: true,
        type: true,
        size: true,
        condition: true,
        status: true,
        drafted_status: true,
        front_image_url: true,
        back_image_url: true,
        donation_request_id: true,
        donation_id: true,
        owned_by: true,
      },
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/admin/inventory ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}
