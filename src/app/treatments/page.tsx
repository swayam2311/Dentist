'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

type CategoryFilter = 'all' | 'general' | 'cosmetic' | 'implants' | 'orthodontics' | 'restorative' | 'children';

interface TreatmentItem {
  id: string;
  title: string;
  categoryLabel: string;
  categories: CategoryFilter[];
  description: string;
  icon: string;
  badge: string;
  iconBg: string;
  iconColor: string;
}

const TREATMENTS_LIST: TreatmentItem[] = [
  {
    id: 'free-consultation',
    title: 'Free Oral Health Consultation',
    categoryLabel: 'General · Preventive',
    categories: ['general'],
    description: 'Complimentary 3D digital scan, cancer screening, and custom zero-obligation care roadmap.',
    icon: 'clinical_notes',
    badge: 'Zero Obligation',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    categoryLabel: 'Urgent · General',
    categories: ['general'],
    description: 'Same-day priority relief for acute toothaches, cracked enamel, or sudden dental trauma.',
    icon: 'e911_emergency',
    badge: 'Priority Same-Day',
    iconBg: 'bg-error-container/70',
    iconColor: 'text-error',
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    categoryLabel: 'Restorative',
    categories: ['restorative'],
    description: 'Microscopic single-sitting endodontics designed to save your natural tooth painlessly.',
    icon: 'vital_signs',
    badge: 'Single-Sitting',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'extractions',
    title: 'Tooth Extraction',
    categoryLabel: 'Restorative · Surgery',
    categories: ['restorative'],
    description: 'Gentle atraumatic extractions and wisdom tooth removal under profound local numbing.',
    icon: 'healing',
    badge: 'Atraumatic Comfort',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    categoryLabel: 'Cosmetic',
    categories: ['cosmetic'],
    description: 'In-clinic power whitening and custom take-home trays formulated for minimal sensitivity.',
    icon: 'flare',
    badge: 'Sensitivity Safe',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
  },
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    categoryLabel: 'Cosmetic',
    categories: ['cosmetic'],
    description: 'Ultra-thin biomimetic ceramic shells crafted for radiant, naturally balanced smiles.',
    icon: 'diamond',
    badge: 'Hand-Layered',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover',
    categoryLabel: 'Cosmetic',
    categories: ['cosmetic'],
    description: 'Holistic digital smile design aligning tooth proportion, gum contours, and facial harmony.',
    icon: 'sentiment_satisfied',
    badge: 'Digital Simulation',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    categoryLabel: 'Implants',
    categories: ['implants', 'restorative'],
    description: 'Grade-IV bio-inert titanium posts with computer-guided placement for permanent teeth.',
    icon: 'verified',
    badge: 'High Durability',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    categoryLabel: 'Orthodontics',
    categories: ['orthodontics'],
    description: 'Virtually invisible, removable clear aligners custom planned for teens and adults.',
    icon: 'auto_fix_high',
    badge: 'Discreet · Removable',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'crowns-bridges',
    title: 'Crowns and Bridges',
    categoryLabel: 'Restorative',
    categories: ['restorative'],
    description: 'High-translucency monolithic zirconia and ceramic restorations fabricated to last.',
    icon: 'architecture',
    badge: 'Zirconia Precision',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'dentures',
    title: 'Dentures',
    categoryLabel: 'Restorative · Implants',
    categories: ['restorative', 'implants'],
    description: 'Precision-milled lightweight flexible and implant-supported stable full/partial dentures.',
    icon: 'interests',
    badge: 'Custom Stabilized',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    categoryLabel: 'Children · Preventive',
    categories: ['children', 'general'],
    description: 'Friendly, pressure-free preventive care and fun fluoride therapies tailored for kids.',
    icon: 'child_care',
    badge: 'Gentle & Playful',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-primary',
  },
];

