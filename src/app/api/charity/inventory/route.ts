import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        //get seesion token from server
        const sessionToken = req.cookies.get("session")?.value;
        if (!sessionToken) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        //get charity id from session table "where sessionToken"
        const session = await prisma.session.findUnique({
            where: { session_token: sessionToken },
            select: { charity_id: true },
        });

        if (!session?.charity_id) {
            return NextResponse.json({ error: "Not a charity session" }, { status: 403 });
        }

        //find items where owned_by === charity_id
        const items = await prisma.clothingItems.findMany({
            where: { owned_by: session.charity_id, drafted_status: "AVAILABLE" },
            orderBy: { clothing_id: "desc" },
            select: {
                clothing_id: true,
                type: true,
                size: true,
                condition: true,
                status: true,
                drafted_status: true,
                front_image_url: true,
                back_image_url: true,
            },
        });

        return NextResponse.json(items);
    } catch (err) {
        console.error("GET /api/charity/inventory ERROR:", err);
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }
}
