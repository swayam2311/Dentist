'use client';

import React, { useState } from 'react';
import { siteConfig, type Testimonial } from '@/config/site.config';
import { Quote, ChevronLeft, ChevronRight, ShieldCheck, ExternalLink } from 'lucide-react';

interface TestimonialsProps {
  items?: Testimonial[];
  id?: string;
}

export function Testimonials({ items = siteConfig.testimonials, id = 'patient-stories' }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const isMultiple = items.length > 1;
  const current = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id={id}
      className="scroll-mt-28 w-full max-w-[1200px] mx-auto px-margin-mobile lg:px-margin py-16 lg:py-24"
      aria-label="Patient Testimonials"
    >
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary block mb-2 font-semibold">
          Real Patient Feedback
        </span>
        <h2 className="font-serif text-[32px] sm:text-[40px] text-primary font-normal leading-tight">
          Patient Stories
        </h2>
        <p className="font-sans text-[15px] text-on-surface-variant mt-2">
          Genuine reflections from patients who entrusted their oral health to Dr. Anand Gangal.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-card p-8 sm:p-12 lg:p-14 border border-theme-border/60 shadow-ambient relative overflow-hidden flex flex-col justify-between">
        <Quote
          className="absolute top-6 right-8 w-20 h-20 text-surface-container pointer-events-none opacity-40"
          aria-hidden="true"
        />

        <div className="relative z-10 mb-8">
          <p className="font-serif text-[20px] sm:text-[24px] lg:text-[26px] text-primary font-normal leading-relaxed italic mb-8">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-theme-border/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center font-serif text-[18px] font-bold">
                {current.initials}
              </div>
              <div>
                <h3 className="font-body-lg text-body-lg font-bold text-on-surface">
                  {current.author}
                </h3>
                <p className="font-label-caption text-label-caption text-on-surface-variant">
                  {current.location}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-secondary font-label-caption text-[12px] font-medium self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Verified Patient Experience</span>
            </div>
          </div>
        </div>

        {/* Carousel controls if multiple reviews */}
        {isMultiple && (
          <div className="flex items-center justify-between pt-4 border-t border-theme-border/30">
            {/* Slide dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Review Selector">
              {items.map((item, idx) => (
                <button
                  key={item.author}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View testimonial from ${item.author}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${idx === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-surface-container hover:bg-theme-border'
                    }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

