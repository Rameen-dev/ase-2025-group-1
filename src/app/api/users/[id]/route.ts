import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get("userType");

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // If this is a charity, fetch from Charities table
    if (userType === "charity") {
      const charity = await prisma.charities.findUnique({
        where: { charity_id: userId },
        include: {
          donations_received: {
            select: { donation_id: true },
          },
        },
      });

      if (!charity) {
        return NextResponse.json(
          { error: "Charity not found" },
          { status: 404 }
        );
      }

      // Transform charity to user format
      const response = {
        user_id: charity.charity_id,
        first_name: charity.name,
        last_name: "",
        email: charity.email,
        role: "charity",
        is_verified: charity.verified,
        created_on: charity.created_on,
        updated_on: charity.updated_on,

        // Stats
        donations_count: charity.donations_received.length,
        approved_applications_count: 0,
        reviewed_applications_count: 0,

        // Charity-specific info
        charity: {
          charity_id: charity.charity_id,
          name: charity.name,
          verified: charity.verified,
          created_on: charity.created_on,
          phone: charity.phone,
          address: charity.address,
          website: charity.website,
        },
      };

      return NextResponse.json(response);
    }

    // Otherwise, fetch from User table
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        donations_created: {
          select: { donation_id: true },
        },
        approved_applications: {
          select: { application_id: true },
        },
        reviewed_applications: {
          select: { application_id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Regular user found
    // Check if user is associated with a charity (by email)
    let charityInfo = null;
    const charity = await prisma.charities.findUnique({
      where: { email: user.email },
      select: {
        charity_id: true,
        name: true,
        verified: true,
        created_on: true,
      },
    });

    if (charity) {
      charityInfo = charity;
    }

    // Prepare response
    const response = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified,
      created_on: user.created_on,
      updated_on: user.updated_on,

      // Stats
      donations_count: user.donations_created.length,
      approved_applications_count: user.approved_applications.length,
      reviewed_applications_count: user.reviewed_applications.length,

      // Charity info (if applicable)
      charity: charityInfo,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
}
