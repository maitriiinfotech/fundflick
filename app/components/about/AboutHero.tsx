import Button from "../ui/Button";

// Plain server-rendered hero — light, no overlays/shades. Background is the
// same parchment image the footer uses; copy is dark for contrast.
export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[68vh] flex items-center overflow-hidden bg-[#ece4d6]">
      {/* background — same image the footer uses, no shade overlays */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/footerbg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-900/15 bg-white/50 backdrop-blur-md text-sm text-slate-700 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2b7fff] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2b7fff]" />
          </span>
          About Fundflick
        </div>

        {/* headline */}
        <h1
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[0.98]"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Building the future of{" "}
          <span className="bg-gradient-to-r from-[#2b7fff] to-[#1e3a75] bg-clip-text text-transparent">
            intelligent lending
          </span>
        </h1>

        {/* sub copy */}
        <p className="mt-7 max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed font-light">
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
            className="px-8 py-3.5 text-sm whitespace-nowrap !text-slate-900 !border-slate-900/30 hover:!bg-slate-900/5 hover:!text-slate-900"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
