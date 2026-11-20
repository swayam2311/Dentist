'use client';

import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site.config';

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.75;
      const endOffset = windowHeight * 0.25;
      const totalDistance = rect.height + (startOffset - endOffset);
      const currentProgress = (startOffset - rect.top) / totalDistance;
      const clamped = Math.min(Math.max(currentProgress, 0), 1);

      // Travel from 10% to 90%
      const percentage = 10 + clamped * 80;
      setScrollPercentage(percentage);

      // Determine active step index (0 to 4)
      const stepIdx = Math.min(Math.floor(clamped * siteConfig.patientJourney.length), siteConfig.patientJourney.length - 1);
      setActiveStepIndex(stepIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-24" id="patient-journey">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-container/60 mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-theme-secondary">
              The Gentle Pathway
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-primary tracking-tight font-normal">
            Your 5-Step Unhurried Journey
          </h2>
          <p className="font-sans text-[16px] text-theme-muted mt-2">
            From your first message to lifelong post-care review, explore how our team cares for you with patience and respect.
          </p>
        </div>

        {/* Traveling Tooth Marker & Progress Line (Desktop & Tablet) */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto mb-12">
          {/* Track line */}
          <div className="h-1 bg-theme-container-high/60 rounded-full w-full relative">
            {/* Filled progress */}
            <div
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${scrollPercentage}%` }}
            />
          </div>

          {/* Traveling Tooth Icon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-button transition-all duration-150 animate-tooth-pulse"
            style={{ left: `${scrollPercentage}%` }}
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C7.5 2 4 4.5 4 8.5C4 11.5 5.5 13.5 6.5 15.5C7.5 17.5 8 21.5 10 22C11 22.25 11.5 20 12 18C12.5 20 13 22.25 14 22C16 21.5 16.5 17.5 17.5 15.5C18.5 13.5 20 11.5 20 8.5C20 4.5 16.5 2 12 2Z" />
            </svg>
          </div>
        </div>

        {/* 5 Journey Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {siteConfig.patientJourney.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <div
                key={step.step}
                className={`timeline-node rounded-[24px] p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-theme-card active-step border-primary shadow-ambient'
                    : isCompleted
                    ? 'bg-theme-card/80 border-theme-border/60 opacity-90'
                    : 'bg-theme-card/40 border-theme-border/30 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`timeline-badge w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-sans font-bold transition-colors ${
                        isActive
                          ? 'bg-primary text-white shadow-button'
                          : isCompleted
                          ? 'bg-theme-secondary-container text-theme-ink'
                          : 'bg-theme-container text-theme-muted'
                      }`}
                    >
                      0{step.step}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-theme-secondary font-medium">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-[18px] sm:text-[20px] text-primary mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[14px] text-theme-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

