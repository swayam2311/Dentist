'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

export function MobileStickyBar() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high"
      aria-label="Mobile Quick Actions"
    >
      <div className="flex justify-between items-center h-20 px-space-md max-w-md mx-auto">
        {/* Call Clinic */}
        <a
          href={siteConfig.contact.landlineTel}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-space-xs py-1 rounded-full text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">call</span>
          <span className="font-label-caption text-label-caption mt-0.5">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-space-xs py-1 rounded-full text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">chat</span>
          <span className="font-label-caption text-label-caption mt-0.5">WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={siteConfig.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-space-xs py-1 rounded-full text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">near_me</span>
          <span className="font-label-caption text-label-caption mt-0.5">Directions</span>
        </a>

        {/* Book */}
        <Link
          href="/book"
          className="flex items-center justify-center gap-space-xs min-h-[48px] px-space-md py-space-xs bg-primary text-on-primary rounded-full font-label-button text-label-button shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">event_available</span>
          <span>Book</span>
        </Link>
      </div>
    </nav>
  );
}
