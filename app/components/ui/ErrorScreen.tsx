"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface ErrorScreenProps {
  /** Big display code, e.g. "404" or "500". */
  code: string;
  title: string;
  message: string;
  /** Seconds before auto-redirecting home. */
  redirectAfter?: number;
  /** When provided, shows a "Try again" button that runs this. */
  onRetry?: () => void;
}

export default function ErrorScreen({
  code,
  title,
  message,
  redirectAfter = 5,
  onRetry,
}: ErrorScreenProps) {
  const router = useRouter();
  const [count, setCount] = useState(redirectAfter);

  useEffect(() => {
    const tick = setInterval(() => {
      setCount((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    const redirect = setTimeout(() => {
      router.replace("/");
    }, redirectAfter * 1000);

    return () => {
      clearInterval(tick);
      clearTimeout(redirect);
    };
  }, [router, redirectAfter]);

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#131c33] px-6 text-white"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] opacity-60 pointer-events-none" />
      {/* blue glows */}
      <div className="absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-secondaryColor/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-[380px] w-[380px] rounded-full bg-secondaryColor/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-lg text-center">
        <p
          className="text-7xl sm:text-8xl font-extrabold tracking-tight text-secondaryColor"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {code}
        </p>
        <h1
          className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {title}
        </h1>
        <p className="mt-3 text-slate-300 text-base leading-relaxed font-light">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="brand">
            Go to home now
          </Button>
          {onRetry && (
            <Button variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-slate-400">
          Redirecting to home in{" "}
          <span className="font-bold text-secondaryColor">{count}s</span>
        </p>
      </div>
    </main>
  );
}
