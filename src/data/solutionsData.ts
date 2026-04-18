export interface SolutionData {
  slug: string;
  industry: string;
  title: string;
  tagline: string;
  description: string;
  challenges: string[];
  capabilities: string[];
  caseStudyTitle: string;
  caseStudyBody: string;
  metrics: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  iconPath: string;
  accentFrom: string;
  accentTo: string;
  accentText: string;
  accentBg: string;
}

export const SOLUTIONS_DATA: SolutionData[] = [
  {
    slug: "startups",
    industry: "Startups",
    title: "Built for Startups",
    tagline: "Move fast without breaking everything",
    description: "AI-readiness sprints, MVP engineering, and scalable foundations for seed to Series B companies.",
    challenges: [
      "Need to ship an MVP in weeks, not months",
      "No in-house engineering team yet",
      "Investors asking about AI strategy",
      "Technical debt accumulating faster than features",
      "Need enterprise-grade security without enterprise-grade cost",
    ],
    capabilities: [
      "MVP engineering — scoped and delivered in 8–12 weeks",
      "AI-readiness sprint — assess and prototype your AI opportunity in 2 weeks",
      "Technical co-founder as a service (fractional CTO)",
      "Architecture that grows with your funding rounds",
      "Investor-ready technical due diligence documentation",
      "Security fundamentals without overkill",
    ],
    caseStudyTitle: "Seed-stage fintech ships fraud prevention MVP in 10 weeks",
    caseStudyBody: "A two-person founding team needed a working fraud detection demo for their Series A pitch. We designed the architecture, built the ML pipeline, and deployed a production-grade API in 10 weeks. They closed their round oversubscribed.",
    metrics: [
      { value: "10wk",  label: "Avg. MVP to launch" },
      { value: "80%",   label: "Startups that raise post-MVP" },
      { value: "< $50k", label: "Starting engagement size" },
      { value: "3×",    label: "Faster than building in-house" },
    ],
    faqs: [
      { q: "Do you take equity?", a: "We're fee-based. We don't take equity, which means our incentives are aligned with quality delivery, not valuation." },
      { q: "What if we need to pivot?", a: "We build for change. Modular architecture and clean contracts mean pivoting is an iteration, not a rewrite." },
      { q: "Can you help us hire engineers later?", a: "Yes. We can help write job specs, run technical interviews, and set up the onboarding process for your first engineering hires." },
    ],
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    accentFrom: "#1E3A8A", accentTo: "#2563EB", accentText: "text-blue-300", accentBg: "bg-blue-600/20",
  },
  {
    slug: "enterprise",
    industry: "Enterprise",
    title: "Built for Enterprise",
    tagline: "Modernise without the risk",
    description: "Platform modernisation, legacy integration, governance, and scalable engineering for large organisations.",
    challenges: [
      "Legacy systems blocking agility and innovation",
      "Multiple siloed data sources with no unified view",
      "Compliance and security requirements at scale",
      "Engineering teams stretched across too many priorities",
      "AI initiatives that haven't moved past PoC",
    ],
    capabilities: [
      "Legacy modernisation — strangler fig pattern, incremental migration",
      "Enterprise data platform and lakehouse design",
      "AI at scale — MLOps, model governance, and enterprise LLM deployments",
      "SOC 2, ISO 27001, and GDPR compliance engineering",
      "API gateway and integration layer design",
      "Engineering augmentation — dedicated team embedded in your org",
    ],
    caseStudyTitle: "Global retailer unifies 7 data sources into a single analytics platform",
    caseStudyBody: "A 10,000-person retail group had customer data scattered across 7 systems. We built a unified lakehouse that became the single source of truth for BI, personalisation, and inventory forecasting — reducing analyst query time from hours to seconds.",
    metrics: [
      { value: "7",     label: "Avg. legacy systems modernised" },
      { value: "40%",   label: "Engineering velocity improvement" },
      { value: "SOC 2", label: "Compliance milestones met" },
      { value: "99.9%", label: "Platform uptime SLA" },
    ],
    faqs: [
      { q: "How do you handle enterprise procurement processes?", a: "We're familiar with MSA/SOW structures, security questionnaires, and legal review cycles. We'll work within your process." },
      { q: "Do you sign NDAs and enterprise security addendums?", a: "Yes, standard practice. We also complete security questionnaires and provide evidence packs for vendor onboarding." },
      { q: "Can you work alongside our internal engineering teams?", a: "Yes — we prefer it. We work as an extension of your team, not a separate workstream." },
    ],
    iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    accentFrom: "#0C4A6E", accentTo: "#0369A1", accentText: "text-sky-300", accentBg: "bg-sky-600/20",
  },
  {
    slug: "healthcare",
    industry: "Healthcare",
    title: "Built for Healthcare",
    tagline: "HIPAA-compliant AI from day one",
    description: "Clinical workflow automation, medical AI, and compliant data platforms for healthcare organisations.",
    challenges: [
      "HIPAA compliance complexity slowing AI adoption",
      "Clinician burnout from manual documentation",
      "Patient data siloed across EMR systems",
      "Manual, error-prone clinical workflows",
      "Demonstrating AI safety to regulatory bodies",
    ],
    capabilities: [
      "HIPAA-compliant AI deployments — BAAs, audit logging, PHI protection",
      "Clinical NLP — note summarisation, ICD coding, prior auth automation",
      "Patient flow & bed utilisation optimisation",
      "Medical imaging analysis and computer vision",
      "HL7 FHIR / EHR integration (Epic, Cerner, Athena)",
      "Predictive readmission and deterioration models",
    ],
    caseStudyTitle: "12-hospital network cuts documentation time from 24 minutes to 7",
    caseStudyBody: "MediTrack deployed our HIPAA-compliant LLM notes assistant across 12 hospitals. Clinicians went from 24 minutes to under 7 minutes on average documentation time — saving over 3 hours per clinician per day across the network.",
    metrics: [
      { value: "HIPAA", label: "Compliant by design" },
      { value: "70%",   label: "Reduction in documentation time" },
      { value: "38%",   label: "Faster patient discharges" },
      { value: "99.9%", label: "Platform uptime SLA" },
    ],
    faqs: [
      { q: "How do you handle PHI in AI training data?", a: "We de-identify data before it leaves the clinical environment, sign BAAs, and use private model deployments — never third-party public APIs." },
      { q: "Can your systems integrate with our EHR?", a: "Yes. We have experience with Epic, Cerner, Athena, and HL7 FHIR APIs for bi-directional data exchange." },
      { q: "How do you validate AI models for clinical use?", a: "Prospective validation, clinician feedback loops, confidence thresholds, and human-in-the-loop for high-stakes decisions." },
    ],
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    accentFrom: "#134E4A", accentTo: "#059669", accentText: "text-emerald-300", accentBg: "bg-emerald-600/20",
  },
  {
    slug: "fintech",
    industry: "Fintech",
    title: "Built for Fintech",
    tagline: "Intelligent systems for financial services",
    description: "Fraud detection, risk modelling, algorithmic decision engines, and RegTech for financial services companies.",
    challenges: [
      "Rule-based fraud systems with high false-positive rates",
      "Real-time transaction scoring at scale",
      "RegTech and AML compliance complexity",
      "Legacy core banking integration",
      "Model risk management and explainability requirements",
    ],
    capabilities: [
      "Real-time fraud detection (sub-50ms scoring)",
      "Credit risk modelling and underwriting automation",
      "AML transaction monitoring",
      "Algorithmic decision engines with audit trails",
      "RegTech — KYC/KYB automation",
      "Open banking and payment API integration",
      "Model explainability for regulatory submissions",
      "PCI-DSS compliant infrastructure",
    ],
    caseStudyTitle: "NovaPay cuts fraud losses by 40% while reducing false positives by 60%",
    caseStudyBody: "We replaced NovaPay's rule-based engine with a real-time ML pipeline scoring 5,000 transactions per second. Fraud detection rate jumped to 94% while false positives — which were blocking legitimate customers — dropped by 60%, unlocking $2M in previously lost revenue.",
    metrics: [
      { value: "< 40ms", label: "Transaction scoring latency" },
      { value: "94%",    label: "Fraud detection rate" },
      { value: "60%",    label: "False positive reduction" },
      { value: "PCI-DSS", label: "Compliance maintained" },
    ],
    faqs: [
      { q: "How do you handle model explainability for regulators?", a: "We use SHAP values, LIME, and decision audit logs to produce human-readable explanations for any model decision." },
      { q: "Can your models work with limited fraud labels?", a: "Yes. We use semi-supervised learning, anomaly detection, and synthetic data techniques to handle class imbalance." },
      { q: "How do you avoid disparate impact in credit models?", a: "We run fairness audits at every evaluation checkpoint using multiple bias metrics before any model goes to production." },
    ],
    iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accentFrom: "#1E3A8A", accentTo: "#3B82F6", accentText: "text-blue-300", accentBg: "bg-blue-600/20",
  },
];

export function getSolutionBySlug(slug: string): SolutionData | undefined {
  return SOLUTIONS_DATA.find((s) => s.slug === slug);
}
