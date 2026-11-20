import { NextRequest, NextResponse } from 'next/server';
import { StatusLookupSchema } from '@/lib/types';
import { checkRateLimit } from '@/lib/rate-limit';
import { createAdminClient } from '@/lib/supabase/admin';

// POST /api/appointments/status
export async function POST(request: NextRequest) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const rateCheck = checkRateLimit(`status_lookup:${clientIp}`, 10, 60);
    if (!rateCheck.success) {
      return NextResponse.json({ error: 'Too many lookup requests. Please wait a minute.' }, { status: 429 });
    }

    const body = await request.json();
    const parseResult = StatusLookupSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid reference code or phone number.' },
        { status: 400 }
      );
    }

    const { referenceCode, phone } = parseResult.data;
    const supabase = createAdminClient();

    const { data: appointment, error } = await supabase
      .from('appointments')
      .select(`
        id,
        reference_code,
        starts_at,
        ends_at,
        status,
        patient_name,
        patient_phone,
        service:services(name, duration_minutes),
        dentist:dentists(full_name, role)
      `)
      .eq('reference_code', referenceCode.toUpperCase())
      .eq('patient_phone', phone)
      .single();

    if (error || !appointment) {
      return NextResponse.json(
        { error: 'No matching appointment found with the provided reference code and phone number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve booking status.' }, { status: 500 });
  }
}

// PATCH /api/appointments/status (Request cancellation)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { referenceCode, phone, reason } = body;

    const supabase = createAdminClient();

    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('id, status')
      .eq('reference_code', referenceCode)
      .eq('patient_phone', phone)
      .single();

    if (error || !appointment) {
      return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    if (['cancelled', 'completed'].includes(appointment.status)) {
      return NextResponse.json(
        { error: `Cannot cancel an appointment that is already ${appointment.status}.` },
        { status: 400 }
      );
    }

    // Update status to cancelled
    await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', appointment.id);

    // Write audit event
    await supabase.from('appointment_events').insert({
      appointment_id: appointment.id,
      actor: 'patient',
      from_status: appointment.status,
      to_status: 'cancelled',
      note: reason || 'Cancelled by patient via status portal.',
    });

    return NextResponse.json({ success: true, message: 'Your appointment has been cancelled.' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to cancel appointment.' }, { status: 500 });
  }
}

