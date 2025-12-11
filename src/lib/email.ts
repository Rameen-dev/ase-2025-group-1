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
      <p>Best regards,<br/>The SustainWear Team</p>
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
        <p>If you didn't request this, please ignore this email.</p>
        <br />
      <p>Best regards,<br/>The SustainWear Team</p>
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
    subject: "SustainWear - Charity Application Update",
    html: `
    <p>Hi ${orgName},</p>
    <p>Thank you for taking the time to apply to partner with SustainWear.</p>
    <p>Unfortunately, at this time we won't be moving forward with your Charity application.</p>
    <p>
    This doesn't reflect the value of the work you do - we simply have
    limited capacity during this phase. You're very welcome to apply again
    in the future.
    </p>
    <p>Best regards,<br/>The SustainWear Team</p>
    `,
  });
}


export async function sendCharityApplicationEmail(options: {

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
    subject: "Thank You for Your Charity Partnership Application",
    html: `
    <p>Hi ${orgName},</p>
    <p>Thank you for taking the time to apply to partner with SustainWear.</p>
    <p>We appreciate your interest in joining our mission to promote sustainability and 
    support communities through responsible clothing redistribution.</p>
    <p>
    Your application has been successfully received and will now be reviewed by our team. 
    We will be in touch shortly with an update regarding the next steps.
    </p>
    <p>Best regards,<br/>The SustainWear Team</p>
    `,
  });
}

export async function sendCharityApprovalEmail(options: {
  toEmail: string;
  orgName: string;
  signupUrl: string;
}) {
  const { toEmail, orgName, signupUrl } = options;

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
    subject: "SustainWear – Charity Application Approved",
    html: `
      <p>Hi ${orgName},</p>
      <p>
        We're pleased to let you know that your application to partner with
        <strong>SustainWear</strong> has been <strong>approved</strong>.
      </p>
      <p>
        To complete your onboarding and activate your charity account,
        please click the link below to set your password:
      </p>
      <p>
        <a href="${signupUrl}">Complete your SustainWear charity signup</a>
      </p>
      <p>
        This link is one-time use and will expire after a short period,
        so please complete your signup as soon as possible.
      </p>
      <p>Best regards,<br/>The SustainWear Team</p>
    `,
  });
}

// Send automatic confirmation back to the user
export async function sendContactConfirmationEmail(options: {
  toName: string;
  toEmail: string;
}) {
  const { toName, toEmail } = options;

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
    subject: "We've received your message - SustainWear",
    text: `
Hello ${toName},

Thank you for getting in touch with SustainWear.
We've received your message and a member of our team will respond to you by email as soon as possible.

If your enquiry is urgent, you can reply directly to this email with any additional details.

— The SustainWear Team
    `,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Thank you for contacting SustainWear</h2>
        <p>Hello <strong>${toName}</strong>,</p>
        <p>
          Thank you for getting in touch with <strong>SustainWear</strong>.
          We've received your message and a member of our team will respond to you by email as soon as possible.
        </p>
        <p>
          If your enquiry is urgent, you can reply directly to this email with any additional details.
        </p>
        <br />
      <p>Best regards,<br/>The SustainWear Team</p>
      </div>
    `,
  });
}

// Email to SustainWear when someone submits the contact form
export async function sendContactMessageEmail(options: {
  fromName: string;
  fromEmail: string;
  message: string;
}) {
  const { fromName, fromEmail, message } = options;

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
    to: process.env.SMTP_USER, 
    replyTo: fromEmail,
    subject: `New SustainWear Contact Request from ${fromName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 15px;">
        <h2 style="color: #2E7D32; margin-bottom: 10px;">
          New SustainWear Contact Request
        </h2>

        <p><strong>Name:</strong> ${fromName}</p>
        <p><strong>Email:</strong> <a href="mailto:${fromEmail}">${fromEmail}</a></p>

        <p style="margin-top: 20px; font-weight: bold;">Message:</p>

        <div style="
          white-space: pre-line;
          background: #f8f8f8;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
        ">
          ${message}
        </div>

        <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 12px; color: #555;">
          This email was generated automatically from the SustainWear Contact form.
        </p>
      </div>
    `,
    text: `
        New SustainWear Contact Request

        Name: ${fromName}
        Email: ${fromEmail}

        Message:
        ${message}

        This email was generated automatically from the SustainWear Contact form.
            `,
  });
}
