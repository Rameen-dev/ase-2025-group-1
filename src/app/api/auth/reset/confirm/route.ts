import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email ?? "";
    const newPassword = body.newPassword ?? "";

    const email = rawEmail.toLowerCase().trim();

    if (!email || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Email and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    // 1. Find user with their current password hash
    const user = await prisma.user.findUnique({
      where: { email },
      select: { user_id: true, password_hash: true },
    });

    if (!user) {
      // Avoid leaking account existence
      return NextResponse.json(
        { success: false, message: "Unable to reset password." },
        { status: 400 }
      );
    }

    // 2. Compare new password with old hash
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password_hash
    );

    if (isSamePassword) {
      return NextResponse.json(
        { success: false, message: "New password cannot be the same as your current password." },
        { status: 400 }
      );
    }

    // 3. Hash the new password
    const saltRounds = 10;
    const newHash = await bcrypt.hash(newPassword, saltRounds);

    // 4. Update password in DB
    await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        password_hash: newHash,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.error("Error in /api/auth/reset/confirm:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
