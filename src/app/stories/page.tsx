import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { MessageSquare, ArrowUpRight, ShieldCheck, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Stories & Testimonials',
  description:
    'Read real, verified patient testimonials from Gangal Dental Clinic in Manpada, Thane.',
};

export default function StoriesPage() {
  return (
    <main id="main-content" className="max-w-[1200px] mx-auto px-margin-mobile sm:px-margin py-12 sm:py-20">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary mb-3 text-xs font-sans font-semibold uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Patient Experiences</span>
        </div>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          Stories of gentle, comfortable care
        </h1>
        <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed">
          Reflections from patients treated at Gangal Dental Clinic in Manpada, Thane. Sourced from authentic clinic records.
        </p>
      </div>

      {/* 3 Real Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {siteConfig.testimonials.map((t, idx) => (
          <article
            key={idx}
            className="p-8 rounded-card bg-surface-container-lowest border border-theme-border/60 shadow-ambient flex flex-col justify-between"
          >
            <div>
              <Quote className="w-8 h-8 text-surface-container mb-4 opacity-75" aria-hidden="true" />
              <p className="font-serif text-[18px] sm:text-[20px] text-primary italic font-normal leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-theme-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-primary font-serif text-[16px] flex items-center justify-center font-bold">
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-body-lg text-body-lg font-bold text-on-surface leading-tight">
                    {t.author}
                  </h3>
                  <span className="font-label-caption text-[12px] text-on-surface-variant">
                    {t.location}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 text-primary text-[11px] font-sans font-medium" title="Verified Patient">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>Verified</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Google Review Badge Banner */}
      <div className="p-8 rounded-card bg-surface-container border border-theme-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-[22px] text-primary font-normal mb-1">
            Have you visited Gangal Dental Clinic?
          </h2>
          <p className="font-sans text-[14px] text-on-surface-variant">
            We value your honest feedback on Google Maps to help families in Thane find gentle, unhurried dental care.
          </p>
        </div>
        <a
          href={siteConfig.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors shrink-0"
        >
          <span>View Clinic on Google Maps</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
