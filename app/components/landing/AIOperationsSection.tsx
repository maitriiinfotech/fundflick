"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  no: string;
  label: string;
  badge: string;
  title: string;
  accent: string; // highlighted phrase inside title
  desc: string;
  bullets: string[];
  rows: { name: string; meta: string }[];
  href?: string; // optional "Know more" deep-link
  comingSoon?: boolean;
}

const FEATURES: Feature[] = [
  {
    no: "01",
    label: "HRMS",
    badge: "HR Suite",
    title: "Attendance, payroll and leave on autopilot",
    accent: "on autopilot",
    desc: "Run attendance, payroll, leave and people ops on autopilot — so your team focuses on people, not paperwork.",
    bullets: [
      "Biometric & geo-fenced attendance",
      "Automated payroll with PF, ESI & TDS",
      "Leave workflows & multi-branch management",
    ],
    rows: [
      { name: "Payroll — June", meta: "Processed" },
      { name: "Attendance synced", meta: "Live" },
      { name: "3 leave requests", meta: "Approved" },
    ],
    href: "/features/hrms",
  },
  {
    no: "02",
    label: "Task Management",
    badge: "Task Suite",
    title: "Keep every task on track, end to end",
    accent: "end to end",
    desc: "Real-time dashboards, bulk and recurring assignment, and a client ledger that turns completed work into billing — your team always knows what's next.",
    bullets: [
      "Individual & team task dashboards",
      "Bulk & recurring task assignment",
      "Client ledger billing on completion",
    ],
    rows: [
      { name: "Today: 12 tasks", meta: "On track" },
      { name: "Bulk assigned: 8", meta: "Done" },
      { name: "Ledger entry created", meta: "Billed" },
    ],
    href: "/features/task-management",
  },
];

function renderTitle(f: Feature) {
  const parts = f.title.split(f.accent);
  return (
    <>
      {parts[0]}
      <span className="text-secondaryColor">{f.accent}</span>
      {parts[1]}
    </>
  );
}

