import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token } = await req.json().catch(() => ({ token: null }));

  if (!token) {
    return NextResponse.json(
      { valid: false, message: "Missing token" },
      { status: 400 }
    );
  }

  const invite = await prisma.charitySignupTokens.findUnique({
    where: { token }, // token is unique in your schema
    include: {
      charity: true,
    },
  });

  if (
    !invite ||
    invite.consumed_on !== null ||
    invite.expires_on < new Date()
  ) {
    return NextResponse.json(
      { valid: false, message: "Link is invalid or has expired" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    valid: true,
    charity: {
      name: invite.charity.name,
      email: invite.charity.email,
      address: invite.charity.address,
      phone: invite.charity.phone,
      website: invite.charity.website,
    },
  });
}
