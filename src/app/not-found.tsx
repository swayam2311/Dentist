import React from 'react';
import Link from 'next/link';
import { Home, Search, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="max-w-[640px] mx-auto px-margin-mobile sm:px-margin py-24 sm:py-32 text-center flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-surface-container-high text-primary font-serif text-[32px] flex items-center justify-center mb-6 shadow-sm border border-theme-border/40">
        404
      </div>
      <h1 className="font-serif text-[36px] sm:text-[44px] text-primary font-normal leading-tight mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="font-sans text-[16px] text-on-surface-variant mb-10 leading-relaxed max-w-md">
        The page you are looking for may have moved or been updated. Please choose a destination below to continue navigating our clinic.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-sm hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-1 min-w-[140px]"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/treatments"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-surface-container-lowest border border-theme-border text-on-surface font-label-button text-label-button hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-1 min-w-[140px]"
        >
          <Search className="w-4 h-4" />
          <span>Treatments</span>
        </Link>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-button text-label-button hover:bg-secondary-fixed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Book an Appointment</span>
        </Link>
      </div>
    </main>
  );
}
