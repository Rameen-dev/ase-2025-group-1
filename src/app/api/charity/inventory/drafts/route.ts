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
        const drafts = await prisma.draft.findMany({
            where: { charity_id: session.charity_id, draft_status: "DRAFT" },
            orderBy: { draft_id: "desc" },
            select: {
                draft_id: true,
                charity_id: true,
                title: true,
                draft_status: true,
            },
        });

        return NextResponse.json(drafts);
    } catch (err) {
        console.error("GET /api/charity/inventory/drafts ERROR:", err);
        return NextResponse.json({ error: "Failed to fetch drafts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
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

        const body = await req.json();
        const { title, items } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "At least one clothing item is required" },
                { status: 400 }
            );
        }

    }

}