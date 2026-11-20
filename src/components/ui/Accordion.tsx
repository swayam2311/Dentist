'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-[22px] bg-theme-card border border-theme-border/60 transition-all duration-200 overflow-hidden shadow-sm"
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-[18px] sm:text-[20px] text-primary hover:text-theme-primary-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-theme-secondary shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 sm:px-6 pb-6 pt-1 text-[15px] sm:text-[16px] text-theme-muted font-sans leading-relaxed animate-in fade-in duration-200 border-t border-theme-border/30"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

