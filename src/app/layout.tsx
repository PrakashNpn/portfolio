import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/content/site";
import AiAssistant from "@/components/ui/AiAssistant";
import { ResumeModalProvider } from "@/components/ui/ResumeModal";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Monospace for the "terminal / engineer" accents (eyebrows, streaming tagline).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL = "https://thihan-portfolio.vercel.app";

// Search results show ~155 characters, so this is a short pitch, not the full bio.
const DESCRIPTION = `${profile.name}: ${profile.summary}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    profile.name,
    "Full-Stack Developer",
    "AI Engineer",
    "AI Developer",
    "AI-Enabled Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Python",
    "FastAPI",
    "Laravel",
    "OpenAI API",
    "LangChain",
    "pgvector",
    "Claude API",
    "RAG",
    "LLM",
    "n8n",
    "Bangkok",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} | Portfolio`,
    description: DESCRIPTION,
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Portfolio`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-primary text-white-100 antialiased">
        <ResumeModalProvider>
          {children}
          <AiAssistant />
        </ResumeModalProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#151030",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
