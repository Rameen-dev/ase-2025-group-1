import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation"; // Zod schema to validate incoming signup data
import crypto from "node:crypto"; // Node built-in library for generating random IDs and tokens

// ---------------------------
// temporary fake database, to test the signup
// ---------------------------

// Define what a user record looks like
// Doesn't represent the actual database table for users "Donors"
type UserRec = { id: string; email: string; status: "unverified" | "active" };

// Create a Map to simulate user storage (key = email, value = user info)
// ⚠️ This resets every time the server restarts — used only for testing before real DB connection
const users = new Map<string, UserRec>();

// Simple in-memory rate limiter (to stop spam signups from the same IP)
const rate = new Map<string, { count: number; until?: number }>();

// ---------------------------
// RATE LIMITER FUNCTION
// ---------------------------
function rateLimited(ip: string) {
  const now = Date.now();
  const rec = rate.get(ip) ?? { count: 0 };

  // If IP is currently blocked, deny the request
  if (rec.until && rec.until > now) return true;

  // Increase counter for this IP
  rec.count++;

  // If more than 10 signups in a minute → block for 1 minute
  if (rec.count > 10) {
    rec.until = now + 60_000; // block until 1 minute from now
    rec.count = 0;
  }

  // Update rate tracker
  rate.set(ip, rec);
  return false;
}

// ---------------------------
// POST REQUEST HANDLER (main API logic)
// ---------------------------
export async function POST(req: NextRequest) {
  // 1️⃣ Get client IP address (fallback to "local" for dev environment)
  const ip = req.headers.get("x-forwarded-for") ?? "local";

  // 2️⃣ Stop if the IP has hit the rate limit
  if (rateLimited(ip)) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
  }

  // 3️⃣ Parse the JSON body safely (avoid crash if body is invalid JSON)
  const body = await req.json().catch(() => ({}));

  // 4️⃣ Validate incoming data using Zod schema
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { code: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Extract the validated fields
  const { email, firstName, lastName } = parsed.data;

  // 5️⃣ Prevent duplicate accounts using the same email
  if (users.has(email)) {
    return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
  }

  // 6️⃣ Simulate creating a new user
  // In a real app: you'd hash the password with bcrypt/argon2 and insert into your DB
  const id = `u_${crypto.randomUUID()}`;
  users.set(email, { id, email, status: "unverified" });

  // 7️⃣ Simulate sending a verification email (just log it to the console for now)
  const verifyToken = crypto.randomBytes(24).toString("base64url");
  console.log(
    `[DEV] Send verify email to ${email} (Hello ${firstName} ${lastName}) with token: ${verifyToken}`
  );

  // 8️⃣ Respond to the client with success
  // The frontend will show a message like “Check your email to verify.”
  return NextResponse.json(
    {
      userId: id,
      status: "unverified",
      message: "Verification email sent",
    },
    { status: 201 }
  );
}
