import nodemailer from "nodemailer";

/**
 * sendVerificationEmail
 * Sends an email containing the OTP code to the new user.
 */
export async function sendVerificationEmail(toEmail: string, otpCode: string) {
  // 1. Create a mail "transport" (how we connect to an SMTP server)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // e.g. "smtp.gmail.com" or your provider
    port: Number(process.env.SMTP_PORT), // e.g. 587
    secure: false,                     // upgrade later with STARTTLS if true is needed
    auth: {
      user: process.env.SMTP_USER,     // SMTP username / email login
      pass: process.env.SMTP_PASS,     // SMTP password / app password
    },
  });

  // 2. Send the email
  await transporter.sendMail({
    from: process.env.MAIL_FROM,       // "SustainWear <no-reply@sustainwear.com>"
    to: toEmail,
    subject: "Your SustainWear verification code",
    text: `Your verification code is: ${otpCode}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up to SustainWear.</p>
        <p>Your verification code is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otpCode}</p>
        <p>This code will expire shortly, so please enter it soon.</p>
      </div>
    `,
  });
}
