import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendResetCodeEmail } from "@/lib/email";

// helper: generate a random 6-digit code as a string like "482193"
function generateResetCode() {
  const n = Math.floor(Math.random() * 1_000_000); // 0..999999
  return n.toString().padStart(6, "0"); // e.g. "004281"
}

// in-memory rate limiter by IP to slow down abuse
const rate = new Map<string, { count: number; until?: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const rec = rate.get(ip) ?? { count: 0 };

  // still cooling down?
  if (rec.until && rec.until > now) return true;

  rec.count++;
  if (rec.count > 5) {
    // too many requests -> lock this IP for 60s
    rec.until = now + 60_000;
    rec.count = 0;
  }

  rate.set(ip, rec);
  return false;
}

export const runtime = "nodejs"; // make sure this runs in Node, not Edge

export async function POST(req: NextRequest) {
  // 1. rate limit check
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Try again soon." },
      { status: 429 }
    );
  }

  try {
    // 2. read email from body
    const body = await req.json();
    const rawEmail = body.email ?? "";
    const email = rawEmail.toLowerCase().trim();

    

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    // 3. try to find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        email: true,
        first_name: true,
      },
    });

    // SECURITY:
    // We do NOT tell the user if the email exists or not.
    // If user doesn't exist, just pretend we did it anyway,
    // so attackers can't check who has an account.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If that email is registered, a reset code has been sent.",
      });
    }

    // 4. generate code + expiry
    const code = generateResetCode();
    const expiresOn = new Date(Date.now() + 10 * 60 * 1000); // 10 mins from now

    // 5. save token in DB (PasswordResetTokens table)
    await prisma.passwordResetTokens.create({
      data: {
        user_id: user.user_id,
        code: code,
        expires_on: expiresOn,
        // consumed_on is null by default
      },
    });

    // 6. "send email"
    // NOTE: for now this is just console.log so you can see it in your server logs
    console.log("📧 PASSWORD RESET REQUEST");
    console.log("To:", user.email);
    console.log("Hello", user.first_name + ",");
    console.log("Your password reset code is:", code);
    console.log("This code expires at:", expiresOn.toISOString());




    // 6. send email with up to 3 attempts
    let sent = false;
    let attempt = 0;
    const maxAttempts = 3; // ✅ allow up to 3 tries

    while (attempt < maxAttempts && !sent) {
      attempt++;
      try {
        console.log(`📧 Attempt ${attempt} to send reset email...`);
        await sendResetCodeEmail(user.email, user.first_name, code);
        sent = true;
        console.log("✅ Email sent successfully.");
      } catch (err) {
        console.error(`❌ Attempt ${attempt} failed:`, err);

        if (attempt < maxAttempts) {
          // small exponential backoff: 1s, 2s, then stop
          const delay = 1000 * Math.pow(2, attempt - 1);
          console.log(`⏳ Retrying in ${delay / 1000}s...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          console.error("🚫 All email attempts failed.");
        }
      }
    }

    // Optionally handle the case where it never sent
    if (!sent) {
      throw new Error("Failed to send reset email after multiple attempts.");
}



    // 7. always reply with the same success message
    return NextResponse.json({
      success: true,
      message:
        "If that email is registered, a reset code has been sent.",
    });
  } catch (err) {
    console.error("Error in /api/auth/reset/request:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
