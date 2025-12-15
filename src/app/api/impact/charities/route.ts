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

    // Get all items from APPROVED requests where charity accepted
    // We'll get items through the donation request's answering charity
    const approvedRequests = await prisma.donationRequest.findMany({
      where: {
        status: "APPROVED",
        answered_by: { not: null },
      },
      include: {
        ClothingItems: {
          select: {
            type: true,
          },
        },
        answering_charity: {
          select: {
            charity_id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Calculate CO2 per charity
    const charityCO2Map = new Map<
      number,
      {
        co2: number;
        itemCount: number;
        name: string;
        email: string;
      }
    >();

    approvedRequests.forEach((request) => {
      if (!request.answering_charity) return;

      const charityId = request.answering_charity.charity_id;
      const current = charityCO2Map.get(charityId) || {
        co2: 0,
        itemCount: 0,
        name: request.answering_charity.name,
        email: request.answering_charity.email,
      };

      request.ClothingItems.forEach((item) => {
        const co2Value = getCO2Value(item.type);
        current.co2 += co2Value;
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
