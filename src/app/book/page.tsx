'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Stepper } from '@/components/ui/Stepper';
import { Calendar as CalendarPicker } from '@/components/ui/Calendar';
import { SlotPicker, Slot } from '@/components/ui/SlotPicker';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site.config';
import {
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Phone,
  Shield,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';

interface ServiceOption {
  id: string;
  slug: string;
  name: string;
  duration: string;
  category: string;
  isFree?: boolean;
  isEmergency?: boolean;
}

const availableServices: ServiceOption[] = [
  {
    id: 's0111111-1111-1111-1111-111111111101',
    slug: 'free-consultation',
    name: 'Free Oral Health Consultation',
    duration: '30 Min',
    category: 'General',
    isFree: true,
  },
  {
    id: 's0111111-1111-1111-1111-111111111103',
    slug: 'dental-implants',
    name: 'Dental Implants Consultation',
    duration: '60 Min',
    category: 'Implants',
  },
  {
    id: 's0111111-1111-1111-1111-111111111104',
    slug: 'invisalign',
    name: 'Invisalign Aligners Consultation',
    duration: '30 Min',
    category: 'Orthodontics',
  },
  {
    id: 's0111111-1111-1111-1111-111111111105',
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    duration: '60 Min',
    category: 'Restorative',
  },
  {
    id: 's0111111-1111-1111-1111-111111111106',
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    duration: '45 Min',
    category: 'Cosmetic',
  },
  {
    id: 's0111111-1111-1111-1111-111111111116',
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dental Checkup',
    duration: '30 Min',
    category: 'Children',
  },
  {
    id: 's0111111-1111-1111-1111-111111111117',
    slug: 'preventative-dentistry',
    name: 'Dental Cleaning & Preventive Hygiene',
    duration: '30 Min',
    category: 'General',
  },
  {
    id: 'emergency-call',
    slug: 'emergency-care',
    name: 'Emergency / Urgent Care (Call Desk)',
    duration: 'Urgent',
    category: 'Emergency',
    isEmergency: true,
  },
];

const dentistOptions = [
  {
    id: 'first_available',
    name: 'No Preference',
    role: 'Earliest Available Clinician',
    desc: 'Assigned to the first free consulting suite for quickest confirmation.',
    initials: 'EA',
  },
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    name: 'Dr. Anand Gangal',
    role: 'Principal Dentist',
    desc: 'Restorative dentistry, dental implants, and full mouth rehabilitations.',
    initials: 'AG',
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    name: 'Dr. Padma Kurup',
    role: 'Associate Dentist',
    desc: 'Gentle family dentistry, pediatric care, and smile alignments.',
    initials: 'PK',
  },
];

function BookingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state preselection
  const initialServiceSlug = searchParams.get('service');
  const initialDentistId = searchParams.get('dentist');

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<ServiceOption>(() => {
    const found = availableServices.find((s) => s.slug === initialServiceSlug);
    return found || availableServices[0];
  });

  const [selectedDentistId, setSelectedDentistId] = useState<string>(
    initialDentistId || 'first_available'
  );

  // Default to tomorrow in Asia/Kolkata
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // Skip Sunday
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowStr());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Patient Details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [replyPreference, setReplyPreference] = useState<'phone' | 'whatsapp' | 'email'>('phone');
  const [notes, setNotes] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // UI status
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Steps definition
  const steps = [
    { step: 1, label: 'Service' },
    { step: 2, label: 'Dentist' },
    { step: 3, label: 'Day & Time' },
    { step: 4, label: 'Details' },
    { step: 5, label: 'Review' },
  ];

  // Fetch slots whenever selectedDate, selectedService, or selectedDentistId changes
  useEffect(() => {
    if (currentStep === 3 && selectedDate && selectedService) {
      let isMounted = true;
      setLoadingSlots(true);
      setErrorMessage(null);

      fetch(
        `/api/slots?serviceId=${selectedService.id}&dentistId=${selectedDentistId}&date=${selectedDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          setAvailableSlots(data.slots || []);
          setLoadingSlots(false);
        })
        .catch(() => {
          if (!isMounted) return;
          setLoadingSlots(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [currentStep, selectedDate, selectedService, selectedDentistId]);

  // Handle Submission
  const handleSubmitBooking = async () => {
    if (!selectedSlot) {
      setErrorMessage('Please select a time slot.');
      setCurrentStep(3);
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please provide consent under DPDP Act to submit your reservation.');
      setCurrentStep(4);
      return;
    }

    // Format phone to +91
    let formattedPhone = patientPhone.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          dentistId: selectedDentistId === 'first_available' ? null : selectedDentistId,
          startsAt: selectedSlot.starts_at,
          patientName,
          patientPhone: formattedPhone,
          patientEmail: patientEmail || undefined,
          isNewPatient,
          replyPreference,
          notes,
          consentGiven: true,
          honeypot,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || 'Failed to complete booking.');
        setSubmitting(false);
        return;
      }

      // Redirect to confirmed page with reference and query params
      const refCode = result.referenceCode;
      const queryParams = new URLSearchParams({
        ref: refCode,
        name: patientName,
        service: selectedService.name,
        time: selectedSlot.time_display,
        date: selectedDate,
        startsAt: selectedSlot.starts_at,
        dentist: selectedSlot.dentist_name,
      });

      router.push(`/book/confirmed?${queryParams.toString()}`);
    } catch (err: any) {
      setErrorMessage('Network error. Please try again or call the clinic.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/60 mb-3 text-xs font-sans text-theme-secondary font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>Unhurried Appointments</span>
        </div>
        <h1 className="font-serif text-[34px] sm:text-[44px] text-primary font-normal leading-tight">
          Reserve your consultation
        </h1>
        <p className="font-sans text-[16px] text-theme-muted mt-2">
          Every visit is reserved exclusively for you with unhurried care and zero waiting rush.
        </p>
      </div>

      {/* Stepper Header */}
      <Stepper steps={steps} currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-error-container text-on-error-container text-[14px] font-sans flex items-center gap-3 border border-error/20 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-error shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sanctuary Form Container */}
      <div className="bg-theme-card rounded-[32px] p-6 sm:p-10 border border-theme-border/70 shadow-ambient transition-all">
        {/* ===================================================================
            STEP 1: SERVICE SELECTION
            =================================================================== */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-[24px] text-primary font-normal mb-1">
                Select your treatment or reason for visit
              </h2>
              <p className="font-sans text-[14px] text-theme-muted">
                Your first consultation is completely free of charge with zero obligation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {availableServices.map((service) => {
                const isSelected = selectedService.id === service.id;

                if (service.isEmergency) {
                  return (
                    <div
                      key={service.id}
                      className="p-5 rounded-[24px] bg-theme-card border border-error/30 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-error px-2.5 py-0.5 rounded-full bg-error-container">
                            Urgent Pain
                          </span>
                          <span className="font-sans text-[12px] text-error font-medium">Immediate</span>
                        </div>
                        <h3 className="font-serif text-[18px] text-primary font-normal mb-1">
                          {service.name}
                        </h3>
                        <p className="font-sans text-[13px] text-theme-muted">
                          For severe toothaches, trauma, or fractures. Please call directly.
                        </p>
                      </div>
                      <a
                        href={siteConfig.contact.landlineTel}
                        className="mt-4 w-full min-h-[42px] rounded-full bg-error text-white font-sans text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-error/90 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call 022 25891949</span>
                      </a>
                    </div>
                  );
                }

                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-5 rounded-[24px] border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-theme-card border-primary ring-2 ring-primary/20 shadow-ambient'
                        : 'bg-theme-card/70 border-theme-border/60 hover:border-primary/50 hover:bg-theme-container-low/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-theme-secondary px-2.5 py-0.5 rounded-full bg-theme-container">
                          {service.category}
                        </span>
                        <span className="font-sans text-[12px] text-theme-muted font-medium">
                          {service.duration}
                        </span>
                      </div>
                      <h3 className="font-serif text-[18px] text-primary font-normal mb-1 leading-snug">
                        {service.name}
                      </h3>
                      {service.isFree && (
                        <span className="inline-block font-sans text-[12px] font-semibold text-primary">
                          ✨ 100% Complimentary First Visit
                        </span>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-theme-border/30 flex items-center justify-between">
                      <span className="font-sans text-[12px] text-theme-muted">Click to select</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary text-white' : 'border-theme-border'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-theme-border/40">
              <Button onClick={() => setCurrentStep(2)} className="min-w-[160px]">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STEP 2: CLINICIAN SELECTION
            =================================================================== */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-[24px] text-primary font-normal mb-1">
                Select your attending clinician
              </h2>
              <p className="font-sans text-[14px] text-theme-muted">
                Choose a specific dentist or select No Preference for earliest confirmation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dentistOptions.map((dentist) => {
                const isSelected = selectedDentistId === dentist.id;

                return (
                  <div
                    key={dentist.id}
                    onClick={() => setSelectedDentistId(dentist.id)}
                    className={`p-5 rounded-[24px] border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-theme-card border-primary ring-2 ring-primary/20 shadow-ambient'
                        : 'bg-theme-card/70 border-theme-border/60 hover:border-primary/50 hover:bg-theme-container-low/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-full bg-theme-container text-primary font-serif text-[18px] flex items-center justify-center font-medium">
                          {dentist.initials}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-primary bg-primary text-white' : 'border-theme-border'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                      <h3 className="font-serif text-[19px] text-primary font-normal leading-tight">
                        {dentist.name}
                      </h3>
                      <span className="font-sans text-[12px] text-theme-secondary font-medium block mt-0.5">
                        {dentist.role}
                      </span>
                      <p className="font-sans text-[13px] text-theme-muted mt-2 leading-relaxed">
                        {dentist.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-theme-border/40">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="min-w-[160px]">
                <span>Choose Date</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STEP 3: CALENDAR & TIME SLOTS
            =================================================================== */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-[24px] text-primary font-normal mb-1">
                Choose consultation day &amp; unhurried time
              </h2>
              <p className="font-sans text-[14px] text-theme-muted">
                Slots are strictly reserved for you. No double bookings, no crowded waiting rooms.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Monthly Calendar */}
              <div className="lg:col-span-6">
                <CalendarPicker
                  selectedDate={selectedDate}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setSelectedSlot(null);
                  }}
                />
              </div>

              {/* Right: Available Slots */}
              <div className="lg:col-span-6">
                <SlotPicker
                  slots={availableSlots}
                  selectedSlotStartsAt={selectedSlot?.starts_at || null}
                  onSelectSlot={(s) => setSelectedSlot(s)}
                  loading={loadingSlots}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-theme-border/40">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button
                disabled={!selectedSlot}
                onClick={() => {
                  if (!selectedSlot) {
                    setErrorMessage('Please click an available time slot above.');
                    return;
                  }
                  setCurrentStep(4);
                }}
                className="min-w-[160px]"
              >
                <span>Enter Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STEP 4: PATIENT DETAILS & DPDP CONSENT
            =================================================================== */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200 max-w-xl mx-auto">
            <div>
              <h2 className="font-serif text-[24px] text-primary font-normal mb-1">
                Your contact details
              </h2>
              <p className="font-sans text-[14px] text-theme-muted">
                Reception connects with you prior to the consultation to confirm medical history.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Asmita Patil"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />

              <Input
                label="Indian Mobile Number"
                placeholder="+91 99870 76628"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                helperText="We will call or message to confirm your reserved slot."
              />

              <Input
                label="Email Address (Optional)"
                type="email"
                placeholder="you@example.com"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                helperText="For digital appointment confirmation and calendar invite."
              />

              {/* Patient Type */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-sans text-[13px] font-medium text-theme-ink">
                  Have you visited Gangal Dental Clinic before?
                </span>
                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-sans text-[14px]">
                    <input
                      type="radio"
                      name="patientType"
                      checked={isNewPatient}
                      onChange={() => setIsNewPatient(true)}
                      className="text-primary focus:ring-primary"
                    />
                    <span>Yes, first-time patient</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-sans text-[14px]">
                    <input
                      type="radio"
                      name="patientType"
                      checked={!isNewPatient}
                      onChange={() => setIsNewPatient(false)}
                      className="text-primary focus:ring-primary"
                    />
                    <span>Returning patient</span>
                  </label>
                </div>
              </div>

              {/* Reply Preference */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-sans text-[13px] font-medium text-theme-ink">
                  Preferred confirmation channel
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

              {/* Optional Notes */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="font-sans text-[13px] font-medium text-theme-ink">
                  Any specific concerns, tooth sensitivity, or dental anxiety? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share anything you would like Dr. Gangal to know before your visit..."
                  className="p-3.5 rounded-2xl bg-theme-card border border-theme-border font-sans text-[14px] text-theme-ink focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>

              {/* DPDP Act Consent Checkbox */}
              <div className="pt-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 rounded text-primary focus:ring-primary"
                  />
                  <span className="font-sans text-[13px] text-theme-muted leading-relaxed">
                    I consent to Gangal Dental Clinic processing my contact coordinates to schedule and coordinate this appointment in compliance with India's Digital Personal Data Protection (DPDP) Act 2023. View our{' '}
                    <a href="/privacy" target="_blank" className="text-primary underline">
                      Privacy Policy
                    </a>.
                  </span>
                </label>
              </div>

              {/* Invisible Honeypot */}
              <input
                type="text"
                name="preferred_clinic_source"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                autoComplete="off"
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-theme-border/40">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button
                disabled={!patientName.trim() || !patientPhone.trim() || !consentGiven}
                onClick={() => setCurrentStep(5)}
                className="min-w-[160px]"
              >
                <span>Review Summary</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STEP 5: REVIEW & FINAL CONFIRMATION
            =================================================================== */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200 max-w-xl mx-auto">
            <div>
              <h2 className="font-serif text-[24px] text-primary font-normal mb-1">
                Review your consultation summary
              </h2>
              <p className="font-sans text-[14px] text-theme-muted">
                Please verify your details before submitting your reservation.
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-theme-container-low/70 border border-theme-border/60 flex flex-col gap-4 font-sans text-[14px]">
              <div className="flex justify-between items-baseline border-b border-theme-border/30 pb-3">
                <span className="text-theme-muted">Treatment</span>
                <span className="font-serif text-[17px] text-primary font-medium text-right">
                  {selectedService.name}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-theme-border/30 pb-3">
                <span className="text-theme-muted">Attending Clinician</span>
                <span className="font-medium text-theme-ink">
                  {selectedSlot?.dentist_name || 'Assigned Clinician'}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-theme-border/30 pb-3">
                <span className="text-theme-muted">Date &amp; Time</span>
                <span className="font-medium text-primary">
                  {selectedDate} at {selectedSlot?.time_display}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-theme-border/30 pb-3">
                <span className="text-theme-muted">Patient Name</span>
                <span className="font-medium text-theme-ink">{patientName}</span>
              </div>

              <div className="flex justify-between items-center border-b border-theme-border/30 pb-3">
                <span className="text-theme-muted">Mobile Phone</span>
                <span className="font-medium text-theme-ink">{patientPhone}</span>
              </div>

              {patientEmail && (
                <div className="flex justify-between items-center border-b border-theme-border/30 pb-3">
                  <span className="text-theme-muted">Email</span>
                  <span className="font-medium text-theme-ink">{patientEmail}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-theme-muted">Location</span>
                <span className="font-medium text-theme-ink text-right">
                  Happy Valley Complex, Manpada, Thane
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-theme-card border border-theme-border flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="font-sans text-[13px] text-theme-muted leading-relaxed">
                Our front desk reception coordinator will call you to confirm health history questions during clinical desk hours.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-theme-border/40">
              <Button variant="outline" disabled={submitting} onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Details</span>
              </Button>
              <Button
                disabled={submitting}
                onClick={handleSubmitBooking}
                className="min-w-[180px] bg-primary text-white shadow-button"
              >
                {submitting ? 'Confirming...' : 'Confirm Reservation'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-sans text-theme-muted">Loading booking sanctuary...</div>}>
      <BookingFlow />
    </Suspense>
  );
}

