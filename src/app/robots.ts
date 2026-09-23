import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.meta.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
