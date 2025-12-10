import {
  sendContactMessageEmail,
  sendContactConfirmationEmail,
} from "@/lib/email"; // adjust path if needed

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing fields" }),
      { status: 400 }
    );
  }

  try {
    // 1) Send to SustainWear inbox
    await sendContactMessageEmail({
      fromName: name,
      fromEmail: email,
      message,
    });

    // 2) Auto-reply to the user
    await sendContactConfirmationEmail({
      toName: name,
      toEmail: email,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Contact form email error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
