import React from "react";
import Link from "next/link";
import {
  PiggyBank,
  HeartHandshake,
  HeartPulse,
  LineChart,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/constants/services";
import { getWhatsAppUrl } from "@/constants/siteConfig";

const ICON_MAP = {
  PiggyBank: PiggyBank,
  HeartHandshake: HeartHandshake,
  HeartPulse: HeartPulse,
  LineChart: LineChart,
};

export function ServicesGrid() {
  return (
    <section id="hizmetler" className="py-16 sm:py-24 bg-[#F6F8FA] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
            Temel Uzmanlık Alanlarımız
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Geleceğinizi ve Sağlığınızı Koruyan Çözümler
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Allianz Yetkili Acentesi olarak, emeklilik birikimlerinizden sağlık güvencenize kadar tüm ihtiyaçlarınızı tek noktadan, kişisel danışmanlık yaklaşımıyla yönetiyoruz.
          </p>
        </div>

        {/* 4 Large Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.icon as keyof typeof ICON_MAP] || PiggyBank;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-500/40 relative overflow-hidden"
              >
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B1F3A] to-emerald-500 opacity-80" />

                <div>
                  {/* Card Top: Icon & Badge */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 group-hover:bg-[#0B1F3A] group-hover:text-emerald-400 transition-colors duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-3 group-hover:text-emerald-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Highlights / Benefits List */}
                  <div className="space-y-2.5 mb-8">
                    {service.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <Link href={`/${service.slug}`} className="flex-1 min-w-[130px]">
                    <Button variant="outline" size="md" className="w-full justify-center gap-1.5 text-xs sm:text-sm">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={`/teklif-al?service=${service.slug}`} className="flex-1 min-w-[130px]">
                    <Button variant="primary" size="md" className="w-full justify-center gap-1.5 text-xs sm:text-sm">
                      <span>Teklif Al</span>
                    </Button>
                  </Link>

                  <a
                    href={getWhatsAppUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    title="WhatsApp'tan Hızlı Bilgi Al"
                    aria-label={`${service.title} WhatsApp İletişim`}
                  >
                    <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
