import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, subject } = body as {
    name: string;
    email: string;
    message: string;
    subject?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Naam, e-mail en bericht zijn verplicht." },
      { status: 400 },
    );
  }

  const emailSubject = subject || `Vraag van ${name}`;
  const fromAddress = `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`;
  const toAddress = process.env.MAIL_TO_EMAIL || process.env.MAIL_FROM_EMAIL!;

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [toAddress],
    replyTo: email,
    subject: emailSubject,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3f6f;">${emailSubject}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 100px;"><strong>Naam</strong></td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>E-mail</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
        <hr style="border: 1px solid #eee; margin: 16px 0;" />
        <p style="color: #333; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Versturen mislukt. Probeer het opnieuw." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
