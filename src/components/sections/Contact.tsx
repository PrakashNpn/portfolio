"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { styles } from "@/lib/styles";
import { fadeIn, textVariant } from "@/lib/motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile, socials } from "@/content/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const initialForm = { name: "", email: "", message: "" };

const fieldClass =
  "rounded-xl border border-white/10 bg-black-200/40 px-4 py-3.5 text-[15px] text-white placeholder:text-secondary/50 outline-none transition-colors duration-200 focus:border-[#915EFF]/60 focus:ring-2 focus:ring-[#915EFF]/20";

const strokeIcon = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

function MailIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg {...strokeIcon} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg {...strokeIcon} className="h-[18px] w-[18px]">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...strokeIcon} className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg {...strokeIcon} className="h-4 w-4">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg {...strokeIcon} strokeWidth={2} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name.toLowerCase()) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1 4.98 2.1 4.98 3.5zM.2 8h4.6v14H.2V8zm7.4 0h4.4v1.9h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.8V22h-4.6v-6.7c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V22H7.6V8z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
        </svg>
      );
    default:
      return <MailIcon className="h-4 w-4" />;
  }
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy. Please copy it manually.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error(
        "Contact form isn't configured yet. Add your EmailJS keys to .env.local."
      );
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // Keys must match the {{variables}} used in the EmailJS template
          // content (dashboard.emailjs.com -> Email Templates -> Content),
          // not the field names in this form.
          name: form.name,
          email: form.email,
          message: form.message,
          title: form.name,
          time: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY }
      );
      toast.success("Thanks! I'll get back to you as soon as I can.");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
      </motion.div>

      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Form card */}
        <motion.div
          variants={fadeIn("right", "spring", 0.1, 0.75)}
          className="group relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black-100/55 p-8 shadow-card [text-shadow:0_1px_10px_rgba(5,8,22,0.55)] md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#915EFF]/20 blur-3xl"
          />

          <div className="relative">
            <p className="max-w-md text-pretty text-[15px] leading-[26px] text-white/70">
              Have a project in mind, a role to fill, or just want to say hi?
              Drop a message and I&apos;ll get back to you.
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col">
                  <span className="mb-2 text-[13px] font-medium text-secondary">
                    Your Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="What's your name?"
                    className={fieldClass}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-[13px] font-medium text-secondary">
                    Your Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="What's your email?"
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="mb-2 text-[13px] font-medium text-secondary">
                  Your Message
                </span>
                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="What do you want to say?"
                  className={`${fieldClass} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#915EFF] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(145,94,255,0.7)] outline-none transition-colors duration-200 hover:bg-[#7c47ff] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <SendIcon />}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Direct-contact panel */}
        <motion.div
          variants={fadeIn("left", "spring", 0.2, 0.75)}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-black-100/55 p-8 shadow-card [text-shadow:0_1px_10px_rgba(5,8,22,0.55)] md:p-10 lg:w-[40%]"
        >
          {/* Subtle cosmic accent */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#915EFF]/20 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full border border-white/[0.06]" />
            <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full border border-white/[0.06]" />
          </div>

          <div className="relative flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black-100/70 px-3.5 py-1.5 text-[12px] font-medium text-white/85">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00cea8] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00cea8]" />
              </span>
              Available for new projects
            </span>

            <h3 className="mt-6 text-[24px] font-bold text-white sm:text-[26px]">
              Prefer to reach out directly?
            </h3>
            <p className="mt-2 text-[14px] leading-[24px] text-white/60">
              Drop me a line any time. I usually reply within a day.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              {/* Email + copy */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#915EFF]/15 text-[#b49ef5] ring-1 ring-[#915EFF]/25">
                  <MailIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wide text-secondary">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="block truncate text-[14px] text-white transition-colors hover:text-[#b49ef5]"
                  >
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-secondary transition-colors hover:border-[#915EFF]/50 hover:text-white"
                >
                  <CopyIcon />
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#915EFF]/15 text-[#b49ef5] ring-1 ring-[#915EFF]/25">
                  <LocationIcon />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-secondary">
                    Location
                  </p>
                  <p className="text-[14px] text-white">{profile.location}</p>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#915EFF]/15 text-[#b49ef5] ring-1 ring-[#915EFF]/25">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-secondary">
                    Response time
                  </p>
                  <p className="text-[14px] text-white">Within ~24 hours</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-auto pt-7">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-secondary">
                Find me on
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-medium text-secondary transition-colors duration-200 hover:border-[#915EFF]/50 hover:text-white"
                  >
                    <SocialIcon name={s.name} />
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default SectionWrapper(Contact, "contact");
