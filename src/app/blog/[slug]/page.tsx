import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, SITE_CONFIG } from "@/constants/siteConfig";
import { getBlogPostBySlugAction, getPublicBlogPostsAction } from "@/app/actions/blogActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugAction(slug);

  if (!post) {
    return { title: "Yazı Bulunamadı | Hepsen Sigorta" };
  }

  return {
    title: `${post.title} | Hepsen Sigorta Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author_name],
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlugAction(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublicBlogPostsAction();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover_image || `${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`,
    "datePublished": post.created_at,
    "author": {
      "@type": "Person",
      "name": post.author_name,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.meta.url}/logo-hepsen-sigorta.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-700">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-emerald-700">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              {post.category}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{post.author_name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{post.read_time} okuma</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-10 shadow-sm border border-slate-100">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
                unoptimized={true}
              />
            </div>
          )}

          {/* Article Body */}
          {post.content.includes("<") ? (
            <div
              className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0B1F3A] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0B1F3A] [&_h4]:text-lg [&_h4]:font-semibold [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:my-4 [&_a]:text-emerald-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-5">
              {post.content.split("\n\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-[#0B1F3A] pt-4 pb-1">
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }
                if (trimmed) {
                  return <p key={index}>{trimmed}</p>;
                }
                return null;
              })}
            </div>
          )}

          {/* Mid-Article CTA Banner */}
          <div className="my-12 p-8 rounded-3xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Danışmanlık Desteği
              </span>
              <h3 className="text-xl font-bold">Bu Konuda Detaylı Bilgi İster misiniz?</h3>
              <p className="text-xs text-slate-300">
                Uzmanımız Merve Doğan ile görüşerek size en uygun seçenekleri değerlendirebilirsiniz.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/teklif-al" className="w-full sm:w-auto">
                <Button variant="navy" size="md" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white">
                  Teklif Talep Et
                </Button>
              </Link>
              <a
                href={getWhatsAppUrl(`Merhaba, blogunuzdaki "${post.title}" yazısını okudum. Bu konuda bilgi almak istiyorum.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="whatsapp" size="md" className="w-full sm:w-auto gap-2">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp&apos;tan Sor</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Author Card */}
          <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 flex items-start gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              MD
            </div>
            <div className="text-xs sm:text-sm">
              <h4 className="font-bold text-[#0B1F3A] text-base">{post.author_name}</h4>
              <p className="text-slate-500 mb-2">{SITE_CONFIG.personTitle} • Allianz Yetkili Acentesi</p>
              <p className="text-slate-600 leading-relaxed">
                Bireysel Emeklilik, Hayat ve Sağlık Sigortası branşlarında danışanlarına profesyonel ve tarafsız danışmanlık hizmeti sunmaktadır.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-slate-200 pt-10">
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-6">İlgili Diğer Rehberler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    href={`/blog/${rPost.slug}`}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors bg-white group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                        {rPost.category}
                      </span>
                      <h4 className="text-base font-bold text-[#0B1F3A] group-hover:text-emerald-700 transition-colors">
                        {rPost.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{rPost.read_time}</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <span>Yazıyı Gör</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
