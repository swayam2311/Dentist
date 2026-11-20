'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  minDate?: string;     // YYYY-MM-DD
  maxDate?: string;     // YYYY-MM-DD
}

export function Calendar({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
}: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateStr = (d: number): string => {
    const mm = (month + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const effectiveMin = minDate || todayStr;

  return (
    <div className="w-full bg-theme-card rounded-[24px] p-5 sm:p-6 border border-theme-border/70 shadow-sm">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-[19px] sm:text-[21px] text-primary font-normal">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            disabled={month === today.getMonth() && year === today.getFullYear()}
            className="p-2 rounded-full text-theme-ink hover:bg-theme-container/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full text-theme-ink hover:bg-theme-container/60 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <span
            key={day}
            className={`font-sans text-[12px] font-semibold uppercase tracking-wider py-1 ${
              idx === 0 ? 'text-error/70' : 'text-theme-muted'
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {/* Blank cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}

        {/* Month Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = formatDateStr(dayNum);
          const dayOfWeek = (firstDayOfWeek + i) % 7;
          const isSunday = dayOfWeek === 0; // Clinic closed
          const isPast = dateStr < effectiveMin;
          const isBeyondMax = maxDate ? dateStr > maxDate : false;
          const isDisabled = isSunday || isPast || isBeyondMax;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(dateStr)}
              className={`h-10 w-full rounded-full font-sans text-[14px] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? 'bg-primary text-white font-semibold shadow-button scale-105'
                  : isDisabled
                  ? 'text-theme-muted/30 cursor-not-allowed line-through'
                  : 'text-theme-ink hover:bg-theme-container/70 active:scale-95'
              } ${isToday && !isSelected ? 'border border-primary/50 font-semibold text-primary' : ''}`}
              title={isSunday ? 'Closed on Sundays' : dateStr}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Sunday Note */}
      <div className="mt-4 pt-3 border-t border-theme-border/40 flex items-center justify-between text-[12px] text-theme-muted font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-error/70" />
          <span>Sunday: Closed</span>
        </span>
        <span className="text-primary font-medium">Asia/Kolkata time</span>
      </div>
    </div>
  );
}

