import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// CO2 savings per clothing type (in kg)
// Case-insensitive lookup
const CO2_VALUES: { [key: string]: number } = {
  jacket: 25,
  pants: 15,
  shirt: 10,
  shoes: 20,
};

function getCO2Value(type: string): number {
  const normalizedType = type.toLowerCase();
  return CO2_VALUES[normalizedType] || 0;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Get all items from APPROVED donation requests grouped by donor
    const allItems = await prisma.clothingItems.findMany({
      where: {
        DonationRequest: {
          status: "APPROVED",
        },
      },
      select: {
        type: true,
        donor_id: true,
      },
    });

    // Calculate CO2 per donor
    const donorCO2Map = new Map<number, { co2: number; itemCount: number }>();

    allItems.forEach((item) => {
      const co2Value = getCO2Value(item.type);
      const current = donorCO2Map.get(item.donor_id) || {
        co2: 0,
        itemCount: 0,
      };
      donorCO2Map.set(item.donor_id, {
        co2: current.co2 + co2Value,
        itemCount: current.itemCount + 1,
      });
    });

    // Get all donor IDs and sort by CO2
    const sortedDonorIds = Array.from(donorCO2Map.entries())
      .sort((a, b) => b[1].co2 - a[1].co2)
      .map(([id]) => id);

    // Pagination
    const totalCount = sortedDonorIds.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedIds = sortedDonorIds.slice(skip, skip + pageSize);

    // Fetch donor details
    const donors = await prisma.user.findMany({
      where: { user_id: { in: paginatedIds } },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    // Build response with CO2 data
    const donorsWithImpact = paginatedIds
      .map((id) => {
        const donor = donors.find((d) => d.user_id === id);
        const stats = donorCO2Map.get(id);
        if (!donor || !stats) return null;

        return {
          user_id: donor.user_id,
          name: `${donor.first_name} ${donor.last_name}`,
          email: donor.email,
          co2_saved: Math.round(stats.co2 * 100) / 100,
          items_donated: stats.itemCount,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      donors: donorsWithImpact,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching donor impact:", error);
    return NextResponse.json(
      { error: "Failed to fetch donor impact" },
      { status: 500 }
    );
  }
}
