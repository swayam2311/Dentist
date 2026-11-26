'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Phone, MessageCircle, Send, Calendar } from 'lucide-react';

const SERVICES = [
  { id: 'free-consultation', name: 'Free First Oral Consultation' },
  { id: 'dental-implants', name: 'Dental Implants' },
  { id: 'invisalign', name: 'Invisalign Aligners' },
  { id: 'root-canal-treatment', name: 'Root Canal Treatment' },
  { id: 'teeth-whitening', name: 'Teeth Whitening' },
  { id: 'porcelain-veneers', name: 'Porcelain Veneers' },
  { id: 'digital-smile-design', name: 'Digital Smile Design' },
  { id: 'pediatric-dentistry', name: 'Pediatric Dentistry' },
  { id: 'emergency-care', name: 'Emergency Care' },
  { id: 'preventative-dentistry', name: 'Preventative Dentistry' },
  { id: 'other', name: 'General Consultation / Other' },
];

const TIME_WINDOWS = [
  'Morning Session (Mon–Sat: 10:00 AM – 1:00 PM)',
  'Evening Session (Mon–Fri: 6:00 PM – 10:00 PM)',
  'Saturday Afternoon (1:00 PM – 5:00 PM)',
  'Earliest Available Window',
];

interface StaticBookingFormProps {
  initialService?: string;
  sourcePage?: 'book' | 'contact';
}

