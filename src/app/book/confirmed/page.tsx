'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { generateIcsFile, getGoogleCalendarUrl } from '@/lib/ics';
import {
  CheckCircle2,
  Copy,
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Download,
} from 'lucide-react';

function BookingConfirmedContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'GDC-4F7K';
  const patientName = searchParams.get('name') || 'Patient';
  const serviceName = searchParams.get('service') || 'Oral Health Consultation';
  const slotTime = searchParams.get('time') || '10:30 AM';
  const slotDate = searchParams.get('date') || 'Tomorrow';
  const dentistName = searchParams.get('dentist') || 'Dr. Anand Gangal';
  const startsAt = searchParams.get('startsAt') || new Date().toISOString();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Precomputed calendar end time (+30 min)
  const startDate = new Date(startsAt);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

  const googleCalendarUrl = getGoogleCalendarUrl({
    title: `${serviceName} Consultation`,
    description: `Dental consultation with ${dentistName} at Gangal Dental Clinic.`,
    startsAt: startDate,
    endsAt: endDate,
    referenceCode: refCode,
  });

  const handleDownloadIcs = () => {
    const icsContent = generateIcsFile({
      title: `${serviceName} Consultation`,
      description: `Dental consultation with ${dentistName} at Gangal Dental Clinic.`,
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
  };

  const whatsappPrefilledUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello Gangal Dental Clinic, I have placed an appointment request with reference code ${refCode} for ${serviceName} on ${slotDate} at ${slotTime}. Please confirm my visit.`
  )}`;

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Self-drawing SVG Animated Medallion from Stitch */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-theme-secondary-container/50 scale-125 animate-pulse" />
          <svg
            className="relative w-20 h-20 drop-shadow-md"
            fill="none"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
          >
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
            <circle cx="48" cy="48" fill="#FCFAF6" r="37" />
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

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/70 mb-3 text-xs font-sans text-primary font-semibold uppercase tracking-wider">
          <span>Step 5 of 5 Complete · Reservation Logged</span>
        </div>

        <h1 className="font-serif text-[34px] sm:text-[44px] text-primary font-normal leading-tight mb-2">
          Your request is in.
        </h1>
        <p className="font-sans text-[16px] text-theme-muted max-w-md">
          Thank you, {patientName}. We have reserved this unhurried consultation time for you.
        </p>

        {/* Reference Code Pill */}
        <div className="mt-5 inline-flex items-center gap-3 bg-theme-card px-5 py-2.5 rounded-full shadow-sm border border-theme-border">
          <span className="font-sans text-[12px] uppercase tracking-wider text-theme-muted">
            Booking Reference
          </span>
          <span className="font-mono text-[16px] font-bold text-primary tracking-wider">
            {refCode}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-[12px] font-sans font-medium px-2.5 py-0.5 rounded-full bg-theme-container hover:bg-theme-container-high text-primary transition-colors focus:outline-none"
            title="Copy reference code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Main Porcelain Summary Card */}
      <div className="bg-theme-card rounded-[32px] p-6 sm:p-10 border border-theme-border shadow-ambient mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-theme-border/40">
          <div className="flex items-center gap-2 text-primary font-serif text-[20px]">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Consultation Schedule</span>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-theme-brass/10 px-3.5 py-1 rounded-full border border-theme-brass/30">
            <span className="w-2 h-2 rounded-full bg-theme-brass animate-pulse" />
            <span className="font-sans text-[12px] text-theme-brass font-semibold">
              Pending Confirmation Call
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-theme-border/40 font-sans text-[14px]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
              Clinical Service
            </span>
            <p className="font-serif text-[18px] text-primary leading-snug">{serviceName}</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
              Attending Clinician
            </span>
            <p className="font-serif text-[18px] text-theme-ink leading-snug">{dentistName}</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
              Date &amp; Day
            </span>
            <p className="font-sans text-[16px] text-theme-ink font-medium">{slotDate}</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
              Reserved Time
            </span>
            <p className="font-sans text-[16px] text-primary font-medium">{slotTime}</p>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
              Clinic Location
            </span>
            <p className="font-sans text-[15px] text-theme-ink font-medium">
              {siteConfig.address.fullFormatted}
            </p>
          </div>
        </div>

        {/* Reassurance Note */}
        <div className="p-4 rounded-2xl bg-theme-container-low/70 border border-theme-border/50 flex items-start gap-3 mt-6">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="font-sans text-[13px] text-theme-muted leading-relaxed">
            Our front-desk reception coordinator will call you to confirm health history questions during clinical desk hours (Mon–Fri 10:00 AM – 1:00 PM &amp; 6:00 PM – 10:00 PM; Sat 10:00 AM – 5:00 PM).
          </p>
        </div>

        {/* Calendar & WhatsApp Actions Suite */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-6">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 min-h-[46px] rounded-full bg-theme-card border border-theme-border text-theme-ink font-sans text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-theme-container transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-primary" />
            <span>Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto flex-1 min-h-[46px] rounded-full bg-theme-card border border-theme-border text-theme-ink font-sans text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-theme-container transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Download .ics file</span>
          </button>

          <a
            href={whatsappPrefilledUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 min-h-[46px] rounded-full bg-theme-secondary-container text-theme-ink font-sans text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-theme-secondary transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Return Links */}
      <div className="flex items-center justify-center gap-6 font-sans text-[14px]">
        <Link href="/" className="text-theme-muted hover:text-primary transition-colors">
          Return to Home
        </Link>
        <span className="text-theme-border">·</span>
        <Link href="/book/status" className="text-primary font-medium hover:underline">
          Check Reservation Status
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-sans text-theme-muted">Loading booking confirmation...</div>}>
      <BookingConfirmedContent />
    </Suspense>
  );
}

