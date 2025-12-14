import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// CO2 savings per clothing type (in kg)
const CO2_VALUES: { [key: string]: number } = {
  Jacket: 25,
  Pants: 15,
  Shirt: 10,
  Shoes: 20,
};

export async function GET() {
  try {
    // Get all clothing items that have been donated (have donation_id)
    const allItems = await prisma.clothingItems.findMany({
      where: {
        donation_id: { not: null },
      },
      select: {
        type: true,
        donor_id: true,
        owned_by: true,
      },
    });

    // Calculate total CO2
    let totalCO2 = 0;
    const donorCO2Map = new Map<number, number>();
    const charityCO2Map = new Map<number, number>();

    allItems.forEach((item) => {
      const co2Value = CO2_VALUES[item.type] || 0;
      totalCO2 += co2Value;

      // Track by donor
      if (item.donor_id) {
        const current = donorCO2Map.get(item.donor_id) || 0;
        donorCO2Map.set(item.donor_id, current + co2Value);
      }

      // Track by charity
      if (item.owned_by) {
        const current = charityCO2Map.get(item.owned_by) || 0;
        charityCO2Map.set(item.owned_by, current + co2Value);
      }
    });

    // Get top 5 donors with details
    const topDonorIds = Array.from(donorCO2Map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topDonors = await prisma.user.findMany({
      where: { user_id: { in: topDonorIds } },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
      },
    });

    const topDonorsWithCO2 = topDonors.map((donor) => ({
      id: donor.user_id,
      name: `${donor.first_name} ${donor.last_name}`,
      co2: donorCO2Map.get(donor.user_id) || 0,
      type: "donor",
    }));

    // Get top 5 charities with details
    const topCharityIds = Array.from(charityCO2Map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topCharities = await prisma.charities.findMany({
      where: { charity_id: { in: topCharityIds } },
      select: {
        charity_id: true,
        name: true,
      },
    });

    const topCharitiesWithCO2 = topCharities.map((charity) => ({
      id: charity.charity_id,
      name: charity.name,
      co2: charityCO2Map.get(charity.charity_id) || 0,
      type: "charity",
    }));

    // Calculate "Others" category
    const top5DonorsCO2 = topDonorsWithCO2.reduce((sum, d) => sum + d.co2, 0);
    const top5CharitiesCO2 = topCharitiesWithCO2.reduce(
      (sum, c) => sum + c.co2,
      0
    );
    const othersCO2 = totalCO2 - top5DonorsCO2 - top5CharitiesCO2;

    // Combine for chart
    const chartData = [
      ...topDonorsWithCO2,
      ...topCharitiesWithCO2,
      ...(othersCO2 > 0
        ? [{ id: 0, name: "Others", co2: othersCO2, type: "other" }]
        : []),
    ];

    return NextResponse.json({
      totalCO2: Math.round(totalCO2 * 100) / 100,
      totalItems: allItems.length,
      totalDonors: donorCO2Map.size,
      totalCharities: charityCO2Map.size,
      chartData,
    });
  } catch (error) {
    console.error("Error fetching platform impact:", error);
    return NextResponse.json(
      { error: "Failed to fetch platform impact" },
      { status: 500 }
    );
  }
}
