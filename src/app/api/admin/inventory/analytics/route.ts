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

    // Type split – based on AVAILABLE items
    const typeGroups = await prisma.clothingItems.groupBy({
      by: ["type"],
      where: {
        drafted_status: "AVAILABLE",
      },
      _count: { _all: true },
    });

    const typeSplit = typeGroups.map((g) => ({
      type: g.type,
      count: g._count._all,
    }));

    // Items by charity – consider all items, so every charity with stock appears.
    const charityGroups = await prisma.clothingItems.groupBy({
      by: ["owned_by"],
      where: {}, // no drafted_status filter here
      _count: { _all: true },
    });

    const charityIds = charityGroups
      .map((g) => g.owned_by)
      .filter((id): id is number => id !== null);

    const charities = await prisma.charities.findMany({
      where: { charity_id: { in: charityIds.length ? charityIds : [0] } },
      select: { charity_id: true, name: true },
    });

    const charityNameMap = new Map(
      charities.map((c) => [c.charity_id, c.name] as const)
    );

    const itemsByCharity = charityGroups.map((g) => {
      const id = g.owned_by;

      if (id === null) {
        return {
          charity_id: 0,
          name: "Unassigned / not yet allocated",
          count: g._count._all,
        };
      }

      return {
        charity_id: id,
        name: charityNameMap.get(id) ?? `Charity #${id}`,
        count: g._count._all,
      };
    });

    return NextResponse.json({
      typeSplit,
      itemsByCharity,
    });
  } catch (err) {
    console.error("GET /api/admin/inventory/analytics ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch inventory analytics" },
      { status: 500 }
    );
  }
}
