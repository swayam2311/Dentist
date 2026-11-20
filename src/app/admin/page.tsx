'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site.config';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Search,
  Download,
  Filter,
  User,
  AlertCircle,
  RefreshCw,
  Bell,
  Mail,
} from 'lucide-react';

export default function StaffAdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [contactRequests, setContactRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'contacts'>('appointments');

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dentistFilter, setDentistFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notificationAlert, setNotificationAlert] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/appointments');
      const data = await res.json();
      setAppointments(data.appointments || []);
      setContactRequests(data.contactRequests || []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 30 seconds for new appointments
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, newStatus }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
        );
        setNotificationAlert(`Appointment status updated to ${newStatus}.`);
        setTimeout(() => setNotificationAlert(null), 3000);
      }
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Reference Code',
      'Patient Name',
      'Phone',
      'Email',
      'Service',
      'Dentist',
      'Starts At (Asia/Kolkata)',
      'Status',
      'New Patient',
      'Notes',
    ];

    const rows = appointments.map((a) => [
      a.reference_code,
      `"${a.patient_name.replace(/"/g, '""')}"`,
      a.patient_phone,
      a.patient_email || '',
      `"${(a.service?.name || '').replace(/"/g, '""')}"`,
      `"${(a.dentist?.full_name || '').replace(/"/g, '""')}"`,
      new Date(a.starts_at).toLocaleString('en-IN', { timeZone: siteConfig.timezone }),
      a.status,
      a.is_new_patient ? 'Yes' : 'No',
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Gangal-Appointments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAppointments = appointments.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (dentistFilter !== 'all' && a.dentist?.id !== dentistFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = a.patient_name?.toLowerCase().includes(q);
      const matchPhone = a.patient_phone?.includes(q);
      const matchRef = a.reference_code?.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchRef) return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-container text-xs font-sans text-primary font-semibold uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Reception &amp; Clinician Desk</span>
          </div>
          <h1 className="font-serif text-[32px] sm:text-[38px] text-primary font-normal leading-tight">
            Clinic Operations Portal
          </h1>
          <p className="font-sans text-[14px] text-theme-muted">
            Gangal Dental Clinic, Happy Valley Shopping Complex, Manpada, Thane
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchData}
            className="p-2.5 rounded-full bg-theme-card border border-theme-border text-primary hover:bg-theme-container transition-colors"
            title="Refresh records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-theme-card border border-theme-border font-sans text-[13px] font-medium text-theme-ink hover:bg-theme-container transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notificationAlert && (
        <div className="mb-6 p-4 rounded-2xl bg-theme-container text-primary text-[14px] font-sans flex items-center gap-3 border border-primary/20 animate-in fade-in">
          <Bell className="w-5 h-5 text-primary" />
          <span>{notificationAlert}</span>
        </div>
      )}

      {/* View Tabs */}
      <div className="flex items-center gap-2 border-b border-theme-border/40 pb-3 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-2 rounded-full font-sans text-[14px] font-medium transition-colors ${
            activeTab === 'appointments'
              ? 'bg-primary text-white shadow-button'
              : 'text-theme-muted hover:text-primary hover:bg-theme-container-low'
          }`}
        >
          Appointments ({appointments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contacts')}
          className={`px-5 py-2 rounded-full font-sans text-[14px] font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'bg-primary text-white shadow-button'
              : 'text-theme-muted hover:text-primary hover:bg-theme-container-low'
          }`}
        >
          Inquiries ({contactRequests.length})
        </button>
      </div>

      {activeTab === 'appointments' ? (
        <div className="flex flex-col gap-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-[24px] bg-theme-card border border-theme-border shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by patient name, phone, or reference code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-theme-container-low border border-theme-border/50 text-[13px] font-sans text-theme-ink focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-full bg-theme-container-low border border-theme-border/50 text-[13px] font-sans text-theme-ink focus:outline-none focus:border-primary"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>

              <select
                value={dentistFilter}
                onChange={(e) => setDentistFilter(e.target.value)}
                className="px-3 py-2 rounded-full bg-theme-container-low border border-theme-border/50 text-[13px] font-sans text-theme-ink focus:outline-none focus:border-primary"
              >
                <option value="all">All Clinicians</option>
                <option value="d1111111-1111-1111-1111-111111111111">Dr. Anand Gangal</option>
                <option value="d2222222-2222-2222-2222-222222222222">Dr. Padma Kurup</option>
              </select>
            </div>
          </div>

          {/* Appointments Table / Cards */}
          <div className="bg-theme-card rounded-[28px] border border-theme-border shadow-ambient overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-[14px]">
                <thead className="bg-theme-container-low/80 border-b border-theme-border/60 text-[12px] uppercase tracking-wider text-theme-secondary font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Ref Code</th>
                    <th className="py-3.5 px-5">Patient &amp; Contact</th>
                    <th className="py-3.5 px-5">Treatment</th>
                    <th className="py-3.5 px-5">Clinician</th>
                    <th className="py-3.5 px-5">Date &amp; Time</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-border/30">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-theme-muted">
                        No appointments match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => {
                      const cleanPhone = apt.patient_phone.replace(/\D/g, '');
                      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${apt.patient_name}, this is Sayali from Gangal Dental Clinic regarding your consultation (Ref: ${apt.reference_code}).`
                      )}`;

                      return (
                        <tr key={apt.id} className="hover:bg-theme-container-low/30 transition-colors">
                          <td className="py-4 px-5">
                            <span className="font-mono text-[14px] font-bold text-primary">
                              {apt.reference_code}
                            </span>
                            {apt.is_new_patient && (
                              <span className="block text-[10px] uppercase font-semibold text-theme-secondary mt-0.5">
                                New Patient
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-5">
                            <div className="font-medium text-theme-ink">{apt.patient_name}</div>
                            <div className="text-[12px] text-theme-muted flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <a href={`tel:${apt.patient_phone}`} className="hover:underline">
                                {apt.patient_phone}
                              </a>
                            </div>
                            {apt.notes && (
                              <div className="text-[11px] text-theme-brass italic mt-1 max-w-xs truncate" title={apt.notes}>
                                Note: {apt.notes}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-5">
                            <div className="font-medium text-theme-ink">
                              {apt.service?.name || 'General Consultation'}
                            </div>
                            <div className="text-[12px] text-theme-muted">
                              {apt.service?.duration_minutes || 30} mins
                            </div>
                          </td>

                          <td className="py-4 px-5 text-theme-ink font-medium">
                            {apt.dentist?.full_name || 'Unassigned'}
                          </td>

                          <td className="py-4 px-5">
                            <div className="font-medium text-primary">
                              {new Date(apt.starts_at).toLocaleDateString('en-IN', {
                                timeZone: siteConfig.timezone,
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="text-[12px] text-theme-muted">
                              {new Date(apt.starts_at).toLocaleTimeString('en-IN', {
                                timeZone: siteConfig.timezone,
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>

                          <td className="py-4 px-5">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                                apt.status === 'confirmed'
                                  ? 'bg-theme-secondary-container text-theme-ink'
                                  : apt.status === 'pending'
                                  ? 'bg-theme-brass/10 text-theme-brass border border-theme-brass/30'
                                  : apt.status === 'cancelled'
                                  ? 'bg-error-container text-on-error-container'
                                  : 'bg-theme-container text-theme-muted'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-theme-secondary-container text-theme-ink hover:bg-theme-secondary transition-colors"
                                title="Message Patient on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                              </a>

                              {apt.status === 'pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                  className="px-3 py-1 rounded-full bg-primary text-white text-[12px] font-medium hover:bg-theme-primary-container transition-colors shadow-sm"
                                  title="Confirm appointment"
                                >
                                  Confirm
                                </button>
                              )}

                              {apt.status === 'confirmed' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(apt.id, 'completed')}
                                  className="px-3 py-1 rounded-full bg-theme-container text-primary text-[12px] font-medium hover:bg-theme-container-high transition-colors"
                                  title="Mark as completed"
                                >
                                  Done
                                </button>
                              )}

                              {['pending', 'confirmed'].includes(apt.status) && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                  className="p-1.5 rounded-full text-error hover:bg-error-container/40 transition-colors"
                                  title="Cancel appointment"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Inquiries Tab */
        <div className="flex flex-col gap-4">
          {contactRequests.length === 0 ? (
            <div className="p-12 text-center rounded-[28px] bg-theme-card border border-theme-border text-theme-muted font-sans">
              No new contact inquiries.
            </div>
          ) : (
            contactRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 rounded-[24px] bg-theme-card border border-theme-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-[18px] text-primary">{req.name}</h3>
                    <span className="text-[12px] text-theme-secondary font-medium">
                      via {req.reply_preference}
                    </span>
                  </div>
                  <div className="text-[13px] text-theme-muted flex items-center gap-3 mb-2">
                    <span>Phone: {req.phone}</span>
                    {req.email && <span>Email: {req.email}</span>}
                  </div>
                  <p className="text-[14px] text-theme-ink bg-theme-container-low/60 p-3 rounded-xl border border-theme-border/40">
                    {req.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-center">
                  <a
                    href={`tel:${req.phone}`}
                    className="p-2.5 rounded-full bg-theme-container text-primary hover:bg-theme-container-high transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${req.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hello ${req.name}, this is Gangal Dental Clinic in response to your website message.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-theme-secondary-container text-theme-ink hover:bg-theme-secondary transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

