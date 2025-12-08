import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ============================================================
   GET — Returns all items in a donation request (WITH IMAGES)
   Fixes your modal not showing images
============================================================ */
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const items = await prisma.clothingItems.findMany({
            where: { donation_request_id: numericId },
            select: {
                clothing_id: true,
                type: true,
                size: true,
                condition: true,
                front_image_url: true,   // REQUIRED FOR IMAGE DISPLAY
                back_image_url: true,    // REQUIRED FOR IMAGE DISPLAY
            },
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error("GET /api/donation-requests/[id] ERROR:", error);
        return NextResponse.json({ error: "Failed to load items" }, { status: 500 });
    }
}

/* ============================================================
   DELETE — Used for decline request
   Removes entire request + related clothing records
============================================================ */
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const numericId = Number(id);

    //ensure ID is a valid number
    if (Number.isNaN(numericId)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    //place delete request in a transaction
    //ensuring that request plus all items data is deleted and there is no left over values
    try {
        await prisma.$transaction([
            prisma.clothingItems.deleteMany({
                where: { donation_request_id: numericId },
            }),
            prisma.donationRequest.delete({
                where: { donation_request_id: numericId },
            }),
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/donation-requests/[id] ERROR:", error);
        return NextResponse.json(
            { error: "Failed to delete donation request" },
            { status: 500 }
        );
    }
}
