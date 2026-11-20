'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { generateIcsFile, getGoogleCalendarUrl } from '@/lib/ics';

function BookingConfirmedContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'GDC-4F7K';
  const patientName = searchParams.get('name') || 'Patient';
  const serviceName = searchParams.get('service') || 'Free First Consultation';
  const slotTime = searchParams.get('time') || '10:45 AM';
  const slotDate = searchParams.get('date') || 'Thursday, 14 Nov 2025';
  const dentistName = searchParams.get('dentist') || 'Dr. Anand Gangal';
  const startsAt = searchParams.get('startsAt') || new Date().toISOString();

  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Precomputed calendar end time (+45 min)
  const startDate = new Date(startsAt);
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

  const googleCalendarUrl = getGoogleCalendarUrl({
    title: `${serviceName} Consultation`,
    description: `Dental consultation with ${dentistName} at Gangal Dental Clinic. Reference: ${refCode}`,
    startsAt: startDate,
    endsAt: endDate,
    referenceCode: refCode,
  });

  const handleDownloadIcs = () => {
    const icsContent = generateIcsFile({
      title: `${serviceName} Consultation`,
      description: `Dental consultation with ${dentistName} at Gangal Dental Clinic. Reference: ${refCode}`,
      startsAt: startDate,
      endsAt: endDate,
      referenceCode: refCode,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Gangal-Dental-${refCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDropdownOpen(false);
  };

  const whatsappPrefilledUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello Gangal Dental Clinic, I have placed an appointment request with reference code ${refCode} for ${serviceName} on ${slotDate} at ${slotTime}. Please confirm my visit.`
  )}`;

  return (
    <div className="flex flex-col w-full relative">
      {/* Top Ambient Glow Accents (Restorative Sanctuary Mood) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-secondary-container/40 rounded-full blur-[110px] pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-tertiary-fixed/30 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin pt-space-md pb-space-xl relative z-10">
          {/* Confirmation Header */}
          <section className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-lg">
            {/* Self-drawing SVG Animated Medallion */}
            <div className="relative flex items-center justify-center mb-space-md">
              <div className="absolute inset-0 rounded-full bg-secondary-container/50 scale-125 animate-pulse" />
              <svg
                className="relative w-24 h-24 drop-shadow-[0_8px_24px_rgba(27,107,111,0.18)]"
                fill="none"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer circle ring */}
                <circle
                  className="animate-[dash_1.2s_cubic-bezier(0.65,0,0.35,1)_forwards]"
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#1B6B6F"
                  strokeDasharray="264"
                  strokeDashoffset="264"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                {/* Soft inner wash */}
                <circle cx="48" cy="48" fill="#FCFAF6" r="37" />
                {/* Inner delicate tick mark */}
                <path
                  className="animate-[check_0.8s_cubic-bezier(0.65,0,0.35,1)_0.7s_forwards]"
                  d="M30 49.5L42.5 61.5L66 36.5"
                  stroke="#1B6B6F"
                  strokeDasharray="60"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* Step Chip */}
            <div className="inline-flex items-center gap-space-xs bg-secondary-container/60 px-space-md py-1.5 rounded-full mb-space-sm shadow-[0_2px_8px_rgba(15,46,51,0.04)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-label-eyebrow text-label-eyebrow text-primary tracking-widest uppercase">
                Appointment Request Received · Step 4 of 4 Complete
              </span>
            </div>

            {/* Headline & Calming Reassurance Subtitle */}
            <h1 className="font-display-hero text-display-hero text-on-surface mb-space-xs tracking-tight">
              Your request is in.
            </h1>
            <p className="font-body-xl text-body-xl text-on-surface-variant max-w-lg mb-space-md">
              We have reserved this unhurried time for you, {patientName}. Sit back, breathe easy, and relax.
            </p>

            {/* Reference Code Pill */}
            <div className="inline-flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-[0_8px_24px_-4px_rgba(15,46,51,0.06)] border border-tertiary-fixed-dim/40">
              <span className="font-label-caption text-label-caption text-on-surface-variant uppercase tracking-wider">
                Booking Reference
              </span>
              <span className="font-mono text-body-md font-semibold text-primary tracking-wider" id="bookingCode">
                {refCode}
              </span>
              <button
                className="font-label-caption text-label-caption text-secondary hover:text-primary transition-colors bg-secondary-container/40 px-2.5 py-0.5 rounded-full cursor-pointer focus:outline-none"
                onClick={handleCopy}
                title="Copy code"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </section>

          {/* Main Porcelain Summary Card */}
          <div className="max-w-[760px] mx-auto bg-surface-container-lowest rounded-lg p-space-md lg:p-space-lg shadow-[0_16px_40px_-6px_rgba(15,46,51,0.07),0_4px_16px_-2px_rgba(15,46,51,0.03)] border border-tertiary-fixed/30 relative">
            {/* Status Header Pill inside Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-surface-container">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">event_available</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">Consultation Schedule</span>
              </div>
              <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-tertiary-fixed/40 px-space-sm py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
                </span>
                <span className="font-label-caption text-label-caption text-tertiary font-semibold tracking-wide">
                  Pending Confirmation Call
                </span>
              </div>
            </div>

            {/* Appointment Specifics Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md py-space-lg">
              {/* Treatment Service Details (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between bg-surface-container-low/50 p-space-md rounded-DEFAULT">
                <div>
                  <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest mb-1 block">
                    Clinical Service
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{serviceName}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Includes clinical oral assessment, personalized comfort consultation &amp; zero-obligation treatment roadmap.
                  </p>
                </div>
                <div className="mt-space-sm inline-flex items-center gap-1.5 text-secondary font-label-caption text-label-caption">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Complimentary · Zero Hidden Costs</span>
                </div>
              </div>

              {/* Doctor Profile Snippet (5 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between bg-surface-container-low/50 p-space-md rounded-DEFAULT">
                <div>
                  <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest mb-1 block">
                    Attending Clinician
                  </span>
                  <div className="flex items-center gap-space-sm mt-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex-shrink-0 border border-primary/20">
                      <img
                        className="w-full h-full object-cover"
                        alt={dentistName}
                        src={
                          dentistName.includes('Padma')
                            ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4zv7U8kS8crq8WeyMLRokdrxFAV5fJomw6ztoztgKDTKTItfJq9_x4bY3RNE_LYRYReOs7sZlNQwAXFKyBK1BE8i7CdRKCTEmJt3FfJSsOUE1g22qb4Z6md7TvLs_jXQvG9PSBNe0XQEf254rnu3mYeSjmHdace1GvsK8r4AB_hsSPlpGCiob2csoew5fJA3JimaK-08TG1VRAZvdxbyfTkGxQIYAKUhNXAJ8ileM'
                            : 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8pfOUpW-NXtmc44ucf3eQshWrh7D2icKik3baiaUsl2PYEiJzv8ZLRhfosrSHwrUIfiUadfNY6sgQx3dn7KJ1vIV75fsJdmCKaIa2b2WoebqfK87YNVWxg_X400xE0VyC_YM8mC8g-XzmJxICOnrr-Vt2Kpw6J2vU4EeOFvATqea5GITdCTo7nYEeuHG7HGKQI-8-GZlgA9sTy_QSC1AEpbFen5N9ty7suLZWR9Hw'
                        }
                      />
                    </div>
                    <div>
                      <h4 className="font-body-lg text-body-lg font-bold text-on-surface leading-tight">{dentistName}</h4>
                      <p className="font-label-caption text-label-caption text-on-surface-variant">
                        {dentistName.includes('Padma') ? 'Associate Dentist' : 'Principal Dentist'}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-label-caption text-label-caption text-secondary mt-space-sm">
                  Gangal Dental Clinic, Manpada
                </p>
              </div>

              {/* Date & Day (6 cols) */}
              <div className="md:col-span-6 flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-[0_4px_16px_rgba(15,46,51,0.03)] border border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </div>
                <div>
                  <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block">
                    Date &amp; Day
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-normal">{slotDate}</p>
                  <span className="font-label-caption text-label-caption text-on-surface-variant">
                    Reserved calendar hold
                  </span>
                </div>
              </div>

              {/* Time & Duration (6 cols) */}
              <div className="md:col-span-6 flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-[0_4px_16px_rgba(15,46,51,0.03)] border border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block">
                    Reserved Time
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-normal">{slotTime}</p>
                  <span className="font-label-caption text-label-caption text-primary font-medium">
                    Dedicated unhurried session
                  </span>
                </div>
              </div>

              {/* Location Information (12 cols) */}
              <div className="md:col-span-12 flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-[0_4px_16px_rgba(15,46,51,0.03)] border border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[22px]">apartment</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
                      Clinic Location
                    </span>
                    <span className="font-label-caption text-label-caption text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">local_parking</span> Step-Free Entry &amp; Ground Floor Access
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-semibold mt-1">
                    Shop No. 26, 28, 29, Happy Valley Shopping Complex
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Tikujiniwadi Road, Manpada, Thane West, Maharashtra 400610
                  </p>
                </div>
              </div>
            </div>

            {/* Reassurance Notice Box */}
            <div className="bg-secondary-container/35 rounded-DEFAULT p-space-md flex items-start gap-space-sm border border-secondary-container">
              <span className="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5">ring_volume</span>
              <div className="text-on-surface">
                <h5 className="font-body-md text-body-md font-bold text-primary mb-0.5">
                  Prompt Care Team Verification
                </h5>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Our front-desk reception coordinator will call you to confirm health history questions during clinical desk hours (Mon–Fri 10:00 AM – 1:00 PM &amp; 6:00 PM – 10:00 PM; Sat 10:00 AM – 5:00 PM). If this reservation was placed after hours, we will connect right when clinic doors open.
                </p>
              </div>
            </div>

            {/* Actions Suite */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-space-sm mt-space-lg pt-space-md border-t border-surface-container">
              {/* Add to Calendar Button with Interactive Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-space-lg rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_4px_16px_-2px_rgba(0,82,85,0.25)] hover:bg-primary-container transition-all"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                  <span>Add to Calendar</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-surface-container-lowest rounded-DEFAULT shadow-[0_12px_32px_rgba(15,46,51,0.12)] p-2 z-30 border border-surface-container">
                    <a
                      className="flex items-center gap-2 px-3 py-2 rounded font-body-md text-body-md text-on-surface hover:bg-surface-container transition-colors"
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">event</span>
                      <span>Google Calendar</span>
                    </a>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded font-body-md text-body-md text-on-surface hover:bg-surface-container transition-colors text-left"
                      onClick={handleDownloadIcs}
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">file_download</span>
                      <span>Apple / iCal (.ics)</span>
                    </button>
                    <a
                      className="flex items-center gap-2 px-3 py-2 rounded font-body-md text-body-md text-on-surface hover:bg-surface-container transition-colors"
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">mail</span>
                      <span>Outlook Calendar</span>
                    </a>
                  </div>
                )}
              </div>

              {/* WhatsApp Chat Reassurance */}
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-space-lg rounded-full bg-surface-container-lowest text-on-surface font-label-button text-label-button border border-tertiary-fixed/60 hover:bg-secondary-container/30 transition-all"
                href={whatsappPrefilledUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">chat</span>
                <span>WhatsApp Us</span>
              </a>

              {/* Back to Home */}
              <Link
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-space-md rounded-full text-on-surface-variant hover:text-primary font-label-button text-label-button transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Helpful Pre-Visit Reassurance Section */}
          <section className="max-w-[960px] mx-auto mt-space-xl">
            <div className="text-center mb-space-md">
              <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
                Thoughtful Preparation
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
                What to expect during your first visit
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-1">
                Designed entirely around calm pacing, sensory gentleness, and complete clinical transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Comfort Card 1 */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-[0_8px_24px_rgba(15,46,51,0.04)] border border-tertiary-fixed/20 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center mb-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">timer_off</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                    Zero Waiting Room Congestion
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We space our appointments generously. Your private treatment suite is sanitized, prepared, and ready the moment you walk through our doors.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center text-secondary font-label-caption text-label-caption">
                  <span>Never double-booked</span>
                </div>
              </div>

              {/* Comfort Card 2 */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-[0_8px_24px_rgba(15,46,51,0.04)] border border-tertiary-fixed/20 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center mb-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">headphones</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                    Sensory Comfort Choices
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Enjoy a peaceful environment tuned to gentle soundscapes and calming overhead ambient lighting designed to reduce anxiety.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center text-secondary font-label-caption text-label-caption">
                  <span>Patient-controlled comfort</span>
                </div>
              </div>

              {/* Comfort Card 3 */}
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-[0_8px_24px_rgba(15,46,51,0.04)] border border-tertiary-fixed/20 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center mb-space-sm text-primary">
                    <span className="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                    No-Pressure Dialogue
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We sit face-to-face to understand your comfort boundaries and dental wishes before any instrument is even touched.
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center text-secondary font-label-caption text-label-caption">
                  <span>Listen first philosophy</span>
                </div>
              </div>
            </div>
          </section>

          {/* Immediate Clinical Help / Dental Pain Strip */}
          <section className="max-w-[760px] mx-auto mt-space-lg">
            <div className="bg-surface-container-high/60 rounded-full px-space-lg py-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-xs shadow-[0_4px_16px_rgba(15,46,51,0.03)] border border-outline-variant/30">
              <div className="flex items-center gap-space-xs text-center sm:text-left">
                <span className="material-symbols-outlined text-error text-[20px] flex-shrink-0">medical_services</span>
                <span className="font-body-md text-body-md text-on-surface">
                  Need to reschedule immediately or currently coping with dental discomfort?
                </span>
              </div>
              <a
                className="font-label-button text-label-button text-primary hover:text-primary-container flex items-center gap-1 whitespace-nowrap"
                href={siteConfig.contact.landlineTel}
              >
                <span>Call 022 2589 1949</span>
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-body-md text-on-surface-variant">
          Loading booking confirmation...
        </div>
      }
    >
      <BookingConfirmedContent />
    </Suspense>
  );
}
