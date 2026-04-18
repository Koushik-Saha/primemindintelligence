"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  iconPath: string;
  accentFrom: string;
  accentTo: string;
  accentText: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    tagline: "Intelligence you can measure",
    description:
      "From proof-of-concept to production-scale ML pipelines. We design, train, and deploy custom models — LLMs, computer vision, time-series forecasting, and real-time inference systems — with the MLOps infrastructure to keep them accurate over time.",
    capabilities: [
      "Custom LLM fine-tuning & RAG pipelines",
      "Real-time inference APIs (< 50ms p99)",
      "Computer vision & document intelligence",
      "Anomaly detection & fraud prevention",
      "Recommendation systems",
      "MLOps: CI/CD for models, drift monitoring",
    ],
    deliverables: ["Model performance report", "Inference API", "Monitoring dashboard", "Retraining pipeline"],
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    accentFrom: "#1E3A8A",
    accentTo:   "#2563EB",
    accentText: "text-blue-300",
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    tagline: "Scalable, cost-efficient infrastructure",
    description:
      "AWS, GCP, and Azure architecture design, lift-and-shift migrations, cloud-native rebuilds, and managed ongoing operations. We are certified across all three major providers and take FinOps seriously.",
    capabilities: [
      "Multi-cloud & hybrid architecture",
      "Kubernetes / EKS / GKE orchestration",
      "Infrastructure-as-Code (Terraform, Pulumi)",
      "FinOps cost optimisation",
      "DR & high-availability design",
      "SOC 2 / ISO 27001 aligned deployments",
    ],
    deliverables: ["Architecture diagram", "IaC codebase", "Cost analysis", "Runbook"],
    iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    accentFrom: "#0C4A6E",
    accentTo:   "#0284C7",
    accentText: "text-sky-300",
  },
  {
    id: "data",
    title: "Data & Analytics",
    tagline: "Decisions powered by data, not gut feel",
    description:
      "We build the full data stack — ingestion, transformation, storage, and visualisation. Modern lakehouse architectures (Delta Lake, Iceberg), real-time streaming (Kafka, Flink), and BI that business users actually open.",
    capabilities: [
      "Data lakehouse design & migration",
      "Real-time streaming pipelines",
      "dbt transformation layers",
      "Business intelligence (Metabase, Looker, Power BI)",
      "Data quality & observability (Great Expectations, Monte Carlo)",
      "GDPR / data governance frameworks",
    ],
    deliverables: ["Data model docs", "Pipeline DAGs", "BI dashboards", "Data quality report"],
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    accentFrom: "#134E4A",
    accentTo:   "#0D9488",
    accentText: "text-teal-300",
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Apps",
    tagline: "Products your users love",
    description:
      "Product engineering from zero to launch and beyond. React, Next.js, React Native — built with performance, accessibility, and long-term maintainability as first-class constraints, not afterthoughts.",
    capabilities: [
      "Next.js & React SPA development",
      "React Native cross-platform mobile",
      "Design systems & component libraries",
      "API & GraphQL backend engineering",
      "Performance optimisation (Core Web Vitals)",
      "WCAG 2.1 AA accessibility compliance",
    ],
    deliverables: ["Production app", "Design system", "Test suite", "Performance audit"],
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    accentFrom: "#4C1D95",
    accentTo:   "#7C3AED",
    accentText: "text-violet-300",
  },
  {
    id: "security",
    title: "Cybersecurity",
    tagline: "Trust as a feature, not a checkbox",
    description:
      "Zero-trust architecture, penetration testing, continuous threat monitoring, and compliance readiness. We embed security into the SDLC rather than bolting it on after launch.",
    capabilities: [
      "Penetration testing (web, API, mobile, cloud)",
      "Zero-trust network architecture",
      "SIEM & SOC-as-a-service setup",
      "Vulnerability management programmes",
      "SOC 2 / ISO 27001 / GDPR readiness",
      "Secure SDLC training & process design",
    ],
    deliverables: ["Pen test report", "Remediation roadmap", "Threat model", "Compliance checklist"],
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accentFrom: "#7F1D1D",
    accentTo:   "#DC2626",
    accentText: "text-red-300",
  },
  {
    id: "consulting",
    title: "IT Consulting",
    tagline: "Strategy that survives first contact",
    description:
      "Technology advisory for boards and leadership teams. We map your current-state architecture, define a target state, and produce a phased roadmap with ROI projections — not a 200-page slide deck nobody reads.",
    capabilities: [
      "Technology audit & gap analysis",
      "Digital transformation roadmaps",
      "Vendor selection & RFP management",
      "CTO / fractional technology leadership",
      "Build vs. buy analysis",
      "M&A technology due diligence",
    ],
    deliverables: ["Current-state assessment", "Target architecture", "Phased roadmap", "ROI model"],
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    accentFrom: "#78350F",
    accentTo:   "#D97706",
    accentText: "text-amber-300",
  },
];

// ─── Comparison table data ─────────────────────────────────────────────────────

const ENGAGEMENT_MODELS = [
  {
    name: "Project",
    tagline: "Fixed scope",
    features: ["Defined deliverables", "Fixed timeline", "Milestone payments", "Knowledge transfer", "30-day warranty"],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    name: "Dedicated Team",
    tagline: "Most popular",
    features: ["Embedded engineers", "Flexible scope", "Monthly retainer", "Direct Slack access", "Quarterly roadmap review"],
    cta: "Build Your Team",
    highlight: true,
  },
  {
    name: "Advisory",
    tagline: "Strategic only",
    features: ["CTO / fractional leadership", "Weekly strategy calls", "Architecture reviews", "On-demand Q&A", "Annual retainer"],
    cta: "Talk Strategy",
    highlight: false,
  },
];

