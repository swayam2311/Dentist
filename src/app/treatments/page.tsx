'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import {
  Sparkles,
  ArrowRight,
  Shield,
  VolumeX,
  HeartHandshake,
  MessageCircle,
  Calendar,
  AlertCircle,
  Smile,
  Activity,
  Heart,
  Search,
} from 'lucide-react';

type CategoryFilter = 'all' | 'general' | 'restorative' | 'cosmetic' | 'orthodontics' | 'children';

interface CategoryOption {
  id: CategoryFilter;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Treatments' },
  { id: 'general', label: 'General Care' },
  { id: 'restorative', label: 'Restorative & Implants' },
  { id: 'cosmetic', label: 'Cosmetic & Smile' },
  { id: 'orthodontics', label: 'Invisalign & Aligners' },
  { id: 'children', label: 'Pediatric Care' },
];

interface TreatmentCard {
  id: string;
  slug: string;
  title: string;
  category: CategoryFilter;
  categoryLabel: string;
  description: string;
  icon: React.ReactNode;
}

const TREATMENTS: TreatmentCard[] = [
  {
    id: 'emergency-care',
    slug: 'emergency-care',
    title: 'Emergency Care & Pain Relief',
    category: 'general',
    categoryLabel: 'General Care',
    description: 'Prompt same-day evaluation for acute toothaches, chipped enamel, and urgent dental concerns.',
    icon: <AlertCircle className="w-6 h-6 text-error" aria-hidden="true" />,
  },
  {
    id: 'root-canal-treatment',
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description: 'Conservative endodontic therapy designed to save your natural tooth with gentle local anaesthesia.',
    icon: <Activity className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'dental-implants',
    slug: 'dental-implants',
    title: 'Dental Implants',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description: 'Durable tooth replacements to restore natural chewing function, jawbone health, and aesthetic balance.',
    icon: <Shield className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'invisalign',
    slug: 'invisalign',
    title: 'Invisalign Clear Aligners',
    category: 'orthodontics',
    categoryLabel: 'Orthodontics',
    description: 'Discreet, removable clear aligners changed about every 2 weeks to gently guide teeth into alignment.',
    icon: <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'teeth-whitening',
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Carefully monitored in-office and take-home whitening formulated to minimize enamel sensitivity.',
    icon: <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'porcelain-veneers',
    slug: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Ultra-thin custom ceramic shells crafted to refine tooth shade, symmetry, and smile aesthetics.',
    icon: <Smile className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'digital-smile-design',
    slug: 'digital-smile-design',
    title: 'Digital Smile Design',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic',
    description: 'Comprehensive aesthetic planning evaluating facial harmony, lip lines, and tooth proportions.',
    icon: <Smile className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'crowns',
    slug: 'crowns',
    title: 'Dental Crowns & Bridges',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description: 'Custom ceramic crowns and bridges that reinforce weakened teeth and close missing tooth gaps.',
    icon: <Shield className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'dentures',
    slug: 'dentures',
    title: 'Dentures & Maxillofacial Care',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description: 'Custom full and partial dentures designed for functional comfort, speech clarity, and natural aesthetics.',
    icon: <Smile className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'white-fillings',
    slug: 'white-fillings',
    title: 'Tooth-Coloured White Fillings',
    category: 'general',
    categoryLabel: 'General Care',
    description: 'Bonded aesthetic composite resin restorations that preserve healthy enamel and blend seamlessly.',
    icon: <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'broken-teeth',
    slug: 'broken-teeth',
    title: 'Broken & Worn Teeth Repair',
    category: 'restorative',
    categoryLabel: 'Restorative Care',
    description: 'Conservative restoration for chipped, cracked, or severely ground teeth to rebuild bite stability.',
    icon: <Shield className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'pediatric-dentistry',
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dental Care',
    category: 'children',
    categoryLabel: 'Pediatric Care',
    description: 'Encouraging, patient first visits, preventive fluoride, and gentle cavity prevention for children.',
    icon: <Heart className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
  {
    id: 'preventative-dentistry',
    slug: 'preventative-dentistry',
    title: 'Preventative Dentistry & Hygiene',
    category: 'general',
    categoryLabel: 'General Care',
    description: 'Gentle ultrasonic cleaning, plaque removal, and periodontal health assessments to preserve teeth.',
    icon: <Activity className="w-6 h-6 text-primary" aria-hidden="true" />,
  },
];

function TreatmentsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter') as CategoryFilter | null;

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>(
    filterParam && CATEGORIES.some((c) => c.id === filterParam) ? filterParam : 'all'
  );

  useEffect(() => {
    if (filterParam && CATEGORIES.some((c) => c.id === filterParam)) {
      setActiveFilter(filterParam);
    }
  }, [filterParam]);

  const handleFilterChange = (filterId: CategoryFilter) => {
    setActiveFilter(filterId);
    if (filterId === 'all') {
      router.push('/treatments', { scroll: false });
    } else {
      router.push(`/treatments?filter=${filterId}`, { scroll: false });
    }
  };

  const filtered = activeFilter === 'all'
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category === activeFilter);

  return (
    <main id="main-content" className="w-full relative py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin">
        {/* Editorial Eyebrow & Headline */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            <span>Gentle &amp; Conservative Dentistry</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[48px] text-primary tracking-tight font-normal leading-tight mb-4">
            Care for every smile, in one unhurried clinic
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            From preventive hygiene and smile aesthetics to complex restorative implantology in Manpada, Thane. Clear explanations, transparent estimates, and zero pressure.
          </p>
        </section>

        {/* Free Consultation Banner / CTA Ribbon (Promoted out of grid) */}
        <div className="bg-surface-container-lowest rounded-card p-6 sm:p-8 border border-theme-border/60 shadow-ambient mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-1">
              Complimentary First Step
            </span>
            <h2 className="font-serif text-[24px] sm:text-[28px] text-primary font-normal leading-snug mb-1">
              Free Oral Health Consultation
            </h2>
            <p className="font-sans text-[14px] text-on-surface-variant leading-relaxed">
              Every new patient journey begins with an unhurried clinical evaluation. We examine your teeth, listen to your concerns, and provide a clear written treatment estimate with zero obligation.
            </p>
          </div>
          <Link
            href="/book?service=free-consultation"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full md:w-auto"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Book Free Consultation</span>
          </Link>
        </div>

        {/* Interactive Filter Pills */}
        <section className="flex items-center justify-center mb-10 overflow-x-auto pb-2" aria-label="Treatment Categories">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-surface-container rounded-full max-w-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`min-h-[40px] px-5 rounded-full font-label-button text-[13px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface hover:text-primary hover:bg-surface-container-lowest'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Treatments Grid */}
        <section aria-label="Treatments List" className="mb-16">
          {filtered.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-card p-12 text-center border border-theme-border/60 max-w-md mx-auto">
              <Search className="w-10 h-10 text-theme-muted mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-serif text-[20px] text-primary mb-1">No treatments in this category</h3>
              <p className="font-sans text-[14px] text-on-surface-variant mb-4">
                Please select another category or view all our clinical services.
              </p>
              <button
                type="button"
                onClick={() => handleFilterChange('all')}
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-button text-[13px]"
              >
                Show All Treatments
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <article
                  key={t.id}
                  id={t.id}
                  className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient hover:shadow-ambient-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                        {t.icon}
                      </div>
                      <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-wider px-3 py-1 rounded-full bg-surface-container">
                        {t.categoryLabel}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-[20px] text-primary mb-2 font-medium group-hover:text-primary-container transition-colors">
                      {t.title}
                    </h2>
                    <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed mb-6">
                      {t.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-theme-border/40 flex items-center justify-between">
                    <Link
                      href={`/book?service=${t.slug}`}
                      aria-label={`Book ${t.title}`}
                      className="inline-flex items-center gap-1.5 font-label-button text-[14px] text-primary hover:underline underline-offset-4 font-semibold group-hover:text-primary-container transition-colors"
                    >
                      <span>Book this care</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="text-[13px] font-sans text-secondary hover:text-primary transition-colors"
                    >
                      Learn more
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Comfort-Focused Care Principles (Required H2 above comfort features) */}
        <section className="mb-16">
          <div className="text-center mb-8 max-w-xl mx-auto">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-1">
              Patient Comfort
            </span>
            <h2 className="font-serif text-[26px] sm:text-[32px] text-primary font-normal leading-tight">
              Comfort-Focused Care Principles
            </h2>
            <p className="font-sans text-[14px] text-on-surface-variant mt-1">
              Every procedure is adapted to your individual comfort boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container rounded-card p-6 sm:p-7 border border-theme-border/40 flex items-start gap-4">
              <VolumeX className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-1 font-medium">
                  Acoustic Calm
                </h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  Quiet, enclosed treatment operatories designed to minimize clinic sounds and drill noise.
                </p>
              </div>
            </div>

            <div className="bg-surface-container rounded-card p-6 sm:p-7 border border-theme-border/40 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-1 font-medium">
                  Gentle Local Anaesthesia
                </h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  Topical pre-numbing gels applied prior to any injection to ensure maximum comfort.
                </p>
              </div>
            </div>

            <div className="bg-surface-container rounded-card p-6 sm:p-7 border border-theme-border/40 flex items-start gap-4">
              <HeartHandshake className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-headline-sm text-[18px] text-primary mb-1 font-medium">
                  Patient-Controlled Pacing
                </h3>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                  You can pause treatment at any moment. Our clinicians move at your pace, not the clock.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Discussion Banner */}
        <section className="bg-surface-container-lowest rounded-card p-8 sm:p-12 border border-theme-border/60 shadow-ambient text-center max-w-3xl mx-auto">
          <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-2">
            Personalized Guidance
          </span>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-primary font-normal leading-tight mb-3">
            Unsure which treatment is right for you?
          </h2>
          <p className="font-sans text-[15px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule an unhurried conversation with Dr. Anand Gangal. We examine, explain alternatives in plain language, and answer every question before starting any procedure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book an Appointment</span>
            </Link>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-button text-label-button hover:bg-secondary-fixed transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function TreatmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-sans text-on-surface-variant">
          Loading treatment options...
        </div>
      }
    >
      <TreatmentsCatalogContent />
    </Suspense>
  );
}
