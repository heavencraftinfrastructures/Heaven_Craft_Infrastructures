import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Configuration -------------------------------------------------------
// All of these are environment variables so no credential ever lives in
// source control. See .env.local.example for what to set locally, and add
// the same keys under Vercel → Project → Settings → Environment Variables
// for production.
//
//   SMTP_USER               Gmail address the enquiry is sent FROM (must
//                            match the account the app password belongs to)
//   SMTP_APP_PASSWORD       16-character Gmail App Password (NOT the normal
//                            account password — generate one at
//                            https://myaccount.google.com/apppasswords)
//   CONTACT_RECIPIENT_EMAIL Where the enquiry email is delivered TO.
//                            Defaults to SMTP_USER if unset.
//
//   WHATSAPP_ACCESS_TOKEN     Meta WhatsApp Cloud API access token, from
//                             developers.facebook.com → your app →
//                             WhatsApp → API Setup.
//   WHATSAPP_PHONE_NUMBER_ID  The "Phone number ID" shown on that same page
//                             (Meta's sender number, not the owner's).
//   WHATSAPP_RECIPIENT_NUMBER Owner's WhatsApp number in international
//                             format, no "+" or spaces, e.g. 916363255811.
//                             Must be added + OTP-verified as a test
//                             recipient on that same API Setup page while
//                             using a temporary access token.
//
//   TELEGRAM_BOT_TOKEN  Token from @BotFather after creating a bot —
//                        instant, free, no business verification needed.
//   TELEGRAM_CHAT_ID    The owner's chat id with that bot (message the bot
//                        once, then read it off api.telegram.org/bot
//                        <token>/getUpdates — see setup notes).

// No hardcoded personal phone/email fallbacks here on purpose — real contact
// details belong only in .env.local (local) / Vercel env vars (production),
// never in source control. If a var is missing, that channel is skipped
// rather than silently falling back to someone's real number/inbox baked
// into the code.
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || process.env.SMTP_USER || "";
const WHATSAPP_RECIPIENT = process.env.WHATSAPP_RECIPIENT_NUMBER || "";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const NAME_RE = /^[A-Za-z\s.'-]{2,60}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9]{7,15}$/;

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || !NAME_RE.test(b.name.trim())) return false;
  if (typeof b.email !== "string" || !EMAIL_RE.test(b.email.trim())) return false;
  if (
    typeof b.phone !== "string" ||
    !PHONE_RE.test(b.phone.trim().replace(/[\s\-()]/g, ""))
  )
    return false;
  if (typeof b.projectType !== "string" || b.projectType.trim().length === 0) return false;
  if (typeof b.message !== "string") return false;
  const messageLen = b.message.trim().length;
  if (messageLen < 10 || messageLen > 3000) return false;

  return true;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildWhatsAppText(data: ContactPayload) {
  return [
    "New enquiry — Heaven Craft website",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Project Type: ${data.projectType}`,
    "",
    `Message: ${data.message}`,
  ].join("\n");
}

// Opt-in fallback link for whenever the silent Cloud API send isn't
// available yet (credentials not set, Meta account restrictions, a failed
// call, etc). Unlike the Cloud API this always works with zero setup —
// it just requires a human to tap "send" once the chat opens.
function buildWhatsAppFallbackUrl(data: ContactPayload): string | undefined {
  if (!WHATSAPP_RECIPIENT) return undefined;
  return `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(
    buildWhatsAppText(data)
  )}`;
}

// Sends the enquiry as a WhatsApp message directly via Meta's Cloud API —
// a genuine server-side, no-UI send (unlike a wa.me link, which only ever
// opens a chat window for a human to tap "send"). Returns true/false so the
// caller can report status without throwing the whole request.
async function sendWhatsAppMessage(data: ContactPayload): Promise<boolean> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId || !WHATSAPP_RECIPIENT) {
    console.warn(
      "[contact] WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_RECIPIENT_NUMBER not set — skipping WhatsApp send."
    );
    return false;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: WHATSAPP_RECIPIENT,
          type: "text",
          text: { body: buildWhatsAppText(data) },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[contact] WhatsApp send failed:", res.status, errBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[contact] WhatsApp send threw:", err);
    return false;
  }
}

// Sends the enquiry as a Telegram message — genuinely the easiest instant
// channel: no business verification, no templates, no waiting period.
// Requires the owner to have messaged the bot once so it has a chat id.
async function sendTelegramMessage(data: ContactPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — skipping Telegram send."
    );
    return false;
  }

  const text = [
    "🔔 *New enquiry — Heaven Craft website*",
    "",
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*Email:* ${data.email}`,
    `*Project Type:* ${data.projectType}`,
    "",
    `*Message:*\n${data.message}`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[contact] Telegram send failed:", res.status, errBody);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[contact] Telegram send threw:", err);
    return false;
  }
}

function buildEmailHtml(data: ContactPayload) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;color:#8a8374;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;color:#1c1c1c;font-size:14px;">${escapeHtml(value)}</td>
    </tr>`;

  return `
  <div style="background:#f4f2ee;padding:32px 16px;font-family:'Segoe UI',ui-sans-serif,system-ui,-apple-system,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e0d0;">
      <tr>
        <td style="background:linear-gradient(120deg,#e8c887,#c9a24d 45%,#b3703c);padding:22px 24px;">
          <span style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#1c1408;opacity:.75;">Heaven Craft</span>
          <h1 style="margin:4px 0 0;font-size:20px;color:#1c1408;">New Website Enquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 8px 0;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${row("Full Name", data.name)}
            ${row("Phone", data.phone)}
            ${row("Email", data.email)}
            ${row("Project Type", data.projectType)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:4px 24px 24px;">
          <div style="margin-top:8px;padding:16px;background:#faf8f3;border:1px solid #e7e0d0;border-radius:8px;color:#3a3630;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
            data.message
          )}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #e7e0d0;">
          <span style="font-size:12px;color:#9a9384;">Sent automatically from the Heaven Craft website contact form.</span>
        </td>
      </tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field before submitting." },
      { status: 400 }
    );
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_APP_PASSWORD;

  const sendEmail = async (): Promise<boolean> => {
    // Email credentials aren't configured yet (e.g. local dev without
    // .env.local, or before the Vercel env vars are set). Don't fail the
    // whole enquiry over it.
    if (!smtpUser || !smtpPass || !RECIPIENT_EMAIL) {
      console.warn(
        "[contact] SMTP_USER / SMTP_APP_PASSWORD / CONTACT_RECIPIENT_EMAIL not set — skipping email send."
      );
      return false;
    }
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({
        from: `"Heaven Craft Website" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: body.email,
        subject: `New Enquiry — ${body.name} (${body.projectType})`,
        html: buildEmailHtml(body),
      });
      return true;
    } catch (err) {
      console.error("[contact] Failed to send email:", err);
      return false;
    }
  };

  // Fire all notifications concurrently — one failing shouldn't block the
  // others, and the visitor shouldn't wait for them sequentially.
  const [emailSent, whatsappSent, telegramSent] = await Promise.all([
    sendEmail(),
    sendWhatsAppMessage(body),
    sendTelegramMessage(body),
  ]);

  // Only hand back a manual fallback link when the silent send didn't
  // happen — once the Cloud API is configured and working, no link is
  // needed and none is sent to the client.
  const whatsappFallbackUrl = whatsappSent ? undefined : buildWhatsAppFallbackUrl(body);

  return NextResponse.json({
    ok: true,
    emailSent,
    whatsappSent,
    telegramSent,
    whatsappFallbackUrl,
  });
}
