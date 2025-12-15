import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Gets the currently logged-in charity from the session cookie
async function getCharityId(req: NextRequest): Promise<number | null> {
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
  const requestId = Number(params.id);

  // Make sure only charities can decline
  const charityId = await getCharityId(req);
  if (!charityId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    // Check the request exists + is still pending
    const request = await prisma.donationRequest.findUnique({
      where: { donation_request_id: requestId },
      select: { donation_request_id: true, status: true },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (request.status !== "PENDING") {
      return NextResponse.json(
        { error: "Only pending requests can be declined" },
        { status: 400 }
      );
    }

    // Transaction: update items + request + audit event together
    await prisma.$transaction(async (tx) => {
      // Reject all items linked to that request
      const rejectedItems = await tx.clothingItems.updateMany({
        where: { donation_request_id: requestId },
        data: { status: "REJECTED" },
      });

      // Mark the request as rejected + store which charity answered it
      await tx.donationRequest.update({
        where: { donation_request_id: requestId },
        data: {
          status: "REJECTED",
          answered_by: charityId,
        },
      });

      // Audit log (this will show in donor Recent Activity)
      await tx.auditEvent.create({
        data: {
          actor_type: "CHARITY",
          actor_charity_id: charityId,
          event_type: "REQUEST_REJECTED",
          donation_request_id: requestId,
          metadata: {
            rejectedItemsCount: rejectedItems.count,
          },
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Decline ERROR:", error);
    return NextResponse.json(
      { error: "Failed to decline request" },
      { status: 500 }
    );
  }
}
