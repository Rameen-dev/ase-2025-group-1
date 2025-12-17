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

        const charityId = session.charity_id;

        const result = await prisma.$transaction(async (tx) => {
            // Ensure draft exists + owned by this charity + is DRAFT
            const draft = await tx.draft.findFirst({
                where: { draft_id: draftId, charity_id: charityId, draft_status: "DRAFT" },
                select: { draft_id: true },
            });

            if (!draft) {
                throw new Error("Draft not found or not cancellable");
            }

            //get clothing ids in draft
            const drafted = await tx.draftedItem.findMany({
                where: { draft_id: draftId },
                select: { clothing_id: true },
            });

            const clothingIds = drafted.map((d) => d.clothing_id);

            //restore items to AVAILABLE
            if (clothingIds.length > 0) {
                await tx.clothingItems.updateMany({
                    where: { clothing_id: { in: clothingIds } },
                    data: { drafted_status: "AVAILABLE" },
                });
            }

            //remove draft links
            await tx.draftedItem.deleteMany({
                where: { draft_id: draftId },
            });

            //change draft status to "Cancelled"
            await tx.draft.update({
                where: { draft_id: draftId },
                data: { draft_status: "CANCELLED" }, // make sure enum supports this
            });

            return { restoredCount: clothingIds.length };
        });

        return NextResponse.json({ ok: true, ...result });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("POST /api/charity/inventory/drafts/[draftId]/cancel ERROR:", err);
        return NextResponse.json(
            { error: err?.message ?? "Failed to cancel draft" },
            { status: 500 }
        );
    }
}
