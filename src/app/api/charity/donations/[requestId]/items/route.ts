import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ClothingItemDTO = {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
    status: string;
    front_image_url: string | null;
    back_image_url: string | null;
};

export async function GET(req: NextRequest, context: any) {
    const { requestId } = await context.params;
    const id = Number(requestId);

    if (!Number.isInteger(id)) {
        return NextResponse.json({ error: "Invalid request id" }, { status: 400 });
    }
    try {
        const sessionToken = req.cookies.get("session")?.value;
        if (!sessionToken) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const session = await prisma.session.findUnique({
            where: { session_token: sessionToken },
            select: { charity_id: true },
        });

        if (!session?.charity_id) {
            return NextResponse.json({ error: "Not a charity session" }, { status: 403 });
        }

        const requestId = Number(id);
        if (!Number.isInteger(requestId)) {
            return NextResponse.json({ error: "Invalid request id" }, { status: 400 });
        }

        const request = await prisma.donationRequest.findUnique({
            where: { donation_request_id: requestId },
            select: { donation_request_id: true },
        });

        if (!request) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        const items = await prisma.clothingItems.findMany({
            where: { donation_request_id: requestId },
            select: {
                clothing_id: true,
                type: true,
                size: true,
                condition: true,
                status: true,
                front_image_url: true,
                back_image_url: true,
            },
            orderBy: { clothing_id: "asc" },
        });

        const unique = Array.from(
            new Map(items.map((i) => [i.clothing_id, i])).values()
        ) as ClothingItemDTO[];

        return NextResponse.json(unique);
    } catch (error) {
        console.error("GET /api/charity/donations/[requestId]/items ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}
