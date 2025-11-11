import { NextRequest, NextResponse } from "next/server";
import { charityApplicationSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        // First, we read the JSON body sent by the frontend (signup/page.tsx)
        const body = await req.json();

        // Here we validate the body using Zod. If validation failed, success if false
        const parsed = charityApplicationSchema.safeParse(body);
        if (!parsed.success) {

            const flat = parsed.error.flatten();
            const fieldErrors = Object.fromEntries(
                // Here we map each field to only the first message 
                Object.entries(flat.fieldErrors).map(([k, v]) => [k, v?.[0] ?? "Invalid"])
            );

            // Respond with 400 (Bad Request) with machine-readable error codes + field errors.
            return NextResponse.json(
                { code: "VALIDATION_ERROR", fieldErrors },
                { status: 400 }
            );
        }

        const { charityName, charityWebsite, registrationNumber, email, phoneNumber, address } = parsed.data;

        const application = await prisma.application.create({
            data: {
                org_name: charityName,
                contact_email: email,
                contact_number: phoneNumber,
                website: charityWebsite,
                org_address: address,
                charity_number: registrationNumber,
            },
            select: { application_id: true, contact_email: true, contact_number: true, website: true, charity_number: true },
        });

        return NextResponse.json(
            {
                application: application.application_id,
                message: "Application has been sent",
            },
            { status: 201 }
        );
    } catch (err: any) {

        // If anything goes wrong above, we end up here (e.g., DB error, email send failure, bad JSON)
        console.error("signup error:", err); // We also log it in the console to help debug the error

        // Here we have the Prisma unique constraint error (Email already registered)
        if (err?.code === "P2002") { // Prisma throws an error with code: P2002, when a unique constraint is violated, in this case, the email field.

            // We translate that into a Conflict response with a clear, machine-readable code: "EMAIL_TAKEN"
            return NextResponse.json(
                { code: "EMAIL_TAKEN", message: "Email already registered." },
                { status: 409 } // The request could not be completed because it conflicts with the current state of the server
                // In our case, it can't be performed because it would break a uniqueness rule or cause a data conflict
            );
        }
        return NextResponse.json(
            { code: "SERVER_ERROR", message: "Signup failed." },
            { status: 500 } // Developer/ server mistake 
        );
    }
}