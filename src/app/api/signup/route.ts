// app/api/signup/route.ts

// Next.js server types for reading the request and sending a response
import { NextRequest, NextResponse } from "next/server";

// Our Prisma client, configured in /lib/prisma, for talking to the database.
import { prisma } from "@/lib/prisma";

// This is our helper that sends an email with the OTP code
import { sendVerificationEmail } from "@/lib/email";

// We use this library for hashing passwords securely as we don't store them in plain text in our database.
import bcrypt from "bcrypt";

// Zod schema that validates the incoming form data from the frontend
import { signUpSchema } from "@/lib/validation";

export const runtime = "nodejs"; // Ensure this route runs on the Node.js runtime

// This route handles POST requests to api/signup
export async function POST(req: NextRequest) {
  try {
    // First, we read the JSON body sent by the frontend (signup/page.tsx)
    const body = await req.json();

    // Here we validate the body using Zod. 
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {

      // Here I convert Zod's nested error format into a flat object like: 
      // { email: "Invalid email", password: "Too short" }
      const flat = parsed.error.flatten();
      const fieldErrors = Object.fromEntries(
        Object.entries(flat.fieldErrors).map(([k, v]) => [k, v?.[0] ?? "Invalid"])
      );

      // Respond with 400 (Bad Request) with machine-readable error codes + field errors.
      return NextResponse.json(
        { code: "VALIDATION_ERROR", fieldErrors },
        { status: 400 }
      );
    }

    // Here we extract validated data from Zod, that's been inputted by a user from the frontend
    // Here we also normalise the email to avoid duplicates with different cases or spaces
    const { email: schemaEmail, firstName, lastName, password: plainPassword } = parsed.data;
    const email = schemaEmail.toLowerCase().trim();

    // 1. hash password - 
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
