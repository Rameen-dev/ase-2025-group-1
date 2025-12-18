import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path if needed

/**
 * GET /api/impact/live
 *
 * Returns aggregated, platform-wide impact metrics.
 * This endpoint is read-only and does not expose personal data.
 */
export async function GET() {
  try {
    /**
     * Count total accepted donations
     * A donation only exists once a charity has accepted a request,
     * so this represents real, processed donations.
     */
    const totalDonations = await prisma.donations.count();

    /**
     * Count total clothing items that belong to a donation
     * Items with a donation_id are considered "donated and accepted".
     */
    const totalItems = await prisma.clothingItems.count({
      where: {
        donation_id: {
          not: null,
        },
      },
    });

    // Estimate: average number of items needed to support 1 person
    const ITEMS_PER_PERSON = 5;

    // People supported is an estimate based on item count
    const peopleSupported = Math.floor(totalItems / ITEMS_PER_PERSON);

    /**
     * Breakdown of donated items by type (e.g. Jackets, T-Shirts)
     * This is useful for charts or future analytics.
     */
    const itemsByType = await prisma.clothingItems.groupBy({
      by: ["type"],
      where: {
        donation_id: {
          not: null,
        },
      },
      _count: {
        clothing_id: true,
      },
    });

    /**
     * Simple sustainability estimates
     * These are calculated using average values.
     * (Values can be refined later without changing the API contract)
     */
    const AVERAGE_CO2_SAVED_PER_ITEM_KG = 3.0;
    const AVERAGE_LANDFILL_SAVED_PER_ITEM_KG = 0.5;

    const co2SavedKg = totalItems * AVERAGE_CO2_SAVED_PER_ITEM_KG;
    const landfillSavedKg = totalItems * AVERAGE_LANDFILL_SAVED_PER_ITEM_KG;

    /**
     * Return aggregated impact data
     * This can be safely consumed by public or authenticated views.
     */
    return NextResponse.json({
      totals: {
        donations: totalDonations,
        items: totalItems,
        co2SavedKg,
        landfillSavedKg,
        peopleSupported,
      },
      breakdowns: {
        itemsByType: itemsByType.map((item) => ({
          type: item.type,
          count: item._count.clothing_id,
        })),
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Live impact error:", error);

    return NextResponse.json(
      { error: "Failed to load live impact data" },
      { status: 500 }
    );
  }
}
