import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // adjust path if needed

export async function GET() {
  // cookie name = "session" (from your screenshot)
  const token = cookies().get("session")?.value || null;

  const session = token
    ? await prisma.session.findUnique({
        where: { session_token: token },
        include: { user: true, charity: true },
      })
    : null;

  return NextResponse.json({
    cookieToken: token,
    session: session
      ? {
          session_id: session.session_id,
          actor_type: session.actor_type,
          user_id: session.user_id,
          charity_id: session.charity_id,
          expires_on: session.expires_on,
          revoked_on: session.revoked_on,
        }
      : null,
  });
}
