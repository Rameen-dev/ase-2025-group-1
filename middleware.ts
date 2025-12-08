import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { SessionActorType } from "@/generated/prisma";

const PROTECTED_PATHS = ["/donor", "/charity", "/admin"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isProtected = PROTECTED_PATHS.some((prefix) =>
        pathname.startsWith(prefix)
    );
    if (!isProtected) {
        return NextResponse.next();
    }

    const sessionToken = req.cookies.get("session")?.value;

    if (!sessionToken) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    const session = await prisma.session.findUnique({
        where: { session_token: sessionToken },
    });

    if (
        !session ||
        session.expires_on < new Date() ||
        session.revoked_on !== null
    ) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Route-based access rules
    if (pathname.startsWith("/donor")) {
        if (
            session.actor_type !== SessionActorType.DONOR &&
            session.actor_type !== SessionActorType.ADMIN
        ) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname.startsWith("/charity")) {
        if (session.actor_type !== SessionActorType.CHARITY) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname.startsWith("/admin")) {
        if (session.actor_type !== SessionActorType.ADMIN) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/donor/:path*", "/charity/:path*", "/admin/:path*"],
};
