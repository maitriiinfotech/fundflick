// Server Component — static, no client JS.

const STAGES = [
  {
    no: "01",
    label: "Apply",
    desc: "Borrowers apply in minutes with instant eKYC and automated bureau pull.",
  },
  {
    no: "02",
    label: "Verify",
    desc: "AI-driven credit checks and automated underwriting decision in real time.",
  },
  {
    no: "03",
    label: "Disburse",
    desc: "One-click approval and instant bank transfers — the full loop, end to end.",
  },
];

export default function AboutJourney() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-t border-slate-100 py-12 md:py-20 px-6">
      {/* dotted texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* header */}
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-4">
            The Fundflick Journey
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            From application to disbursal —{" "}
            <span className="text-secondaryColor">without limits</span>
          </h2>
          <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            Fundflick carries your entire lending operation across every stage,
            wherever your business goes.
          </p>
        </div>

        {/* journey */}
        <div className="relative mt-20">
          {/* dashed connector */}
          <div className="hidden md:block absolute top-14 left-[16%] right-[16%] border-t-2 border-dashed border-slate-200" />
          {/* static plane riding the line */}
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {STAGES.map((s) => (
              <div key={s.no} className="text-center px-2">
                <div
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-secondaryColor/10 text-3xl font-black text-secondaryColor shadow-lg ring-1 ring-slate-100"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {s.no}
                </div>
                <h3
                  className="mt-6 text-xl sm:text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {s.label}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
