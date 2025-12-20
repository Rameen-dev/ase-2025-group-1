import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: { draftId: string } }
) {
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

        const draftId = Number(params.draftId);
        if (!Number.isInteger(draftId)) {
            return NextResponse.json({ error: "Invalid draft id" }, { status: 400 });
        }

        const body = await req.json();
        const itemIds: number[] = body.itemIds;

        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json({ error: "No items provided" }, { status: 400 });
        }

        const draft = await prisma.draft.findFirst({
            where: {
                draft_id: draftId,
                charity_id: session.charity_id,
                draft_status: "DRAFT",
            },
            select: { draft_id: true },
        });

        if (!draft) {
            return NextResponse.json({ error: "Draft not found" }, { status: 404 });
        }

        await prisma.$transaction(async (tx) => {
            const validItems = await tx.clothingItems.findMany({
                where: {
                    clothing_id: { in: itemIds },
                    owned_by: session.charity_id,
                    drafted_status: "AVAILABLE",
                },
                select: { clothing_id: true },
            });

            if (validItems.length !== itemIds.length) {
                throw new Error("Some items are not available");
            }

            // Insert DraftedItem rows
            await tx.draftedItem.createMany({
                data: validItems.map((i) => ({
                    draft_id: draftId,
                    clothing_id: i.clothing_id,
                })),
                skipDuplicates: true, // safety net
            });

            // Update clothing status
            await tx.clothingItems.updateMany({
                where: {
                    clothing_id: { in: itemIds },
                },
                data: {
                    drafted_status: "ALLOCATED",
                },
            });
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("POST /drafts/[draftId]/add ERROR:", err);
        return NextResponse.json(
            { error: "Failed to add items to draft" },
            { status: 500 }
        );
    }
}
