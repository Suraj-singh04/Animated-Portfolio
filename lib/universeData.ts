import type { Orb, OrbId, PageContent } from "@/types/universe";

export const ORBS: Orb[] = [
  {
    id: "about",
    label: "ABOUT",
    x: 16,
    y: 38,
    size: 82,
    c1: "#6366f1",
    c2: "#8b5cf6",
    d: 0,
    mn: 1,
    url: "/universe/about",
  },
  {
    id: "work",
    label: "WORK",
    x: 78,
    y: 30,
    size: 105,
    c1: "#ec4899",
    c2: "#f97316",
    d: 0.5,
    mn: 2,
    url: "/universe/work",
  },
  {
    id: "skills",
    label: "SKILLS",
    x: 48,
    y: 62,
    size: 92,
    c1: "#14b8a6",
    c2: "#3b82f6",
    d: 1,
    mn: 1,
    url: "/universe/skills",
  },
  {
    id: "contact",
    label: "CONTACT",
    x: 22,
    y: 82,
    size: 72,
    c1: "#f59e0b",
    c2: "#ef4444",
    d: 1.5,
    mn: 0,
    url: "/universe/contact",
  },
  {
    id: "blog",
    label: "BLOG",
    x: 82,
    y: 78,
    size: 62,
    c1: "#8b5cf6",
    c2: "#ec4899",
    d: 2,
    mn: 1,
    url: "/universe/blog",
  },
];

export const CONTENT: Record<OrbId, PageContent> = {
  about: {
    t: "ABOUT ME",
    p: "A passionate full-stack developer crafting digital experiences that blend creativity with clean code.",
    items: [
      "React & Next.js",
      "Node.js & Python",
      "Cloud Architecture",
      "UI/UX Design",
    ],
  },
  work: {
    t: "MY WORK",
    p: "Selected projects showcasing end-to-end development expertise.",
    items: [
      "E-Commerce Platform",
      "SaaS Dashboard",
      "Mobile App",
      "AI Integration",
    ],
  },
  skills: {
    t: "SKILLS",
    p: "Technologies and tools I use to bring ideas to life.",
    items: [
      "Frontend Mastery",
      "Backend Systems",
      "Database Design",
      "DevOps & CI/CD",
    ],
  },
  contact: {
    t: "CONTACT",
    p: "Let's create something amazing together.",
    items: ["hello@johndoe.dev", "GitHub", "LinkedIn", "Twitter"],
  },
  blog: {
    t: "BLOG",
    p: "Thoughts on code, design, and the future of web.",
    items: ["AI in Web Dev", "React Tips", "Clean Code", "Career Advice"],
  },
};

export const TRAIL_COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b"];
