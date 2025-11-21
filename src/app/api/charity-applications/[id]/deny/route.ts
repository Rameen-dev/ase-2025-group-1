// app/api/admin/charity-applications/[id]/deny/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCharityRejectionEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const applicationId = Number(params.id);

  if (Number.isNaN(applicationId)) {
    return NextResponse.json(
      { success: false, message: "Invalid application id" },
      { status: 400 }
    );
  }

  try {
    // 1) Update the application status to REJECTED
    const application = await prisma.charityApplications.update({
    where: { application_id: applicationId },
    data: { status: "REJECTED" }, // enum value
    });


    // 2) Send rejection email
    await sendCharityRejectionEmail({
      toEmail: application.contact_email,
      orgName: application.org_name,
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error rejecting charity application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reject charity application" },
      { status: 500 }
    );
  }
}
