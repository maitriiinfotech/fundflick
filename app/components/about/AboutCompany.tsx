"use client";

// The parent company behind Fundflick.

import { useState } from "react";
import Button from "../ui/Button";

export default function AboutCompany() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-white border-t border-slate-100 py-12 md:py-20 px-6">
      {/* dotted texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Logo card */}
        <div className="reveal relative">
          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-50" />

            {!imgError ? (
              <img
                src="/company/logo.webp"
                alt="Maitrii Infotech"
                onError={() => setImgError(true)}
                className="relative max-w-[80%] max-h-[45%] object-contain select-none"
              />
            ) : (
              <span
                className="relative text-2xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Maitrii Infotech
              </span>
            )}
          </div>
          {/* accent glow */}
          <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-secondaryColor/10 rounded-full blur-[80px] pointer-events-none" />
        </div>

        {/* Copy */}
        <div>
          <p className="reveal text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-4">
            The company behind Fundflick
          </p>
          <h2
            className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Built by{" "}
            <span className="text-secondaryColor">Maitrii Infotech</span>
          </h2>
          <div className="reveal space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p>
              Fundflick is built and backed by{" "}
              <span className="font-semibold text-slate-900">
                Maitrii Infotech
              </span>{" "}
              — a product engineering company that designs and ships software
              for lenders, NBFCs, and growing businesses across India.
            </p>
            <p>
              We pair deep fintech domain knowledge with modern engineering to
              turn messy, manual operations into clean, automated workflows.
              Fundflick is the platform where that philosophy comes together —
              lending, HR, tasks, and collections, run as one.
            </p>
          </div>

          <div className="reveal mt-10">
            <Button
              href="/contactus"
              variant="primary"
              className="px-7 py-3.5 text-sm"
            >
              Work with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
