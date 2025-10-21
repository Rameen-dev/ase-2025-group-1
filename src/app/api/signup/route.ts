import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation";
import crypto from "node:crypto";

type UserRec = { id: string; email: string; status: "unverified" | "active" };
const users = new Map<string, UserRec>(); // email -> user
const rate = new Map<string, { count: number; until?: number }>(); // ip -> counter

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = rate.get(ip) ?? { count: 0 };
  if (rec.until && rec.until > now) return true;
  rec.count++;
  if (rec.count > 10) {
    rec.until = now + 60_000;
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

  const body = await req.json().catch(() => ({}));
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { code: "VALIDATION_ERROR", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { email, firstName, lastName } = parsed.data;

  if (users.has(email)) {
    return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
  }

  // Fake "hashing" & create user (DON'T do this in prod; use Argon2/bcrypt)
  const id = `u_${crypto.randomUUID()}`;
  users.set(email, { id, email, status: "unverified" });

  // Simulate sending a verification email (token stored nowhere; just a demo)
  const verifyToken = crypto.randomBytes(24).toString("base64url");
  console.log(
    `[DEV] Send verify email to ${email} (Hello ${firstName} ${lastName}) with token: ${verifyToken}`
  );

  return NextResponse.json(
    { userId: id, status: "unverified", message: "Verification email sent" },
    { status: 201 }
  );
}
