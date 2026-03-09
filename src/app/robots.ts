import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
    ],
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
    host: SITE.siteUrl,
  };
}
