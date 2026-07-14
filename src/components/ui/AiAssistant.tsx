"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/content/site";
import { SUGGESTED_QUESTIONS } from "@/lib/assistant";

type Msg = { role: "user" | "assistant"; content: string };

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const setLastAssistant = (text: string) =>
    setMessages((cur) => {
      const next = [...cur];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i].role === "assistant") {
          next[i] = { ...next[i], content: text };
          break;
        }
      }
      return next;
    });

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    setInput("");

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setLastAssistant(
          data.message || "Sorry, the assistant is unavailable right now."
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastAssistant(acc);
      }
      if (!acc) setLastAssistant("Sorry, I didn't catch that. Please try again.");
    } catch {
      setLastAssistant("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const streaming =
    loading && messages.length > 0 && messages[messages.length - 1].content === "";

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="launcher-breathe group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#915EFF] px-5 py-3.5 text-[14px] font-semibold text-white outline-none transition-colors duration-200 hover:bg-[#7c47ff]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00cea8] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00cea8]" />
        </span>
        <SparkIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Ask my AI</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(72vh,560px)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black-100/95 shadow-2xl backdrop-blur-md"
          >
            {/* Ambient corner glows, matching the site's glass-panel language */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#915EFF]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-[#00cea8]/10 blur-3xl"
            />

            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <span className="avatar-pulse-ring absolute inset-0 rounded-full bg-[#915EFF]/50" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#915EFF]/20 text-[#b49ef5] ring-1 ring-[#915EFF]/40">
                  <SparkIcon className="h-4 w-4" />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-white">
                  {profile.name}&apos;s AI
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[11px] text-secondary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00cea8] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00cea8]" />
                  </span>
                  online
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/5 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="relative flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.length === 0 && (
                <div className="text-[13px] leading-[21px] text-white/70">
                  Hi! I&apos;m {profile.name}&apos;s AI assistant. Ask me anything
                  about his skills, projects, or experience.
                </div>
              )}

              {messages.map((m, i) => {
                const isStreamingThis =
                  streaming && i === messages.length - 1 && m.role === "assistant";
                const isUser = m.role === "user";
                return (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#915EFF]/20 text-[#b49ef5] ring-1 ring-[#915EFF]/30">
                        <SparkIcon className="h-3 w-3" />
                      </span>
                    )}
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-[20px] ${
                        isUser
                          ? "rounded-br-sm bg-gradient-to-br from-[#915EFF] to-[#7c47ff] text-white"
                          : "rounded-bl-sm border-l-2 border-[#00cea8]/40 bg-white/[0.05] text-white/90 ring-1 ring-white/10"
                      }`}
                    >
                      {isStreamingThis ? (
                        <span className="inline-flex gap-1 py-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00cea8]/80 [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00cea8]/80 [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#00cea8]/80" />
                        </span>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                );
              })}

              {messages.length === 0 && (
                <div className="pt-1">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-secondary">
                    Try asking
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[12.5px] text-white/75 transition-colors hover:border-[#915EFF]/50 hover:bg-white/[0.06] hover:text-white"
                      >
                        <span className="font-mono text-[#00cea8]">&gt;</span>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative flex items-center gap-2 border-t border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-black-200/50 px-3.5 transition-colors focus-within:border-[#915EFF]/60 focus-within:ring-2 focus-within:ring-[#915EFF]/20">
                <span className="font-mono text-[13px] text-[#915EFF]">&gt;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Thi Han..."
                  maxLength={500}
                  className="flex-1 bg-transparent py-2.5 text-[13px] text-white placeholder:text-secondary/50 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#915EFF] text-white shadow-[0_8px_20px_-6px_rgba(145,94,255,0.7)] transition-colors hover:bg-[#7c47ff] disabled:opacity-40 disabled:shadow-none"
              >
                <SendIcon />
              </button>
            </form>

            <p className="relative flex items-center justify-center gap-1.5 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-secondary/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00cea8]" />
              Powered By Claude
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
