'use client';

import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';

export interface Slot {
  dentist_id: string;
  dentist_name: string;
  starts_at: string;
  ends_at: string;
  time_display: string;
  period: 'Morning' | 'Evening';
}

export interface SlotPickerProps {
  slots: Slot[];
  selectedSlotStartsAt: string | null;
  onSelectSlot: (slot: Slot) => void;
  loading?: boolean;
}

export function SlotPicker({
  slots,
  selectedSlotStartsAt,
  onSelectSlot,
  loading = false,
}: SlotPickerProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-theme-muted gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="font-sans text-[14px]">Loading available unhurried slots...</span>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="p-8 text-center rounded-[24px] bg-theme-container-low/60 border border-theme-border/50 text-theme-muted font-sans">
        <Clock className="w-8 h-8 mx-auto text-theme-secondary mb-2" />
        <p className="font-medium text-theme-ink text-[15px]">No online slots available for this date.</p>
        <p className="text-[13px] mt-1">
          Please select another date, or call reception at 022 25891949 for priority urgent assistance.
        </p>
      </div>
    );
  }

  const morningSlots = slots.filter((s) => s.period === 'Morning');
  const eveningSlots = slots.filter((s) => s.period === 'Evening');

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Morning Session */}
      {morningSlots.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 text-primary font-sans text-[13px] uppercase tracking-wider font-semibold">
            <Sun className="w-4 h-4 text-theme-brass" />
            <span>Morning Session (10:00 AM – 1:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {morningSlots.map((slot) => {
              const isSelected = selectedSlotStartsAt === slot.starts_at;
              return (
                <button
                  key={slot.starts_at + slot.dentist_id}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className={`min-h-[46px] px-3.5 py-2 rounded-full font-sans text-[14px] flex items-center justify-between border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isSelected
                      ? 'bg-primary text-white font-semibold border-primary shadow-button scale-102'
                      : 'bg-theme-card text-theme-ink border-theme-border/70 hover:border-primary hover:bg-theme-container/50'
                  }`}
                >
                  <span>{slot.time_display}</span>
                  <span
                    className={`text-[11px] font-sans px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-theme-container text-theme-muted'
                    }`}
                  >
                    30m
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Evening Session */}
      {eveningSlots.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 text-primary font-sans text-[13px] uppercase tracking-wider font-semibold">
            <Moon className="w-4 h-4 text-primary" />
            <span>Evening Session (6:00 PM – 10:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {eveningSlots.map((slot) => {
              const isSelected = selectedSlotStartsAt === slot.starts_at;
              return (
                <button
                  key={slot.starts_at + slot.dentist_id}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className={`min-h-[46px] px-3.5 py-2 rounded-full font-sans text-[14px] flex items-center justify-between border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isSelected
                      ? 'bg-primary text-white font-semibold border-primary shadow-button scale-102'
                      : 'bg-theme-card text-theme-ink border-theme-border/70 hover:border-primary hover:bg-theme-container/50'
                  }`}
                >
                  <span>{slot.time_display}</span>
                  <span
                    className={`text-[11px] font-sans px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-theme-container text-theme-muted'
                    }`}
                  >
                    30m
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

