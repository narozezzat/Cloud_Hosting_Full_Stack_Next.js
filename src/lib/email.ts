import nodemailer from "nodemailer";

/**
 * Email helper with three tiers, picked in order at send time:
 *
 *   1. Gmail SMTP  — if `GMAIL_USER` + `GMAIL_APP_PASSWORD` are set. Sends from
 *      your Gmail to ANY recipient (uses a Google "App Password", not your
 *      normal password). Best when you don't own a domain.
 *   2. Resend HTTP — if `RESEND_API_KEY` is set (and no Gmail creds).
 *   3. Console     — dev fallback that logs the message so links stay reachable
 *      without any provider configured.
 */
interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailArgs) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;

  // 1. Gmail SMTP via nodemailer
  if (gmailUser && gmailPass) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `Cloud Hosting <${gmailUser}>`,
      to,
      subject,
      text,
      html,
    });
    return { delivered: true as const, via: "gmail" as const };
  }

  // 2. Resend HTTP API
  if (resendKey) {
    const from =
      process.env.EMAIL_FROM || "Cloud Hosting <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    if (!res.ok) {
      throw new Error(`Failed to send email (${res.status})`);
    }
    return { delivered: true as const, via: "resend" as const };
  }

  // 3. Dev fallback: surface the email in the server logs.
  console.info(
    `\n[email:dev-fallback] To: ${to}\nSubject: ${subject}\n${text}\n`,
  );
  return { delivered: false as const, via: "console" as const };
}

export function passwordResetEmail(resetUrl: string) {
  return {
    subject: "Reset your Cloud Hosting password",
    text: `We received a request to reset your password.\n\nReset it here (valid for 1 hour):\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
        <h2>Reset your password</h2>
        <p>We received a request to reset your Cloud Hosting password.</p>
        <p>
          <a href="${resetUrl}"
             style="display:inline-block;padding:10px 18px;border-radius:8px;background:#6366f1;color:#fff;text-decoration:none">
            Reset password
          </a>
        </p>
        <p style="color:#666;font-size:13px">This link is valid for 1 hour. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  };
}
