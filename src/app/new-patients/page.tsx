import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Accordion } from '@/components/ui/Accordion';
import { Calendar, Shield, Clock, CheckCircle2, HeartHandshake, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Patients Guide',
  description:
    'What to expect during your first visit to Gangal Dental Clinic in Manpada, Thane. Unhurried 5-step patient journey and first consultation FAQs.',
};

const newPatientFaqs = [
  {
    id: 'np-1',
    question: 'Is my first consultation genuinely free of charge?',
    answer:
      'Yes. Your first consultation and oral health clinical examination are 100% free of charge. You receive a complete examination report and an itemized treatment estimate with zero obligation.',
  },
  {
    id: 'np-2',
    question: 'I feel deep dental anxiety. How does your clinic help me?',
    answer:
      'We practice unhurried dentistry. We explain every step before we begin, never rush, and honor our Stop-Anytime rule: raise your hand at any moment, and our dentist immediately pauses tools until you are ready.',
  },
  {
    id: 'np-3',
    question: 'How do I reach the clinic in Manpada?',
    answer:
      'We are located in Shop No. 26, 28, 29 in Happy Valley Shopping Complex on Tikujiniwadi Road in Manpada, Thane West (400610). Ground floor arcade access.',
  },
  {
    id: 'np-4',
    question: 'What happens during my first visit?',
    answer:
      'Your visit begins with a conversation about your dental history and any concerns. The dentist performs a gentle clinical exam, discusses findings, and provides a clear written estimate before any treatment is scheduled.',
  },
  {
    id: 'np-5',
    question: 'Can I get treatment on the same day?',
    answer:
      'If you wish to proceed and clinical chair time permits, we can begin routine or urgent procedures on the same day. Payment for treatments is completed on the day of treatment.',
  },
];

export default function NewPatientsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/60 mb-3 text-xs font-sans text-theme-secondary font-semibold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-primary" />
          <span>Gentle &amp; Transparent</span>
        </div>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          New Patients — Unhurried Care <br />
          <span className="italic font-normal">From Day One</span>
        </h1>
        <p className="font-sans text-[17px] text-theme-muted leading-relaxed">
          If visiting the dentist fills you with tension, you are in gentle hands. We designed Gangal Dental Clinic as a tranquil environment where time slows down, questions are welcomed, and you remain in complete control.
        </p>
      </div>

      {/* The Stop-Anytime Rule Banner */}
      <div className="p-8 rounded-[32px] bg-theme-card border border-theme-border/80 shadow-ambient mb-16 flex flex-col md:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-theme-secondary-container text-primary flex items-center justify-center shrink-0">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-serif text-[22px] text-primary font-normal mb-1">
            The "Stop-Anytime" Golden Rule
          </h2>
          <p className="font-sans text-[15px] text-theme-muted leading-relaxed">
            Simply raise your hand at any point during an examination or procedure. Our dentist immediately pauses, rests instruments, and checks in with you. Care proceeds solely at your pace.
          </p>
        </div>
        <Link
          href="/book"
          className="shrink-0 min-h-[48px] px-7 rounded-full bg-primary text-white font-sans text-[14px] font-medium flex items-center gap-2 shadow-button hover:bg-theme-primary-container interactive-button"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Free Visit</span>
        </Link>
      </div>

      {/* 5-Step Patient Journey */}
      <section className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif text-[30px] sm:text-[36px] text-primary font-normal">
            Your 5-Step Patient Journey
          </h2>
          <p className="font-sans text-[15px] text-theme-muted mt-2">
            Clear expectations with zero surprises from your first hello to long-term oral wellness.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {siteConfig.patientJourney.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-[24px] bg-theme-card border border-theme-border/60 shadow-sm flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white font-sans text-[14px] font-bold flex items-center justify-center shrink-0">
                0{step.step}
              </div>
              <div>
                <h3 className="font-serif text-[20px] text-primary font-normal mb-1">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] text-theme-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* First-Visit FAQs */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[28px] sm:text-[34px] text-primary font-normal">
            First Visit Questions &amp; Answers
          </h2>
        </div>
        <Accordion items={newPatientFaqs} />
      </section>
    </div>
  );
}

