"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { BLOG_POSTS, BLOG_ACCENT } from "./blogData";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const;
function formatDate(iso: string) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT } }),
};

const CATEGORIES = [
  { key: "all",         label: "All"          },
  { key: "ai-ml",       label: "AI / ML"      },
  { key: "engineering", label: "Engineering"  },
  { key: "cloud",       label: "Cloud"        },
  { key: "product",     label: "Product"      },
  { key: "company",     label: "Company"      },
];

export function BlogPage() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" } as Parameters<typeof useInView>[1]);

  return (
    <div className="bg-[#070B1F] min-h-screen">
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(37,99,235,0.07) 0%, transparent 60%)" }} aria-hidden="true" />

        <div ref={ref} className="relative max-w-[1360px] mx-auto">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4 text-center">
            From the Lab
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5 text-center">
            Insights &{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}>Engineering Notes</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed text-center mb-12">
            Practical writing from engineers who ship. No thought leadership fluff — just things we learned building real systems.
          </motion.p>

          {/* Category filters */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((c) => (
              <span key={c.key} className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[12px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.07] cursor-pointer transition-all duration-150">
                {c.label}
              </span>
            ))}
          </motion.div>

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => {
              const accent = BLOG_ACCENT[post.accentColor];
              return (
                <motion.article
                  key={post.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover="hover"
                  className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/25 transition-all duration-300 cursor-pointer"
                >
                  {/* Header swatch */}
                  <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${post.accentColor === "blue" ? "#1E3A8A55" : post.accentColor === "violet" ? "#4C1D9555" : "#13493355"} 0%, transparent 100%)` }}>
                    <div className="absolute top-4 left-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${accent.pill}`}>{post.categoryLabel}</span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.1] text-white/40 tracking-wide uppercase">Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-blue-200 transition-colors duration-200">{post.title}</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${post.author.avatarColor} flex items-center justify-center text-[10px] font-black text-white flex-shrink-0`}>{post.author.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold text-white/50">{post.author.name}</div>
                        <div className="text-[10px] text-white/25">{formatDate(post.publishedAt)} · {post.readTime}</div>
                      </div>
                      <motion.div variants={{ hover: { x: 3 } }} className={`${accent.text} text-[12px] font-semibold flex items-center gap-1`}>
                        Read
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Newsletter */}
          <div className="mt-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/25 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="text-base font-bold text-white mb-1">The AI & Engineering Brief</div>
              <div className="text-sm text-white/45">Bi-weekly practical insights — no fluff.</div>
            </div>
            <form className="flex gap-2 flex-shrink-0" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" aria-label="Email" className="h-10 px-3.5 w-52 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all" />
              <button type="submit" className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-150">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
