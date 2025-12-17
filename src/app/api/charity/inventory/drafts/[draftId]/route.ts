import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
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

        const draft = await prisma.draft.findFirst({
            where: {
                draft_id: draftId,
                charity_id: session.charity_id,
            },
            select: {
                draft_id: true,
                title: true,
                draft_status: true,
                DraftedItem: {
                    select: {
                        clothing_id: true,
                        ClothingItems: {
                            select: {
                                clothing_id: true,
                                type: true,
                                size: true,
                                condition: true,
                                front_image_url: true,
                                back_image_url: true,
                            },
                        },
                    },
                },
            },
        });

        if (!draft) {
            return NextResponse.json({ error: "Draft not found" }, { status: 404 });
        }

        const items = draft.DraftedItem
            .map((di) => di.ClothingItems)
            .filter(Boolean);

        return NextResponse.json({
            draft_id: draft.draft_id,
            title: draft.title,
            draft_status: draft.draft_status,
            items,
            itemCount: items.length,
        });
    } catch (err) {
        console.error("GET /api/charity/inventory/drafts/[draftId] ERROR:", err);
        return NextResponse.json({ error: "Failed to load draft" }, { status: 500 });
    }
}
