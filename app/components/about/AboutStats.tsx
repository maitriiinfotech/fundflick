import { ABOUT_STATS } from "./aboutData";

export default function AboutStats() {
  return (
    <section className="bg-[#0f1729] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label} className="reveal text-center px-2">
            <div
              className="flex items-baseline justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              <span>{stat.prefix}</span>
              <span
                className="stat-num"
                data-value={stat.value}
                data-dec={stat.dec ? "1" : "0"}
              >
                0
              </span>
              <span>{stat.suffix}</span>
            </div>
            <div className="mt-2 text-[0.7rem] sm:text-xs uppercase tracking-[0.12em] text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
