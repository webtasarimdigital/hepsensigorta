"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Kapak Görseli",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || "Görsel yüklenemedi.");
      }

      onChange(data.url);
    } catch (err: any) {
      console.warn("[Upload Server Error, falling back to local base64]", err);
      // Fallback: Read as base64 Data URL so the user is NEVER blocked
      try {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const result = uploadEvent.target?.result as string;
          if (result) {
            onChange(result);
            setErrorMsg(null);
          } else {
            setErrorMsg("Görsel okunamadı. Lütfen farklı bir görsel seçiniz.");
          }
        };
        reader.onerror = () => {
          setErrorMsg("Görsel yüklenirken bir hata oluştu.");
        };
        reader.readAsDataURL(file);
      } catch (readErr) {
        setErrorMsg(err.message || "Görsel yüklenirken bir hata oluştu.");
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
        <span>{label}</span>
        {value && <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> Görsel Seçildi</span>}
      </label>

      {/* Current Preview or Upload Box */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group">
          <div className="relative w-full h-44 sm:h-52">
            <Image
              src={value}
              alt="Yüklenen Görsel"
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Görseli Değiştir</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg hover:bg-red-700 transition-colors"
              title="Görseli Kaldır"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <span className="text-xs font-bold text-slate-600">Görsel yükleniyor...</span>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-2xl bg-slate-100 group-hover:bg-emerald-100 text-slate-500 group-hover:text-emerald-700 transition-colors">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                  Görsel Yüklemek İçin Tıklayın
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PNG, JPG, WEBP • Maksimum 8 MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error alert */}
      {errorMsg && (
        <p className="text-[11px] text-red-600 font-semibold">{errorMsg}</p>
      )}

      {/* Manual URL input toggle */}
      <div className="pt-1">
        <input
          type="text"
          placeholder="veya direkt görsel URL yapıştırın (https://...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
