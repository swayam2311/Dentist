import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { TeamAvatar } from '@/components/ui/TeamAvatar';
import { ShieldCheck, HeartHandshake, Calendar, Phone, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Dental Team',
  description:
    'Meet Dr. Anand Gangal, Dr. Padma Kurup, and the compassionate clinical care team at Gangal Dental Clinic in Manpada, Thane.',
};

// Verified team members according to clinic records
// TODO(client-verify): Replace initials placeholders with authentic clinic team photographs once provided
const CLINICIANS = [
  {
    name: 'Dr. Anand Gangal',
    role: 'Principal Dentist',
    initials: 'AG',
    bio: 'Leads Gangal Dental Clinic in Manpada, Thane. Dedicated to gentle, comprehensive family care, dental implants, and aesthetic smile rehabilitation with an emphasis on patient comfort and honest treatment recommendations.',
  },
  {
    name: 'Dr. Padma Kurup',
    role: 'Associate Dentist',
    initials: 'PK',
    bio: 'Provides compassionate general, cosmetic, and pediatric dental care. Focuses on patient-paced treatment, empathetic listening, and gentle clinical techniques for both adults and children.',
  },
];

const CLINICAL_TEAM = [
  {
    name: 'Sayali Jadhav',
    role: 'Receptionist & Patient Coordinator',
    initials: 'SJ',
    bio: 'Coordinates appointments and warmly welcomes patients upon arrival at our Manpada clinic.',
  },
  {
    name: 'Sanika Pujari',
    role: 'Clinical Assistant',
    initials: 'SP',
    bio: 'Supports our dentists chairside with patient comfort and sterile operatory preparation.',
  },
  {
    name: 'Vaishali Kavankar',
    role: 'Clinical Assistant',
    initials: 'VK',
    bio: 'Assists during procedures, ensuring patient comfort and a reassuring environment.',
  },
  {
    name: 'Santosh Yeram',
    role: 'Clinical Assistant',
    initials: 'SY',
    bio: 'Dedicated to operatory readiness, sterile instrument management, and patient care.',
  },
  {
    name: 'Runali Tambe',
    role: 'Clinical Assistant',
    initials: 'RT',
    bio: 'Assists during restorative and dental treatments with gentle chairside support.',
  },
  {
    name: 'Preeti Yeram',
    role: 'Clinical Assistant',
    initials: 'PY',
    bio: 'Provides attentive chairside care and assists with clinic hygiene protocols.',
  },
];

export default function OurTeamPage() {
  return (
    <main id="main-content" className="w-full relative py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin">
        {/* Editorial Eyebrow & Title */}
        <section className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-3">
            <HeartHandshake className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>Gentle &amp; Dedicated Hands</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[48px] text-primary tracking-tight font-normal leading-tight mb-4">
            Meet the clinical care team
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Our practice is built on a simple philosophy: dentistry is an act of human empathy. Here, time slows down, questions are welcomed, and your comfort is paramount.
          </p>
        </section>

        {/* Dentists Section */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-1">
              Dentists
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-primary font-normal leading-tight">
              Our Dental Practitioners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLINICIANS.map((doc) => (
              <article
                key={doc.name}
                className="bg-surface-container-lowest rounded-card p-8 sm:p-10 border border-theme-border/60 shadow-ambient flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-5 mb-6">
                    <TeamAvatar name={doc.name} role={doc.role} initials={doc.initials} size="xl" />
                    <div>
                      <h3 className="font-serif text-[24px] sm:text-[28px] text-primary font-medium leading-tight">
                        {doc.name}
                      </h3>
                      <p className="font-label-button text-[14px] text-secondary font-semibold mt-1">
                        {doc.role}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary text-[12px] font-sans font-medium mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                        <span>Gangal Dental Clinic, Manpada</span>
                      </span>
                    </div>
                  </div>

                  <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed mb-6">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-theme-border/40 flex items-center justify-between">
                  <Link
                    href={`/book?service=${encodeURIComponent(doc.role)}`}
                    className="inline-flex items-center gap-2 font-label-button text-[14px] text-primary hover:underline font-semibold"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Book consultation</span>
                  </Link>
                  <span className="text-[12px] font-sans text-secondary">
                    Unhurried sessions
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Clinical Support Team Section */}
        <section className="mb-16">
          <div className="mb-8">
            <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-1">
              Clinic Staff
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-primary font-normal leading-tight">
              Reception &amp; Clinical Assistants
            </h2>
            <p className="font-sans text-[14px] text-on-surface-variant mt-1">
              The compassionate team members who greet you, coordinate appointments, and support patient comfort chairside.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINICAL_TEAM.map((member) => (
              <article
                key={member.name}
                className="bg-surface-container-lowest rounded-card p-6 border border-theme-border/60 shadow-ambient flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <TeamAvatar name={member.name} role={member.role} initials={member.initials} size="md" />
                    <div>
                      <h3 className="font-headline-sm text-[18px] text-primary font-medium leading-snug">
                        {member.name}
                      </h3>
                      <p className="font-label-caption text-[12px] text-secondary font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Reassurance Callout */}
        <section className="bg-surface-container rounded-card p-8 sm:p-10 border border-theme-border/40 text-center max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-serif text-[24px] sm:text-[28px] text-primary font-normal mb-2">
            Schedule an Unhurried Visit
          </h2>
          <p className="font-sans text-[14px] text-on-surface-variant mb-6 leading-relaxed">
            Our team is ready to listen, explain, and support your dental health without rushed appointments or pressure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book an Appointment</span>
            </Link>
            <a
              href={siteConfig.contact.landlineTel}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-surface-container-lowest border border-theme-border text-on-surface font-label-button text-label-button hover:bg-surface-container transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call 022 2589 1949</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
