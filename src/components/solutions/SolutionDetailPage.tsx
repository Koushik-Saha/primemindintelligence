"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import type { SolutionData } from "@/data/solutionsData";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT } }),
};
function useReveal() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<typeof useInView>[1]);
  return { ref, inView };
}

export function SolutionDetailPage({ solution: sol }: { solution: SolutionData }) {
  const hero   = useReveal();
  const chall  = useReveal();
  const caps   = useReveal();
  const cs     = useReveal();
  const faqRef = useReveal();

  return (
    <div className="bg-[#070B1F] min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${sol.accentFrom}44 0%, transparent 60%)` }} aria-hidden="true" />
        <div ref={hero.ref} className="relative max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="mb-4">
            <a href="/services" className="inline-flex items-center gap-1.5 text-[12px] text-white/35 hover:text-white/70 transition-colors duration-150">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 rotate-180" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Solutions
            </a>
          </motion.div>
          <motion.p custom={1} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className={`text-[11px] font-bold tracking-[0.18em] uppercase ${sol.accentText} mb-3`}>
            {sol.industry}
          </motion.p>
          <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            {sol.title}
          </motion.h1>
          <motion.p custom={3} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-white/55 text-lg max-w-2xl leading-relaxed mb-8">
            {sol.description}
          </motion.p>
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="flex flex-wrap gap-4">
            <a href="/#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-200">
              Start a Conversation
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/case-studies" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold transition-all duration-200">
              View Case Studies
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sol.metrics.map((m, i) => (
            <motion.div key={m.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`rounded-xl p-5 ${sol.accentBg} border border-white/[0.07] text-center`}>
              <div className={`text-2xl font-black ${sol.accentText} mb-1`}>{m.value}</div>
              <div className="text-[11px] text-white/45">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Challenges ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8">
        <div ref={chall.ref} className="max-w-[1360px] mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={chall.inView ? "visible" : "hidden"} className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">The Problem</p>
              <h2 className="text-3xl font-black text-white tracking-tight">Challenges We Solve</h2>
            </motion.div>
            <ul className="space-y-3">
              {sol.challenges.map((c, i) => (
                <motion.li key={c} custom={i} variants={fadeUp} initial="hidden" animate={chall.inView ? "visible" : "hidden"} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${sol.accentText.replace("text-", "bg-")}`} aria-hidden="true" />
                  <span className="text-sm text-white/60 leading-relaxed">{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div ref={caps.ref}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={caps.inView ? "visible" : "hidden"} className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Our Response</p>
              <h2 className="text-3xl font-black text-white tracking-tight">How We Help</h2>
            </motion.div>
            <ul className="space-y-3">
              {sol.capabilities.map((c, i) => (
                <motion.li key={c} custom={i} variants={fadeUp} initial="hidden" animate={caps.inView ? "visible" : "hidden"} className="flex items-start gap-3">
                  <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${sol.accentText}`} aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-white/60 leading-relaxed">{c}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Case study snippet ───────────────────────────────────────────── */}
      <section ref={cs.ref} className="py-20 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={cs.inView ? "visible" : "hidden"} className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">In Practice</p>
            <h2 className="text-3xl font-black text-white tracking-tight">A Recent Win</h2>
          </motion.div>
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate={cs.inView ? "visible" : "hidden"} className="rounded-2xl p-8 bg-white/[0.03] border border-white/[0.07] max-w-3xl">
            <h3 className={`text-lg font-bold ${sol.accentText} mb-4`}>{sol.caseStudyTitle}</h3>
            <p className="text-white/60 leading-relaxed mb-6">{sol.caseStudyBody}</p>
            <a href="/case-studies" className={`inline-flex items-center gap-1.5 text-sm font-semibold ${sol.accentText} hover:brightness-125 transition-all duration-150`}>
              Read More Case Studies
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section ref={faqRef.ref} className="py-20 px-4 sm:px-6 xl:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={faqRef.inView ? "visible" : "hidden"} className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Common Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {sol.faqs.map((faq, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate={faqRef.inView ? "visible" : "hidden"} className="rounded-xl p-5 bg-white/[0.03] border border-white/[0.07]">
                <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8 overflow-hidden bg-[#080D22]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
            Let&apos;s Talk About Your{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>
              {sol.industry} Project
            </span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            A free 30-minute call to understand your challenges and see if we&apos;re the right fit.
          </p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-200">
            Book a Free Call
          </a>
        </div>
      </section>
    </div>
  );
}
