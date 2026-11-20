'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [replyPreference, setReplyPreference] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!consent) {
      setError('Please provide consent under India DPDP Act 2023 to submit your inquiry.');
      return;
    }

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: formattedPhone,
          email: email || undefined,
          message,
          replyPreference,
          consent: true,
          honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit inquiry.');
        setSubmitting(false);
        return;
      }

      setSuccess('✨ Thank you. Dr. Gangal\'s coordinator will review your note and contact you shortly.');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setConsent(false);
      setSubmitting(false);
    } catch {
      setError('Network connection error. Please call the clinic directly at 022 2589 1949.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow */}
      <div className="relative w-full max-w-[1240px] mx-auto px-margin-mobile lg:px-margin pt-space-xl pb-space-lg">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/30 via-surface-container-high/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

        {/* Editorial Intro / Eyebrow Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-space-xs mb-space-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-fixed font-label-eyebrow text-label-eyebrow uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>We Are Here For You · Gentle &amp; Unhurried</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-space-xs">
            Get in touch with our gentle care team
          </h1>
          <p className="font-body-xl text-body-xl text-on-surface-variant leading-relaxed max-w-2xl mt-1">
            Whether you have a query about a sensitive tooth, need priority relief, or simply wish to speak quietly with Dr. Gangal before scheduling, we listen attentively.
          </p>
        </div>

        {/* Two-Column Architecture: Clinical Details & Unhurried Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* LEFT COLUMN: Clinic Information & Sanctuary Reassurance (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Address & Accessibility Card */}
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.05)] transition-all duration-300 hover:shadow-[0_16px_36px_-6px_rgba(15,46,51,0.08)] border border-white/60">
              <div className="flex items-start gap-space-sm">
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-wider mb-1">
                    Sanctuary Address
                  </span>
                  <p className="font-headline-sm text-headline-sm text-primary leading-snug">
                    Happy Valley Shopping Complex
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Shop No. 26, 28, 29, Tikujiniwadi Road, Manpada, Thane West 400610, Maharashtra
                  </p>
                  <div className="mt-space-sm pt-space-xs flex items-center gap-2 text-on-secondary-container bg-surface-container-low px-3 py-2 rounded-md font-label-caption text-label-caption">
                    <span className="material-symbols-outlined text-[18px] text-secondary">accessible_forward</span>
                    <span>Opp. D-Mart / Manpada Signal · Ground Floor Step-Free Access &amp; Valet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Direct Lines Card */}
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.05)] transition-all duration-300 hover:shadow-[0_16px_36px_-6px_rgba(15,46,51,0.08)] border border-white/60">
              <div className="flex items-start gap-space-sm">
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[22px]">call</span>
                </div>
                <div className="flex flex-col w-full min-w-0">
                  <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-wider mb-1">
                    Direct Telephony
                  </span>
                  <div className="flex flex-col gap-space-xs mt-1">
                    <a
                      className="group flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface hover:bg-surface-container-high transition-colors"
                      href={siteConfig.contact.landlineTel}
                    >
                      <div className="flex flex-col">
                        <span className="font-label-caption text-label-caption text-on-surface-variant">
                          Front Desk &amp; Operatory Desk
                        </span>
                        <span className="font-body-lg text-body-lg font-semibold text-primary">
                          {siteConfig.contact.landline}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[20px] opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all">
                        chevron_right
                      </span>
                    </a>
                    <a
                      className="group flex items-center justify-between p-2.5 rounded-DEFAULT bg-surface hover:bg-surface-container-high transition-colors"
                      href={siteConfig.contact.mobileTel}
                    >
                      <div className="flex flex-col">
                        <span className="font-label-caption text-label-caption text-secondary">
                          Dr. Anand Gangal (Clinical Direct)
                        </span>
                        <span className="font-body-lg text-body-lg font-semibold text-primary">
                          {siteConfig.contact.mobile}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[20px] opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all">
                        chevron_right
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Hours & Sterile Cycle */}
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_12px_32px_-4px_rgba(15,46,51,0.05)] border border-white/60">
              <div className="flex items-start gap-space-sm">
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                </div>
                <div className="flex flex-col w-full min-w-0">
                  <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-wider mb-1">
                    Consultation Timing
                  </span>
                  <div className="space-y-2.5 mt-2 font-body-md text-body-md text-on-surface">
                    <div className="flex justify-between items-baseline pb-1.5 border-b border-surface-container/60">
                      <span className="text-on-surface-variant font-medium">Monday – Friday</span>
                      <div className="text-right">
                        <span className="block font-semibold text-primary">10:00 AM – 1:00 PM</span>
                        <span className="block text-label-caption text-on-surface-variant">6:00 PM – 10:00 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline pb-1.5 border-b border-surface-container/60">
                      <span className="text-on-surface-variant font-medium">Saturday</span>
                      <span className="font-semibold text-primary">10:00 AM – 5:00 PM</span>
                    </div>
                    <div className="mt-2 p-2.5 rounded-DEFAULT bg-surface-container-low flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">sanitizer</span>
                      <p className="font-label-caption text-label-caption text-on-surface-variant">
                        <strong className="text-primary font-semibold">Sunday Closed:</strong> 24-hour emergency telephone support available at 022 2589 1949.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interaction Actions */}
            <div className="grid grid-cols-3 gap-2">
              <a
                className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-DEFAULT bg-surface-container hover:bg-surface-container-high text-primary transition-all text-center interactive-button"
                href={siteConfig.contact.landlineTel}
              >
                <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
                <span className="font-label-button text-[13px] leading-tight">Call Desk</span>
              </a>
              <a
                className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-DEFAULT bg-secondary-container/70 hover:bg-secondary-container text-on-secondary-fixed transition-all text-center interactive-button"
                href={siteConfig.contact.whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[22px]">chat</span>
                <span className="font-label-button text-[13px] leading-tight">WhatsApp</span>
              </a>
              <a
                className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-DEFAULT bg-surface-container hover:bg-surface-container-high text-primary transition-all text-center interactive-button"
                href="#clinic-location-map"
              >
                <span className="material-symbols-outlined text-[22px]">directions_car</span>
                <span className="font-label-button text-[13px] leading-tight">Directions</span>
              </a>
            </div>

            {/* Anxious Patient Assurance Note */}
            <div className="bg-surface-container rounded-lg p-space-md shadow-sm relative overflow-hidden border border-white/40">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary-fixed/50 pointer-events-none blur-xl" />
              <div className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[26px] shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  spa
                </span>
                <div className="flex flex-col">
                  <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-wider mb-1">
                    Our Human Reassurance
                  </span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    Phoning a dental clinic can trigger anxiety. When you call us, you speak directly with{' '}
                    <strong className="text-primary font-semibold">Sayali or Dr. Gangal</strong>—never an automated robotic maze or high-pressure clinical sales pitch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Elegant Unhurried Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-lg p-space-lg lg:p-space-xl shadow-[0_20px_48px_-8px_rgba(15,46,51,0.07)] border border-white/60 relative">
              <div className="flex flex-col mb-space-md">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest">
                    Gentle Reservation Desk
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary tracking-tight">
                  Request an unhurried consultation
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Please share your preferred rhythm. We thoughtfully respond within clinic operational windows.
                </p>
              </div>

              {success ? (
                <div className="p-6 rounded-DEFAULT bg-secondary-container text-on-secondary-fixed flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[36px]">check_circle</span>
                  <h3 className="font-headline-sm text-primary">Inquiry Received</h3>
                  <p className="font-body-md text-on-surface">{success}</p>
                  <button
                    onClick={() => setSuccess(null)}
                    className="mt-3 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-button text-label-button"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-button text-[14px] text-on-surface" htmlFor="full-name">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                        id="full-name"
                        name="fullName"
                        placeholder="e.g. Asmita Patil"
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                        person
                      </span>
                    </div>
                  </div>

                  {/* Contact Coordinates (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-button text-[14px] text-on-surface" htmlFor="mobile-number">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                          id="mobile-number"
                          name="mobileNumber"
                          placeholder="+91 99870 76628"
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                          smartphone
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-button text-[14px] text-on-surface" htmlFor="email-address">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                          id="email-address"
                          name="emailAddress"
                          placeholder="yourname@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                          alternate_email
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reply Preference Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-button text-[14px] text-on-surface">
                      Preferred Mode of Gentle Reply
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" id="reply-preference-group">
                      <label
                        onClick={() => setReplyPreference('phone')}
                        className={`relative flex items-center justify-between p-3 rounded-DEFAULT cursor-pointer transition-colors ${
                          replyPreference === 'phone'
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        <span className="font-label-caption text-label-caption font-semibold">Phone Call</span>
                        <input
                          className="sr-only"
                          name="replyMethod"
                          type="radio"
                          value="phone"
                          checked={replyPreference === 'phone'}
                          onChange={() => setReplyPreference('phone')}
                        />
                        <span className="material-symbols-outlined text-[18px]">call</span>
                      </label>

                      <label
                        onClick={() => setReplyPreference('whatsapp')}
                        className={`relative flex items-center justify-between p-3 rounded-DEFAULT cursor-pointer transition-colors ${
                          replyPreference === 'whatsapp'
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        <span className="font-label-caption text-label-caption font-semibold">WhatsApp</span>
                        <input
                          className="sr-only"
                          name="replyMethod"
                          type="radio"
                          value="whatsapp"
                          checked={replyPreference === 'whatsapp'}
                          onChange={() => setReplyPreference('whatsapp')}
                        />
                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                      </label>

                      <label
                        onClick={() => setReplyPreference('email')}
                        className={`relative flex items-center justify-between p-3 rounded-DEFAULT cursor-pointer transition-colors ${
                          replyPreference === 'email'
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface hover:bg-surface-container-high text-on-surface'
                        }`}
                      >
                        <span className="font-label-caption text-label-caption font-semibold">Email Letter</span>
                        <input
                          className="sr-only"
                          name="replyMethod"
                          type="radio"
                          value="email"
                          checked={replyPreference === 'email'}
                          onChange={() => setReplyPreference('email')}
                        />
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                      </label>
                    </div>
                  </div>

                  {/* Message / Sensory Concerns */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-label-button text-[14px] text-on-surface" htmlFor="patient-message">
                        How can we support you?
                      </label>
                      <span className="font-label-caption text-[12px] text-on-surface-variant">Confidential &amp; Private</span>
                    </div>
                    <textarea
                      className="w-full p-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md resize-none"
                      id="patient-message"
                      name="message"
                      placeholder="Share any tooth sensitivity, past dental experiences, fear of sound or needles, or specific treatment you'd like to understand peacefully..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  {/* DPDP Act Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 rounded text-primary focus:ring-primary"
                      />
                      <span className="font-label-caption text-label-caption text-on-surface-variant leading-relaxed">
                        I consent to Gangal Dental Clinic processing my contact details to reply to this query in compliance with India's Digital Personal Data Protection (DPDP) Act 2023. View our{' '}
                        <Link href="/privacy" className="text-primary underline font-medium">
                          Privacy Policy
                        </Link>.
                      </span>
                    </label>
                  </div>

                  {/* Invisible Honeypot for spam protection */}
                  <input
                    type="text"
                    name="preferred_fax"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    autoComplete="off"
                  />

                  {error && (
                    <div className="p-3 rounded-DEFAULT bg-error-container text-on-error-container text-body-md flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">error</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit Button & Trust Guarantee */}
                  <div className="flex flex-col gap-space-xs mt-2">
                    <button
                      className="w-full min-h-[52px] rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_6px_20px_-2px_rgba(0,82,85,0.3)] hover:bg-primary-container hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                      id="submit-button"
                      type="submit"
                      disabled={submitting}
                    >
                      <span>{submitting ? 'Sending Request...' : 'Send Appointment Request'}</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-caption text-label-caption text-center pt-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                      <span>Zero pressure · Strictly private clinical communication · No automated SMS marketing</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Sanctuary Location Card & Interactive Map Context */}
        <div className="mt-space-xl scroll-mt-28" id="clinic-location-map">
          <div className="bg-surface-container-lowest rounded-lg p-space-md lg:p-space-lg shadow-[0_16px_40px_-6px_rgba(15,46,51,0.06)] border border-white/60 flex flex-col gap-space-md">
            {/* Header Strip with Transit details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-eyebrow text-label-eyebrow text-tertiary uppercase tracking-widest">
                    Sanctuary Coordinates
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-label-caption font-medium">
                    Manpada, Thane West
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1">
                  Happy Valley Shopping Complex · Step-Free Clinic Floor
                </h3>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-caption text-label-caption bg-surface-container-low px-3.5 py-2 rounded-full self-start md:self-auto">
                <span className="material-symbols-outlined text-secondary text-[18px]">commute</span>
                <span>12 mins from Thane Station · Direct access off Ghodbunder Road</span>
              </div>
            </div>

            {/* Visual Map Area with Data Location */}
            <div className="relative w-full h-[380px] lg:h-[440px] rounded-lg overflow-hidden shadow-inner group">
              {/* Google Maps Data Pipeline Map Container */}
              <div
                className="w-full h-full bg-cover bg-center"
                data-location="Gangal Dental Clinic, Happy Valley Shopping Complex, Manpada, Thane West, Maharashtra"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIIUSiKQHV31WngoayY0uhubDt2axjEJtWY9mbvO1TgvPD5sDJHRXzfIlMlflxH2Pm49nXIhiiBQ4HHQ2M_gGib0CcD5LuqDeq82J5pz3FPGTk49f7CpOWtTSliCrie--hhYYta6Md1nJPOQ4qA5x1-kGzdzayAZtI-pPy-y1mjkSee6-uNVvxg8M1flbhpdESTBL2yBFwqM0V6-l43EWGsnr6XFYlO_xIiINcnQIO')",
                }}
              />
              {/* Editorial Floating Overlay on Map */}
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-DEFAULT shadow-[0_12px_28px_-4px_rgba(15,46,51,0.18)] flex flex-col gap-1.5 border border-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-label-button text-[14px] text-primary">
                    Arrival &amp; Step-Free Parking Guidance
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                  Drive into Happy Valley complex via Tikujiniwadi Road. Dedicated ground floor parking bay with gentle incline ramp right to our doorway.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    className="inline-flex items-center gap-1 font-label-button text-[13px] text-primary hover:text-primary-container font-semibold transition-colors"
                    href={siteConfig.address.googleMapsUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Open in Google Maps</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                  <span className="text-outline-variant">·</span>
                  <span className="font-label-caption text-label-caption text-secondary">Reserved Valet Available</span>
                </div>
              </div>
              {/* Compass Rose */}
              <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full p-2.5 text-primary shadow-sm hidden sm:flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">explore</span>
              </div>
            </div>

            {/* Transit Connectivity Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
              <div className="flex items-start gap-3 p-3 rounded-DEFAULT bg-surface">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">near_me</span>
                <div>
                  <p className="font-label-button text-[13px] text-primary">From Eastern Express Highway</p>
                  <p className="font-label-caption text-label-caption text-on-surface-variant">
                    Smooth 8-min transit via Majiwada junction straight towards Tikujiniwadi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-DEFAULT bg-surface">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">local_parking</span>
                <div>
                  <p className="font-label-button text-[13px] text-primary">Step-Free Operatory Access</p>
                  <p className="font-label-caption text-label-caption text-on-surface-variant">
                    No elevators or steep stairways. Wheelchair friendly direct entryway.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-DEFAULT bg-surface">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">local_pharmacy</span>
                <div>
                  <p className="font-label-button text-[13px] text-primary">Adjacent Amenities</p>
                  <p className="font-label-caption text-label-caption text-on-surface-variant">
                    Convenient pharmacy, quiet organic tea cafe, and D-Mart directly across the avenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
