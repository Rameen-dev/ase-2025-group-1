import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendResetCodeEmail } from "@/lib/email";

export const runtime = "nodejs";

// helper: generate a random 6-digit code as a string like "482193"
function generateResetCode() {
  const n = Math.floor(Math.random() * 1_000_000); // 0..999999
  return n.toString().padStart(6, "0"); // e.g. "004281"
}

// simple resend cooldown per email (30s)
const resendRate = new Map<string, { lastSentAt: number }>();
function isRateLimited(email: string) {
  const now = Date.now();
  const rec = resendRate.get(email);

  if (rec && now - rec.lastSentAt < 30_000) {
    return true;
  }

  resendRate.set(email, { lastSentAt: now });
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. read email
    const body = await req.json();
    const rawEmail = body.email ?? "";
    const email = rawEmail.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_REQUEST",
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    // 2. rate limit per email, not per IP
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

    // 3. find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        email: true,
        first_name: true,
      },
    });

    // if user doesn't exist:
    // For coursework clarity, we tell them.
    // (In production you'd pretend it's fine.)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          code: "USER_NOT_FOUND",
          message: "No account found with that email.",
        },
        { status: 404 }
      );
    }

    // 4. generate fresh 6-digit code and expiry
    const code = generateResetCode();
    const expiresOn = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 5. invalidate any previous active tokens for this user
    await prisma.passwordResetTokens.updateMany({
      where: {
        user_id: user.user_id,
        consumed_on: null,
      },
      data: {
        consumed_on: new Date(),
      },
    });

    // 6. save NEW token
    await prisma.passwordResetTokens.create({
      data: {
        user_id: user.user_id,
        code: code,
        expires_on: expiresOn,
        // consumed_on stays null initially
      },
    });

    // 7. send the email with retries (same pattern as request route)
    let sent = false;
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts && !sent) {
      attempt++;
      try {
        console.log(`📧 [RESEND] Attempt ${attempt} to send reset email...`);
        await sendResetCodeEmail(user.email, user.first_name, code);
        sent = true;
        console.log("✅ [RESEND] Email sent successfully.");
      } catch (err) {
        console.error(`❌ [RESEND] Attempt ${attempt} failed:`, err);

        if (attempt < maxAttempts) {
          const delay = 1000 * Math.pow(2, attempt - 1); // 1s, 2s
          console.log(`⏳ Retrying in ${delay / 1000}s...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          console.error("🚫 [RESEND] All email attempts failed.");
        }
      }
    }

    if (!sent) {
      // roll back this new token if email truly failed to send
      await prisma.passwordResetTokens.updateMany({
        where: {
          user_id: user.user_id,
          code: code,
          consumed_on: null,
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

    // 8. success response
    return NextResponse.json(
      {
        success: true,
        code: "RESET_RESENT",
        message: "We've sent you a new code.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in /api/auth/reset/resend:", err);
    return NextResponse.json(
      {
        success: false,
        code: "SERVER_ERROR",
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
