import { siteConfig, DaySchedule } from '@/config/site.config';

export interface ClinicStatus {
  isOpen: boolean;
  statusText: string;
  nextSessionText?: string;
  badgeColor: 'teal' | 'brass' | 'amber' | 'neutral';
}

/**
 * Returns clinic operational status computed in Asia/Kolkata timezone.
 * Handles split sessions (10:00-13:00 and 18:00-22:00), Saturday 10:00-17:00, and Sunday closed.
 */
export function getClinicStatus(referenceDate: Date = new Date()): ClinicStatus {
  // Convert current UTC/local date to Asia/Kolkata components
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: siteConfig.timezone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(referenceDate);
  let weekdayStr = '';
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekdayStr = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const currentDayOfWeek = weekdayMap[weekdayStr] ?? 1;
  const currentMinutes = hour * 60 + minute;

  const todaySchedule: DaySchedule = siteConfig.schedule[currentDayOfWeek];

  if (!todaySchedule || !todaySchedule.isOpen || todaySchedule.sessions.length === 0) {
    // Sunday / Closed today -> Find next opening day (usually Monday 10:00 AM)
    return {
      isOpen: false,
      statusText: 'Closed Today',
      nextSessionText: 'Opens Mon at 10:00 AM',
      badgeColor: 'neutral',
    };
  }

  // Check today's sessions
  for (let i = 0; i < todaySchedule.sessions.length; i++) {
    const session = todaySchedule.sessions[i];
    const [startH, startM] = session.start.split(':').map(Number);
    const [endH, endM] = session.end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    // Currently within a session
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      const formattedClose = format12Hour(session.end);
      return {
        isOpen: true,
        statusText: `Open Now · until ${formattedClose}`,
        badgeColor: 'teal',
      };
    }

    // Before this session today
    if (currentMinutes < startMinutes) {
      const formattedOpen = format12Hour(session.start);
      return {
        isOpen: false,
        statusText: `Opens today at ${formattedOpen}`,
        nextSessionText: `Session until ${format12Hour(session.end)}`,
        badgeColor: 'brass',
      };
    }
  }

  // After all sessions today -> Look at tomorrow
  const nextDayOfWeek = (currentDayOfWeek + 1) % 7;
  const tomorrowSchedule = siteConfig.schedule[nextDayOfWeek];

  if (tomorrowSchedule && tomorrowSchedule.isOpen && tomorrowSchedule.sessions.length > 0) {
    const nextStart = format12Hour(tomorrowSchedule.sessions[0].start);
    return {
      isOpen: false,
      statusText: 'Closed for the night',
      nextSessionText: `Opens tomorrow at ${nextStart}`,
      badgeColor: 'neutral',
    };
  }

  // Tomorrow is Sunday (e.g., Saturday evening)
  return {
    isOpen: false,
    statusText: 'Closed until Monday',
    nextSessionText: 'Opens Mon at 10:00 AM',
    badgeColor: 'neutral',
  };
}

function format12Hour(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const minStr = m === 0 ? '' : `:${m.toString().padStart(2, '0')}`;
  return `${hour12}${minStr} ${period}`;
}

