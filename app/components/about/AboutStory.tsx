export default function AboutStory() {
  return (
    <section className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40" />
      <p className="reveal text-xs uppercase tracking-[0.18em] text-secondaryColor font-bold text-center mb-4">
        Our Story
      </p>
      <h2
        className="reveal text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center mb-8 leading-tight"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        Lending shouldn&apos;t be slow, manual, or risky
      </h2>
      <div className="reveal space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
        <p>
          Fundflick was born out of a simple frustration — NBFCs were drowning
          in spreadsheets, disconnected tools, and manual follow-ups. Loan
          processing took days, collections leaked revenue, and operations ran
          on guesswork.
        </p>
        <p>
          We set out to change that. By combining{" "}
          <span className="font-semibold text-slate-900">
            AI-driven automation
          </span>{" "}
          with a unified platform for lending, HRMS, task management, and
          collections, Fundflick turns scattered operations into one intelligent
          workflow — built for the way modern lenders actually work.
        </p>
      </div>
    </section>
  );
}
