import React from "react";
import { MessageSquareText, SearchCheck, Users2, ShieldCheck } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/constants/demoData";

const ICONS = [MessageSquareText, SearchCheck, Users2, ShieldCheck];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-[#F6F8FA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
            Adım Adım Süreç
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Danışmanlık Sürecimiz Nasıl İşler?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Karmaşık başvuru adımları ve uzun bekleme süreleri olmadan, 4 sade aşamada hedeflerinize uygun poliçenizi hayata geçiriyoruz.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = ICONS[index] || ShieldCheck;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-medium text-emerald-700">
                  <span>Aşama {index + 1} / 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
