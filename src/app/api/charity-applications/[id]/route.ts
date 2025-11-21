import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import {
  sendCharityRejectionEmail,
  sendCharityApprovalEmail,
} from "@/lib/email";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  const applicationId = Number(params.id);

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

  // TODO: when you have auth, get this from the logged-in admin
  const adminId = 1;

  try {
    if (action === "DENY") {
      // ========= REJECT FLOW =========
      const updated = await prisma.charityApplications.update({
        where: { application_id: applicationId },
        data: {
          status: "REJECTED",
          reviewed_on: new Date(),
          reviewed_by: adminId,
          approved_on: null,
          approved_by: null,
          updated_on: new Date(),
        },
      });

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

    if (action === "APPROVE") {
      // ========= APPROVE FLOW =========

      // Generate secure token + 48-hour expiry
      const token = crypto.randomBytes(32).toString("hex");
      const expiresOn = new Date(Date.now() + 1000 * 60 * 60 * 48); // 48 hours

      const result = await prisma.$transaction(async (tx) => {
        // 1) Update application to APPROVED
        const app = await tx.charityApplications.update({
          where: { application_id: applicationId },
          data: {
            status: "APPROVED",
            reviewed_on: new Date(),
            reviewed_by: adminId,
            approved_on: new Date(),
            approved_by: adminId,
            updated_on: new Date(),
          },
        });

        // 2) Create Charity row (password_hash stays NULL)
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
            created_on: new Date(),
            created_by: adminId,
          },
        });

        return { app: linkedApp, charity, invite };
      });

      const baseUrl =
        process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "";
      const signupUrl = `${baseUrl}/charity/complete-signup?token=${result.invite.token}`;

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
