'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error caught by boundary:', error);
  }, [error]);

  return (
    <div className="max-w-[600px] mx-auto px-4 py-20 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-error-container text-error flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-[30px] sm:text-[36px] text-primary font-normal leading-tight mb-3">
        Something went wrong
      </h1>
      <p className="font-sans text-[15px] text-theme-muted mb-8 leading-relaxed">
        We encountered an unexpected error while loading this page. Please try refreshing or return to the clinic homepage.
      </p>
      <Button onClick={() => reset()} className="gap-2">
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}

