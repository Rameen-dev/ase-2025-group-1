import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (Number.isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid id" },
                { status: 400 }
            );
        }

        await prisma.donationRequest.delete({
            where: { donation_request_id: id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE /api/donation-requests/[id] ERROR:", error);
        return NextResponse.json(
            { error: "Failed to delete donation request" },
            { status: 500 }
        );
    }
}