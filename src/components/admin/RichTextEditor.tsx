"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  RemoveFormatting,
  Palette,
  Code,
  Eye,
  Minus,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

const PRESET_COLORS = [
  { name: "Varsayılan Siyah", color: "#1e293b" },
  { name: "Hepsen Laciverti", color: "#0B1F3A" },
  { name: "Zümrüt Yeşili", color: "#059669" },
  { name: "Mavi", color: "#2563EB" },
  { name: "Kırmızı / Dikkat", color: "#DC2626" },
  { name: "Turuncu / Uyarı", color: "#D97706" },
  { name: "Mor", color: "#7C3AED" },
  { name: "Koyu Gri", color: "#475569" },
];

export function RichTextEditor({
  value,
  onChange,
  label = "Detaylı İçerik",
  placeholder = "İçeriğinizi buraya yazın veya yapıştırın. Yukarıdaki butonlarla renk, boyut ve listeleri ayarlayabilirsiniz...",
  minHeight = "260px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual");
  const [htmlValue, setHtmlValue] = useState(value || "");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Sync incoming value to editor content if changed externally
  useEffect(() => {
    if (editorRef.current && viewMode === "visual") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setHtmlValue(value || "");
  }, [value, viewMode]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlValue(html);
      onChange(html);
    }
  };

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (viewMode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleHeading = (tag: string) => {
    if (viewMode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    handleInput();
  };

  const handleApplyColor = (color: string) => {
    executeCommand("foreColor", color);
    setShowColorPicker(false);
  };

  const handleInsertLink = () => {
    const url = prompt("Lütfen yönlendirme bağlantısını (URL) giriniz:", "https://");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt("İçeriğe eklenecek görselin URL adresini giriniz:");
    if (url) {
      executeCommand("insertImage", url);
    }
  };

  const handleInsertQuote = () => {
    if (viewMode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, "blockquote");
    handleInput();
  };

  const handleInsertHr = () => {
    executeCommand("insertHorizontalRule");
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtmlValue(newHtml);
    onChange(newHtml);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between pb-1">
        <label className="text-xs font-bold text-slate-700">{label}</label>

        {/* View Switcher: Word Görsel Mod vs HTML Kaynak */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setViewMode("visual")}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === "visual"
                ? "bg-white text-emerald-700 shadow-xs font-bold"
                : "hover:text-slate-900"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Görsel Editör (Word)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("html")}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === "html"
                ? "bg-white text-emerald-700 shadow-xs font-bold"
                : "hover:text-slate-900"
            }`}
          >
            <Code className="w-3 h-3" />
            <span>HTML Kodu</span>
          </button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-all">
        {/* Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-700 select-none">
          {/* Headings / Font Size Dropdown */}
          <select
            onChange={(e) => {
              handleHeading(e.target.value);
              e.target.value = "p";
            }}
            defaultValue="p"
            disabled={viewMode === "html"}
            className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 focus:outline-none cursor-pointer"
            title="Başlık ve Metin Boyutu"
          >
            <option value="p">Normal Metin</option>
            <option value="h2">Büyük Başlık (H2)</option>
            <option value="h3">Orta Başlık (H3)</option>
            <option value="h4">Küçük Başlık (H4)</option>
          </select>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Bold, Italic, Underline, Strikethrough */}
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Kalın (Bold)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("italic")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="İtalik (Italic)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("underline")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Altı Çizili (Underline)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("strikeThrough")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Üstü Çizili (Strike)"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Color Picker Swatch */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              disabled={viewMode === "html"}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors text-xs font-semibold cursor-pointer border border-transparent hover:border-slate-200"
              title="Metin Rengi"
            >
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Renk</span>
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-slate-200 shadow-xl rounded-xl p-2.5 grid grid-cols-2 gap-1.5 min-w-[200px] animate-fadeIn">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => handleApplyColor(c.color)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 text-left text-xs font-medium cursor-pointer"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Madde İşaretli Liste (Noktalı)"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Numaralı Liste (1, 2, 3...)"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => executeCommand("justifyLeft")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Sola Hizala"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("justifyCenter")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Ortala"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("justifyRight")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Sağa Hizala"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Quote & Divider */}
          <button
            type="button"
            onClick={handleInsertQuote}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Vurgu Kutusu / Alıntı"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertHr}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer"
            title="Ayraç Çizgisi Ekle"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Link & In-content Image */}
          <button
            type="button"
            onClick={handleInsertLink}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer text-blue-600"
            title="Bağlantı (Link) Ekle"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer text-emerald-600"
            title="İçeriğe Görsel Ekle (URL İle)"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          {/* Clear formatting */}
          <button
            type="button"
            onClick={() => executeCommand("removeFormat")}
            disabled={viewMode === "html"}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-colors cursor-pointer text-slate-400 hover:text-slate-700"
            title="Biçimlendirmeyi Temizle"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        {viewMode === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="p-4 sm:p-5 outline-none prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed overflow-y-auto focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50/50 [&_blockquote]:p-3 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B1F3A] [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#0B1F3A] [&_h4]:text-base [&_h4]:font-semibold [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-3 [&_a]:text-emerald-600 [&_a]:underline"
          />
        ) : (
          <textarea
            value={htmlValue}
            onChange={handleHtmlChange}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-xs text-slate-800 leading-relaxed outline-none resize-y border-0 focus:ring-0"
            placeholder="<p>HTML formatında içerik...</p>"
          />
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
        <span>Enter: Yeni paragraf | Shift + Enter: Satır başı | Word stili tüm biçimlendirmeler desteklenir.</span>
        <span>{htmlValue.replace(/<[^>]*>/g, "").length} karakter</span>
      </div>
    </div>
  );
}
