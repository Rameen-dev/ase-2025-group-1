import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const charityId = await getCharityId(req);

  try {
    // delete clothing items linked to request
    await prisma.clothingItems.updateMany({
      where: { donation_request_id: id },
      data: { status: "REJECTED" }
    });

    // delete donation request
    await prisma.donationRequest.update({
      where: { donation_request_id: id },
      data: { status: "REJECTED", answered_by: charityId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Decline delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete request" },
      { status: 500 }
    );
  }
}
