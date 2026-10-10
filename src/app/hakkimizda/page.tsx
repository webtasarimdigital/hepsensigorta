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
import { SITE_CONFIG, getWhatsAppUrl, getAdvisorWhatsAppUrl, getPhoneHref, getEmailHref, formatPhoneRaw } from "@/constants/siteConfig";
import { getSiteSettingsAction } from "@/app/actions/settingsActions";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda | Merve Doğan & Elif Çakır - Hepsen Sigorta",
  description: "Hepsen Sigorta, Fon Yöneticilerimiz Merve Doğan ve Elif Çakır liderliğinde Allianz Yetkili Acentesi olarak Kadıköy Kozyatağı'nda ve tüm Türkiye'de hizmet vermektedir.",
};

export default async function HakkimizdaPage() {
  const settings = await getSiteSettingsAction();
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
            {/* Left Column: Merve Doğan & Elif Çakır Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Merve Doğan */}
              <div className="rounded-3xl bg-[#0B1F3A] text-white p-7 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl font-black shrink-0">
                    MD
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                      Acente Yetkilisi
                    </span>
                    <h3 className="text-xl font-black text-white">{settings.personName}</h3>
                    <p className="text-xs text-slate-300">{settings.personTitle}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-4 text-xs text-slate-300 leading-relaxed">
                  <p>
                    Allianz Yetkili Acentesi olarak Bireysel Emeklilik, Hayat Sigortası ve Sağlık Sigortası alanlarında danışanlarımızın geleceğini güvenceye alıyoruz.
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between">
                    <a href={`tel:+${formatPhoneRaw(settings.phoneRaw || settings.phone)}`} className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-mono">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{settings.phone}</span>
                    </a>
                    <a
                      href={getAdvisorWhatsAppUrl(settings.phoneRaw || settings.phone, "Merhaba Merve Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] text-white font-semibold text-[11px] hover:bg-[#20bd5a] transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{settings.emailPrimary}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Elif Çakır (Altında) */}
              <div className="rounded-3xl bg-[#0F284A] text-white p-7 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-black shrink-0">
                    EÇ
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                      Fon Yöneticisi & Danışman
                    </span>
                    <h3 className="text-xl font-black text-white">{settings.person2Name || "Elif ÇAKIR"}</h3>
                    <p className="text-xs text-slate-300">{settings.person2Title || "Fon Yöneticisi"}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-4 text-xs text-slate-300 leading-relaxed">
                  <p>
                    Bireysel Emeklilik fon dağılımı, portföy analizi ve tasarruf hedeflerinize en uygun sigorta çözümleri için yanınızdayız.
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between">
                    <a href={`tel:+${formatPhoneRaw(settings.person2PhoneRaw || settings.person2Phone || "905433975647")}`} className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-mono">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{settings.person2Phone || "0543 397 56 47"}</span>
                    </a>
                    <a
                      href={getAdvisorWhatsAppUrl(settings.person2PhoneRaw || settings.person2Phone || "905433975647", "Merhaba Elif Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] text-white font-semibold text-[11px] hover:bg-[#20bd5a] transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{settings.person2Email || "elif.cakir@hepsensigorta.com"}</span>
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
                  Dünyanın ve Türkiye&apos;nin lider finans devlerinden Allianz&apos;ın güvencesiyle; Fon Yöneticilerimiz <strong className="text-slate-900 font-semibold">Merve Doğan</strong> ve <strong className="text-slate-900 font-semibold">Elif Çakır</strong> liderliğinde Bireysel Emeklilik (BES) fon yönetiminden tamamlayıcı sağlık poliçelerine kadar her detayı şeffaf şekilde masaya yatırıyoruz.
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
                  href={getAdvisorWhatsAppUrl(settings.phoneRaw || settings.phone, "Merhaba Merve Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="md" className="gap-2">
                    <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                    <span>WhatsApp • Merve Hanım</span>
                  </Button>
                </a>

                <a
                  href={getAdvisorWhatsAppUrl(settings.person2PhoneRaw || settings.person2Phone || "905433975647", "Merhaba Elif Hanım, Hepsen Sigorta hakkında bilgi almak ve görüşmek istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="md" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                    <span>WhatsApp • Elif Hanım</span>
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
