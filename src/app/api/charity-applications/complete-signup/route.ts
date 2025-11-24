import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json().catch(() => ({
    token: null,
    password: null,
  }));

  if (!token || !password) {
    return NextResponse.json(
      { success: false, message: "Missing token or password" },
      { status: 400 }
    );
  }

  const invite = await prisma.charitySignupTokens.findUnique({
    where: { token },
  });

  if (
    !invite ||
    invite.consumed_on !== null ||
    invite.expires_on < new Date()
  ) {
    return NextResponse.json(
      { success: false, message: "Link is invalid or has expired" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    await prisma.$transaction(async (tx) => {
      // 1) Update charity password + verified flag
      await tx.charities.update({
        where: { charity_id: invite.charity_id },
        data: {
          password_hash: hashed,
          verified: true,
        },
      });

      // 2) Mark this invite as used
      await tx.charitySignupTokens.update({
        where: { invite_id: invite.invite_id },
        data: {
          consumed_on: new Date(),
        },
      });

      // 3) (Optional) Invalidate any other unused invites for this charity
      await tx.charitySignupTokens.updateMany({
        where: {
          charity_id: invite.charity_id,
          invite_id: { not: invite.invite_id },
          consumed_on: null,
        },
        data: {
          consumed_on: new Date(),
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Complete signup error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to complete signup" },
      { status: 500 }
    );
  }
}
