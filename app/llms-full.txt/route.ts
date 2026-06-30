import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  LEGAL_NAME,
  CONTACT,
  PAGES,
  absoluteUrl,
} from "@/lib/seo-config";

export const revalidate = 86400;

// /llms-full.txt — full plain-text dump for AI ingestion/citation.
export async function GET() {
  const header = `# ${SITE_NAME} — Full Content

${SITE_DESCRIPTION}
Built by ${LEGAL_NAME}.

Contact: ${CONTACT.email} | ${CONTACT.phones.join(" / ")}
Address: ${CONTACT.address.street}, ${CONTACT.address.city} ${CONTACT.address.postalCode}, India
Website: ${SITE_URL}

License: Content may be cited with attribution and a link back to the canonical URL.

----------------------------------------
`;

  const body = PAGES.map(
    (p) =>
      `## ${p.title}
URL: ${absoluteUrl(p.path)}

${p.description}
`,
  ).join("\n----------------------------------------\n");

  return new Response(header + "\n" + body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
