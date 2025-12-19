import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { strongPasswordSchema } from "@/lib/validation";

export const runtime = "nodejs";

const resetConfirmSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  newPassword: strongPasswordSchema,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const parsed = resetConfirmSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Invalid input.",
        },
        { status: 400 }
      );
    }

    const { email, newPassword } = parsed.data;

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
  } catch (error) {
    console.error("Error in /api/auth/reset/confirm:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
