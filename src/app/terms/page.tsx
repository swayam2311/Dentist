import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Terms of Care & Services',
  description: 'Terms of Care and consultation policies for Gangal Dental Clinic.',
};

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16 font-sans text-theme-ink">
      <h1 className="font-serif text-[34px] sm:text-[44px] text-primary font-normal mb-4">
        Terms of Care &amp; Service
      </h1>
      <p className="text-[14px] text-theme-secondary mb-8">
        Gangal Dental Clinic · Manpada, Thane West
      </p>

      <div className="prose prose-teal max-w-none flex flex-col gap-6 text-[15px] leading-relaxed text-theme-muted">
        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">1. Consultation &amp; Scheduling</h2>
          <p>
            Appointments scheduled online represent a reservation request. Our reception team contacts you during clinic hours to confirm medical history and finalize time slots. We maintain unhurried appointments and request that patients arrive 5 to 10 minutes prior to scheduled slots.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">2. Free First Consultation Policy</h2>
          <p>
            The initial oral health clinical examination and treatment roadmap consultation is completely free of charge. Any elective or therapeutic procedures (such as scaling, fillings, root canals, or restorations) are discussed in advance with transparent, written estimates before treatment begins. Payment for treatments is completed on the day of treatment.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">3. Cancellations &amp; Rescheduling</h2>
          <p>
            If you need to reschedule or cancel your reservation, we kindly ask for at least 4 hours notice whenever possible so our staff may allocate the operatory suite to urgent cases. You may cancel via the online status portal or by calling reception at 022 25891949.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-[22px] text-primary font-normal mb-2">4. Medical Disclaimer</h2>
          <p>
            Information provided on this website is intended for educational purposes and general patient orientation. It does not replace professional dental diagnosis or personalized medical advice provided by a licensed dental practitioner during an in-person clinical exam.
          </p>
        </section>
      </div>
    </div>
  );
}

