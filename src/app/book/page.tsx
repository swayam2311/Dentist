import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { StaticBookingForm } from '@/components/forms/StaticBookingForm';
import { Phone, Clock, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Schedule your unhurried dental consultation at Gangal Dental Clinic in Manpada, Thane. Compassionate, transparent family and restorative dentistry.',
};

export default function BookPage() {
  return (
    <main id="main-content" className="w-full relative py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin">
        {/* Editorial Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span>Gentle &amp; Unhurried</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[46px] text-primary tracking-tight font-normal leading-tight mb-4">
            Schedule Your Consultation
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed">
            Reserve an unhurried visit with Dr. Gangal's team in Manpada, Thane. We listen with care, explain every option clearly, and provide upfront estimates with zero obligation.
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="bg-surface-container-lowest rounded-card p-8 border border-theme-border/60 text-center font-sans text-on-surface-variant">
                  Loading reservation form...
                </div>
              }
            >
              <StaticBookingForm sourcePage="book" />
            </Suspense>
          </div>

          {/* Clinic Details & Reassurance (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Consultation Hours Card */}
            <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient">
              <div className="flex items-center gap-2 text-primary font-label-button text-label-button mb-3">
                <Clock className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <span>Consultation Sessions</span>
              </div>
              <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-on-surface-variant m-0 p-0 list-none">
                <li className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="font-medium text-on-surface">Monday – Friday</span>
                  <span>10:00 AM – 1:00 PM &amp; 6:00 PM – 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-theme-border/30">
                  <span className="font-medium text-on-surface">Saturday</span>
                  <span>10:00 AM – 5:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-1">
                  <span className="font-medium text-on-surface">Sunday</span>
                  <span className="text-secondary font-medium">Closed</span>
                </li>
              </ul>
            </div>

            {/* Reassurance Features Card */}
            <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-headline-sm text-[16px] text-primary font-medium leading-snug">
                    Zero-Pressure Advice
                  </h2>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-0.5">
                    Your first oral health consultation is complimentary. You receive an honest clinical evaluation with itemized options before committing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
                  <HeartHandshake className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-headline-sm text-[16px] text-primary font-medium leading-snug">
                    Anxious Patient Care
                  </h2>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-0.5">
                    We specialize in gentle treatment for those who have avoided the dentist. You remain in control at every second.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Telephone Support */}
            <div className="bg-surface-container rounded-card p-6 sm:p-7 border border-theme-border/40 text-left">
              <h2 className="font-serif text-[18px] text-primary mb-1 font-medium">
                Prefer to speak directly?
              </h2>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-4 leading-relaxed">
                Our reception team is happy to assist you with scheduling or dental questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={siteConfig.contact.landlineTel}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{siteConfig.contact.landline}</span>
                </a>
                <a
                  href={siteConfig.contact.mobileTel}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-surface-container-lowest border border-theme-border text-on-surface font-label-button text-label-button hover:bg-surface-container transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{siteConfig.contact.mobile}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
