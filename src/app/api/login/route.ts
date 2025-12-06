import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";
import { SessionActorType } from "@/generated/prisma";

export const runtime = "nodejs"; // bcrypt requires Node.js runtime

// generate a 4-digit OTP like "4821"
function generateOtp() {
  const n = Math.floor(Math.random() * 10000); // 0..9999
  return n.toString().padStart(4, "0");
}

function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read email + password from the request body
    const { email: rawEmail, password } = await req.json();

    // 2️) Basic validation
    if (!rawEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // normalise email
    const email = rawEmail.toLowerCase().trim();

    // 3️) Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        email: true,
        password_hash: true,
        is_verified: true,
        first_name: true,
        last_name: true,
        role: true,
      },
    });

    // If user not found in the database (Meaning they haven't Signed up)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_LOGIN",
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 4️) Compare password hashes to ensure secure login
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_LOGIN",
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 5️) Check if user is verified
    if (!user.is_verified) {
      // The user exists and password is correct, BUT they haven't verified their email yet
      // We do the "resend OTP" flow here automatically 

      // 5a. generate a fresh OTP
      const newCode = generateOtp();

      // 5b. invalidate any previous tokens for this user (mark consumed_on)
      await prisma.emailVerificationTokens.updateMany({
        where: {
          user_id: user.user_id,
          consumed_on: null,
        },
        data: {
          consumed_on: new Date(),
        },
      });

      // 5c. create/save a brand new token with expiry (10 minutes)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.emailVerificationTokens.create({
        data: {
          user_id: user.user_id,
          token: newCode,
          expires_on: expiresAt,
          // consumed_on defaults to null in schema
        },
      });

      // 5d. send them the new verification code email
      try {
        await sendVerificationEmail(user.email, user.first_name, newCode);
      } catch (err) {
        // Any errors that may occur is shown in console
        console.error("Failed to send verification email during login:", err);

        // rollback this token (so user can't try to use a code they never actually received)
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
            message: "Could not send verification email.",
          },
          { status: 500 }
        );
      }

      // 5e. respond with NOT_VERIFIED and include the email
      // the frontend will see this and redirect them to /auth/verify?email=...
      return NextResponse.json(
        {
          success: false,
          code: "NOT_VERIFIED",
          message:
            "Your email is not verified yet. We've sent you a new code.",
          email: user.email,
        },
        { status: 403 }
      );
    }

    const roleStr = (user.role || "").toUpperCase();
    const actorType: SessionActorType =
      roleStr === "ADMIN" ? SessionActorType.ADMIN : SessionActorType.DONOR;

    const sessionToken = generateSessionToken();
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    await prisma.session.create({
      data: {
        session_token: sessionToken,
        actor_type: actorType,
        user_id: user.user_id,
        expires_on: expires,
      },
    });


    const res = NextResponse.json(
      {
        success: true,
        code: "LOGIN_OK",
        user: {
          user_id: user.user_id,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
      { status: 200 }
    );

    res.cookies.set("session", sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 30,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Server error during login." },
      { status: 500 }
    );
  }
}
