import { ABOUT_VALUES } from "./aboutData";

export default function AboutValues() {
  return (
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
        {ABOUT_VALUES.map((value, index) => (
          <div
            key={value.title}
            className="value-card group relative rounded-2xl border border-slate-200 bg-white p-7 hover:border-secondaryColor/40 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondaryColor/10 text-secondaryColor font-extrabold mb-5">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {value.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
