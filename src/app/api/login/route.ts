import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // bcrypt requires Node.js runtime

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Read email + password from the request body
    const { email, password } = await req.json();

    // 2️⃣ Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // 3️⃣ Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user not found
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 4️⃣ Compare password hashes
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 5️⃣ Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your email is not verified yet. Please verify before logging in.",
        },
        { status: 403 }
      );
    }

    // 6️⃣ If all checks pass → return success
    // (Later we’ll add proper sessions/cookies here)
    return NextResponse.json(
      {
        success: true,
        user: {
          user_id: user.user_id,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Server error during login." },
      { status: 500 }
    );
  }
}
