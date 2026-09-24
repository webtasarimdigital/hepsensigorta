"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, Plus, Edit, Trash2, Eye, X, RefreshCw, Calendar, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  getBlogPostsAction,
  saveBlogPostAction,
  deleteBlogPostAction,
  BlogRecord,
} from "@/app/actions/blogActions";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Bireysel Emeklilik",
    read_time: "4 dk",
    cover_image: "",
    published: true,
  });

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getBlogPostsAction();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Bireysel Emeklilik",
      read_time: "4 dk",
      cover_image: "",
      published: true,
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogRecord) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      read_time: post.read_time,
      cover_image: post.cover_image || "",
      published: post.published,
    });
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await deleteBlogPostAction(id);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const res = await saveBlogPostAction({
        id: editingPost?.id,
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        read_time: formData.read_time,
        cover_image: formData.cover_image,
        published: formData.published,
      });

      if (!res.success) {
        throw new Error(res.error || "Blog yazısı kaydedilemedi.");
      }

      setIsModalOpen(false);
      await loadPosts();
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
          <h1 className="text-2xl font-black text-[#0B1F3A]">Blog & Rehber Yönetimi</h1>
          <p className="text-xs text-slate-500">
            Sigorta ve BES rehberlerinizi yönetin, yeni makaleler ve görseller ekleyin.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadPosts}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Yenile</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Yeni Yazı Ekle</span>
          </Button>
        </div>
      </div>

      {/* Posts List or Empty State */}
      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Blog yazıları yükleniyor...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center px-4 space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0B1F3A]">Henüz Blog Yazısı Eklenmedi</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Web sitenizde ziyaretçilerinize sunmak istediğiniz rehber ve bilgilendirici içerikleri buradan ekleyebilirsiniz.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>İlk Blog Yazınızı Ekleyin</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Cover Image */}
                {post.cover_image ? (
                  <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={post.cover_image.startsWith("/uploads")}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {post.category}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 bg-gradient-to-r from-emerald-50 to-slate-100 flex items-center px-4">
                    <span className="bg-white text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("tr-TR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0B1F3A] text-base leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {post.published ? "Yayında" : "Taslak"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(post)}
                    className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal with ImageUploader */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {editingPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Oluştur"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
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
                <label className="font-bold text-slate-700">Yazı Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: BES Fon Dağılımı Seçerken Bilmeniz Gerekenler"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Bireysel Emeklilik">Bireysel Emeklilik</option>
                    <option value="Hayat Sigortası">Hayat Sigortası</option>
                    <option value="Sağlık Sigortası">Sağlık Sigortası</option>
                    <option value="Finansal Planlama">Finansal Planlama</option>
                    <option value="Rehberler">Rehberler</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tahmini Okuma Süresi</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Cover Image with Live Uploader */}
              <ImageUploader
                label="Kapak Görseli (Dosya Seçin veya URL Yapıştırın)"
                value={formData.cover_image}
                onChange={(url) => setFormData({ ...formData, cover_image: url })}
              />

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kısa Özet (Meta Açıklaması) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Yazının ana mesajını özetleyen 1-2 cümle..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Detaylı İçerik (Metin / Paragraflar) *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Yazınızın detaylı metnini buraya giriniz..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans text-xs leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-700">Bu yazıyı web sitesinde hemen yayınla</span>
              </label>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button variant="secondary" size="md" type="button" onClick={() => setIsModalOpen(false)}>
                  Vazgeç
                </Button>
                <Button variant="primary" size="md" type="submit" isLoading={saving}>
                  {editingPost ? "Değişiklikleri Kaydet" : "Yazıyı Kaydet"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
