import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const apps = await prisma.donationRequest.findMany({
      orderBy: { created_on: "desc" },
      include: {
        _count: { select: { clothing_items: true } },
      },
    });

    return NextResponse.json(apps);       // must always return array
  } catch (error) {
    console.error("GET /api/donation-requests ERROR:", error);

    return NextResponse.json([], { status: 200 });  // return array not object {}
  }
}
