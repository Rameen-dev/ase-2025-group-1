import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email ?? "";
    const code = body.code ?? "";

    const email = rawEmail.toLowerCase().trim();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and code are required." },
        { status: 400 }
      );
    }

    // 1. find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        email: true,
      },
    });

    if (!user) {
      // Don't leak existence
      return NextResponse.json(
        { success: false, message: "Invalid code." },
        { status: 400 }
      );
    }

    // 2. find a matching, valid token for this user
    const now = new Date();

    const tokenRow = await prisma.passwordResetTokens.findFirst({
      where: {
        user_id: user.user_id,
        code: code,
        consumed_on: null,
        expires_on: {
          gt: now, // expires_on > now (not expired)
        },
      },
      orderBy: {
        created_on: "desc",
      },
    });

    if (!tokenRow) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired code." },
        { status: 400 }
      );
    }

    // 3. mark this token as consumed so it can't be reused
    await prisma.passwordResetTokens.update({
      where: {
        pr_token_id: tokenRow.pr_token_id,
      },
      data: {
        consumed_on: now,
      },
    });

    // 4. success
    // We don't set the password here, we just unlock the next step.
    // Frontend will now let them choose a new password.
    return NextResponse.json({
      success: true,
      message: "Code verified. You may now set a new password.",
    });
  } catch (err) {
    console.error("Error in /api/auth/reset/verify:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
