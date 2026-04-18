// ─── Types ────────────────────────────────────────────────────────────────────

export type CaseStudyCategory =
  | "fintech"
  | "healthtech"
  | "logistics"
  | "ecommerce"
  | "saas";

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  tagline: string;
  title: string;
  description: string;
  category: CaseStudyCategory;
  categoryLabel: string;
  services: string[];
  metrics: CaseStudyMetric[];
  /** Heroicons 2.0 outline path(s) — used for the category icon */
  iconPath: string;
  /** Tailwind classes for the card accent color */
  accentColor: "blue" | "cyan" | "violet" | "emerald" | "amber";
  /** 0–1 y offset for background gradient (0 = top, 1 = bottom) */
  gradientFrom: string;
  gradientTo: string;
  duration: string;
  year: string;
}

// ─── Accent styles ────────────────────────────────────────────────────────────

export const ACCENT_STYLES: Record<
  CaseStudy["accentColor"],
  { pill: string; glow: string; metric: string; border: string; iconBg: string; iconColor: string }
> = {
  blue: {
    pill:      "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    glow:      "rgba(37,99,235,0.35)",
    metric:    "text-blue-300",
    border:    "border-blue-500/30",
    iconBg:    "bg-blue-600/20",
    iconColor: "text-blue-400",
  },
  cyan: {
    pill:      "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
    glow:      "rgba(6,182,212,0.35)",
    metric:    "text-cyan-300",
    border:    "border-cyan-500/30",
    iconBg:    "bg-cyan-600/20",
    iconColor: "text-cyan-400",
  },
  violet: {
    pill:      "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    glow:      "rgba(124,58,237,0.35)",
    metric:    "text-violet-300",
    border:    "border-violet-500/30",
    iconBg:    "bg-violet-600/20",
    iconColor: "text-violet-400",
  },
  emerald: {
    pill:      "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
    glow:      "rgba(16,185,129,0.35)",
    metric:    "text-emerald-300",
    border:    "border-emerald-500/30",
    iconBg:    "bg-emerald-600/20",
    iconColor: "text-emerald-400",
  },
  amber: {
    pill:      "bg-amber-500/15 text-amber-300 border border-amber-500/25",
    glow:      "rgba(245,158,11,0.35)",
    metric:    "text-amber-300",
    border:    "border-amber-500/30",
    iconBg:    "bg-amber-600/20",
    iconColor: "text-amber-400",
  },
};

// ─── Category filter metadata ─────────────────────────────────────────────────

export const CATEGORY_META: Record<
  CaseStudyCategory,
  { label: string; dot: string }
> = {
  fintech:    { label: "Fintech",    dot: "bg-blue-400"    },
  healthtech: { label: "HealthTech", dot: "bg-emerald-400" },
  logistics:  { label: "Logistics",  dot: "bg-cyan-400"    },
  ecommerce:  { label: "E-Commerce", dot: "bg-violet-400"  },
  saas:       { label: "SaaS",       dot: "bg-amber-400"   },
};

// ─── Case study data ──────────────────────────────────────────────────────────

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "novapay-fraud-detection",
    client: "NovaPay",
    tagline: "Fintech · Fraud Prevention",
    title: "AI-Powered Fraud Detection Platform",
    description:
      "Rebuilt NovaPay's rule-based fraud engine with a real-time ML pipeline. The new system scores every transaction in under 40ms, catching 94% of fraud while cutting false positives by 60% — unlocking $2M+ in previously blocked revenue.",
    category: "fintech",
    categoryLabel: "Fintech",
    services: ["AI / ML", "Data Engineering", "Cloud (AWS)"],
    metrics: [
      { value: "94%",   label: "Fraud Detection Rate" },
      { value: "<40ms", label: "Scoring Latency"      },
      { value: "60%",   label: "False Positives Cut"  },
      { value: "$2M+",  label: "Revenue Recovered"    },
    ],
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accentColor: "blue",
    gradientFrom: "#1E3A8A",
    gradientTo:   "#0A0F2C",
    duration: "5 months",
    year: "2024",
  },
  {
    id: "meditrack-patient-ops",
    client: "MediTrack",
    tagline: "HealthTech · Clinical Operations",
    title: "Intelligent Patient Operations Suite",
    description:
      "Designed and shipped a HIPAA-compliant patient management platform for a 12-hospital network. Predictive bed-utilisation models reduced discharge delays by 38%, while an LLM-powered clinical notes assistant cut documentation time from 24 min to under 7.",
    category: "healthtech",
    categoryLabel: "HealthTech",
    services: ["Full-Stack Engineering", "AI / ML", "HIPAA Compliance"],
    metrics: [
      { value: "38%",  label: "Faster Discharges"     },
      { value: "7 min", label: "Avg. Documentation"   },
      { value: "12",   label: "Hospitals Deployed"    },
      { value: "99.9%", label: "Uptime SLA"           },
    ],
    iconPath:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    accentColor: "emerald",
    gradientFrom: "#065F46",
    gradientTo:   "#0A0F2C",
    duration: "7 months",
    year: "2024",
  },
  {
    id: "logiflow-supply-chain",
    client: "LogiFlow",
    tagline: "Logistics · Supply Chain",
    title: "Predictive Supply-Chain Intelligence",
    description:
      "Replaced LogiFlow's static routing rules with a live ML model that ingests weather, port congestion, and carrier data streams. Delivery prediction accuracy jumped to 91%; fuel spend dropped 18% across a 2,000-vehicle fleet.",
    category: "logistics",
    categoryLabel: "Logistics",
    services: ["Data Engineering", "AI / ML", "Real-Time Systems"],
    metrics: [
      { value: "91%",  label: "Delivery Accuracy"    },
      { value: "18%",  label: "Fuel Cost Saved"      },
      { value: "2k",   label: "Vehicles Optimised"   },
      { value: "3×",   label: "Faster Route Updates" },
    ],
    iconPath:
      "M3 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM9 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM9 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM9 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM15 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM15 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM15 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z",
    accentColor: "cyan",
    gradientFrom: "#164E63",
    gradientTo:   "#0A0F2C",
    duration: "4 months",
    year: "2025",
  },
];
