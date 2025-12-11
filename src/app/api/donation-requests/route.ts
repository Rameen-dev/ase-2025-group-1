import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

//retrieves user id from Session table using the session cookie token
async function getUserId(req: NextRequest): Promise<number | null> {
    //read the session token stored inside the browser cookie
    const token = req.cookies.get("session")?.value;

    if (!token) return null;

    const session = await prisma.session.findFirst({
        where: {
            session_token: token,
            expires_on: { gt: new Date() }, //looks for token that is not expired
        },
        select: { user_id: true }, //return user id WHERE session_token
    });

    return session?.user_id ?? null;
}


//returns all donation requests for the dashboard, 
//including a count of how many clothing items per request

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


export async function GET(req: NextRequest) {
    try {
        const userId = await getUserId(req);

        //emnsure that userId is not null when id gets passed into variable
        //prevents error in prisma
        if (userId === null) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const apps = await prisma.donationRequest.findMany({
            where: { created_by: userId },
            orderBy: { created_on: "desc" },
            include: {
                _count: {
                    select: { ClothingItems: true },
                },
            },
        });

        const transformed = apps.map((app) => ({
            ...app,
            createdAgo: formatTimeAgo(app.created_on)
        }));


        return NextResponse.json(transformed);
    } catch (error) {
        console.error("GET /api/donation-requests ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch donation requests" },
            { status: 500 }
        );
    }
}

//creates a new donation request, as well clothing items
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, items } = body;

        //ensures donation requsts have a title
        if (!title || !title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        //ensures users provide at least 1 item for donation request
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "At least one clothing item is required" },
                { status: 400 }
            );
        }

        //ensures each clothing item has both front and back images
        for (const [, item] of items.entries()) {
            if (!item.front_image_url || !item.back_image_url) {
                return NextResponse.json(
                    { error: "Clothing item at index ${index} is missing front/back image URLs" },
                    { status: 400 }
                );
            }
        }

        const userId = await getUserId(req);  //calls function to retrieve user id

        //ensures user id is not null to prevent prisma error
        if (!userId) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        //wrap donation request and clothing items in a transaction
        //ensuring data base is not partially filled and there are no key values missing
        const donationRequest = await prisma.$transaction(async (tx) => {

            //insert donation request
            const reqRow = await tx.donationRequest.create({
                data: {
                    title: title.trim(),
                    status: "PENDING",
                    created_by: userId,
                }
            });

            //insert all clothing items linked to donation request
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