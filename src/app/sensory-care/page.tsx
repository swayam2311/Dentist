import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { Shield, Sparkles, HeartHandshake, Phone, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sensory Comfort & Patient Care',
  description:
    'Discover our gentle approach to dental anxiety and sensory comfort at Gangal Dental Clinic in Manpada, Thane.',
};

// TODO(client-verify): Confirm specific comfort amenities and sensory protocols with Dr. Anand Gangal
export default function SensoryCarePage() {
  return (
    <main id="main-content" className="w-full relative py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-margin-mobile lg:px-margin">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-3">
            <HeartHandshake className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>Patient Well-Being</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[46px] text-primary tracking-tight font-normal leading-tight mb-4">
            Sensory Comfort &amp; Gentle Pacing
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed">
            Visiting the dentist can evoke vulnerability or apprehension. We organize our environment and treatment rhythms to ensure you feel respected, unhurried, and in control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest rounded-card p-6 sm:p-8 border border-theme-border/60 shadow-ambient flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary mb-4">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-headline-sm text-[20px] text-primary mb-2 font-medium">
                Calming Atmosphere
              </h2>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                Our Manpada practice is curated with soft natural tones, quiet operatory spaces, and peaceful lighting designed to alleviate sensory overload.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-card p-6 sm:p-8 border border-theme-border/60 shadow-ambient flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary mb-4">
                <Shield className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-headline-sm text-[20px] text-primary mb-2 font-medium">
                Unhurried Appointments
              </h2>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                We never double-book treatment sessions. Every patient receives dedicated clinical attention with time to breathe, discuss, and rest between steps.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-card p-6 sm:p-8 border border-theme-border/60 shadow-ambient flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary mb-4">
                <HeartHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-headline-sm text-[20px] text-primary mb-2 font-medium">
                Patient Autonomy
              </h2>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                You can pause treatment at any time with a simple hand gesture. Nothing proceeds without your explicit understanding and consent.
              </p>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-surface-container rounded-card p-8 text-center max-w-xl mx-auto border border-theme-border/40">
          <h2 className="font-serif text-[22px] text-primary mb-2 font-medium">
            Have questions about an anxious visit?
          </h2>
          <p className="font-sans text-[14px] text-on-surface-variant mb-6">
            Contact Dr. Gangal's team to discuss your past reservations before your appointment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book an Appointment</span>
            </Link>
            <a
              href={siteConfig.contact.landlineTel}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-surface-container-lowest border border-theme-border text-on-surface font-label-button text-label-button hover:bg-surface-container-high transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{siteConfig.contact.landline}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

