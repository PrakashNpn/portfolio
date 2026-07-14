"use client";

import { useEffect, useState } from "react";

/**
 * Types each phrase out character by character (like an LLM streaming tokens),
 * pauses, deletes, and moves to the next — with a blinking caret. `paused`
 * freezes it (used to stop work when the hero scrolls off-screen).
 */
export default function Typewriter({
  phrases,
  paused = false,
  className = "",
}: {
  phrases: string[];
  paused?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // This is a setTimeout-driven typing/deleting state machine (external
  // timer, not state derived from props) — the setState calls below are the
  // actual animation, not a synchronization anti-pattern to refactor away.
  useEffect(() => {
    if (paused) return;
    const current = phrases[index % phrases.length];

    // Finished typing → hold, then start deleting.
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(hold);
    }
    // Finished deleting → advance to the next phrase.
    if (deleting && text === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        ),
      deleting ? 28 : 52
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, paused]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden
        className="caret-blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-[#00cea8]"
      />
    </span>
  );
}
