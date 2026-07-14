"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/motion";
import { styles } from "@/lib/styles";
import { useInView } from "@/hooks/useInView";

/**
 * Wraps a section with a staggered scroll-in animation and an anchor target,
 * ported from the original `hoc/SectionWrapper`.
 */
export function SectionWrapper<P extends object>(
  Component: ComponentType<P>,
  idName: string
) {
  function HOC(props: P) {
    // Separate from framer's one-shot entrance: this keeps tracking in/out so we
    // can pause decorative CSS animations inside the section while it's off-screen.
    const { ref, inView } = useInView<HTMLElement>({ rootMargin: "150px" });

    return (
      <motion.section
        ref={ref}
        variants={staggerContainer(0.1, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className={`${styles.padding} mx-auto max-w-7xl relative z-0 ${
          inView ? "" : "anim-paused"
        }`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  }
  HOC.displayName = `SectionWrapper(${idName})`;
  return HOC;
}
