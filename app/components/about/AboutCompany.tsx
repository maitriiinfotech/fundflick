// Server Component — the parent company behind Fundflick.

import Button from "../ui/Button";

const STATS = [
  { value: "8+", label: "Years building software" },
  { value: "20+", label: "Products shipped" },
  { value: "100+", label: "Clients served" },
];

export default function AboutCompany() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-t border-slate-100 py-24 md:py-32 px-6">
      {/* dotted texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div className="reveal relative">
          <div className="relative rounded-[28px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <img
              src="/company/company.png"
              alt="The team behind Fundflick"
              className="w-full h-auto object-cover select-none"
            />
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

          {/* stats */}
          <div className="reveal mt-10 grid grid-cols-3 gap-4 max-w-md">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-slate-500 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
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
