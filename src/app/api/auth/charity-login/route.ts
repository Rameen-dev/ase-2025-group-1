import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { SessionActorType } from "@/generated/prisma";

export const runtime = "nodejs"; // bcrypt needs Node

function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read email + password from body
    const { email: rawEmail, password } = await req.json();

    if (!rawEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const email = rawEmail.toLowerCase().trim();

    // 2) Look up the charity by email in the Charities table
    const charity = await prisma.charities.findUnique({
      where: { email }, // email is unique in Charities model
      select: {
        charity_id: true,
        name: true,
        email: true,
        password_hash: true,
        verified: true,
      },
    });

    if (!charity) {
      // No charity with this email
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_LOGIN",
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 3) Check if they have actually set a password yet
    if (!charity.password_hash) {
      // They are approved, but haven't completed signup
      return NextResponse.json(
        {
          success: false,
          code: "NO_PASSWORD_SET",
          message:
            "Your charity has not completed signup yet. Please use your invite link to set a password.",
        },
        { status: 403 }
      );
    }

    // 4) Compare password
    const passwordMatch = await bcrypt.compare(password, charity.password_hash);
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

    // 5) Check if charity itself is verified (onboarded)
    if (!charity.verified) {
      return NextResponse.json(
        {
          success: false,
          code: "CHARITY_NOT_VERIFIED",
          message:
            "Your charity account is not fully verified yet. Please contact SustainWear support.",
        },
        { status: 403 }
      );
    }

    // 6) Success – return charity info
    const sessionToken = generateSessionToken();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.session.create({
      data: {
        session_token: sessionToken,
        actor_type: SessionActorType.CHARITY,
        charity_id: charity.charity_id,
        expires_on: expires,
      },
    });



    const res = NextResponse.json(
      {
        success: true,
        code: "CHARITY_LOGIN_OK",
        charity: {
          charity_id: charity.charity_id,
          name: charity.name,
          email: charity.email,
        },
      },
      { status: 200 }
    );


    res.cookies.set("session", sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

  } catch (err) {
    console.error("Charity login error:", err);
    return NextResponse.json(
      {
        success: false,
        code: "SERVER_ERROR",
        message: "Server error during charity login.",
      },
      { status: 500 }
    );
  }
}
