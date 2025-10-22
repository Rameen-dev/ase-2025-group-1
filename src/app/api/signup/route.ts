import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validation";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // bcrypt needs node runtime

// --- keep your existing rate limiter if you already have it ---
const rate = new Map<string, { count: number; until?: number }>();
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

  const { firstName, lastName, email, password } = parsed.data;

  try {
    // Check duplicates in DB (and later you can enforce @unique on email)
    const existing = await prisma.user.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash,
        role: "Donor",        // default role for now
        is_verified: false,   // <-- stays false until user verifies on dashboard
        first_name: firstName,
        last_name: lastName,
      },
      select: { user_id: true, is_verified: true },
    });

    return NextResponse.json(
      {
        userId: user.user_id,
        status: user.is_verified ? "active" : "unverified",
        message: "Account created.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.code === "P2002") {
      // if you later add @unique on email
      return NextResponse.json({ code: "EMAIL_TAKEN" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
  }
}
