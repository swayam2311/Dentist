import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Patient Privacy Policy (DPDP Act 2023)',
  description:
    'Patient Privacy Policy for Gangal Dental Clinic under India Digital Personal Data Protection Act 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16 font-sans text-theme-ink">
      <h1 className="font-serif text-[34px] sm:text-[44px] text-primary font-normal mb-4">
        Patient Privacy Policy
      </h1>
      <p className="text-[14px] text-theme-secondary mb-8">
        Last Updated: November 2026 · Compliant with the Digital Personal Data Protection (DPDP) Act 2023 of India
      </p>

      <div className="prose prose-teal max-w-none flex flex-col gap-6 text-[15px] leading-relaxed text-theme-muted">
        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">1. Introduction</h2>
          <p>
            Gangal Dental Clinic (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the dental practice located at Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane West 400610. We are committed to safeguarding the privacy and personal data of our patients and website visitors.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">2. What Data We Collect</h2>
          <p>We collect only the minimum personal data strictly necessary to schedule, coordinate, and deliver dental healthcare:</p>
          <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
            <li><strong>Identity &amp; Contact:</strong> Full name, Indian mobile number, and optional email address.</li>
            <li><strong>Appointment Preferences:</strong> Selected clinical service, preferred doctor, appointment date and time, and preferred confirmation channel (phone, WhatsApp, or email).</li>
            <li><strong>Health &amp; Inquiry Notes:</strong> Any voluntary clinical concerns, allergies, or questions provided by you in consultation booking or contact forms.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">3. Purpose of Data Processing</h2>
          <p>Your data is processed exclusively for lawful healthcare purposes:</p>
          <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
            <li>Scheduling and confirming your dental consultation with our clinical team.</li>
            <li>Direct telephonic or WhatsApp communication regarding your appointment status.</li>
            <li>Maintaining medical records required by the Dental Council of India (DCI) and state healthcare regulations.</li>
          </ul>
          <p className="mt-2">We never sell, rent, or trade your personal data to advertisers, insurance brokers, or external commercial third parties.</p>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">4. Your Rights under the DPDP Act 2023</h2>
          <p>As a Data Principal, you have specific rights under Indian law:</p>
          <ul className="list-disc pl-5 mt-2 flex flex-col gap-1.5">
            <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</li>
            <li><strong>Right to Correction:</strong> You may request the update or rectification of outdated or inaccurate contact details.</li>
            <li><strong>Right to Erasure:</strong> You may request the deletion of non-clinical inquiry data, subject to statutory medical record retention obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">5. Data Protection Officer &amp; Inquiries</h2>
          <p>
            If you have questions regarding your data privacy or wish to exercise your rights, please contact our clinic administration:
          </p>
          <div className="p-4 rounded-2xl bg-theme-container-low/70 border border-theme-border/50 text-[14px] mt-2">
            <p><strong>Gangal Dental Clinic</strong></p>
            <p>Shop No. 26, 28, 29, Happy Valley Shopping Complex, Manpada, Thane 400610</p>
            <p>Email: <a href="mailto:dranandgangal@gmail.com" className="text-primary underline">dranandgangal@gmail.com</a></p>
            <p>Telephone: 022 25891949 / +91 99870 76628</p>
          </div>
        </section>
      </div>
    </div>
  );
}

