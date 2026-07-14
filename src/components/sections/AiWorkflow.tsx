"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { aiApproach } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  className: "h-5 w-5",
  "aria-hidden": true,
};

function StepIcon({ name }: { name: string }) {
  switch (name) {
    case "understand":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
        </svg>
      );
    case "retrieve":
      return (
        <svg {...stroke}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "reason":
      return (
        <svg {...stroke}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "verify":
      return (
        <svg {...stroke}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

function Connector() {
  return (
    <div className="flex items-center justify-center py-1 lg:w-10 lg:py-0">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 rotate-90 text-[#915EFF]/60 lg:rotate-0"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

function AiWorkflow() {
  const { subtitle, title, intro, steps, stack, principles } = aiApproach;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>{subtitle}</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>{title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("up", "tween", 0.1, 0.6)}
        className="mx-auto mt-4 max-w-2xl text-pretty text-center text-[15px] leading-[26px] text-white/65"
      >
        {intro}
      </motion.p>

      {/* Pipeline */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.7)}
        className="mt-12 flex flex-col lg:flex-row lg:items-stretch"
      >
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <div className="group relative flex-1 rounded-2xl border border-white/10 bg-black-100/55 p-6 text-center shadow-card transition-colors duration-300 hover:border-[#915EFF]/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#915EFF]/15 text-[#b49ef5] ring-1 ring-[#915EFF]/25 transition-colors duration-300 group-hover:bg-[#915EFF]/25 group-hover:text-white">
                <StepIcon name={step.icon} />
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-widest text-secondary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 text-[17px] font-bold text-white">
                {step.label}
              </h3>
              <p className="mx-auto mt-2 max-w-[220px] text-pretty text-[13px] leading-[20px] text-white/65">
                {step.desc}
              </p>
            </div>
            {i < steps.length - 1 && <Connector />}
          </Fragment>
        ))}
      </motion.div>

      {/* AI stack */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 0.6)}
        className="mt-10 text-center"
      >
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
          AI stack
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-white/10 bg-white/[0.05] px-3.5 py-1.5 font-mono text-[12px] text-white/80"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Principles */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeIn("up", "spring", 0.2 + i * 0.1, 0.6)}
            className="rounded-2xl border border-white/10 bg-black-100/45 p-6 [text-shadow:0_1px_10px_rgba(5,8,22,0.55)]"
          >
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-white">
              <span className="text-[#00cea8]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {p.title}
            </h3>
            <p className="mt-2 text-pretty text-[13px] leading-[21px] text-white/65">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(AiWorkflow, "ai");
