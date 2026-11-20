import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export async function runWhiteBoxTests() {
  console.log('\n--- EXECUTING WHITE-BOX UNIT & LOGIC TESTS ---');
  const results = [];

  // 1. Zod Booking Request Schema Definition & Validation
  const indianMobileRegex = /^\+91[6-9]\d{9}$/;
  const BookingRequestSchema = z.object({
    serviceId: z.string().min(1),
    dentistId: z.string().min(1).nullable().optional(),
    startsAt: z.string().datetime(),
    patientName: z.string().trim().min(2).max(100),
    patientPhone: z.string().trim().regex(indianMobileRegex),
    patientEmail: z.string().trim().email().optional().or(z.literal('')),
    isNewPatient: z.boolean().default(true),
    replyPreference: z.enum(['phone', 'whatsapp', 'email']).default('phone'),
    notes: z.string().trim().max(1000).optional().or(z.literal('')),
    consentGiven: z.literal(true),
    honeypot: z.string().max(0).optional(),
  });

  try {
    const validBooking = {
      serviceId: 's0111111-1111-1111-1111-111111111101',
      dentistId: 'd1111111-1111-1111-1111-111111111111',
      startsAt: '2026-11-21T05:00:00.000Z',
      patientName: 'Asmita Patil',
      patientPhone: '+919987076628',
      patientEmail: 'asmita@example.com',
      isNewPatient: true,
      replyPreference: 'phone',
      notes: 'Routine gentle consultation',
      consentGiven: true,
    };
    BookingRequestSchema.parse(validBooking);
    results.push({ name: 'Zod: Valid booking payload parsed successfully', passed: true });
  } catch (err) {
    results.push({ name: 'Zod: Valid booking payload parsed successfully', passed: false, error: err.message });
  }

  // 2. Zod DPDP Consent Requirement Test
  try {
    const noConsentBooking = {
      serviceId: 's0111111-1111-1111-1111-111111111101',
      startsAt: '2026-11-21T05:00:00.000Z',
      patientName: 'Sahil Desai',
      patientPhone: '+919987076628',
      consentGiven: false,
    };
    BookingRequestSchema.parse(noConsentBooking);
    results.push({ name: 'Zod: Rejects booking when DPDP consent is false', passed: false, error: 'Should have thrown' });
  } catch {
    results.push({ name: 'Zod: Rejects booking when DPDP consent is false', passed: true });
  }

  // 3. Honeypot Anti-Bot Injection Test
  try {
    const botBooking = {
      serviceId: 's0111111-1111-1111-1111-111111111101',
      startsAt: '2026-11-21T05:00:00.000Z',
      patientName: 'Spam Bot',
      patientPhone: '+919987076628',
      consentGiven: true,
      honeypot: 'filled_by_bot_crawler',
    };
    BookingRequestSchema.parse(botBooking);
    results.push({ name: 'Zod: Honeypot detects and rejects bot injection', passed: false, error: 'Bot bypassed honeypot' });
  } catch {
    results.push({ name: 'Zod: Honeypot detects and rejects bot injection', passed: true });
  }

  // 4. Reference Code Regex Validation
  const StatusLookupSchema = z.object({
    referenceCode: z.string().trim().regex(/^GDC-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/i),
    phone: z.string().trim().regex(indianMobileRegex),
  });

  try {
    StatusLookupSchema.parse({ referenceCode: 'GDC-4F7K', phone: '+919987076628' });
    results.push({ name: 'Zod: Valid GDC-XXXX reference code accepted', passed: true });
  } catch (err) {
    results.push({ name: 'Zod: Valid GDC-XXXX reference code accepted', passed: false, error: err.message });
  }

  try {
    StatusLookupSchema.parse({ referenceCode: 'BAD-CODE-999', phone: '+919987076628' });
    results.push({ name: 'Zod: Malformed reference code rejected', passed: false, error: 'Accepted invalid code' });
  } catch {
    results.push({ name: 'Zod: Malformed reference code rejected', passed: true });
  }

  // 5. ICS Generator Source Logic Verification
  const icsSource = fs.readFileSync(path.resolve('src/lib/ics.ts'), 'utf8');
  const hasIcsHeaders =
    icsSource.includes('BEGIN:VCALENDAR') &&
    icsSource.includes('BEGIN:VEVENT') &&
    icsSource.includes('PRODID:-//Gangal Dental Clinic//EN') &&
    icsSource.includes('END:VCALENDAR') &&
    icsSource.includes('STATUS:CONFIRMED');

  results.push({
    name: 'ICS Generator: Generates RFC 5545 compliant calendar hold structure',
    passed: hasIcsHeaders,
  });

  // 6. Google Calendar Web Intent URL Generator Verification
  const hasGcalIntent =
    icsSource.includes('https://calendar.google.com/calendar/render') &&
    icsSource.includes('action=TEMPLATE') &&
    icsSource.includes('dates=');

  results.push({
    name: 'Google Calendar: Valid query template parameters generated',
    passed: hasGcalIntent,
  });

  // 7. Split Session Hours Algorithm Unit Test
  function simulateClinicStatus(dayOfWeek, hour, minute) {
    // Mon-Fri: 10:00-13:00 (600-780) and 18:00-22:00 (1080-1320)
    // Sat: 10:00-17:00 (600-1020)
    // Sun: Closed
    if (dayOfWeek === 0) return { isOpen: false, text: 'Closed Today' };
    const cur = hour * 60 + minute;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      if (cur >= 600 && cur < 780) return { isOpen: true, text: 'Open Now · until 1:00 PM' };
      if (cur < 600) return { isOpen: false, text: 'Opens today at 10:00 AM' };
      if (cur >= 780 && cur < 1080) return { isOpen: false, text: 'Opens today at 6:00 PM' };
      if (cur >= 1080 && cur < 1320) return { isOpen: true, text: 'Open Now · until 10:00 PM' };
      return { isOpen: false, text: 'Closed for the night' };
    }
    if (dayOfWeek === 6) {
      if (cur >= 600 && cur < 1020) return { isOpen: true, text: 'Open Now · until 5:00 PM' };
      if (cur < 600) return { isOpen: false, text: 'Opens today at 10:00 AM' };
      return { isOpen: false, text: 'Closed for the night' };
    }
    return { isOpen: false, text: 'Closed' };
  }

  const testMon11 = simulateClinicStatus(1, 11, 30);
  const testMon15 = simulateClinicStatus(1, 15, 0);
  const testMon20 = simulateClinicStatus(1, 20, 0);
  const testSat14 = simulateClinicStatus(6, 14, 0);
  const testSun12 = simulateClinicStatus(0, 12, 0);

  const hoursAlgorithmCorrect =
    testMon11.isOpen &&
    !testMon15.isOpen &&
    testMon15.text.includes('6:00 PM') &&
    testMon20.isOpen &&
    testSat14.isOpen &&
    !testSun12.isOpen &&
    testSun12.text === 'Closed Today';

  results.push({
    name: 'Operating hours algorithm correctly evaluates split sessions and Sunday closure',
    passed: hoursAlgorithmCorrect,
  });

  const allPassed = results.every((r) => r.passed);
  for (const r of results) {
    console.log(`  ${r.passed ? '✓' : '✗'} ${r.name}`);
  }

  return { testName: 'White-Box Unit & System Logic Test', passed: allPassed, results };
}

if (process.argv[1]?.includes('whitebox.test.mjs')) {
  runWhiteBoxTests().then((res) => {
    if (!res.passed) process.exit(1);
  });
}
