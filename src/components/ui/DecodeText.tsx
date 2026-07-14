"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/**
 * Terminal-style "decode" text: while `active`, characters scramble through
 * random glyphs before locking into the real text left-to-right, like a
 * terminal decrypting a string. Resolves back to plain text when inactive.
 * Intended for a monospace parent so character width stays constant and the
 * scramble never shifts layout.
 */
export default function DecodeText({
  text,
  active,
  className = "",
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  // Reset to plain text the instant `active` goes false — adjusted during
  // render, per React's "adjusting state when a prop changes" pattern
  // (comparing against a previous-value *state*, not a ref, per the
  // react-hooks/refs rule), instead of via setState in an effect.
  const [prevActive, setPrevActive] = useState(active);
  if (prevActive !== active) {
    setPrevActive(active);
    if (!active) setDisplay(text);
  }

  useEffect(() => {
    if (!active) return;

    const DURATION = 480; // ms for the whole word to lock in
    const PER_CHAR = DURATION / text.length;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;

      let out = "";
      for (let i = 0; i < text.length; i++) {
        const lockAt = i * PER_CHAR * 0.7; // lock left-to-right, slightly overlapping
        out +=
          text[i] === " " || elapsed >= lockAt
            ? text[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, text]);

  return <span className={className}>{display}</span>;
}
