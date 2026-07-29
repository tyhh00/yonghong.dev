import { NextResponse } from "next/server";
import { Resend } from "resend";

// Runs on Cloudflare Pages' edge runtime.
export const runtime = "edge";

/**
 * The recipient is kept server-side only — it is never shipped to the client,
 * so the email address stays hidden from scrapers. Configure via env in
 * production; falls back to the known private inbox.
 */
const TO = process.env.CONTACT_TO ?? "tanyonghong.prv@gmail.com";
// Resend requires a verified domain to send from; onboarding@resend.dev works
// out of the box for delivering to the account owner while a domain is set up.
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans don't.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);

  if (!name || name.length > 120)
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  if (!isEmail(email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  if (message.length < 10 || message.length > 5000)
    return NextResponse.json(
      { error: "Message must be between 10 and 5000 characters." },
      { status: 422 }
    );

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — fail gracefully with a clear signal.
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Reach me on LinkedIn or X in the meantime." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Portfolio · new message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }
}
