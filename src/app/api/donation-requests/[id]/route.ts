import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
        return NextResponse.json(
            { error: "Invalid id" },
            { status: 400 }
        );
    }

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