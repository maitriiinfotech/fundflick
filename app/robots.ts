import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

// Multi-engine + AI-agent aware. Fundflick is a content/marketing brand —
// we WANT to be cited by AI search, so major AI bots are allowed; only
// low-value bulk scrapers are blocked.
export default function robots(): MetadataRoute.Robots {
  const allow = ["/", "/llms.txt", "/llms-full.txt", "/.well-known/"];
  const disallow = ["/api/", "/_next/"];

  const search = [
    "*",
    "Googlebot",
    "Googlebot-Image",
    "bingbot",
    "DuckDuckBot",
    "Slurp", // Yahoo
    "Applebot",
    "Yeti", // Naver
  ].map((userAgent) => ({ userAgent, allow, disallow }));

  return {
    rules: [
      ...search,
      { userAgent: "Yandex", allow, disallow, crawlDelay: 2 },

      // AI search & agents — allow for citation/discovery
      ...[
        "GPTBot",
        "ChatGPT-User",
        "OAI-SearchBot",
        "PerplexityBot",
        "Perplexity-User",
        "anthropic-ai",
        "Claude-Web",
        "ClaudeBot",
        "Claude-SearchBot",
        "Google-Extended",
        "Applebot-Extended",
        "Meta-ExternalAgent",
        "Amazonbot",
        "DuckAssistBot",
        "cohere-ai",
      ].map((userAgent) => ({ userAgent, allow, disallow })),

      // Low-value / abusive scrapers
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "ImagesiftBot", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
