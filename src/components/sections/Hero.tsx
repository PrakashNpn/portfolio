"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { styles } from "@/lib/styles";
import { profile, heroWords, heroTerminalLines } from "@/content/site";
import { ComputersCanvas } from "@/components/canvas";
import { useInView } from "@/hooks/useInView";
import CtaButton from "@/components/ui/CtaButton";
import Typewriter from "@/components/ui/Typewriter";
import DecodeText from "@/components/ui/DecodeText";
import { useResumeModal } from "@/components/ui/ResumeModal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  // Append the first word again for a seamless slider loop.
  const words = [...heroWords, heroWords[0]];
  // Pause the word-slider (and any other CSS animation here) once the hero
  // scrolls away; invisible, but saves steady paint work below the fold.
  const { ref, inView } = useInView<HTMLElement>({ rootMargin: "200px" });
  const [touchHover, setTouchHover] = useState(false);
  const { open: openResume } = useResumeModal();

  return (
    <section
      ref={ref}
      id="hero"
      className={`relative w-full overflow-hidden lg:min-h-screen ${
        inView ? "" : "anim-paused"
      }`}
    >
      {/* Readability scrim — dark on the left, fading out before the PC (right)
          and fading to nothing toward the bottom of the hero (mask). */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[60%] bg-gradient-to-r from-primary via-primary/45 to-transparent lg:block"
        style={{
          maskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
        }}
      />

      {/* Decorative scattered-squares pattern, top-left. Above the fold and
          flagged by Next.js as the page's LCP element, so it loads eagerly
          with high priority instead of the default lazy behavior. */}
      <Image
        src="/profile/bgLeft.png"
        alt=""
        width={418}
        height={327}
        priority
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[3] h-auto w-[220px] opacity-90 sm:w-[320px] lg:w-[420px]"
      />

      {/* Text content, overlaid on the left. The wrapper is click-through so you
          can drag the PC behind it; only the buttons capture clicks. */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-7xl items-start px-6 pt-28 sm:px-16 lg:min-h-screen lg:items-center lg:pt-0">
        {/* Accent line */}
        <div className="absolute left-6 top-28 hidden flex-col items-center sm:flex sm:left-10 lg:top-1/2 lg:-translate-y-[56%]">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-44 w-1 lg:h-72" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl sm:pl-8 lg:max-w-2xl [text-shadow:0_2px_22px_rgba(5,8,22,0.7)]"
        >
          <motion.p
            variants={item}
            className="mb-4 flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-[#7de3cf] sm:text-[13px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00cea8] shadow-[0_0_10px_2px_rgba(0,206,168,0.6)]" />
            AI Engineer · Full-Stack Developer
          </motion.p>

          <motion.p
            variants={item}
            className={`${styles.heroSubText} flex flex-wrap items-baseline gap-x-3`}
          >
            <span>Hi, I&apos;m</span>
            <span className="text-[30px] font-extrabold text-[#915EFF] xs:text-[36px] sm:text-[44px] lg:text-[52px]">
              {profile.name}
            </span>
          </motion.p>

          <motion.div variants={item} className={`${styles.heroHeadText} mt-5`}>
            <span className="flex flex-wrap items-end gap-x-3">
              <span>I build</span>
              <span className="word-slide text-[#8b67f7]">
                <span className="word-slide-inner">
                  {words.map((word, index) => (
                    <span key={index}>{word.text}</span>
                  ))}
                </span>
              </span>
            </span>
            <span className="mt-1 block">that deliver real results.</span>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex max-w-xl items-center gap-2 font-mono text-[13px] text-secondary sm:text-[15px]"
          >
            <span className="shrink-0 text-[#915EFF]">&gt;</span>
            <Typewriter
              phrases={heroTerminalLines}
              paused={!inView}
              className="text-white/85"
            />
          </motion.div>

          <motion.div
            variants={item}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <CtaButton
              text="Resume"
              href={profile.resumeUrl}
              onClick={openResume}
            />

            {/* Get in touch — terminal "decode" hover: the label scrambles
                through glyphs then resolves, like a terminal decrypting a
                string, while the border glows the accent colour. */}
            <a
              href="#contact"
              onMouseEnter={() => setTouchHover(true)}
              onMouseLeave={() => setTouchHover(false)}
              className="group flex h-14 items-center justify-center rounded-xl border border-white/30 px-8 transition-[border-color,box-shadow] duration-300 hover:border-[#915EFF]/70 hover:shadow-[0_0_24px_-6px_rgba(145,94,255,0.65)]"
            >
              <DecodeText
                text="Get in touch"
                active={touchHover}
                className="font-mono text-[14px] font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#c4b5ff]"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D desktop-PC — in normal document flow below the text on mobile/
          tablet, so it can never collide with the copy above it even when the
          headline wraps to extra lines or the CTAs stack to two rows. Only
          becomes an absolute right-anchored column at lg, where there's
          reliably enough width for both to sit side by side. */}
      <ComputersCanvas className="relative z-[1] mt-6 h-[260px] w-full xs:h-[300px] sm:h-[360px] md:h-[400px] lg:absolute lg:left-[43%] lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-auto" />

      {/* Interaction hint — lifted clear of the fixed AI-assistant launcher
          (bottom-5 right-5) so the two never overlap. */}
      <p className="pointer-events-none absolute bottom-24 right-8 z-10 hidden text-[11px] text-secondary/50 lg:block">
        drag to rotate · scroll to zoom
      </p>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-20 hidden w-full items-center justify-center lg:flex">
        <a href="#about" aria-label="Scroll to about" className="pointer-events-auto">
          <div className="flex h-[60px] w-[32px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 22, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="mb-1 h-3 w-3 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
