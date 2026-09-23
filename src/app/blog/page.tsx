import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Clock, ArrowRight, ChevronRight, User } from "lucide-react";
import { DEMO_BLOG_POSTS } from "@/constants/demoData";

export const metadata: Metadata = {
  title: "Sigorta & BES Rehberi | Hepsen Sigorta Blog",
  description: "Bireysel Emeklilik (BES), Hayat Sigortası ve Sağlık Sigortası konularında bilgilendirici rehberler ve uzman yazıları.",
};

export default function BlogIndexPage() {
  const posts = DEMO_BLOG_POSTS;

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0B1F3A] to-[#122849] text-white pt-10 pb-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-400">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-emerald-400 font-medium">Blog</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bilgi Merkezi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Sigorta & Emeklilik Rehberi
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bireysel Emeklilik, fon yönetimi, devlet katkısı ve sağlık sigortaları hakkında anlaşılır ve güncel rehber yazılarımız.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-20 bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-[#0B1F3A] group-hover:text-emerald-700 transition-colors mb-2.5 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.author}</span>
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
