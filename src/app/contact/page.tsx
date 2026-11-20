'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site.config';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

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
      setError('Please provide consent under DPDP Act to submit your inquiry.');
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

      setSuccess(data.message || 'Thank you. Your message has been received.');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setConsent(false);
      setSubmitting(false);
    } catch {
      setError('Network connection error. Please call the clinic directly at 022 25891949.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold block mb-2">
          Reach Our Clinic
        </span>
        <h1 className="font-serif text-[38px] sm:text-[48px] text-primary font-normal leading-tight mb-4">
          Get in touch with our gentle care team
        </h1>
        <p className="font-sans text-[17px] text-theme-muted leading-relaxed">
          Whether you have a query about a sensitive tooth, need priority relief, or wish to speak with our reception before scheduling, we listen attentively.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Clinic Coordinates & Operating Hours (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Address Card */}
          <div className="p-7 rounded-[28px] bg-theme-card border border-theme-border shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-theme-container text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
                  Clinic Address
                </span>
                <p className="font-serif text-[19px] text-primary leading-snug">
                  Happy Valley Shopping Complex
                </p>
                <p className="font-sans text-[14px] text-theme-muted mt-1 leading-relaxed">
                  Shop No. 26, 28, 29, Tikujiniwadi Road, Manpada, Thane West 400610, Maharashtra
                </p>
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-primary hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Telephony Card */}
          <div className="p-7 rounded-[28px] bg-theme-card border border-theme-border shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-theme-container text-primary flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-theme-secondary">
                Direct Telephony
              </span>
            </div>

            <div className="flex flex-col gap-2 font-sans">
              <a
                href={siteConfig.contact.landlineTel}
                className="p-3 rounded-2xl bg-theme-container-low hover:bg-theme-container flex items-center justify-between text-primary font-medium text-[15px] transition-colors"
              >
                <span>Landline Desk</span>
                <span className="font-bold">{siteConfig.contact.landline}</span>
              </a>

              <a
                href={siteConfig.contact.mobileTel}
                className="p-3 rounded-2xl bg-theme-container-low hover:bg-theme-container flex items-center justify-between text-primary font-medium text-[15px] transition-colors"
              >
                <span>Mobile Direct</span>
                <span className="font-bold">{siteConfig.contact.mobile}</span>
              </a>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-theme-secondary-container hover:bg-theme-secondary flex items-center justify-between text-theme-ink font-medium text-[15px] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>WhatsApp Chat</span>
                </span>
                <span className="text-[13px] text-theme-muted font-normal">Instant discreet messaging</span>
              </a>
            </div>
          </div>

          {/* Consultation Hours */}
          <div className="p-7 rounded-[28px] bg-theme-card border border-theme-border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-theme-container text-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-theme-secondary">
                Consultation Timing
              </span>
            </div>

            <div className="flex flex-col gap-2.5 font-sans text-[14px]">
              <div className="flex justify-between items-baseline border-b border-theme-border/30 pb-2">
                <span className="text-theme-muted">Monday – Friday</span>
                <div className="text-right text-theme-ink font-medium">
                  <div>10:00 AM – 1:00 PM</div>
                  <div>6:00 PM – 10:00 PM</div>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-theme-border/30 pb-2">
                <span className="text-theme-muted">Saturday</span>
                <span className="text-theme-ink font-medium">10:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-error font-medium">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>

            <p className="mt-4 pt-3 border-t border-theme-border/30 text-[12px] text-theme-muted font-sans italic">
              {siteConfig.contact.emergencyNotice}
            </p>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-[32px] bg-theme-card border border-theme-border shadow-ambient">
            <h2 className="font-serif text-[26px] text-primary font-normal mb-1">
              Send an inquiry to reception
            </h2>
            <p className="font-sans text-[14px] text-theme-muted mb-6">
              Our front-desk team reviews inquiries during clinic operating windows.
            </p>

            {success ? (
              <div className="p-6 rounded-[24px] bg-theme-container text-primary flex flex-col items-center text-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-primary" />
                <h3 className="font-serif text-[20px] font-normal">Inquiry Received</h3>
                <p className="font-sans text-[14px] text-theme-muted">{success}</p>
                <Button variant="outline" onClick={() => setSuccess(null)} className="mt-2">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Sahil Desai"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Mobile Number"
                  placeholder="+91 99870 76628"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  helperText="Format: +91XXXXXXXXXX"
                />

                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="font-sans text-[13px] font-medium text-theme-ink">
                    Preferred reply channel
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['phone', 'whatsapp', 'email'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setReplyPreference(ch)}
                        className={`py-2 px-3 rounded-full text-[13px] font-sans font-medium border capitalize transition-colors ${
                          replyPreference === ch
                            ? 'bg-primary text-white border-primary'
                            : 'bg-theme-card text-theme-ink border-theme-border hover:bg-theme-container'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  <label className="font-sans text-[13px] font-medium text-theme-ink">
                    Your Message or Query <span className="text-primary">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or question..."
                    className="p-3.5 rounded-2xl bg-theme-card border border-theme-border font-sans text-[14px] text-theme-ink focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>

                {/* DPDP Act Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 rounded text-primary focus:ring-primary"
                    />
                    <span className="font-sans text-[13px] text-theme-muted leading-relaxed">
                      I consent to Gangal Dental Clinic processing my contact details to reply to this query in compliance with India's Digital Personal Data Protection (DPDP) Act 2023. View our{' '}
                      <a href="/privacy" target="_blank" className="text-primary underline">
                        Privacy Policy
                      </a>.
                    </span>
                  </label>
                </div>

                {/* Invisible Honeypot */}
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
                  <div className="p-3 rounded-xl bg-error-container text-on-error-container text-[13px] font-sans flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-error shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={submitting} className="w-full mt-3">
                  <Send className="w-4 h-4 mr-2" />
                  <span>{submitting ? 'Submitting...' : 'Send Inquiry'}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

