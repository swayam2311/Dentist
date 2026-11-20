import { siteConfig } from '@/config/site.config';

export interface CalendarEventProps {
  title: string;
  description: string;
  startsAt: Date | string;
  endsAt: Date | string;
  referenceCode: string;
}

/**
 * Generates an RFC 5545 compliant .ics calendar file.
 */
export function generateIcsFile({
  title,
  description,
  startsAt,
  endsAt,
  referenceCode,
}: CalendarEventProps): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const dtStamp = formatDate(new Date());
  const dtStart = formatDate(start);
  const dtEnd = formatDate(end);
  const uid = `${referenceCode}-${start.getTime()}@gangaldentalclinic.com`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gangal Dental Clinic//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title} · Gangal Dental Clinic`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')} (Ref: ${referenceCode})`,
    `LOCATION:${siteConfig.address.fullFormatted}`,
    `STATUS:CONFIRMED`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Dental Consultation at Gangal Dental Clinic',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n');
}

/**
 * Generates a Google Calendar web intent link.
 */
export function getGoogleCalendarUrl({
  title,
  description,
  startsAt,
  endsAt,
  referenceCode,
}: CalendarEventProps): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);

  const formatGoogleDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const dates = `${formatGoogleDate(start)}/${formatGoogleDate(end)}`;
  const text = encodeURIComponent(`${title} · Gangal Dental Clinic`);
  const details = encodeURIComponent(
    `${description}\n\nBooking Reference: ${referenceCode}\nClinic Phone: ${siteConfig.contact.landline} / ${siteConfig.contact.mobile}\nAddress: ${siteConfig.address.fullFormatted}`
  );
  const location = encodeURIComponent(siteConfig.address.fullFormatted);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

