'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

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
    name: 'Free First Consultation',
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
    name: 'Teeth Whitening Consultation',
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
    name: 'Cleaning & Preventive Care',
    duration: '30 Min',
    category: 'General',
  },
];

interface Slot {
  starts_at: string;
  ends_at: string;
  time_display: string;
  dentist_id: string;
  dentist_name: string;
}

const specialistList = [
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    value: 'anand',
    name: 'Dr. Anand Gangal',
    role: 'Principal Dentist',
    specialty: 'Restorative & Implants',
    experience: 'Manpada, Thane',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_r_PSSa9PJDCeO8gpVjMUfRlJehCKE7l4SFEurQkq0EsOGDb48xKpCAxoK44FAN626-K2_Oxhy9MB37kHUBT4kt9Si4YJq2Y1sZE4902Kfy6BUBOwSLiXH6yFe7J2kBG5Bv0sjLgiCypgGDEBcDlhOB7h7L7qqjAWFNWZwrpo4gszHcUbF7AfZ4mxbycAQqojdT1dUOJUttAZqxi87oh3oogbgUrHNIYuh4Soy-Ha',
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    value: 'padma',
    name: 'Dr. Padma Kurup',
    role: 'Associate Dentist',
    specialty: 'Pediatric & Family Care',
    experience: 'Anxiety-Free Specialist',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4zv7U8kS8crq8WeyMLRokdrxFAV5fJomw6ztoztgKDTKTItfJq9_x4bY3RNE_LYRYReOs7sZlNQwAXFKyBK1BE8i7CdRKCTEmJt3FfJSsOUE1g22qb4Z6md7TvLs_jXQvG9PSBNe0XQEf254rnu3mYeSjmHdace1GvsK8r4AB_hsSPlpGCiob2csoew5fJA3JimaK-08TG1VRAZvdxbyfTkGxQIYAKUhNXAJ8ileM',
  },
  {
    id: 'first_available',
    value: 'first_available',
    name: 'First Available Doctor',
    role: 'Earliest Open Consulting Suite',
    specialty: 'Fastest Confirmation',
    experience: 'Immediate Assignment',
    icon: 'event_available',
  },
];

function BookingFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active sub-step: 'schedule' (Step 1 & 2 in Stitch) | 'details' (Step 3) | 'service_modal'
  const [activeStep, setActiveStep] = useState<2 | 3>(2);

  // Selected Service
  const [selectedService, setSelectedService] = useState<ServiceOption>(() => {
    const slug = searchParams.get('service');
    return availableServices.find((s) => s.slug === slug) || availableServices[0];
  });
  const [showServicePicker, setShowServicePicker] = useState(false);

  // Selected Specialist
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('anand');

  // Month navigation: year and month (0-indexed)
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());

  // Selected Date string YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // Skip Sunday
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  // Available Slots from API
  const [slots, setSlots] = useState<Slot[]>([]);
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

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch slots whenever date, service, or specialist changes
  useEffect(() => {
    let isMounted = true;
    setLoadingSlots(true);
    setErrorMessage(null);

    const dentistId =
      selectedSpecialist === 'anand'
        ? specialistList[0].id
        : selectedSpecialist === 'padma'
        ? specialistList[1].id
        : 'first_available';

    fetch(`/api/slots?serviceId=${selectedService.id}&dentistId=${dentistId}&date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const fetchedSlots: Slot[] = data.slots || [];
        setSlots(fetchedSlots);
        setLoadingSlots(false);
        // Pre-select first available slot if current selectedSlot is not in list
        if (fetchedSlots.length > 0 && (!selectedSlot || !fetchedSlots.some((s) => s.starts_at === selectedSlot.starts_at))) {
          setSelectedSlot(fetchedSlots[0]);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedService.id, selectedSpecialist]);

  // Calendar Day Generation
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Monday is index 0 in our layout (0=Mon, 1=Tue... 6=Sun)
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const days = [];
    // Blank padding for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }

    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const isSunday = dateObj.getDay() === 0;
      const isPast = dateObj.getTime() < todayStart;
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = dateStr === selectedDate;

      days.push({
        type: 'day',
        dayNumber: d,
        dateStr,
        isSunday,
        isPast,
        isSelected,
        key: `day-${d}`,
      });
    }

    return days;
  }, [currentYear, currentMonth, selectedDate, today]);

  // Split slots into Morning (before 13:00) and Evening (from 18:00)
  const { morningSlots, eveningSlots } = useMemo(() => {
    const morning: Slot[] = [];
    const evening: Slot[] = [];

    slots.forEach((s) => {
      const hour = new Date(s.starts_at).getUTCHours() + 5.5; // Asia/Kolkata approx or parse time_display
      const isEve = s.time_display.includes('PM') && !s.time_display.startsWith('12:');
      if (isEve) {
        evening.push(s);
      } else {
        morning.push(s);
      }
    });

    return { morningSlots: morning, eveningSlots: evening };
  }, [slots]);

  // Month formatting label
  const monthLabel = useMemo(() => {
    const d = new Date(currentYear, currentMonth, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Human formatted selected date
  const formattedSelectedDate = useMemo(() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [selectedDate]);

  // Selected specialist object
  const currentSpecialistObj = useMemo(() => {
    return specialistList.find((s) => s.value === selectedSpecialist) || specialistList[0];
  }, [selectedSpecialist]);

  // Submit appointment to backend
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedSlot) {
      setErrorMessage('Please select a time slot.');
      setActiveStep(2);
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please provide consent under DPDP Act to submit your reservation.');
      return;
    }

    let formattedPhone = patientPhone.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          dentistId: selectedSpecialist === 'first_available' ? null : currentSpecialistObj.id,
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

      // Redirect to confirmed page
      const queryParams = new URLSearchParams({
        ref: result.referenceCode,
        name: patientName,
        service: selectedService.name,
        time: selectedSlot.time_display,
        date: formattedSelectedDate,
        startsAt: selectedSlot.starts_at,
        dentist: selectedSlot.dentist_name || currentSpecialistObj.name,
      });

      router.push(`/book/confirmed?${queryParams.toString()}`);
    } catch {
      setErrorMessage('Network connection error. Please call the clinic directly at 022 2589 1949.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Atmospheric background aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-gradient-to-b from-surface-container-high/40 via-surface-container/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      {/* Intro & Breadcrumb Header Section */}
      <section className="w-full max-w-[1200px] mx-auto px-margin-mobile lg:px-margin pt-space-lg pb-space-md text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-eyebrow text-label-eyebrow uppercase tracking-widest shadow-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>SEAMLESS &amp; UNHURRIED SCHEDULING</span>
        </div>
        <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight max-w-3xl">
          Reserve your <span className="italic font-headline-lg text-primary">quiet</span> consultation
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-3 text-center">
          Choose your preferred specialist and time. Every appointment is reserved exclusively for you with generous unhurried time.
        </p>

        {/* Clinic Sensory Affirmation Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-on-surface-variant font-label-caption text-label-caption">
          <span className="inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span>Zero Waiting Room Congestion</span>
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-outline-variant" />
          <span className="inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">volume_off</span>
            <span>Acoustically Dampened Suites</span>
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-outline-variant" />
          <span className="inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">spa</span>
            <span>Aromatherapeutic Air Filtration</span>
          </span>
        </div>
      </section>

      {/* Main Booking Sanctuary Card */}
      <section className="w-full max-w-[980px] mx-auto px-margin-mobile lg:px-4 mb-space-xl">
        <div className="w-full bg-surface-container-lowest rounded-lg shadow-[0_16px_40px_-6px_rgba(0,82,85,0.07)] border border-white/60 p-6 md:p-10 transition-all">
          {/* Step Navigation (Progress System matching Stitch) */}
          <nav aria-label="Booking Progress" className="w-full mb-10">
            <ol className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
              {/* Step 1: Completed / Active */}
              <li
                onClick={() => setShowServicePicker(true)}
                className="flex items-center gap-3 p-3 rounded-full bg-surface-container-low transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div className="min-w-0">
                  <span className="block font-label-eyebrow text-[10px] text-secondary uppercase tracking-wider">
                    Step 01
                  </span>
                  <span className="block font-label-button text-label-button text-primary truncate">
                    {selectedService.name}
                  </span>
                </div>
              </li>

              {/* Step 2: Day & Time */}
              <li
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-3 p-3 rounded-full transition-all cursor-pointer relative overflow-hidden ${
                  activeStep === 2
                    ? 'bg-primary-container text-on-primary shadow-md'
                    : 'bg-surface-container-low/70 text-on-surface'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                    activeStep === 2 ? 'bg-on-primary text-primary' : 'bg-primary text-on-primary'
                  }`}
                >
                  02
                </div>
                <div className="min-w-0">
                  <span
                    className={`block font-label-eyebrow text-[10px] uppercase tracking-wider ${
                      activeStep === 2 ? 'text-primary-fixed font-semibold' : 'text-secondary'
                    }`}
                  >
                    {activeStep === 2 ? 'Active Step' : 'Step 02'}
                  </span>
                  <span
                    className={`block font-label-button text-label-button truncate ${
                      activeStep === 2 ? 'text-on-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    Day &amp; Time
                  </span>
                </div>
                {activeStep === 2 && (
                  <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-on-primary/10 pointer-events-none" />
                )}
              </li>

              {/* Step 3: Your Details */}
              <li
                onClick={() => {
                  if (selectedSlot) setActiveStep(3);
                }}
                className={`flex items-center gap-3 p-3 rounded-full transition-all cursor-pointer relative overflow-hidden ${
                  activeStep === 3
                    ? 'bg-primary-container text-on-primary shadow-md'
                    : 'bg-surface-container-low/50 opacity-60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-medium text-sm ${
                    activeStep === 3
                      ? 'bg-on-primary text-primary font-bold'
                      : 'bg-surface-variant text-on-surface-variant'
                  }`}
                >
                  03
                </div>
                <div className="min-w-0">
                  <span
                    className={`block font-label-eyebrow text-[10px] uppercase tracking-wider ${
                      activeStep === 3 ? 'text-primary-fixed font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    {activeStep === 3 ? 'Active Step' : 'Step 03'}
                  </span>
                  <span
                    className={`block font-label-button text-label-button truncate ${
                      activeStep === 3 ? 'text-on-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    Your Details
                  </span>
                </div>
                {activeStep === 3 && (
                  <div className="absolute -right-3 -top-3 w-10 h-10 rounded-full bg-on-primary/10 pointer-events-none" />
                )}
              </li>

              {/* Step 4: Confirmation */}
              <li className="flex items-center gap-3 p-3 rounded-full bg-surface-container-low/50 opacity-60">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center shrink-0 text-on-surface-variant font-medium text-sm">
                  04
                </div>
                <div className="min-w-0">
                  <span className="block font-label-eyebrow text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Step 04
                  </span>
                  <span className="block font-label-button text-label-button text-on-surface truncate">
                    Confirmation
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-DEFAULT bg-error-container text-on-error-container text-body-md flex items-center gap-3 border border-error/20">
              <span className="material-symbols-outlined text-error text-[22px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Service Picker Dropdown / Modal */}
          {showServicePicker && (
            <div className="mb-8 p-6 rounded-DEFAULT bg-surface-container-low border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-sm text-primary">Choose Your Clinical Service</h3>
                <button
                  onClick={() => setShowServicePicker(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setShowServicePicker(false);
                    }}
                    className={`p-3.5 rounded-DEFAULT cursor-pointer transition-all border ${
                      selectedService.id === service.id
                        ? 'bg-surface-container-lowest border-primary ring-2 ring-primary/20'
                        : 'bg-surface-container-lowest/60 border-surface-container hover:bg-surface-container-lowest'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-button text-primary font-semibold">{service.name}</span>
                      <span className="text-[12px] text-secondary font-medium">{service.duration}</span>
                    </div>
                    {service.isFree && (
                      <span className="font-label-caption text-[11px] text-tertiary block mt-1">
                        ✨ Complimentary Consultation · No Obligation
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              STEP 2 VIEW: SPECIALIST + CALENDAR + TIME SLOTS
              ================================================================= */}
          {activeStep === 2 && (
            <div className="flex flex-col gap-8">
              {/* 1. Specialist Selector */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">medical_services</span>
                    Select Clinical Specialist
                  </span>
                  <span className="font-label-caption text-label-caption text-on-surface-variant hidden sm:inline">
                    Personalized individual treatment suite
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="specialist-selector">
                  {specialistList.map((doc) => {
                    const isSelected = selectedSpecialist === doc.value;
                    return (
                      <label
                        key={doc.value}
                        onClick={() => setSelectedSpecialist(doc.value)}
                        className={`relative flex flex-col p-4 rounded-DEFAULT cursor-pointer transition-all shadow-sm ${
                          isSelected
                            ? 'bg-surface-container-low ring-2 ring-primary'
                            : 'bg-surface-container-lowest hover:bg-surface-container-low'
                        }`}
                      >
                        <input
                          className="sr-only"
                          name="specialist"
                          type="radio"
                          value={doc.value}
                          checked={isSelected}
                          onChange={() => setSelectedSpecialist(doc.value)}
                        />
                        <div className="flex items-start justify-between w-full mb-3">
                          {doc.image ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant relative shadow-inner">
                              <img className="w-full h-full object-cover" alt={doc.name} src={doc.image} />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-secondary-container/60 text-on-secondary-container flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[24px]">event_available</span>
                            </div>
                          )}
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all ${
                              isSelected
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-variant text-transparent'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                        </div>
                        <span className="font-headline-sm text-[18px] leading-tight text-on-surface font-semibold">
                          {doc.name}
                        </span>
                        <span className="font-label-caption text-label-caption text-secondary mt-1">
                          {doc.role}
                        </span>
                        <span className="mt-3 inline-flex items-center gap-1 font-label-caption text-[11px] text-tertiary">
                          <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                          {doc.specialty}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. Dual Column Scheduling Interface (Calendar + Time Slots) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                {/* Calendar Column (7 Cols on desktop) */}
                <div className="lg:col-span-7 bg-surface-container-low/60 rounded-DEFAULT p-6 flex flex-col justify-between">
                  <div>
                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">{monthLabel}</h2>
                        <p className="font-label-caption text-label-caption text-on-surface-variant">
                          Select your preferred date of arrival
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Previous month"
                          className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container-high transition-colors shadow-sm text-on-surface-variant"
                          type="button"
                          onClick={handlePrevMonth}
                        >
                          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button
                          aria-label="Next month"
                          className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container-high transition-colors shadow-sm text-on-surface-variant"
                          type="button"
                          onClick={handleNextMonth}
                        >
                          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* Calendar Weekdays */}
                    <div className="grid grid-cols-7 gap-1 text-center font-label-eyebrow text-[11px] text-secondary font-bold tracking-wider mb-2">
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                      <span className="text-error/70">SUN</span>
                    </div>

                    {/* Calendar Dates Grid */}
                    <div className="grid grid-cols-7 gap-1.5 text-center font-body-md text-[14px]">
                      {calendarDays.map((item) => {
                        if (item.type === 'empty') {
                          return <span key={item.key} className="py-2.5 opacity-0 select-none" />;
                        }

                        if (item.isSunday) {
                          return (
                            <span
                              key={item.key}
                              className="py-2.5 text-outline-variant bg-surface-container/30 rounded-full select-none text-[11px] font-medium flex items-center justify-center"
                            >
                              Closed
                            </span>
                          );
                        }

                        if (item.isPast) {
                          return (
                            <span
                              key={item.key}
                              className="py-2.5 text-outline-variant line-through rounded-full select-none cursor-not-allowed"
                            >
                              {item.dayNumber}
                            </span>
                          );
                        }

                        if (item.isSelected) {
                          return (
                            <button
                              key={item.key}
                              className="py-2 rounded-full bg-primary text-on-primary font-bold shadow-md relative scale-105"
                              type="button"
                            >
                              {item.dayNumber}
                              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-fixed rounded-full" />
                            </button>
                          );
                        }

                        return (
                          <button
                            key={item.key}
                            onClick={() => setSelectedDate(item.dateStr!)}
                            className="py-2 rounded-full hover:bg-surface-container-high transition-colors font-medium text-on-surface"
                            type="button"
                          >
                            {item.dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calendar Helper Caption */}
                  <div className="mt-6 pt-4 flex items-center gap-2 text-on-surface-variant font-label-caption text-[12px] bg-surface-container-lowest/70 px-3.5 py-2 rounded-full">
                    <span className="material-symbols-outlined text-secondary text-[16px]">sanitizer</span>
                    <span>Sundays reserved strictly for medical-grade sterilization. Desk answers queries 24/7.</span>
                  </div>
                </div>

                {/* Time Slots Column (5 Cols on desktop) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-6">
                    {/* Slot Header info */}
                    <div className="flex items-center justify-between pb-1">
                      <div>
                        <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase tracking-widest block">
                          Available Slots
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {formattedSelectedDate}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-caption text-[11px] px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {loadingSlots ? 'Checking...' : `${slots.length} Open`}
                      </span>
                    </div>

                    {loadingSlots ? (
                      <div className="py-8 text-center text-on-surface-variant font-body-md animate-pulse">
                        Finding unhurried slots...
                      </div>
                    ) : slots.length === 0 ? (
                      <div className="py-8 text-center text-on-surface-variant font-body-md">
                        No open online slots on this date. Please call 022 2589 1949 for priority desk accommodation.
                      </div>
                    ) : (
                      <>
                        {/* Morning Sessions */}
                        {morningSlots.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 text-secondary mb-3 font-label-button text-[13px]">
                              <span className="material-symbols-outlined text-[18px] text-tertiary">wb_sunny</span>
                              <span>Morning Sessions (10:00 AM – 01:00 PM)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                              {morningSlots.map((slot) => {
                                const isSelected = selectedSlot?.starts_at === slot.starts_at;
                                return (
                                  <button
                                    key={slot.starts_at}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2.5 px-3 rounded-full font-label-button text-label-button text-center transition-all ${
                                      isSelected
                                        ? 'bg-primary text-on-primary shadow-md flex items-center justify-center gap-1.5 ring-2 ring-primary-fixed'
                                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface shadow-sm'
                                    }`}
                                  >
                                    {isSelected && (
                                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    )}
                                    <span>{slot.time_display}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Evening Sessions */}
                        {eveningSlots.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 text-secondary mb-3 font-label-button text-[13px]">
                              <span className="material-symbols-outlined text-[18px] text-primary">nights_stay</span>
                              <span>Evening Sessions (06:00 PM – 10:00 PM)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {eveningSlots.map((slot) => {
                                const isSelected = selectedSlot?.starts_at === slot.starts_at;
                                return (
                                  <button
                                    key={slot.starts_at}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2.5 px-2 rounded-full font-label-button text-label-button text-center transition-all ${
                                      isSelected
                                        ? 'bg-primary text-on-primary shadow-md ring-2 ring-primary-fixed'
                                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface shadow-sm'
                                    }`}
                                  >
                                    {slot.time_display}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Sensory Buffer Assurance */}
                    <div className="mt-6 p-3.5 rounded-DEFAULT bg-secondary-container/30 text-on-surface flex items-start gap-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                        hourglass_bottom
                      </span>
                      <p className="font-label-caption text-label-caption leading-relaxed">
                        <strong className="font-semibold text-primary">Generous buffer</strong> between all sessions ensures zero rushed transitions and total sensory calm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrated Summary Strip & Action Bar */}
              <div className="mt-10 pt-6 bg-surface-container-low/80 rounded-DEFAULT p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-inner border border-white/60">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                  {/* Selected Service Summary */}
                  <div className="flex flex-col">
                    <span className="font-label-eyebrow text-[11px] text-secondary uppercase tracking-wider">
                      Service Reserved
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                        {selectedService.name}
                      </span>
                      {selectedService.isFree && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-caption text-[11px] font-bold">
                          ₹0 · No Obligation
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-8 bg-outline-variant/40" />

                  {/* Date & Doctor Summary */}
                  <div className="flex flex-col">
                    <span className="font-label-eyebrow text-[11px] text-secondary uppercase tracking-wider">
                      Slot &amp; Clinician
                    </span>
                    <span className="font-headline-sm text-[16px] text-primary font-semibold mt-0.5">
                      {formattedSelectedDate} · {selectedSlot ? selectedSlot.time_display : 'Select slot'} · {currentSpecialistObj.name}
                    </span>
                  </div>
                </div>

                {/* Next Action Button */}
                <div className="w-full md:w-auto flex items-center justify-end">
                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => {
                      if (!selectedSlot) {
                        setErrorMessage('Please select a time slot.');
                        return;
                      }
                      setActiveStep(3);
                    }}
                    className="w-full md:w-auto inline-flex items-center justify-center min-h-[52px] px-8 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_8px_20px_-2px_rgba(0,82,85,0.3)] hover:bg-primary-container transition-all hover:-translate-y-0.5 duration-200 gap-2 text-center disabled:opacity-50"
                  >
                    <span>Continue to Your Details</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              STEP 3 VIEW: PATIENT DETAILS & CONFIRMATION FORM
              ================================================================= */}
          {activeStep === 3 && (
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div>
                  <span className="font-label-eyebrow text-secondary uppercase tracking-widest block">Step 03 of 04</span>
                  <h2 className="font-headline-md text-headline-md text-primary mt-0.5">Your Details &amp; Boundaries</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="inline-flex items-center gap-1 font-label-button text-[13px] text-secondary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Change Slot</span>
                </button>
              </div>

              {/* Reserved Slot Pill */}
              <div className="p-4 rounded-DEFAULT bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="font-label-eyebrow text-[11px] text-secondary uppercase block">Hold Details</span>
                  <span className="font-headline-sm text-[16px] text-primary font-semibold">
                    {selectedService.name} · {formattedSelectedDate} at {selectedSlot?.time_display}
                  </span>
                  <p className="font-label-caption text-on-surface-variant mt-0.5">
                    Attending: {currentSpecialistObj.name}
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]">event_available</span>
              </div>

              <form onSubmit={handleSubmitBooking} className="flex flex-col gap-space-md">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-button text-[14px] text-on-surface" htmlFor="book-full-name">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="book-full-name"
                      required
                      type="text"
                      placeholder="e.g. Asmita Patil"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                      person
                    </span>
                  </div>
                </div>

                {/* Coordinates (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-button text-[14px] text-on-surface" htmlFor="book-phone">
                      Mobile Number <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="book-phone"
                        required
                        type="tel"
                        placeholder="+91 99870 76628"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                        smartphone
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-button text-[14px] text-on-surface" htmlFor="book-email">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <input
                        id="book-email"
                        type="email"
                        placeholder="you@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full h-[52px] px-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 text-[20px] pointer-events-none">
                        alternate_email
                      </span>
                    </div>
                  </div>
                </div>

                {/* First time vs returning */}
                <div className="flex flex-col gap-2">
                  <span className="font-label-button text-[14px] text-on-surface">Patient Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      onClick={() => setIsNewPatient(true)}
                      className={`flex items-center justify-between p-3 rounded-DEFAULT cursor-pointer transition-colors ${
                        isNewPatient ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface'
                      }`}
                    >
                      <span className="font-label-caption text-label-caption font-semibold">New Patient</span>
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                    </label>
                    <label
                      onClick={() => setIsNewPatient(false)}
                      className={`flex items-center justify-between p-3 rounded-DEFAULT cursor-pointer transition-colors ${
                        !isNewPatient ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface'
                      }`}
                    >
                      <span className="font-label-caption text-label-caption font-semibold">Returning Patient</span>
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    </label>
                  </div>
                </div>

                {/* Reply Mode */}
                <div className="flex flex-col gap-2">
                  <span className="font-label-button text-[14px] text-on-surface">Preferred Confirmation Channel</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['phone', 'whatsapp', 'email'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setReplyPreference(ch)}
                        className={`p-3 rounded-DEFAULT capitalize text-[13px] font-label-button transition-colors flex items-center justify-center gap-1.5 ${
                          replyPreference === ch
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {ch === 'phone' ? 'call' : ch === 'whatsapp' ? 'chat' : 'mail'}
                        </span>
                        <span>{ch}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-button text-[14px] text-on-surface" htmlFor="book-notes">
                    Sensory Comfort or Health Notes (Optional)
                  </label>
                  <textarea
                    id="book-notes"
                    rows={3}
                    placeholder="Tell us about tooth sensitivity, sound anxiety, or anything you'd like Dr. Gangal to know beforehand..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-space-md rounded-DEFAULT bg-surface text-on-surface placeholder-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-md text-body-md resize-none"
                  />
                </div>

                {/* DPDP Act Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-1 rounded text-primary focus:ring-primary"
                    />
                    <span className="font-label-caption text-label-caption text-on-surface-variant leading-relaxed">
                      I consent to Gangal Dental Clinic processing my contact details to schedule this appointment in compliance with India's Digital Personal Data Protection (DPDP) Act 2023. View our{' '}
                      <Link href="/privacy" className="text-primary underline font-medium">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="preferred_clinic_source"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  autoComplete="off"
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center min-h-[50px] px-6 rounded-full bg-surface text-on-surface font-label-button text-label-button hover:bg-surface-container transition-colors"
                  >
                    <span>Back to Calendar</span>
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !patientName.trim() || !patientPhone.trim() || !consentGiven}
                    className="w-full sm:flex-1 inline-flex items-center justify-center min-h-[50px] px-8 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_6px_20px_-2px_rgba(0,82,85,0.3)] hover:bg-primary-container transition-all hover:-translate-y-0.5 duration-200 gap-2 disabled:opacity-50"
                  >
                    <span>{submitting ? 'Confirming Reservation...' : 'Complete & Reserve Slot'}</span>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Urgent Help Reassurance Line */}
      <section className="w-full max-w-[980px] mx-auto px-margin-mobile text-center pb-space-lg">
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-6 py-3 rounded-full bg-surface-container-lowest shadow-sm mx-auto border border-white/60">
          <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
          <span className="font-body-md text-body-md text-on-surface-variant">
            Experiencing acute discomfort or dental trauma?
          </span>
          <a
            className="font-label-button text-label-button text-primary hover:text-primary-container underline underline-offset-4 inline-flex items-center gap-1"
            href={siteConfig.contact.landlineTel}
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call 022 2589 1949 for Priority Same-Day Relief</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-body-md text-on-surface-variant">
          Loading booking sanctuary...
        </div>
      }
    >
      <BookingFlowContent />
    </Suspense>
  );
}
