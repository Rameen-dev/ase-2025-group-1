import nodemailer from "nodemailer";

/**
 * sendVerificationEmail
 * Sends an email containing the OTP code to the new user.
 */
export async function sendVerificationEmail(
  toEmail: string,
  firstName: string,
  otpCode: string
) {
  // 1. Create a mail "transport" (how we connect to an SMTP server)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com" or your provider
    port: Number(process.env.SMTP_PORT), // e.g. 587
    secure: false, // upgrade later with STARTTLS if true is needed
    auth: {
      user: process.env.SMTP_USER, // SMTP username / email login
      pass: process.env.SMTP_PASS, // SMTP password / app password
    },
  });

  // 2. Send the verification email
  await transporter.sendMail({
    from: process.env.MAIL_FROM, // "SustainWear <no-reply@sustainwear.com>"
    to: toEmail,
    subject: "Your SustainWear verification code",
    text: `Hello ${firstName},\n\nYour verification code is: ${otpCode}\n\nIt will expire shortly, so please enter it soon.`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Verify your email</h2>
        <p>Hello <strong>${firstName}</strong>,</p>
        <p>Thanks for signing up to <b>SustainWear</b>.</p>
        <p>Your verification code is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otpCode}</p>
        <p>This code will expire shortly, so please enter it soon.</p>
        <br />
        <p>— The SustainWear Team</p>
      </div>
    `,
  });
}

/**
 * sendResetCodeEmail
 * Sends a 6-digit password reset code to an existing user.
 */
export async function sendResetCodeEmail(
  toEmail: string,
  firstName: string,
  code: string
) {
  // 1. Create a mail transport (same as in sendVerificationEmail)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2. Send the password reset email
  await transporter.sendMail({
    from: process.env.MAIL_FROM, // e.g. "SustainWear <no-reply@sustainwear.com>"
    to: toEmail,
    subject: "Your SustainWear Password Reset Code",
    text: `Hello ${firstName},\n\nYour password reset code is: ${code}\n\nIt will expire in 10 minutes.`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>Hello <strong>${firstName}</strong>,</p>
        <p>You requested to reset your password. Use the 6-digit code below to continue:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>This code will expire in <b>10 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <br />
        <p>— The SustainWear Team</p>
      </div>
    `,
  });
}


export async function sendCharityRejectionEmail(options: {

toEmail: string;
orgName: string;

}) {
  const { toEmail, orgName } = options;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: "SustainWear – Charity Application Update",
    html: `
    <p>Hi ${orgName},</p>
    <p>Thank you for taking the time to apply to partner with SustainWear.</p>
    <p>Unfortunately, at this time we won't be moving forward with your Charity application.</p>
    <p>
    This doesn’t reflect the value of the work you do – we simply have
    limited capacity during this phase. You’re very welcome to apply again
    in the future.
    </p>
    <p>Best regards,<br/>The SustainWear Team</p>
    `,
  });
}