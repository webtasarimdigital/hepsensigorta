import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCheck,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Award,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl, getPhoneHref, getEmailHref } from "@/constants/siteConfig";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda | Merve Doğan & Hepsen Sigorta",
  description: "Hepsen Sigorta, Fon Yöneticisi Merve Doğan liderliğinde Allianz Yetkili Acentesi olarak Kadıköy Kozyatağı'nda ve tüm Türkiye'de hizmet vermektedir.",
};

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">Hakkımızda</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Marka Hikayemiz & Değerlerimiz</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Seni Düşünen Sigorta: Hepsen Sigorta
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Standart kalıplardan uzak, tamamen sizin ve ailenizin ihtiyaçlarına odaklanan kişisel bir danışmanlık deneyimi sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Profile */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Card: Merve Doğan */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#0B1F3A] text-white p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl font-black mb-6">
                  MD
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  Acente Yetkilisi
                </span>
                <h3 className="text-2xl font-black text-white">{SITE_CONFIG.personName}</h3>
                <p className="text-sm text-slate-300 mb-6">{SITE_CONFIG.personTitle}</p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-6 text-xs text-slate-300 leading-relaxed">
                  <p>
                    Allianz Yetkili Acentesi olarak Bireysel Emeklilik, Hayat Sigortası ve Sağlık Sigortası alanlarında danışanlarımızın geleceğini güvenceye alıyoruz.
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{SITE_CONFIG.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>{SITE_CONFIG.emailPrimary}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{SITE_CONFIG.address.full}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] leading-tight">
                Ezbere Satış Değil, Gerçek İhtiyaç Odaklı Yol Arkadaşlığı
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  Sigorta ve emeklilik sektörü çoğu zaman karmaşık terimlerin, yüzlerce sayfalık poliçe metinlerinin ve anlaşılması güç şartların arkasında kalır. Birçok katılımcı hangi fonlara yatırım yaptığını ya da sağlık sigortasının neleri karşılayıp karşılamadığını tam olarak bilemez.
                </p>
                <p>
                  Hepsen Sigorta bu karmaşıklığı ortadan kaldırmak için kuruldu. &ldquo;Seni Düşünen Sigorta&rdquo; mottomuzun temelinde, ürün satmaktan önce danışanımızın gerçek durumunu, bütçesini ve yarınlara dair planlarını dinlemek yatar.
                </p>
                <p>
                  Dünyanın ve Türkiye&apos;nin lider finans devlerinden Allianz&apos;ın güvencesiyle; Bireysel Emeklilik (BES) fon yönetiminden tamamlayıcı sağlık poliçelerine kadar her detayı şeffaf şekilde masaya yatırıyoruz.
                </p>
              </div>

              {/* 3 Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#F6F8FA] border border-slate-200">
                  <HeartHandshake className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-[#0B1F3A] text-sm mb-1">Şeffaflık</h4>
                  <p className="text-xs text-slate-500">Poliçenizdeki tüm şartları anlaşılır Türkçe ile anlatırız.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F8FA] border border-slate-200">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-[#0B1F3A] text-sm mb-1">Güven</h4>
                  <p className="text-xs text-slate-500">Allianz&apos;ın küresel finansal gücü ve acente yetkimizle yanınızdayız.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F6F8FA] border border-slate-200">
                  <Award className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-[#0B1F3A] text-sm mb-1">Süreklilik</h4>
                  <p className="text-xs text-slate-500">Poliçe sonrasında da fon takibi ve yenilemelerde destek veririz.</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link href="/teklif-al">
                  <Button variant="primary" size="md" className="gap-2">
                    <span>Hızlı Teklif Talep Edin</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={getWhatsAppUrl("Merhaba Merve Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="md" className="gap-2">
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>WhatsApp&apos;tan Ulaşın</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
