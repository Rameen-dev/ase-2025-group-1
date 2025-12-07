import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { itemIds } = await req.json();
    const requestId = Number(params.id);

    if (!Array.isArray(itemIds)) {
      return NextResponse.json({ error: "itemIds must be an array" }, { status: 400 });
    }

    // 1. Set status to APPROVED
    await prisma.donationRequest.update({
      where: { donation_request_id: requestId },
      data: { status: "APPROVED" }
    });

    // 2. Delete unselected items
    await prisma.clothingItems.deleteMany({
      where: {
        donation_request_id: requestId,
        NOT: { clothing_id: { in: itemIds } }
      }
    });

    return NextResponse.json({ success: true });
  } 
  catch (err) {
    console.error("ACCEPT ERROR:", err);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
