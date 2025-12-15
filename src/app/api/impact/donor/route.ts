// This API route calculates and returns a donor’s sustainability impact (CO2 saved) 
// based on how many of their donated clothing items were successfully accepted.

// NextResponse is used to send the JSON responses from Next.js API routes
import { NextResponse } from "next/server";
// Here we import our shared sustainability calculation logic
// This ensures all roles (Donor, Charity, Admin) use the same model
import { calculateImpact } from "@/lib/impact";
// Import Prisma Client to talk to the Neon database
import { prisma } from "@/lib/prisma";
// Import authentication helper to get the currently logged-in user
// This should return session info
import { cookies } from "next/headers";

// This function runs when a GET Request is made to api/impact/donor
export async function GET() {
    // Here I read the session cookie from the browser
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    // If there is no logged-in user, block access
    if (!sessionToken) {
        return NextResponse.json (
            { error: "Unauthorised"},
            { status: 401 }
        );
    }

 // Here we look up that session token in the Session table
  const session = await prisma.session.findUnique({
    where: { session_token: sessionToken },
  });

  // Here we validate the session by checking if the session:
  // - exists
  // - not revoked
  // - not expired
  // - is a DONOR session
  // - has a user_id
  if (!session || session.revoked_on !== null || session.expires_on < new Date() || session.actor_type !== "DONOR" || session.user_id === null) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // Count clothing items for this donor that are accepted into a donation
  const totalItems = await prisma.clothingItems.count({
    where: {
      donor_id: session.user_id,
      donation_id: { not: null },
    },
  });

  // Calculate sustainability impact from the count
  const impact = calculateImpact(totalItems);

  // Return JSON response to the frontend
  return NextResponse.json({ totalItems, impact });
}