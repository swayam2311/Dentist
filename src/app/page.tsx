'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site.config';
import { ClinicStatusBadge } from '@/components/ui/ClinicStatusBadge';
import { JourneyTimeline } from '@/components/motion/JourneyTimeline';
import { PosterFallback } from '@/components/3d/PosterFallback';
import {
  Calendar,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Navigation,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// Dynamic import of Three.js hero with fallback poster
const DentalHeroScene = dynamic(
  () => import('@/components/3d/DentalHeroScene').then((mod) => mod.DentalHeroScene),
  {
    ssr: false,
    loading: () => <PosterFallback />,
  }
);

export default function HomePage() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) =>
      prev === 0 ? siteConfig.testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) =>
      prev === siteConfig.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = siteConfig.testimonials[activeTestimonialIdx];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          1. HERO SECTION (Procedural 3D + Instant Reassuring Copy)
          ========================================================================= */}
      <section className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-16">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/10 via-theme-secondary-container/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <ClinicStatusBadge />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-container/60 text-xs font-sans text-theme-secondary font-medium">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>Happy Valley Complex · Manpada</span>
              </div>
            </div>

            <h1 className="font-serif text-[38px] sm:text-[50px] lg:text-[58px] text-primary leading-[1.12] tracking-tight font-normal">
              A calmer rhythm to <br />
              <span className="italic font-normal">modern dentistry.</span>
            </h1>

            <p className="font-sans text-[17px] sm:text-[19px] text-theme-muted max-w-xl leading-relaxed">
              Thoughtful, gentle dental care for families in Manpada, Thane. From preventive hygiene and clear aligners to precision dental implants and smile rejuvenation.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2.5 min-h-[52px] px-8 rounded-full bg-primary text-white font-sans text-[15px] font-medium tracking-wide shadow-button hover:bg-theme-primary-container interactive-button"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Unhurried Visit</span>
              </Link>

              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 min-h-[52px] px-7 rounded-full bg-theme-card text-theme-ink font-sans text-[15px] font-medium border border-theme-border/80 hover:bg-theme-container-low interactive-button shadow-sm"
              >
                <span>View Treatments</span>
                <ArrowRight className="w-4 h-4 text-theme-secondary" />
              </Link>
            </div>

            {/* Quick Assurance Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-[13px] text-theme-muted font-sans border-t border-theme-border/40 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>First Consultation Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-theme-brass" />
                <span>Unhurried Attention</span>
              </div>
              <a
                href={siteConfig.contact.landlineTel}
                className="flex items-center gap-2 hover:text-primary transition-colors ml-auto sm:ml-0"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium text-theme-ink">{siteConfig.contact.landline}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Column: 3D Model / Fallback Poster */}
          <div className="lg:col-span-5 relative w-full">
            <DentalHeroScene />
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. INTENT TILES (Quick Routing to Common Needs)
          ========================================================================= */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Routine & Preventive */}
          <Link
            href="/treatments?category=general"
            className="p-6 rounded-[24px] bg-theme-card border border-theme-border/70 shadow-sm interactive-card flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-theme-secondary-container/70 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-[20px] text-primary mb-1.5 font-normal">
                Routine Care & Checkups
              </h3>
              <p className="font-sans text-[14px] text-theme-muted leading-relaxed">
                Cleanings, clinical exams, and preventative hygiene tailored to protect your natural teeth.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-theme-border/30 flex items-center justify-between text-[13px] font-sans font-medium text-primary">
              <span>Explore General</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 2: Toothache & Urgency (Calls clinic directly!) */}
          <a
            href={siteConfig.contact.landlineTel}
            className="p-6 rounded-[24px] bg-theme-card border border-error/30 shadow-sm interactive-card flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-error-container/60 flex items-center justify-center text-error mb-4 group-hover:scale-105 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-[20px] text-primary mb-1.5 font-normal">
                Urgent Tooth Pain Relief
              </h3>
              <p className="font-sans text-[14px] text-theme-muted leading-relaxed">
                Same-day priority care for acute dental pain, swelling, or sudden fractures. Call immediately.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-error/20 flex items-center justify-between text-[13px] font-sans font-medium text-error">
              <span>Call 022 25891949</span>
              <Phone className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Tile 3: Dental Implants */}
          <Link
            href="/treatments/dental-implants"
            className="p-6 rounded-[24px] bg-theme-card border border-theme-border/70 shadow-sm interactive-card flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-theme-container flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M8 7h8M7 12h10M9 17h6" />
                </svg>
              </div>
              <h3 className="font-serif text-[20px] text-primary mb-1.5 font-normal">
                Dental Implants
              </h3>
              <p className="font-sans text-[14px] text-theme-muted leading-relaxed">
                Permanent replacement for missing teeth. Restore natural chewing strength and confident smiles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-theme-border/30 flex items-center justify-between text-[13px] font-sans font-medium text-primary">
              <span>Implant Options</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 4: Invisalign Aligners */}
          <Link
            href="/treatments/invisalign"
            className="p-6 rounded-[24px] bg-theme-card border border-theme-border/70 shadow-sm interactive-card flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-theme-secondary-container/70 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" />
                </svg>
              </div>
              <h3 className="font-serif text-[20px] text-primary mb-1.5 font-normal">
                Invisalign (Clear Aligners)
              </h3>
              <p className="font-sans text-[14px] text-theme-muted leading-relaxed">
                Discreet, comfortable teeth straightening with transparent aligners changed about every 2 weeks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-theme-border/30 flex items-center justify-between text-[13px] font-sans font-medium text-primary">
              <span>Learn About Aligners</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          3. CURATED TREATMENTS SECTION
          ========================================================================= */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold block mb-2">
              Clinical Specialities
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] text-primary font-normal leading-tight">
              Gentle treatments for every need
            </h2>
          </div>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-1.5 text-primary font-sans text-[15px] font-medium hover:underline self-start sm:self-auto"
          >
            <span>Browse all procedures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Free Consultation */}
          <article className="p-7 rounded-[28px] bg-theme-card border border-theme-border/70 shadow-ambient flex flex-col justify-between interactive-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-theme-container text-primary">
                  Preventive · General
                </span>
                <span className="text-[12px] font-sans font-medium text-theme-secondary">30 Min</span>
              </div>
              <h3 className="font-serif text-[22px] text-primary mb-2 font-normal">
                Free Oral Health Consultation
              </h3>
              <p className="font-sans text-[15px] text-theme-muted leading-relaxed mb-6">
                Your first consultation is free. Includes clinical examination, discussion of your goals, and an itemized treatment estimate.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-theme-border/40">
              <Link
                href="/treatments/free-consultation"
                className="text-[14px] font-sans font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Read details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/book?service=free-consultation"
                className="text-[13px] font-sans font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:bg-theme-primary-container transition-colors shadow-sm"
              >
                Book Free
              </Link>
            </div>
          </article>

          {/* Card 2: Dental Implants */}
          <article className="p-7 rounded-[28px] bg-theme-card border border-theme-border/70 shadow-ambient flex flex-col justify-between interactive-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-theme-secondary-container text-theme-ink">
                  Implantology
                </span>
                <span className="text-[12px] font-sans font-medium text-theme-secondary">60 Min</span>
              </div>
              <h3 className="font-serif text-[22px] text-primary mb-2 font-normal">
                Dental Implants
              </h3>
              <p className="font-sans text-[15px] text-theme-muted leading-relaxed mb-6">
                Titanium fixtures permanently anchored to restore chewing stability and preserve alveolar jawbone health. Can often be placed same day as extraction.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-theme-border/40">
              <Link
                href="/treatments/dental-implants"
                className="text-[14px] font-sans font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Read details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/book?service=dental-implants"
                className="text-[13px] font-sans font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:bg-theme-primary-container transition-colors shadow-sm"
              >
                Book Visit
              </Link>
            </div>
          </article>

          {/* Card 3: Root Canal Treatment */}
          <article className="p-7 rounded-[28px] bg-theme-card border border-theme-border/70 shadow-ambient flex flex-col justify-between interactive-card">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-theme-container text-primary">
                  Endodontics
                </span>
                <span className="text-[12px] font-sans font-medium text-theme-secondary">60 Min</span>
              </div>
              <h3 className="font-serif text-[22px] text-primary mb-2 font-normal">
                Root Canal Treatment
              </h3>
              <p className="font-sans text-[15px] text-theme-muted leading-relaxed mb-6">
                Relieves persistent toothache and disinfects infected pulp canals, allowing you to preserve your natural tooth rather than extracting it.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-theme-border/40">
              <Link
                href="/treatments/root-canal-treatment"
                className="text-[14px] font-sans font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Read details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/book?service=root-canal-treatment"
                className="text-[13px] font-sans font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:bg-theme-primary-container transition-colors shadow-sm"
              >
                Book Visit
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          4. VISIT TIMELINE (Traveling Tooth Marker Synced to Scroll)
          ========================================================================= */}
      <JourneyTimeline />

      {/* =========================================================================
          5. REAL TESTIMONIALS CAROUSEL (Verbatim from Clinic Site)
          ========================================================================= */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16" id="patient-stories">
        <div className="bg-theme-card rounded-[32px] p-8 sm:p-12 lg:p-16 border border-theme-border/70 shadow-ambient relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold mb-3">
              Patient Experiences
            </span>

            {/* Testimonial Quote */}
            <p className="font-serif text-[22px] sm:text-[28px] text-primary font-normal italic leading-snug mb-8 min-h-[90px] flex items-center">
              “{currentTestimonial.quote}”
            </p>

            {/* Author Meta & Controls */}
            <div className="w-full flex items-center justify-between border-t border-theme-border/40 pt-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-11 h-11 rounded-full bg-theme-secondary-container text-theme-ink font-serif text-[17px] flex items-center justify-center font-medium">
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="font-serif text-[18px] text-primary font-normal leading-tight">
                    {currentTestimonial.author}
                  </h4>
                  <span className="font-sans text-[12px] text-theme-muted">
                    {currentTestimonial.location} · Patient Review
                  </span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-theme-container-low hover:bg-theme-container flex items-center justify-center text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Previous patient story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-theme-container-low hover:bg-theme-container flex items-center justify-center text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Next patient story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. VISIT US (Split Map, Exact Address & Working Action Matrix)
          ========================================================================= */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16" id="visit-us">
        <div className="mb-8">
          <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold block mb-1">
            Clinic Coordinates
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-primary font-normal">
            Visit us in Manpada, Thane
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Real Google Map Embed */}
          <div className="lg:col-span-7 rounded-[28px] overflow-hidden bg-theme-card border border-theme-border shadow-sm min-h-[380px] relative">
            <iframe
              src={siteConfig.address.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gangal Dental Clinic Location Map"
              className="w-full h-full"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-4 rounded-2xl bg-theme-card/95 backdrop-blur-md shadow-ambient border border-theme-border/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <div className="font-sans text-[13px] font-semibold text-theme-ink">
                    Happy Valley Shopping Complex
                  </div>
                  <div className="font-sans text-[12px] text-theme-muted">
                    Tikujiniwadi Road, Manpada, Thane West
                  </div>
                </div>
              </div>
              <a
                href={siteConfig.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-primary text-white hover:bg-theme-primary-container transition-colors shadow-sm shrink-0"
                title="Get Directions"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Operational Details & Action Button Matrix */}
          <div className="lg:col-span-5 rounded-[28px] bg-theme-card border border-theme-border p-7 sm:p-8 flex flex-col justify-between shadow-ambient">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-[12px] uppercase tracking-wider text-theme-secondary font-semibold block mb-1">
                  Full Clinic Address
                </span>
                <p className="font-serif text-[20px] text-primary font-normal leading-snug">
                  {siteConfig.address.fullFormatted}
                </p>
                <p className="font-sans text-[14px] text-theme-muted mt-2">
                  Ground floor retail arcade inside Happy Valley Shopping Complex, near Tikujiniwadi Road.
                </p>
              </div>

              {/* Operating Hours Card */}
              <div className="p-4 rounded-2xl bg-theme-container-low/70 border border-theme-border/40 flex flex-col gap-2 font-sans text-[14px]">
                <div className="flex items-center gap-2 text-primary font-semibold pb-1 border-b border-theme-border/30">
                  <Clock className="w-4 h-4" />
                  <span>Consultation Timing</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-theme-muted">Mon – Fri</span>
                  <div className="text-right text-theme-ink font-medium">
                    <div>10:00 AM – 1:00 PM</div>
                    <div>6:00 PM – 10:00 PM</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-theme-border/20">
                  <span className="text-theme-muted">Saturday</span>
                  <span className="text-theme-ink font-medium">10:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-theme-border/20">
                  <span className="text-theme-muted">Sunday</span>
                  <span className="text-error font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Action Matrix (Working Links Only) */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-theme-border/40">
              <a
                href={siteConfig.contact.landlineTel}
                className="min-h-[46px] rounded-full bg-theme-container-low text-primary flex items-center justify-center font-sans text-[13px] font-medium hover:bg-theme-container transition-colors"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span>Call Clinic</span>
              </a>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] rounded-full bg-theme-secondary-container text-theme-ink flex items-center justify-center font-sans text-[13px] font-medium hover:bg-theme-secondary transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 text-primary" />
                <span>WhatsApp</span>
              </a>

              <a
                href={siteConfig.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] rounded-full bg-theme-container-low text-primary flex items-center justify-center font-sans text-[13px] font-medium hover:bg-theme-container transition-colors"
              >
                <Navigation className="w-4 h-4 mr-1.5" />
                <span>Directions</span>
              </a>

              <Link
                href="/book"
                className="min-h-[46px] rounded-full bg-primary text-white flex items-center justify-center font-sans text-[13px] font-medium hover:bg-theme-primary-container shadow-button interactive-button"
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>Book Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

