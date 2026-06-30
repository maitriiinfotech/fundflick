import "server-only";
import { SITE_HOST } from "./seo-config";

// IndexNow — one POST notifies Bing, Yandex, Seznam, Naver instantly (and
// feeds ChatGPT Search via Bing's index). The key is published as a public
// .txt file so the engines can verify ownership.
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "a7f3c9e21b8d4f06a5c1e9d27b34f8a0";

const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export async function pingIndexNow(urls: string[]) {
  if (!urls.length) return [];
  const body = JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  return Promise.all(
    ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
      })
        .then((r) => ({ endpoint, status: r.status, ok: r.ok }))
        .catch(() => ({ endpoint, status: 0, ok: false })),
    ),
  );
}
