import { NextResponse } from "next/server";

const STIBEE_ENDPOINT =
  "https://stibee.com/api/v1.0/lists/3bJhw21WLIDqW91dXBNjwGYp12uQ8Q==/public/subscribers";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const body = new URLSearchParams();
    body.set("email", email);
    body.set("stb_policy", "stb_policy_true");

    const res = await fetch(STIBEE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const html = await res.text();
    const hasError = html.includes("ERROR_MSG") || html.includes("실패");

    if (res.ok && !hasError) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "stibee_error" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
