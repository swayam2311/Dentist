'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site.config';
import {
  Search,
  Calendar,
  Clock,
  User,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';

export default function BookingStatusPage() {
  const [referenceCode, setReferenceCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<any | null>(null);

  // Cancellation state
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAppointment(null);
    setCancelSuccess(null);

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appointments/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceCode: referenceCode.trim().toUpperCase(),
          phone: formattedPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to find appointment record.');
        setLoading(false);
        return;
      }

      setAppointment(data.appointment);
      setLoading(false);
    } catch {
      setError('Network error. Please try again or call the clinic directly.');
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointment) return;
    if (!confirm('Are you sure you wish to cancel this appointment request?')) return;

    setCancelling(true);
    setError(null);

    try {
      const res = await fetch('/api/appointments/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceCode: appointment.reference_code,
          phone: appointment.patient_phone,
          reason: 'Cancelled by patient via online status portal.',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not cancel appointment.');
        setCancelling(false);
        return;
      }

      setCancelSuccess('Your appointment has been cancelled successfully.');
      setAppointment({ ...appointment, status: 'cancelled' });
      setCancelling(false);
    } catch {
      setError('Failed to cancel appointment. Please call the clinic directly.');
      setCancelling(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-theme-secondary font-semibold block mb-2">
          Patient Portal
        </span>
        <h1 className="font-serif text-[34px] sm:text-[42px] text-primary font-normal leading-tight">
          Check Reservation Status
        </h1>
        <p className="font-sans text-[15px] text-theme-muted mt-2">
          Enter your reference code and registered mobile number to check the confirmation status of your consultation.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-theme-card rounded-[28px] p-6 sm:p-8 border border-theme-border shadow-ambient mb-8">
        <form onSubmit={handleLookup} className="flex flex-col gap-4">
          <Input
            label="Booking Reference Code"
            placeholder="e.g. GDC-4F7K"
            required
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value.toUpperCase())}
          />

          <Input
            label="Registered Mobile Number"
            placeholder="+91 99870 76628"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && (
            <div className="p-3.5 rounded-2xl bg-error-container text-on-error-container text-[13px] font-sans flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-error shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            <Search className="w-4 h-4 mr-2" />
            <span>{loading ? 'Searching...' : 'Look Up Reservation'}</span>
          </Button>
        </form>
      </div>

      {/* Appointment Result Card */}
      {appointment && (
        <div className="bg-theme-card rounded-[28px] p-6 sm:p-8 border border-theme-border shadow-ambient animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-theme-border/40 mb-5">
            <div>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-theme-secondary block">
                Reference Code
              </span>
              <span className="font-mono text-[18px] font-bold text-primary">
                {appointment.reference_code}
              </span>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold capitalize">
              {appointment.status === 'confirmed' && (
                <span className="bg-theme-secondary-container text-theme-ink px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Confirmed Visit
                </span>
              )}
              {appointment.status === 'pending' && (
                <span className="bg-theme-brass/10 text-theme-brass border border-theme-brass/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Pending Call Confirmation
                </span>
              )}
              {appointment.status === 'cancelled' && (
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Cancelled
                </span>
              )}
              {appointment.status === 'completed' && (
                <span className="bg-theme-container text-primary px-3 py-1 rounded-full">
                  Completed
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 font-sans text-[14px]">
            <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
              <span className="text-theme-muted">Patient Name</span>
              <span className="font-medium text-theme-ink">{appointment.patient_name}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
              <span className="text-theme-muted">Treatment</span>
              <span className="font-serif text-[16px] text-primary">
                {appointment.service?.name || 'General Dental Consultation'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
              <span className="text-theme-muted">Attending Clinician</span>
              <span className="font-medium text-theme-ink">
                {appointment.dentist?.full_name || 'Assigned Clinician'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-theme-border/30">
              <span className="text-theme-muted">Date &amp; Time</span>
              <span className="font-medium text-primary">
                {new Date(appointment.starts_at).toLocaleString('en-IN', {
                  timeZone: siteConfig.timezone,
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-theme-muted">Clinic Location</span>
              <span className="font-medium text-theme-ink">Manpada, Thane West</span>
            </div>
          </div>

          {cancelSuccess && (
            <div className="mt-5 p-3.5 rounded-2xl bg-theme-container text-primary text-[13px] font-sans">
              {cancelSuccess}
            </div>
          )}

          {/* Cancellation Option */}
          {['pending', 'confirmed'].includes(appointment.status) && (
            <div className="mt-6 pt-5 border-t border-theme-border/40 flex justify-between items-center">
              <span className="text-[13px] text-theme-muted font-sans">Need to change plans?</span>
              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancelAppointment}
                className="text-[13px] font-sans font-medium text-error hover:underline"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Reservation'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Return Actions */}
      <div className="text-center font-sans text-[14px]">
        <Link href="/book" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
          <span>Need to book a new appointment?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

