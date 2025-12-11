import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import {
  sendCharityRejectionEmail,
  sendCharityApprovalEmail,
} from "@/lib/email";

// In Next 15+ route handlers, params is async
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  // Await params before using it
  const { id } = await context.params;
  const applicationId = Number(id);

  if (Number.isNaN(applicationId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);

  if (!body || !body.action) {
    return NextResponse.json(
      { error: "Missing action" },
      { status: 400 }
    );
  }

  const action = body.action as "APPROVE" | "DENY";

  // Later get the real admin user_id from session
  // const adminId = session.user.id;

  try {
    // ===================== DENY / REJECT FLOW =====================
    if (action === "DENY") {
      const updated = await prisma.charityApplications.update({
        where: { application_id: applicationId },
        data: {
          status: "REJECTED",
          reviewed_on: new Date(),
          // Don't set reviewed_by yet (would FK fail if ID not real)
          approved_on: null,
          approved_by: null,
          updated_on: new Date(),
        },
      });

      // Send rejection email
      try {
        await sendCharityRejectionEmail({
          toEmail: updated.contact_email,
          orgName: updated.org_name,
        });
      } catch (emailErr) {
        console.error("Failed to send rejection email:", emailErr);
      }

      return NextResponse.json(updated);
    }

    //  APPROVE FLOW 
    if (action === "APPROVE") {
      // Generate secure token + 48h expiry
      const token = crypto.randomBytes(32).toString("hex");
      const expiresOn = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48 hours

      const result = await prisma.$transaction(async (tx) => {
        // 1) Update application to APPROVED
        const app = await tx.charityApplications.update({
          where: { application_id: applicationId },
          data: {
            status: "APPROVED",
            reviewed_on: new Date(),
            // reviewed_by: null for now (or leave untouched)
            approved_on: new Date(),
            // approved_by: null for now
            updated_on: new Date(),
          },
        });

        // 2) Create Charity row (password_hash remains NULL)
        const charity = await tx.charities.create({
          data: {
            name: app.org_name,
            email: app.contact_email,
            phone: app.contact_number,
            address: app.org_address,
            website: app.website,
            verified: false,
            password_hash: null,
          },
        });

        // 3) Link application to this charity
        const linkedApp = await tx.charityApplications.update({
          where: { application_id: app.application_id },
          data: {
            charity_id: charity.charity_id,
          },
        });

        // 4) Create one-time signup token
        const invite = await tx.charitySignupTokens.create({
          data: {
            charity_id: charity.charity_id,
            email: charity.email,
            token,
            expires_on: expiresOn,
            // created_on has default now()
            // created_by: null for now
          },
        });

        return { app: linkedApp, charity, invite };
      });

      // Build signup URL with token
      const baseUrl =
        process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "";
        const signupUrl = `${baseUrl}/auth/charity-signup?token=${result.invite.token}`;

      // Send approval email with link
      try {
        await sendCharityApprovalEmail({
          toEmail: result.app.contact_email,
          orgName: result.app.org_name,
          signupUrl,
        });
      } catch (emailErr) {
        console.error("Failed to send approval email:", emailErr);
      }

      return NextResponse.json(result.app);
    }

    // If someone sends a random action
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}
