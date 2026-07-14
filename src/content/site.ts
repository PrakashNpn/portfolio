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
  role: "Full-Stack Developer & AI Automation Engineer", // TODO: your title
  // The hero renders: "Shaping <rotating words> into Real Projects that Deliver Results"
  headline: ["into Real Projects", "that Deliver Results"], // TODO
  about:
    "I'm a Full-Stack Developer who loves turning ideas into fast, polished web and " +
    "mobile apps, and lately into AI-powered tools and automations that save real " +
    "time. I work end-to-end with React, Next.js, Node.js and modern databases, and I " +
    "bring in AI (agents, RAG, prompt engineering and workflow automation) to make " +
    "products genuinely smarter. As a freelancer, I help brands and businesses ship " +
    "modern websites, mobile apps, and automations that make an impact.", // TODO: your bio
  availability:
    "Actively looking for a full-time role (Full-Stack Developer / AI Engineer positions). " +
    "Also open to freelance or contract projects on the side.",
  email: "thihan839@gmail.com",
  location: "Onsite Bangkok, Remote & Worldwide",
  resumeUrl: "/resume.pdf", // replace /public/resume.pdf with your latest CV
  avatar: "/profile/myProfile.png",
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
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thi-han-a20866176/" },
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
      "Python (basic)",
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
      "Others",
    ],
  },
  {
    title: "Cloud & Tools",
    icon: "cloud",
    skills: ["Vercel", "Docker", "Linux", "Cloud VPS", "Git", "GitHub", "SSH", "SEO"],
  },
];

/* --------------------------------------------------------------------------
 *  EXPERIENCE  — TODO: review dates / descriptions
 * ------------------------------------------------------------------------ */
export const experiences: Experience[] = [
  {
    title: "Student Internship",
    companyName: "Marter Solutions",
    icon: "/company/marterSolutions.png",
    iconBg: "#383E56",
    date: "Jul 2020 - Oct 2020",
    points: [
      "Joined as a student intern and learned programming and web development.",
      "Learned how to work as a team and solve real-world problems and challenges.",
      "Worked as an assistant on an MRCCI project alongside senior developers.",
    ],
  },
  {
    title: "Web Development Internship",
    companyName: "Clouud Solutions",
    icon: "/company/clouudSolutions.png",
    iconBg: "#E6DEDD",
    date: "Dec 2021 - Feb 2022",
    points: [
      "Worked closely with team members to understand all modules of the client CRM project.",
      "Collaborated with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Worked as a junior full-stack developer using Laravel, Vue.js, Inertia.js, MySQL, and Tailwind CSS.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "mmRoute",
    icon: "/company/mmRoute.png",
    iconBg: "#383E56",
    date: "Oct 2022 - Feb 2024",
    points: [
      "Developed responsive, mobile-friendly websites using PHP, HTML, CSS, and JavaScript.",
      "Optimized website performance and applied SEO best practices.",
      "Ensured site security with regular updates, backups, and fixes.",
      "Integrated third-party APIs, payment gateways, and tools.",
    ],
  },
  {
    title: "Freelancer",
    companyName: "Freelance",
    icon: "/services/freelance.png",
    iconBg: "#E6DEDD",
    date: "Feb 2025 - Present",
    points: [
      "Freelance full-stack and AI engineer serving education and real estate clients.",
      "Shipped an AI advisor chatbot and career tools powered by Claude and RAG.",
      "Built a React Native app and SEO-driven WordPress sites for other clients.",
      "Handle every project, from planning through deployment and support.",
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
      "An international education consulting platform that helps students study abroad. Beyond a clean, trustworthy site, I built the AI layer: a university-advisor chatbot and AI-assisted career tools that guide students from choosing a program through applications.",
    category: "Client · Education",
    icon: "education",
    // badge: "",
    // TODO: adjust to the exact features you built
    features: [
      "AI-powered university advisor chatbot",
      "AI career assessment and guidance",
      "Job outlook and market research tool",
      "Universities and program search",
      "Study destination guides",
      "Online consultation booking",
      "Admin dashboard for students, universities, and leads",
    ],
    liveDemoLink: "https://saturdayeducation.com",
  },
  {
    name: "Siribaan Property Group",
    description:
      "A real estate company focused on condos and apartments. I built a modern property platform that makes buying simple, from browsing listings to reaching out about a home.",
    category: "Client · Real Estate",
    icon: "property",
    // TODO: adjust to the exact features you built
    features: [
      "Property listings and search",
      "Detailed property pages",
      "Enquiry and lead capture",
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
