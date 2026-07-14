import {
  profile,
  skillGroups,
  experiences,
  projects,
  aiApproach,
} from "@/content/site";

/** Starter prompts shown in the assistant when the conversation is empty. */
export const SUGGESTED_QUESTIONS = [
  "What AI projects has Thi Han built?",
  "What's his tech stack?",
  "Is he open to new roles or freelance work?",
  "How does he build with AI?",
];

/**
 * Builds the system prompt that grounds the assistant in Thi Han's real,
 * public portfolio data (from `content/site.ts`). The model is instructed to
 * answer only from this context and to decline anything outside it, so it
 * cannot invent employers, dates, or metrics.
 */
export function buildSystemPrompt(): string {
  const skills = skillGroups
    .map((g) => `- ${g.title}: ${g.skills.join(", ")}`)
    .join("\n");

  const exp = experiences
    .map(
      (e) =>
        `- ${e.title}, ${e.companyName} (${e.date})\n` +
        e.points.map((p) => `    • ${p}`).join("\n")
    )
    .join("\n");

  const projs = projects
    .map(
      (p) =>
        `- ${p.name} [${p.category}]${p.badge ? ` (${p.badge})` : ""}: ${p.description}\n` +
        `    Built: ${p.features.join("; ")}` +
        (p.liveDemoLink ? `\n    Live: ${p.liveDemoLink}` : "")
    )
    .join("\n");

  const ai =
    `${aiApproach.intro}\n` +
    `Process: ${aiApproach.steps.map((s) => `${s.label} (${s.desc})`).join(" -> ")}\n` +
    `AI stack: ${aiApproach.stack.join(", ")}\n` +
    `Principles: ${aiApproach.principles.map((p) => `${p.title} — ${p.desc}`).join("; ")}`;

  return `You are the AI assistant embedded on ${profile.name}'s portfolio website. Visitors are usually recruiters, hiring managers, or potential clients. Your job is to answer their questions about ${profile.name}'s skills, experience, projects, and how he works.

Rules:
- Answer ONLY from the information provided below. Do not invent employers, dates, titles, metrics, or facts that are not stated here.
- If a question is outside this scope (personal/private details, salary expectations, contact info beyond what is public, or topics unrelated to ${profile.name}'s professional work), politely say you can only help with questions about ${profile.name}'s work, and suggest using the contact form on the site.
- Refer to him as "${profile.name}" or "he". Keep answers concise and friendly: usually 2 to 4 sentences. Use short bullet points only when listing several items.
- Do not use em dashes in your replies.
- You are representing ${profile.name} professionally, so stay warm, confident, and honest.

=== PROFILE ===
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Availability: ${profile.availability}
About: ${profile.about}

=== SKILLS ===
${skills}

=== EXPERIENCE ===
${exp}

=== PROJECTS ===
${projs}

=== HOW HE BUILDS WITH AI ===
${ai}`;
}
