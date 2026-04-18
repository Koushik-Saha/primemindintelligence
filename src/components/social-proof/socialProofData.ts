// ─────────────────────────────────────────────────────────────────────────────
// Prime Mind Intelligence — Social Proof Data
// ─────────────────────────────────────────────────────────────────────────────

// ── Stats ────────────────────────────────────────────────────────────────────

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  decimals?: number;
  /** Multiplier so hook counts to `value` but displays a scaled label (e.g. count 10 → "10M+") */
  displaySuffix?: string;
}

export const STATS: StatItem[] = [
  {
    id: "projects",
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across 6 service areas worldwide",
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Measured via post-project NPS surveys",
  },
  {
    id: "api-calls",
    value: 10,
    suffix: "M+",
    label: "API Calls / Month",
    description: "Across all managed cloud platforms",
  },
  {
    id: "countries",
    value: 15,
    suffix: "+",
    label: "Countries Served",
    description: "With clients across 5 continents",
  },
];

// ── Trusted-by company logos (two rows) ──────────────────────────────────────

export type LogoColor =
  | "amber" | "blue" | "cyan" | "emerald" | "fuchsia"
  | "indigo" | "orange" | "pink" | "purple" | "sky" | "teal" | "violet";

export interface CompanyLogo {
  id: string;
  name: string;
  abbr: string;
  color: LogoColor;
}

/** Row 1 — scrolls left */
export const LOGOS_ROW_1: CompanyLogo[] = [
  { id: "aws",         name: "Amazon Web Services",  abbr: "AWS",    color: "amber"   },
  { id: "stripe",      name: "Stripe",               abbr: "STR",    color: "indigo"  },
  { id: "figma",       name: "Figma",                abbr: "FIG",    color: "pink"    },
  { id: "vercel",      name: "Vercel",               abbr: "VCL",    color: "sky"     },
  { id: "gcp",         name: "Google Cloud",         abbr: "GCP",    color: "blue"    },
  { id: "mongodb",     name: "MongoDB",              abbr: "MDB",    color: "emerald" },
  { id: "shopify",     name: "Shopify",              abbr: "SHO",    color: "teal"    },
  { id: "twilio",      name: "Twilio",               abbr: "TWL",    color: "orange"  },
  { id: "hubspot",     name: "HubSpot",              abbr: "HBS",    color: "amber"   },
  { id: "salesforce",  name: "Salesforce",           abbr: "SFC",    color: "sky"     },
];

/** Row 2 — scrolls right */
export const LOGOS_ROW_2: CompanyLogo[] = [
  { id: "azure",       name: "Microsoft Azure",      abbr: "AZR",    color: "blue"    },
  { id: "atlassian",   name: "Atlassian",            abbr: "ATL",    color: "indigo"  },
  { id: "notion",      name: "Notion",               abbr: "NOT",    color: "violet"  },
  { id: "linear",      name: "Linear",               abbr: "LNR",    color: "purple"  },
  { id: "supabase",    name: "Supabase",             abbr: "SPB",    color: "emerald" },
  { id: "cloudflare",  name: "Cloudflare",           abbr: "CLF",    color: "orange"  },
  { id: "datadog",     name: "Datadog",              abbr: "DDG",    color: "fuchsia" },
  { id: "segment",     name: "Segment",              abbr: "SEG",    color: "teal"    },
  { id: "openai",      name: "OpenAI",               abbr: "OAI",    color: "cyan"    },
  { id: "anthropic",   name: "Anthropic",            abbr: "ANT",    color: "sky"     },
];

// ── Technology stack ──────────────────────────────────────────────────────────

export type TechCategory = "frontend" | "backend" | "database" | "ai-ml" | "devops";

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  /** First letters used as badge icon */
  abbr: string;
}

export const TECH_STACK: TechItem[] = [
  // Frontend
  { id: "react",      name: "React",       category: "frontend",  abbr: "⚛" },
  { id: "nextjs",     name: "Next.js",     category: "frontend",  abbr: "▲" },
  { id: "typescript", name: "TypeScript",  category: "frontend",  abbr: "TS" },
  { id: "tailwind",   name: "Tailwind CSS",category: "frontend",  abbr: "TW" },
  // Backend
  { id: "nodejs",     name: "Node.js",     category: "backend",   abbr: "⬡" },
  { id: "python",     name: "Python",      category: "backend",   abbr: "Py" },
  { id: "graphql",    name: "GraphQL",     category: "backend",   abbr: "GQ" },
  // Database
  { id: "postgres",   name: "PostgreSQL",  category: "database",  abbr: "PG" },
  { id: "mongodb",    name: "MongoDB",     category: "database",  abbr: "MG" },
  { id: "redis",      name: "Redis",       category: "database",  abbr: "Rd" },
  // AI/ML
  { id: "tensorflow", name: "TensorFlow",  category: "ai-ml",     abbr: "TF" },
  { id: "openai",     name: "OpenAI API",  category: "ai-ml",     abbr: "AI" },
  // DevOps
  { id: "aws",        name: "AWS",         category: "devops",    abbr: "☁" },
  { id: "docker",     name: "Docker",      category: "devops",    abbr: "🐳" },
  { id: "kubernetes", name: "Kubernetes",  category: "devops",    abbr: "⎈" },
];

export const CATEGORY_META: Record<
  TechCategory,
  { label: string; bg: string; border: string; text: string; dot: string; abbr: string }
> = {
  frontend: {
    label: "Frontend",
    bg:     "bg-blue-600/10",
    border: "border-blue-500/30",
    text:   "text-blue-300",
    dot:    "bg-blue-400",
    abbr:   "FE",
  },
  backend: {
    label: "Backend",
    bg:     "bg-violet-600/10",
    border: "border-violet-500/30",
    text:   "text-violet-300",
    dot:    "bg-violet-400",
    abbr:   "BE",
  },
  database: {
    label: "Database",
    bg:     "bg-amber-500/10",
    border: "border-amber-500/30",
    text:   "text-amber-300",
    dot:    "bg-amber-400",
    abbr:   "DB",
  },
  "ai-ml": {
    label: "AI / ML",
    bg:     "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text:   "text-cyan-300",
    dot:    "bg-cyan-400",
    abbr:   "AI",
  },
  devops: {
    label: "DevOps",
    bg:     "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text:   "text-emerald-300",
    dot:    "bg-emerald-400",
    abbr:   "DO",
  },
};

export const LOGO_COLOR_CLASSES: Record<LogoColor, { text: string; bg: string; border: string }> = {
  amber:   { text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20"  },
  blue:    { text: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/20"   },
  cyan:    { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/20"   },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20"},
  fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-400/10", border: "border-fuchsia-400/20"},
  indigo:  { text: "text-indigo-400",  bg: "bg-indigo-400/10",  border: "border-indigo-400/20" },
  orange:  { text: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/20" },
  pink:    { text: "text-pink-400",    bg: "bg-pink-400/10",    border: "border-pink-400/20"   },
  purple:  { text: "text-purple-400",  bg: "bg-purple-400/10",  border: "border-purple-400/20" },
  sky:     { text: "text-sky-400",     bg: "bg-sky-400/10",     border: "border-sky-400/20"    },
  teal:    { text: "text-teal-400",    bg: "bg-teal-400/10",    border: "border-teal-400/20"   },
  violet:  { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/20" },
};
