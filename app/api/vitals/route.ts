import { NextRequest, NextResponse } from "next/server";

// Collector for Core Web Vitals beacons. No-op store for now — wire this to
// your analytics sink (DB, log drain, GA4) when ready.
export async function POST(req: NextRequest) {
  try {
    await req.json().catch(() => null);
  } catch {
    /* ignore malformed beacons */
  }
  return new NextResponse(null, { status: 204 });
}
