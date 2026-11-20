'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export function PosterFallback({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-[380px] sm:h-[450px] lg:h-[500px] rounded-[28px] overflow-hidden bg-gradient-to-b from-theme-container-low via-theme-card to-theme-container/40 flex items-center justify-center p-6 border border-theme-border/60 ${className}`}
      aria-label="Illustration: Dental Crown and Titanium Implant Structure"
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Anatomical SVG Diagram */}
      <svg
        className="w-full max-w-[340px] h-auto drop-shadow-md"
        viewBox="0 0 340 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown Section */}
        <g id="poster-crown">
          <path
            d="M90 120 C90 70, 110 50, 140 50 C155 50, 165 58, 170 58 C175 58, 185 50, 200 50 C230 50, 250 70, 250 120 C250 145, 230 160, 210 160 L130 160 C110 160, 90 145, 90 120 Z"
            fill="#FCFAF6"
            stroke="#1B6B6F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Occlusal Fissures */}
          <path
            d="M140 70 Q170 85 200 70 M170 77 L170 110"
            stroke="#B8935A"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>

        {/* Abutment Collar */}
        <path
          d="M135 160 L205 160 L195 180 L145 180 Z"
          fill="#D4E4E2"
          stroke="#1B6B6F"
          strokeWidth="2"
        />

        {/* Gum Tissue Layer */}
        <path
          d="M40 180 Q170 165 300 180 L300 215 Q170 200 40 215 Z"
          fill="#E8C5C5"
          fillOpacity="0.75"
          stroke="#DDA5A5"
          strokeWidth="1.5"
        />

        {/* Titanium Implant Body with Helical Threads */}
        <g id="poster-implant">
          <path
            d="M145 180 L195 180 L185 300 C185 315, 155 315, 155 300 Z"
            fill="#8A9A9A"
            stroke="#0F2E33"
            strokeWidth="2"
          />
          {/* Thread Ridges */}
          <line x1="144" y1="200" x2="196" y2="204" stroke="#FCFAF6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="146" y1="220" x2="194" y2="224" stroke="#FCFAF6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="148" y1="240" x2="192" y2="244" stroke="#FCFAF6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="150" y1="260" x2="190" y2="264" stroke="#FCFAF6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="152" y1="280" x2="188" y2="284" stroke="#FCFAF6" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Jawbone Structure Background */}
        <path
          d="M40 215 L300 215 L300 350 L40 350 Z"
          fill="#F1ECE2"
          stroke="#B8935A"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Callout 1: Crown */}
        <g className="callout-group">
          <line x1="230" y1="90" x2="285" y2="90" stroke="#1B6B6F" strokeWidth="1.5" />
          <circle cx="230" cy="90" r="3" fill="#1B6B6F" />
          <rect x="250" y="75" width="85" height="26" rx="13" fill="#FCFAF6" stroke="#B8935A" strokeWidth="1" />
          <text x="292" y="92" fontSize="11" fontFamily="sans-serif" fill="#0F2E33" textAnchor="middle" fontWeight="600">
            Crown
          </text>
        </g>

        {/* Callout 2: Titanium Implant */}
        <g className="callout-group">
          <line x1="195" y1="240" x2="260" y2="240" stroke="#1B6B6F" strokeWidth="1.5" />
          <circle cx="195" cy="240" r="3" fill="#1B6B6F" />
          <rect x="220" y="225" width="115" height="26" rx="13" fill="#FCFAF6" stroke="#B8935A" strokeWidth="1" />
          <text x="277" y="242" fontSize="11" fontFamily="sans-serif" fill="#0F2E33" textAnchor="middle" fontWeight="600">
            Implant (Titanium)
          </text>
        </g>

        {/* Callout 3: Jawbone */}
        <g className="callout-group">
          <line x1="150" y1="320" x2="90" y2="320" stroke="#1B6B6F" strokeWidth="1.5" />
          <circle cx="150" cy="320" r="3" fill="#1B6B6F" />
          <rect x="35" y="305" width="80" height="26" rx="13" fill="#FCFAF6" stroke="#B8935A" strokeWidth="1" />
          <text x="75" y="322" fontSize="11" fontFamily="sans-serif" fill="#0F2E33" textAnchor="middle" fontWeight="600">
            Jawbone
          </text>
        </g>
      </svg>

      {/* Floating Reassurance Tag */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-theme-card/90 backdrop-blur-md border border-theme-border/60">
        <span className="font-sans text-[12px] text-theme-muted">
          Restorative Implant &amp; Crown Anatomy
        </span>
        <Link
          href="/book?service=dental-implants"
          className="inline-flex items-center gap-1.5 text-[12px] font-sans font-semibold text-primary hover:underline"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Consultation</span>
        </Link>
      </div>
    </div>
  );
}

