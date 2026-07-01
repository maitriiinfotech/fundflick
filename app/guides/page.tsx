interface VideoLink {
  label: string;
  href: string;
}

interface Resource {
  category: string;
  title: string;
  desc: string;
  meta: string;
  accent: string; // gradient classes for the card header
  videos?: VideoLink[]; // when present, card shows watch links instead of "Read more"
}

const ACCENT: Record<string, string> = {
  Blogs: "from-emerald-500 to-teal-600",
  Guides: "from-[#2b7fff] to-[#1e3a75]",
  Templates: "from-amber-500 to-orange-600",
  "Reports & Insights": "from-violet-500 to-purple-700",
  Ebooks: "from-rose-500 to-pink-600",
};

const RESOURCES: Resource[] = [
  {
    category: "Guides",
    title: "Mark Your Daily Attendance (On-site)",
    desc: "A step-by-step video walkthrough showing on-site team members how to mark daily attendance on the HRMS portal. Marking attendance every day is mandatory for all on-site users.",
    meta: "Video guide",
    accent: ACCENT.Guides,
    videos: [
      {
        label: "Attendance walkthrough",
        href: "https://drive.google.com/file/d/1TO-6w4W6H-pIiw5nsQOMOlfcMLiBLAQK/view?usp=drive_link",
      },
      {
        label: "On-site attendance",
        href: "https://drive.google.com/file/d/1P-zDyBc7FF1NS7BpAm9uAVsq_KQkqgdO/view?usp=sharing",
      },
    ],
  },
  {
    category: "Guides",
    title: "Creating and Working on Tasks",
    desc: "A step-by-step video series on how to create tasks and work through each of the four task categories in Fundflick — Other, Approval, Payment, and Pendency.",
    meta: "4 videos",
    accent: ACCENT.Guides,
    videos: [
      {
        label: "Other tasks",
        href: "https://drive.google.com/file/d/1rz5BT6emqjmHZwF_q6oh77wAEfR5VjCp/view?usp=drive_link",
      },
      {
        label: "Approval tasks",
        href: "https://drive.google.com/file/d/1WX7uvOK-7kOrWHijOaR4q3AvrB9m3mid/view?usp=drive_link",
      },
      {
        label: "Payment tasks",
        href: "https://drive.google.com/file/d/15mKFXF54Xm7xnptMGOtT56eS0Va66xVy/view?usp=drive_link",
      },
      {
        label: "Pendency tasks",
        href: "https://drive.google.com/file/d/15Md8bmmsHl7Fc1AJqiYDXp2c9Aeyasr1/view?usp=drive_link",
      },
    ],
  },
];

const CategoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.4}
    stroke="currentColor"
    className="w-12 h-12 text-white/90"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

export default function GuidesPage() {
  return (
    <div
      className="min-h-screen bg-white text-slate-900 pb-24 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* light dot-grid behind the content area */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* ===== Hero — full-width dark banner ===== */}
      <section className="relative w-full bg-[#131c33] text-white overflow-hidden pt-32 pb-28 md:pt-40 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] opacity-60 pointer-events-none" />
        <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] bg-[#2b7fff]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[380px] h-[380px] bg-[#2b7fff]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-secondaryColor font-bold mb-5">
            Fundflick Library
          </p>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Resource Library
          </h1>
          <p className="mt-5 text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
            See what&apos;s possible and learn how to get started.
          </p>
        </div>
      </section>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mt-16">
        {/* ===== Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((r) => (
              <article
                key={r.title}
                className="group rounded-[24px] border border-slate-200 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* header */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${r.accent} flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
                  <CategoryIcon />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
                    {r.category}
                  </span>
                </div>
                {/* body */}
                <div className="p-6">
                  <h3
                    className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-[#2b7fff] transition-colors"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light mb-5">
                    {r.desc}
                  </p>
                  {r.videos ? (
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {r.meta}
                      </span>
                      <ul className="mt-3 space-y-2">
                        {r.videos.map((v) => (
                          <li key={v.href}>
                            <a
                              href={v.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-secondaryColor hover:underline"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 shrink-0"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              Watch: {v.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {r.meta}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondaryColor">
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </article>
          ))}
        </div>
      </div>
    </div>
  );
}
