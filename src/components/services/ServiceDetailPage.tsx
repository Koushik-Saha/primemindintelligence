"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ServiceData } from "@/data/servicesData";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT } }),
};

function useReveal(margin = "-60px") {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin } as Parameters<typeof useInView>[1]);
  return { ref, inView };
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FaqList({ faqs }: { faqs: ServiceData["faqs"] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`rounded-xl border overflow-hidden transition-colors duration-200 ${open === i ? "bg-white/[0.05] border-white/[0.12]" : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.1]"}`}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
          >
            <span className="text-sm font-semibold text-white/80 pr-4">{faq.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE_OUT }} className="flex-shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/30" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="a"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── ServiceDetailPage ────────────────────────────────────────────────────────
export function ServiceDetailPage({ service: svc }: { service: ServiceData }) {
  const hero    = useReveal("-40px");
  const caps    = useReveal();
  const process = useReveal();
  const metrics = useReveal();
  const tech    = useReveal();
  const faq     = useReveal();

  return (
    <div className="bg-[#070B1F] min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 60% 0%, ${svc.accentFrom}44 0%, transparent 65%)` }} aria-hidden="true" />

        <div ref={hero.ref} className="relative max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="mb-2">
            <a href="/services" className="inline-flex items-center gap-1.5 text-[12px] text-white/35 hover:text-white/70 transition-colors duration-150">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 rotate-180" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Services
            </a>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
            <div>
              <motion.div custom={1} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${svc.accentBg} border border-white/[0.1]`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${svc.accentText}`} aria-hidden="true">
                    <path d={svc.iconPath} />
                  </svg>
                </div>
                <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${svc.accentText}`}>{svc.tagline}</span>
              </motion.div>
              <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
                {svc.title}
              </motion.h1>
              <motion.p custom={3} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-white/55 text-lg leading-relaxed max-w-2xl">
                {svc.longDescription}
              </motion.p>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="flex gap-4 mt-8">
                <a href="/#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_44px_rgba(37,99,235,0.7)] transition-all duration-200">
                  Get a Quote
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="/case-studies" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold transition-all duration-200">
                  See Our Work
                </a>
              </motion.div>
            </div>

            {/* Metrics card */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-5">By the Numbers</p>
              <div className="grid grid-cols-2 gap-4">
                {svc.metrics.map((m) => (
                  <div key={m.label} className={`rounded-xl p-4 ${svc.accentBg} border border-white/[0.07]`}>
                    <div className={`text-2xl font-black ${svc.accentText} mb-1`}>{m.value}</div>
                    <div className="text-[11px] text-white/40 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div ref={caps.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={caps.inView ? "visible" : "hidden"} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Capabilities</p>
            <h2 className="text-3xl font-black text-white tracking-tight">What We Deliver</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {svc.capabilities.map((c, i) => (
              <motion.div key={c} custom={i % 4} variants={fadeUp} initial="hidden" animate={caps.inView ? "visible" : "hidden"} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${svc.accentText}`} aria-hidden="true">
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-white/60 leading-relaxed">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8">
        <div ref={process.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={process.inView ? "visible" : "hidden"} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Our Approach</p>
            <h2 className="text-3xl font-black text-white tracking-tight">How We Do It</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svc.process.map((p, i) => (
              <motion.div key={p.step} custom={i % 3} variants={fadeUp} initial="hidden" animate={process.inView ? "visible" : "hidden"} className="rounded-xl p-5 bg-white/[0.03] border border-white/[0.07] relative overflow-hidden">
                <span className="absolute top-4 right-4 text-[48px] font-black text-white/[0.04] leading-none select-none" aria-hidden="true">{p.step}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white ${svc.accentBg} border border-white/[0.1] mb-3`}>{p.step}</div>
                <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div ref={tech.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={tech.inView ? "visible" : "hidden"} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Technology</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Tools We Use</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {svc.tech.map((t, i) => (
              <motion.div key={t.name} custom={i} variants={fadeUp} initial="hidden" animate={tech.inView ? "visible" : "hidden"} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider">{t.category}</span>
                <span className="w-px h-3 bg-white/[0.08]" aria-hidden="true" />
                <span className="text-sm font-semibold text-white/70">{t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8">
        <div ref={metrics.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={metrics.inView ? "visible" : "hidden"} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Deliverables</p>
            <h2 className="text-3xl font-black text-white tracking-tight">What You Receive</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {svc.deliverables.map((d, i) => (
              <motion.div key={d} custom={i} variants={fadeUp} initial="hidden" animate={metrics.inView ? "visible" : "hidden"} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 flex-shrink-0 ${svc.accentText}`} aria-hidden="true">
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-semibold text-white/65">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div ref={faq.ref} className="max-w-2xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={faq.inView ? "visible" : "hidden"} className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Common Questions</h2>
          </motion.div>
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate={faq.inView ? "visible" : "hidden"}>
            <FaqList faqs={svc.faqs} />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${svc.accentFrom}22 0%, transparent 70%)` }} aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            Book a free 30-minute call. We&apos;ll listen first, then tell you honestly whether and how we can help.
          </p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-200">
            Book a Free Call
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
