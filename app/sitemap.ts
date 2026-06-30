import type { MetadataRoute } from "next";
import { PAGES, absoluteUrl } from "@/lib/seo-config";

export const revalidate = 86400; // 1 day

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
