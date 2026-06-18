import { ABOUT_SOLUTIONS } from "./aboutData";

// Minimal line icons (stroke = currentColor), one per solution by index.
const ICONS = [
  // Compliance — shield check
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12.75 11.25 15 15 9.75M21 12c0 4.97-3.582 9.06-8.25 9.94a.75.75 0 0 1-.5 0C7.582 21.06 4 16.97 4 12V6.3a.75.75 0 0 1 .5-.71l7.5-2.7a.75.75 0 0 1 .5 0l7.5 2.7a.75.75 0 0 1 .5.71V12Z"
  />,
  // Process automation — bolt
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
  />,
  // Cost reduction — rupee
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 6h12M6 10h12M9 6c3 0 5 1.5 5 4.5S12 14 9 14h-.5l5.5 6M6 10h6"
  />,
  // Collaboration — users
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
  />,
  // Insights — chart
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
  />,
  // Secure — lock
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
  />,
];

// Parallax depth per card (yPercent target over scroll). Featured anchors at ~0.
const SPEEDS = [0, 14, -10, 16, -8, 12];

export default function AboutSolutions() {
  return (
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

      <div className="solutions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[210px] gap-5 perspective-distant">
        {ABOUT_SOLUTIONS.map((solution, i) => {
          const featured = i === 0;
          return (
            <article
              key={solution.title}
              data-speed={SPEEDS[i] ?? 0}
              className={`solution-card group relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0f1729] to-[#2b3f6b] p-7 transform-3d will-change-transform ${
                featured
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between"
                  : ""
              }`}
            >
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 100% at 100% 0%, rgba(43,127,255,0.4), transparent 70%)",
                }}
              />
              {/* featured ambient ring */}
              {featured && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-2xl"
                  style={{ background: "rgba(43,127,255,0.25)" }}
                />
              )}

              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-secondaryColor ring-1 ring-white/15 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className={featured ? "w-7 h-7" : "w-6 h-6"}
                >
                  {ICONS[i]}
                </svg>
              </div>

              <div className="relative z-10 mt-5">
                <h3
                  className={`font-bold text-white mb-3 ${
                    featured ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"
                  }`}
                  style={
                    featured
                      ? { fontFamily: "var(--font-outfit), sans-serif" }
                      : undefined
                  }
                >
                  {solution.title}
                </h3>
                <p
                  className={`text-slate-300/90 leading-relaxed ${
                    featured ? "text-sm sm:text-base max-w-md" : "text-xs sm:text-sm"
                  }`}
                >
                  {solution.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