export default function TreatmentsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredTreatments =
    activeFilter === 'all'
      ? TREATMENTS_LIST
      : TREATMENTS_LIST.filter((t) => t.categories.includes(activeFilter));

  const filterButtons: { label: string; filter: CategoryFilter }[] = [
    { label: 'All', filter: 'all' },
    { label: 'General', filter: 'general' },
    { label: 'Cosmetic', filter: 'cosmetic' },
    { label: 'Implants', filter: 'implants' },
    { label: 'Orthodontics', filter: 'orthodontics' },
    { label: 'Restorative', filter: 'restorative' },
    { label: 'Children', filter: 'children' },
  ];

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Atmospheric Sanctuary Ambient Background Elements */}
      <div className="relative w-full max-w-[1240px] mx-auto px-margin-mobile lg:px-margin">
        {/* Hero / Intro Section */}
        <section className="pt-space-xl pb-space-lg lg:pt-16 lg:pb-space-xl flex flex-col items-center text-center relative">
          {/* Diffuse warm atmospheric glows */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -top-12 right-12 w-64 h-64 bg-tertiary-fixed/35 rounded-full blur-2xl pointer-events-none -z-10" />

          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-container/60 mb-space-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-[0.16em]">
              Our Clinical Expertise &amp; Services
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-display-hero text-primary max-w-3xl tracking-tight mb-space-sm font-normal">
            Care for every smile, in one place
          </h1>

          {/* Calming Subtext */}
          <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl font-normal leading-relaxed mb-space-lg">
            Thoughtful, gentle dental treatments delivered with modern precision and unhurried sensory care in Manpada, Thane. Transparent pricing and zero-judgment consultations.
          </p>

          {/* Reassurance Pill */}
          <div className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-full bg-surface-container-lowest shadow-[0_8px_24px_-4px_rgba(0,82,85,0.08)] max-w-full overflow-hidden text-left border border-white/60">
            <span className="text-tertiary text-[18px] shrink-0">✨</span>
            <p className="font-label-caption text-label-caption text-on-surface-variant truncate sm:overflow-visible">
              All procedures performed in soundproof private suites with topical numbing and warm sensory comfort.
            </p>
          </div>
        </section>

        {/* Interactive Category Filter Bar */}
        <section className="pb-space-xl flex justify-center">
          <div
            className="flex items-center gap-2 p-1.5 bg-surface-container-lowest/80 backdrop-blur-md rounded-full shadow-[0_8px_24px_-4px_rgba(15,46,51,0.04)] overflow-x-auto max-w-full scrollbar-none border border-white/60"
            id="filter-container"
          >
            {filterButtons.map((btn) => {
              const isActive = activeFilter === btn.filter;
              return (
                <button
                  key={btn.filter}
                  onClick={() => setActiveFilter(btn.filter)}
                  className={`filter-btn px-space-lg py-2 rounded-full font-label-button text-label-button transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm hover:shadow'
                      : 'text-on-surface hover:text-primary hover:bg-surface-container-low'
                  }`}
                  data-filter={btn.filter}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Treatments 12-Card Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-space-xl" id="treatments-grid">
          {filteredTreatments.map((t) => (
            <article
              key={t.id}
              className="treatment-card group flex flex-col justify-between bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.05),0_4px_12px_-2px_rgba(15,46,51,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-6px_rgba(0,82,85,0.12)] border border-white/60"
              data-categories={t.categories.join(' ')}
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div
                    className={`w-12 h-12 rounded-full ${t.iconBg} flex items-center justify-center ${t.iconColor} group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{t.icon}</span>
                  </div>
                  <span className="font-label-eyebrow text-label-eyebrow uppercase px-space-sm py-1 rounded-full bg-surface-container text-secondary">
                    {t.categoryLabel}
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-primary group-hover:text-primary-container transition-colors mb-space-xs font-medium">
                  {t.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant font-normal leading-relaxed mb-space-lg">
                  {t.description}
                </p>
              </div>

              <div className="pt-space-xs flex items-center justify-between border-t border-surface-container-high/40">
                <Link
                  href={`/book?service=${encodeURIComponent(t.title)}`}
                  className="inline-flex items-center gap-1.5 font-label-button text-label-button text-primary group-hover:text-primary-container hover:underline underline-offset-4 transition-all"
                >
                  <span>Book this care</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <span className="font-label-caption text-label-caption text-secondary/80 font-medium">
                  {t.badge}
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Experience Reassurance Editorial Ribbon */}
        <section className="mb-space-xl grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-low p-space-lg rounded-lg flex items-start gap-space-sm border border-white/40">
            <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">volume_off</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-medium">Acoustic Serenity</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sound-softened operatory suites designed to eliminate clinical drill noise.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg rounded-lg flex items-start gap-space-sm border border-white/40">
            <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">spa</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-medium">Topical Pre-Numbing</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Compound warming gels applied before any anesthetic for a pinch-free experience.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg rounded-lg flex items-start gap-space-sm border border-white/40">
            <span className="material-symbols-outlined text-primary text-[28px] mt-0.5">handshake</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-medium">Patient-Controlled Pace</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Simple non-verbal hand signals ensure you can pause treatment at any second.
              </p>
            </div>
          </div>
        </section>

        {/* Gentle CTA Banner */}
        <section className="mb-space-xl relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-xl md:p-14 shadow-[0_16px_40px_-8px_rgba(0,82,85,0.08)] border border-white/80">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-container/40 pointer-events-none -z-0" />
          <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-tertiary-fixed/30 pointer-events-none -z-0" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-widest block mb-space-xs font-semibold">
              Personalized Guidance
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-space-sm leading-tight font-normal">
              Unsure which treatment is right for you?
            </h2>
            <p className="font-body-xl text-body-xl text-on-surface-variant font-normal leading-relaxed mb-space-lg">
              Book a gentle 20-minute discussion with Dr. Anand Gangal. We examine, listen, and explain all alternatives before touching an instrument.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
              <Link
                href="/book"
                className="inline-flex items-center justify-center min-h-[52px] px-space-xl rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_8px_20px_-2px_rgba(0,82,85,0.25)] hover:bg-primary-container transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Free Consultation
              </Link>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[52px] px-space-lg rounded-full bg-surface-container text-on-surface font-label-button text-label-button hover:bg-surface-container-high transition-all duration-300 gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">chat</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
