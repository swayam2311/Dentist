'use client';

import React from 'react';
import { siteConfig } from '@/config/site.config';
import { Check, ShieldCheck, Clock, Calendar, HeartHandshake } from 'lucide-react';

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
  badge?: string;
  highlight?: string;
}

interface TimelineProps {
  steps?: TimelineStep[];
  id?: string;
}

export function Timeline({ steps = siteConfig.patientJourney, id = 'journey-timeline' }: TimelineProps) {
  const stepIcons = [
    <Clock key="1" className="w-5 h-5 text-primary" aria-hidden="true" />,
    <ShieldCheck key="2" className="w-5 h-5 text-primary" aria-hidden="true" />,
    <Calendar key="3" className="w-5 h-5 text-primary" aria-hidden="true" />,
    <HeartHandshake key="4" className="w-5 h-5 text-primary" aria-hidden="true" />,
    <Check key="5" className="w-5 h-5 text-on-primary" aria-hidden="true" />,
  ];

  return (
    <div id={id} className="relative w-full max-w-4xl mx-auto py-8">
      {/* 
        CONTINUOUS RAIL:
        Runs exactly from the vertical center of the first node (top: 24px / 1.5rem)
        to the vertical center of the terminal node (bottom: 24px / 1.5rem).
        Mobile: left-6 (24px)
        Desktop: left-1/2 (50%)
        No gap before the first node, no overflow past the last node.
      */}
      <div
        className="absolute left-6 md:left-1/2 top-6 bottom-6 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary/60 pointer-events-none"
        aria-hidden="true"
      />

      <ol className="relative flex flex-col gap-12 sm:gap-16 list-none m-0 p-0" aria-label="Visit Timeline Steps">
        {steps.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={item.step}
              className="relative flex flex-col md:flex-row items-start md:items-center min-h-[96px] group"
            >
              {/* Desktop Left Slot (shown on even steps, empty on odd) */}
              <div
                className={`hidden md:flex md:w-1/2 ${
                  isEven ? 'justify-end pr-10' : 'justify-end pr-10 invisible pointer-events-none'
                }`}
                aria-hidden={!isEven}
              >
                {isEven && (
                  <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient hover:shadow-ambient-hover transition-all duration-300 w-full max-w-md text-left">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">
                        Step 0{item.step}
                      </span>
                      {item.badge && (
                        <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-caption text-[11px] font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-normal leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>

              {/* 
                TIMELINE NODE:
                Center of the node aligns exactly with the rail at all breakpoints.
                Mobile: left-6 -translate-x-1/2
                Desktop: left-1/2 -translate-x-1/2
              */}
              <div
                className={`absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 z-10 ${
                  isLast
                    ? 'bg-primary text-on-primary ring-4 ring-primary-fixed shadow-md'
                    : 'bg-surface-container-lowest text-primary border-2 border-primary shadow-sm'
                }`}
                aria-hidden="true"
              >
                {isLast ? (
                  <Check className="w-6 h-6 text-on-primary" strokeWidth={2.5} />
                ) : (
                  <span className="font-serif text-[18px] font-semibold">
                    0{item.step}
                  </span>
                )}
              </div>

              {/* Mobile Content + Desktop Right Slot */}
              <div
                className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                  !isEven ? 'md:flex md:justify-start md:pl-10' : 'md:flex md:justify-start md:pl-10 md:hidden'
                }`}
              >
                <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient hover:shadow-ambient-hover transition-all duration-300 w-full max-w-md text-left">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">
                      Step 0{item.step}
                    </span>
                    {item.badge && (
                      <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-caption text-[11px] font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Terminal Cap Marker: Confirms the completion of the unhurried cycle */}
      <div className="flex items-center justify-center mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container text-primary font-label-caption text-label-caption border border-theme-border/40 shadow-sm">
          <Check className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Complete Unhurried Care Cycle</span>
        </div>
      </div>
    </div>
  );
}

