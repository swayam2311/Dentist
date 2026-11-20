'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SUITE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDAasvDR0YC7u4jetxP-TlVQExMmsvSbb_bUd57JTzs1Ur6bYxNLzCnQPa0fr_J03WYFf0OjEkBwFyxXFsnqS7TaJZuVBISfvWWCZyEnw655XaBN9FkvsfsEHo7hGMa-9xamKVaouK0eZSf4Runo_0ESsH2qiRogzy1HRT4gG15fSu4o4IN0-voKADpqheow2GwqdphxvV3QmTltXeNhnjF7E0hnqvrF6YJ1-80MFPF';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'What actually happens at my first appointment?',
    a: 'Your first visit is completely non-invasive. We welcome you into our private consultation living room, listen attentively to any concerns or past dental anxiety, take a gentle 3D digital scan, and discuss treatment options transparently. No tools touch your teeth without your full understanding and consent.',
  },
  {
    q: 'Is the first consultation really free?',
    a: 'Yes, 100%. Your initial examination, oral health report, and treatment estimate are completely free with zero financial obligation. You are never pressured to begin treatment on the same day.',
  },
  {
    q: 'I experience severe dental anxiety or panic. How can you help me?',
    a: 'We specialize in treating fearful and anxious patients. We follow sensory care protocols including sound-dampened suites, calming music, warm pre-numbing gels, and our "Stop-Anytime" Golden Rule: raising your hand pauses everything instantly.',
  },
  {
    q: 'How does the "Stop-Anytime" Golden Rule work?',
    a: 'Whenever you feel the slightest discomfort or need a breather, simply raise your left hand. Our dentists and assistants pause immediately, step back, and give you as much time as you need to relax before continuing.',
  },
  {
    q: 'Are your treatment rooms accessible for elderly patients or wheelchairs?',
    a: 'Yes. Gangal Dental Clinic is located on the ground floor of Happy Valley Shopping Complex with step-free entry, ramp access, and reserved parking immediately in front.',
  },
  {
    q: 'What are your clinic consultation hours?',
    a: 'Monday to Friday: 10:00 AM – 1:00 PM and 6:00 PM – 10:00 PM. Saturday: 10:00 AM – 5:00 PM. Sundays are closed for deep multi-stage sterilization. We also provide a 24-hour telephone service for post-treatment queries and urgent emergencies.',
  },
];

