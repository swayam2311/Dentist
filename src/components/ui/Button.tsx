import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none';

    const variantClasses = {
      primary:
        'bg-primary text-white shadow-button hover:bg-theme-primary-container hover:-translate-y-0.5 hover:shadow-button-hover active:translate-y-0',
      secondary:
        'bg-theme-card text-theme-ink border border-theme-border shadow-sm hover:bg-theme-container-low hover:-translate-y-0.5 hover:shadow-ambient active:translate-y-0',
      outline:
        'bg-transparent text-primary border border-primary/40 hover:bg-primary/5 hover:border-primary active:bg-primary/10',
      ghost:
        'bg-transparent text-theme-ink hover:bg-theme-container/50 hover:text-primary active:bg-theme-container',
    };

    const sizeClasses = {
      sm: 'min-h-[36px] px-4 text-[13px] gap-1.5',
      md: 'min-h-[48px] px-6 text-[15px] gap-2',
      lg: 'min-h-[54px] px-8 text-[16px] gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(clsx(baseClasses, variantClasses[variant], sizeClasses[size], className))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

