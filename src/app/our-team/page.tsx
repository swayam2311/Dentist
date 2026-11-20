import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Calendar, Shield, Heart, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Clinical Team',
  description:
    'Meet the dedicated clinical team at Gangal Dental Clinic in Manpada, Thane. Led by Principal Dentist Dr. Anand Gangal and Associate Dentist Dr. Padma Kurup.',
};

export default function OurTeamPage() {
  const dentists = siteConfig.team.filter((m) => m.isDentist);
  const supportStaff = siteConfig.team.filter((m) => !m.isDentist);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/60 mb-3 text-xs font-sans text-theme-secondary font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-primary" />
          <span>Gentle, Empathetic Hands</span>
        </div>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          Meet our clinical team
        </h1>
        <p className="font-sans text-[17px] text-theme-muted leading-relaxed">
          Restorative dentistry is an act of human empathy. Here in Manpada, time slows down, questions are welcomed, and your absolute calm comes before any procedure.
        </p>
      </div>

      {/* Principal Clinicians Grid */}
      <section className="mb-16">
        <h2 className="font-serif text-[26px] text-primary font-normal mb-8 border-b border-theme-border/40 pb-3">
          Attending Clinicians
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dentists.map((doc) => (
            <article
              key={doc.id}
              className="p-8 rounded-[32px] bg-theme-card border border-theme-border shadow-ambient flex flex-col justify-between interactive-card"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Monogram Avatar (Zero AI Faces) */}
                  <div className="w-16 h-16 rounded-full bg-theme-secondary-container text-primary font-serif text-[24px] flex items-center justify-center font-medium border border-primary/20 shadow-sm">
                    {doc.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-[24px] text-primary font-normal leading-tight">
                      {doc.name}
                    </h3>
                    <span className="font-sans text-[13px] text-theme-secondary font-semibold uppercase tracking-wider">
                      {doc.role}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-[15px] text-theme-muted leading-relaxed mb-6">
                  {doc.bio}
                </p>

                <div className="p-4 rounded-2xl bg-theme-container-low/70 border border-theme-border/40 flex items-start gap-3 mb-6">
                  <Shield className="w-4 h-4 text-theme-brass shrink-0 mt-0.5" />
                  <p className="font-serif text-[15px] text-primary italic leading-snug">
                    “We believe high-precision dental care begins by listening with patience, removing rush, and preserving quiet comfort.”
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-theme-border/40 flex items-center justify-between">
                <span className="text-[12px] font-sans text-theme-muted">Manpada Clinic, Thane</span>
                <Link
                  href={`/book?dentist=${doc.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white font-sans text-[13px] font-medium shadow-button hover:bg-theme-primary-container transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Clinical Support Team */}
      <section>
        <h2 className="font-serif text-[26px] text-primary font-normal mb-8 border-b border-theme-border/40 pb-3">
          Clinical Support &amp; Reception
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportStaff.map((staff) => (
            <div
              key={staff.id}
              className="p-6 rounded-[24px] bg-theme-card border border-theme-border/70 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-theme-container text-primary font-serif text-[18px] flex items-center justify-center shrink-0 font-medium">
                {staff.initials}
              </div>
              <div>
                <h4 className="font-serif text-[18px] text-primary font-normal leading-snug">
                  {staff.name}
                </h4>
                <span className="font-sans text-[12px] text-theme-secondary font-medium block mb-1">
                  {staff.role}
                </span>
                <p className="font-sans text-[13px] text-theme-muted leading-relaxed">
                  {staff.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

