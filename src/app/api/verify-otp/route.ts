import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { SessionActorType } from "@/generated/prisma";

export const runtime = "nodejs"; 

function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}
export async function POST(req: NextRequest) {
  // 1. Parse request body
  const body = await req.json().catch(() => ({}));
  const { email, otp } = body as { email?: string; otp?: string };

  // 2. Basic validation
  if (
    !email ||
    typeof email !== "string" ||
    !otp ||
    typeof otp !== "string" ||
    !/^\d{4}$/.test(otp)
  ) {
    return NextResponse.json(
      { code: "INVALID_REQUEST", message: "Bad email or code format." },
      { status: 400 }
    );
  }

  try {
    // 3. Find user by email
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        user_id: true,
        is_verified: true,
      },
    });

    if (!user) {
      // hide info: don't reveal if email exists or not
      return NextResponse.json(
        { code: "INVALID_CODE", message: "Code is not valid." },
        { status: 400 }
      );
    }

    // If already verified, shortcut
    if (user.is_verified) {
      return NextResponse.json(
        { code: "ALREADY_VERIFIED", message: "Account already verified." },
        { status: 200 }
      );
    }

    // 4. Look up matching token row
    const tokenRow = await prisma.emailVerificationTokens.findFirst({
      where: {
        user_id: user.user_id,
        token: otp,
        consumed_on: null,
      },
      orderBy: {
        created_on: "desc",
      },
    });

    if (!tokenRow) {
      return NextResponse.json(
        { code: "INVALID_CODE", message: "Code is not valid." },
        { status: 400 }
      );
    }

    // 5. Check expiry
    const now = new Date();
    if (tokenRow.expires_on < now) {
      return NextResponse.json(
        { code: "EXPIRED_CODE", message: "Code is expired. Request a new one." },
        { status: 400 }
      );
    }

    // 6. Mark user verified + consume token (transaction so both happen together)
    await prisma.$transaction([
      prisma.user.update({
        where: { user_id: user.user_id },
        data: { is_verified: true },
      }),
      prisma.emailVerificationTokens.update({
        where: { ev_token_id: tokenRow.ev_token_id },
        data: { consumed_on: now },
      }),
    ]);

    // Create a session cookie after verification
    const sessionToken = generateSessionToken();
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    const actorType = SessionActorType.DONOR; // Signed up people will always be Donor (You can't sign up as an admin)

    await prisma.session.create({
      data: {
        session_token: sessionToken,
        actor_type: actorType,
        user_id: user.user_id,
        charity_id: null,
        expires_on: expires,
      },
    });
    // 7. Send success
    const res = NextResponse.json(
      {
        code: "VERIFIED",
        message: "Email verified successfully.",
      },
      { status: 200 }
    );

    res.cookies.set("session", sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 30,
    });

    return res;
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json(
      { code: "SERVER_ERROR", message: "Internal server error." },
      { status: 500 }
    );
  }
}
