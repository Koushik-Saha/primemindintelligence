"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface AnimatedHeadlineProps {
  /** Full headline string — words are split and animated individually. */
  text: string;
  className?: string;
  /** Seconds to wait before the first word starts animating. */
  startDelay?: number;
  /** Seconds between each word reveal. */
  stagger?: number;
}

const WORD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: 20 },
  visible: (custom: { delay: number }) => ({
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: custom.delay,
      duration: 0.72,
      ease: WORD_EASE,
    },
  }),
};

export function AnimatedHeadline({
  text,
  className = "",
  startDelay = 0.25,
  stagger = 0.065,
}: AnimatedHeadlineProps) {
  const words = text.split(" ");

  return (
    <h1
      className={className}
      aria-label={text}
      style={{ perspective: "600px" }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          /* Non-breaking space after each word except the last */
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={{ delay: startDelay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
