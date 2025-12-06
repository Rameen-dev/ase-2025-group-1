import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const apps = await prisma.charityApplications.findMany({
      orderBy: { created_on: "desc" },
    });

    return NextResponse.json(apps);
  } catch (error) {
    console.error("GET /charity-applications ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
