interface Props {
  title:       string;
  description: string;
  eta?:        string;
  cta?:        { label: string; href: string };
}

export function ComingSoon({ title, description, eta, cta }: Props) {
  return (
    <div className="bg-[#070B1F] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        {/* Animated glow dot */}
        <div className="relative inline-flex mb-8">
          <span className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-blue-400" aria-hidden="true">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">
          {eta ?? "Coming Soon"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">{title}</h1>
        <p className="text-white/50 text-lg leading-relaxed mb-8">{description}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {cta && (
            <a href={cta.href} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.45)] transition-all duration-200">
              {cta.label}
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          <a href="/" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold transition-all duration-200">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
