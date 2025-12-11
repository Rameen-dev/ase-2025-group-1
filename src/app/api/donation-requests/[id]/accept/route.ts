import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

//get charity id when answering donation requests
async function getCharityId(req: NextRequest): Promise<number | null> {
  //read the session token stored inside the browser cookie
  const token = req.cookies.get("session")?.value;

  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      session_token: token,
      expires_on: { gt: new Date() }, //looks for token that is not expired
    },
    select: { charity_id: true }, //return charity id WHERE session_token
  });

  return session?.charity_id ?? null;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const charityId = await getCharityId(req);

  try {
    const { itemIds } = await req.json();
    const requestId = Number(params.id);

    if (!Array.isArray(itemIds)) {
      return NextResponse.json({ error: "itemIds must be an array" }, { status: 400 });
    }

    // 1. Set status to APPROVED
    await prisma.donationRequest.update({
      where: { donation_request_id: requestId },
      data: { status: "APPROVED", answered_by: charityId }
    });

    // 2. Make clothing items that are left unchecked rejeceted
    const rejectResult = await prisma.clothingItems.updateMany({
      where: {
        donation_request_id: requestId,
        clothing_id: { notIn: itemIds },
      },
      data: {
        status: "REJECTED",
      },
    });
    console.log("Rejected items:", rejectResult);

    // 2.b If items are checked, make them approved
    const approveResult = await prisma.clothingItems.updateMany({
      where: {
        donation_request_id: requestId,
        clothing_id: { in: itemIds },
      },
      data: {
        status: "APPROVED",
        owned_by: charityId
      },
    });
    console.log("Approved items:", approveResult);

    return NextResponse.json({ success: true });
  }
  catch (err) {
    console.error("ACCEPT ERROR:", err);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
