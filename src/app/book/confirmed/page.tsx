'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { generateIcsFile, getGoogleCalendarUrl } from '@/lib/ics';
import { TeamAvatar } from '@/components/ui/TeamAvatar';
import {
  CalendarCheck,
  Calendar,
  Clock,
  MapPin,
  Check,
  Download,
  Mail,
  ChevronDown,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Phone,
  TimerOff,
  Headphones,
  Smile,
} from 'lucide-react';

function BookingConfirmedContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || 'GDC-4F7K';
  const patientName = searchParams.get('name') || 'Patient';
  const serviceName = searchParams.get('service') || 'Free First Oral Consultation';
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
    <main id="main-content" className="flex flex-col w-full relative py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin relative z-10">
        {/* Confirmation Header */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary-container/60 text-primary flex items-center justify-center shadow-sm">
              <Check className="w-10 h-10 text-primary" strokeWidth={2.5} aria-hidden="true" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-secondary-container/60 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            <span className="font-label-eyebrow text-label-eyebrow text-primary tracking-widest uppercase">
              Appointment Request Received
            </span>
          </div>

          <h1 className="font-serif text-[36px] sm:text-[46px] text-primary tracking-tight font-normal leading-tight mb-3">
            Your request is received.
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant max-w-lg mb-6 leading-relaxed">
            We have recorded your consultation request, <strong className="text-on-surface">{patientName}</strong>. Our front desk reception will review our schedule and contact you shortly.
          </p>

          {/* Reference Code Pill */}
          <div className="inline-flex items-center gap-3 bg-surface-container-lowest px-5 py-2.5 rounded-full shadow-sm border border-theme-border/60">
            <span className="font-label-caption text-label-caption text-on-surface-variant uppercase tracking-wider">
              Booking Reference:
            </span>
            <span className="font-mono text-body-md font-bold text-primary tracking-wider" id="bookingCode">
              {refCode}
            </span>
            <button
              type="button"
              className="font-label-caption text-label-caption text-primary hover:underline bg-surface-container px-3 py-1 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={handleCopy}
              title="Copy reference code"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </section>

        {/* Main Appointment Summary Card */}
        <div className="max-w-[760px] mx-auto bg-surface-container-lowest rounded-card p-6 sm:p-10 shadow-ambient border border-theme-border/60 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-theme-border/40">
            <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
              <CalendarCheck className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              <span>Consultation Summary</span>
            </div>
            <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-secondary-container px-3.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="font-label-caption text-label-caption text-primary font-semibold tracking-wide">
                Pending Coordinator Confirmation
              </span>
            </div>
          </div>

          {/* Details Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-6">
            {/* Service (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between bg-surface-container p-5 rounded-2xl">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest mb-1 block">
                  Requested Service
                </span>
                <h2 className="font-headline-sm text-[18px] text-primary mb-1 font-medium">{serviceName}</h2>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  Includes comprehensive oral assessment and transparent consultation roadmap.
                </p>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-secondary font-label-caption text-label-caption">
                <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Complimentary First Consultation Available</span>
              </div>
            </div>

            {/* Doctor Profile (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between bg-surface-container p-5 rounded-2xl">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest mb-1 block">
                  Attending Clinician
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <TeamAvatar
                    name={dentistName}
                    initials={dentistName.includes('Padma') ? 'PK' : 'AG'}
                    size="sm"
                  />
                  <div>
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface leading-tight">{dentistName}</h3>
                    <p className="font-label-caption text-label-caption text-on-surface-variant">
                      {dentistName.includes('Padma') ? 'Associate Dentist' : 'Principal Dentist'}
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-label-caption text-label-caption text-secondary mt-3">
                Gangal Dental Clinic, Manpada
              </p>
            </div>

            {/* Date & Day (6 cols) */}
            <div className="md:col-span-6 flex items-start gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-theme-border/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block">
                  Requested Date
                </span>
                <p className="font-headline-sm text-[16px] text-on-surface font-semibold">{slotDate}</p>
                <span className="font-label-caption text-label-caption text-on-surface-variant">
                  Calendar hold
                </span>
              </div>
            </div>

            {/* Time & Duration (6 cols) */}
            <div className="md:col-span-6 flex items-start gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-theme-border/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block">
                  Preferred Session
                </span>
                <p className="font-headline-sm text-[16px] text-on-surface font-semibold">{slotTime}</p>
                <span className="font-label-caption text-label-caption text-primary font-medium">
                  Unhurried time buffer
                </span>
              </div>
            </div>

            {/* Location Information (12 cols) */}
            <div className="md:col-span-12 flex items-start gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-theme-border/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
                  Clinic Location
                </span>
                <p className="font-body-md text-body-md text-on-surface font-semibold mt-0.5">
                  Shop No. 26, 28, 29, Happy Valley Shopping Complex
                </p>
                <p className="font-body-md text-[13px] text-on-surface-variant">
                  Tikujiniwadi Road, Manpada, Thane West, Maharashtra 400610
                </p>
              </div>
            </div>
          </div>

          {/* Reassurance Notice */}
          <div className="bg-secondary-container/40 rounded-2xl p-5 flex items-start gap-3 border border-secondary-container mb-6">
            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-body-md text-body-md font-bold text-primary mb-0.5">
                Reception Coordinator Verification
              </h3>
              <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                Our front desk will contact you to confirm timing details during clinic hours (Mon–Fri 10:00 AM – 1:00 PM &amp; 6:00 PM – 10:00 PM; Sat 10:00 AM – 5:00 PM). If you submitted this after hours, we will reach out right as clinic doors open.
              </p>
            </div>
          </div>

          {/* Actions Suite */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-theme-border/40">
            {/* Add to Calendar Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Add to Calendar</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-surface-container-lowest rounded-2xl shadow-xl p-2 z-30 border border-theme-border/60">
                  <a
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-body-md text-[14px] text-on-surface hover:bg-surface-container transition-colors"
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Google Calendar</span>
                  </a>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl font-body-md text-[14px] text-on-surface hover:bg-surface-container transition-colors text-left"
                    onClick={handleDownloadIcs}
                  >
                    <Download className="w-4 h-4 text-secondary" aria-hidden="true" />
                    <span>Apple / iCal (.ics)</span>
                  </button>
                  <a
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-body-md text-[14px] text-on-surface hover:bg-surface-container transition-colors"
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Mail className="w-4 h-4 text-secondary" aria-hidden="true" />
                    <span>Outlook Calendar</span>
                  </a>
                </div>
              )}
            </div>

            {/* WhatsApp Chat */}
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-button text-label-button hover:bg-secondary-fixed transition-colors w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              href={whatsappPrefilledUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Reception</span>
            </a>

            {/* Back to Home */}
            <Link
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-full text-on-surface-variant hover:text-primary font-label-button text-label-button transition-colors"
              href="/"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>

        {/* Helpful Pre-Visit Reassurance Section */}
        <section className="max-w-[960px] mx-auto mt-16">
          <div className="text-center mb-8">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
              Thoughtful Preparation
            </span>
            <h2 className="font-serif text-[26px] sm:text-[32px] text-primary mt-1 font-normal">
              What to expect during your first visit
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-1">
              Designed around gentle pacing, patient comfort, and complete clinical transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-card shadow-ambient border border-theme-border/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-4 text-primary">
                  <TimerOff className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-2 font-medium">
                  Unhurried Spacing
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  We schedule generous buffers between visits. Your treatment suite is prepared with care prior to arrival.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-card shadow-ambient border border-theme-border/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-4 text-primary">
                  <Headphones className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-2 font-medium">
                  Calm Environment
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  Experience a soothing atmosphere crafted to ease anxiety from the moment you enter our doors.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-card shadow-ambient border border-theme-border/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-4 text-primary">
                  <Smile className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-2 font-medium">
                  Patient Autonomy
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  We discuss treatment recommendations and answer questions thoroughly before proceeding with any care.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
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
