import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/settings/me
 * Returns settings for the current logged-in actor (DONOR / ADMIN / CHARITY)
 */
export async function GET(req: NextRequest) {
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

    // DONOR or ADMIN → read from User table
    if (session.actor_type === "DONOR" || session.actor_type === "ADMIN") {
      if (!session.user_id) {
        return NextResponse.json(
          { error: "User session missing user_id" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { user_id: session.user_id },
        select: {
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        role: session.actor_type,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        receiveEmails: true, // static for now
      });
    }

    // CHARITY → read from Charities table
    if (session.actor_type === "CHARITY") {
      if (!session.charity_id) {
        return NextResponse.json(
          { error: "Charity session missing charity_id" },
          { status: 400 }
        );
      }

      const charity = await prisma.charities.findUnique({
        where: { charity_id: session.charity_id },
        select: {
          name: true,
          email: true,
          phone: true,
          address: true,
          website: true,
        },
      });

      if (!charity) {
        return NextResponse.json(
          { error: "Charity not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        role: "CHARITY",
        orgName: charity.name,
        address: charity.address,
        email: charity.email,
        phone: charity.phone,
        website: charity.website,
        receiveEmails: true, // placeholder / static
      });
    }

    return NextResponse.json(
      { error: "Unsupported actor type" },
      { status: 400 }
    );
  } catch (err) {
    console.error("GET /api/settings/me ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * PUT /api/settings/me
 * Updates simple profile fields depending on actor type.
 */
export async function PUT(req: NextRequest) {
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

    const body = await req.json();

    if (session.actor_type === "DONOR" || session.actor_type === "ADMIN") {
      if (!session.user_id) {
        return NextResponse.json(
          { error: "User session missing user_id" },
          { status: 400 }
        );
      }

      await prisma.user.update({
        where: { user_id: session.user_id },
        data: {
          first_name: body.firstName ?? undefined,
          last_name: body.lastName ?? undefined,
        },
      });

      return NextResponse.json({ ok: true });
    }

    if (session.actor_type === "CHARITY") {
      if (!session.charity_id) {
        return NextResponse.json(
          { error: "Charity session missing charity_id" },
          { status: 400 }
        );
      }

      await prisma.charities.update({
        where: { charity_id: session.charity_id },
        data: {
          name: body.orgName ?? undefined,
          address: body.address ?? undefined,
        },
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "Unsupported actor type" },
      { status: 400 }
    );
  } catch (err) {
    console.error("PUT /api/settings/me ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
