'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site.config';
import { ClinicStatusBadge } from '@/components/ui/ClinicStatusBadge';

// Dynamic 3D Scene with fallback
const DentalHeroScene = dynamic(
  () => import('@/components/3d/DentalHeroScene').then((mod) => mod.DentalHeroScene),
  { ssr: false }
);

const HERO_ANATOMICAL_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAF0AqFQ-g5kEaHBHUYI6aSRGdgxugbeu7KLHBl6WUklq_semXmYtMup5iyWS3zQhg3msuY6BPZQ8hY2vXiwk6nKL5dkdIaOS_zu-lfQ48cr6AfneLxb7FV2xN0Ig8cfrROqdI-rkeulg1VrjqJlJ1Rv1h95c9k1lxrn98jinBhOlE6CvK_WGR9aabNiEglf1udxMazJQb8fWQ4L1p23uI8O9JMqpdp1qtrtBo28Bjg';

const MAP_PREVIEW_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHg4eaTXSs-DY99vMlxQoL9LJ5QHLaHmdDvRWdLZvkS5L2SAun7klqItYtxrJ0Z267mfH0Sj4skweQjGkYRH9Argf7a_IOreJejp0IXhqhcC63iZHe6C-dcj9o6NjUKj1lTir1DsYrORFKrIMGWolcTGOqQCgyTmUkiXCuTvzkRNlbVcwB1-jmcK5LOwXvp_bwL9_-KaO02Nrswz5KkVU7g7P_abtVhvnMXc6S8bMG';

