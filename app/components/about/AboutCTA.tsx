"use client";

import Button from "../ui/Button";

export default function AboutCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
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
  );
}
