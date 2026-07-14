"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { projects } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Project } from "@/types/content";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 text-[#915EFF]"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3"
      aria-hidden
    >
      <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z" />
    </svg>
  );
}

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

const MAX_TILT = 7; // degrees

function ProjectTile({
  project,
  index,
  featured = false,
  className = "",
}: {
  project: Project;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const href = project.liveDemoLink || project.sourceCodeLink || "#";

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rX = useSpring(rotateX, spring);
  const rY = useSpring(rotateY, spring);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const topRow = (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[#915EFF]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#c4b5ff] ring-1 ring-[#915EFF]/30">
          {project.category}
        </span>
        {project.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#915EFF]/30 to-[#00cea8]/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
            <SparkIcon />
            {project.badge}
          </span>
        )}
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-[#915EFF] group-hover:text-white">
        <ArrowUpRight />
      </span>
    </div>
  );

  const visitLink = (
    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#b49ef5] transition-colors duration-300 group-hover:text-white">
      Visit website
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={fadeIn("up", "spring", index * 0.12, 0.6)}
      whileHover={{ scale: 1.015 }}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-black-100/55 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-[#915EFF]/50 hover:shadow-[0_24px_60px_-15px_rgba(145,94,255,0.45)] ${
        featured ? "p-8 md:p-10" : "p-7"
      } ${className}`}
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#915EFF]/20 blur-3xl transition-opacity duration-300 group-hover:bg-[#915EFF]/30"
      />

      <div className="relative flex h-full flex-col">
        {topRow}
        <h3
          className={`font-bold text-white ${
            featured ? "mt-6 text-[28px] md:text-[34px]" : "mt-5 text-[20px]"
          }`}
        >
          {project.name}
        </h3>
        <p
          className={`text-pretty text-white/70 ${
            featured
              ? "mt-3 text-[15px] leading-[26px]"
              : "mt-2 line-clamp-3 text-[13px] leading-[21px]"
          }`}
        >
          {project.description}
        </p>

        {featured ? (
          <div className="mt-auto pt-7">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-secondary">
              What I built
            </p>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-1 text-[12px] text-white/80 ring-1 ring-white/10"
                >
                  <CheckIcon />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-5">{visitLink}</div>
        )}
      </div>
    </motion.a>
  );
}

function Works() {
  const [featured, ...rest] = projects;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <ProjectTile
          project={featured}
          index={0}
          featured
          className="lg:w-[58%]"
        />
        <div className="flex flex-1 flex-col gap-5">
          {rest.map((project, i) => (
            <ProjectTile
              key={project.name}
              project={project}
              index={i + 1}
              className="flex-1"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(Works, "projects");
