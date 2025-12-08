import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    // delete clothing items linked to request
    await prisma.clothingItems.deleteMany({
      where: { donation_request_id: id },
    });

    // delete donation request
    await prisma.donationRequest.delete({
      where: { donation_request_id: id },
    });

    return NextResponse.json({ message: "Donation request deleted" });
  } catch (error) {
    console.error("Decline delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete request" },
      { status: 500 }
    );
  }
}
