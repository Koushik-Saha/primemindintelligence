"use client";

/**
 * Reusable Framer Motion primitives.
 *
 * FadeInUp      — fades + slides up, triggers on scroll into view
 * StaggerContainer — wraps children to stagger their reveal animations
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants, HTMLMotionProps, UseInViewOptions } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── FadeInUp ─────────────────────────────────────────────────────────────────

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

interface FadeInUpProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate"> {
  delay?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  as?: "div" | "section" | "article" | "p" | "h1" | "h2" | "h3" | "li";
}

export function FadeInUp({
  delay = 0,
  once = true,
  margin = "-60px",
  children,
  ...props
}: FadeInUpProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer ─────────────────────────────────────────────────────────

const staggerVariants: Variants = {
  hidden:  {},
  visible: (stagger: number = 0.1) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

export const staggerChildVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate"> {
  stagger?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
}

export function StaggerContainer({
  stagger = 0.1,
  once = true,
  margin = "-60px",
  children,
  ...props
}: StaggerContainerProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      custom={stagger}
      variants={staggerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Wrap individual items inside a StaggerContainer */
export function StaggerItem({
  children,
  ...props
}: Omit<HTMLMotionProps<"div">, "variants">) {
  return (
    <motion.div variants={staggerChildVariants} {...props}>
      {children}
    </motion.div>
  );
}
