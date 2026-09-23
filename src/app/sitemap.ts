import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { DEMO_BLOG_POSTS } from "@/constants/demoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.meta.url;

  const staticRoutes = [
    "",
    "/bireysel-emeklilik",
    "/hayat-sigortasi",
    "/saglik-sigortasi",
    "/finansal-danismanlik",
    "/hakkimizda",
    "/blog",
    "/duyurular",
    "/iletisim",
    "/teklif-al",
    "/kvkk",
    "/gizlilik-politikasi",
    "/cerez-politikasi",
    "/kullanim-kosullari",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/bireysel") || route === "/teklif-al" ? 0.9 : 0.8,
  }));

  const blogRoutes = DEMO_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
