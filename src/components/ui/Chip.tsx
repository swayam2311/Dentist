import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({ className, selected = false, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center min-h-[36px] px-4 rounded-full font-sans text-[13px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap',
          selected
            ? 'bg-primary text-white shadow-sm'
            : 'bg-theme-container/60 text-theme-ink hover:bg-theme-container hover:text-primary',
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}

