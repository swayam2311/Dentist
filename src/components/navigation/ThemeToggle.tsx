'use client';

import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'warm' | 'aqua'>('warm');

  useEffect(() => {
    const savedTheme = localStorage.getItem('gdc-theme') as 'warm' | 'aqua' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.dataset.theme = savedTheme;
    } else {
      document.body.dataset.theme = 'warm';
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'warm' ? 'aqua' : 'warm';
    setTheme(nextTheme);
    document.body.dataset.theme = nextTheme;
    localStorage.setItem('gdc-theme', nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans text-theme-muted hover:text-primary bg-theme-container-low hover:bg-theme-container transition-colors border border-theme-border/40"
      title={`Current Theme: ${theme === 'warm' ? 'Warm Linen & Porcelain' : 'Aqua Sanctuary'}. Click to switch.`}
    >
      <Palette className="w-3.5 h-3.5 text-primary" />
      <span className="hidden sm:inline font-medium capitalize">{theme}</span>
    </button>
  );
}

