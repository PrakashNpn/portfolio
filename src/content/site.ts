/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================================
 *  Shared portfolio data for page sections, metadata and the AI assistant.
 *  Keep resume facts here so updates stay consistent across the site.
 *
 *  Images live under /public — reference them by their path (e.g. "/company/mmRoute.png").
 * ============================================================================
 */

import type {
  NavLink,
  Profile,
  SkillGroup,
  Experience,
  Project,
  HeroWord,
  SocialLink,
  AiApproach,
  Education,
  Language,
} from "@/types/content";

/* --------------------------------------------------------------------------
 *  PROFILE
 * ------------------------------------------------------------------------ */
export const profile: Profile = {
  name: "Thi Han",
  role: "Full-Stack Developer & AI Engineer",
  headline: ["I build", "that solve real problems."],
  specialty: "LLM Apps, Agents & Automation",
  summary: "Full-Stack & AI Developer building production web apps, LLM features, agents and automation with TypeScript, Python and PHP.",
  about:
    "I'm a full-stack developer with 3+ years of experience turning ideas into " +
    "production web apps, and today most of my work sits where solid engineering " +
    "meets AI. I enjoy owning a product end to end: shaping the data model, building " +
    "the interface, bringing in LLMs where they make the product better, and keeping " +
    "a human in the loop where trust matters. I work comfortably across languages and " +
    "frameworks and pick whatever fits the problem best. I'm looking for a team where " +
    "I can build AI-powered products that real people rely on every day.",
  availability:
    "Open to new full-time opportunities as a Full-Stack Developer, AI-Enabled " +
    "Full-Stack Developer or AI Engineer.",
  email: "thihan839@gmail.com",
  location: "Bangkok, Thailand · Open to remote",
  resumeUrl: "/resume.pdf", // replace /public/resume.pdf with your latest CV
  avatar: "/profile/profile.png",
};

/* --------------------------------------------------------------------------
 *  NAVIGATION
 * ------------------------------------------------------------------------ */
export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "skills", title: "Skills" },
  { id: "ai", title: "AI" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

/* --------------------------------------------------------------------------
 *  SOCIAL LINKS
 * ------------------------------------------------------------------------ */
export const socials: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/PrakashNpn", icon: "/icons/github.png" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thi-han839" },
  { name: "WhatsApp", url: "https://wa.me/66814302658" },
];

/* --------------------------------------------------------------------------
 *  HERO ROTATING WORDS  (the changing word in "I build ___ that deliver ...")
 * ------------------------------------------------------------------------ */
export const heroWords: HeroWord[] = [
  { text: "AI agents" },
  { text: "RAG systems" },
  { text: "automations" },
  { text: "full-stack apps" },
];

/* --------------------------------------------------------------------------
 *  HERO STREAMING LINES  (typed out one by one in the terminal tagline)
 * ------------------------------------------------------------------------ */
export const heroTerminalLines: string[] = [
  "LLM apps, agents & automation",
  "RAG chatbots grounded in your own data",
  "workflow automations with n8n, Claude & tool-use",
  "full-stack apps with Next.js, FastAPI & Laravel",
];

/* --------------------------------------------------------------------------
 *  AI APPROACH  ("How I build with AI" section) — edit to match your process
 * ------------------------------------------------------------------------ */
