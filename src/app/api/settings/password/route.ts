import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { session_token: sessionToken },
      select: {
        actor_type: true,
        user_id: true,
        charity_id: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // 🔴 NEW CHECK: block reusing the same password
    if (newPassword === currentPassword) {
      return NextResponse.json(
        { error: "New password must be different from your current password" },
        { status: 400 }
      );
    }

    // DONOR / ADMIN → User table
    if (session.actor_type === "DONOR" || session.actor_type === "ADMIN") {
      if (!session.user_id) {
        return NextResponse.json(
          { error: "User session missing user_id" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { user_id: session.user_id },
        select: { password_hash: true },
      });

      if (!user || !user.password_hash) {
        return NextResponse.json(
          { error: "User not found or no password set" },
          { status: 404 }
        );
      }

      const valid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!valid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      const newHash = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { user_id: session.user_id },
        data: { password_hash: newHash },
      });

      return NextResponse.json({ ok: true });
    }

    // CHARITY → Charities table
    if (session.actor_type === "CHARITY") {
      if (!session.charity_id) {
        return NextResponse.json(
          { error: "Charity session missing charity_id" },
          { status: 400 }
        );
      }

      const charity = await prisma.charities.findUnique({
        where: { charity_id: session.charity_id },
        select: { password_hash: true },
      });

      if (!charity || !charity.password_hash) {
        return NextResponse.json(
          { error: "Charity not found or no password set" },
          { status: 404 }
        );
      }

      const valid = await bcrypt.compare(
        currentPassword,
        charity.password_hash
      );
      if (!valid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      const newHash = await bcrypt.hash(newPassword, 10);

      await prisma.charities.update({
        where: { charity_id: session.charity_id },
        data: { password_hash: newHash },
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "Unsupported actor type" },
      { status: 400 }
    );
  } catch (err) {
    console.error("POST /api/settings/password ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
