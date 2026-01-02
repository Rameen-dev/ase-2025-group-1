import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//donation API for charities
function formatTimeAgo(createdOn: Date): string {
    const seconds = Math.floor((Date.now() - createdOn.getTime()) / 1000);

    const units: [number, string][] = [
        [60, "second"],
        [60, "minute"],
        [24, "hour"],
        [7, "day"],
        [4, "week"],
        [12, "month"],
        [Number.POSITIVE_INFINITY, "year"],
    ];

    let value = seconds;
    let i = 0;

    while (i < units.length && value >= units[i][0]) {
        value = Math.floor(value / units[i][0]);
        i++;
    }

    const label = units[i][1];
    return value === 0
        ? "just now"
        : `${value} ${label}${value > 1 ? "s" : ""} ago`;
}

// GET: all donation requests (no userId filter) for charity dashboard
export async function GET() {
    try {
        const apps = await prisma.donationRequest.findMany({
            orderBy: { created_on: "desc" },
            include: {
                _count: {
                    select: { ClothingItems: true },
                },
            },
        });

        const transformed = apps.map((app) => ({
            ...app,
            createdAgo: formatTimeAgo(app.created_on),
        }));

        return NextResponse.json(transformed);
    } catch (error) {
        console.error("GET /api/charity/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch donation requests" },
            { status: 500 }
        );
    }
}
