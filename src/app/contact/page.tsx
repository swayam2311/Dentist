import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { StaticBookingForm } from '@/components/forms/StaticBookingForm';
import { Phone, Clock, MapPin, MessageCircle, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Clinic Location',
  description:
    'Contact Gangal Dental Clinic in Manpada, Thane. Schedule an unhurried consultation, call reception, or get step-by-step directions to Happy Valley Shopping Complex.',
};

export default function ContactPage() {
  return (
    <main id="main-content" className="w-full relative py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-margin-mobile lg:px-margin">
        {/* Editorial Eyebrow & Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span>Gentle &amp; Accessible</span>
          </div>
          <h1 className="font-serif text-[36px] sm:text-[46px] text-primary tracking-tight font-normal leading-tight mb-4">
            Contact Gangal Dental Clinic
          </h1>
          <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed">
            Reach our reception desk in Manpada, Thane for appointments, inquiries, and dental emergency queries. We take time to listen to your needs.
          </p>
        </div>

        {/* 2-Column Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <h2 className="font-serif text-[22px] sm:text-[26px] text-primary font-normal">
                Send a Message or Consultation Request
              </h2>
              <p className="font-sans text-[14px] text-on-surface-variant mt-1">
                Fill in your details below and our team will get in touch promptly via your preferred contact mode.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="bg-surface-container-lowest rounded-card p-8 border border-theme-border/60 text-center font-sans text-on-surface-variant">
                  Loading form...
                </div>
              }
            >
              <StaticBookingForm sourcePage="contact" />
            </Suspense>
          </div>

          {/* Contact Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct Telephony Card */}
            <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient">
              <div className="flex items-center gap-2 text-primary font-label-button text-label-button mb-4">
                <Phone className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <span>Telephone &amp; WhatsApp Support</span>
              </div>
              <div className="flex flex-col gap-3 font-sans">
                <a
                  href={siteConfig.contact.landlineTel}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] text-secondary font-medium uppercase tracking-wider">
                      Reception Desk (Landline)
                    </span>
                    <span className="text-[16px] font-semibold text-primary">
                      {siteConfig.contact.landline}
                    </span>
                  </div>
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.contact.mobileTel}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] text-secondary font-medium uppercase tracking-wider">
                      Mobile Support (Dr. Anand Gangal)
                    </span>
                    <span className="text-[16px] font-semibold text-primary">
                      {siteConfig.contact.mobile}
                    </span>
                  </div>
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-secondary-container hover:bg-secondary-fixed transition-colors group text-on-secondary-container"
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] font-medium uppercase tracking-wider">
                      WhatsApp Message
                    </span>
                    <span className="text-[16px] font-semibold">
                      +91 99870 76628
                    </span>
                  </div>
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Consultation Hours */}
            <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient">
              <div className="flex items-center gap-2 text-primary font-label-button text-label-button mb-3">
                <Clock className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <span>Consultation Hours</span>
              </div>
              <ul className="flex flex-col gap-2.5 font-sans text-[14px] text-on-surface-variant m-0 p-0 list-none">
                <li className="flex justify-between items-center py-1.5 border-b border-theme-border/30">
                  <span className="font-medium text-on-surface">Monday – Friday</span>
                  <div className="text-right">
                    <span className="block font-medium text-primary">10:00 AM – 1:00 PM</span>
                    <span className="block text-[12px] text-on-surface-variant">6:00 PM – 10:00 PM</span>
                  </div>
                </li>
                <li className="flex justify-between items-center py-1.5 border-b border-theme-border/30">
                  <span className="font-medium text-on-surface">Saturday</span>
                  <span className="font-medium text-primary">10:00 AM – 5:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-1.5">
                  <span className="font-medium text-on-surface">Sunday</span>
                  <span className="text-secondary font-medium">Closed</span>
                </li>
              </ul>
              <div className="mt-3 p-3 rounded-xl bg-surface-container text-[13px] font-sans text-on-surface-variant">
                <strong>Emergency Inquiries:</strong> 24-hour telephone service available for queries and urgent dental emergencies.
              </div>
            </div>

            {/* Clinic Address Card */}
            <div className="bg-surface-container-lowest rounded-card p-6 sm:p-7 border border-theme-border/60 shadow-ambient">
              <div className="flex items-center gap-2 text-primary font-label-button text-label-button mb-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <span>Clinic Address</span>
              </div>
              <p className="font-sans text-[14px] text-on-surface leading-relaxed mb-4">
                {siteConfig.address.fullFormatted}
              </p>
              <a
                href={siteConfig.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label-button text-[14px] text-primary hover:text-primary-container font-semibold transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Directions & Embedded Map Section (Target of #clinic-location-map) */}
        <section
          id="clinic-location-map"
          className="scroll-mt-28 bg-surface-container-lowest rounded-card p-6 sm:p-10 border border-theme-border/60 shadow-ambient"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-eyebrow text-label-eyebrow uppercase tracking-wider mb-2">
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Visit Us</span>
              </div>
              <h2 className="font-serif text-[26px] sm:text-[32px] text-primary font-normal leading-tight">
                Clinic Location &amp; Directions
              </h2>
              <p className="font-sans text-[14px] text-on-surface-variant mt-1">
                Located inside Happy Valley Shopping Complex on Tikujiniwadi Road in Manpada, Thane West.
              </p>
            </div>
            <a
              href={siteConfig.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors shrink-0"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Lazy-loaded Google Maps iframe */}
          <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-theme-border/60 shadow-inner bg-surface-container">
            <iframe
              title="Gangal Dental Clinic Map Location"
              src={siteConfig.address.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
