// ─── Types ────────────────────────────────────────────────────────────────────

export type CaseStudyCategory =
  | "saas"
  | "logistics"
  | "ecommerce"
  | "web"
  | "publishing"
  | "admin";

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
  accentColor: "blue" | "cyan" | "violet" | "emerald" | "amber" | "rose";
  gradientFrom: string;
  gradientTo: string;
  duration: string;
  year: string;
  /** Live deployed URL */
  liveUrl: string;
  /** GitHub repo URL */
  githubUrl: string;
  /** Tech stack badges */
  techStack: string[];
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
  rose: {
    pill:      "bg-rose-500/15 text-rose-300 border border-rose-500/25",
    glow:      "rgba(244,63,94,0.35)",
    metric:    "text-rose-300",
    border:    "border-rose-500/30",
    iconBg:    "bg-rose-600/20",
    iconColor: "text-rose-400",
  },
};

// ─── Category filter metadata ─────────────────────────────────────────────────

export const CATEGORY_META: Record<
  CaseStudyCategory,
  { label: string; dot: string }
> = {
  saas:       { label: "SaaS",        dot: "bg-amber-400"   },
  logistics:  { label: "Logistics",   dot: "bg-cyan-400"    },
  ecommerce:  { label: "E-Commerce",  dot: "bg-violet-400"  },
  web:        { label: "Web & Mobile", dot: "bg-blue-400"   },
  publishing: { label: "Publishing",  dot: "bg-emerald-400" },
  admin:      { label: "Admin Tools", dot: "bg-rose-400"    },
};

// ─── Real project case studies ────────────────────────────────────────────────