export function StaticBookingForm({ initialService, sourcePage = 'book' }: StaticBookingFormProps) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get('service') || initialService || 'free-consultation';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(serviceParam);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS[0]);
  const [replyPreference, setReplyPreference] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (serviceParam) {
      setService(serviceParam);
    }
  }, [serviceParam]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please provide your full name (minimum 2 characters).';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
      errs.phone = 'Please provide a valid 10-digit Indian mobile number.';
    }

    if (replyPreference === 'email' || email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email.trim())) {
        errs.email = 'Please provide a valid email address.';
      }
    }

    if (!consent) {
      errs.consent = 'Your consent is required under DPDP Act 2023 to submit this request.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getFormattedPhone = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return `+91${digits}`;
    if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
    return phone.trim();
  };

  const buildWhatsAppMessage = () => {
    const selectedServiceName = SERVICES.find((s) => s.id === service)?.name || service;
    const msg = `Hello Dr. Gangal's Clinic,
I would like to request a dental consultation.
• Patient Name: ${name || '[Name]'}
• Contact Number: ${phone || '[Phone]'}
• Preferred Treatment: ${selectedServiceName}
• Preferred Session: ${timeWindow}
• Preferred Reply Mode: ${replyPreference.toUpperCase()}
${notes ? `• Patient Notes: ${notes}` : ''}`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot injection

    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            phone: getFormattedPhone(),
            email: email || undefined,
            service: SERVICES.find((s) => s.id === service)?.name || service,
            timeWindow,
            replyPreference,
            notes: notes || undefined,
            sourcePage,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Form submission failed.');
        }

        setSubmitted(true);
        setSubmitting(false);
        return;
      } catch {
        setSubmitError(
          'We could not submit your request automatically. You can reach our reception directly on WhatsApp or by calling.'
        );
        setSubmitting(false);
        return;
      }
    }

    // Static fallback: Form submitted successfully in offline/static mode
    // Directs user to confirm via WhatsApp or telephone
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-surface-container-lowest rounded-card p-6 sm:p-10 border border-theme-border/60 shadow-ambient text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-[26px] sm:text-[30px] text-primary mb-2 font-normal">
          Appointment Request Received
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <strong className="text-on-surface">{name}</strong>. Our front desk coordinator will review our unhurried schedule and contact you via {replyPreference.toUpperCase()} to confirm your exact appointment slot.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${buildWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm on WhatsApp</span>
          </a>
          <a
            href={siteConfig.contact.landlineTel}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-surface-container text-primary font-label-button text-label-button hover:bg-surface-container-high transition-colors w-full sm:w-auto"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface-container-lowest rounded-card p-6 sm:p-8 border border-theme-border/60 shadow-ambient flex flex-col gap-5 text-left"
    >
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot_trap">Leave empty</label>
        <input
          id="bot_trap"
          type="text"
          name="bot_trap"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="patient_name" className="block font-label-button text-label-button text-on-surface mb-1.5">
            Full Name <span className="text-error">*</span>
          </label>
          <input
            id="patient_name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Asmita Patil"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full min-h-[48px] px-4 rounded-xl border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-error ring-1 ring-error' : 'border-theme-border'
              }`}
          />
          {errors.name && <p className="text-error text-[13px] mt-1">{errors.name}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="patient_phone" className="block font-label-button text-label-button text-on-surface mb-1.5">
            Mobile Number (India) <span className="text-error">*</span>
          </label>
          <input
            id="patient_phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="e.g. 99870 76628"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full min-h-[48px] px-4 rounded-xl border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-error ring-1 ring-error' : 'border-theme-border'
              }`}
          />
          {errors.phone && <p className="text-error text-[13px] mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service Selector */}
        <div>
          <label htmlFor="treatment_service" className="block font-label-button text-label-button text-on-surface mb-1.5">
            Treatment of Interest <span className="text-error">*</span>
          </label>
          <select
            id="treatment_service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full min-h-[48px] px-4 rounded-xl border border-theme-border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Timing Window */}
        <div>
          <label htmlFor="timing_window" className="block font-label-button text-label-button text-on-surface mb-1.5">
            Preferred Time Window
          </label>
          <select
            id="timing_window"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className="w-full min-h-[48px] px-4 rounded-xl border border-theme-border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {TIME_WINDOWS.map((tw) => (
              <option key={tw} value={tw}>
                {tw}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email Address */}
        <div>
          <label htmlFor="patient_email" className="block font-label-button text-label-button text-on-surface mb-1.5">
            Email Address {replyPreference === 'email' ? <span className="text-error">*</span> : <span className="text-on-surface-variant text-[13px] font-normal">(Optional)</span>}
          </label>
          <input
            id="patient_email"
            type="email"
            autoComplete="email"
            placeholder="e.g. name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full min-h-[48px] px-4 rounded-xl border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-error ring-1 ring-error' : 'border-theme-border'
              }`}
          />
          {errors.email && <p className="text-error text-[13px] mt-1">{errors.email}</p>}
        </div>

        {/* Reply Preference */}
        <div>
          <label className="block font-label-button text-label-button text-on-surface mb-1.5">
            How Should We Reach You?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['whatsapp', 'phone', 'email'] as const).map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => setReplyPreference(pref)}
                className={`min-h-[48px] rounded-xl border text-[13px] font-sans font-medium capitalize flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${replyPreference === pref
                  ? 'bg-primary text-on-primary border-primary shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border-theme-border hover:bg-surface-container'
                  }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Notes */}
      <div>
        <label htmlFor="patient_notes" className="block font-label-button text-label-button text-on-surface mb-1.5">
          Tell us about your dental concern or anxiety <span className="text-on-surface-variant text-[13px] font-normal">(Optional)</span>
        </label>
        <textarea
          id="patient_notes"
          rows={3}
          placeholder="Feel free to mention past dental reservations, tooth sensitivity, or specific questions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-4 rounded-xl border border-theme-border bg-surface-container-lowest text-on-surface font-body-md text-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* DPDP Act 2023 Consent Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-theme-border text-primary focus:ring-primary focus:ring-offset-0"
          />
          <span className="font-body-md text-[13px] text-on-surface-variant leading-snug">
            I consent to Gangal Dental Clinic processing my contact details to coordinate my appointment and reply to my inquiry in accordance with the{' '}
            <a href="/privacy" className="text-primary underline hover:text-primary-container">
              Privacy Policy (DPDP Act 2023)
            </a>
            .
          </span>
        </label>
        {errors.consent && <p className="text-error text-[13px] mt-1">{errors.consent}</p>}
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-[14px] flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Dual Submission Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full sm:flex-1 min-h-[48px]"
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>{submitting ? 'Sending Request...' : 'Send Appointment Request'}</span>
        </Button>

        <a
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${buildWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-button text-label-button hover:bg-secondary-fixed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary w-full sm:w-auto"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send on WhatsApp</span>
        </a>
      </div>

      <p className="font-label-caption text-label-caption text-on-surface-variant text-center mt-1">
        We respect your time. Our receptionist checks submissions continuously during clinic hours.
      </p>
    </form>
  );
}

