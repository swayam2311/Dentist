'use client';

import React, { useEffect, useState } from 'react';
import { getClinicStatus, type ClinicStatus } from '@/lib/hours';
import { Clock } from 'lucide-react';

export function ClinicStatusBadge({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<ClinicStatus | null>(null);

  useEffect(() => {
    // Initial calculation
    setStatus(getClinicStatus());

    // Recompute every 60 seconds
    const interval = setInterval(() => {
      setStatus(getClinicStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container/60 text-xs font-sans ${className}`}>
        <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <span className="text-theme-muted">Consultation Hours</span>
      </div>
    );
  }

  const badgeStyles = status.isOpen
    ? 'bg-theme-secondary-container/80 text-theme-ink border-theme-secondary/40'
    : 'bg-theme-container text-theme-muted border-theme-border/50';

  const dotColor = status.isOpen ? 'bg-primary' : 'bg-theme-brass';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium border shadow-sm backdrop-blur-sm transition-colors ${badgeStyles} ${className}`}
      title={status.nextSessionText || status.statusText}
    >
      <span className="relative flex h-2 w-2">
        {status.isOpen && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span>{status.statusText}</span>
    </div>
  );
}

