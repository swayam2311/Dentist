import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Calendar, MessageSquare, Star, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Stories & Testimonials',
  description:
    'Read real, verified patient testimonials from Gangal Dental Clinic in Manpada, Thane.',
};

export default function StoriesPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/60 mb-3 text-xs font-sans text-theme-secondary font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span>Verified Clinic Testimonials</span>
        </div>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          Stories of gentle, comfortable care
        </h1>
        <p className="font-sans text-[17px] text-theme-muted leading-relaxed">
          Real feedback from patients treated at Gangal Dental Clinic in Manpada, Thane. Meticulously verified from our clinic records.
        </p>
      </div>

      {/* 3 Real Testimonials Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {siteConfig.testimonials.map((t, idx) => (
          <article
            key={idx}
            className="p-8 rounded-[32px] bg-theme-card border border-theme-border shadow-ambient flex flex-col justify-between interactive-card"
          >
            <div>
              <div className="flex items-center gap-1 text-theme-brass mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif text-[18px] sm:text-[20px] text-primary italic font-normal leading-relaxed mb-6">
                “{t.quote}”
              </p>
            </div>

            <div className="pt-4 border-t border-theme-border/40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-theme-secondary-container text-theme-ink font-serif text-[16px] flex items-center justify-center font-medium">
                {t.initials}
              </div>
              <div>
                <h3 className="font-serif text-[17px] text-primary font-normal leading-tight">
                  {t.author}
                </h3>
                <span className="font-sans text-[12px] text-theme-muted">
                  {t.location} · Verified Patient
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Google Review Badge Banner */}
      <div className="p-8 rounded-[32px] bg-theme-container-low/80 border border-theme-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-1">
            Have you visited Gangal Dental Clinic?
          </h2>
          <p className="font-sans text-[14px] text-theme-muted">
            We value your honest feedback on Google Maps to help other families in Thane choose gentle dental care.
          </p>
        </div>
        <a
          href={siteConfig.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-[46px] px-6 rounded-full bg-primary text-white font-sans text-[14px] font-medium shadow-button hover:bg-theme-primary-container transition-colors shrink-0"
        >
          <span>View Clinic on Google Maps</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

