import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// GET /api/slots?serviceId=...&dentistId=...&date=...
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    const dentistId = searchParams.get('dentistId') || null;
    const date = searchParams.get('date');

    if (!serviceId || !date) {
      return NextResponse.json(
        { error: 'serviceId and date query parameters are required.' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Call get_available_slots RPC function
    const { data: slots, error } = await supabase.rpc('get_available_slots', {
      p_service_id: serviceId,
      p_dentist_id: dentistId === 'first_available' ? null : dentistId,
      p_date: date,
    });

    if (error) {
      // If Supabase RPC is not seeded or offline, provide algorithmic fallback slots
      // based on verified clinic hours: Mon-Fri 10:00-13:00 & 18:00-22:00; Sat 10:00-17:00; Sun closed.
      const fallbackSlots = generateAlgorithmicSlots(date);
      return NextResponse.json({ slots: fallbackSlots, source: 'fallback' });
    }

    return NextResponse.json({ slots: slots || [], source: 'database' });
  } catch (err: any) {
    const date = new URL(request.url).searchParams.get('date') || '';
    const fallbackSlots = generateAlgorithmicSlots(date);
    return NextResponse.json({ slots: fallbackSlots, source: 'fallback' });
  }
}

function generateAlgorithmicSlots(dateStr: string) {
  if (!dateStr) return [];
  const [year, month, day] = dateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const dayOfWeek = targetDate.getDay(); // 0 = Sun, 6 = Sat

  if (dayOfWeek === 0) return []; // Sunday closed

  const now = new Date();
  const leadTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours minimum lead time

  const slots: any[] = [];
  const times: { time: string; period: 'Morning' | 'Evening'; h: number; m: number }[] = [];

  // Morning session (10:00 AM - 1:00 PM) for Mon-Sat
  times.push({ time: '10:00 AM', period: 'Morning', h: 10, m: 0 });
  times.push({ time: '10:30 AM', period: 'Morning', h: 10, m: 30 });
  times.push({ time: '11:00 AM', period: 'Morning', h: 11, m: 0 });
  times.push({ time: '11:30 AM', period: 'Morning', h: 11, m: 30 });
  times.push({ time: '12:00 PM', period: 'Morning', h: 12, m: 0 });
  times.push({ time: '12:30 PM', period: 'Morning', h: 12, m: 30 });

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Mon-Fri Evening (6:00 PM - 10:00 PM, 21:30 is last 30m slot before 22:00 close)
    times.push({ time: '06:00 PM', period: 'Evening', h: 18, m: 0 });
    times.push({ time: '06:30 PM', period: 'Evening', h: 18, m: 30 });
    times.push({ time: '07:00 PM', period: 'Evening', h: 19, m: 0 });
    times.push({ time: '07:30 PM', period: 'Evening', h: 19, m: 30 });
    times.push({ time: '08:00 PM', period: 'Evening', h: 20, m: 0 });
    times.push({ time: '08:30 PM', period: 'Evening', h: 20, m: 30 });
    times.push({ time: '09:00 PM', period: 'Evening', h: 21, m: 0 });
    times.push({ time: '09:30 PM', period: 'Evening', h: 21, m: 30 });
  } else if (dayOfWeek === 6) {
    // Saturday afternoon up to 17:00 (16:30 is last slot)
    times.push({ time: '02:00 PM', period: 'Evening', h: 14, m: 0 });
    times.push({ time: '02:30 PM', period: 'Evening', h: 14, m: 30 });
    times.push({ time: '03:00 PM', period: 'Evening', h: 15, m: 0 });
    times.push({ time: '03:30 PM', period: 'Evening', h: 15, m: 30 });
    times.push({ time: '04:00 PM', period: 'Evening', h: 16, m: 0 });
    times.push({ time: '04:30 PM', period: 'Evening', h: 16, m: 30 });
  }

  for (const t of times) {
    const slotDate = new Date(year, month - 1, day, t.h, t.m);
    if (slotDate >= leadTime) {
      slots.push({
        dentist_id: 'd1111111-1111-1111-1111-111111111111',
        dentist_name: 'Dr. Anand Gangal',
        starts_at: slotDate.toISOString(),
        ends_at: new Date(slotDate.getTime() + 30 * 60 * 1000).toISOString(),
        time_display: t.time,
        period: t.period,
      });
    }
  }

  return slots;
}

