import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function requireAdmin(req: NextRequest) {
  const sessionToken = req.cookies.get("session")?.value;
  if (!sessionToken) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
    };
  }

  const session = await prisma.session.findUnique({
    where: { session_token: sessionToken },
    select: { actor_type: true, user_id: true },
  });

  if (!session || session.actor_type !== "ADMIN" || !session.user_id) {
    return {
      ok: false as const,
      res: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, admin_user_id: session.user_id };
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.res;

    const charities = await prisma.charities.findMany({
      orderBy: { name: "asc" },
      select: { charity_id: true, name: true, verified: true },
    });

    return NextResponse.json(charities);
  } catch (err) {
    console.error("GET /api/admin/charities ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch charities" },
      { status: 500 }
    );
  }
}
