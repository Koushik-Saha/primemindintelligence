import { HeroSection }          from "@/components/hero/HeroSection";
import { ServicesSection }      from "@/components/services/ServicesSection";
import { SocialProofSection }   from "@/components/social-proof/SocialProofSection";
import { AboutSection }         from "@/components/about/AboutSection";
import { CaseStudiesSection }   from "@/components/case-studies/CaseStudiesSection";
import { ProcessSection }       from "@/components/process/ProcessSection";
import { TestimonialsSection }  from "@/components/testimonials/TestimonialsSection";
import { BlogSection }          from "@/components/blog/BlogSection";
import { ContactSection }       from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Services ─────────────────────────────────────────────────── */}
      <ServicesSection />

      {/* ── Stats + social proof ──────────────────────────────────────── */}
      <SocialProofSection />

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Case studies ─────────────────────────────────────────────── */}
      <CaseStudiesSection />

      {/* ── How we work ──────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Blog / Insights ──────────────────────────────────────────── */}
      <BlogSection />

      {/* ── Full-width CTA banner ─────────────────────────────────────── */}
      <section className="relative py-28 px-6 overflow-hidden bg-[#0A0F2C]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0A0F2C 0%, #1E3A8A33 50%, #0A0F2C 100%)",
          }}
          aria-hidden="true"
        />
        {/* Animated gradient orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[250px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Top + bottom edge lines */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),rgba(6,182,212,0.3),transparent)" }} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)" }} aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-5">
            Ready to Start?
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Build Something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#2563EB,#06B6D4)" }}
            >
              Intelligent?
            </span>
          </h2>
          <p className="text-white/55 mb-10 text-lg leading-relaxed max-w-xl mx-auto">
            Schedule a free 30-minute strategy session. No sales pitch — just a focused conversation
            about your challenges and how AI can solve them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base tracking-wide shadow-[0_0_36px_rgba(37,99,235,0.55)] hover:shadow-[0_0_52px_rgba(37,99,235,0.8)] transition-all duration-200"
            >
              Book Your Free Consultation
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-semibold text-base transition-all duration-200"
            >
              See Our Work
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <ContactSection />
    </>
  );
}
