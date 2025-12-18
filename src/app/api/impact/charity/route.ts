// This API route calculates and returns a charities sustainability impact based on 
// how many cloting items they have accepted and now own.

// Next Response is used to send JSON responses from Next.js API routes
import { NextResponse } from "next/server";

// Here we use the shared sustainability calculation logic 
import { calculateImpact } from "@/lib/impact";

// Prisma client for access to database
import { prisma } from "@/lib/prisma";

import { cookies } from "next/headers";

// This function runs when a GET request is made to /api/impact/charity
export async function GET() {
    // Here we read the session cookie from the browser
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    // We block access here if no session cookie exists
    if (!sessionToken) {
        return NextResponse.json(
        { error: "Unauthorised"},
        { status: 401 }
        );
    }
    
    // Here we look up the session in the database
    const session = await prisma.session.findUnique({
        where: { session_token: sessionToken },
    });

    // We validate the session here
    if (!session || session.revoked_on !== null || session.expires_on < new Date() || session.actor_type !== "CHARITY" || session.charity_id === null)
    {
        return NextResponse.json(
            { error: "Unauthorised" },
            { status: 401 }
        );
    }

    // Here we then count how mny clothing items this charity has accepted and owns.
    // These are the items that are approved and assigned to the charity
    const totalItems = await prisma.clothingItems.count({
        where: {
            owned_by: session.charity_id,
            status: "APPROVED",
        },
    });
    
    // Here we then calculate the sustainability impact using the shared logic from "impact.ts"
    const impact = calculateImpact(totalItems);

    // We return the total item count and calculated impact
    return NextResponse.json({ totalItems, impact});
}