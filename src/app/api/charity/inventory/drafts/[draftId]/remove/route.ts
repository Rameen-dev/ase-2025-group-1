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

        const { itemIds } = (await req.json()) as { itemIds: number[] };
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json({ error: "No items provided" }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
            // remove draft links
            await tx.draftedItem.deleteMany({
                where: {
                    draft_id: draftId,
                    clothing_id: { in: itemIds },
                },
            });

            // update item status
            await tx.clothingItems.updateMany({
                where: { clothing_id: { in: itemIds } },
                data: { drafted_status: "AVAILABLE" },
            });
        });

        return NextResponse.json({ removed: itemIds.length });
    } catch (err) {
        console.error("POST /drafts/[draftId]/remove ERROR:", err);
        return NextResponse.json({ error: "Failed to remove items" }, { status: 500 });
    }
}
