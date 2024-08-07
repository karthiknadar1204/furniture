import { Resend } from 'resend';
import KoalaWelcomeEmail from "@/emails/index";
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'karthiknadar1204@gmail.com',
      subject: subject,
      react: KoalaWelcomeEmail({ 
        name,
        email,
        subject,
        message
      }),
    });

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json({
      status: 'ok',
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
