// Server component — shared simple layout for legal pages.

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-white pt-28 pb-24 px-6">
      {/* dotted texture */}
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <article className="relative mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondaryColor mb-3">
          Legal
        </p>
        <h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>

        <p className="mt-8 text-base sm:text-lg leading-relaxed text-slate-700">
          {intro}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <section key={section.heading}>
              <h2
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-3"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {i + 1}. {section.heading}
              </h2>
              <div className="space-y-3 text-base leading-relaxed text-slate-600">
                {section.body.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-slate-100 pt-6 text-sm text-slate-500">
          Questions about this page? Reach us at{" "}
          <a
            href="mailto:support@fundflick.com"
            className="font-semibold text-secondaryColor hover:underline"
          >
            support@fundflick.com
          </a>
          .
        </p>
      </article>
    </main>
  );
}
