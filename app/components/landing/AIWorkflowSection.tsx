"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface Scene {
  no: string;
  label: string;
  kicker: string;
  title: string;
  desc: string;
  nodes: string[];
  cards: { name: string; meta: string }[];
}

const SCENES: Scene[] = [
  {
    no: "01",
    label: "Workflow Automation",
    kicker: "Run on autopilot",
    title: "Repetitive ops become self-running workflows",
    desc: "Triggers fire, approvals route themselves, and the busywork runs end to end — your team ships outcomes, not handoffs.",
    nodes: ["Trigger", "Route", "Approve", "Done"],
    cards: [
      { name: "Loan application received", meta: "Auto-assigned" },
      { name: "KYC verification", meta: "Running" },
      { name: "Credit approval routing", meta: "Queued" },
    ],
  },
  {
    no: "02",
    label: "Note Tracker / MOM",
    kicker: "Never miss a follow-up",
    title: "Every meeting, captured and actioned",
    desc: "Minutes write themselves, action items get extracted, owners get assigned — nothing slips after the call ends.",
    nodes: ["Listen", "Summarize", "Assign", "Remind"],
    cards: [
      { name: "Approve revised credit policy", meta: "Owner: Riya" },
      { name: "Share Q3 disbursal report", meta: "Owner: Aman" },
      { name: "Follow up with NBFC partner", meta: "Due: Fri" },
    ],
  },
  {
    no: "03",
    label: "AI Tele-Calling",
    kicker: "AI Voice Agents",
    title: "Tele-calling, run end to end by AI",
    desc: "AI agents dial, converse, qualify and log every call — your tele-calling scales without scaling headcount.",
    nodes: ["Dial", "Converse", "Qualify", "Log"],
    cards: [
      { name: "Call — Lead #4821", meta: "AI handled" },
      { name: "Sentiment: interested", meta: "0.86" },
      { name: "Follow-up booked", meta: "Tomorrow" },
    ],
  },
  {
    no: "04",
    label: "AI Chatbot",
    kicker: "Always-on support",
    title: "Customers get instant answers, around the clock",
    desc: "An AI assistant handles queries, qualifies leads and hands complex cases to a human — instant replies, day or night.",
    nodes: ["Ask", "Understand", "Answer", "Handoff"],
    cards: [
      { name: "Query — EMI due date", meta: "AI replied" },
      { name: "Lead captured", meta: "Routed" },
      { name: "Escalated to agent", meta: "Complex" },
    ],
  },
];

const EMAILS = "FUND FLICK".split("");

// Headline split into words for the scroll-scrub "text on scroll" reveal.
const HEADLINE: { w: string; accent?: boolean }[] = [
  { w: "In" },
  { w: "the" },
  { w: "world" },
  { w: "of" },
  { w: "AI," },
  { w: "we" },
  { w: "don’t" },
  { w: "just" },
  { w: "write" },
  { w: "emails" },
  { w: "—" },
  { w: "we", accent: true },
  { w: "automate", accent: true },
  { w: "the", accent: true },
  { w: "work", accent: true },
  { w: "behind", accent: true },
  { w: "them.", accent: true },
];