export const aiApproach: AiApproach = {
  subtitle: "How I build with AI",
  title: "From prompt to production.",
  intro:
    "I treat AI as an engineering discipline, not a demo. This is the loop I use to ship features that are accurate, useful, and safe to put in front of real users.",
  steps: [
    {
      label: "Understand",
      desc: "Frame the goal and the exact data the model needs to do the job well.",
      icon: "understand",
    },
    {
      label: "Retrieve",
      desc: "Ground answers in your own data with RAG and vector search.",
      icon: "retrieve",
    },
    {
      label: "Reason & act",
      desc: "Use structured outputs, tool calls and APIs to turn model responses into useful actions.",
      icon: "reason",
    },
    {
      label: "Verify",
      desc: "Evaluate model accuracy and cost, test APIs and UI flows, and keep human review where it matters.",
      icon: "verify",
    },
  ],
  stack: [
    "Claude API", "OpenAI API", "LangChain", "RAG & pgvector",
    "Structured outputs", "Tool use & web search", "Streaming responses",
    "n8n", "Python / FastAPI", "LLM evaluation",
  ],
  principles: [
    {
      title: "Grounded, not guessing",
      desc: "Retrieval-augmented answers tied to real sources, so output stays accurate and auditable.",
    },
    {
      title: "Tools over hallucination",
      desc: "Models call real functions and APIs to act, instead of inventing answers.",
    },
    {
      title: "Human-in-the-loop",
      desc: "Approval checkpoints where trust matters, so automation stays safe.",
    },
  ],
};

/* --------------------------------------------------------------------------
 *  SKILL GROUPS
 * ------------------------------------------------------------------------ */
export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Automation",
    icon: "ai",
    featured: true,
    skills: [
      "Claude API",
      "OpenAI API",
      "Gemini",
      "LangChain",
      "RAG",
      "pgvector",
      "Structured Outputs",
      "Tool Use",
      "Web Search",
      "Streaming Responses",
      "Prompt Engineering",
      "LLM Evaluation",
      "AI Agents",
      "n8n",
      "Human-in-the-loop",
      "Claude Code",
      "Codex",
    ],
  },
  {
    title: "Frontend",
    icon: "code",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Data",
    icon: "database",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST APIs",
      "PHP",
      "Laravel",
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    title: "Cloud, DevOps & Testing",
    icon: "cloud",
    skills: [
      "Vercel",
      "Render",
      "Linux / Cloud VPS",
      "Docker",
      "Git",
      "GitHub Actions (CI/CD)",
      "pytest",
      "Playwright",
      "Jest",
      "SSH",
      "WordPress",
      "SEO",
    ],
  },
];

/* --------------------------------------------------------------------------
 *  EXPERIENCE
 * ------------------------------------------------------------------------ */
export const experiences: Experience[] = [
  {
    title: "Junior Full-Stack Developer Intern",
    companyName: "Clouud Solutions, India",
    icon: "/company/clouudSolutions.png",
    iconBg: "#E6DEDD",
    date: "Dec 2021 - Feb 2022",
    points: [
      "Developed and tested features for a client CRM using Laravel, Vue.js, Inertia.js, MySQL and Tailwind CSS.",
      "Worked alongside designers and product managers to understand and deliver across the CRM's modules.",
    ],
  },
  {
    title: "Full-Stack Developer",
    companyName: "mmRoute Technologies, Yangon",
    icon: "/company/mmRoute.png",
    iconBg: "#383E56",
    date: "Oct 2022 - Feb 2024",
    points: [
      "Built responsive, mobile-friendly business websites with PHP, JavaScript, HTML and CSS.",
      "Integrated third-party APIs, payment gateways and business tools.",
      "Handled performance tuning, SEO, security updates and backups.",
    ],
  },
  {
    title: "Freelance Full-Stack Developer",
    companyName: "Freelance, Bangkok",
    icon: "/services/freelance.png",
    iconBg: "#E6DEDD",
    date: "May 2024 - Present",
    points: [
      "Built Think Asia Education's website with Next.js, TypeScript, Supabase and Tailwind CSS, including CSCA practice tests with a Chinese, Maths, Physics and Chemistry question bank, automatic scoring and results.",
      "Built and deployed Siribaan Property Group's platform with listing search, detail pages, inquiry capture and an admin panel managing 50+ listings.",
      "Set up Supabase database and media storage, handled Vercel deployment and resolved production issues.",
      "Contributed Google Pay payment integration, SEO improvements, WordPress websites and frontend features for a React Native mobile app across other client projects.",
    ],
  },
  {
    title: "Full-Stack & AI Developer",
    companyName: "Saturday Education Consulting, Bangkok",
    icon: "/company/saturdayEducation.png",
    iconBg: "#FFFFFF",
    date: "Oct 2025 - Present",
    points: [
      "Led development of the company's study-abroad platform in five languages with Next.js, TypeScript and Supabase, with search across 700+ universities and 60,000+ courses.",
      "Designed psychometric career assessments that generate AI career and university recommendations and send counselors a profile report of each student's interests, skills and personality, cutting consultation prep time.",
      "Shipped a RAG-based AI university-advisor chatbot grounded in the platform's university and course data, plus document summarization and PDF report generation.",
      "Built an n8n agent on the Claude API that reads university partnership emails, extracts requested information into structured fields and drafts replies for human approval, cutting reply time from ~20 to ~3 min per email.",
    ],
  },
];

