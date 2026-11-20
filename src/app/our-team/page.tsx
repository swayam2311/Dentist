'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DOCTOR_ANAND_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRuydQoxUBjVMwun7L70VV4JHXydMcTG-QZu3oU2b_6UW5NB-r_z8hOCs0dxOuxzE0p5UF4_lO_2sbS7dk7-C6HzUIfpCUF2aQOFgACntcvZUaeOvOJlmnG71XWQKwEC6r75m6TdocYdK-Y8CqXqiAuAghHbuLQgqmMdPAwFfdpcZxwjvVEDqF-j80s52UUtMleMbMIzqzz_7vX5PbH-ngrNrD6aDE1FybvX8AYJO';

const DOCTOR_PADMA_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCi0SqTLk0NyJOA0x5BBWvM6tfePbHkduKzl7viWDZw-k_Paz4PGeG7OTVxdIIEZgFZKqhJnDMhaC2IrfGh-NyrTDAdx4pQ1giOAlZox06XSl_Rm9LNIYOr9M77HoficvhFFFFjWRqgg_ZbVvgARkNUs-Bz54fy_WhR6JI9uWe3DXxHBAhc-8h9aViCBf53IZeGYOTXT9xH_QfvSJbtaxwwSCZQCk33wavpOaZ0k-uG';

const SUPPORT_STAFF = [
  {
    name: 'Sayali Jadhav',
    role: 'Front Desk Receptionist & Patient Coordinator',
    tag: 'Senior Staff At Gangal Clinic',
    desc: 'Your first friendly greeting and reassuring guide. Sayali handles scheduling, seamless insurance navigation, and pre-appointment anxiety check-ins.',
    icon: 'support_agent',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7nBDpm6Eav0fchIVZS1lmuRhAnxnShJUeH_ePVKaEUb-9UTAkD9mBLswpRWIGp0XgqC3veulBJq5u1cOa8ItKrTf7x0ORsb6Gsn_Jhi2GHCnGG05TRJUqfAfJ1V1WliNQ9rwJj2PC8mRChW611e4n2yAgbJ-1fDQQcLUvb8ej_OtMt9lx1AruspVqpuCpQvm8Zyj8coVNcH8viT4wJmUttJ0VsV2ix86FZgWiPkq6',
    alt: 'Warm and welcoming young Indian female receptionist with hair neatly tied in a low chignon, smiling kindly across a clean, minimalist wood and terrazzo clinic reception desk',
  },
  {
    name: 'Sanika Pujari',
    role: 'Senior Dental Assistant',
    tag: 'Implants & Prosthetic Support Lead',
    desc: 'Provides chairside gentle comfort, calming touch cue signals, and ensures surgical operatory sterilization to hospital grade benchmarks.',
    icon: 'medical_services',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANehY7uV3LH_JAxF7uZjuDHGjkbq7sD489vCZI-C_E6pJ53xeUOiPRKUq7pRqFu3obEdBG8WFDGZlMrjfEr0PNFvSvwhfMHhBGkGm5eBUWs9rNfzWJ-A9pOfMb1VF4xioexF-2Q5nnsyj_25-wN1_spj476lI_6dXWKgs7YA5ddCMteQdM184nMaxtt_1HNGrvtdFEH4IR_RO8aWKH_uMDi4MDWd6XSLjUSOx9xtef',
    alt: 'Professional Indian female dental assistant in tailored mint green clinical scrubs standing in an impeccably organized dental operatory',
  },
  {
    name: 'Vaishali Kavankar',
    role: 'Dental Assistant & Comfort Lead',
    tag: 'Patient Sensory Protocol Specialist',
    desc: 'Dedicated to tactile patient comfort: offering noise-canceling headphones, warm blankets, and monitoring patient breathing pauses.',
    icon: 'favorite',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ3KSR9jszhZfqBbbQQ5tFSjZ8CTgOBRsQB1jNo65nMXsuvxfta_0dNXblGfvCyIQVUtThRbm8WgM7hO9CSv-OIE7XChjveGyOeDqQUP4Z08Hb6wd7m5e9medi7BE-eLzOV0uz1vnWfw8QEXgZZcpoQWElKeGugRIzWzWIizfdrS_WQLMD9a3Kd3gKui5ZcX6G2230756gzQmEQZe6LyLDG2ThUzQpqV3kPdynKl_M',
    alt: 'Kind Indian female dental nurse in soft green uniform holding a warm fleece comfort blanket in a tranquil restorative dental suite',
  },
  {
    name: 'Santosh Yeram',
    role: 'Clinical Support & Operatory Specialist',
    tag: 'Biomedical Hygiene Certified',
    desc: 'Governs high-precision equipment calibration, laser instrument alignment, and strict environmental operatory air and water filtration.',
    icon: 'handyman',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJwsIr9cICbrRyjeBTgy71PDTiFZZkmsK0FBcd7JFMeH7VxBuf9Q8AnfSuSUp0hNBnh2UFOOF_UA5IUChYedJEAkS3vsIpwqy-vRRQ8acafqkuY6GiII23KWP1kg7FGvlbx4G76WZA2JZUDJ4LQ6oJOlMKikpytmql8UOylJGRhF_j-o2ae0lDFWu7u3n8iIvaCeI4LdPIWXb7XGGGqGcpwfFy0CE_dZqibuU505x8',
    alt: 'Indian male clinical equipment specialist in hygienic dental scrubs and hair cap carefully inspecting precision micro-instruments under bright magnifying glass',
  },
  {
    name: 'Runali Tambe',
    role: 'Dental Assistant (Pediatric Care)',
    tag: 'Gentle Pediatric Certified',
    desc: "Assists Dr. Padma during children's dental sessions. Specializes in gentle, whisper-quiet suction technique and reassuring younger visitors.",
    icon: 'sentiment_very_satisfied',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Q0H0iYRi7vtJFTcMu0COAHVIEEpdHFZ0E-UmR8exdyC1itANRdQlqi5I64T_2Klv-pR2wKUa3gnXsu7gmd1f8t8iFHxqura1mR0iWsezfmogbzQvFadOEA9AIbEASgZVYYxPukHGaQTDhKPIURo589niKUtv4MQ3gZmjzYZJxhsfrmoAQY2cnvsi-uZsYet3zpu08E_fK-gA7Ov48hKV5bY4RevSsoVPhSPQroxG',
    alt: 'Gentle young Indian woman dental assistant smiling warmly while holding a soft pediatric dental mascot puppet in a warm, welcoming children treatment bay',
  },
  {
    name: 'Preeti Yeram',
    role: 'Sterilization Specialist',
    tag: 'Autoclave & Infection Control Lead',
    desc: 'Directs the 7-stage hospital sterilization cycle, autoclave validation, and room air turnover protocols between every visitor.',
    icon: 'sanitizer',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCFNtXaeLN-ywLdHe0bFkp2r3i8OE0xsLP0uKVNvy9prwgY4x3TuzkLyhv_amnwcfvej5bRfUDicYo7rwWTso9v1cJS9JIxamQ9POoYelmS7A24F-yMMuQ9Y2Z7ZBR4Rf2RNroKKExIyvcQ3mB0qigmTR6FM8TtaFAGdTSsW1-4BUyed3wvqV5f_Xu2StPwUkRePRah6eNypU3inFxGdEtR6_OG2vwcxDCuBdPQC4w',
    alt: 'Meticulous Indian woman sterilization expert wearing surgical gown and gloves sealing sterilization autoclave pouches in a gleaming state-of-the-art dental decontamination room',
  },
];

