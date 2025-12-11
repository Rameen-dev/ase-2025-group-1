import { NextRequest, NextResponse } from "next/server";
import { charityApplicationSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { sendCharityApplicationEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = charityApplicationSchema.safeParse(body);
        if (!parsed.success) {

            const flat = parsed.error.flatten();
            const fieldErrors = Object.fromEntries(
                Object.entries(flat.fieldErrors).map(([k, v]) => [k, v?.[0] ?? "Invalid"])
            );

            return NextResponse.json(
                { code: "VALIDATION_ERROR", fieldErrors },
                { status: 400 }
            );
        }

        const { charityName, charityWebsite, registrationNumber, email, phoneNumber, address, contactName } = parsed.data;

        const application = await prisma.charityApplications.create({
            data: {
                org_name: charityName,
                contact_email: email,
                contact_name: contactName,
                contact_number: phoneNumber,
                website: charityWebsite,
                org_address: address,
                charity_number: registrationNumber,
            },
            select: { application_id: true, contact_email: true, contact_number: true, website: true, charity_number: true },
        });

        await sendCharityApplicationEmail({
                                            toEmail: email, 
                                            orgName: charityName, });

        return NextResponse.json(
            {
                application: application.application_id,
                message: "Application has been sent",
            },
            { status: 201 }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("application failed:", err);

        if (err?.code === "P2002") {

            return NextResponse.json(
                { code: "EMAIL_TAKEN", message: "Email already registered." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { code: "SERVER_ERROR", message: "Signup failed." },
            { status: 500 }
        );
    }
}