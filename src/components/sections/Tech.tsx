"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { skillGroups } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { SkillGroup } from "@/types/content";

const iconClass = "h-[18px] w-[18px]";

function SkillIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: iconClass,
    "aria-hidden": true,
  };
  switch (name) {
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case "ai":
      return (
        <svg {...props}>
          <path d="M12 3l1.8 4.9 4.7 1.6-4.7 1.6L12 16l-1.8-4.9L5.5 9.5l4.7-1.6L12 3z" />
          <path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...props}>
          <path d="M17.5 19a4.5 4.5 0 0 0 .4-8.98A6 6 0 0 0 6.3 8.5 4 4 0 0 0 7 19h10.5z" />
        </svg>
      );
    default:
      return <span className="h-2 w-2 rounded-full bg-[#915EFF]" />;
  }
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the cursor so the spotlight glow follows it across the card.
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      variants={fadeIn("up", "spring", index * 0.15, 0.6)}
      className={`group relative h-full overflow-hidden rounded-2xl border p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_-12px_rgba(145,94,255,0.4)] ${
        group.featured
          ? "border-[#915EFF]/40 bg-[#915EFF]/[0.08] hover:border-[#915EFF]/70"
          : "border-white/10 bg-black-100/55 hover:border-[#915EFF]/50"
      }`}
    >
      {/* Mouse-follow spotlight (fades in on hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(145,94,255,0.18), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-3 text-[16px] font-bold text-white">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#b49ef5] ring-1 transition-colors duration-300 group-hover:bg-[#915EFF]/25 group-hover:text-white ${
                group.featured
                  ? "bg-[#915EFF]/25 ring-[#915EFF]/40"
                  : "bg-[#915EFF]/15 ring-[#915EFF]/25"
              }`}
            >
              <SkillIcon name={group.icon} />
            </span>
            {group.title}
          </h3>
          {group.featured && (
            <span className="shrink-0 rounded-full bg-[#915EFF]/20 px-1.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-wider text-[#c4b5ff] ring-1 ring-[#915EFF]/40">
              Core focus
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-[13px] text-white/90 ring-1 ring-white/15 transition-colors duration-200 hover:bg-[#915EFF]/25 hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Tech() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I work with</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Skills &amp; Tools.
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Tech, "skills");
