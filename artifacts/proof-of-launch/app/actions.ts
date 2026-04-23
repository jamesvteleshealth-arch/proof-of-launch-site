"use server";

import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  situation: string;
  vertical: string;
  platform: string;
  message: string;
};

export type ContactResult = { ok: boolean; error?: string };

const FROM_ADDRESS = "Proof of Launch <hello@proofoflaunch.com>";
const TO_ADDRESS = "info@proofoflaunch.com";
const FALLBACK_CONTACT_LINE =
  "please contact us directly at info@proofoflaunch.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(date);
}

function buildHtmlBody(p: ContactPayload, receivedAt: string): string {
  const safe = {
    name: escapeHtml(p.name),
    email: escapeHtml(p.email),
    situation: escapeHtml(p.situation || "Not specified"),
    vertical: escapeHtml(p.vertical || "Not specified"),
    platform: escapeHtml(p.platform || "Not specified"),
    message: escapeHtml(p.message || "(no message provided)").replace(
      /\n/g,
      "<br>",
    ),
    receivedAt: escapeHtml(receivedAt),
  };

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:6px;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #e5e5e5;">
          <h1 style="margin:0;font-size:18px;font-weight:600;color:#1a1a1a;">New inquiry from ${safe.name}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
            <tr>
              <td style="padding:6px 0;width:110px;color:#666;">Name:</td>
              <td style="padding:6px 0;color:#1a1a1a;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Email:</td>
              <td style="padding:6px 0;"><a href="mailto:${safe.email}" style="color:#0066cc;text-decoration:none;">${safe.email}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Situation:</td>
              <td style="padding:6px 0;color:#1a1a1a;">${safe.situation}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Vertical:</td>
              <td style="padding:6px 0;color:#1a1a1a;">${safe.vertical}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#666;">Platform:</td>
              <td style="padding:6px 0;color:#1a1a1a;">${safe.platform}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 24px;">
          <div style="font-size:13px;color:#666;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em;">Message</div>
          <div style="font-size:14px;color:#1a1a1a;background:#fafafa;border:1px solid #eee;border-radius:4px;padding:14px 16px;">${safe.message}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px 24px;border-top:1px solid #e5e5e5;font-size:12px;color:#888;">
          Received: ${safe.receivedAt}<br>
          Reply to this email to respond to ${safe.name} directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildTextBody(p: ContactPayload, receivedAt: string): string {
  return [
    `New inquiry from ${p.name}`,
    "",
    `Name:      ${p.name}`,
    `Email:     ${p.email}`,
    `Situation: ${p.situation || "Not specified"}`,
    `Vertical:  ${p.vertical || "Not specified"}`,
    `Platform:  ${p.platform || "Not specified"}`,
    "",
    "Message:",
    p.message || "(no message provided)",
    "",
    "---",
    `Received: ${receivedAt}`,
    `Reply to this email to respond to ${p.name} directly.`,
  ].join("\n");
}

export async function submitContact(
  formData: FormData,
): Promise<ContactResult> {
  const payload: ContactPayload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    situation: String(formData.get("situation") ?? "").trim(),
    vertical: String(formData.get("vertical") ?? "").trim(),
    platform: String(formData.get("platform") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email) {
    return { ok: false, error: "Name and email are required." };
  }
  if (!EMAIL_RE.test(payload.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[proof-of-launch] RESEND_API_KEY missing — cannot deliver contact submission:",
      { name: payload.name, email: payload.email },
    );
    return {
      ok: false,
      error: `Email delivery is not configured, ${FALLBACK_CONTACT_LINE}.`,
    };
  }

  const receivedAt = formatTimestamp(new Date());
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: payload.email,
      subject: `Proof of Launch — New inquiry from ${payload.name}`,
      html: buildHtmlBody(payload, receivedAt),
      text: buildTextBody(payload, receivedAt),
    });

    if (error) {
      console.error("[proof-of-launch] Resend error:", error);
      return {
        ok: false,
        error: `Email delivery failed, ${FALLBACK_CONTACT_LINE}.`,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[proof-of-launch] Contact form error:", err);
    return {
      ok: false,
      error: `Something went wrong, ${FALLBACK_CONTACT_LINE}.`,
    };
  }
}
