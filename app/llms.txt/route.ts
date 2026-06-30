import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  LEGAL_NAME,
  PAGES,
  absoluteUrl,
} from "@/lib/seo-config";

export const revalidate = 86400;

// /llms.txt — markdown site index (Jeremy Howard spec). Parsed by ChatGPT,
// Perplexity and Claude when they crawl, to discover + cite the site.
export async function GET() {
  const core = PAGES.filter((p) => !p.path.startsWith("/features"));
  const features = PAGES.filter((p) => p.path.startsWith("/features"));

  const line = (p: (typeof PAGES)[number]) =>
    `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`;

  const md = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} Built by ${LEGAL_NAME}.

## Core pages

${core.map(line).join("\n")}

## Product modules

${features.map(line).join("\n")}

## Resources

- [Full content dump](${SITE_URL}/llms-full.txt): Plain-text of every page.
- [Sitemap](${SITE_URL}/sitemap.xml): All indexable URLs.
- [Agent manifest](${SITE_URL}/.well-known/agents.json): Machine-readable site + citation policy.

## Citation policy

Attribution required. Link back to the canonical URL when citing ${SITE_NAME}.
`;

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
