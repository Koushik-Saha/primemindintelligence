// ─────────────────────────────────────────────────────────────────────────────
// Prime Mind Intelligence — Navigation Configuration
// ─────────────────────────────────────────────────────────────────────────────

export interface NavSubItem {
  label: string;
  href: string;
  description: string;
  icon: string; // SVG path string (viewBox="0 0 24 24")
}

export interface NavItem {
  label: string;
  href?: string;                 // present when item has no dropdown
  dropdown?: NavSubItem[];
  megaLabel?: string;            // section heading inside mega menu
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    megaLabel: "What We Build",
    dropdown: [
      {
        label: "AI Development",
        href: "/services/ai-development",
        description: "Custom ML models, LLM integrations, and intelligent automation pipelines.",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      },
      {
        label: "Web & Mobile Apps",
        href: "/services/web-mobile",
        description: "Full-stack product engineering — React, Next.js, React Native, and beyond.",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      },
      {
        label: "Cloud Solutions",
        href: "/services/cloud",
        description: "AWS, GCP, and Azure architecture, migration, and managed operations.",
        icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        description: "Zero-trust architecture, penetration testing, and continuous threat monitoring.",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      },
      {
        label: "Data & Analytics",
        href: "/services/data-analytics",
        description: "End-to-end data platforms, dashboards, and real-time analytics infrastructure.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      },
      {
        label: "IT Consulting",
        href: "/services/it-consulting",
        description: "Strategic technology advisory, digital transformation, and vendor evaluation.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
    ],
  },
  {
    label: "Solutions",
    megaLabel: "Built for Your Industry",
    dropdown: [
      {
        label: "For Startups",
        href: "/solutions/startups",
        description: "MVP engineering, AI-readiness sprints, and rapid go-to-market infrastructure.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        label: "For Enterprise",
        href: "/solutions/enterprise",
        description: "Scalable platform modernisation, legacy system integration, and governance.",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      },
      {
        label: "For Healthcare",
        href: "/solutions/healthcare",
        description: "HIPAA-compliant AI tools, medical imaging, and clinical workflow automation.",
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      },
      {
        label: "For Fintech",
        href: "/solutions/fintech",
        description: "Fraud detection, risk modelling, algorithmic decision engines, and RegTech.",
        icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    ],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "About Us",
    megaLabel: "Who We Are",
    dropdown: [
      {
        label: "Our Story",
        href: "/about/story",
        description: "How Prime Mind Intelligence was founded and the mission behind it.",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      },
      {
        label: "Team",
        href: "/about/team",
        description: "Meet the engineers, researchers, and strategists driving our work.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      },
      {
        label: "Careers",
        href: "/about/careers",
        description: "Open roles for engineers, designers, and AI researchers.",
        icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      },
      {
        label: "Culture",
        href: "/about/culture",
        description: "Our principles, way of working, and commitment to responsible AI.",
        icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
];
