'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  step: number;
  label: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Booking Progress" className="w-full mb-10">
      <ol className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        {steps.map((s) => {
          const isCompleted = s.step < currentStep;
          const isActive = s.step === currentStep;

          return (
            <li
              key={s.step}
              onClick={() => isCompleted && onStepClick?.(s.step)}
              className={`flex items-center gap-2.5 p-3 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-button ring-2 ring-primary/20'
                  : isCompleted
                  ? 'bg-theme-secondary-container/80 text-theme-ink cursor-pointer hover:bg-theme-secondary-container'
                  : 'bg-theme-container-low/70 text-theme-muted/70 opacity-60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-sans font-bold shrink-0 ${
                  isActive
                    ? 'bg-white text-primary'
                    : isCompleted
                    ? 'bg-primary text-white'
                    : 'bg-theme-container text-theme-muted'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `0${s.step}`}
              </div>
              <div className="min-w-0 pr-1">
                <span className="block font-sans text-[10px] uppercase tracking-wider opacity-80 leading-none">
                  Step {s.step}
                </span>
                <span className="block font-sans text-[13px] font-medium truncate leading-tight mt-0.5">
                  {s.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

