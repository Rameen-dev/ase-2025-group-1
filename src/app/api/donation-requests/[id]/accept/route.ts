import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

async function getCharityId(req: NextRequest): Promise<number | null> {
  // Here we read the session cookie from the request
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      session_token: token,
      revoked_on: null,
      expires_on: { gt: new Date() },
      actor_type: "CHARITY",
      charity_id: { not: null },
    },
    select: { charity_id: true },
  });

  return session?.charity_id ?? null;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const charityId = await getCharityId(req);

  // If charity isn't logged in, block access
  if (!charityId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    // Read request body
    const body = await req.json();
    const itemIds = body?.itemIds;

    // Read requestId from URL and convert to number
    const requestId = Number(params.id);

    // Validate basic input
    if (!Number.isFinite(requestId) || requestId <= 0) {
      return NextResponse.json({ error: "Invalid request id" }, { status: 400 });
    }

    if (!Array.isArray(itemIds)) {
      return NextResponse.json({ error: "itemIds must be an array" }, { status: 400 });
    }

    // OPTIONAL: clean itemIds so they're only numbers (prevents weird inputs)
    const cleanedItemIds = itemIds
      .map((x: any) => Number(x))
      .filter((n: number) => Number.isFinite(n));

    // If charity approved but selected nothing, allow it (means everything rejected)
    // We use a transaction so everything succeeds or everything fails together
    const result = await prisma.$transaction(async (tx) => {
      // Here we find the donation request
      const request = await tx.donationRequest.findUnique({
        where: { donation_request_id: requestId },
        select: { created_by: true, status: true },
      });

      if (!request) {
        // Throwing inside transaction will cancel all changes
        throw new Error("REQUEST_NOT_FOUND");
      }

      // Here we prevent accepting a request twice
      if (request.status !== "PENDING") {
        throw new Error("REQUEST_ALREADY_ANSWERED");
      }

      // Make sure the selected items belong to this donation request
      // This stops someone sending random itemIds from another request.
      if (cleanedItemIds.length > 0) {
        const items = await tx.clothingItems.findMany({
          where: {
            donation_request_id: requestId,
            clothing_id: { in: cleanedItemIds },
          },
          select: { clothing_id: true },
        });

        // If the count doesn't match, it means some itemIds aren't in this request
        if (items.length !== cleanedItemIds.length) {
          throw new Error("INVALID_ITEM_IDS");
        }
      }

      // We update the donation request, mark it approved + record who answered
      await tx.donationRequest.update({
        where: { donation_request_id: requestId },
        data: {
          status: "APPROVED",
          answered_by: charityId,
        },
      });

      // We then create a donation record (links donor + charity + request)
      const donation = await tx.donations.create({
        data: {
          donation_request_id: requestId,
          created_by: request.created_by,
          accepted_by: charityId,
        },
      });

      // We reject items that were NOT selected
      const rejectResult = await tx.clothingItems.updateMany({
        where: {
          donation_request_id: requestId,
          clothing_id: { notIn: cleanedItemIds },
        },
        data: {
          status: "REJECTED",
        },
      });

      // Here we approve items that WERE selected
      const approveResult = await tx.clothingItems.updateMany({
        where: {
          donation_request_id: requestId,
          clothing_id: { in: cleanedItemIds },
        },
        data: {
          status: "APPROVED",
          owned_by: charityId,
          donation_id: donation.donation_id,
        },
      });

      // Here we log the action in AuditEvent
      await tx.auditEvent.create({
        data: {
          actor_type: "CHARITY",
          actor_charity_id: charityId,
          event_type: "REQUEST_APPROVED",
          donation_request_id: requestId,
          donation_id: donation.donation_id,
          metadata: {
            approvedItemIds: cleanedItemIds,
            approvedCount: approveResult.count,
            rejectedCount: rejectResult.count,
          },
        },
      });

      // We return anything useful to the frontend
      return {
        donationId: donation.donation_id,
        approvedCount: approveResult.count,
        rejectedCount: rejectResult.count,
      };
    });

    // If we reach here, transaction succeeded
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    console.error("ACCEPT ERROR:", err);

    // Map transaction errors to friendly messages
    const message = String(err?.message || "");

    if (message.includes("REQUEST_NOT_FOUND")) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (message.includes("REQUEST_ALREADY_ANSWERED")) {
      return NextResponse.json({ error: "Request already answered" }, { status: 409 });
    }

    if (message.includes("INVALID_ITEM_IDS")) {
      return NextResponse.json({ error: "Some itemIds do not belong to this request" }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
