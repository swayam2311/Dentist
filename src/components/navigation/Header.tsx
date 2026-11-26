'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open, handle Esc key, and trap focus
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Treatments', href: '/treatments' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'New Patients', href: '/new-patients' },
    { label: 'Patient Stories', href: '/stories' },
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
                : pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-body-md text-body-md transition-colors py-1 ${isActive
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
            className="interactive-button hidden sm:inline-flex items-center justify-center min-h-[48px] px-space-lg rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-[0_4px_16px_-2px_rgba(0,82,85,0.25)] hover:bg-primary-container hover:text-on-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Book an Appointment
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-primary hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div
            ref={drawerRef}
            className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-surface-container-lowest shadow-2xl flex flex-col pt-safe pb-safe z-50 animate-in slide-in-from-left duration-300"
          >
            <div className="h-20 px-space-md flex items-center justify-between border-b border-surface-container-low">
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary">Gangal Clinic</span>
                <span className="font-label-caption text-label-caption text-secondary">Gentle Care Studio</span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

            <nav className="flex-1 overflow-y-auto px-space-sm py-space-xs flex flex-col gap-1" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-space-md px-space-md py-3 min-h-[44px] rounded-lg text-on-surface-variant hover:text-on-surface transition-colors ${isActive ? 'bg-surface-container text-primary font-bold' : ''
                      }`}
                  >
                    <span className="font-label-button text-label-button">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-space-md flex flex-col gap-space-sm border-t border-surface-container-low">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] rounded-full bg-primary text-on-primary font-label-button text-label-button flex items-center justify-center gap-space-xs shadow-md active:scale-95 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </Link>
              <a
                href={siteConfig.contact.landlineTel}
                className="w-full min-h-[44px] rounded-full bg-surface-container text-primary font-label-button text-label-button flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.landline}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
