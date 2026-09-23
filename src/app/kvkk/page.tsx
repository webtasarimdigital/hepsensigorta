import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Hepsen Sigorta",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu uyarınca aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-700">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">KVKK Aydınlatma Metni</span>
        </nav>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Yasal Bilgilendirme</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0B1F3A]">
              Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
            </h1>
            <p className="text-xs text-slate-500 mt-2">Son güncelleme: 2026</p>
          </div>

          <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Note: Bu metin bir hukuk danışmanı tarafından sonradan kontrol edilmelidir */}
            İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) kapsamında veri sorumlusu sıfatıyla {SITE_CONFIG.legalName} (&ldquo;Hepsen Sigorta&rdquo;) tarafından hazırlanmıştır.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            Veri sorumlusu: <strong>{SITE_CONFIG.legalName}</strong><br />
            Adres: {SITE_CONFIG.address.full}<br />
            Telefon: {SITE_CONFIG.phone}<br />
            E-posta: {SITE_CONFIG.emailPrimary}
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">2. İşlenen Kişisel Veriler ve İşleme Amaçları</h2>
          <p>
            Web sitemizdeki iletişim ve teklif formları vasıtasıyla toplanan ad, soyad, telefon numarası, e-posta adresi, ikamet şehri ve talep edilen sigorta branşı bilgileri;
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm">
            <li>Talep ettiğiniz sigorta ve BES tekliflerinin hazırlanması ve tarafınıza iletilmesi,</li>
            <li>İletişim taleplerinizin yanıtlanması ve danışmanlık süreçlerinin yürütülmesi,</li>
            <li>Allianz Sigorta A.Ş. ve Allianz Hayat ve Emeklilik A.Ş. yetkili acentelik mevzuatı uyarınca yasal yükümlülüklerin yerine getirilmesi,</li>
            <li>Onay vermeniz halinde kampanya ve bilgilendirmelerin iletilmesi amaçlarıyla işlenmektedir.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">3. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz; teklif oluşturma ve poliçeleştirme süreçlerinin yürütülebilmesi amacıyla yetkili acentesi olduğumuz Allianz Sigorta ve Emeklilik şirketlerine, kanunen yetkili kamu kurum ve kuruluşlarına ilgili mevzuat sınırları dahilinde aktarılabilir.
          </p>

          <h2 className="text-xl font-bold text-[#0B1F3A] pt-4">4. İlgili Kişinin Hakları</h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahiptir. Bu haklarınızı kullanmak için <strong>{SITE_CONFIG.emailPrimary}</strong> adresine yazılı başvuruda bulunabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
