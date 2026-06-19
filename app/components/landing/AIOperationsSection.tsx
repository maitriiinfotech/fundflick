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
}

const FEATURES: Feature[] = [
  {
    no: "01",
    label: "AI Tele-Calling",
    badge: "AI Voice Agents",
    title: "Tele-calling, run end to end by AI",
    accent: "by AI",
    desc: "AI agents dial, converse, qualify and log every call — your tele-calling scales without scaling headcount.",
    bullets: [
      "Human-like AI voice conversations",
      "Real-time lead qualification & scoring",
      "Auto call summaries and next steps",
    ],
    rows: [
      { name: "Call — Lead #4821", meta: "AI handled" },
      { name: "Sentiment: interested", meta: "0.86" },
      { name: "Follow-up booked", meta: "Tomorrow" },
    ],
  },
  {
    no: "02",
    label: "AI HRMS",
    badge: "AI for People Ops",
    title: "HR that runs itself, powered by AI",
    accent: "powered by AI",
    desc: "From smart hiring to attrition prediction and auto-payroll — AI handles people operations end to end.",
    bullets: [
      "AI resume screening & shortlisting",
      "Attrition-risk prediction",
      "Automated payroll, attendance & leave",
    ],
    rows: [
      { name: "Payroll — June", meta: "Auto-run" },
      { name: "Attrition risk: 3 flagged", meta: "AI alert" },
      { name: "5 resumes shortlisted", meta: "AI" },
    ],
  },
  {
    no: "03",
    label: "AI Task Management",
    badge: "AI Planner",
    title: "AI plans the day for your team",
    accent: "AI plans",
    desc: "Auto-prioritizes, assigns and flags blockers before they happen — your team always knows what's next.",
    bullets: [
      "AI auto-prioritization & assignment",
      "Predictive workload balancing",
      "Blocker & deadline-risk alerts",
    ],
    rows: [
      { name: "Today: 12 tasks prioritized", meta: "AI" },
      { name: "Reassigned 3 (overload)", meta: "Auto" },
      { name: "2 deadline risks flagged", meta: "Alert" },
    ],
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
    <div className={`panel p${idx} h-screen w-full flex items-center relative`}>
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
          <div className="p-el">
            <Button href="/contactus" variant="brand" className="px-7 py-3 text-sm">
              Explore {f.label}
            </Button>
          </div>
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
                AI Live
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
        </div>
      </div>
    </div>
  );
}

export default function AIOperationsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setReduced(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "aiops",
          trigger: rootRef.current,
          start: "top top",
          end: "+=320%",
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

      // panel 0 in view at start
      reveal(".p0 .p-el", 0.1);

      // slide track to panel 1
      tl.to(".ops-track", { yPercent: -33.333, duration: 0.8, ease: "power2.inOut" }, 1.2);
      reveal(".p1 .p-el", 1.7);

      // slide track to panel 2
      tl.to(".ops-track", { yPercent: -66.667, duration: 0.8, ease: "power2.inOut" }, 2.7);
      reveal(".p2 .p-el", 3.2);

      // hold + progress
      tl.fromTo(".ops-progress", { scaleY: 0 }, { scaleY: 1, duration: 4 }, 0);
      tl.to(".ops-stage", { opacity: 1, duration: 0.8 }, 3.8);
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

  // ---------- pinned immersive stage ----------
  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-[#0a0e1a]"
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

      {/* eyebrow + section heading (pinned overlay, top-left) */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-6 pointer-events-none">
        <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-2">
          Beyond Lending
        </p>
        <h2
          className="text-lg sm:text-2xl font-extrabold text-white/90 leading-tight max-w-xl"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          We don&apos;t just provide lending —{" "}
          <span className="text-secondaryColor">
            we run the overall operation of your company.
          </span>
        </h2>
      </div>

      {/* vertical progress rail */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-3">
        <span className="text-[0.65rem] font-mono text-slate-500">01</span>
        <div className="relative h-40 w-px bg-white/10 overflow-hidden">
          <div className="ops-progress absolute inset-0 origin-top scale-y-0 bg-secondaryColor" />
        </div>
        <span className="text-[0.65rem] font-mono text-slate-500">03</span>
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
  );
}
