type CtaButtonProps = {
  /** Button label, e.g. "Resume" */
  text: string;
  href: string;
  className?: string;
  /** If provided, intercepts the click (e.g. to open a modal) instead of
   *  navigating. `href` still points at the real target as a no-JS fallback. */
  onClick?: () => void;
};

/**
 * Animated resume CTA (ported from the original site's `Button`):
 * at rest a light-filled pill shows dark `text` + a down arrow; on hover the
 * light fill shrinks to a circle centred behind the arrow, and the background
 * (deep violet) + text colour switch. The label stays constant.
 */
export default function CtaButton({
  text,
  href,
  className = "",
  onClick,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex h-14 w-full max-w-[200px] items-center overflow-hidden rounded-xl bg-[#915EFF] ${className}`}
    >
      {/* Light fill: covers the button at rest, shrinks to a circle centred on
          the arrow (right-3 + w-10 → centre 32px from the right edge) on hover. */}
      <span className="absolute top-1/2 -right-10 h-[130%] w-[130%] -translate-y-1/2 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:right-3 group-hover:h-10 group-hover:w-10" />

      {/* Label: dark at rest → white on hover. */}
      <span className="relative z-10 pl-7 text-[14px] font-bold uppercase tracking-wide text-black transition-colors duration-500 group-hover:text-white">
        {text}
      </span>

      {/* Arrow: centred in the hover circle (right-5 + w-6 → centre 32px from right). */}
      <span className="absolute right-5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cta-arrow h-5 w-5 text-black"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </span>
    </a>
  );
}
