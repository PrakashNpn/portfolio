"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { profile } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

// Panel appears first, then its children stagger in top-to-bottom.
const panel: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.09,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function About() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Left: morphing, floating "water blob" image */}
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 0.75)}
          className="shrink-0"
        >
          <div className="blob-float relative">
            <div className="blob-shape absolute -inset-5 bg-gradient-to-br from-[#915EFF]/40 via-[#8b67f7]/25 to-[#00cea8]/25 blur-2xl" />
            <div className="blob-shape relative h-[220px] w-[220px] overflow-hidden border border-white/10 shadow-card xs:h-[260px] xs:w-[260px] sm:h-[360px] sm:w-[360px]">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="360px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Right: translucent glass card — panel fades in first, then text stacks in */}
        <motion.div
          variants={panel}
          className="flex-1 rounded-3xl border border-white/10 bg-black-100/45 p-7 shadow-card [text-shadow:0_1px_10px_rgba(5,8,22,0.55)] sm:p-9"
        >
          <motion.h3
            variants={item}
            className="text-[28px] font-bold text-white sm:text-[34px]"
          >
            Hey, this is{" "}
            <span className="text-gradient-flow">{profile.name}</span> 👋
          </motion.h3>
          <motion.span
            variants={item}
            className="mt-3 inline-block rounded-full bg-[#915EFF]/20 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#c4b5ff] ring-1 ring-[#915EFF]/40 sm:text-[13px]"
          >
            {profile.role}
          </motion.span>
          <motion.p
            variants={item}
            className="mt-5 text-pretty text-[16px] leading-[28px] text-white/85 sm:text-[17px]"
          >
            {profile.about}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
