import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // keep this path if correct

//fetches all clothing items inside a donation request
//used in the view donation request modal
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  //ensure ID is a valid number
  if (Number.isNaN(numericId)) {
    return NextResponse.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  //fetch clothing items linked to the donation request
  //only selected the needed fields about the item to display to user
  try {
    const items = await prisma.clothingItems.findMany({
      where: { donation_request_id: numericId },
      select: {
        clothing_id: true,
        type: true,
        size: true,
        condition: true,
        front_image_url: true,
        back_image_url: true,
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
