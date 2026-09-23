"use client";

import React, { useState } from "react";
import { Bell, Plus, Edit, Trash2, CheckCircle2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DEMO_ANNOUNCEMENTS, AnnouncementItem } from "@/constants/demoData";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<AnnouncementItem[]>(DEMO_ANNOUNCEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    isFeatured: true,
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      isFeatured: item.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...i, ...formData } : i)));
    } else {
      const newItem: AnnouncementItem = {
        id: String(Date.now()),
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        excerpt: formData.excerpt,
        content: formData.content,
        isFeatured: formData.isFeatured,
        date: new Date().toLocaleDateString("tr-TR"),
      };
      setItems([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Duyurular & Kampanya Yönetimi</h1>
          <p className="text-xs text-slate-500">Mevzuat değişikliklerini veya acente kampanyalarını ana sayfada ve duyurular sayfasında yayınlayın.</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Yeni Duyuru Ekle</span>
        </Button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{item.date}</span>
                {item.isFeatured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Sparkles className="w-3 h-3" />
                    Önemli
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[#0B1F3A] text-base">{item.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.excerpt}</p>
            </div>

            <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                title="Düzenle"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {editingItem ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Duyuru Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kısa Özet</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Detaylı İçerik</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-700">Ana Sayfada &ldquo;Önemli&rdquo; rozetiyle öne çıkar</span>
              </label>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button variant="secondary" size="md" type="button" onClick={() => setIsModalOpen(false)}>
                  Vazgeç
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {editingItem ? "Kaydet" : "Yayınla"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
