import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { getPublicBlogPostsAction } from "@/app/actions/blogActions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const blogPosts = await getPublicBlogPostsAction();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
