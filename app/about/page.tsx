"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

// Prism is WebGL/canvas — load client-only to avoid SSR window access.
const Prism = dynamic(() => import("../components/ui/Prism"), { ssr: false });

const STATS = [
  { prefix: "₹", value: 120, dec: false, suffix: "Cr+", label: "Loans Disbursed" },
  { prefix: "", value: 500, dec: false, suffix: "+", label: "NBFCs Onboarded" },
  { prefix: "", value: 99.9, dec: true, suffix: "%", label: "Platform Uptime" },
  { prefix: "", value: 12, dec: false, suffix: "+", label: "States Covered" },
];

const VALUES = [
  {
    title: "Vision",
    desc: "Streamline lending with intelligent automation, cut approval time by 80%, and eliminate manual errors.",
  },
  {
    title: "Core Values",
    desc: "Empower lenders with AI-driven credit assessment and automated KYC for faster, safer decisions.",
  },
  {
    title: "Mission",
    desc: "Digital-first, paperless lending — from application to disbursement with speed, compliance, and ease.",
  },
];

const SOLUTIONS = [
  {
    title: "Compliance Management",
    desc: "Ensure regulatory compliance with built-in tools and automated checks.",
  },
  {
    title: "Process Automation",
    desc: "Automate repetitive tasks and streamline your workflow for faster processing.",
  },
  {
    title: "Cost Reduction",
    desc: "Reduce operational costs by optimizing processes and minimizing errors.",
  },
  {
    title: "Enhanced Collaboration",
    desc: "Improve team collaboration with centralized data and communication tools.",
  },
  {
    title: "Data-Driven Insights",
    desc: "Gain valuable insights with real-time analytics and reporting dashboards.",
  },
  {
    title: "Secure and Reliable",
    desc: "Ensure data security and system reliability with robust infrastructure and protocols.",
  },
];

export default function AboutPage() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal sections/elements on scroll
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Stagger value cards
      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Cinematic 3D staggered reveal for solution cards
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".solution-card", { opacity: 1 });
      } else {
        gsap.fromTo(
          ".solution-card",
          {
            y: 90,
            opacity: 0,
            scale: 0.82,
            rotateX: -45,
            transformOrigin: "50% 100% -40px",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            ease: "power4.out",
            stagger: { each: 0.09, from: "center", grid: "auto" },
            scrollTrigger: {
              trigger: ".solutions-grid",
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Count-up stats
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const dec = el.dataset.dec === "1";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = dec
              ? counter.v.toFixed(1)
              : Math.floor(counter.v).toString();
          },
        });
      });
    }, rootRef);

    // Page height shifts after Prism canvas mounts + fonts load — recalc
    // trigger positions so sections below the fold still fire.
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
    <main
      ref={rootRef}
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* ===================== HERO — Prism background ===================== */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1729]">
        {/* Prism WebGL backdrop */}
        <div className="absolute inset-0 z-0">
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>

        {/* readability overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15,23,41,0.35), rgba(15,23,41,0.85) 80%)",
          }}
        />
        {/* bottom fade into next section */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-white to-transparent"
        />

        {/* content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-28 pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-sm text-slate-200 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2b7fff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2b7fff]" />
            </span>
            About Fundflick
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Building the future of <br className="hidden sm:block" />
            intelligent lending
          </h1>

          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Fundflick is the AI-powered operating system for modern NBFCs —
            streamlining loan processing, collections, and operations so lenders
            can grow faster with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contactus"
              variant="primary"
              className="px-8 py-3.5 text-sm whitespace-nowrap"
            >
              Get Started Free
            </Button>
            <Button
              href="/contactus"
              variant="secondary"
              className="px-8 py-3.5 text-sm whitespace-nowrap !text-white !border-white/40 hover:!bg-white/10 hover:!text-white"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40" />
        <p className="reveal text-xs uppercase tracking-[0.18em] text-secondaryColor font-bold text-center mb-4">
          Our Story
        </p>
        <h2
          className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center mb-8 leading-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Lending shouldn&apos;t be slow, manual, or risky
        </h2>
        <div className="reveal space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          <p>
            Fundflick was born out of a simple frustration — NBFCs were drowning
            in spreadsheets, disconnected tools, and manual follow-ups. Loan
            processing took days, collections leaked revenue, and operations ran
            on guesswork.
          </p>
          <p>
            We set out to change that. By combining{" "}
            <span className="font-semibold text-slate-900">
              AI-driven automation
            </span>{" "}
            with a unified platform for lending, HRMS, task management, and
            collections, Fundflick turns scattered operations into one
            intelligent workflow — built for the way modern lenders actually
            work.
          </p>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="bg-[#0f1729] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="reveal text-center px-2">
              <div
                className="flex items-baseline justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                <span>{s.prefix}</span>
                <span
                  className="stat-num"
                  data-value={s.value}
                  data-dec={s.dec ? "1" : "0"}
                >
                  0
                </span>
                <span>{s.suffix}</span>
              </div>
              <div className="mt-2 text-[0.7rem] sm:text-xs uppercase tracking-[0.12em] text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <p className="reveal text-xs uppercase tracking-[0.18em] text-secondaryColor font-bold text-center mb-4">
          What Drives Us
        </p>
        <h2
          className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center mb-14 leading-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Our core values
        </h2>
        <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="value-card group relative rounded-2xl border border-slate-200 bg-white p-7 hover:border-secondaryColor/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondaryColor/10 text-secondaryColor font-extrabold mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SOLUTIONS ===================== */}
      <section className="max-w-6xl mx-auto px-6 pb-20 md:pb-28">
        <h2
          className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Our Solutions
        </h2>
        <div className="reveal h-0.5 w-full bg-secondaryColor mb-7" />
        <div className="reveal space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-12">
          <p>
            Fundflick offers tailored solutions to address key challenges in the
            lending industry. From compliance to efficiency, we&apos;ve got you
            covered.
          </p>
          <p>
            Beyond our core solutions, Fundflick provides additional benefits to
            enhance your lending operations.
          </p>
        </div>

        <div className="solutions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 perspective-distant">
          {SOLUTIONS.map((s) => (
            <div
              key={s.title}
              className="solution-card group relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0f1729] to-[#2b3f6b] p-7 will-change-transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 100% 0%, rgba(43,127,255,0.35), transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="reveal relative overflow-hidden rounded-3xl bg-[#131c33] px-8 py-16 md:py-20 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(43,127,255,0.5), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              Ready to modernize your lending?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-9 font-light">
              Join 500+ NBFCs growing faster with Fundflick. Book a demo and see
              the platform in action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contactus"
                variant="brand"
                className="px-8 py-3.5 text-sm whitespace-nowrap"
              >
                Book a Demo
              </Button>
              <Button
                href="/contactus"
                variant="secondary"
                className="px-8 py-3.5 text-sm text-white border-white/30 hover:bg-white/10 whitespace-nowrap"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
