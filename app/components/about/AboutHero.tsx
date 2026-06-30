import Button from "../ui/Button";

// Plain server-rendered hero — redesigned UI, original copy. Background is the
// shared home pattern image with a navy scrim (no client WebGL).
export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[68vh] flex items-center overflow-hidden bg-[#0f1729]">
      {/* background — same pattern image as the home hero */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero_bg_pattern.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* navy scrim — darker on the left where the copy sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,23,41,0.94) 0%, rgba(15,23,41,0.82) 45%, rgba(15,23,41,0.55) 100%)",
        }}
      />
      {/* accent glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 88% 18%, rgba(43,127,255,0.28), transparent 70%)",
        }}
      />
      {/* bottom fade into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-white to-transparent"
      />

      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-sm text-slate-200 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2b7fff] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2b7fff]" />
          </span>
          About Fundflick
        </div>

        {/* headline */}
        <h1
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.98]"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Building the future of{" "}
          <span className="bg-gradient-to-r from-[#2b7fff] to-[#8ec0ff] bg-clip-text text-transparent">
            intelligent lending
          </span>
        </h1>

        {/* sub copy */}
        <p className="mt-7 max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-light">
          Fundflick is the AI-powered operating system for modern NBFCs —
          streamlining loan processing, collections, and operations so lenders
          can grow faster with confidence.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            href="/contactus"
            variant="primary"
            className="px-8 py-3.5 text-sm whitespace-nowrap"
          >
            Get Started Free
          </Button>
          <Button
            href="/contactus"
            variant="secondary"
            className="px-8 py-3.5 text-sm whitespace-nowrap !text-white !border-white/40 hover:!bg-white/10 hover:!text-white"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