function SceneVisual({
  scene,
  idx,
  revealed = false,
}: {
  scene: Scene;
  idx: number;
  revealed?: boolean;
}) {
  return (
    <div className={`s${idx} w-full`}>
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* copy */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span
              className="scene-el text-5xl font-extrabold text-slate-200"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {scene.no}
            </span>
            <span className="scene-el text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold">
              {scene.kicker}
            </span>
          </div>
          <h3
            className="scene-el text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5 leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {scene.title}
          </h3>
          <p className="scene-el text-slate-600 text-base leading-relaxed mb-8 max-w-md">
            {scene.desc}
          </p>
          <div className="scene-el">
            <Button
              href="/contactus"
              variant="primary"
              className="px-7 py-3 text-sm"
            >
              Explore Fundflick
            </Button>
          </div>
        </div>

        {/* flow visual */}
        <div className="relative">
          <div className="relative mb-6">
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 overflow-visible"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
            >
              <path
                className={`connector c${idx}`}
                d="M0 1 L100 1"
                pathLength={1}
                fill="none"
                stroke="#2b7fff"
                strokeWidth={0.6}
                style={{ strokeDasharray: 1, strokeDashoffset: revealed ? 0 : 1 }}
              />
            </svg>
            <div className="relative flex justify-between">
              {scene.nodes.map((n) => (
                <span
                  key={n}
                  className="node scene-el rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 shadow-sm"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
            <div className="flex items-center gap-1.5 mb-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[0.7rem] uppercase tracking-widest text-slate-400">
                {scene.label}
              </span>
            </div>
            <div className="space-y-2.5">
              {scene.cards.map((c) => (
                <div
                  key={c.name}
                  className="stack-card flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5"
                >
                  <span className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-secondaryColor" />
                    {c.name}
                  </span>
                  <span className="text-[0.7rem] font-medium text-slate-400">
                    {c.meta}
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

export default function AIWorkflowSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pinned cinematic stage is desktop-only; mobile uses a static stacked layout.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "aiworkflow",
          trigger: rootRef.current,
          start: "top top",
          end: "+=600%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1 — FUND FLICK scatters
      tl.to(".email-char", {
        y: () => gsap.utils.random(-260, 260),
        x: () => gsap.utils.random(-160, 160),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: 0,
        stagger: 0.04,
        ease: "power1.in",
        duration: 1,
      })
        .to(".emails-layer", { scale: 1.35, opacity: 0, duration: 1 }, 0)

        // 2a — bring the dim headline in once the word has scattered
        .fromTo(
          ".headline-layer",
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          1.0,
        )
        // 2b — TEXT ON SCROLL: words light up one by one
        .fromTo(
          ".hl-word",
          { opacity: 0.15 },
          { opacity: 1, stagger: 0.05, duration: 1 },
          1.15,
        )
        .to(
          ".headline-layer",
          { yPercent: -40, opacity: 0, duration: 0.4, ease: "power2.in" },
          2.4,
        )

        // 3 — scene 1
        .fromTo(".scenes-layer", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.4)
        .fromTo(
          ".s0 .scene-el",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          2.5,
        )
        .to(".c0", { strokeDashoffset: 0, duration: 0.6 }, 2.65)
        .fromTo(
          ".s0 .stack-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
          2.8,
        )

        // 4 — slide to scene 2 (track 400vw → -1/4 = one screen)
        .to(
          ".scene-track",
          { xPercent: -25, duration: 0.9, ease: "power2.inOut" },
          3.4,
        )
        .fromTo(
          ".s1 .scene-el",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          3.95,
        )
        .to(".c1", { strokeDashoffset: 0, duration: 0.6 }, 4.05)
        .fromTo(
          ".s1 .stack-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
          4.2,
        )

        // 5 — slide to scene 3 (-2/4)
        .to(
          ".scene-track",
          { xPercent: -50, duration: 0.9, ease: "power2.inOut" },
          4.9,
        )
        .fromTo(
          ".s2 .scene-el",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          5.45,
        )
        .to(".c2", { strokeDashoffset: 0, duration: 0.6 }, 5.55)
        .fromTo(
          ".s2 .stack-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
          5.7,
        )

        // 6 — slide to scene 4 (-3/4)
        .to(
          ".scene-track",
          { xPercent: -75, duration: 0.9, ease: "power2.inOut" },
          6.4,
        )
        .fromTo(
          ".s3 .scene-el",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          6.95,
        )
        .to(".c3", { strokeDashoffset: 0, duration: 0.6 }, 7.05)
        .fromTo(
          ".s3 .stack-card",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" },
          7.2,
        )

        // 7 — hold scene 4 centered before the pin releases
        .to(".scenes-layer", { opacity: 1, duration: 0.8 }, 7.7)

        // progress rail fills across the journey
        .fromTo(".rail-fill", { scaleX: 0 }, { scaleX: 1, duration: 8.5 }, 0);
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

  return (
    <>
      {/* MOBILE — static stacked (no pin, no overlap with AIOperations) */}
      <section className="lg:hidden bg-white overflow-hidden py-20">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            In the world of AI, we don&apos;t just write emails —{" "}
            <span className="text-secondaryColor">
              we automate the work behind them.
            </span>
          </h2>
        </div>
        <div className="space-y-16">
          {(showAll ? SCENES : SCENES.slice(0, 1)).map((s, i) => (
            <SceneVisual key={s.no} scene={s} idx={i} revealed />
          ))}
        </div>

        {!showAll && (
          <div className="px-6 pt-12 flex justify-center">
            <Button
              onClick={() => setShowAll(true)}
              variant="brand"
              className="px-8 py-3.5 text-sm"
            >
              View More
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

      {/* DESKTOP — pinned cinematic stage */}
      <section
        ref={rootRef}
        className="hidden lg:block relative h-screen overflow-hidden bg-white"
      >
      {/* dotted grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:26px_26px] opacity-50"
      />

      {/* 1 — giant kinetic FUND FLICK */}
      <div className="emails-layer absolute inset-0 flex items-center justify-center">
        <div
          className="flex whitespace-nowrap leading-none font-extrabold select-none"
          style={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: "14vw",
            color: "transparent",
            WebkitTextStroke: "2px #131c33",
          }}
        >
          {EMAILS.map((ch, i) => (
            <span
              key={i}
              className="email-char inline-block"
              style={ch === " " ? { width: "0.35em" } : undefined}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>
      </div>

      {/* 2 — headline (text on scroll) */}
      <div className="headline-layer absolute inset-0 flex items-center justify-center px-6 opacity-0">
        <h2
          className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 text-center max-w-5xl leading-[1.12]"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {HEADLINE.map((word, i) => (
            <span
              key={i}
              className={`hl-word inline-block opacity-20 ${
                word.accent ? "text-secondaryColor" : ""
              }`}
            >
              {word.w}
            </span>
          ))}
        </h2>
      </div>

      {/* 3 — scroll-driven feature scenes */}
      <div className="scenes-layer absolute inset-0 flex items-center opacity-0">
        <div className="scene-track flex w-[400vw]">
          {SCENES.map((s, i) => (
            <div key={s.no} className="w-screen shrink-0 flex items-center">
              <SceneVisual scene={s} idx={i} />
            </div>
          ))}
        </div>
      </div>

      {/* progress rail */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="h-[3px] w-40 sm:w-64 overflow-hidden rounded-full bg-slate-200">
          <div className="rail-fill h-full w-full origin-left scale-x-0 bg-[#131c33]" />
        </div>
      </div>
    </section>
    </>
  );
}
