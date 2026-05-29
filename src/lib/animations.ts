import type { Variants } from "framer-motion";

interface FadeInUpOptions {
  /** Stagger delay in seconds. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Root margin that triggers the in-view animation. */
  margin?: string;
  /** Initial vertical offset in pixels. */
  y?: number;
}

/**
 * Scroll-triggered "fade up" preset for `motion` elements.
 * Spread it onto a `motion.*` element: `<motion.div {...fadeInUp(i * 0.05)} />`.
 */
export const fadeInUp = ({
  delay = 0,
  duration = 0.45,
  margin = "-60px",
  y = 16,
}: FadeInUpOptions = {}) =>
  ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay },
  }) as const;

/** Variants form of the fade-up animation, for orchestrated/staggered parents. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/** Shared spring used for layout/underline transitions. */
export const navSpring = { type: "spring", stiffness: 380, damping: 30 } as const;
