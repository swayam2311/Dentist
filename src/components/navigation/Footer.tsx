'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';

const STITCH_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrAn7BVzeMG76sctnSczphCBSPf82zf_Lp0-DjgbPExhZMOzMuccNGbUtiXfzETvRJfPKUnXc4A_tZxBm2ZT3SHkTrHww566oNRrnb2olKFcOez_JyB8gn3uXVw-SNQcwjYqn-5QnKjdi_VJ7yjFQVw44zK8P1vtQvQT0nWHbjkld-CSx5AT61iBq5Gkx7CGVklwhJw9M3ZaKRVKy7qLRU_hoQwyC-xQBxb5DZPwG6onVA';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
          {/* Clinic Brand & Address */}
          <div className="md:col-span-5 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs mb-space-xs">
              <Image
                src={STITCH_LOGO_URL}
                alt="Gangal Dental Clinic Monogram"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <span className="font-headline-md text-headline-md text-primary">
                {siteConfig.name}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Gentle, unhurried, and restorative dental medicine tailored for anxious and discerning patients in Manpada, Thane.
            </p>
            <div className="mt-space-sm flex flex-col gap-space-xs">
              <div className="flex items-start gap-space-xs text-on-surface-variant font-body-md text-body-md">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">location_on</span>
                <span>Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane 400610</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-md text-body-md">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">schedule</span>
                <span>Mon – Fri: 10:00 AM – 1:00 PM & 6:00 PM – 10:00 PM | Sat: 10:00 AM – 5:00 PM | Sun: Closed</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-md text-body-md">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">call</span>
                <span>022 2589 1949 · +91 99870 76628 (24-Hour Telephone Support)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-space-xs">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
              Navigation
            </span>
            <Link
              href="/treatments"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Treatments &amp; Procedures
            </Link>
            <Link
              href="/our-team"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Our Clinical Team
            </Link>
            <Link
              href="/new-patients"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              First-Visit Experience
            </Link>
            <Link
              href="/#patient-stories"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Patient Testimonials
            </Link>
            <Link
              href="/contact"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Directions &amp; Contact
            </Link>
            <Link
              href="/book"
              className="font-body-md text-body-md text-primary font-medium hover:underline transition-colors mt-1"
            >
              Book an Appointment
            </Link>
          </div>

          {/* Reassurance Note */}
          <div className="md:col-span-4 flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.03)] border border-white/80">
            <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase">
              Reassurance Note
            </span>
            <p className="font-headline-sm text-headline-sm text-primary italic leading-snug">
              “We believe high-precision dental care begins by listening with patience, removing rush, and preserving quiet comfort.”
            </p>
            <span className="font-label-caption text-label-caption text-on-surface-variant">
              — Dr. Anand Gangal, Principal Dentist, Thane
            </span>
          </div>
        </div>

        {/* Bottom Bar with Links */}
        <div className="pt-space-lg bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-caption text-label-caption px-space-md py-space-sm rounded-full">
          <p>© 2025 Gangal Dental Clinic. All clinical rights reserved. Manpada, Thane.</p>
          <div className="flex items-center gap-space-lg">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Patient Privacy Policy
            </Link>
            <Link href="/sensory-care" className="hover:text-primary transition-colors">
              Sensory Care Protocol
            </Link>
            <Link href="/clinical-standards" className="hover:text-primary transition-colors">
              Clinical Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
