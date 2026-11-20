'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { ThemeToggle } from './ThemeToggle';
import { ClinicLogo } from '@/components/ui/ClinicLogo';
import { Menu, X, Phone, Calendar } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Treatments', href: '/treatments' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'New Patients', href: '/new-patients' },
    { label: 'Patient Stories', href: '/#patient-stories' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-space-sm px-margin-mobile lg:px-margin transition-all duration-300">
      <div className="h-20 max-w-[1200px] mx-auto bg-surface-container-lowest/90 backdrop-blur-xl rounded-full px-space-md lg:px-space-lg flex items-center justify-between shadow-[0_12px_32px_-4px_rgba(15,46,51,0.06)] border border-white/60">
        {/* Brand Monogram & Name */}
        <Link
          href="/"
          className="flex items-center gap-space-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-2"
        >
          <ClinicLogo className="h-8 w-8 shrink-0 rounded-xl shadow-sm" />
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-space-lg" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.href.startsWith('/#')
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-body-md text-body-md transition-colors py-1 ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary font-normal'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-space-sm">
          <ThemeToggle />

          <Link
            href="/book"
            className="interactive-button hidden sm:inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_4px_16px_-2px_rgba(0,82,85,0.25)] hover:bg-primary-container hover:text-on-primary transition-all duration-300"
          >
            Book Appointment
          </Link>

          <Link
            href="/admin"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm hover:opacity-90 transition-opacity"
            title="Reception & Staff Dashboard"
            aria-label="Staff Portal"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-on-background/30 backdrop-blur-sm transition-opacity">
          <div className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-surface-container-lowest shadow-2xl flex flex-col pt-safe pb-safe z-50 animate-in slide-in-from-left duration-300">
            <div className="h-20 px-space-md flex items-center justify-between border-b border-surface-container-low">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary">Gangal Clinic</span>
                <span className="font-label-caption text-label-caption text-secondary">Gentle Care Studio</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-space-md py-space-sm">
              <p className="font-label-caption text-label-caption text-secondary italic">
                Warm, calming dentistry tailored for anxious minds.
              </p>
            </div>

            <nav className="flex-1 overflow-y-auto px-space-sm py-space-xs flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:text-on-surface transition-colors ${
                    pathname === item.href ? 'bg-surface-container text-primary font-bold' : ''
                  }`}
                >
                  <span className="font-label-button text-label-button">{item.label}</span>
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-secondary hover:text-primary transition-colors border-t border-surface-container-low mt-2 pt-3"
              >
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span className="font-label-button text-label-button">Staff Portal</span>
              </Link>
            </nav>

            <div className="p-space-md flex flex-col gap-space-sm border-t border-surface-container-low">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 rounded-full bg-primary text-on-primary font-label-button text-label-button flex items-center justify-center gap-space-xs shadow-md active:scale-95 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:02225891949"
                className="w-full h-12 rounded-full bg-surface-container text-primary font-label-button text-label-button flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>022 2589 1949</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
