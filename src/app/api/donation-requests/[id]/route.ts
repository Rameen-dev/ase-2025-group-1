import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//deletes a donation request, including all items within it
export async function DELETE(
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