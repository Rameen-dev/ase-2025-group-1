import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const updated = await prisma.donationRequest.update({
      where: { donation_request_id: id },
      data: { status: "APPROVED" },
    });

    return NextResponse.json({ message: "Request approved", updated });
  } catch (error) {
    console.error("Accept error:", error);
    return NextResponse.json(
      { error: "Failed to approve request" },
      { status: 500 }
    );
  }
}
