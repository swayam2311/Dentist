'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { MapPin, Clock, Phone, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-theme-container-low text-theme-ink mt-20 border-t border-theme-border/40 pb-24 lg:pb-12">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Column 1: Brand & Verified Identity */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-theme-border flex items-center justify-center text-primary">
                <svg
                  className="w-5 h-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C7.5 2 4 4.5 4 8.5C4 11.5 5.5 13.5 6.5 15.5C7.5 17.5 8 21.5 10 22C11 22.25 11.5 20 12 18C12.5 20 13 22.25 14 22C16 21.5 16.5 17.5 17.5 15.5C18.5 13.5 20 11.5 20 8.5C20 4.5 16.5 2 12 2Z" />
                </svg>
              </div>
              <span className="font-serif text-[22px] text-primary font-normal">
                {siteConfig.name}
              </span>
            </div>
            <p className="font-sans text-[15px] text-theme-muted max-w-sm leading-relaxed">
              Gentle, unhurried family dental care and advanced restorations tailored for anxious and discerning patients in Manpada, Thane.
            </p>

            <div className="mt-2 flex flex-col gap-2.5 text-[14px] text-theme-muted font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-theme-secondary shrink-0 mt-0.5" />
                <span>{siteConfig.address.fullFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-theme-secondary shrink-0" />
                <span>
                  Landline: {siteConfig.contact.landline} · Mobile: {siteConfig.contact.mobile}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-theme-secondary shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold">
              Clinic Navigation
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/treatments" className="text-[15px] text-theme-muted hover:text-primary transition-colors">
                Treatments & Procedures
              </Link>
              <Link href="/our-team" className="text-[15px] text-theme-muted hover:text-primary transition-colors">
                Our Clinical Team
              </Link>
              <Link href="/new-patients" className="text-[15px] text-theme-muted hover:text-primary transition-colors">
                New Patients Guide
              </Link>
              <Link href="/stories" className="text-[15px] text-theme-muted hover:text-primary transition-colors">
                Patient Testimonials
              </Link>
              <Link href="/contact" className="text-[15px] text-theme-muted hover:text-primary transition-colors">
                Contact & Directions
              </Link>
              <Link href="/book" className="text-[15px] text-primary font-medium hover:underline inline-flex items-center gap-1">
                <span>Book Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/book/status" className="text-[14px] text-theme-muted hover:text-primary transition-colors">
                Check Booking Status
              </Link>
            </div>
          </div>

          {/* Column 3: Consultation Hours & Reassurance */}
          <div className="md:col-span-4 flex flex-col gap-4 bg-theme-card p-6 rounded-[28px] shadow-sm border border-theme-border/50">
            <div className="flex items-center gap-2 text-primary font-sans text-[14px] font-semibold">
              <Clock className="w-4 h-4" />
              <span>Consultation Hours</span>
            </div>
            <div className="flex flex-col gap-2 text-[14px] text-theme-muted font-sans">
              <div className="flex justify-between items-baseline border-b border-theme-border/30 pb-2">
                <span className="font-medium text-theme-ink">Mon – Fri</span>
                <div className="text-right">
                  <div>10:00 AM – 1:00 PM</div>
                  <div>6:00 PM – 10:00 PM</div>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-theme-border/30 pb-2">
                <span className="font-medium text-theme-ink">Saturday</span>
                <span>10:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-error font-medium pt-0.5">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
            <div className="pt-2 text-[13px] text-theme-muted italic">
              {siteConfig.contact.emergencyNotice}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-theme-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-theme-muted font-sans">
          <p>© {new Date().getFullYear()} Gangal Dental Clinic. Manpada, Thane. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Patient Privacy Policy (DPDP)
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Care
            </Link>
            <Link href="/admin" className="text-theme-muted/70 hover:text-primary transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

