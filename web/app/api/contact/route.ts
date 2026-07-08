import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY?.trim()) {
    console.error("Missing RESEND_API_KEY for /api/contact");
    return NextResponse.json(
      { error: "Versturen is tijdelijk niet beschikbaar." },
      { status: 503 },
    );
  }

  if (
    !process.env.MAIL_FROM_EMAIL?.trim() ||
    !process.env.MAIL_FROM_NAME?.trim()
  ) {
    console.error("Missing MAIL_FROM_EMAIL or MAIL_FROM_NAME for /api/contact");
    return NextResponse.json(
      { error: "Versturen is tijdelijk niet beschikbaar." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, message, subject, company, formPhone, recaptchaToken } =
    body as {
      name: string;
      email: string;
      message: string;
      subject?: string;
      company?: string;
      formPhone?: string;
      recaptchaToken?: string;
    };

  // Verify reCAPTCHA token when a secret key is configured
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Verificatie mislukt. Probeer het opnieuw." },
        { status: 400 },
      );
    }
    const verify = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      },
    );
    const result = (await verify.json()) as {
      success: boolean;
      score?: number;
      hostname?: string;
      challenge_ts?: string;
      "error-codes"?: string[];
    };
    if (!result.success || result.score < 0.5) {
      console.warn("reCAPTCHA verification failed", {
        success: result.success,
        score: result.score,
        hostname: result.hostname,
        challengeTs: result.challenge_ts,
        errorCodes: result["error-codes"],
      });
      return NextResponse.json(
        { error: "Verificatie mislukt. Probeer het opnieuw." },
        { status: 400 },
      );
    }
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Naam, e-mail en bericht zijn verplicht." },
      { status: 400 },
    );
  }

  const emailSubject = subject?.trim()
    ? `${subject} — ${name}`
    : `Vraag van ${name}`;
  const fromAddress = `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`;
  const toAddress = process.env.MAIL_TO_EMAIL || process.env.MAIL_FROM_EMAIL!;

  const optionalRows = [
    company?.trim() &&
      `<tr><td style="padding:8px 0;color:#666;width:120px;"><strong>Bedrijf</strong></td><td style="padding:8px 0;">${company}</td></tr>`,
    formPhone?.trim() &&
      `<tr><td style="padding:8px 0;color:#666;"><strong>Telefoon</strong></td><td style="padding:8px 0;">${formPhone}</td></tr>`,
  ]
    .filter(Boolean)
    .join("");

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [toAddress],
    replyTo: email,
    subject: emailSubject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a3f6f;margin-bottom:16px;">${emailSubject}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#666;width:120px;"><strong>Naam</strong></td>
            <td style="padding:8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#666;"><strong>E-mail</strong></td>
            <td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${optionalRows}
        </table>
        <hr style="border:1px solid #eee;margin:16px 0;" />
        <p style="color:#333;line-height:1.7;">${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    const isProd = process.env.NODE_ENV === "production";
    return NextResponse.json(
      {
        error: "Versturen mislukt. Probeer het opnieuw.",
        ...(isProd
          ? {}
          : {
              debug: {
                statusCode: (error as { statusCode?: number }).statusCode,
                message: (error as { message?: string }).message,
              },
            }),
      },
      { status: 500 },
    );
  }

  console.info("Contact email queued", {
    messageId: data?.id,
    to: toAddress,
    subject: emailSubject,
  });

  return NextResponse.json({ success: true, messageId: data?.id });
}