// FAQ
const FAQS = [
  {
    q: "How quickly can you start?",
    a: "For project work, we typically start discovery within 2 weeks of contract signing. Dedicated team engagements take 3–4 weeks to assemble the right people.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. We have separate pricing tiers for seed and Series A companies. We've found that startups who invest early in architecture make dramatically better decisions at scale.",
  },
  {
    q: "What time zones does your team cover?",
    a: "We have engineers across US, EU, and India time zones — providing near-24h coverage for production incidents and overlapping hours for collaboration.",
  },
  {
    q: "How do you handle IP and confidentiality?",
    a: "All IP created during an engagement transfers to you upon final payment. We sign mutual NDAs before any discovery conversations.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Absolutely. We do a thorough technical audit first, present findings honestly (including the hard parts), then agree a remediation plan before extending the system.",
  },
  {
    q: "Do you offer ongoing maintenance post-launch?",
    a: "Yes — maintenance retainers cover bug fixes, dependency updates, performance monitoring, and a monthly engineering review call.",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ svc, index }: { svc: ServiceDetail; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index % 3}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id={svc.id}
      className="scroll-mt-24 rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02]"
    >
      {/* Accent header */}
      <div
        className="px-8 pt-8 pb-6 relative"
        style={{
          background: `linear-gradient(135deg, ${svc.accentFrom}55 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg,${svc.accentTo}44,transparent)` }} aria-hidden="true" />
        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${svc.accentText}`} aria-hidden="true">
            <path d={svc.iconPath} />
          </svg>
        </div>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${svc.accentText} mb-1.5`}>
          {svc.tagline}
        </p>
        <h2 className="text-2xl font-black text-white tracking-tight">{svc.title}</h2>
      </div>

      <div className="px-8 py-7 grid lg:grid-cols-[1fr_260px] gap-8">
        {/* Left */}
        <div>
          <p className="text-[15px] text-white/55 leading-relaxed mb-7">{svc.description}</p>
          <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/25 mb-4">Capabilities</h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {svc.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-white/55">
                <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${svc.accentText}`} aria-hidden="true">
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: deliverables */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/25 mb-4">Deliverables</h3>
          <ul className="space-y-2.5 mb-7">
            {svc.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2.5 text-sm text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`
              inline-flex items-center gap-1.5
              px-5 py-2.5 rounded-xl text-sm font-semibold
              border border-white/[0.1] bg-white/[0.04]
              hover:bg-white/[0.08] hover:border-blue-500/30
              text-white/60 hover:text-white
              transition-all duration-200
            `}
          >
            Discuss This Service
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function EngagementModels() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="engagement-heading" className="py-24">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">Engagement Models</p>
        <h2 id="engagement-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Work with Us Your Way
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5">
        {ENGAGEMENT_MODELS.map((m, i) => (
          <motion.div
            key={m.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`
              relative rounded-2xl p-7 flex flex-col
              border transition-all duration-200
              ${m.highlight
                ? "bg-blue-600/15 border-blue-500/35 shadow-[0_0_40px_rgba(37,99,235,0.15)]"
                : "bg-white/[0.03] border-white/[0.07]"
              }
            `}
          >
            {m.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black bg-blue-600 text-white px-3 py-1 rounded-full tracking-wide uppercase">
                {m.tagline}
              </div>
            )}
            <h3 className="text-lg font-bold text-white mb-1">{m.name}</h3>
            {!m.highlight && <p className="text-[12px] text-white/35 mb-5">{m.tagline}</p>}
            {m.highlight && <div className="mb-5" />}

            <ul className="space-y-2.5 flex-1 mb-7">
              {m.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/55">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true">
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`
                text-center py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200
                ${m.highlight
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white"
                }
              `}
            >
              {m.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} aria-labelledby="faq-heading" className="py-24 border-t border-white/[0.06]">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">FAQ</p>
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Common Questions
        </h2>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((faq, i) => (
          <motion.div
            key={faq.q}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`
              rounded-xl border overflow-hidden transition-colors duration-200
              ${open === i ? "bg-white/[0.05] border-blue-500/25" : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.12]"}
            `}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            >
              <span className="text-sm font-semibold text-white/80 pr-4">{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.22, ease: EASE_OUT }} className="flex-shrink-0">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/30" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: { duration: 0.32, ease: EASE_OUT } }}
                  exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── ServicesPage ─────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="bg-[#070B1F] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(37,99,235,0.1) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-5"
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-6"
          >
            Services Built for{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>
              Real Impact
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Six practice areas. One accountable team. We bring depth in each discipline and the integration layer that makes them work together.
          </motion.p>

          {/* Quick-jump pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE_OUT }}
            className="flex flex-wrap justify-center gap-2"
          >
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-150"
              >
                {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Service cards ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 xl:px-8 pb-8">
        <div className="max-w-[1360px] mx-auto space-y-6">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </section>

      {/* ── Engagement models ──────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 xl:px-8">
        <div className="max-w-[1360px] mx-auto">
          <EngagementModels />
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 xl:px-8">
        <div className="max-w-[1360px] mx-auto">
          <FaqSection />
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 xl:px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, transparent 65%)" }} aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
            Not Sure Where to Start?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            Book a free 30-minute call. We&apos;ll listen first, then tell you honestly whether and how we can help.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-[0_0_32px_rgba(37,99,235,0.5)] hover:shadow-[0_0_48px_rgba(37,99,235,0.7)] transition-all duration-200"
          >
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
