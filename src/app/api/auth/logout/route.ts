// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma"; // <– default import

export async function POST() {
  // 1) Read the cookie from the incoming request
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;

  // 2) Revoke the session in the DB if token exists
  if (token) {
    await prisma.session.updateMany({
      where: { session_token: token },
      data: { revoked_on: new Date() },
    });
  }

  // 3) Build a response and clear the cookie on the way out
  const res = NextResponse.json({ success: true });

  res.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