export const CASE_STUDIES: CaseStudy[] = [
  // 1 ─ IJAISM
  {
    id: "ijaism-academic-platform",
    client: "IJAISM",
    tagline: "Academic Publishing · Full-Stack Platform",
    title: "International Academic Journal Publishing Platform",
    description:
      "Built a complete end-to-end academic publishing platform from scratch. Supports journal submission, multi-issue management, article discovery, PDF generation, and full payment processing — all with a custom-built authentication system, AWS S3 storage, and error monitoring via Sentry.",
    category: "publishing",
    categoryLabel: "Publishing",
    services: ["Full-Stack Engineering", "Cloud (AWS S3)", "Payments (Stripe + PayPal)", "PDF Processing"],
    metrics: [
      { value: "100%", label: "Custom Built"       },
      { value: "2 GWs",  label: "Payment Gateways" },
      { value: "E2E",   label: "Test Coverage"     },
      { value: "AWS",   label: "S3 Storage"        },
    ],
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    accentColor: "emerald",
    gradientFrom: "#065F46",
    gradientTo:   "#0A0F2C",
    duration: "Ongoing",
    year: "2026",
    liveUrl: "https://international-journal-of-advanced-i.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/IJAISM",
    techStack: ["Next.js 16", "TypeScript", "Prisma", "AWS S3", "Stripe", "PayPal", "Sentry"],
  },

  // 2 ─ schedule-business
  {
    id: "schedule-business-saas",
    client: "Schedule Business",
    tagline: "SaaS · Business Scheduling",
    title: "Multi-Tenant Business Scheduling SaaS Platform",
    description:
      "Designed and built a multi-tenant scheduling SaaS for service businesses. Features include NextAuth v5 App Router-native authentication, appointment booking, automated email notifications, Prisma-powered database layer with seed scripts, and a polished Framer Motion UI.",
    category: "saas",
    categoryLabel: "SaaS",
    services: ["SaaS Architecture", "Full-Stack Engineering", "Auth (NextAuth v5)", "Email Automation"],
    metrics: [
      { value: "v5",    label: "NextAuth (Latest)" },
      { value: "Multi", label: "Tenant Ready"      },
      { value: "Auto",  label: "Email Notify"      },
      { value: "ORM",   label: "Prisma DB"         },
    ],
    iconPath:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    accentColor: "blue",
    gradientFrom: "#1E3A8A",
    gradientTo:   "#0A0F2C",
    duration: "Ongoing",
    year: "2026",
    liveUrl: "https://schedule-business.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/schedule-business",
    techStack: ["Next.js 16", "TypeScript", "Prisma v6", "NextAuth v5", "Resend", "Framer Motion"],
  },

  // 3 ─ fixup-llc-report
  {
    id: "freedom-shipping-llc-ops",
    client: "Freedom Shipping LLC",
    tagline: "Logistics · Operations & Reporting",
    title: "Shipping Company Operations & Daily Reporting System",
    description:
      "Built a comprehensive internal operations platform for a shipping/logistics company. Includes multi-store daily reports, personnel and shift management, PDF auto-table exports, inventory tracking, AWS S3 document storage, and enterprise-grade two-factor authentication (TOTP + QR codes).",
    category: "logistics",
    categoryLabel: "Logistics",
    services: ["Internal Operations", "PDF Export", "2FA Security", "Cloud Storage (AWS S3)"],
    metrics: [
      { value: "2FA",   label: "TOTP Security"   },
      { value: "PDF",   label: "Auto Reports"     },
      { value: "Multi", label: "Store Support"    },
      { value: "AWS",   label: "S3 Documents"     },
    ],
    iconPath:
      "M3 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM9 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM9 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM9 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM15 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM15 10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM15 16a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z",
    accentColor: "cyan",
    gradientFrom: "#164E63",
    gradientTo:   "#0A0F2C",
    duration: "Ongoing",
    year: "2026",
    liveUrl: "https://fixup-llc-report.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/fixup-llc-report",
    techStack: ["Next.js 16", "TypeScript", "Prisma", "NextAuth v4", "AWS S3", "jsPDF", "2FA (TOTP)"],
  },

  // 4 ─ FixItUp-Frontend
  {
    id: "fixitup-repair-booking",
    client: "FixItUp / Max Phone Repair",
    tagline: "E-Commerce · Repair Booking Platform",
    title: "Premium Phone Repair Booking & Payment Platform",
    description:
      "Engineered a full-stack customer-facing repair booking platform. Customers can find their device, book a repair, pay via Stripe, and track their order — all in a polished Radix UI + shadcn/ui interface. Backed by Supabase Auth, rate limiting with Upstash Redis, reCAPTCHA, and React Email for transactional messages.",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    services: ["Web Engineering", "Stripe Payments", "Supabase Auth", "Rate Limiting"],
    metrics: [
      { value: "Stripe", label: "Payments"        },
      { value: "Redis",  label: "Rate Limiting"    },
      { value: "Auth",   label: "Supabase SSR"     },
      { value: "RHF",    label: "Form Validation"  },
    ],
    iconPath:
      "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    accentColor: "violet",
    gradientFrom: "#4C1D95",
    gradientTo:   "#0A0F2C",
    duration: "4 months",
    year: "2025",
    liveUrl: "https://fix-it-up-frontend.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/FixItUp-Frontend",
    techStack: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Radix UI", "Upstash Redis", "Vitest"],
  },

  // 5 ─ FixIT-Admin
  {
    id: "fixit-admin-panel",
    client: "FixItUp — Admin",
    tagline: "Admin Tools · Internal Dashboard",
    title: "FixItUp Staff Admin Dashboard & Operations Panel",
    description:
      "Built the internal admin panel for FixItUp store operations. Staff can manage repair orders, customers, and inventory through an Ant Design–based interface with rich data tables, date pickers, and role-based access control — all secured with Supabase Auth SSR.",
    category: "admin",
    categoryLabel: "Admin Tools",
    services: ["Admin Dashboard", "Ant Design UI", "Role-Based Access", "Supabase Auth"],
    metrics: [
      { value: "AntD",  label: "UI Framework"    },
      { value: "RBAC",  label: "Role Access"      },
      { value: "SSR",   label: "Supabase Auth"    },
      { value: "5001",  label: "Custom Port"      },
    ],
    iconPath:
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    accentColor: "rose",
    gradientFrom: "#7F1D1D",
    gradientTo:   "#0A0F2C",
    duration: "3 months",
    year: "2025",
    liveUrl: "https://fix-it-admin-pearl.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/FixIT-Admin",
    techStack: ["Next.js 16", "TypeScript", "Ant Design v6", "Supabase", "Tailwind CSS v4"],
  },

  // 6 ─ shipping-rates
  {
    id: "pirate-shipping-rates",
    client: "Pirate Shipping",
    tagline: "Logistics · Shipping Rate Calculator",
    title: "EasyPost Shipping Rate Calculator & Label Generator",
    description:
      "Developed a multi-carrier shipping rate calculator and label generator integrated with the EasyPost API. Features include user accounts with NextAuth, two-factor authentication via Speakeasy, QR code generation, analytics dashboards with Recharts, and a full Prisma-backed data layer.",
    category: "logistics",
    categoryLabel: "Logistics",
    services: ["EasyPost Integration", "Multi-Carrier Rates", "2FA (Speakeasy)", "Analytics Dashboard"],
    metrics: [
      { value: "API", label: "EasyPost Live"    },
      { value: "2FA", label: "Speakeasy TOTP"   },
      { value: "QR",  label: "Code Generation"  },
      { value: "Chart", label: "Analytics"      },
    ],
    iconPath:
      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    accentColor: "amber",
    gradientFrom: "#78350F",
    gradientTo:   "#0A0F2C",
    duration: "3 months",
    year: "2025",
    liveUrl: "https://shipping-rates-kappa.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/shipping-rates",
    techStack: ["Next.js 16", "TypeScript", "Prisma v6", "EasyPost", "Speakeasy 2FA", "Recharts"],
  },

  // 7 ─ fixup-schedule
  {
    id: "fixup-appointment-booking",
    client: "FixUp",
    tagline: "Web · Appointment Scheduling",
    title: "Customer Appointment Booking & Email Notification System",
    description:
      "Built a fast, lightweight appointment scheduling page for FixUp's service centres. Customers book slots directly from the site, and both the customer and store receive instant email confirmations via Resend and Nodemailer — zero infrastructure overhead.",
    category: "web",
    categoryLabel: "Web & Mobile",
    services: ["Booking Flow", "Email Automation", "Resend", "Nodemailer"],
    metrics: [
      { value: "2-way", label: "Email Confirm"  },
      { value: "Fast",  label: "Zero-Lag UX"    },
      { value: "API",   label: "Resend + SMTP"  },
      { value: "Light", label: "No Overhead"    },
    ],
    iconPath:
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    accentColor: "cyan",
    gradientFrom: "#0C4A6E",
    gradientTo:   "#0A0F2C",
    duration: "2 weeks",
    year: "2025",
    liveUrl: "https://fixup-schedule.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/fixup-schedule",
    techStack: ["Next.js 16", "TypeScript", "Resend", "Nodemailer"],
  },

  // 8 ─ schedule-business portfolio
  {
    id: "developer-portfolio",
    client: "Personal Portfolio",
    tagline: "Web · Developer Portfolio",
    title: "Animated Developer Portfolio Website",
    description:
      "Crafted a personal portfolio website showcasing professional skills, projects, and work history. Features premium Framer Motion animations, a minimal dark-mode design, and a fully responsive layout — all built without a single component library.",
    category: "web",
    categoryLabel: "Web & Mobile",
    services: ["Portfolio Design", "Framer Motion", "Responsive UI", "Next.js"],
    metrics: [
      { value: "0 deps", label: "UI Libraries"    },
      { value: "100%",   label: "Custom Design"   },
      { value: "Motion", label: "Framer Animate"  },
      { value: "Dark",   label: "Mode First"      },
    ],
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    accentColor: "violet",
    gradientFrom: "#3B0764",
    gradientTo:   "#0A0F2C",
    duration: "2 weeks",
    year: "2026",
    liveUrl: "https://potential-octo-chainsaw-ivory.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/potential-octo-chainsaw",
    techStack: ["Next.js 16", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },

  // 9 ─ Prime Mind Intelligence site itself
  {
    id: "prime-mind-intelligence-website",
    client: "Prime Mind Intelligence",
    tagline: "Web · Company Marketing Site",
    title: "Prime Mind Intelligence — AI & IT Solutions Website",
    description:
      "Designed and built the flagship marketing website for Prime Mind Intelligence. Features an animated mega-dropdown navbar, particle network hero, infinite-scroll social proof ticker, filterable case studies, multi-page routing with 15+ routes, and full SEO infrastructure — sitemap, robots, JSON-LD schema, and Open Graph.",
    category: "web",
    categoryLabel: "Web & Mobile",
    services: ["Marketing Site", "Mega Menu Nav", "SEO Infrastructure", "Framer Motion"],
    metrics: [
      { value: "15+",    label: "Pages Built"      },
      { value: "100",    label: "Lighthouse Score" },
      { value: "JSON-LD", label: "Structured Data" },
      { value: "v4",     label: "Tailwind CSS"     },
    ],
    iconPath:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    accentColor: "blue",
    gradientFrom: "#1E3A8A",
    gradientTo:   "#0A0F2C",
    duration: "Ongoing",
    year: "2026",
    liveUrl: "https://primemindintelligence.vercel.app",
    githubUrl: "https://github.com/Koushik-Saha/primemindintelligence",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Zod"],
  },
];
