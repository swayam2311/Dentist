'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { Phone, MessageCircle, Navigation, Calendar } from 'lucide-react';

export function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-theme-card/94 backdrop-blur-xl border-t border-theme-border/60 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,46,51,0.08)]"
      role="region"
      aria-label="Quick Actions"
    >
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {/* 1. Call */}
        <a
          href={siteConfig.contact.landlineTel}
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-2xl text-primary hover:bg-theme-container/50 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-theme-container/60 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <span className="font-sans text-[11px] font-medium leading-none">Call</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-2xl text-primary hover:bg-theme-container/50 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-theme-secondary-container/80 text-theme-ink flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="font-sans text-[11px] font-medium leading-none">WhatsApp</span>
        </a>

        {/* 3. Directions */}
        <a
          href={siteConfig.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-2xl text-primary hover:bg-theme-container/50 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-theme-container/60 flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
          <span className="font-sans text-[11px] font-medium leading-none">Directions</span>
        </a>

        {/* 4. Book Visit */}
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-1 py-1 px-1 rounded-2xl bg-primary text-white shadow-button hover:bg-theme-primary-container transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="font-sans text-[11px] font-semibold leading-none">Book</span>
        </Link>
      </div>
    </div>
  );
}

