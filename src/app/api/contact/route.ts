import { NextRequest, NextResponse } from 'next/server';
import { ContactRequestSchema } from '@/lib/types';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAdminClient } from '@/lib/supabase/admin';
import { siteConfig } from '@/config/site.config';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const rateCheck = checkRateLimit(`contact:${clientIp}`, 5, 300); // 5 messages per 5 minutes
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a few moments before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = ContactRequestSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || 'Please check the required contact fields.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, phone, email, message, replyPreference, honeypot } = parseResult.data;

    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: 'Spam submission rejected.' }, { status: 400 });
    }

    // Save to Supabase contact_requests table
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from('contact_requests').insert({
      name,
      phone,
      email: email || null,
      message,
      reply_preference: replyPreference,
      consent: true,
      status: 'new',
    });

    // Notify Clinic via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Gangal Dental Clinic <contact@gangaldentalclinic.com>',
          to: process.env.NOTIFICATION_EMAIL || siteConfig.contact.email,
          subject: `[Website Inquiry] From ${name}`,
          html: `
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Reply Preference:</strong> ${replyPreference}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        });
      } catch (mailErr) {
        console.error('Contact notification email error:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. Our reception team will get in touch with you shortly.',
    });
  } catch (err: any) {
    console.error('Contact request error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please call the clinic directly at 022 25891949.' },
      { status: 500 }
    );
  }
}

