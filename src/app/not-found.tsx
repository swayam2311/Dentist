import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-20 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-theme-container text-primary font-serif text-[28px] flex items-center justify-center mb-6">
        404
      </div>
      <h1 className="font-serif text-[32px] sm:text-[40px] text-primary font-normal leading-tight mb-3">
        Page Not Found
      </h1>
      <p className="font-sans text-[16px] text-theme-muted mb-8 leading-relaxed">
        The page you are looking for may have been relocated or updated as part of our clinic website upgrade.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-sans text-[14px] font-medium shadow-button hover:bg-theme-primary-container transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/treatments"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-card border border-theme-border text-theme-ink font-sans text-[14px] font-medium hover:bg-theme-container transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse Treatments</span>
        </Link>
      </div>
    </div>
  );
}

