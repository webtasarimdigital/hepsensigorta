import React from "react";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { GENERAL_FAQS } from "@/constants/demoData";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/constants/siteConfig";

export function FaqSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Merak Edilenler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Bireysel emeklilik, hayat ve sağlık sigortası süreçleri hakkında danışanlarımızın en sık sorduğu soruları yanıtladık.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion items={GENERAL_FAQS} defaultOpenIndex={0} className="mb-10" />

        {/* Still Have Questions Box */}
        <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-[#0B1F3A] text-base mb-1">
              Farklı bir sorunuz mu var?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Poliçeler, fonlar ve güncel mevzuat hakkında uzmanımıza doğrudan sorabilirsiniz.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Merhaba, web sitenizdeki SSS bölümünü inceledim. Birkaç konuda danışmak istiyorum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto"
          >
            <Button variant="whatsapp" size="md" className="w-full sm:w-auto gap-2">
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp&apos;tan Sorun</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