/* --------------------------------------------------------------------------
 *  PROJECTS
 * ------------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    name: "Saturday Education Consulting",
    description: "A study-abroad platform in five languages with search across 700+ universities and 60,000+ courses, a RAG university advisor, and AI career recommendations with counselor profile reports.",
    category: "Full-Time · Education", icon: "education", badge: "AI-Powered",
    features: [
      "Five-language platform",
      "700+ universities · 60,000+ courses",
      "RAG university advisor",
      "AI career assessments",
      "Document summaries and PDF reports",
      "n8n email agent with human approval",
      "Student, university and lead administration",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Claude API",
      "n8n",
    ],
    liveDemoLink: "https://saturdayeducation.com",
  },
  {
    name: "Think Asia Education",
    description: "An education consultancy website with CSCA practice tests for international students applying to Chinese universities. Includes a question bank for Chinese, Maths, Physics and Chemistry, automatic scoring and results.",
    category: "Freelance · Education", icon: "education",
    features: [
      "Education consultancy website",
      "CSCA practice tests",
      "Four-subject question bank",
      "Automatic scoring and results",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
    ],
    liveDemoLink: "https://thinkasiaeducation.com",
  },
  {
    name: "Siribaan Property Group",
    description: "A live real estate platform with property search, detail pages and inquiry capture. Includes an admin panel managing 50+ listings, Supabase media storage, and a responsive, animated interface.",
    category: "Freelance · Real Estate", icon: "property",
    features: [
      "Property search and detail pages",
      "Admin panel for 50+ listings",
      "Inquiry capture",
      "Database and media storage",
    ],
    stack: [
      "Supabase",
      "Vercel",
    ],
    liveDemoLink: "https://siribaanproperty.com",
  },
  {
    name: "JobFit AI",
    description: "An AI job-matching app that scores jobs against a resume, explains skill gaps and deal-breakers, streams tailored cover letters, and searches a city's job boards to rank current postings by fit.",
    category: "Personal · AI Application", icon: "ai", badge: "AI-Powered",
    features: [
      "Resume-to-job fit scoring (0–100)",
      "Skill gaps and deal-breakers",
      "Streaming cover letters",
      "Live job search ranked by fit",
      "RAG with LangChain and pgvector",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Pydantic",
      "Claude API",
      "LangChain",
      "pgvector",
    ],
    liveDemoLink: "https://jobfit-ai-plum.vercel.app",
    sourceCodeLink: "https://github.com/PrakashNpn/jobfit-ai",
  },
];

export const education: Education[] = [
  {
    qualification: "B.Sc. Information Technology",
    institution: "European International University (Online)",
    date: "Oct 2022 - Feb 2024",
    certificateUrl: "https://drive.google.com/file/d/1nV2AtKMZr39rlOMpaIih5tT-AEiSCiU_/view?usp=sharing",
  },
  {
    qualification: "Computer Science coursework (3 years)",
    institution: "Computer University Mandalay",
    date: "2016 - 2020",
  },
];

export const languages: Language[] = [
  { name: "Burmese", proficiency: "Native" },
  { name: "English", proficiency: "Professional" },
  { name: "Hindi", proficiency: "Professional" },
  { name: "Nepali", proficiency: "Professional" },
  { name: "Thai", proficiency: "Beginner" },
];
