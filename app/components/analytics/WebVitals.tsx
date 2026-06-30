"use client";

import { useReportWebVitals } from "next/web-vitals";

// Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) to /api/vitals.
// Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
export default function WebVitals() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      url: typeof location !== "undefined" ? location.pathname : "",
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/vitals",
        new Blob([body], { type: "application/json" }),
      );
    } else {
      fetch("/api/vitals", { method: "POST", body, keepalive: true }).catch(
        () => {},
      );
    }
  });
  return null;
}
