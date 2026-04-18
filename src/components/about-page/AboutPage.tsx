"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Shared ───────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
  }),
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

const MILESTONES = [
  { year: "2021", title: "Founded", body: "Two engineers quit Big Tech to build the AI consultancy they wished existed — technically rigorous, commercially honest." },
  { year: "2022", title: "First Enterprise Client", body: "Landed a Fortune 500 retail client for a demand-forecasting platform. Delivered on time. Extended for two more phases." },
  { year: "2023", title: "Team of 12", body: "Expanded across cloud, security, and data disciplines. Opened our London node to serve European clients." },
  { year: "2024", title: "AI Practice Launch", body: "Formalised our LLM & MLOps practice. Shipped production AI in fintech, healthcare, and logistics in 12 months." },
  { year: "2025", title: "20+ Engineers", body: "Grew to a team of 20+ across three continents. Maintained a 98% client satisfaction score and zero churn on retainer accounts." },
];

function OriginTimeline() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="origin-heading" className="py-24 px-4 sm:px-6 xl:px-8">
      <div className="max-w-[1360px] mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Our Story</p>
          <h2 id="origin-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Built from Frustration, Driven by Standards
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto leading-relaxed">
            We started Prime Mind because we were tired of seeing clients get burned by vendors who overpromised, under-delivered, and disappeared. We set out to be the exception.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/[0.07]" aria-hidden="true" />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className={`relative flex sm:items-center gap-8 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? "sm:text-right" : "sm:text-left"}`}>
                    <div className={`inline-block rounded-2xl p-5 bg-white/[0.03] border border-white/[0.07] text-left max-w-sm ${isLeft ? "sm:ml-auto" : ""}`}>
                      <div className="text-[11px] font-black tracking-[0.2em] text-blue-400 mb-1.5">{m.year}</div>
                      <h3 className="text-base font-bold text-white mb-2">{m.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{m.body}</p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#070B1F] shadow-[0_0_8px_rgba(37,99,235,0.8)]" aria-hidden="true" />

                  {/* Spacer */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mission / Vision / Values ────────────────────────────────────────────────

const VALUES = [
  {
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    title: "Outcomes over outputs",
    body: "We're accountable to results, not ticket counts. If something we built isn't delivering value, we say so — and fix it.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Speed with rigour",
    body: "Fast and sloppy is expensive. We move quickly because we've invested in process — not because we're skipping steps.",
  },
  {
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Client intelligence",
    body: "We learn your domain deeply. The best solutions come from engineers who understand both the technology and the business problem it's solving.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Transparency by default",
    body: "Weekly written updates, open staging environments, and honest conversations about scope, risk, and cost. No surprises.",
  },
];

function MissionSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="mission-heading" className="py-24 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Mission</p>
            <h2 id="mission-heading" className="text-3xl font-black text-white tracking-tight mb-4">
              Make intelligent technology accessible to every ambitious business
            </h2>
            <p className="text-white/50 leading-relaxed">
              AI and modern software architecture shouldn&apos;t be the exclusive domain of trillion-dollar companies. We exist to close that gap — giving mid-market and growth-stage businesses access to the same calibre of engineering that the largest enterprises take for granted.
            </p>
          </motion.div>
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Vision</p>
            <h3 className="text-3xl font-black text-white tracking-tight mb-4">
              A world where the best technology partner is also the most trusted one
            </h3>
            <p className="text-white/50 leading-relaxed">
              We picture an industry where &quot;great vendor experience&quot; isn&apos;t remarkable because it&apos;s expected. We&apos;re building toward that by proving, one engagement at a time, that honesty and technical excellence are not in tension.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10">
          <h3 className="text-2xl font-black text-white tracking-tight">How We Operate</h3>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07]"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/25 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400" aria-hidden="true">
                  <path d={v.icon} />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{v.title}</h4>
              <p className="text-sm text-white/45 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team grid ────────────────────────────────────────────────────────────────

const TEAM = [
  { name: "Arjun Sharma",    role: "Co-Founder & CEO",              initials: "AS", bg: "bg-blue-600",    bio: "Ex-Google AI. Built ML infra at scale." },
  { name: "Priya Mehta",     role: "Co-Founder & CTO",              initials: "PM", bg: "bg-cyan-600",    bio: "Ex-Stripe. Distributed systems expert." },
  { name: "Daniel Okoye",    role: "VP Engineering",                initials: "DO", bg: "bg-emerald-600", bio: "Led platform eng at a NASDAQ-listed fintech." },
  { name: "Sophie Laurent",  role: "Head of AI & ML",               initials: "SL", bg: "bg-violet-600",  bio: "PhD ML from Cambridge. Published researcher." },
  { name: "Marcus Webb",     role: "Head of Cloud",                 initials: "MW", bg: "bg-sky-600",     bio: "AWS Hero. 12 years cloud architecture." },
  { name: "Leila Park",      role: "Principal Engineer, Frontend",  initials: "LP", bg: "bg-pink-600",    bio: "Core contributor to two OSS React libraries." },
  { name: "Rishi Kapoor",    role: "Principal Engineer, Data",      initials: "RK", bg: "bg-amber-600",   bio: "Built data platforms processing 10TB/day." },
  { name: "Ananya Roy",      role: "Head of Security",              initials: "AR", bg: "bg-red-600",     bio: "OSCP certified. Former red-team lead." },
];

function TeamGrid() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="team" ref={ref} aria-labelledby="team-heading" className="py-24 px-4 sm:px-6 xl:px-8 scroll-mt-24">
      <div className="max-w-[1360px] mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">The Team</p>
          <h2 id="team-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            People Who Take Craft Seriously
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Specialists first. Generalists when it matters. Every team member has gone deep in their domain before joining Prime Mind.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i % 4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/25 hover:bg-white/[0.05] transition-all duration-200"
            >
              {/* Avatar */}
              <div className={`w-14 h-14 rounded-2xl ${member.bg} flex items-center justify-center text-lg font-black text-white mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)]`}>
                {member.initials}
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">{member.name}</h3>
              <p className="text-[11px] text-blue-400/80 mb-3 font-semibold">{member.role}</p>
              <p className="text-[12px] text-white/40 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Culture section ──────────────────────────────────────────────────────────

const CULTURE_POINTS = [
  { emoji: "🌍", label: "Remote-first", body: "Async by default, sync when it matters. We have contributors across 8 countries and it shows in the quality of thought." },
  { emoji: "📚", label: "Learning budget", body: "Every engineer gets $2,000/year for courses, conferences, and books. No approval process — just use it." },
  { emoji: "🔬", label: "20% time", body: "Fridays are for exploration. Some of our best client offerings started as Friday experiments." },
  { emoji: "🤝", label: "No-ego reviews", body: "Code review is about the code, not the coder. We give and receive direct feedback as a professional courtesy." },
];

function CultureSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="culture-heading" className="py-24 px-4 sm:px-6 xl:px-8 bg-[#080D22]">
      <div className="max-w-[1360px] mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Culture</p>
          <h2 id="culture-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How We Work Together
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE_POINTS.map((p, i) => (
            <motion.div
              key={p.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07]"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{p.emoji}</div>
              <h3 className="text-sm font-bold text-white mb-2">{p.label}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Careers CTA ─────────────────────────────────────────────────────────────

function CareersCTA() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="careers-heading" className="relative py-28 px-4 sm:px-6 xl:px-8 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }} aria-hidden="true" />

      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-2xl mx-auto text-center"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">Careers</p>
        <h2 id="careers-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
          Build With Us
        </h2>
        <p className="text-white/50 text-lg leading-relaxed mb-8">
          We&apos;re always looking for engineers, designers, and strategists who are excellent at what they do and great to work with. No open roles right now? Send a note anyway.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_44px_rgba(37,99,235,0.7)] transition-all duration-200"
          >
            View Open Roles
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:careers@primemindintelligence.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold transition-all duration-200"
          >
            Say Hello
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── AboutPage ────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="bg-[#070B1F] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-5"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-6"
          >
            We Build What{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>
              Others Won&apos;t
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Prime Mind Intelligence is an AI-first technology company. We design, build, and operate the intelligent systems that give businesses an unfair advantage.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {[
              { value: "2021", label: "Founded" },
              { value: "20+",  label: "Engineers" },
              { value: "40+",  label: "Clients Served" },
              { value: "98%",  label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
                >
                  {s.value}
                </div>
                <div className="text-[12px] text-white/35 font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <OriginTimeline />
      <MissionSection />
      <TeamGrid />
      <CultureSection />
      <CareersCTA />

    </div>
  );
}
