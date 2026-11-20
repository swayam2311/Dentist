import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// GET /api/admin/appointments
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Fetch appointments with service and dentist join
    const { data: appointments, error: aptError } = await supabase
      .from('appointments')
      .select(`
        id,
        reference_code,
        starts_at,
        ends_at,
        status,
        patient_name,
        patient_phone,
        patient_email,
        is_new_patient,
        reply_preference,
        notes,
        created_at,
        service:services(id, name, duration_minutes),
        dentist:dentists(id, full_name, role)
      `)
      .order('starts_at', { ascending: true });

    // Fetch contact requests
    const { data: contactRequests, error: conError } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (aptError) {
      // Provide simulated fallback data for staff view if local DB is offline
      const mockAppointments = [
        {
          id: 'apt-mock-1',
          reference_code: 'GDC-4F7K',
          starts_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
          ends_at: new Date(Date.now() + 24 * 3600 * 1000 + 30 * 60000).toISOString(),
          status: 'pending',
          patient_name: 'Asmita Patil',
          patient_phone: '+919987076628',
          patient_email: 'asmita@example.com',
          is_new_patient: true,
          reply_preference: 'phone',
          notes: 'Sensitive lower right molar, requested gentle examination.',
          created_at: new Date().toISOString(),
          service: { id: 's1', name: 'Free Oral Health Consultation', duration_minutes: 30 },
          dentist: { id: 'd1', full_name: 'Dr. Anand Gangal', role: 'Principal Dentist' },
        },
        {
          id: 'apt-mock-2',
          reference_code: 'GDC-89A2',
          starts_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
          ends_at: new Date(Date.now() + 48 * 3600 * 1000 + 60 * 60000).toISOString(),
          status: 'confirmed',
          patient_name: 'Sahil Desai',
          patient_phone: '+919820123456',
          patient_email: 'sahil@example.com',
          is_new_patient: false,
          reply_preference: 'whatsapp',
          notes: 'Dental implant follow-up check.',
          created_at: new Date().toISOString(),
          service: { id: 's2', name: 'Dental Implants Consultation', duration_minutes: 60 },
          dentist: { id: 'd1', full_name: 'Dr. Anand Gangal', role: 'Principal Dentist' },
        },
      ];

      return NextResponse.json({
        appointments: mockAppointments,
        contactRequests: [],
        source: 'mock',
      });
    }

    return NextResponse.json({
      appointments: appointments || [],
      contactRequests: contactRequests || [],
      source: 'database',
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch staff data.' }, { status: 500 });
  }
}

// PATCH /api/admin/appointments (Update appointment status or reschedule)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { appointmentId, newStatus, newStartsAt, newEndsAt, note } = body;

    if (!appointmentId) {
      return NextResponse.json({ error: 'appointmentId is required.' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const updatePayload: any = {};
    if (newStatus) updatePayload.status = newStatus;
    if (newStartsAt) updatePayload.starts_at = newStartsAt;
    if (newEndsAt) updatePayload.ends_at = newEndsAt;

    const { error: updateError } = await supabase
      .from('appointments')
      .update(updatePayload)
      .eq('id', appointmentId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    // Insert audit event
    await supabase.from('appointment_events').insert({
      appointment_id: appointmentId,
      actor: 'reception',
      to_status: newStatus || 'confirmed',
      note: note || `Status updated to ${newStatus} by reception desk.`,
    });

    return NextResponse.json({ success: true, message: 'Appointment updated successfully.' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update appointment.' }, { status: 500 });
  }
}

