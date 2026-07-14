"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/site";

type ResumeModalContextValue = { open: () => void };
const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

/** Opens the shared resume modal from anywhere (Hero CTA, Navbar links). */
export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used within ResumeModalProvider");
  }
  return ctx;
}

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function DocIcon() {
  return (
    <svg {...icon} strokeWidth={1.7} className="h-6 w-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6M9 9h1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg {...icon} strokeWidth={2} className="h-4 w-4">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg {...icon} strokeWidth={2} className="h-4 w-4">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg {...icon} strokeWidth={2} className="h-4 w-4">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const downloadName = `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`;

  return (
    <ResumeModalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 px-6 py-10 backdrop-blur-md"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black-100/95 p-8 shadow-2xl"
            >
              {/* Cosmic accent — dual corner glows, matching the rest of the site. */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#915EFF]/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#00cea8]/10 blur-3xl" />
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/5 hover:text-white"
              >
                <CloseIcon />
              </button>

              <div className="relative">
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="avatar-pulse-ring absolute inset-0 rounded-2xl bg-[#915EFF]/40" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#915EFF]/15 text-[#b49ef5] ring-1 ring-[#915EFF]/25">
                    <DocIcon />
                  </span>
                </span>

                <h3
                  id="resume-modal-title"
                  className="mt-5 text-[22px] font-bold text-white"
                >
                  {profile.name}&apos;s Resume
                </h3>
                <p className="mt-2 text-pretty text-[14px] leading-[22px] text-white/65">
                  View it right in your browser, or download the PDF to keep
                  for later.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={profile.resumeUrl}
                    download={downloadName}
                    onClick={close}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#915EFF] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(145,94,255,0.7)] transition-colors duration-200 hover:bg-[#7c47ff]"
                  >
                    <DownloadIcon />
                    Download PDF
                  </a>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[14px] font-semibold text-white transition-colors duration-200 hover:border-[#915EFF]/50 hover:bg-white/5"
                  >
                    <ExternalIcon />
                    View Resume
                  </a>
                </div>

                <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-secondary/60">
                  <span className="text-[#00cea8]">&gt;</span>
                  {downloadName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}