export default function HomePage() {
  const [show3d, setShow3d] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [markerLeft, setMarkerLeft] = useState(10);

  // Trigger hero callout animations on load
  useEffect(() => {
    document.body.classList.add('hero-callouts-ready');
    return () => {
      document.body.classList.remove('hero-callouts-ready');
    };
  }, []);

  // Timeline Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.8;
      const endOffset = windowHeight * 0.2;
      const totalDistance = rect.height + (startOffset - endOffset);
      const currentProgress = (startOffset - rect.top) / totalDistance;
      const clamped = Math.min(Math.max(currentProgress, 0), 1);
      const activePercentage = 10 + clamped * 80;
      setMarkerLeft(activePercentage);

      const nodePositions = [10, 30, 50, 70, 90];
      let current = 1;
      nodePositions.forEach((pos, idx) => {
        if (activePercentage >= pos - 5) {
          current = idx + 1;
        }
      });
      setActiveStep(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stories = siteConfig.testimonials;
  const currentStory = stories[activeStoryIdx] || stories[0];

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* ============================================================
          1. HERO SECTION WITH ANIMATED LEVITATING MOLAR & CALLOUTS
          ============================================================ */}
      <section className="reveal-section relative w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin pt-6 lg:pt-12 pb-space-xl lg:pb-28 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Reassurance */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pr-4">
            {/* Status & Geographic Overline */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary">
                  Family dentistry in Manpada, Thane
                </span>
              </div>
              <ClinicStatusBadge />
            </div>

            {/* Serif Main Display Headline */}
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary tracking-tight leading-[1.08]">
              Gentle dental care for the whole family.
            </h1>

            {/* Calm Narrative Copy */}
            <p className="font-body-xl text-body-lg lg:text-body-xl text-on-surface-variant max-w-xl leading-relaxed">
              Thoughtful, unhurried dentistry designed to put even the most anxious patients completely at ease with sensory care and modern precision.
            </p>

            {/* Primary Action Tier */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book"
                className="interactive-button inline-flex items-center justify-center min-h-[52px] px-8 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-md hover:bg-primary-container hover:shadow-lg transition-all duration-300"
              >
                Book Appointment
              </Link>
              <a
                href="tel:02225891949"
                className="interactive-button inline-flex items-center justify-center min-h-[52px] px-7 rounded-full bg-surface-container-lowest text-primary font-label-button text-label-button shadow-sm hover:bg-surface-container-low transition-all duration-200 border border-surface-container"
              >
                <span className="material-symbols-outlined text-[19px] mr-2 text-primary">call</span>
                Call 022 25891949
              </a>
            </div>

            {/* Brass Warmth Highlight Card */}
            <div className="interactive-card mt-2 p-5 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border border-white/60 flex items-start gap-4 max-w-md">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-tertiary font-medium">
                  Your first consultation is free
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Complimentary 3D smile screening, digital dental map, and zero-obligation care blueprint.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Tactile Model Vessel with Floating Animation & Sequential Callouts */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Floating Blobs for Depth */}
            <div className="animate-ambient-blob absolute -top-8 -right-8 w-56 h-56 rounded-full bg-secondary-fixed/50 blur-3xl pointer-events-none" />
            <div className="animate-ambient-blob-slow absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" />

            {/* Soft Sage/Porcelain Organic Vessel with Floating Levitation */}
            <div className="animate-float-levitate relative w-full max-w-[540px] aspect-[4/4.2] rounded-[3rem] bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high/60 p-6 lg:p-8 flex items-center justify-center shadow-xl overflow-visible border border-white/40">
              {/* Anatomical 3D Visual Reference Image or 3D Canvas */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-surface-container-lowest shadow-sm flex items-center justify-center">
                {show3d ? (
                  <DentalHeroScene />
                ) : (
                  <Image
                    src={HERO_ANATOMICAL_IMG}
                    alt="Hyper-realistic dental cross-section model showing a pristine ceramic porcelain crown mounted onto a high-precision titanium implant root integrated into cellular bone structure"
                    fill
                    className="object-cover transform hover:scale-[1.03] transition-transform duration-700 ease-out"
                    priority
                  />
                )}

                {/* 3D / Photo Mode Switcher Pill */}
                <button
                  type="button"
                  onClick={() => setShow3d(!show3d)}
                  className="absolute bottom-3 left-3 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-white/70 text-primary font-label-caption text-[11px] hover:bg-surface-container transition-all"
                  title="Toggle between interactive 3D WebGL model and high-res medical render"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {show3d ? 'image' : '3d_rotation'}
                  </span>
                  <span>{show3d ? 'View Render' : 'Interactive 3D'}</span>
                </button>
              </div>

              {/* SVG Animated Pointer Overlay for Badge 1 (Crown) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                fill="none"
                viewBox="0 0 540 560"
              >
                {/* Pointer 1: To Top Crown */}
                <path
                  className="callout-line callout-line-1"
                  d="M 430 45 L 375 75 L 340 100"
                  stroke="#604412"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                {/* Pointer 2: To Titanium Post (Middle Left) */}
                <path
                  className="callout-line callout-line-2"
                  d="M 70 305 L 140 295 L 235 275"
                  stroke="#005255"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                {/* Pointer 3: To Base (Bottom Right) */}
                <path
                  className="callout-line callout-line-3"
                  d="M 420 500 L 360 485 L 290 440"
                  stroke="#4e6358"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Anatomical Floating Badge 1: Crown */}
              <div className="callout-pill callout-pill-1 absolute top-8 right-2 lg:-right-4 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-md border border-white/80 flex items-center gap-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                <span className="font-label-button text-label-caption text-primary">
                  Biocompatible Ceramic Crown
                </span>
              </div>

              {/* Anatomical Floating Badge 2: Titanium Implant */}
              <div className="callout-pill callout-pill-2 absolute top-[52%] -left-3 lg:-left-6 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-md border border-white/80 flex items-center gap-2 z-20">
                <span className="material-symbols-outlined text-[17px] text-primary">
                  precision_manufacturing
                </span>
                <span className="font-label-button text-label-caption text-primary">
                  Medical-Grade Titanium Post
                </span>
              </div>

              {/* Anatomical Floating Badge 3: Healthy Bone Integration */}
              <div className="callout-pill callout-pill-3 absolute bottom-6 right-6 lg:right-4 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-md border border-white/80 flex items-center gap-2 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="font-label-button text-label-caption text-secondary">
                  Osteointegrated Base
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. "WHAT DO YOU NEED?" (Needs Assessment Grid + Stroke Draw)
          ============================================================ */}
      <section className="reveal-section w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary mb-2">
            Patient Guidance
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">What do you need today?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            Select your immediate symptom or aesthetic goal for tailored, gentle treatment paths.
          </p>
        </div>

        {/* 6 Interactive Porcelain Cards with Animated Monoline Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {/* 1. Tooth Pain */}
          <Link
            href="/treatments?filter=general#emergency"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              Relieve pain
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Same-day comfort
            </span>
          </Link>

          {/* 2. Straighten Teeth */}
          <Link
            href="/treatments?filter=orthodontics"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect height="14" rx="2" width="4" x="4" y="5" />
                <rect height="18" rx="2" width="4" x="10" y="3" />
                <rect height="14" rx="2" width="4" x="16" y="5" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              Straighten
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Clear aligners
            </span>
          </Link>

          {/* 3. Whiten Teeth */}
          <Link
            href="/treatments?filter=cosmetic"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l2.4 5.2L20 8.2l-4 3.9.9 5.6-4.9-2.8-4.9 2.8.9-5.6-4-3.9 5.6-1z" />
                <path d="M19 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              Whiten teeth
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Enamel-safe luster
            </span>
          </Link>

          {/* 4. Replace Missing Teeth */}
          <Link
            href="/treatments?filter=implants"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M7 4c-2 3-3 8-1 12 1 2 3 5 4 5s1-3 2-3 1 3 2 3 3-3 4-5c2-4 1-9-1-12-2.5-3-7.5-3-10 0z" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              Replace tooth
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Precision implants
            </span>
          </Link>

          {/* 5. Smile Makeover */}
          <Link
            href="/treatments?filter=cosmetic"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              Smile makeover
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Harmonious design
            </span>
          </Link>

          {/* 6. Pediatric Care */}
          <Link
            href="/treatments?filter=children"
            className="interactive-card icon-draw-trigger group flex flex-col items-center text-center p-6 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 border border-white/60"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <svg
                className="monoline-svg w-7 h-7 text-primary group-hover:text-on-primary transition-colors"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M12 4a8 8 0 0 1 7 5" />
                <circle cx="9" cy="11.5" r="1" />
                <circle cx="15" cy="11.5" r="1" />
                <path d="M9.5 15.5c1 .8 3.5.8 5 0" />
              </svg>
            </div>
            <span className="font-headline-sm text-[18px] text-primary group-hover:text-primary-container transition-colors">
              My child
            </span>
            <span className="font-label-caption text-label-caption text-on-surface-variant mt-1">
              Gentle first visits
            </span>
          </Link>
        </div>
      </section>

      {/* ============================================================
          3. OUR TREATMENTS (3x2 Bento Grid + Calm Family Illustration)
          ============================================================ */}
      <section
        className="reveal-section w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-space-xl"
        id="treatments-section"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 relative">
          <div className="max-w-xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary mb-2 block">
              Clinical Specialties
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Refined, restorative clinical treatments
            </h2>
          </div>
          <div className="flex items-center gap-6 max-w-md">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every procedure is performed in private suites with dedicated unhurried care, gentle pre-numbing, and complete sensory comfort.
            </p>
            {/* Calm Line-Art Illustration 1: Parent & Child (Breathing cycle animation) */}
            <div className="hidden sm:flex shrink-0 animate-breathing items-center justify-center p-3 rounded-2xl bg-secondary-container/40 border border-white/70">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="42" cy="36" fill="#e0a96d" fillOpacity="0.25" r="18" />
                <circle cx="68" cy="52" fill="#c8e6c9" fillOpacity="0.45" r="12" />
                <path d="M22 84 C24 64, 38 52, 54 55 C60 56, 68 56, 78 84" fill="#d0e8da" fillOpacity="0.35" />
                <path d="M42 22 C34 22, 28 29, 29 38 C30 45, 36 50, 43 50 C50 50, 56 44, 55 36 C54 27, 49 22, 42 22 Z" stroke="#005255" strokeLinecap="round" strokeWidth="2.2" />
                <path d="M36 34 C38 34, 40 35, 41 37" stroke="#005255" strokeLinecap="round" strokeWidth="2" />
                <path d="M38 43 C42 45, 46 44, 48 41" stroke="#005255" strokeLinecap="round" strokeWidth="2" />
                <path d="M24 84 C26 66, 38 56, 52 58" stroke="#005255" strokeLinecap="round" strokeWidth="2.2" />
                <path d="M68 42 C62 42, 58 47, 59 53 C60 59, 65 63, 71 63 C76 63, 80 58, 80 52 C79 46, 75 42, 68 42 Z" stroke="#005255" strokeLinecap="round" strokeWidth="2" />
                <path d="M65 50 C66 50, 68 51, 69 52" stroke="#005255" strokeLinecap="round" strokeWidth="1.8" />
                <path d="M66 58 C68 60, 71 60, 73 57" stroke="#005255" strokeLinecap="round" strokeWidth="1.8" />
                <path d="M56 84 C58 72, 66 66, 78 70 C83 72, 86 78, 88 84" stroke="#005255" strokeLinecap="round" strokeWidth="2.2" />
                <path d="M46 62 C52 64, 58 64, 62 60" stroke="#7a5b28" strokeDasharray="3 3" strokeWidth="1.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: General */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Preventive</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">General Dentistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Unhurried dental cleanings and painless diagnostics.</p>
            </div>
            <Link href="/treatments?filter=general" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>Explore general care</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 2: Cosmetic */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Aesthetic</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Cosmetic Dentistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Ultra-thin porcelain veneers and natural shade matching.</p>
            </div>
            <Link href="/treatments?filter=cosmetic" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>Explore cosmetic suite</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 3: Implants */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2v20M5 5l14 14M19 5 5 19" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Surgical Mastery</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Dental Implants</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Lifelong titanium posts with 3D computer-guided accuracy.</p>
            </div>
            <Link href="/treatments?filter=implants" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>Learn about implants</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 4: Orthodontics */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Orthodontics</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Orthodontics (Invisalign)</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Discreet invisible alignment designed for adults and teens.</p>
            </div>
            <Link href="/treatments?filter=orthodontics" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>Discover clear aligners</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 5: Restorative */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 3c-2 3-3 8-1 12 1 2 3 6 4 6s1-4 2-4 1 4 2 4 3-4 4-6c2-4 1-9-1-12-2.5-3-7.5-3-10 0z" />
                    <path d="M12 6v6M9 9h6" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Restorative</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Restorative Dentistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Gentle root canals and biomimetic bonded ceramic restorations.</p>
            </div>
            <Link href="/treatments?filter=restorative" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>Restore your smile</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 6: Pediatric */}
          <div className="interactive-card icon-draw-trigger group p-8 rounded-[28px] bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[280px] border border-white/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <svg className="monoline-svg w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 13.5c1.5 2 4.5 2 6 0" />
                    <circle cx="9" cy="9.5" r="1" />
                    <circle cx="15" cy="9.5" r="1" />
                  </svg>
                </div>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Pediatric</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Pediatric Dentistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-1">Friendly, pressure-free preventive care for young children.</p>
            </div>
            <Link href="/treatments?filter=children" className="inline-flex items-center gap-2 text-primary font-label-button text-label-button group-hover:gap-3 transition-all">
              <span>View children's protocols</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. YOUR VISIT, STEP BY STEP (Interactive Scroll Timeline + Tooth Marker)
          ============================================================ */}
      <section
        ref={timelineRef}
        className="reveal-section w-full bg-surface-container-low/60 py-space-xl lg:py-24 my-6 relative overflow-hidden"
        id="visit-timeline-section"
      >
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary mb-2">
              Unhurried Experience
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Your visit, step by step</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              From your first message to lifelong preventive wellness, we move entirely at your pace.
            </p>
          </div>

          {/* Desktop Interactive Dotted Connecting Track & Glowing Animated Tooth Marker */}
          <div className="hidden lg:block relative w-full h-8 mb-6" id="timeline-track-container">
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <line stroke="#bec8c9" strokeDasharray="6 8" strokeLinecap="round" strokeWidth="2.5" x1="10%" x2="90%" y1="16" y2="16" />
              <line
                id="timeline-progress-fill"
                stroke="#005255"
                strokeLinecap="round"
                strokeWidth="3"
                style={{ transition: 'x2 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                x1="10%"
                x2={`${markerLeft}%`}
                y1="16"
                y2="16"
              />
            </svg>
            <div
              className="absolute top-0 -ml-4 w-9 h-9 rounded-full bg-surface-container-lowest border-2 border-primary flex items-center justify-center shadow-lg transition-all duration-300 ease-out"
              style={{ left: `${markerLeft}%`, animation: 'toothPulse 2.8s ease-in-out infinite' }}
              title="Your Journey Progress"
            >
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C7.5 2 4 4 4 8c0 3 1.5 6 2.5 9 1 3 2.5 5 4 5s1.5-2.5 1.5-2.5S12.5 22 14 22s3-2 4-5c1-3 2.5-6 2.5-9 0-4-3.5-6-8-6zm-1 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
          </div>

          {/* 5-Step Connected Timeline Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6" id="timeline-cards-grid">
            {/* Step 1 */}
            <div
              className={`timeline-node flex flex-col p-6 rounded-[24px] bg-surface-container-lowest shadow-sm relative z-10 border ${
                activeStep >= 1 ? 'active-step border-primary' : 'border-transparent'
              }`}
            >
              <div className="timeline-badge w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-button text-label-button mb-4 shadow-sm transition-all duration-300">
                01
              </div>
              <h3 className="font-headline-sm text-[20px] text-primary mb-1">First contact</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                A warm, zero-pressure phone or WhatsApp chat to understand your preferences and sensory comfort.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`timeline-node flex flex-col p-6 rounded-[24px] bg-surface-container-lowest shadow-sm relative z-10 border ${
                activeStep >= 2 ? 'active-step border-primary' : 'border-transparent'
              }`}
            >
              <div className="timeline-badge w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-label-button text-label-button mb-4 transition-all duration-300">
                02
              </div>
              <h3 className="font-headline-sm text-[20px] text-primary mb-1">Consultation</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Gentle examination, 3D low-radiation digital scans, and co-created transparent care alternatives.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`timeline-node flex flex-col p-6 rounded-[24px] bg-surface-container-lowest shadow-sm relative z-10 border ${
                activeStep >= 3 ? 'active-step border-primary' : 'border-transparent'
              }`}
            >
              <div className="timeline-badge w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-label-button text-label-button mb-4 transition-all duration-300">
                03
              </div>
              <h3 className="font-headline-sm text-[20px] text-primary mb-1">Clear plan</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Transparent upfront treatment estimates with itemized clarity. No surprise fees or rushed decisions.
              </p>
            </div>

            {/* Step 4 */}
            <div
              className={`timeline-node flex flex-col p-6 rounded-[24px] bg-surface-container-lowest shadow-sm relative z-10 border ${
                activeStep >= 4 ? 'active-step border-primary' : 'border-transparent'
              }`}
            >
              <div className="timeline-badge w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center font-label-button text-label-button mb-4 transition-all duration-300">
                04
              </div>
              <h3 className="font-headline-sm text-[20px] text-primary mb-1">Care &amp; check-in</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Comfort follow-up within 24 hours of any procedure to ensure peaceful recovery and comfort.
              </p>
            </div>

            {/* Step 5 */}
            <div
              className={`timeline-node flex flex-col p-6 rounded-[24px] bg-surface-container-lowest shadow-sm relative z-10 border ${
                activeStep >= 5 ? 'active-step border-primary' : 'border-transparent'
              }`}
            >
              <div className="timeline-badge w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-button text-label-button mb-4 transition-all duration-300">
                05
              </div>
              <h3 className="font-headline-sm text-[20px] text-primary mb-1">Periodic review</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Calm recall visits at 6 or 12 months to preserve bone and enamel vitality for a lifetime.
              </p>
            </div>
          </div>

          {/* Reassurance Banner */}
          <div className="mt-12 p-4 rounded-full bg-surface-container-lowest/80 max-w-xl mx-auto flex items-center justify-between gap-4 px-6 shadow-sm border border-white/60">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-[22px]">contact_phone</span>
              <span className="font-body-md text-body-md text-on-surface">
                <strong>24-Hour Telephone Support:</strong> Direct medical guidance for our post-op patients
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
          </div>
        </div>
      </section>

      {/* ============================================================
          5. PATIENT STORIES (Editorial Testimonial + Calm Smiling Illustration)
          ============================================================ */}
      <section
        className="reveal-section w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-space-xl"
        id="patient-stories"
      >
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-10">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary mb-2">
            Real Experiences
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Patient stories</h2>
        </div>

        {/* Expansive Testimonial Card with Calm Line-Art Illustration */}
        <div className="interactive-card max-w-4xl mx-auto p-10 lg:p-14 rounded-[32px] bg-surface-container-lowest shadow-md relative overflow-hidden flex flex-col justify-between border border-white/60">
          <span className="material-symbols-outlined absolute top-6 right-8 text-[96px] text-surface-container-low select-none pointer-events-none opacity-50">
            format_quote
          </span>

          <div>
            {/* Star Rating */}
            <div className="flex items-center gap-1 text-tertiary mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
              <span className="font-label-caption text-label-caption text-on-surface-variant ml-2">
                5.0 Star Clinical Experience
              </span>
            </div>

            {/* The Reassuring Quote & Breathing Relaxed Patient Illustration */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <blockquote className="font-headline-lg text-headline-md lg:text-headline-lg text-primary leading-tight font-normal flex-1">
                “{currentStory.quote}”
              </blockquote>

              {/* Calm Line-Art Illustration 2: Patient Smiling Calmly in Deep Relaxation */}
              <div className="shrink-0 animate-breathing flex flex-col items-center justify-center p-3 rounded-3xl bg-surface-container-low/80 border border-white">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="54" fill="#f6d8ae" fillOpacity="0.35" r="26" />
                  <path d="M30 105 C35 78, 50 68, 60 70 C70 68, 85 78, 90 105" fill="#c8e6c9" fillOpacity="0.4" />
                  <path d="M60 28 C46 28, 38 38, 38 52 C38 66, 48 76, 60 76 C72 76, 82 66, 82 52 C82 38, 74 28, 60 28 Z" stroke="#005255" strokeLinecap="round" strokeWidth="2.2" />
                  <path d="M48 48 C51 51, 55 51, 57 48" stroke="#005255" strokeLinecap="round" strokeWidth="2" />
                  <path d="M63 48 C65 51, 69 51, 72 48" stroke="#005255" strokeLinecap="round" strokeWidth="2" />
                  <path d="M52 61 C56 65, 64 65, 68 61" stroke="#604412" strokeLinecap="round" strokeWidth="2.2" />
                  <path d="M32 105 C36 82, 48 74, 60 76 C72 74, 84 82, 88 105" stroke="#005255" strokeLinecap="round" strokeWidth="2.2" />
                  <path d="M22 52 C22 42, 28 34, 34 30" stroke="#8bd2d7" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="1.8" />
                  <path d="M98 52 C98 42, 92 34, 86 30" stroke="#8bd2d7" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="1.8" />
                </svg>
                <span className="font-label-caption text-[11px] text-secondary tracking-wider uppercase mt-1">
                  Calm &amp; Painless
                </span>
              </div>
            </div>
          </div>

          {/* Author and Navigation Row */}
          <div className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-surface-container-high/40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-headline-sm text-[20px]">
                {currentStory.initials}
              </div>
              <div>
                <h3 className="font-headline-sm text-[18px] text-primary">{currentStory.author}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-label-caption text-label-caption text-on-surface-variant">
                    {currentStory.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="font-label-caption text-label-caption text-secondary font-medium">
                    Verified Patient
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous story"
                onClick={() =>
                  setActiveStoryIdx((prev) => (prev === 0 ? stories.length - 1 : prev - 1))
                }
                className="w-11 h-11 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                type="button"
                aria-label="Next story"
                onClick={() =>
                  setActiveStoryIdx((prev) => (prev === stories.length - 1 ? 0 : prev + 1))
                }
                className="w-11 h-11 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. VISIT US (Split Map & Clinic Details)
          ============================================================ */}
      <section
        className="reveal-section w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-16"
        id="visit-us"
      >
        <div className="mb-10">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary mb-2 block">
            Sanctuary Location
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Visit us in Manpada, Thane</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Map Card Placeholder */}
          <div className="interactive-card lg:col-span-7 rounded-[32px] bg-surface-container-lowest shadow-sm p-4 relative overflow-hidden flex flex-col min-h-[420px] border border-white/60">
            <div
              className="w-full h-full min-h-[380px] rounded-[24px] bg-cover bg-center relative overflow-hidden"
              data-location="Happy Valley Shopping Complex, Manpada, Thane West"
              style={{ backgroundImage: `url('${MAP_PREVIEW_IMG}')` }}
            >
              {/* Floating Map Details Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-4 border border-white/70">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
                  <div>
                    <div className="font-label-button text-label-button text-primary">
                      Happy Valley Shopping Complex
                    </div>
                    <div className="font-label-caption text-label-caption text-on-surface-variant">
                      Tikujiniwadi Road, Manpada, Thane
                    </div>
                  </div>
                </div>
                <a
                  className="shrink-0 p-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm"
                  href={siteConfig.address.googleMapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Open in Google Maps"
                >
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clinic Operational Details */}
          <div className="interactive-card lg:col-span-5 rounded-[32px] bg-surface-container-lowest shadow-sm p-8 lg:p-10 flex flex-col justify-between border border-white/60">
            <div className="flex flex-col gap-6">
              {/* Full Address */}
              <div>
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <span className="material-symbols-outlined text-[20px]">apartment</span>
                  <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest">
                    Clinic Address
                  </span>
                </div>
                <p className="font-headline-sm text-[20px] text-primary font-medium leading-snug">
                  Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane 400610
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Convenient ground-floor elevator access, reserved patient parking, and step-free wheelchair ingress.
                </p>
              </div>

              {/* Operating Hours Block */}
              <div className="p-5 rounded-2xl bg-surface-container-low/60 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-primary font-label-button text-label-button mb-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>Clinic Consultation Hours</span>
                </div>
                <div className="flex justify-between items-center text-body-md font-body-md">
                  <span className="text-on-surface-variant">Monday – Friday</span>
                  <span className="text-primary font-medium">
                    10:00 am – 1:00 pm<br />
                    <span className="text-right block">6:00 pm – 10:00 pm</span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-body-md font-body-md pt-1">
                  <span className="text-on-surface-variant">Saturday</span>
                  <span className="text-primary font-medium">10:00 am – 5:00 pm</span>
                </div>
                <div className="flex justify-between items-center text-body-md font-body-md pt-1">
                  <span className="text-on-surface-variant">Sunday</span>
                  <span className="text-error font-medium">Closed for sterilization</span>
                </div>
              </div>
            </div>

            {/* Action Button Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              <a
                className="interactive-button min-h-[48px] rounded-full bg-surface-container-low text-primary flex items-center justify-center font-label-button text-label-button hover:bg-surface-container transition-colors"
                href={siteConfig.contact.landlineTel}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">call</span>
                Call Clinic
              </a>
              <a
                className="interactive-button min-h-[48px] rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-button text-label-button hover:bg-secondary-fixed transition-colors"
                href={siteConfig.contact.whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">chat</span>
                WhatsApp
              </a>
              <a
                className="interactive-button min-h-[48px] rounded-full bg-surface-container-low text-primary flex items-center justify-center font-label-button text-label-button hover:bg-surface-container transition-colors"
                href={siteConfig.address.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">directions</span>
                Directions
              </a>
              <Link
                className="interactive-button min-h-[48px] rounded-full bg-primary text-on-primary flex items-center justify-center font-label-button text-label-button hover:bg-primary-container transition-colors shadow-sm"
                href="/book"
              >
                Book Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
