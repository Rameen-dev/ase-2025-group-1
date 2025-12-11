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
