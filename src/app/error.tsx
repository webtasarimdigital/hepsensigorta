"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#F6F8FA] text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#0B1F3A]">
            Beklenmedik Bir Durum Oluştu
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sayfa yüklenirken geçici bir sorun meydana geldi. Sayfayı yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="w-full justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tekrar Dene</span>
          </Button>

          <Link href="/" className="w-full">
            <Button variant="outline" size="md" className="w-full justify-center gap-2">
              <Home className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
