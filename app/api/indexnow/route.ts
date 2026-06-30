import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow } from "@/lib/indexnow";
import { PAGES, absoluteUrl } from "@/lib/seo-config";

// POST /api/indexnow            -> submit ALL sitemap URLs (needs secret)
// POST /api/indexnow { urls }   -> submit specific URLs
// Guard with INDEXNOW_SECRET (Authorization: Bearer <secret>).
export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  let urls: string[] = [];
  try {
    const body = await req.json().catch(() => ({}));
    if (Array.isArray(body?.urls) && body.urls.length) {
      urls = body.urls;
    }
  } catch {
    /* no body — fall through to full submit */
  }

  if (!urls.length) {
    urls = PAGES.map((p) => absoluteUrl(p.path));
  }

  const results = await pingIndexNow(urls);
  return NextResponse.json({ submitted: urls.length, results });
}
