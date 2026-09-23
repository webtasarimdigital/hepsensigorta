"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  defaultOpenIndex?: number;
}

export function Accordion({ items, className, defaultOpenIndex = -1 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={cn("divide-y divide-slate-200 border-y border-slate-200", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id || index} className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg group"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-semibold text-[#0B1F3A] group-hover:text-emerald-700 transition-colors pr-4">
                {item.question}
              </span>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-700",
                  isOpen && "rotate-180 bg-emerald-100 text-emerald-800"
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            {isOpen && (
              <div className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 pr-6 animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
