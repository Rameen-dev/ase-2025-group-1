import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//fetches all clothing items inside a donation request
//used in the view donation request modal
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
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
            },
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error(
            "GET /api/donation-requests/[id]/items ERROR:",
            error
        );
        return NextResponse.json(
            { error: "Failed to load clothing items" },
            { status: 500 }
        );
    }
}