import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type LoggedUser =
    | { id: number; name: string }
    | { id: number; first_name: string }
    | { error: string };


export async function GET(req: NextRequest) {
    try {
        const sessionToken = req.cookies.get("session")?.value; //get the session cookies from server

        if (!sessionToken) {
            return NextResponse.json<LoggedUser>({ error: "Not authenticated" }, { status: 401 });
        }
        //find user id or charity id where session_token is
        const session = await prisma.session.findUnique({
            where: { session_token: sessionToken },
            select: { user_id: true, charity_id: true },
        });
        if (!session) {
            return NextResponse.json<LoggedUser>({ error: "Invalid session" }, { status: 401 });
        }
        //if where session_cookie we get charity_id
        //where charity_id matches, get charity name
        if (session.charity_id) {
            const charity = await prisma.charities.findUnique({
                where: { charity_id: session.charity_id },
                select: { charity_id: true, name: true },
            });

            if (!charity) {
                return NextResponse.json<LoggedUser>({ error: "Charity not found" }, { status: 404 });
            }

            //return charity name
            return NextResponse.json<LoggedUser>({
                id: charity.charity_id,
                name: charity.name,
            });
        }

        //if where session_token we find user_id instead
        //where user_id get first_name of user
        if (session.user_id) {
            const user = await prisma.user.findUnique({
                where: { user_id: session.user_id },
                select: { user_id: true, role: true, first_name: true },
            });

            if (!user) {
                return NextResponse.json<LoggedUser>({ error: "User not found" }, { status: 404 });
            }

            if (user.role !== "admin" && user.role !== "donor") {
                return NextResponse.json<LoggedUser>({ error: "Invalid role" }, { status: 403 });
            }

            //return user name
            return NextResponse.json<LoggedUser>({
                id: user.user_id,
                name: user.first_name,
            });
        }

        //if session token exists but not charity or user id is found
        //throw error
        return NextResponse.json<LoggedUser>(
            { error: "Session is not linked to a user or charity" },
            { status: 500 }
        );
    } catch (err) {
        console.error("GET /api/getname:", err);
        return NextResponse.json<LoggedUser>({ error: "Server error" }, { status: 500 });
    }
}