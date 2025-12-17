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

type DraftPostBody = {
    title?: string;
    items?: Array<number | { clothing_id: number }>;
};

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

        const body = (await req.json()) as DraftPostBody;
        const title = (body.title ?? "").trim();
        const items = body.items ?? [];

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

        const itemIds = Array.from(
            new Set(
                items
                    .map((x) => (typeof x === "number" ? x : x.clothing_id))
                    .filter((n): n is number => Number.isInteger(n))
            )
        );

        if (itemIds.length === 0) {
            return NextResponse.json({ error: "Invalid items payload" }, { status: 400 });
        }

        const charityId = session.charity_id;


        const found = await prisma.clothingItems.findMany({
            where: {
                clothing_id: { in: itemIds },
                owned_by: charityId,
                drafted_status: "AVAILABLE",
            },
            select: { clothing_id: true },
        });

        if (found.length !== itemIds.length) {
            const foundIds = new Set(found.map((f) => f.clothing_id));
            const invalidItemIds = itemIds.filter((id) => !foundIds.has(id));

            return NextResponse.json(
                { error: "Some items are not available or do not belong to your charity", invalidItemIds },
                { status: 400 }
            );
        }

        // Transaction: create draft + draft items + reserve clothing
        const draft = await prisma.$transaction(async (tx) => {
            const createdDraft = await tx.draft.create({
                data: {
                    charity_id: charityId,
                    title: title.trim(),
                    draft_status: "DRAFT",
                },
                select: {
                    draft_id: true,
                    charity_id: true,
                    title: true,
                    draft_status: true,
                },
            });

            await tx.draftedItem.createMany({
                data: itemIds.map((clothing_id) => ({
                    draft_id: createdDraft.draft_id,
                    clothing_id,
                })),
                skipDuplicates: true,
            });

            await tx.clothingItems.updateMany({
                where: { clothing_id: { in: itemIds } },
                data: { drafted_status: "ALLOCATED" },
            });

            return createdDraft;
        });

        return NextResponse.json(draft, { status: 201 });
    } catch (err) {
        console.error("POST /api/charity/inventory/drafts ERROR:", err);
        return NextResponse.json({ error: "Failed to create draft" }, { status: 500 });
    }
}