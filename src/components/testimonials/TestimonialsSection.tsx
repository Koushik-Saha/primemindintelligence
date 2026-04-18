"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accentColor: string; /* Tailwind bg class for avatar */
  rating: number;
  platform: "g2" | "clutch" | "google" | "linkedin";
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Prime Mind Intelligence transformed our fraud detection stack. The ML pipeline they built is light-years ahead of our old rules engine — 94% catch rate with fewer false flags. Their engineers felt like extensions of our own team from day one.",
    name: "Arjun Mehta",
    role: "CTO",
    company: "NovaPay",
    initials: "AM",
    accentColor: "bg-blue-600",
    rating: 5,
    platform: "clutch",
  },
  {
    id: "2",
    quote:
      "We needed a HIPAA-compliant patient ops platform in under 7 months. PMI delivered on time, on scope, and under budget — which never happens in healthcare IT. The LLM notes assistant alone saved our clinicians hours every week.",
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    company: "MediTrack Health",
    initials: "SC",
    accentColor: "bg-emerald-600",
    rating: 5,
    platform: "g2",
  },
  {
    id: "3",
    quote:
      "The supply-chain intelligence system they built for us cut fuel spend by 18% in the first quarter. More impressive than the tech was the way they onboarded our ops team — zero pushback from a group that's notoriously resistant to change.",
    name: "Marcus Webb",
    role: "VP of Operations",
    company: "LogiFlow",
    initials: "MW",
    accentColor: "bg-cyan-600",
    rating: 5,
    platform: "google",
  },
  {
    id: "4",
    quote:
      "We interviewed five agencies before choosing Prime Mind. Two months in I stopped wondering if we made the right call. Their code quality, communication, and technical depth are genuinely best-in-class. We've renewed twice since.",
    name: "Priya Natarajan",
    role: "Head of Product",
    company: "Stackify SaaS",
    initials: "PN",
    accentColor: "bg-violet-600",
    rating: 5,
    platform: "linkedin",
  },
  {
    id: "5",
    quote:
      "Three months, full redesign of our data platform — from Hadoop to a modern lakehouse. The migration was seamless and our BI dashboards now refresh in seconds instead of hours. The team is sharp and honest about trade-offs.",
    name: "Leon Fischer",
    role: "Data Engineering Lead",
    company: "RetailEdge Group",
    initials: "LF",
    accentColor: "bg-amber-600",
    rating: 5,
    platform: "g2",
  },
];

const PLATFORM_LABELS: Record<Testimonial["platform"], string> = {
  g2:       "G2",
  clutch:   "Clutch",
  google:   "Google",
  linkedin: "LinkedIn",
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT } },
};

// ─── Star row ─────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-white/15"}`}
          aria-hidden="true"
        >
          <path
            d="M8 1.5l1.796 3.638 4.015.583-2.906 2.831.686 3.998L8 10.617l-3.591 1.933.686-3.998L2.189 5.72l4.015-.583L8 1.5z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Single testimonial card ──────────────────────────────────────────────────

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="
        relative rounded-2xl p-8
        bg-white/[0.03] border border-white/[0.07]
        overflow-hidden
      "
    >
      {/* Accent corner glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(37,99,235,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Quote mark */}
      <div
        className="absolute top-5 right-7 text-[72px] font-black leading-none text-blue-500/10 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Stars + platform */}
      <div className="flex items-center justify-between mb-5">
        <Stars count={t.rating} />
        <span className="text-[10px] font-semibold text-white/25 tracking-wide uppercase">
          via {PLATFORM_LABELS[t.platform]}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-[15px] text-white/65 leading-relaxed mb-7 italic relative z-10">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${t.accentColor} flex items-center justify-center text-sm font-black text-white flex-shrink-0`}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-bold text-white">{t.name}</div>
          <div className="text-[12px] text-white/40">{t.role}, {t.company}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TestimonialsSection ──────────────────────────────────────────────────────

const AUTO_INTERVAL = 5000;

export function TestimonialsSection() {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [direction, setDir]     = useState<1 | -1>(1);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  const total = TESTIMONIALS.length;

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      setDir(dir);
      setActive(((next % total) + total) % total);
    },
    [total]
  );

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1, 1), AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [active, paused, go]);

  const slideVariants: Variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
    exit: (d: number) => ({
      x: d > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative bg-[#080D22] py-28 overflow-hidden"
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(37,99,235,0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">
            Client Stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5"
          >
            Heard From the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              People Who Ship With Us
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            We measure success by outcomes, not deliverables. Here&apos;s what our partners say about working with Prime Mind Intelligence.
          </p>
        </motion.div>

        {/* ── Carousel ────────────────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative max-w-3xl mx-auto"
        >
          {/* Slide */}
          <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialCard t={TESTIMONIALS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation row */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              type="button"
              onClick={() => go(active - 1, -1)}
              aria-label="Previous testimonial"
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                bg-white/[0.04] border border-white/[0.08]
                hover:bg-white/[0.09] hover:border-blue-500/30
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              "
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/50" aria-hidden="true">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                  type="button"
                  onClick={() => go(i, i > active ? 1 : -1)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                >
                  <motion.span
                    className="block rounded-full bg-blue-400"
                    animate={{
                      width:   i === active ? 24 : 8,
                      opacity: i === active ? 1 : 0.25,
                    }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    style={{ height: 8 }}
                  />
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => go(active + 1, 1)}
              aria-label="Next testimonial"
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                bg-white/[0.04] border border-white/[0.08]
                hover:bg-white/[0.09] hover:border-blue-500/30
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              "
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/50" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* ── Platform trust badges ────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {(["G2", "Clutch", "Google", "LinkedIn"] as const).map((p) => (
            <div
              key={p}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07]"
            >
              <Stars count={5} />
              <span className="text-[11px] font-semibold text-white/35">{p}</span>
            </div>
          ))}
          <p className="w-full text-center text-[11px] text-white/20 mt-1">
            5.0 average rating across all platforms · 40+ verified reviews
          </p>
        </motion.div>

      </div>
    </section>
  );
}
