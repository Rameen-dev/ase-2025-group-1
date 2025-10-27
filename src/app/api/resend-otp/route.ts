// src/app/api/resend-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email"; // <-- you already send emails somewhere

export const runtime = "nodejs";

// Generate a random 4-digit code like "4821"
function generateOtp() {
  const n = Math.floor(Math.random() * 10000); // 0..9999
  return n.toString().padStart(4, "0");
}

// optional basic cooldown to stop spam, in-memory for now
const resendRate = new Map<
  string,
  { lastSentAt: number }
>();

function isRateLimited(email: string) {
  const now = Date.now();
  const rec = resendRate.get(email);

  // block if last send < 30 seconds ago (tune how you want)
  if (rec && now - rec.lastSentAt < 30_000) {
    return true;
  }

  resendRate.set(email, { lastSentAt: now });
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email ?? "";
    const email = rawEmail.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        { success: false, code: "INVALID_REQUEST", message: "Email required." },
        { status: 400 }
      );
    }

    // basic rate limit
    if (isRateLimited(email)) {
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMIT",
          message: "Please wait before requesting another code.",
        },
        { status: 429 }
      );
    }

    // 1. find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        first_name: true,
        is_verified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          code: "USER_NOT_FOUND",
          message: "No account for that email.",
        },
        { status: 404 }
      );
    }

    // already verified? no point resending
    if (user.is_verified) {
      return NextResponse.json(
        {
          success: false,
          code: "ALREADY_VERIFIED",
          message: "Email already verified.",
        },
        { status: 400 }
      );
    }

    // 2. generate a brand new OTP
    const newCode = generateOtp();

    // 3. mark all previous tokens for this user as consumed so they can't be used anymore
    // (this invalidates the old code)
    await prisma.emailVerificationTokens.updateMany({
      where: {
        user_id: user.user_id,
        consumed_on: null,
      },
      data: {
        consumed_on: new Date(),
      },
    });

    // 4. create and store the new token with expiry (e.g. 10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.emailVerificationTokens.create({
      data: {
        user_id: user.user_id,
        token: newCode,
        expires_on: expiresAt,
        // consumed_on: null will be default in schema if nullable
      },
    });

    // 5. send email to user with the code
    // This should be the same email template you used originally when they first signed up.
    // Make sure the email content tells them "here's your new verification code".
    try {
      await sendVerificationEmail(email, user.first_name, newCode);
    } catch (err) {
      console.error("❌ Failed to send verification email:", err);

      // If email sending fails, you might optionally roll back the token by marking it consumed immediately.
      // That way there isn't a valid code out there that the user never actually receives.
      await prisma.emailVerificationTokens.updateMany({
        where: {
          user_id: user.user_id,
          token: newCode,
        },
        data: {
          consumed_on: new Date(),
        },
      });

      return NextResponse.json(
        {
          success: false,
          code: "SERVER_ERROR",
          message: "Could not send email.",
        },
        { status: 500 }
      );
    }

    // 6. success response
    return NextResponse.json(
      {
        success: true,
        code: "RESEND_OK",
        message: "New code sent.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unhandled /api/resend-otp error:", err);
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Server error." },
      { status: 500 }
    );
  }
}
