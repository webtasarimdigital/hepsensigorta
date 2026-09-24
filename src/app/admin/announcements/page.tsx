"use client";

import React, { useState, useEffect } from "react";
import { Bell, Plus, Edit, Trash2, Sparkles, X, RefreshCw, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getAnnouncementsAction,
  saveAnnouncementAction,
  deleteAnnouncementAction,
  AnnouncementRecord,
} from "@/app/actions/announcementActions";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<AnnouncementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    badge: "Duyuru",
    is_featured: false,
    link: "",
  });

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncementsAction();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      badge: "Duyuru",
      is_featured: false,
      link: "",
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementRecord) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      badge: item.badge || "Duyuru",
      is_featured: item.is_featured,
      link: item.link || "",
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    await deleteAnnouncementAction(id);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const res = await saveAnnouncementAction({
        id: editingItem?.id,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        badge: formData.badge,
        is_featured: formData.is_featured,
        link: formData.link,
      });

      if (!res.success) {
        throw new Error(res.error || "Duyuru kaydedilemedi.");
      }

      setIsModalOpen(false);
      await loadAnnouncements();
    } catch (err: any) {
      setErrorMsg(err.message || "Kaydetme sırasında bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Duyurular & Kampanya Yönetimi</h1>
          <p className="text-xs text-slate-500">
            Acente duyurularını ve mevzuat güncellemelerini web sitenizde yayınlayın.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadAnnouncements}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Yenile</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Yeni Duyuru Ekle</span>
          </Button>
        </div>
      </div>

      {/* Announcements List or Empty State */}
      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Duyurular yükleniyor...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center px-4 space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Bell className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">Henüz Duyuru Eklenmedi</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Acente kampanyalarınızı ve önemli duyuruları buradan ekleyerek anında sitenizde yayınlayabilirsiniz.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>İlk Duyurunuzu Ekleyin</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {new Date(item.created_at).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {item.badge}
                  </span>
                  {item.is_featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Önemli
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[#0B1F3A] text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.excerpt}</p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline pt-1"
                  >
                    <span>Bağlantı: {item.link}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {editingItem ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Duyuru Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026 Yılı BES Devlet Katkısı Üst Limiti Güncellendi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Rozet / Tür</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Duyuru">Duyuru</option>
                    <option value="Kampanya">Kampanya</option>
                    <option value="Mevzuat">Mevzuat</option>
                    <option value="Allianz">Allianz Güncellemesi</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Yönlendirme Linki (Opsiyonel)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kısa Özet *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Duyurunun ana özetini giriniz..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Detaylı İçerik *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Duyurunun tüm detaylarını buraya yazabilirsiniz..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed text-xs"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-700">Ana Sayfada &ldquo;Önemli&rdquo; rozetiyle öne çıkar</span>
              </label>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button variant="secondary" size="md" type="button" onClick={() => setIsModalOpen(false)}>
                  Vazgeç
                </Button>
                <Button variant="primary" size="md" type="submit" isLoading={saving}>
                  {editingItem ? "Değişiklikleri Kaydet" : "Duyuruyu Yayınla"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
