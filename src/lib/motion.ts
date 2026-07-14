import type { Variants } from "framer-motion";

/** Framer-motion variant helpers, ported from the original `utils/motion.js`. */

type GeneratorType = "spring" | "tween" | "keyframes" | "inertia";

export const textVariant = (delay = 0): Variants => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay },
  },
});

type Direction = "left" | "right" | "up" | "down" | "";

export const fadeIn = (
  direction: Direction,
  type: GeneratorType | "",
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: type || "tween", delay, duration, ease: "easeOut" },
  },
});

export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren ?? 0,
    },
  },
});
