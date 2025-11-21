import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);

  if (!body || !body.action) {
    return NextResponse.json(
      { error: "Missing action" },
      { status: 400 }
    );
  }

  // Convert action to status
  const newStatus =
    body.action === "APPROVE" ? "APPROVED" :
    body.action === "DENY" ? "REJECTED" :
    null;

  if (!newStatus) {
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  }

  const updateData: any = {
    status: newStatus,
    updated_on: new Date(),
  };

  if (newStatus === "APPROVED") {
    updateData.approved_on = new Date();
    updateData.reviewed_on = null;
  }

  if (newStatus === "REJECTED") {
    updateData.reviewed_on = new Date();
    updateData.approved_on = null;
  }

  try {
    const updated = await prisma.charityApplications.update({
      where: { application_id: id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}
