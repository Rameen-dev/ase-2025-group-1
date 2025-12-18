import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; 

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

    // 7. Send success
    return NextResponse.json(
      {
        code: "VERIFIED",
        message: "Email verified successfully.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json(
      { code: "SERVER_ERROR", message: "Internal server error." },
      { status: 500 }
    );
  }
}
