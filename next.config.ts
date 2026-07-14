import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Our SVGs (hero words, menu icons) are local + trusted. Next refuses to
    // optimize SVGs by default (returns 400); allow them with a strict CSP.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
