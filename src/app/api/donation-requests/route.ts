import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const apps = await prisma.donationRequest.findMany({
            orderBy: { created_on: "desc" },
        });

        return NextResponse.json(apps);
    } catch (error) {
        console.error("GET /api/donor-dashboard/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch donation requests" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        // TEMP: hard-coded user_id until you have auth
        const newRequest = await prisma.donationRequest.create({
            data: {
                title: title.trim(),
                status: "PENDING",
                created_by: 15, // change this later to session user id
            },
        });

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        console.error("POST /api/donor-dashboard/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create donation request" },
            { status: 500 }
        );
    }
}