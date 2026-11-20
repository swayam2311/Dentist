'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chip } from '@/components/ui/Chip';
import { siteConfig } from '@/config/site.config';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

interface TreatmentItem {
  slug: string;
  name: string;
  category: 'general' | 'cosmetic' | 'implants' | 'orthodontics' | 'restorative' | 'children';
  categoryLabel: string;
  duration: string;
  shortDesc: string;
  isEmergency?: boolean;
}

const treatmentsData: TreatmentItem[] = [
  {
    slug: 'free-consultation',
    name: 'Free Oral Health Consultation',
    category: 'general',
    categoryLabel: 'Preventive · General',
    duration: '30 Min',
    shortDesc:
      'Your first oral health consultation is completely free of charge. Thorough clinical exam, diagnostic review, and an itemized treatment estimate.',
  },
  {
    slug: 'emergency-care',
    name: 'Emergency Dental Care',
    category: 'general',
    categoryLabel: 'Urgent Care',
    duration: 'Immediate',
    shortDesc:
      'Same-day priority relief for acute toothaches, chipped or cracked teeth, trauma, or broken dental restorations. Call-only coordination.',
    isEmergency: true,
  },
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'implants',
    categoryLabel: 'Implantology',
    duration: '60 Min',
    shortDesc:
      'Permanent titanium fixtures restoring lost teeth and chewing function. Can often be placed same day as extraction.',
  },
  {
    slug: 'invisalign',
    name: 'Invisalign (Clear Aligners)',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics',
    duration: '30 Min',
    shortDesc:
      'Discreet transparent aligners changed about every 2 weeks. Adult treatments typically 12 to 18 months with progress visits every 4 to 6 weeks.',
  },
  {
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    category: 'restorative',
    categoryLabel: 'Restorative Endodontics',
    duration: '60 Min',
    shortDesc:
      'Gentle endodontic care to relieve acute toothache and disinfect root canals, saving your natural tooth from extraction.',
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Dentistry',
    duration: '45 Min',
    shortDesc:
      'Professional in-office 1-hour whitening, custom at-home trays, and internal whitening for root-treated teeth.',
  },
  {
    slug: 'porcelain-veneers',
    name: 'Porcelain Veneers',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Dentistry',
    duration: '60 Min',
    shortDesc:
      'Ultra-thin custom ceramic shells bonded to front tooth enamel to correct persistent discoloration, chips, or gaps.',
  },
  {
    slug: 'digital-smile-design',
    name: 'Digital Smile Design',
    category: 'cosmetic',
    categoryLabel: 'Aesthetic Planning',
    duration: '45 Min',
    shortDesc:
      'Collaborative aesthetic preview and digital planning tailored to facial symmetry before beginning smile treatments.',
  },
  {
    slug: 'white-fillings',
    name: 'White Fillings (Composite)',
    category: 'general',
    categoryLabel: 'General Restorative',
    duration: '30 Min',
    shortDesc:
      'Natural-looking composite resin matched to your enamel shade for durable, unnoticeable cavity repair.',
  },
  {
    slug: 'smile-makeovers',
    name: 'Smile Makeovers',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Dentistry',
    duration: '60 Min',
    shortDesc:
      'Comprehensive combination of aligners, ceramic veneers, whitening, and restorative care tailored to your facial harmony.',
  },
  {
    slug: 'oral-surgery-extractions',
    name: 'Oral Surgery & Extractions',
    category: 'restorative',
    categoryLabel: 'Oral Surgery',
    duration: '45 Min',
    shortDesc:
      'Gentle tooth removal with thorough local anaesthesia and socket preservation for non-restorable or impacted teeth.',
  },
  {
    slug: 'crowns',
    name: 'Crowns',
    category: 'restorative',
    categoryLabel: 'Restorative Prosthodontics',
    duration: '45 Min',
    shortDesc:
      'Full-coverage ceramic caps providing structural reinforcement for fractured, weakened, or endodontically treated teeth.',
  },
  {
    slug: 'bridges',
    name: 'Bridges',
    category: 'restorative',
    categoryLabel: 'Restorative Prosthodontics',
    duration: '45 Min',
    shortDesc:
      'Fixed dental prostheses anchored by neighboring teeth to span spaces left by missing teeth and return natural chewing ability.',
  },
  {
    slug: 'dentures',
    name: 'Dentures (Full & Partial)',
    category: 'restorative',
    categoryLabel: 'Removable Prosthetics',
    duration: '45 Min',
    shortDesc:
      'Custom crafted removable full or partial dental prosthetics engineered for comfortable daily speech and eating.',
  },
  {
    slug: 'broken-teeth',
    name: 'Broken Teeth Restoration',
    category: 'restorative',
    categoryLabel: 'Urgent & Restorative',
    duration: '30 Min',
    shortDesc:
      'Immediate evaluation and repair for chipped, cracked, or traumatized teeth, restoring aesthetics and sealing dentin.',
  },
  {
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'children',
    categoryLabel: 'Children & Teens',
    duration: '30 Min',
    shortDesc:
      'Child-centered visits focused on gentle preventive hygiene, fluoride applications, early orthodontics, and habit correction.',
  },
  {
    slug: 'preventative-dentistry',
    name: 'Preventative Dentistry & Hygiene',
    category: 'general',
    categoryLabel: 'Preventive Care',
    duration: '30 Min',
    shortDesc:
      'Professional scaling and polishing to remove plaque and tartar, paired with tailored home care coaching.',
  },
];

function TreatmentsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category') || 'all';

  const setCategory = (cat: string) => {
    if (cat === 'all') {
      router.push('/treatments', { scroll: false });
    } else {
      router.push(`/treatments?category=${cat}`, { scroll: false });
    }
  };

  const filteredTreatments = treatmentsData.filter((item) => {
    if (currentCategory === 'all') return true;
    return item.category === currentCategory;
  });

  const categories = [
    { key: 'all', label: 'All Treatments' },
    { key: 'general', label: 'General & Preventive' },
    { key: 'cosmetic', label: 'Cosmetic & Smile' },
    { key: 'implants', label: 'Dental Implants' },
    { key: 'orthodontics', label: 'Invisalign Aligners' },
    { key: 'restorative', label: 'Restorative & Surgery' },
    { key: 'children', label: 'Pediatric Care' },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold block mb-2">
          Clinical Services &amp; Expertise
        </span>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          Thoughtful dental care, tailored for you
        </h1>
        <p className="font-sans text-[17px] text-theme-muted leading-relaxed">
          From first consultations and gentle cleanings to full mouth restorations and clear aligners. Transparent explanations and zero-judgment care in Manpada, Thane.
        </p>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
        {categories.map((cat) => (
          <Chip
            key={cat.key}
            selected={currentCategory === cat.key}
            onClick={() => setCategory(cat.key)}
          >
            {cat.label}
          </Chip>
        ))}
      </div>

      {/* 17-Card Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((treatment) => (
          <article
            key={treatment.slug}
            className="p-7 rounded-[28px] bg-theme-card border border-theme-border/70 shadow-ambient flex flex-col justify-between interactive-card group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-theme-container text-primary">
                  {treatment.categoryLabel}
                </span>
                <span className="text-[12px] font-sans font-medium text-theme-secondary">
                  {treatment.duration}
                </span>
              </div>
              <h2 className="font-serif text-[22px] text-primary mb-2.5 font-normal leading-snug group-hover:text-theme-primary-container transition-colors">
                {treatment.name}
              </h2>
              <p className="font-sans text-[15px] text-theme-muted leading-relaxed mb-6">
                {treatment.shortDesc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-theme-border/40">
              {treatment.isEmergency ? (
                <>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="text-[14px] font-sans font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Emergency info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={siteConfig.contact.landlineTel}
                    className="text-[13px] font-sans font-semibold px-4 py-2 rounded-full bg-error text-white hover:bg-error/90 transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="text-[14px] font-sans font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/book?service=${treatment.slug}`}
                    className="text-[13px] font-sans font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:bg-theme-primary-container transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </Link>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function TreatmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-sans text-theme-muted">
          Loading treatment directory...
        </div>
      }
    >
      <TreatmentsCatalog />
    </Suspense>
  );
}

