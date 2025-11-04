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

    // Here we validate the body using Zod. If validation failed, success if false
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {

      // Here I convert Zod's nested error format into a flat object like: 
      // { email: "Invalid email", password: "Too short" }
      const flat = parsed.error.flatten();
      const fieldErrors = Object.fromEntries(
      // Here we map each field to only the first message 
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

    // Hash the users password - The "10" is the salt rounds. The higher it is, the slower it works but is more secure.
    const password_hash = await bcrypt.hash(plainPassword, 10);

    // Here we then create the user row in the database
    // If a unique email exists already, Prisma will throw a P2002 error
    // We only select specific fields to return, never the password_hash
    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        first_name: firstName,
        last_name: lastName,
        role: "donor", // This is the default role on Sign-Up
        is_verified: false, // New users will start unverified until they enter OTP.
      },
      select: { user_id: true, is_verified: true, first_name: true, email: true },
    });

    // Generate a random 4-digit OTP code for Sign-Up verification (Example: 0491 )
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Here we calculate an expiry time for the OTP code (10 Minutes from now)
    const TEN_MINUTES = 10 * 60 * 1000;
    const expiresAt = new Date(Date.now() + TEN_MINUTES);

    // We then store the OTP in the EmailVerificationTokens table
    // The user_id links to the token to the new user
    // expires_on lets you reject the expired codes on the verify endpoint
    await prisma.emailVerificationTokens.create({
      data: { user_id: user.user_id, token: otpCode, expires_on: expiresAt },
    });

    // 5. Send the verification email with the OTP to the users email
    await sendVerificationEmail(user.email, user.first_name, otpCode);

    // 6. Respond to frontend with a success message
    return NextResponse.json(
      {
        userId: user.user_id,
        status: user.is_verified ? "active" : "unverified",
        message: "Account created. Verification code sent.",
      },
      { status: 201 }
    );
  } catch (err: any) {

    // If anything goes wrong above, we end up here (e.g., DB error, email send failure, bad JSON)
    console.error("signup error:", err); // We also log it in the console to help debug the error
    
    // Here we have the Prisma unique constraint error (Email already registered)
    if (err?.code === "P2002") { // Prisma throws an error with code: P2002, when a unique constraint is violated, in this case, the email field.

      // We translate that into a Conflict response with a clear, machine-readable code: "EMAIL_TAKEN"
      return NextResponse.json(
        { code: "EMAIL_TAKEN", message: "Email already registered." },
        { status: 409 } // The request could not be completed because it conflicts with the current state of the server
                        // In our case, it can't be performed because it would break a uniqueness rule or cause a data conflict
      );
    }
    // This is a generic catch-all error response 
    // Anything else that isn't the duplicate email case becomes a 500 internal server error. 
    // We only return the generic code and a user-friendly message. We avoid leaking the internal details
    return NextResponse.json(
      { code: "SERVER_ERROR", message: "Signup failed." },
      { status: 500 } // Developer/ server mistake 
    );
  }
}
