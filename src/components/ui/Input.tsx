import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="font-sans text-[13px] font-medium text-theme-ink">
            {label}
            {props.required && <span className="text-primary ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              'min-h-[52px] px-4 rounded-2xl bg-theme-card border border-theme-border/80 font-sans text-[15px] text-theme-ink placeholder:text-theme-muted/60 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:bg-theme-container-low disabled:opacity-60',
              error && 'border-error focus:border-error focus:ring-error/15',
              className
            )
          )}
          {...props}
        />
        {error && <span className="text-[12px] text-error font-sans font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-[12px] text-theme-muted font-sans">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

