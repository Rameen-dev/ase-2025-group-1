import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    // delete clothing items linked to request
    await prisma.clothingItems.updateMany({
      where: { donation_request_id: id },
      data: { status: "REJECTED" }
    });

    // delete donation request
    await prisma.donationRequest.update({
      where: { donation_request_id: id },
      data: { status: "REJECTED" }
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