export default function OurTeamPage() {
  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Subtle ambient decorative glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-primary-fixed/30 via-secondary-container/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

        {/* Editorial Intro & Page Heading */}
        <section className="relative max-w-[1200px] mx-auto px-margin-mobile lg:px-margin pt-space-xl pb-space-lg">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/60 mb-space-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-[0.18em]">
                Gentle, Experienced Hands
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight mb-space-sm font-normal">
              Meet the team
            </h1>
            <p className="font-body-xl text-body-lg lg:text-body-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Our clinic was built upon a simple, unwavering belief: restorative dentistry is an act of gentle human empathy. Here, time slows down, questions are welcomed, and your absolute calm comes before any procedure.
            </p>

            {/* Quick Assurance Badges */}
            <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-lg text-on-surface-variant font-label-caption text-label-caption">
              <div className="flex items-center gap-2 px-space-md py-2 rounded-full bg-surface-container-lowest shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">spa</span>
                <span>Zero-Rush Consultations</span>
              </div>
              <div className="flex items-center gap-2 px-space-md py-2 rounded-full bg-surface-container-lowest shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                <span>Decades of Dedicated Clinical Care</span>
              </div>
              <div className="flex items-center gap-2 px-space-md py-2 rounded-full bg-surface-container-lowest shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">sentiment_satisfied</span>
                <span>Anxiety-Attuned Protocols</span>
              </div>
            </div>
          </div>
        </section>

        {/* Principal Clinicians: Asymmetrical 2-Column Showcase */}
        <section className="relative max-w-[1200px] mx-auto px-margin-mobile lg:px-margin py-space-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-stretch">
            {/* Doctor 1: Dr. Anand Gangal */}
            <article className="bg-surface-container-lowest rounded-[28px] p-space-md lg:p-space-lg flex flex-col justify-between shadow-[0_12px_32px_-4px_rgba(15,46,51,0.06),0_4px_12px_-2px_rgba(15,46,51,0.02)] transition-all duration-300 hover:-translate-y-1 border border-white/60">
              <div>
                {/* Image & Experience Float */}
                <div className="relative w-full h-[360px] lg:h-[400px] rounded-2xl overflow-hidden mb-space-lg bg-surface-container">
                  <Image
                    src={DOCTOR_ANAND_IMG}
                    alt="Distinguished Indian male principal dentist Dr. Anand Gangal wearing a modern sage green linen clinical tunic"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-white/70">
                    <span className="material-symbols-outlined text-tertiary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      award_star
                    </span>
                    <span className="font-label-caption text-label-caption text-primary font-semibold">
                      22+ Years Clinical Mastery
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-on-primary px-3.5 py-1.5 rounded-full font-label-eyebrow text-label-eyebrow uppercase tracking-wider shadow-md">
                    Principal Dentist
                  </div>
                </div>

                {/* Doctor Bio Info */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-normal">
                      Dr. Anand Gangal
                    </h2>
                    <span className="font-label-caption text-label-caption text-secondary font-medium">
                      MDS — Prosthodontics &amp; Implantology
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 py-1">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] font-medium">
                      Indian Prosthodontic Society (IPS)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] font-medium">
                      Fellow, ICOI
                    </span>
                  </div>
                  <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed mt-2 font-normal">
                    Known for his calm presence and meticulous craft, Dr. Anand specializes in pain-free, restorative reconstructions. He views prosthetics not merely as dental engineering, but as an art that restores an individual’s confidence to speak, laugh, and dine unencumbered.
                  </p>

                  {/* Personal Philosophy Pull-quote */}
                  <div className="mt-space-md p-space-md rounded-2xl bg-surface-container-low flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[26px] shrink-0 mt-0.5">
                      format_quote
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary italic leading-snug font-normal">
                      “The most important instrument we have isn’t the microscope or scanner; it is the time we spend listening before treatment even begins.”
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Footer & Specialties */}
              <div className="mt-space-lg pt-space-md bg-surface-container-low/60 -mx-space-md -mb-space-md lg:-mx-space-lg lg:-mb-space-lg p-space-md lg:p-space-lg rounded-b-[28px]">
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-2">
                  Core Clinical Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">dentistry</span> Dental Implants &amp; Bone Regeneration
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">precision_manufacturing</span> Full Mouth Rehabilitation
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">diamond</span> Porcelain Ceramic Restorations
                  </span>
                </div>
              </div>
            </article>

            {/* Doctor 2: Dr. Padma Kurup */}
            <article className="bg-surface-container-lowest rounded-[28px] p-space-md lg:p-space-lg flex flex-col justify-between shadow-[0_12px_32px_-4px_rgba(15,46,51,0.06),0_4px_12px_-2px_rgba(15,46,51,0.02)] transition-all duration-300 hover:-translate-y-1 border border-white/60">
              <div>
                {/* Image & Experience Float */}
                <div className="relative w-full h-[360px] lg:h-[400px] rounded-2xl overflow-hidden mb-space-lg bg-surface-container">
                  <Image
                    src={DOCTOR_PADMA_IMG}
                    alt="Graceful Indian female dentist Dr. Padma Kurup wearing warm cream clinical attire with gold rimmed spectacles"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border border-white/70">
                    <span className="material-symbols-outlined text-tertiary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      award_star
                    </span>
                    <span className="font-label-caption text-label-caption text-primary font-semibold">
                      12+ Years Gentle Experience
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-on-primary px-3.5 py-1.5 rounded-full font-label-eyebrow text-label-eyebrow uppercase tracking-wider shadow-md">
                    Associate Partner
                  </div>
                </div>

                {/* Doctor Bio Info */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-normal">
                      Dr. Padma Kurup
                    </h2>
                    <span className="font-label-caption text-label-caption text-secondary font-medium">
                      BDS, MDS — Pediatric &amp; Cosmetic Dentistry
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 py-1">
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] font-medium">
                      Pediatric Dental Care
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] font-medium">
                      Pediatric Sedation Protocols
                    </span>
                  </div>
                  <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed mt-2 font-normal">
                    Dr. Padma has dedicated her career to dismantling dental anxiety for both children and sensitive adults. Her gentle, whisper-quiet chairside manner transforms intimidating checkups into comforting, sensory-friendly experiences that cultivate lifelong trust.
                  </p>

                  {/* Personal Philosophy Pull-quote */}
                  <div className="mt-space-md p-space-md rounded-2xl bg-surface-container-low flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[26px] shrink-0 mt-0.5">
                      format_quote
                    </span>
                    <p className="font-headline-sm text-headline-sm text-primary italic leading-snug font-normal">
                      “When a fearful child or an anxious adult finishes their visit smiling and relaxed, that is our highest clinical milestone.”
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Footer & Specialties */}
              <div className="mt-space-lg pt-space-md bg-surface-container-low/60 -mx-space-md -mb-space-md lg:-mx-space-lg lg:-mb-space-lg p-space-md lg:p-space-lg rounded-b-[28px]">
                <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block mb-2">
                  Core Clinical Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">child_care</span> Pediatric Dentistry &amp; Habit Correction
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">shield</span> Preventive Fluoride &amp; Sealants
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-caption text-label-caption shadow-sm">
                    <span className="material-symbols-outlined text-primary text-[15px]">auto_fix_high</span> Gentle Aesthetic Smile Alignments
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Mid-Section Philosophy Strip with Metrics */}
        <section className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin my-space-xl">
          <div className="bg-surface-container rounded-[28px] p-space-lg lg:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.04)] border border-white/60">
            <div className="flex flex-col gap-space-xs max-w-xl">
              <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest">
                Our Unspoken Promise
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-medium">
                We do not rush. We do not judge.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Whether you have avoided the dentist for two years or twenty, you will be met with zero shame, thoughtful explanations, and gentle step-by-step guidance tailored around your breathing and comfort pacing.
              </p>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <div className="flex flex-col items-center p-4 bg-surface-container-lowest rounded-2xl shadow-sm text-center min-w-[120px] border border-white/60">
                <span className="font-headline-md text-headline-md text-primary font-bold">100%</span>
                <span className="font-label-caption text-label-caption text-secondary mt-1">Pre-Procedure Clarity</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-surface-container-lowest rounded-2xl shadow-sm text-center min-w-[120px] border border-white/60">
                <span className="font-headline-md text-headline-md text-primary font-bold">0</span>
                <span className="font-label-caption text-label-caption text-secondary mt-1">Hurried Consultations</span>
              </div>
              <div className="hidden sm:flex flex-col items-center p-4 bg-surface-container-lowest rounded-2xl shadow-sm text-center min-w-[120px] border border-white/60">
                <span className="font-headline-md text-headline-md text-primary font-bold">24/7</span>
                <span className="font-label-caption text-label-caption text-secondary mt-1">Post-Op Support Care</span>
              </div>
            </div>
          </div>
        </section>

        {/* Support Team Section: 6 Team Members */}
        <section className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin pb-space-xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-xs">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-[0.14em] block mb-1">
                Caring from the first hello
              </span>
              <h2 className="font-headline-lg text-headline-md lg:text-headline-lg text-primary font-normal">
                Our Front Desk &amp; Clinical Support Care Team
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              True healing starts the exact moment you cross our threshold. Our dedicated coordinators and clinical assistants ensure your peace, hygiene, and well-being every single step of the way.
            </p>
          </div>

          {/* Support Grid: 6 Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {SUPPORT_STAFF.map((member) => (
              <div
                key={member.name}
                className="bg-surface-container-lowest rounded-[28px] p-space-md flex flex-col gap-space-sm shadow-[0_12px_32px_-4px_rgba(15,46,51,0.04)] hover:shadow-md transition-shadow border border-white/60"
              >
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-surface-container">
                  <Image
                    src={member.img}
                    alt={member.alt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-primary font-medium">
                      {member.name}
                    </h3>
                    <span className="p-1 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">{member.icon}</span>
                    </span>
                  </div>
                  <span className="font-label-caption text-label-caption text-secondary font-semibold mt-0.5">
                    {member.role}
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="inline-block px-3 py-1 bg-surface-container text-on-surface-variant text-[12px] rounded-full font-medium">
                    {member.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-space-xl flex justify-center">
            <Link
              href="/book"
              className="interactive-button inline-flex items-center justify-center min-h-[52px] px-8 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-md hover:bg-primary-container hover:shadow-lg transition-all"
            >
              Book an Appointment with Our Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
