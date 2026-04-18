"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FooterLink  { label: string; href: string }
interface FooterGroup { title: string; links: FooterLink[] }

const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Services",
    links: [
      { label: "AI Development",    href: "/services/ai-development"    },
      { label: "Cloud Solutions",   href: "/services/cloud"             },
      { label: "Data & Analytics",  href: "/services/data"              },
      { label: "Web & Mobile Apps", href: "/services/web-mobile"        },
      { label: "Cybersecurity",     href: "/services/security"          },
      { label: "IT Consulting",     href: "/services/consulting"        },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",    href: "/about"           },
      { label: "Our Work",    href: "/case-studies"    },
      { label: "Process",     href: "/about#process"   },
      { label: "Team",        href: "/about#team"      },
      { label: "Careers",     href: "/careers"         },
      { label: "Blog",        href: "/blog"            },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies",       href: "/case-studies"              },
      { label: "Documentation",      href: "/docs"                      },
      { label: "AI Readiness Quiz",  href: "/ai-readiness"              },
      { label: "ROI Calculator",     href: "/roi-calculator"            },
      { label: "Partner Programme",  href: "/partners"                  },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",  href: "/privacy"  },
      { label: "Terms of Service", href: "/terms"   },
      { label: "Cookie Policy",   href: "/cookies"  },
      { label: "Security",        href: "/security" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href:  "#",
    path:  "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "Twitter / X",
    href:  "#",
    path:  "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "GitHub",
    href:  "#",
    path:  "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  },
  {
    label: "YouTube",
    href:  "#",
    path:  "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const accordionVariants: Variants = {
  closed: { height: 0, opacity: 0 },
  open:   { height: "auto", opacity: 1, transition: { duration: 0.32, ease: EASE_OUT } },
  exit:   { height: 0, opacity: 0,      transition: { duration: 0.2,  ease: "easeIn" } },
};

// ─── Logo SVG ─────────────────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="Prime Mind Intelligence logo" role="img">
      <circle cx="16" cy="16" r="14" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="16" cy="16" r="10" fill="#0A0F2C" />
      <path d="M12 10 Q16 6 20 10 Q24 14 20 18 Q16 22 12 18 Q8 14 12 10Z" fill="none" stroke="#2563EB" strokeWidth="1.2" />
      <path d="M10 16 L22 16" stroke="#06B6D4" strokeWidth="1" strokeDasharray="2 1.5" />
      <path d="M16 10 L16 22" stroke="#06B6D4" strokeWidth="1" strokeDasharray="2 1.5" />
      <circle cx="16" cy="16" r="2" fill="#2563EB" />
      <circle cx="22" cy="16" r="1.5" fill="#06B6D4" opacity="0.9" />
      <circle cx="10" cy="16" r="1.5" fill="#06B6D4" opacity="0.9" />
    </svg>
  );
}

// ─── Mobile accordion group ───────────────────────────────────────────────────

function MobileGroup({ group }: { group: FooterGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.07]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-white">{group.title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/30" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="links"
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="overflow-hidden pb-4 space-y-3"
          >
            {group.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-white/45 hover:text-white transition-colors duration-150"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Back to top button ───────────────────────────────────────────────────────

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="
        flex items-center gap-1.5
        text-[12px] font-semibold text-white/30 hover:text-white/70
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
      "
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 rotate-180" aria-hidden="true">
        <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to top
    </button>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone,  setNewsletterDone]  = useState(false);
  const [newsletterErr,   setNewsletterErr]   = useState("");

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.includes("@")) {
      setNewsletterErr("Enter a valid email.");
      return;
    }
    setNewsletterErr("");
    setNewsletterDone(true);
  }

  return (
    <footer
      ref={ref}
      className="relative bg-[#06091A] border-t border-white/[0.07] overflow-hidden"
      aria-label="Site footer"
    >
      {/* Top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),rgba(6,182,212,0.3),transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Upper section ───────────────────────────────────────────── */}
        <div className="py-16 grid lg:grid-cols-[280px_1fr] gap-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {/* Logo + name */}
            <a href="/" className="inline-flex items-center gap-3 mb-5 group" aria-label="Prime Mind Intelligence home">
              <FooterLogo />
              <div>
                <div className="text-sm font-black text-white leading-none">Prime Mind</div>
                <div
                  className="text-[9px] font-black tracking-[0.2em] uppercase leading-none"
                  style={{ background: "linear-gradient(90deg,#2563EB,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  Intelligence
                </div>
              </div>
            </a>

            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-[240px]">
              AI &amp; full-stack technology solutions that turn ambitious ideas into measurable outcomes.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center hover:bg-white/[0.09] hover:border-blue-500/30 transition-all duration-150"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-white/40" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns — desktop */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FOOTER_GROUPS.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: EASE_OUT }}
              >
                <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/30 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/45 hover:text-white transition-colors duration-150"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Accordion — mobile */}
          <div className="sm:hidden">
            {FOOTER_GROUPS.map((group) => (
              <MobileGroup key={group.title} group={group} />
            ))}
          </div>
        </div>

        {/* ── Newsletter + bottom bar ──────────────────────────────────── */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Newsletter mini-form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <span className="text-[12px] font-semibold text-white/30 whitespace-nowrap">
              Stay in the loop:
            </span>
            {!newsletterDone ? (
              <form onSubmit={handleNewsletter} className="flex gap-2" noValidate>
                <div>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterErr(""); }}
                    placeholder="your@email.com"
                    aria-label="Newsletter email"
                    className="
                      h-9 px-3 w-52 rounded-lg
                      bg-white/[0.05] border border-white/[0.09]
                      text-sm text-white placeholder:text-white/20
                      focus:outline-none focus:border-blue-500/40
                      transition-all duration-150
                    "
                  />
                  {newsletterErr && (
                    <p className="text-[10px] text-red-400 mt-1">{newsletterErr}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <span className="text-sm text-emerald-400 font-semibold">Subscribed!</span>
            )}
          </motion.div>

          {/* Copyright + back-to-top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT }}
            className="flex items-center gap-6"
          >
            <p className="text-[11px] text-white/20" suppressHydrationWarning>
              © {new Date().getFullYear()} Prime Mind Intelligence LLC. All rights reserved.
            </p>
            <BackToTop />
          </motion.div>
        </div>

      </div>
    </footer>
  );
}
