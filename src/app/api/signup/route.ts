import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export const runtime = "nodejs"; // bcrypt + nodemailer both need node runtime

// simple in-memory rate limiter
const rate = new Map<string, { count: number; until?: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const rec = rate.get(ip) ?? { count: 0 };
  if (rec.until && rec.until > now) return true;
  rec.count++;
  if (rec.count > 10) {
    rec.until = now + 60_000; // lock for 60s
    rec.count = 0;
  }
  rate.set(ip, rec);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
  }

  // 1️⃣ Parse and validate request body
  const body = await req.json().catch(() => ({}));
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    console.log("SIGNUP VALIDATION FAILED:", parsed.error.flatten());
    return NextResponse.json(
      { code: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, password } = parsed.data;

  try {
    // 2️⃣ Check for existing user
    const existing = await prisma.user.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
    }

    // 3️⃣ Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // 4️⃣ Create new user record
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        role: "Donor",
        is_verified: false,
        first_name: firstName,
        last_name: lastName,
      },
      select: { user_id: true, is_verified: true },
    });

    // 5️⃣ Generate 4-digit OTP code
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    // 6️⃣ Store OTP in EmailVerificationTokens table
    const TEN_MINUTES = 10 * 60 * 1000;
    const expiresAt = new Date(Date.now() + TEN_MINUTES);
    await prisma.emailVerificationTokens.create({
      data: {
        user_id: user.user_id,
        token: otpCode,
        expires_on: expiresAt,
      },
    });

    // 7️⃣ Send verification email
    await sendVerificationEmail(email, otpCode);

    // 8️⃣ Respond to frontend
    return NextResponse.json(
      {
        userId: user.user_id,
        status: user.is_verified ? "active" : "unverified",
        message: "Account created. Verification code sent.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
    }
    console.error("Signup error:", err);
    return NextResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
  }
}
