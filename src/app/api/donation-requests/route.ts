import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INSPECT_MAX_BYTES } from "buffer";

export async function GET() {
    try {
        const apps = await prisma.donationRequest.findMany({
            orderBy: { created_on: "desc" },
            include: {
                _count: {
                    select: { clothing_items: true }, // 👈 relation name from your Prisma model
                },
            },
        });

        return NextResponse.json(apps);
    } catch (error) {
        console.error("GET /api/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch donation requests" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, items } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "At least one clothing item is required" },
                { status: 400 }
            );
        }

        for (const [index, item] of items.entries()) {
            if (!item.front_image_url || !item.back_image_url) {
                return NextResponse.json(
                    { error: "Clothing item at index ${index} is missing front/back image URLs" },
                    { status: 400 }
                );
            }
        }


        const userId = 14 //hardcode userId until we integrate session cookies

        const donationRequest = await prisma.$transaction(async (tx) => {

            const reqRow = await tx.donationRequest.create({
                data: {
                    title: title.trim(),
                    status: "PENDING",
                    created_by: userId,
                }
            });

            await tx.clothingItems.createMany({
                data: items.map((item) => ({
                    donation_request_id: reqRow.donation_request_id,
                    type: item.type,
                    size: item.size,
                    condition: item.condition,
                    donor_id: userId,
                    donation_id: null,
                    owned_by: null,
                    front_image_url: item.front_image_url,
                    back_image_url: item.back_image_url,
                })),
            });

            return reqRow;
        });



        return NextResponse.json(donationRequest, { status: 201 });
    } catch (error) {
        console.error("POST /api/donor-dashboard/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create donation request" },
            { status: 500 }
        );
    }
}