"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Edit, Trash2, CheckCircle2, Eye, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DEMO_BLOG_POSTS, BlogPost } from "@/constants/demoData";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DEMO_BLOG_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Bireysel Emeklilik",
    readingTime: "4 dk",
    featuredImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
  });

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Bireysel Emeklilik",
      readingTime: "4 dk",
      featuredImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTime: post.readingTime,
      featuredImage: post.featuredImage,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newPost: BlogPost = {
        id: String(Date.now()),
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        readingTime: formData.readingTime,
        date: new Date().toLocaleDateString("tr-TR"),
        author: "Merve DOĞAN",
        featuredImage: formData.featuredImage,
      };
      setPosts([newPost, ...posts]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F3A]">Blog & Rehber Yönetimi</h1>
          <p className="text-xs text-slate-500">Mevcut makaleleri düzenleyin veya SEO uyumlu yeni bir rehber yayınlayın.</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>Yeni Yazı Ekle</span>
        </Button>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-bold text-[#0B1F3A] text-base mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">{post.readingTime}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {editingPost ? "Yazıyı Düzenle" : "Yeni Blog Yazısı Oluştur"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Yazı Başlığı</label>
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
                  <label className="font-bold text-slate-700">Okuma Süresi</label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kısa Özet (Meta Description / Excerpt)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">İçerik (Markdown / Metin)</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kapak Görseli URL</label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button variant="secondary" size="md" type="button" onClick={() => setIsModalOpen(false)}>
                  Vazgeç
                </Button>
                <Button variant="primary" size="md" type="submit">
                  {editingPost ? "Değişiklikleri Kaydet" : "Yazıyı Yayınla"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
