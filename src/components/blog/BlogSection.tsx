"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { BLOG_POSTS, BLOG_ACCENT, type BlogPost } from "./blogData";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE_OUT },
  }),
};

// ─── Date formatter ───────────────────────────────────────────────────────────
// Uses UTC methods so server (Node) and browser produce identical output.

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ post, index, inView }: { post: BlogPost; index: number; inView: boolean }) {
  const accent = BLOG_ACCENT[post.accentColor];

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.12)] transition-all duration-300"
      aria-label={`Read: ${post.title}`}
    >
      {/* Gradient background swatch */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1E3A8A55 0%,#0A0F2C 100%)",
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px), linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${accent.pill}`}>
            {post.categoryLabel}
          </span>
        </div>

        {/* "Featured" badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.1] text-white/40 tracking-wide uppercase">
            Featured
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white leading-snug mb-3 tracking-tight group-hover:text-blue-200 transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0`}
          >
            {post.author.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-white/50 truncate">
              {post.author.name}
            </div>
            <div className="text-[10px] text-white/25">
              {formatDate(post.publishedAt)} · {post.readTime}
            </div>
          </div>
          <motion.div
            variants={{ hover: { x: 4 } }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`flex-shrink-0 text-[12px] font-semibold ${accent.text} flex items-center gap-1`}
          >
            Read
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Small card ───────────────────────────────────────────────────────────────

function SmallCard({ post, index, inView }: { post: BlogPost; index: number; inView: boolean }) {
  const accent = BLOG_ACCENT[post.accentColor];

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative flex gap-4 rounded-xl p-4 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
      aria-label={`Read: ${post.title}`}
    >
      {/* Color accent strip */}
      <div
        className={`flex-shrink-0 w-1 self-stretch rounded-full ${accent.dot} opacity-50`}
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${accent.pill}`}>
            {post.categoryLabel}
          </span>
          <span className="text-[10px] text-white/25">{post.readTime}</span>
        </div>

        <h3 className="text-sm font-bold text-white/80 leading-snug mb-2 group-hover:text-white transition-colors duration-200">
          {post.title}
        </h3>

        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[8px] font-black text-white flex-shrink-0`}
          >
            {post.author.initials}
          </div>
          <span className="text-[10px] text-white/30">{post.author.name} · {formatDate(post.publishedAt)}</span>
        </div>
      </div>

      <motion.div
        variants={{ hover: { x: 3, opacity: 1 } }}
        initial={{ opacity: 0.4 }}
        className="self-center flex-shrink-0"
      >
        <svg viewBox="0 0 16 16" fill="none" className={`w-4 h-4 ${accent.text}`} aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.article>
  );
}

// ─── Newsletter bar ───────────────────────────────────────────────────────────

function NewsletterBar({ inView }: { inView: boolean }) {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mt-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 flex flex-col sm:flex-row items-center gap-6"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/25 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400" aria-hidden="true">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Copy */}
      <div className="flex-1 text-center sm:text-left">
        <div className="text-base font-bold text-white mb-1">
          The AI & Engineering Brief
        </div>
        <div className="text-sm text-white/45">
          Practical insights on AI, cloud, and software delivery — no fluff, bi-weekly.
        </div>
      </div>

      {/* Form */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="flex-shrink-0 flex gap-2 w-full sm:w-auto"
          noValidate
        >
          <div className="flex-1 sm:w-64">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="your@email.com"
              aria-label="Email address"
              aria-describedby={error ? "newsletter-error" : undefined}
              className="
                w-full h-10 px-3.5 rounded-xl
                bg-white/[0.05] border border-white/[0.1]
                text-sm text-white placeholder:text-white/25
                focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07]
                transition-all duration-150
              "
            />
            {error && (
              <p id="newsletter-error" className="text-[11px] text-red-400 mt-1.5">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="
              h-10 px-4 rounded-xl flex-shrink-0
              bg-blue-600 hover:bg-blue-500
              text-white text-sm font-semibold
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            "
          >
            Subscribe
          </button>
        </form>
      ) : (
        <div className="flex-shrink-0 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
            <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          You&apos;re subscribed!
        </div>
      )}
    </motion.div>
  );
}

// ─── BlogSection ──────────────────────────────────────────────────────────────

export function BlogSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  const featured  = BLOG_POSTS.filter((p) => p.featured);
  const secondary = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <section
      aria-labelledby="blog-heading"
      className="relative bg-[#070B1F] py-28 overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-3">
              Insights
            </p>
            <h2
              id="blog-heading"
              className="text-4xl sm:text-5xl font-black text-white tracking-tight"
            >
              From the{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
              >
                Lab
              </span>
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-150"
          >
            All articles
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* ── Grid: 1 featured left + 2 small right ──────────────────── */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Featured */}
          <div>
            {featured.map((post, i) => (
              <FeaturedCard key={post.id} post={post} index={i} inView={inView} />
            ))}
          </div>

          {/* Secondary stack */}
          <div className="flex flex-col gap-4">
            {secondary.map((post, i) => (
              <SmallCard key={post.id} post={post} index={i + 1} inView={inView} />
            ))}

            {/* View all button fills remaining space hint */}
            <motion.a
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              href="/blog"
              className="
                mt-auto flex items-center justify-center gap-2
                rounded-xl border border-white/[0.07] bg-white/[0.02]
                hover:bg-white/[0.05] hover:border-blue-500/25
                py-4 text-sm font-semibold text-white/35 hover:text-white/70
                transition-all duration-200
              "
            >
              View all posts
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* ── Newsletter ────────────────────────────────────────────────── */}
        <NewsletterBar inView={inView} />

      </div>
    </section>
  );
}
