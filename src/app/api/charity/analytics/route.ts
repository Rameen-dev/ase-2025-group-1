
// This API gets a logged-in charity_id from session cookie. 
// It validates the session by checking it exists, isn't revoked, not expired and with an actor_type = CHARITY

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Here we look up the session in the database and validate it
async function getCharityId(req: NextRequest): Promise<number | null> {
    const token = req.cookies.get("session")?.value;
    if (!token) return null;

    const session = await prisma.session.findFirst({
        where: {
            session_token: token,
            revoked_on: null,
            expires_on: {gt: new Date()},
            actor_type: "CHARITY",
            charity_id: { not: null},
        },
        select: { charity_id: true },
    });
    return session?.charity_id ?? null;
}

export async function GET(req: NextRequest) {
    try {
        const charityId = await getCharityId(req);
        if (!charityId) {
            return NextResponse.json({ error: "Unauthorised"}, { status: 401});
        }

        // Here we check for any pending donation requests that are available for the charity to review
        const pendingRequests = await prisma.donationRequest.count({
            where: {status: "PENDING" },
        });

        // Here we check for requests that have been answered by this charity (Approved or Rejected)
        const reviewedRequests = await prisma.donationRequest.count({
            where: {
                answered_by: charityId,
                status: { in: ["APPROVED", "REJECTED"] },
            },
        });

        // Here we check for the donations that have been accepted by this charity. (The rows in the donation table)
        const acceptedDonations = await prisma.donations.count({
            where: { accepted_by: charityId },
        });

        // Here we check which items are now accepted and owned by this charity (Approved clothing items only)
        const acceptedItems = await prisma.clothingItems.count({
            where: {
                owned_by: charityId,
                status: "APPROVED",
            },
        });

        // Here we check for the rejected items by this charity
        // Rejected Items stay in the same donation request. 
        const rejectedItems = await prisma.clothingItems.count({
            where: {
                status: "REJECTED",
                DonationRequest: {
                    answered_by: charityId,
                },
            },
        });

        // Here we check for any such recent activity from AuditEvent (What this charity has done)
        const recentEvents = await prisma.auditEvent.findMany({
            where: {
                actor_type: "CHARITY",
                actor_charity_id: charityId,
            },
            orderBy: {created_on: "desc"},
            take: 15,
        });

        return NextResponse.json({
            totals: {
                pendingRequests,
                reviewedRequests,
                acceptedItems,
                acceptedDonations,
                rejectedItems
            },
            recentEvents,
        });
    } catch (error) {
        console.error("GET /api/charity/analytics ERROR:", error);
        return NextResponse.json(
            { error: "Failed to load the charity analytics"},
            { status: 500 }
        );
    }
}