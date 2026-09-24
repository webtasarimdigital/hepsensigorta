import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { getPublicBlogPostsAction } from "@/app/actions/blogActions";

export async function BlogPreviewSection() {
  const posts = await getPublicBlogPostsAction();

  // If no real blog posts published yet, hide section to keep homepage clean
  if (!posts || posts.length === 0) {
    return null;
  }

  // Always show the latest 3 blog posts
  const latest = posts.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#F6F8FA] border-b border-slate-200/80" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sigorta & Emeklilik Rehberi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Güncel Blog Yazıları
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Bireysel Emeklilik, fon dağılımı ve sigorta dünyasından Fon Yöneticisi Merve Doğan imzalı güncel rehberler.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group shrink-0"
          >
            <span>Tüm Blog Yazılarını Gör</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              {post.cover_image ? (
                <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={true}
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
              ) : (
                <div className="h-28 bg-gradient-to-r from-emerald-50 to-slate-100 flex items-center px-6 border-b border-slate-100">
                  <span className="bg-white text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.read_time || "4 dk"}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] group-hover:text-emerald-700 transition-colors mb-2.5 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.author_name || "Merve DOĞAN"}</span>
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Yazıyı Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
