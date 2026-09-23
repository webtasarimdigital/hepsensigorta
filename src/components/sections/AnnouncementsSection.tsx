import React from "react";
import Link from "next/link";
import { Bell, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { DEMO_ANNOUNCEMENTS } from "@/constants/demoData";

export function AnnouncementsSection() {
  const announcements = DEMO_ANNOUNCEMENTS.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Güncel Bilgilendirmeler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              Duyurular & Kampanyalar
            </h2>
          </div>
          <Link
            href="/duyurular"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
          >
            <span>Tüm Duyuruları Gör</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Announcements List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.date}</span>
                  </div>
                  {item.isFeatured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3" />
                      Önemli
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#0B1F3A] group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-emerald-700">
                <Link href={`/duyurular#${item.slug}`} className="hover:underline flex items-center gap-1">
                  <span>Detayları Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
