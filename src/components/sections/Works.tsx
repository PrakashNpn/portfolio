"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
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
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rX = useSpring(rotateX, spring);
  const rY = useSpring(rotateY, spring);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const tilt = featured ? 1.5 : MAX_TILT / 2;
    rotateY.set(px * tilt * 2);
    rotateX.set(-py * tilt * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 1000 }}
      className={`group relative min-w-0 overflow-hidden rounded-3xl border shadow-card transition-[border-color,box-shadow] duration-300 hover:border-[#915EFF]/50 hover:shadow-[0_24px_60px_-15px_rgba(145,94,255,0.3)] ${
        featured
          ? "border-[#915EFF]/35 bg-black-100/80 p-7 sm:p-9 lg:p-10"
          : "border-white/10 bg-black-100/60 p-7"
      } ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#915EFF]/10 blur-3xl" />
      {featured && (
        <p className="relative mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7de3cf]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00cea8]" />
          Featured project
        </p>
      )}
      <div className={`relative flex h-full flex-col ${featured ? "lg:grid lg:h-auto lg:grid-cols-[1.1fr_1fr] lg:gap-12" : ""}`}>
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#915EFF]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c4b5ff] ring-1 ring-[#915EFF]/25">
              {project.category}
            </span>
            {project.badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00cea8]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7de3cf] ring-1 ring-[#00cea8]/20">
                <SparkIcon />{project.badge}
              </span>
            )}
          </div>
          <h3 className={`mt-5 font-bold leading-tight text-white ${featured ? "text-[32px] sm:text-[40px]" : "text-[22px]"}`}>
            {project.name}
          </h3>
          <p className={`mt-3 text-pretty leading-[26px] text-white/65 ${featured ? "max-w-xl text-[16px]" : "text-[14px]"}`}>
            {project.description}
          </p>
          {featured && <ProjectLinks project={project} featured />}
        </div>

        <div className={`flex min-w-0 flex-1 flex-col ${featured ? "mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 lg:mt-0" : "mt-6"}`}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">What I built</h4>
          <ul className="mt-4 space-y-2.5">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-[21px] text-white/80">
                <span className="mt-1"><CheckIcon /></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {project.stack && (
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4" aria-label="Technologies used">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[10px] text-secondary">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        {!featured && <ProjectLinks project={project} />}
      </div>
    </motion.article>
  );
}

function ProjectLinks({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${featured ? "mt-7" : "mt-6 border-t border-white/10 pt-5"}`}>
      {project.liveDemoLink && (
        <a
          href={project.liveDemoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#915EFF] ${featured ? "rounded-xl bg-[#915EFF] px-5 py-3 text-white hover:bg-[#7c47ff]" : "text-[#b49ef5] hover:text-white"}`}
        >
          Visit website <ArrowUpRight />
        </a>
      )}
      {project.sourceCodeLink && (
        <a
          href={project.sourceCodeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} source on GitHub`}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-secondary transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#915EFF]"
        >
          View source <ArrowUpRight />
        </a>
      )}
    </div>
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

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured && (
          <ProjectTile project={featured} index={0} featured className="md:col-span-2 xl:col-span-3" />
        )}
        {rest.map((project, i) => (
          <ProjectTile
            key={project.name}
            project={project}
            index={i + 1}
            className={rest.length % 2 === 1 && i === rest.length - 1 ? "md:col-span-2 xl:col-span-1" : ""}
          />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Works, "projects");
