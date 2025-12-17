// This API route builds the donor’s dashboard analytics by securely collecting all 
// statistics about their donation activity and recent actions
// It validates the session by checking it exists, isn't revoked, not expired and with an actor_type = DONOR


import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";



async function getDonorId(req: NextRequest): Promise<number | null> {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  // Here we read the session token from cookies
  const session = await prisma.session.findFirst({
    where: {
      session_token: token,
      revoked_on: null,
      expires_on: { gt: new Date() },
      actor_type: "DONOR",
      user_id: { not: null },
    },
    select: { user_id: true },
  });

  // Return the donor's user ID or NULL if not found
  return session?.user_id ?? null;
}

export async function GET(req: NextRequest) {
  try {
    // Check who is logged in
    const donorId = await getDonorId(req);

    // We block access if user is not authenticated or not a donor
    if (!donorId) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    // Total donation requests created by this donor
    const totalRequests = await prisma.donationRequest.count({
      where: { created_by: donorId },
    });
    // Total items submitted by this donor
    const totalItems = await prisma.clothingItems.count({
      where: { donor_id: donorId },
    });
    // Completed donations (a row exists in Donations table)
    const completedDonations = await prisma.donations.count({
      where: { created_by: donorId },
    });
   // Item counts by status
    const grouped = await prisma.clothingItems.groupBy({
    by: ["status"],
    where: { donor_id: donorId },
    _count: { _all: true },
    });

    // These are default status counts so the frontend always has values
    const statusCounts = { PENDING: 0, APPROVED: 0, REJECTED: 0 };

    // Here we fill the real count from the database
    for (const row of grouped) {
    statusCounts[row.status] = row._count._all;
    }
    // Here we calculate acceptance rate based on decided items only
    const decided = statusCounts.APPROVED + statusCounts.REJECTED;
    const acceptanceRate =
    decided === 0 ? 0 : Math.round((statusCounts.APPROVED / decided) * 100);

    // Here we find the top donated clothing types
    const topTypesRaw = await prisma.clothingItems.groupBy({
    by: ["type"],
    where: { donor_id: donorId },
    _count: { type: true },
    orderBy: {
        _count: {
        type: "desc",
        },
    },
    take: 5,
    });

    const topTypes = topTypesRaw.map((t) => ({
    type: t.type,
    count: t._count.type,
    }));

    // Recent activity from AuditEvent
    // We fetch recent requests first so we can filter events to this donor's requests.
    const recentRequests = await prisma.donationRequest.findMany({
      where: { created_by: donorId },
      select: { donation_request_id: true },
      orderBy: { created_on: "desc" },
      take: 25,
    });

    const requestIds = recentRequests.map((r) => r.donation_request_id);

    // Here we fetch all recent Audit events linked to the donor's requests
    const recentEvents = await prisma.auditEvent.findMany({
      where: {
        donation_request_id: { in: requestIds },
      },
      orderBy: { created_on: "desc" },
      take: 15,
    });

    // Then we send it to the dashboard.
    return NextResponse.json({
      totals: {
        totalRequests,
        totalItems,
        completedDonations,
        acceptanceRate,
        statusCounts,
      },
      topTypes,
      recentEvents,
    });
  } catch (err) {
    console.error("GET /api/donor/analytics ERROR:", err);
    return NextResponse.json({ error: "Failed to load the donor analytics" }, { status: 500 });
  }
}
