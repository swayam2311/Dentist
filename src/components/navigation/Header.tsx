'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { ThemeToggle } from './ThemeToggle';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`max-w-[1200px] mx-auto h-20 rounded-full px-5 sm:px-8 flex items-center justify-between transition-all duration-300 border border-theme-border/60 ${
          scrolled
            ? 'bg-theme-card/90 backdrop-blur-xl shadow-ambient'
            : 'bg-theme-card/75 backdrop-blur-md shadow-sm'
        }`}
      >
        {/* Brand Monogram & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-2"
        >
          <div className="w-10 h-10 rounded-full bg-theme-primary/10 border border-theme-border flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            {/* Elegant Monoline Tooth Icon */}
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C7.5 2 4 4.5 4 8.5C4 11.5 5.5 13.5 6.5 15.5C7.5 17.5 8 21.5 10 22C11 22.25 11.5 20 12 18C12.5 20 13 22.25 14 22C16 21.5 16.5 17.5 17.5 15.5C18.5 13.5 20 11.5 20 8.5C20 4.5 16.5 2 12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[19px] sm:text-[22px] font-normal tracking-tight text-primary leading-tight">
              {siteConfig.name}
            </span>
            <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-[0.14em] text-theme-muted font-medium">
              Manpada · Thane
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[15px] transition-colors py-1 ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-theme-muted hover:text-primary font-normal'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={siteConfig.contact.landlineTel}
            className="hidden md:inline-flex items-center gap-2 text-theme-muted hover:text-primary font-sans text-[14px] px-3 py-2 rounded-full hover:bg-theme-container/50 transition-colors"
            title="Call Gangal Dental Clinic"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-medium">{siteConfig.contact.landline}</span>
          </a>

          <Link
            href="/book"
            className="hidden sm:inline-flex items-center gap-2 min-h-[46px] px-6 rounded-full bg-primary text-white font-sans text-[14px] font-medium tracking-wide shadow-button hover:bg-theme-primary-container interactive-button"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Visit</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-primary hover:bg-theme-container/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-[1200px] mx-auto mt-2 bg-theme-card/95 backdrop-blur-2xl rounded-[28px] p-6 shadow-ambient border border-theme-border animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-[16px] font-sans transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-theme-ink hover:bg-theme-container/50 font-normal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-theme-border/50 flex flex-col gap-3">
              <a
                href={siteConfig.contact.landlineTel}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-theme-container-low text-primary font-medium text-[15px]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {siteConfig.contact.landline}</span>
              </a>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-white font-medium text-[15px] shadow-button"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

