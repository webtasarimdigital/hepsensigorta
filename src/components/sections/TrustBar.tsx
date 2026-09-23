import React from "react";
import { ShieldCheck, MapPin, Globe, Users, Clock } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Allianz Yetkili Acentesi",
    desc: "BES, Hayat ve Sağlık alanında resmi güvence",
  },
  {
    icon: MapPin,
    title: "İstanbul'da Yüz Yüze",
    desc: "Kadıköy Kozyatağı ofisimizde birebir görüşme",
  },
  {
    icon: Globe,
    title: "Türkiye Geneli Destek",
    desc: "Uzaktan telefon, WhatsApp ve online danışmanlık",
  },
  {
    icon: Users,
    title: "Kişiye Özel İhtiyaç Analizi",
    desc: "Ezbere paketler değil, size uyan planlar",
  },
  {
    icon: Clock,
    title: "Hızlı & Net Bilgilendirme",
    desc: "Sorularınıza anlaşılır ve şeffaf geri dönüş",
  },
];

export function TrustBar() {
  return (
    <div className="bg-white border-y border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
