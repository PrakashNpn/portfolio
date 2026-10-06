/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================================
 *  This is the ONLY file you need to edit to update your portfolio's content.
 *  Every section reads from the exports below. Items marked `TODO:` are
 *  seeded from your old site and should be reviewed / updated.
 *
 *  Images live under /public — reference them by their path (e.g. "/tech/reactjs.png").
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
} from "@/types/content";

/* --------------------------------------------------------------------------
 *  PROFILE  — TODO: review and update with your current details
 * ------------------------------------------------------------------------ */
export const profile: Profile = {
  name: "Thi Han", // TODO: your full name
  role: "Full-Stack Developer & AI Engineer",
  // The hero renders: "Shaping <rotating words> into Real Projects that Deliver Results"
  headline: ["into Real Projects", "that Deliver Results"], // TODO
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
 *  SOCIAL LINKS  — TODO: update URLs
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
  "building AI agents that take real actions",
  "RAG chatbots grounded in your own data",
  "workflow automations with n8n, Claude & tool-use",
  "full-stack apps in Next.js, Node & Postgres",
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
      desc: "Claude plans, calls real tools and APIs, and takes actions.",
      icon: "reason",
    },
    {
      label: "Verify",
      desc: "Human-in-the-loop checks and evals before anything ships.",
      icon: "verify",
    },
  ],
  stack: [
    "Claude / Anthropic API",
    "RAG & Vector DBs",
    "Embeddings",
    "Tool-use / function calling",
    "n8n",
    "Prompt engineering",
    "Next.js API routes",
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
 *  SKILL GROUPS  (About section — categorized technical skills)
 *  TODO: add/remove skills as you grow.
 * ------------------------------------------------------------------------ */
export const skillGroups: SkillGroup[] = [
  {
    title: "Applied AI & Automation",
    icon: "ai",
    featured: true,
    skills: [
      "Claude Code",
      "AI Agents",
      "n8n",
      "Prompt Engineering",
      "Chatbots",
      "API Integration",
      "RAG & Vector DBs",
      "Automation Workflows",
      "Human-in-the-loop",
    ],
  },
  {
    title: "Core Development",
    icon: "code",
    skills: [
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "PHP",
      "Python",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "REST APIs",
    ],
  },
  {
    title: "Data & Platforms",
    icon: "database",
    skills: [
      "Supabase",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "WordPress",
      "Webflow",
      "Jira",
      "ClickUp",
    ],
  },
  {
    title: "Cloud, DevOps & Tools",
    icon: "cloud",
    skills: [
      "Vercel",
      "Docker",
      "Linux",
      "Cloud VPS",
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD)",
      "Jest",
      "SSH",
      "SEO",
    ],
  },
];

/* --------------------------------------------------------------------------
 *  EXPERIENCE  — TODO: review dates / descriptions
 * ------------------------------------------------------------------------ */
export const experiences: Experience[] = [
  {
    title: "Web Development Intern",
    companyName: "Marter Solutions, Mandalay",
    icon: "/company/marterSolutions.png",
    iconBg: "#383E56",
    date: "Jul 2020 - Oct 2020",
    points: [
      "Supported senior developers on a client project for MRCCI, contributing to frontend and backend tasks.",
      "Learned team workflows and real-world problem solving on production client work.",
    ],
  },
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
    date: "May 2024 - Sep 2025",
    points: [
      "Built and launched a real estate platform for Siribaan Property Group, with property search, detail pages and inquiry capture.",
      "Built an admin panel for managing 50+ property listings.",
      "Integrated Supabase database and storage and owned Vercel deployment and production troubleshooting.",
      "Delivered a React Native mobile app and SEO-focused WordPress websites for other clients.",
    ],
  },
  {
    title: "Full-Stack & AI Developer",
    companyName: "Saturday Education Consulting, Bangkok",
    icon: "/company/saturdayEducation.png",
    iconBg: "#FFFFFF",
    date: "Oct 2025 - Present",
    points: [
      "Led development of the company's study-abroad platform in Next.js, TypeScript and Supabase, with search across 700+ universities and 60,000+ courses.",
      "Designed psychometric career assessments that generate AI career and university recommendations and send counselors a profile report of each student's interests, skills and personality.",
      "Shipped a RAG-based AI university-advisor chatbot grounded in the platform's university and course data, plus document summarization and PDF report generation.",
      "Built an n8n agent on the Claude API that drafts replies to university partnership emails for human approval, cutting reply time from ~20 to ~3 min per email.",
    ],
  },
];

/* --------------------------------------------------------------------------
 *  PROJECTS  — TODO: add live demo links & new projects
 * ------------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    name: "Saturday Education Consulting",
    description:
      "The study-abroad platform I build at Saturday Education Consulting. Beyond a clean, trustworthy site, I built the AI layer: a RAG university-advisor chatbot and AI career tools that guide students from choosing a program through applications.",
    category: "Full-Time · Education",
    icon: "education",
    badge: "AI-Powered",
    features: [
      "Search across 700+ universities and 60,000+ courses",
      "RAG-based AI university advisor chatbot",
      "AI career assessment with counselor profile reports",
      "n8n + Claude partnership email agent",
      "Job outlook and market research tool",
      "Study destination guides",
      "Online consultation booking",
      "Admin dashboard for students, universities, and leads",
    ],
    liveDemoLink: "https://saturdayeducation.com",
  },
  {
    name: "Siribaan Property Group",
    description:
      "A real estate company focused on condos and apartments. As a freelancer, I built a modern property platform that makes buying simple, from browsing listings to reaching out about a home.",
    category: "Freelance · Real Estate",
    icon: "property",
    features: [
      "Property listings and search",
      "Admin panel managing 50+ listings",
      "Inquiry and lead capture",
      "Fast, responsive design",
    ],
    liveDemoLink: "https://siribaanproperty.com",
  },
  {
    name: "Game Info Website",
    description:
      "A responsive web app for browsing and discovering games. Users can search by genre, platform, and release details through a clean, intuitive interface.",
    category: "Personal · Web App",
    icon: "game",
    // TODO: adjust to the exact features you built
    features: [
      "Game search and discovery",
      "Genre and platform filters",
      "Detailed game info pages",
    ],
    liveDemoLink: "https://thihan-gameinfo.netlify.app/",
  },
];
