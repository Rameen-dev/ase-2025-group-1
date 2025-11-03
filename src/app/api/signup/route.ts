// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/lib/validation"; // ✅ NEW

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ NEW: Validate request body with Zod (no throws, return clean errors)
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const fieldErrors = Object.fromEntries(
        Object.entries(flat.fieldErrors).map(([k, v]) => [k, v?.[0] ?? "Invalid"])
      );
      return NextResponse.json(
        { code: "VALIDATION_ERROR", fieldErrors },
        { status: 400 }
      );
    }

    // Use validated data from Zod
    const { email: schemaEmail, firstName, lastName, password: plainPassword } = parsed.data;
    const email = schemaEmail.toLowerCase().trim();

    // 1. hash password
    const password_hash = await bcrypt.hash(plainPassword, 10);

    // 2. create user in DB
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        first_name: firstName,
        last_name: lastName,
        role: "donor",
        is_verified: false,
      },
      select: { user_id: true, is_verified: true, first_name: true, email: true },
    });

    // 3. Generate 4-digit OTP code
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    // 4. Store OTP
    const TEN_MINUTES = 10 * 60 * 1000;
    const expiresAt = new Date(Date.now() + TEN_MINUTES);

    await prisma.emailVerificationTokens.create({
      data: { user_id: user.user_id, token: otpCode, expires_on: expiresAt },
    });

    // 5. Send the verification email
    await sendVerificationEmail(user.email, user.first_name, otpCode);

    // 6. Respond to frontend
    return NextResponse.json(
      {
        userId: user.user_id,
        status: user.is_verified ? "active" : "unverified",
        message: "Account created. Verification code sent.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("signup error:", err);

    if (err?.code === "P2002") {
      return NextResponse.json(
        { code: "EMAIL_TAKEN", message: "Email already registered." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { code: "SERVER_ERROR", message: "Signup failed." },
      { status: 500 }
    );
  }
}
