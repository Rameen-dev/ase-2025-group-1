import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // keep this path if correct

// GET /api/donation-requests/:id/items
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const items = await prisma.clothingItems.findMany({
      where: { donation_request_id: Number(params.id) },
      select: {
        clothing_id: true,
        type: true,
        size: true,
        condition: true,
        front_image_url: true, // MUST be returned
        back_image_url: true,  // MUST be returned
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error loading clothing items:", error);
    return NextResponse.json(
      { error: "Failed to load items" },
      { status: 500 }
    );
  }
}
