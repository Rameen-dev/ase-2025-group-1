import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
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

        const items = await prisma.clothingItems.findMany({
            where: {
                owned_by: session.charity_id,
            },
            select: {
                clothing_id: true,
                type: true,
            },
        });

        return NextResponse.json(items);
    } catch (err) {
        console.error("GET /api/charity/inventory/chart ERROR:", err);
        return NextResponse.json(
            { error: "Failed to load inventory chart data" },
            { status: 500 }
        );
    }
}
