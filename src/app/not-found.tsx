import Link from "next/link";
import { ArrowLeft, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/constants/siteConfig";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#F6F8FA] text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0B1F3A]">
            Sayfa Bulunamadı
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş ya da adresi değişmiş olabilir. Ana sayfamıza dönerek hizmetlerimizi inceleyebilirsiniz.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Button>
          </Link>

          <a href={getWhatsAppUrl("Merhaba, aradığım sayfayı bulamadım. Bilgi alabilir miyim?")} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="md" className="w-full justify-center gap-2">
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp ile Sorun</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
