// ─── Types ────────────────────────────────────────────────────────────────────

export type BlogCategory =
  | "ai-ml"
  | "engineering"
  | "cloud"
  | "product"
  | "company";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  readTime: string;
  publishedAt: string;   // ISO date string
  author: {
    name: string;
    initials: string;
    avatarColor: string; // Tailwind bg class
  };
  featured: boolean;
  accentColor: "blue" | "cyan" | "violet" | "emerald";
}

// ─── Color maps ───────────────────────────────────────────────────────────────

export const BLOG_ACCENT: Record<
  BlogPost["accentColor"],
  { pill: string; text: string; dot: string }
> = {
  blue:    { pill: "bg-blue-500/15 text-blue-300 border border-blue-500/25",    text: "text-blue-300",    dot: "bg-blue-400"    },
  cyan:    { pill: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",    text: "text-cyan-300",    dot: "bg-cyan-400"    },
  violet:  { pill: "bg-violet-500/15 text-violet-300 border border-violet-500/25", text: "text-violet-300", dot: "bg-violet-400" },
  emerald: { pill: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25", text: "text-emerald-300", dot: "bg-emerald-400" },
};

// ─── Posts ────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "real-time-fraud-detection-ml-pipeline",
    title: "Building a Sub-40ms Fraud Detection Pipeline with Streaming ML",
    excerpt:
      "How we re-architected a legacy rule-based fraud engine into a Kafka + Flink + XGBoost pipeline that scores 5,000 transactions per second without sacrificing accuracy.",
    category: "ai-ml",
    categoryLabel: "AI / ML",
    readTime: "9 min read",
    publishedAt: "2025-03-18",
    author: { name: "Rishi Kapoor", initials: "RK", avatarColor: "bg-blue-600" },
    featured: true,
    accentColor: "blue",
  },
  {
    id: "2",
    slug: "nextjs-app-router-performance",
    title: "App Router at Scale: What Nobody Tells You About Next.js 14",
    excerpt:
      "Lessons from shipping three large Next.js App Router apps in production — streaming SSR edge cases, cache invalidation gotchas, and where RSC actually saves you.",
    category: "engineering",
    categoryLabel: "Engineering",
    readTime: "7 min read",
    publishedAt: "2025-02-28",
    author: { name: "Leila Park", initials: "LP", avatarColor: "bg-violet-600" },
    featured: false,
    accentColor: "violet",
  },
  {
    id: "3",
    slug: "hipaa-compliant-llm-clinical-notes",
    title: "HIPAA-Compliant LLM Integration: A Practical Checklist",
    excerpt:
      "Using large language models in healthcare means navigating PHI, BAAs, and audit logging. Here's the exact checklist we follow before any production deployment.",
    category: "ai-ml",
    categoryLabel: "AI / ML",
    readTime: "6 min read",
    publishedAt: "2025-02-10",
    author: { name: "Dr. Ananya Roy", initials: "AR", avatarColor: "bg-emerald-600" },
    featured: false,
    accentColor: "emerald",
  },
];