export default function NewPatientsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Atmospheric Sanctuary Ambient Background Accents */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-fixed/30 via-secondary-fixed/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

        {/* Header / Introductions Section */}
        <section className="relative max-w-[1200px] mx-auto px-margin-mobile lg:px-margin pt-space-lg lg:pt-space-xl pb-space-lg">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-fixed/50 text-secondary mb-space-sm shadow-sm backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">spa</span>
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-[0.2em] font-semibold text-primary">
                Gentle, Transparent &amp; No-Pressure
              </span>
            </div>

            {/* Master Title */}
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-primary tracking-tight mb-space-sm font-normal">
              New Patients — Unhurried Care <br className="hidden sm:inline" />
              <span className="italic font-normal">From Day One</span>
            </h1>

            {/* Reassuring Paragraph */}
            <p className="font-body-xl text-body-lg lg:text-body-xl text-on-surface-variant leading-relaxed font-light">
              If visiting the dentist fills you with tension, you are in tender hands. We designed Gangal Dental Clinic as a sound-dampened sanctuary where time slows down, your autonomy is absolute, and care happens on your terms.
            </p>

            {/* Trust Badge Mini Mosaic */}
            <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant font-label-caption text-label-caption">
              <div className="flex items-center gap-2 bg-surface-container-lowest/80 px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Dedicated 45-Minute Slot Per Patient</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest/80 px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span>Over 3,400+ Anxious Patients Guided</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest/80 px-3 py-1.5 rounded-full shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-tertiary-container text-[18px]">verified_user</span>
                <span>Manpada, Ghodbunder Rd Sanctuary</span>
              </div>
            </div>
          </div>

          {/* Quick Reassurance Pill Strip */}
          <div className="mt-space-xl grid grid-cols-2 lg:grid-cols-4 gap-space-sm">
            <div className="flex items-center gap-3 p-space-sm lg:p-space-md bg-surface-container-lowest/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed/60 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">hourglass_disabled</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-button text-label-button text-on-surface leading-tight">Zero Waiting Rush</span>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Private direct-suite arrival</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-space-sm lg:p-space-md bg-surface-container-lowest/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/60 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-button text-label-button text-on-surface leading-tight">Complimentary 3D Scan</span>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Instant, low-radiation render</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-space-sm lg:p-space-md bg-surface-container-lowest/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed/60 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-button text-label-button text-on-surface leading-tight">No Hidden Costs</span>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Upfront itemized printed plans</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-space-sm lg:p-space-md bg-surface-container-lowest/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/60">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed/60 flex items-center justify-center shrink-0 text-tertiary">
                <span className="material-symbols-outlined text-[20px]">air</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-button text-label-button text-on-surface leading-tight">Sensory Serenity</span>
                <span className="font-label-caption text-label-caption text-on-surface-variant">Aromatherapy &amp; Bose audio</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Architectural Atmosphere Split */}
        <section className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin py-space-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-surface-container-lowest rounded-lg p-space-md lg:p-space-lg shadow-sm border border-white/60">
            <div className="lg:col-span-7 relative h-72 lg:h-[380px] rounded-DEFAULT overflow-hidden group">
              <Image
                src={SUITE_IMG}
                alt="Sunlit minimalist dental clinic consultation suite with light oak accents, soft beige linen chairs, a discreet digital scanner on a brass trolley"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-between border border-white/70">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">chair</span>
                  <div>
                    <p className="font-label-button text-label-button text-primary">The Consultation Living Room</p>
                    <p className="font-label-caption text-label-caption text-on-surface-variant">
                      No scary tools on display — just peaceful, conversational consultation.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block font-label-eyebrow text-[11px] uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-secondary-fixed/50">
                  Suite 01
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-space-sm lg:pl-space-md">
              <div className="inline-flex items-center gap-2 text-tertiary">
                <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
                <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider font-semibold">
                  A Conscious De-Escalation
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary leading-tight font-normal">
                Designed for those who postponed their visit for years.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Dental phobia is real, valid, and profoundly respected here. Over 68% of our first-time visitors haven’t visited a dentist in over three years due to childhood memories or rushed, insensitive experiences.
              </p>
              <div className="p-space-sm rounded-DEFAULT bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-label-button text-label-button">
                  <span className="material-symbols-outlined text-[18px]">pan_tool</span>
                  <span>The "Stop-Anytime" Golden Rule</span>
                </div>
                <p className="font-label-caption text-label-caption text-on-surface-variant leading-relaxed">
                  Simply raise your left palm at any micro-second. The clinician immediately steps back, rests tools, and pauses until you signal full readiness. You remain in 100% command.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Patient Journey Section */}
        <section className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin py-space-xl">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-[0.18em] text-secondary font-semibold">
              The Gentle Pathway
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary mt-space-xs font-normal">
              Your 5-Step Unhurried Journey
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              From your first message to lifelong post-care reassurance, explore exactly what happens — minute by minute, with zero surprises.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Central / Left Spine */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-fixed-dim via-secondary to-primary-container/20 hidden sm:block" />

            {/* Step 01 */}
            <div className="relative flex flex-col md:flex-row items-center gap-space-lg mb-space-xl">
              <div className="md:w-1/2 flex justify-start md:justify-end order-1">
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group border border-white/60">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">Step 01</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caption text-[11px]">Before You Arrive</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-medium">Warm First Contact</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm leading-relaxed">
                    Reach out via discreet WhatsApp chat, telephone, or online booking. We listen attentively to your past reservations, note any dental anxiety flags, and reserve an unhurried 45-minute suite so no one ever waits behind you.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-label-caption text-label-caption bg-surface-container-low p-2.5 rounded-DEFAULT">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>Zero wait-times: Your appointed suite is sanitized and ready the moment you cross our threshold.</span>
                  </div>
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-md z-10 hidden sm:flex">
                01
              </div>
              <div className="md:w-1/2 order-2 pl-space-md hidden md:block" />
            </div>

            {/* Step 02 */}
            <div className="relative flex flex-col md:flex-row items-center gap-space-lg mb-space-xl">
              <div className="md:w-1/2 order-2 md:order-1 pr-space-md hidden md:block" />
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-md z-10 hidden sm:flex">
                02
              </div>
              <div className="md:w-1/2 flex justify-start order-1 md:order-2">
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group border border-white/60">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">Step 02</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caption text-[11px]">In Sanctuary</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-medium">Arrival &amp; Gentle Check-in</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm leading-relaxed">
                    Sayali greets you warmly. Step directly into your private consultation living room without sitting in a crowded waiting area. Enjoy herbal tea, soothing diffuser scents, and dim ambient lighting.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative flex flex-col md:flex-row items-center gap-space-lg mb-space-xl">
              <div className="md:w-1/2 flex justify-start md:justify-end order-1">
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group border border-white/60">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">Step 03</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caption text-[11px]">Diagnostics</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-medium">Unhurried 3D Examination</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm leading-relaxed">
                    Dr. Gangal or Dr. Padma examines gently. We capture high-definition 3D digital images without uncomfortable impression paste, viewing your teeth on a chairside screen together.
                  </p>
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-md z-10 hidden sm:flex">
                03
              </div>
              <div className="md:w-1/2 order-2 pl-space-md hidden md:block" />
            </div>

            {/* Step 04 */}
            <div className="relative flex flex-col md:flex-row items-center gap-space-lg mb-space-xl">
              <div className="md:w-1/2 order-2 md:order-1 pr-space-md hidden md:block" />
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center shadow-md z-10 hidden sm:flex">
                04
              </div>
              <div className="md:w-1/2 flex justify-start order-1 md:order-2">
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group border border-white/60">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">Step 04</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caption text-[11px]">Clear Roadmap</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-medium">Transparent Estimate &amp; Plan</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm leading-relaxed">
                    You receive an itemized, transparent care blueprint. Every cost and milestone is explained upfront with zero surprises or hidden charges.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 05 */}
            <div className="relative flex flex-col md:flex-row items-center gap-space-lg mb-space-xl">
              <div className="md:w-1/2 flex justify-start md:justify-end order-1">
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md group border border-white/60">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary font-bold">Step 05</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-caption text-[11px]">Post-Care</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-medium">Departure &amp; Follow-Up Check</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm leading-relaxed">
                    We check in with you within 24 hours of your visit. Our 24-hour telephone service ensures you have direct access to clinical guidance at all times.
                  </p>
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary text-on-secondary font-headline-sm text-headline-sm flex items-center justify-center shadow-md z-10 hidden sm:flex">
                05
              </div>
              <div className="md:w-1/2 order-2 pl-space-md hidden md:block" />
            </div>
          </div>
        </section>

        {/* First-Visit FAQs Accordion Section */}
        <section className="max-w-[1000px] mx-auto px-margin-mobile lg:px-margin pb-space-xl">
          <div className="text-center max-w-2xl mx-auto mb-space-lg">
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-[0.18em] text-secondary font-semibold">
              Frequently Asked Questions
            </span>
            <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary mt-space-xs font-normal">
              Answers for First-Time Visitors
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-surface-container-lowest rounded-2xl shadow-sm border border-white/60 overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 lg:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span className="font-headline-sm text-[18px] lg:text-[20px] text-primary font-medium">
                      {faq.q}
                    </span>
                    <span className={`material-symbols-outlined text-primary text-[24px] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 lg:px-6 lg:pb-6 text-on-surface-variant font-body-md text-body-md leading-relaxed border-t border-surface-container-low pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-space-xl p-8 rounded-[28px] bg-surface-container text-center flex flex-col items-center gap-4 border border-white/60">
            <h3 className="font-headline-md text-headline-md text-primary font-normal">
              Still have questions or anxious feelings?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Speak directly with Sayali or Dr. Anand Gangal. We are here to answer without rush, judgment, or expectation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link
                href="/book"
                className="interactive-button min-h-[48px] px-8 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-md hover:bg-primary-container transition-all"
              >
                Book Free Consultation
              </Link>
              <a
                href="tel:02225891949"
                className="interactive-button min-h-[48px] px-6 rounded-full bg-surface-container-lowest text-primary font-label-button text-label-button shadow-sm hover:bg-surface-container-low transition-all border border-surface-container"
              >
                Call 022 25891949
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
