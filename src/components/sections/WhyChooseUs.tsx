import React from "react";
import {
  MessageSquare,
  Target,
  Compass,
  Repeat,
  Building,
  ShieldCheck,
} from "lucide-react";
import { WHY_HEPSEN_ITEMS } from "@/constants/demoData";

const ICON_MAP = {
  MessageSquare: MessageSquare,
  Target: Target,
  Compass: Compass,
  Repeat: Repeat,
  Building: Building,
  Award: ShieldCheck,
};

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider">
            Danışmanlık Yaklaşımımız
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Neden Hepsen Sigorta?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sigorta ve emeklilik ürünlerinde herkesin ihtiyacı aynı değildir. Hepsen Sigorta olarak amacımız, ürün satmaktan önce ihtiyacınızı doğru anlamak ve seçenekleri anlaşılır şekilde paylaşmaktır.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_HEPSEN_ITEMS.map((item, index) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-[#F6F8FA] border border-slate-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-5 group-hover:bg-[#0B1F3A] group-hover:text-emerald-400 group-hover:border-transparent transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
