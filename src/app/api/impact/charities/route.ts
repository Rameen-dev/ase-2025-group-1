import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// CO2 savings per clothing type (in kg)
const CO2_VALUES: { [key: string]: number } = {
  Jacket: 25,
  Pants: 15,
  Shirt: 10,
  Shoes: 20,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Get all items in charity inventory (owned_by is set)
    const allItems = await prisma.clothingItems.findMany({
      where: {
        owned_by: { not: null },
      },
      select: {
        type: true,
        owned_by: true,
      },
    });

    // Calculate CO2 per charity
    const charityCO2Map = new Map<number, { co2: number; itemCount: number }>();

    allItems.forEach((item) => {
      const co2Value = CO2_VALUES[item.type] || 0;
      const charityId = item.owned_by!;
      const current = charityCO2Map.get(charityId) || { co2: 0, itemCount: 0 };
      charityCO2Map.set(charityId, {
        co2: current.co2 + co2Value,
        itemCount: current.itemCount + 1,
      });
    });

    // Get all charity IDs and sort by CO2
    const sortedCharityIds = Array.from(charityCO2Map.entries())
      .sort((a, b) => b[1].co2 - a[1].co2)
      .map(([id]) => id);

    // Pagination
    const totalCount = sortedCharityIds.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedIds = sortedCharityIds.slice(skip, skip + pageSize);

    // Fetch charity details
    const charities = await prisma.charities.findMany({
      where: { charity_id: { in: paginatedIds } },
      select: {
        charity_id: true,
        name: true,
        email: true,
      },
    });

    // Build response with CO2 data
    const charitiesWithImpact = paginatedIds
      .map((id) => {
        const charity = charities.find((c) => c.charity_id === id);
        const stats = charityCO2Map.get(id);
        if (!charity || !stats) return null;

        return {
          charity_id: charity.charity_id,
          name: charity.name,
          email: charity.email,
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
