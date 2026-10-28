import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/site";

// Link-preview card for LinkedIn / WhatsApp / email / X. Generated once at
// build time (no request-time APIs), so it costs nothing per share.
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STACK = ["Next.js", "FastAPI", "Claude API", "RAG", "pgvector", "n8n"];

const font = (file: string) =>
  readFile(join(process.cwd(), "src/app/_fonts", file));

export default async function Image() {
  const [medium, bold, extraBold] = await Promise.all([
    font("Poppins-Medium.ttf"),
    font("Poppins-Bold.ttf"),
    font("Poppins-ExtraBold.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#050816",
        backgroundImage:
          "radial-gradient(60% 70% at 15% 0%, rgba(145,94,255,0.35), transparent 70%), radial-gradient(45% 55% at 95% 100%, rgba(0,206,168,0.18), transparent 70%)",
        color: "#ffffff",
        fontFamily: "Poppins",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#00cea8",
              boxShadow: "0 0 18px 4px rgba(0,206,168,0.6)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 5,
              color: "#7de3cf",
            }}
          >
            {profile.role.toUpperCase()}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#aaa6c3" }}>
          thihan-portfolio.vercel.app
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            color: "#a98bff",
            lineHeight: 1,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            marginTop: 28,
            lineHeight: 1.25,
          }}
        >
          LLM apps, agents &amp; automation.
          Built for real business problems.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {STACK.map((s) => (
          <div
            key={s}
            style={{
              fontSize: 22,
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#d6d0ee",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
