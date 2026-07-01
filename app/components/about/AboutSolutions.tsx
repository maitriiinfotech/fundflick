import { ABOUT_SOLUTIONS } from "./aboutData";

// Minimal line icons (stroke = currentColor), one per solution by index.
const ICONS = [
  // Loan Origination & Management — banknotes
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
  />,
  // Collection Management — credit card
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
  />,
  // Smart Reports & Analytics — chart bars
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
  />,
  // HRMS — users
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
  />,
  // Task Management — clipboard list
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
  />,
  // Bookkeeping & Accounts — calculator
  <path
    key="i"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
  />,
];

// Parallax depth per card (yPercent target over scroll). Featured anchors at ~0.
const SPEEDS = [0, 14, -10, 16, -8, 12];

export default function AboutSolutions() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-12 py-12 md:pb-20">
      <h2
        className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        Our Solutions
      </h2>
      <div className="reveal h-0.5 w-full bg-secondaryColor mb-7" />
      <div className="reveal space-y-3 text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-12">
        <p>
          Fundflick brings every part of a lending operation onto one platform
          — origination, servicing, collections, HR, tasks, reporting and
          accounts.
        </p>
        <p>
          Each module is built for the way modern NBFCs actually work, and they
          all share a single source of truth.
        </p>
      </div>

      <div className="solutions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[224px] gap-5 perspective-distant">
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
              {/* background image — shared with feature page hero cards */}
              <img
                src={`/reveal/${(i % 5) + 1}.jpg`}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
              />
              {/* dark overlay for text readability */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#0f1729]/70 to-[#2b3f6b]/55"
              />
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
