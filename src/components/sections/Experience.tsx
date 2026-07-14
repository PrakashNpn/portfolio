"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { styles } from "@/lib/styles";
import { textVariant } from "@/lib/motion";
import { experiences } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Experience as Exp } from "@/types/content";

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function TimelineItem({
  exp,
  index,
  threshold,
  progress,
  setAnchor,
}: {
  exp: Exp;
  index: number;
  threshold: number;
  progress: MotionValue<number>;
  setAnchor: (el: HTMLDivElement | null) => void;
}) {
  const isLeft = index % 2 === 0;
  const [revealed, setRevealed] = useState(false);

  useMotionValueEvent(progress, "change", (v) => setRevealed(v >= threshold));
  // Re-sync on mount and whenever `threshold` is recomputed after layout
  // measurement (see the parent's resize-driven `measure()` effect) —
  // `progress` is an external framer-motion value read imperatively, not
  // derived from props, so this can't move to render-time without risking
  // the reveal timing.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealed(progress.get() >= threshold);
  }, [progress, threshold]);

  // Card slides in first, then its lines stack in top-to-bottom.
  const panel: Variants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
  };

  return (
    <div className="relative grid md:grid-cols-2 md:gap-x-8">
      {/* Stable measurement anchor at the node position */}
      <div
        ref={setAnchor}
        aria-hidden
        className="pointer-events-none absolute left-4 top-1 h-11 w-11 md:left-1/2"
      />

      {/* Node marker — scales in/out as the line reaches / retreats */}
      <motion.div
        initial={false}
        animate={{ scale: revealed ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute left-4 top-1 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-white/25 md:left-1/2"
      >
        <Image
          src={exp.icon}
          alt={exp.companyName}
          width={32}
          height={32}
          className="h-4/5 w-4/5 object-contain"
        />
      </motion.div>

      {/* Card */}
      <div
        className={`pl-12 md:pl-0 ${
          isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
        }`}
      >
        <motion.div
          variants={panel}
          initial="hidden"
          animate={revealed ? "show" : "hidden"}
          className="rounded-2xl border border-white/10 bg-black-100/45 p-6 shadow-card [text-shadow:0_1px_10px_rgba(5,8,22,0.55)]"
        >
          <motion.h3 variants={item} className="text-[22px] font-bold text-white">
            {exp.title}
          </motion.h3>
          <motion.p
            variants={item}
            className="text-[16px] font-semibold text-secondary"
          >
            {exp.companyName}
          </motion.p>
          <motion.p variants={item} className="mt-1 text-[13px] text-secondary/70">
            {exp.date}
          </motion.p>
          <motion.ul variants={item} className="mt-4 list-disc space-y-2 pl-5">
            {exp.points.map((point, i) => (
              <li
                key={i}
                className="text-pretty text-[14px] leading-[22px] tracking-wide text-white-100"
              >
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}

function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const anchorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [thresholds, setThresholds] = useState<number[]>(() =>
    experiences.map((_, i) => (i + 0.5) / experiences.length)
  );

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const measure = () => {
      const container = lineRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      if (cRect.height === 0) return;
      setThresholds(
        anchorsRef.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return (r.top + r.height / 2 - cRect.top) / cRect.height;
        })
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div ref={lineRef} className="relative mt-16">
        {/* Faint static track */}
        <div className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-white/10 md:left-1/2" />
        {/* Progress line that draws as you scroll (head stays at viewport centre) */}
        <motion.div
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#915EFF] via-[#8b67f7] to-[#00cea8] md:left-1/2"
        />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={`${exp.companyName}-${index}`}
              exp={exp}
              index={index}
              threshold={
                thresholds[index] ?? (index + 0.5) / experiences.length
              }
              progress={progress}
              setAnchor={(el) => {
                anchorsRef.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, "work");
