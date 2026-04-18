"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT } }),
};

const OPEN_ROLES = [
  { title: "Senior ML Engineer",              team: "AI & ML",          type: "Full-time · Remote",  description: "Own ML pipeline architecture. Production LLM experience preferred." },
  { title: "Principal Frontend Engineer",     team: "Engineering",      type: "Full-time · Remote",  description: "Lead the Next.js frontend practice. Strong React and performance background." },
  { title: "Senior Cloud / DevOps Engineer",  team: "Cloud",            type: "Full-time · Remote",  description: "Multi-cloud (AWS + GCP). Terraform-first, Kubernetes-native." },
  { title: "Data Engineer",                   team: "Data & Analytics", type: "Full-time · Remote",  description: "dbt + Spark + Kafka. Experience with lakehouse architectures a plus." },
  { title: "Product Designer",                team: "Design",           type: "Full-time · Remote",  description: "Systems thinker. Figma expert. Comfortable working directly with engineers." },
  { title: "Security Engineer",               team: "Cybersecurity",    type: "Contract · Remote",   description: "OSCP or equivalent. Penetration testing + secure architecture." },
];

const BENEFITS = [
  { emoji: "💸", title: "Competitive salary",   body: "Top-of-market compensation benchmarked quarterly." },
  { emoji: "🌍", title: "Remote-first",          body: "Work from anywhere. Async by default, sync when it matters." },
  { emoji: "📚", title: "$2k learning budget",   body: "Courses, conferences, and books — no approval needed." },
  { emoji: "🔬", title: "20% exploration time",  body: "Fridays are for building what interests you." },
  { emoji: "🏥", title: "Health coverage",        body: "Full medical, dental, and vision for you and your family." },
  { emoji: "🛠️", title: "Equipment stipend",     body: "$3,000 home office setup budget on day one." },
];

function useReveal() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<typeof useInView>[1]);
  return { ref, inView };
}

export function CareersPage() {
  const hero    = useReveal();
  const roles   = useReveal();
  const benefits = useReveal();

  return (
    <div className="bg-[#070B1F] min-h-screen">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)" }} aria-hidden="true" />
        <div ref={hero.ref} className="relative max-w-[1360px] mx-auto text-center">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">Careers</motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Build with People Who{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>Take Craft Seriously</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            We&apos;re a remote-first team of engineers, researchers, and designers. We care about doing excellent work, being honest with clients, and not burning people out doing it.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate={hero.inView ? "visible" : "hidden"} className="flex flex-wrap justify-center gap-8">
            {[{ v: "20+", l: "Team Members" }, { v: "8",  l: "Countries" }, { v: "100%", l: "Remote" }, { v: "4.9★", l: "Glassdoor" }].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-black bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>{s.v}</div>
                <div className="text-[12px] text-white/35 font-semibold mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
        <div ref={roles.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={roles.inView ? "visible" : "hidden"} className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Open Roles</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Current Openings</h2>
          </motion.div>
          <div className="space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <motion.div key={role.title} custom={i} variants={fadeUp} initial="hidden" animate={roles.inView ? "visible" : "hidden"}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-white">{role.title}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">{role.team}</span>
                  </div>
                  <p className="text-sm text-white/45 mb-1">{role.description}</p>
                  <p className="text-[11px] text-white/25 font-semibold">{role.type}</p>
                </div>
                <a href="mailto:careers@primemindintelligence.com" className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-blue-600 hover:border-blue-500 text-white/60 hover:text-white text-sm font-semibold transition-all duration-200">
                  Apply
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate={roles.inView ? "visible" : "hidden"} className="mt-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-center">
            <p className="text-sm text-white/55 mb-3">Don&apos;t see your role? We hire great people regardless of open positions.</p>
            <a href="mailto:careers@primemindintelligence.com" className="text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors duration-150">
              Send us your CV → careers@primemindintelligence.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 xl:px-8">
        <div ref={benefits.ref} className="max-w-[1360px] mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={benefits.inView ? "visible" : "hidden"} className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Benefits</p>
            <h2 className="text-3xl font-black text-white tracking-tight">What We Offer</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" animate={benefits.inView ? "visible" : "hidden"} className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07]">
                <div className="text-3xl mb-4" aria-hidden="true">{b.emoji}</div>
                <h3 className="text-sm font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 xl:px-8 bg-[#080D22] overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-5 tracking-tight">Ready to Apply?</h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">Send your CV and a short note about what you&apos;re working on to <a href="mailto:careers@primemindintelligence.com" className="text-blue-400 hover:text-blue-300">careers@primemindintelligence.com</a></p>
          <a href="mailto:careers@primemindintelligence.com" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all duration-200">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
