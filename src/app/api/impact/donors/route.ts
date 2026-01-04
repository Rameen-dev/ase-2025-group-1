import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Match landing page calculation: 0.5 kg per item × 3.6 CO₂ per kg = 1.8 kg CO₂ per item
const CO2_PER_ITEM = 1.8;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Get all donated items (items with donation_id) grouped by donor
    const allItems = await prisma.clothingItems.findMany({
      where: {
        donation_id: { not: null },
      },
      select: {
        type: true,
        donor_id: true,
      },
    });

    // Calculate CO2 per donor using flat rate
    const donorCO2Map = new Map<number, { co2: number; itemCount: number }>();

    allItems.forEach((item) => {
      const current = donorCO2Map.get(item.donor_id) || {
        co2: 0,
        itemCount: 0,
      };
      donorCO2Map.set(item.donor_id, {
        co2: current.co2 + CO2_PER_ITEM,
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
