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

    // Get all items with donation_id through Donations table
    const donations = await prisma.donations.findMany({
      include: {
        ClothingItems: {
          select: {
            type: true,
          },
        },
        accepted: {
          select: {
            charity_id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Calculate CO2 per charity using flat rate
    const charityCO2Map = new Map<
      number,
      {
        co2: number;
        itemCount: number;
        name: string;
        email: string;
      }
    >();

    donations.forEach((donation) => {
      const charityId = donation.accepted_by;
      const current = charityCO2Map.get(charityId) || {
        co2: 0,
        itemCount: 0,
        name: donation.accepted.name,
        email: donation.accepted.email,
      };

      donation.ClothingItems.forEach((item) => {
        current.co2 += CO2_PER_ITEM;
        current.itemCount += 1;
      });

      charityCO2Map.set(charityId, current);
    });

    // Get all charity IDs and sort by CO2
    const sortedCharityIds = Array.from(charityCO2Map.entries())
      .sort((a, b) => b[1].co2 - a[1].co2)
      .map(([id]) => id);

    // Pagination
    const totalCount = sortedCharityIds.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedIds = sortedCharityIds.slice(skip, skip + pageSize);

    // Build response with CO2 data
    const charitiesWithImpact = paginatedIds
      .map((id) => {
        const stats = charityCO2Map.get(id);
        if (!stats) return null;

        return {
          charity_id: id,
          name: stats.name,
          email: stats.email,
          co2_saved: Math.round(stats.co2 * 100) / 100,
          items_received: stats.itemCount,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      charities: charitiesWithImpact,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching charity impact:", error);
    return NextResponse.json(
      { error: "Failed to fetch charity impact" },
      { status: 500 }
    );
  }
}
