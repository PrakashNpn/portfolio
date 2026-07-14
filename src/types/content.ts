/** Shared types for the single source-of-truth content file. */

export type NavLink = {
  id: string;
  title: string;
};

export type SocialLink = {
  name: string;
  url: string;
  /** path under /public/icons or an inline label */
  icon?: string;
};

export type SkillGroup = {
  title: string;
  /** icon key: "code" | "database" | "ai" | "cloud" */
  icon: string;
  skills: string[];
  /** highlight this group as the primary focus (AI) */
  featured?: boolean;
};

export type Experience = {
  title: string;
  companyName: string;
  /** path under /public/company */
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
};

export type Project = {
  name: string;
  description: string;
  /** short context label, e.g. "Client · Education" */
  category: string;
  /** icon key: "game" | "education" | "property" */
  icon: string;
  /** key features you built, shown as chips */
  features: string[];
  /** optional badge shown on the tile, e.g. "AI-Powered" */
  badge?: string;
  /** live site URL */
  liveDemoLink?: string;
  /** source repo URL (optional, client work usually has none) */
  sourceCodeLink?: string;
};

export type HeroWord = {
  text: string;
};

export type AiStep = {
  label: string;
  desc: string;
  /** icon key: "understand" | "retrieve" | "reason" | "verify" */
  icon: string;
};

export type AiPrinciple = { title: string; desc: string };

export type AiApproach = {
  subtitle: string;
  title: string;
  intro: string;
  steps: AiStep[];
  stack: string[];
  principles: AiPrinciple[];
};

export type Profile = {
  name: string;
  role: string;
  /** shown in the hero: "Shaping <words> into ..." */
  headline: string[];
  /** short paragraph for the About section */
  about: string;
  /** grounds the AI assistant's answer to "is he open to new roles" */
  availability: string;
  email: string;
  location: string;
  resumeUrl: string;
  avatar: string;
};
