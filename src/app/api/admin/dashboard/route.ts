import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Total number of donations in the system
    const totalDonations = await prisma.donations.count();

    // Charity applications that haven't been reviewed yet
    const pendingApplications = await prisma.charityApplications.count({
      where: { status: "PENDING" },
    });

    // Donation requests that are still pending
    const pendingRequests = await prisma.donationRequest.count({
      where: { status: "PENDING" },
    });

    // Users who signed up but haven't verified their email
    const unverifiedUsers = await prisma.user.count({
      where: { is_verified: false },
    });

    // Latest actions in the system (shown on the dashboard)
    const recentActivity = await prisma.auditEvent.findMany({
      orderBy: { created_on: "desc" }, // newest first
      take: 10, // only show the last 10
      select: {
        event_id: true,
        event_type: true,
        actor_type: true,
        created_on: true,
      },
    });

    // Send everything back to the frontend as JSON
    return NextResponse.json({
      totalDonations,
      actionRequired: {
        pendingApplications,
        pendingRequests,
        unverifiedUsers,
      },
      recentActivity,
    });
  } catch (err) {
    console.error("dashboard GET error:", err);
    return NextResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
  }
}
