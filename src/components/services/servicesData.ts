// ─────────────────────────────────────────────────────────────────────────────
// Prime Mind Intelligence — Services Data Configuration
// All SVG paths use viewBox="0 0 24 24", stroke-based (Heroicons 2.0 outline)
// ─────────────────────────────────────────────────────────────────────────────

export type AccentColor = "blue" | "cyan" | "violet" | "emerald";

export interface ServiceItem {
  id: string;
  tag: string;               // short category overline
  title: string;
  description: string;
  href: string;
  /** Primary SVG path `d` string — stroke icon, viewBox 0 0 24 24 */
  iconPath: string;
  /** Optional second path for compound icons */
  iconPath2?: string;
  accentColor: AccentColor;
  /** Decorative index label shown faintly in card background */
  index: number;
}

// ── Icon path constants ────────────────────────────────────────────────────────

const ICON_SPARKLES =
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z";

const ICON_COMPUTER_DESKTOP =
  "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25";

const ICON_CLOUD =
  "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z";

const ICON_CLOUD_ARROW =
  "M12 16.5V9.75m0 0l3 3m-3-3l-3 3";

const ICON_SHIELD_CHECK =
  "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z";

const ICON_CHART_BAR =
  "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z";

const ICON_MAP =
  "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z";

// ── Service catalogue ──────────────────────────────────────────────────────────

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-ml",
    index: 1,
    tag: "Artificial Intelligence",
    title: "AI & Machine Learning Development",
    description:
      "Custom AI models, LLM integration, computer vision, NLP, and intelligent automation tailored to your business workflows.",
    href: "/services/ai-ml",
    iconPath: ICON_SPARKLES,
    accentColor: "cyan",
  },
  {
    id: "web-mobile",
    index: 2,
    tag: "Product Engineering",
    title: "Web & Mobile Application Development",
    description:
      "Scalable React, Next.js, Node.js, and React Native apps built with performance and user experience at the core.",
    href: "/services/web-mobile",
    iconPath: ICON_COMPUTER_DESKTOP,
    accentColor: "blue",
  },
  {
    id: "cloud-devops",
    index: 3,
    tag: "Infrastructure",
    title: "Cloud Architecture & DevOps",
    description:
      "AWS, GCP, and Azure infrastructure design, CI/CD pipelines, containerisation, and cost-optimised cloud migrations.",
    href: "/services/cloud-devops",
    iconPath: ICON_CLOUD,
    iconPath2: ICON_CLOUD_ARROW,
    accentColor: "blue",
  },
  {
    id: "cybersecurity",
    index: 4,
    tag: "Security",
    title: "Cybersecurity Solutions",
    description:
      "Penetration testing, security audits, compliance frameworks, and zero-trust architecture to protect your digital assets.",
    href: "/services/cybersecurity",
    iconPath: ICON_SHIELD_CHECK,
    accentColor: "cyan",
  },
  {
    id: "data-analytics",
    index: 5,
    tag: "Data Platform",
    title: "Data Engineering & Analytics",
    description:
      "Data pipeline design, real-time dashboards, BI integration, and predictive analytics to turn raw data into decisions.",
    href: "/services/data-analytics",
    iconPath: ICON_CHART_BAR,
    accentColor: "violet",
  },
  {
    id: "it-consulting",
    index: 6,
    tag: "Strategy",
    title: "IT Consulting & Digital Transformation",
    description:
      "Strategic roadmaps, technology assessments, and hands-on execution to modernise your operations end-to-end.",
    href: "/services/it-consulting",
    iconPath: ICON_MAP,
    accentColor: "emerald",
  },
];

// ── Accent colour map (Tailwind-safe literal strings) ─────────────────────────

export const ACCENT_STYLES: Record<
  AccentColor,
  {
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    tagColor: string;
    glowShadow: string;
    linkColor: string;
    cardBorderHover: string;
  }
> = {
  blue: {
    iconBg: "bg-blue-600/15",
    iconBorder: "border-blue-500/25",
    iconColor: "text-blue-400",
    tagColor: "text-blue-400",
    glowShadow:
      "0 0 0 1px rgba(37,99,235,0.35), 0 20px 60px -8px rgba(37,99,235,0.3)",
    linkColor: "text-blue-400 hover:text-blue-300",
    cardBorderHover: "hover:border-blue-500/40",
  },
  cyan: {
    iconBg: "bg-cyan-500/12",
    iconBorder: "border-cyan-500/25",
    iconColor: "text-cyan-400",
    tagColor: "text-cyan-400",
    glowShadow:
      "0 0 0 1px rgba(6,182,212,0.35), 0 20px 60px -8px rgba(6,182,212,0.25)",
    linkColor: "text-cyan-400 hover:text-cyan-300",
    cardBorderHover: "hover:border-cyan-500/40",
  },
  violet: {
    iconBg: "bg-violet-600/15",
    iconBorder: "border-violet-500/25",
    iconColor: "text-violet-400",
    tagColor: "text-violet-400",
    glowShadow:
      "0 0 0 1px rgba(124,58,237,0.35), 0 20px 60px -8px rgba(124,58,237,0.25)",
    linkColor: "text-violet-400 hover:text-violet-300",
    cardBorderHover: "hover:border-violet-500/40",
  },
  emerald: {
    iconBg: "bg-emerald-500/12",
    iconBorder: "border-emerald-500/25",
    iconColor: "text-emerald-400",
    tagColor: "text-emerald-400",
    glowShadow:
      "0 0 0 1px rgba(16,185,129,0.35), 0 20px 60px -8px rgba(16,185,129,0.25)",
    linkColor: "text-emerald-400 hover:text-emerald-300",
    cardBorderHover: "hover:border-emerald-500/40",
  },
};