function Panel({ f, idx }: { f: Feature; idx: number }) {
  return (
    <div
      className={`panel p${idx} min-h-screen lg:h-screen w-full flex items-center relative py-20 lg:py-0`}
    >
      {/* giant ghost number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 md:right-10 top-1/2 -translate-y-1/2 font-black leading-none select-none"
        style={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: "30vw",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
        }}
      >
        {f.no}
      </span>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* copy */}
        <div>
          <span className="p-el inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#8ec0ff] backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-secondaryColor animate-pulse" />
            {f.badge}
          </span>
          {f.comingSoon && (
            <span className="p-el ml-2 inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/15 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-amber-300 mb-6">
              Coming Soon
            </span>
          )}
          <h3
            className="p-el text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {renderTitle(f)}
          </h3>
          <p className="p-el text-slate-300/85 text-base sm:text-lg leading-relaxed max-w-md mb-7 font-light">
            {f.desc}
          </p>
          <ul className="p-el space-y-3 mb-9">
            {f.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-sm text-slate-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondaryColor/20 text-secondaryColor">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* visual */}
        <div className="p-el p-visual relative">
          <div className="relative rounded-2xl border border-white/10 bg-[#131c33] p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[0.7rem] uppercase tracking-widest text-slate-400">
                {f.label}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondaryColor/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#8ec0ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-secondaryColor animate-pulse" />
                {f.comingSoon ? "Coming Soon" : "Live"}
              </span>
            </div>
            <div className="space-y-2.5">
              {f.rows.map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0f1729] px-4 py-3.5"
                >
                  <span className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="h-2 w-2 rounded-full bg-secondaryColor" />
                    {r.name}
                  </span>
                  <span className="text-[0.7rem] font-medium text-slate-400">
                    {r.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {f.href && (
            <div className="mt-6 flex justify-end">
              <Button
                href={f.href}
                variant="brand"
                className="px-6 py-3 text-xs sm:text-sm inline-flex items-center gap-2"
              >
                Know more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIOperationsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReduced(true);
      return;
    }

    // Pinned immersive stage is desktop-only; mobile uses a static layout.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "aiops",
          trigger: rootRef.current,
          start: "top top",
          end: "+=280%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const reveal = (sel: string, at: number) =>
        tl.fromTo(
          sel,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          at,
        );

      // heading starts big + viewport-centered, then docks to top-left on scroll
      const heading = rootRef.current?.querySelector<HTMLElement>(".ops-heading");
      const section = rootRef.current;
      if (heading && section) {
        // Measure RELATIVE to the section — when pinned, section top == viewport top,
        // so the centering offsets hold no matter where the page is scrolled at setup.
        const measure = () => {
          gsap.set(heading, { clearProps: "transform" });
          const h = heading.getBoundingClientRect();
          const s = section.getBoundingClientRect();
          return {
            cx: h.left - s.left + h.width / 2,
            cy: h.top - s.top + h.height / 2,
            w: h.width,
          };
        };
        tl.fromTo(
          heading,
          {
            // uniform scale — starts big, shrinks to 1×; capped to viewport width
            scale: () => Math.min(2.4, (window.innerWidth * 0.85) / measure().w),
            x: () => window.innerWidth / 2 - measure().cx,
            y: () => window.innerHeight / 2 - measure().cy,
          },
          { scale: 1, x: 0, y: 0, ease: "none", duration: 1 },
          0,
        );
      }

      // panel 0 content stays hidden behind the hero heading, reveals once it docks
      reveal(".p0 .p-el", 1.05);

      // slide track to panel 1 (last)
      tl.to(".ops-track", { yPercent: -50, duration: 0.8, ease: "power2.inOut" }, 2.0);
      reveal(".p1 .p-el", 2.5);

      // progress rail fills across the journey
      tl.fromTo(".ops-progress", { scaleY: 0 }, { scaleY: 1, duration: 3.2 }, 0);
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  // ---------- reduced-motion: simple stacked dark layout ----------
  if (reduced) {
    return (
      <section className="bg-[#0a0e1a] py-24">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-4">
            Beyond Lending
          </p>
          <h2
            className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            We don&apos;t just provide lending —{" "}
            <span className="text-secondaryColor">
              we run the overall operation of your company.
            </span>
          </h2>
        </div>
        <div className="space-y-12">
          {FEATURES.map((f, i) => (
            <Panel key={f.no} f={f} idx={i} />
          ))}
        </div>
      </section>
    );
  }

  // ---------- mobile static + desktop pinned ----------
  return (
    <>
      {/* MOBILE — static stacked (no pin, no overlap) */}
      <section className="lg:hidden bg-[#0a0e1a] overflow-hidden pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-4">
            Beyond Lending
          </p>
          <h2
            className="text-3xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            We don&apos;t just provide lending —{" "}
            <span className="text-secondaryColor">
              we run the overall operation of your company.
            </span>
          </h2>
        </div>
        {(showAll ? FEATURES : FEATURES.slice(0, 1)).map((f, i) => (
          <Panel key={f.no} f={f} idx={i} />
        ))}

        {!showAll && (
          <div className="px-6 pt-2 flex justify-center">
            <Button
              onClick={() => setShowAll(true)}
              variant="brand"
              className="px-8 py-3.5 text-sm"
            >
              View More Features
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2.5}
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          </div>
        )}
      </section>

      {/* DESKTOP — pinned immersive stage */}
      <section
        ref={rootRef}
        className="hidden lg:block relative h-screen overflow-hidden bg-[#0a0e1a]"
      >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
        }}
      />

      {/* eyebrow + section heading — starts big + centered, docks here on scroll */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-7xl px-6 pointer-events-none">
        <div
          className="ops-heading max-w-xl"
          style={{ transformOrigin: "center center", willChange: "transform" }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-2">
            Beyond Lending
          </p>
          <h2
            className="text-lg sm:text-2xl font-extrabold text-white/90 leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            We don&apos;t just provide lending —{" "}
            <span className="text-secondaryColor">
              we run the overall operation of your company.
            </span>
          </h2>
        </div>
      </div>

      {/* vertical progress rail */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-3">
        <span className="text-[0.65rem] font-mono text-slate-500">01</span>
        <div className="relative h-40 w-px bg-white/10 overflow-hidden">
          <div className="ops-progress absolute inset-0 origin-top scale-y-0 bg-secondaryColor" />
        </div>
        <span className="text-[0.65rem] font-mono text-slate-500">02</span>
      </div>

      {/* vertical panel track */}
      <div className="ops-stage absolute inset-0">
        <div className="ops-track absolute inset-x-0 top-0">
          {FEATURES.map((f, i) => (
            <Panel key={f.no} f={f} idx={i} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
