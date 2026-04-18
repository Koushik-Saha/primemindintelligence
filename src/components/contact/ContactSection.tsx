"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name:    z.string().min(2,  "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.enum(["ai-ml", "cloud", "data", "web-mobile", "security", "consulting", "other"], "Please select a service area"),
  budget: z.enum(["under-25k", "25k-50k", "50k-100k", "100k-plus", "not-sure"]).optional(),
  message: z.string().min(20, "Please share a bit more detail (at least 20 characters)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const colVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE_OUT },
  }),
};

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-white/55 tracking-wide">
        {label}
        {required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] text-red-400"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = `
  w-full h-11 px-3.5 rounded-xl
  bg-white/[0.05] border border-white/[0.1]
  text-sm text-white placeholder:text-white/20
  focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.07]
  transition-all duration-150
`;

const selectCls = `
  w-full h-11 px-3.5 rounded-xl
  bg-white/[0.05] border border-white/[0.1]
  text-sm text-white
  focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.07]
  transition-all duration-150
  appearance-none
`;

// ─── Contact info cards ───────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    label: "Email us",
    value: "hello@primemindintelligence.com",
    href: "mailto:hello@primemindintelligence.com",
  },
  {
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Headquarters",
    value: "San Francisco, CA · Remote-first globally",
    href: null,
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Response time",
    value: "Within 24 hours on business days",
    href: null,
  },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "Twitter / X",
    href: "#",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "GitHub",
    href: "#",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  },
];

// ─── ContactSection ───────────────────────────────────────────────────────────

export function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(_data: ContactFormData) {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    // In production: POST to /api/contact
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#080D22] py-28 overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(37,99,235,0.08) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">
            Get in Touch
          </p>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5"
          >
            Let&apos;s Build Something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              Exceptional
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your project. We&apos;ll respond within 24 hours with a thoughtful first reply — not a sales template.
          </p>
        </motion.div>

        {/* ── Two columns ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_440px] gap-10">

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8">
              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-emerald-400" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Received!</h3>
                  <p className="text-white/50 text-sm max-w-xs">
                    We&apos;ll review your project details and get back to you within 24 hours with a thoughtful response.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" error={errors.name?.message} required>
                      <input
                        {...register("name")}
                        placeholder="Jane Smith"
                        className={inputCls}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Work Email" error={errors.email?.message} required>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="jane@company.com"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <Field label="Company" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      placeholder="Your company (optional)"
                      className={inputCls}
                      autoComplete="organization"
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Service Area" error={errors.service?.message} required>
                      <div className="relative">
                        <select {...register("service")} className={selectCls} defaultValue="">
                          <option value="" disabled>Select a service</option>
                          <option value="ai-ml">AI &amp; Machine Learning</option>
                          <option value="cloud">Cloud Solutions</option>
                          <option value="data">Data &amp; Analytics</option>
                          <option value="web-mobile">Web &amp; Mobile Apps</option>
                          <option value="security">Cybersecurity</option>
                          <option value="consulting">IT Consulting</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                        <svg viewBox="0 0 16 16" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" aria-hidden="true">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Field>
                    <Field label="Budget Range" error={errors.budget?.message}>
                      <div className="relative">
                        <select {...register("budget")} className={selectCls} defaultValue="">
                          <option value="" disabled>Select a range</option>
                          <option value="under-25k">Under $25k</option>
                          <option value="25k-50k">$25k – $50k</option>
                          <option value="50k-100k">$50k – $100k</option>
                          <option value="100k-plus">$100k+</option>
                          <option value="not-sure">Not Sure Yet</option>
                        </select>
                        <svg viewBox="0 0 16 16" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" aria-hidden="true">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </Field>
                  </div>

                  <Field label="Project Details" error={errors.message?.message} required>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your challenge, goals, and any relevant context..."
                      className={`${inputCls} h-auto py-3 resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full h-12 rounded-xl
                      bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:pointer-events-none
                      text-white font-semibold text-sm tracking-wide
                      shadow-[0_0_28px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.65)]
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-white/25">
                    No spam. No sales scripts. Just a genuine conversation.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Info column ───────────────────────────────────────────────── */}
          <motion.div
            custom={1}
            variants={colVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Contact cards */}
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/25 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors duration-150">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/70">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.09] hover:border-blue-500/30 transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/50 hover:text-white/80" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ nudge */}
            <div className="p-5 rounded-xl bg-blue-600/10 border border-blue-500/20">
              <p className="text-sm font-bold text-white mb-1.5">Prefer to book directly?</p>
              <p className="text-[13px] text-white/50 mb-4 leading-relaxed">
                Skip the form and schedule a free 30-minute strategy call — no commitment required.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors duration-150"
              >
                Book a free call
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
