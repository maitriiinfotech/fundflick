"use client";

import dynamic from "next/dynamic";
import Button from "../ui/Button";

const Prism = dynamic(() => import("../ui/Prism"), { ssr: false });

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0f1729]">
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15,23,41,0.35), rgba(15,23,41,0.85) 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-white to-transparent"
      />

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
  );
}
