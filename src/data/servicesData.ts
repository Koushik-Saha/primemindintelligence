// Canonical service data — consumed by /services, /services/[slug], and the navbar.

export interface ServiceFAQ      { q: string; a: string }
export interface ServiceMetric   { value: string; label: string }
export interface ServiceProcess  { step: number; title: string; body: string }
export interface ServiceTechItem { name: string; category: string }

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  deliverables: string[];
  process: ServiceProcess[];
  metrics: ServiceMetric[];
  tech: ServiceTechItem[];
  faqs: ServiceFAQ[];
  iconPath: string;
  accentFrom: string;
  accentTo:   string;
  accentText: string; // Tailwind class
  accentBg:   string;
  accentBorder: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "ai-development",
    title: "AI & Machine Learning",
    tagline: "Intelligence you can measure",
    description: "Custom ML models, LLM integrations, and intelligent automation pipelines.",
    longDescription: "We design, train, and deploy production-grade AI systems — from real-time fraud detection and clinical NLP to demand forecasting and document intelligence. Every engagement starts with a business outcome, never a model architecture. We own the full lifecycle: data, model, inference API, and the MLOps infrastructure that keeps it accurate as the world changes.",
    capabilities: [
      "Custom LLM fine-tuning & RAG pipelines",
      "Real-time inference APIs (< 50ms p99)",
      "Computer vision & document intelligence",
      "Anomaly detection & fraud prevention",
      "Time-series forecasting",
      "Recommendation & ranking systems",
      "MLOps: CI/CD for models, drift monitoring",
      "Responsible AI: bias audits, explainability",
    ],
    deliverables: ["Model performance report", "Inference API", "Monitoring dashboard", "Retraining pipeline", "Model card"],
    process: [
      { step: 1, title: "Problem framing",   body: "Define the ML task, success metrics, and data requirements before touching a model." },
      { step: 2, title: "Data audit",        body: "Assess quality, volume, and labelling needs. Surface blockers early." },
      { step: 3, title: "Baseline model",    body: "Build the simplest model that could work first, then iterate." },
      { step: 4, title: "Iterate & evaluate", body: "Run structured experiments with tracked metrics. No HiPPO-driven decisions." },
      { step: 5, title: "Production deploy", body: "Containerised inference, load testing, latency budgets, canary rollout." },
      { step: 6, title: "Monitor & retrain", body: "Drift detection, scheduled retraining, and alerting when accuracy degrades." },
    ],
    metrics: [
      { value: "< 50ms", label: "Inference p99 latency" },
      { value: "94%",    label: "Avg. model accuracy delivered" },
      { value: "3×",     label: "Avg. improvement over baselines" },
      { value: "100%",   label: "Models with monitoring in place" },
    ],
    tech: [
      { name: "PyTorch",          category: "ML Framework" },
      { name: "HuggingFace",      category: "LLMs" },
      { name: "LangChain",        category: "LLM Tooling" },
      { name: "MLflow",           category: "MLOps" },
      { name: "Ray Serve",        category: "Inference" },
      { name: "Kafka",            category: "Streaming" },
      { name: "PostgreSQL + pgvector", category: "Vector DB" },
      { name: "Docker / Kubernetes", category: "Infrastructure" },
    ],
    faqs: [
      { q: "Do I need a lot of data to start?", a: "Not always. We assess your data maturity first. For many tasks, transfer learning from pre-trained models dramatically lowers the data bar." },
      { q: "How do you handle model hallucinations in LLM systems?", a: "Through RAG grounding, output validation layers, confidence scoring, and human-in-the-loop checkpoints for high-stakes decisions." },
      { q: "Can you integrate with our existing data warehouse?", a: "Yes. We work with Snowflake, BigQuery, Redshift, Databricks, and most modern data platforms as training data sources." },
    ],
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    accentFrom: "#1E3A8A", accentTo: "#2563EB", accentText: "text-blue-300", accentBg: "bg-blue-600/20", accentBorder: "border-blue-500/30",
  },
  {
    slug: "web-mobile",
    title: "Web & Mobile Apps",
    tagline: "Products your users love to open",
    description: "Full-stack product engineering — React, Next.js, React Native, and beyond.",
    longDescription: "We build web and mobile products from zero to launch — and keep improving them after. Our engineering prioritises performance, accessibility, and code that future teams can maintain. We use React, Next.js App Router, and React Native as our primary stack, backed by a Node.js or Python API layer depending on the domain.",
    capabilities: [
      "Next.js App Router & React SPA development",
      "React Native cross-platform mobile apps",
      "Design systems & component libraries",
      "REST & GraphQL API engineering",
      "Core Web Vitals performance optimisation",
      "WCAG 2.1 AA accessibility compliance",
      "Auth, payments (Stripe), and third-party integrations",
      "Real-time features (WebSockets, SSE)",
    ],
    deliverables: ["Production application", "Design system", "Test suite (>80% coverage)", "Performance audit", "Deployment pipeline"],
    process: [
      { step: 1, title: "Product scoping",    body: "Feature prioritisation, user stories, and a release roadmap aligned to business goals." },
      { step: 2, title: "UX & prototyping",   body: "High-fidelity Figma prototypes user-tested before a single component is built." },
      { step: 3, title: "Architecture design", body: "Data models, API contracts, and tech decisions locked before sprint one." },
      { step: 4, title: "Iterative delivery",  body: "Two-week sprints with working software demo'd at the end of every cycle." },
      { step: 5, title: "QA & accessibility",  body: "Automated testing, cross-browser QA, and WCAG compliance review." },
      { step: 6, title: "Launch & support",    body: "Staged rollout, monitoring, and a 30-day post-launch support window." },
    ],
    metrics: [
      { value: ">90",  label: "Lighthouse score target" },
      { value: "<1.2s", label: "Target LCP on 4G" },
      { value: "80%+", label: "Test coverage floor" },
      { value: "AA",   label: "WCAG accessibility target" },
    ],
    tech: [
      { name: "Next.js 14",      category: "Frontend" },
      { name: "React Native",    category: "Mobile" },
      { name: "TypeScript",      category: "Language" },
      { name: "Tailwind CSS",    category: "Styling" },
      { name: "Framer Motion",   category: "Animation" },
      { name: "Node.js / FastAPI", category: "Backend" },
      { name: "PostgreSQL",      category: "Database" },
      { name: "Vercel / AWS",    category: "Hosting" },
    ],
    faqs: [
      { q: "Do you handle design or only engineering?", a: "Both. We have in-house designers who work in Figma and collaborate closely with engineers throughout the build." },
      { q: "Can you take over an existing codebase?", a: "Yes. We do a technical audit first, give you an honest assessment, and agree a plan before extending anything." },
      { q: "What's your typical project duration?", a: "MVP builds typically take 8–16 weeks. We scope carefully upfront to set realistic expectations." },
    ],
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    accentFrom: "#4C1D95", accentTo: "#7C3AED", accentText: "text-violet-300", accentBg: "bg-violet-600/20", accentBorder: "border-violet-500/30",
  },
  {
    slug: "cloud",
    title: "Cloud Solutions",
    tagline: "Scalable, cost-efficient infrastructure",
    description: "AWS, GCP, and Azure architecture, migration, and managed operations.",
    longDescription: "We design and operate cloud infrastructure for companies that can't afford downtime or runaway costs. Whether you're migrating from legacy on-prem systems, going multi-cloud, or optimising an existing AWS bill, we bring certified engineers across all three major providers and a FinOps-first mindset.",
    capabilities: [
      "Multi-cloud & hybrid architecture design",
      "Kubernetes / EKS / GKE / AKS orchestration",
      "Infrastructure-as-Code (Terraform, Pulumi, CDK)",
      "FinOps cost optimisation (avg 30% savings)",
      "Disaster recovery & high-availability design",
      "SOC 2 / ISO 27001 aligned cloud deployments",
      "CI/CD pipelines & DevOps transformation",
      "Database migrations (RDS, Aurora, Spanner)",
    ],
    deliverables: ["Architecture diagram", "IaC codebase", "Cost analysis report", "Runbook", "DR playbook"],
    process: [
      { step: 1, title: "Cloud audit",       body: "Map existing infrastructure, identify cost and security gaps, and define target state." },
      { step: 2, title: "Architecture design", body: "Multi-AZ topology, network segmentation, IAM design, and cost modelling." },
      { step: 3, title: "IaC foundation",    body: "Terraform/Pulumi modules for all resources — reproducible, version-controlled, reviewable." },
      { step: 4, title: "Migration",         body: "Lift-and-shift or re-architecture in phases, minimising downtime." },
      { step: 5, title: "Security hardening", body: "CIS benchmarks, secrets management, VPC isolation, and WAF configuration." },
      { step: 6, title: "Operations & FinOps", body: "Alerting, auto-scaling, reserved instance planning, and monthly cost reviews." },
    ],
    metrics: [
      { value: "30%",   label: "Avg. cloud cost reduction" },
      { value: "99.99%", label: "SLA achieved for clients" },
      { value: "Zero",  label: "Migration-related outages" },
      { value: "< 4h",  label: "RTO target on DR plans" },
    ],
    tech: [
      { name: "AWS",       category: "Cloud" },
      { name: "GCP",       category: "Cloud" },
      { name: "Azure",     category: "Cloud" },
      { name: "Terraform", category: "IaC" },
      { name: "Kubernetes", category: "Orchestration" },
      { name: "Prometheus + Grafana", category: "Observability" },
      { name: "ArgoCD",    category: "GitOps" },
      { name: "Vault",     category: "Secrets" },
    ],
    faqs: [
      { q: "Are you certified on AWS/GCP/Azure?", a: "Yes. We have certified architects across all three major cloud providers, including AWS Solutions Architect Professional." },
      { q: "How do you handle vendor lock-in?", a: "We design for portability where it matters — using managed Kubernetes, abstraction layers, and IaC that can target multiple providers." },
      { q: "Can you manage our infrastructure on an ongoing basis?", a: "Yes. We offer managed cloud operations retainers with defined SLAs, on-call coverage, and monthly reviews." },
    ],
    iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    accentFrom: "#0C4A6E", accentTo: "#0284C7", accentText: "text-sky-300", accentBg: "bg-sky-600/20", accentBorder: "border-sky-500/30",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Trust as a feature, not a checkbox",
    description: "Zero-trust architecture, penetration testing, and continuous threat monitoring.",
    longDescription: "We embed security from day one rather than bolting it on after the fact. Our team of certified offensive and defensive security engineers helps organisations reduce attack surface, meet compliance requirements, and build a security programme that scales with the business.",
    capabilities: [
      "Penetration testing (web, API, mobile, cloud)",
      "Zero-trust network architecture design",
      "SIEM setup & SOC-as-a-service",
      "Vulnerability management programmes",
      "SOC 2 Type II / ISO 27001 readiness",
      "GDPR & HIPAA compliance advisory",
      "Secure SDLC training & threat modelling",
      "Incident response planning & tabletop exercises",
    ],
    deliverables: ["Pen test report", "Remediation roadmap", "Threat model", "Compliance checklist", "Security runbook"],
    process: [
      { step: 1, title: "Threat modelling",   body: "Map assets, identify trust boundaries, and prioritise attack scenarios." },
      { step: 2, title: "Scoping",            body: "Define assessment boundaries, rules of engagement, and legal authorisation." },
      { step: 3, title: "Assessment",         body: "Active testing: reconnaissance, exploitation attempts, privilege escalation." },
      { step: 4, title: "Reporting",          body: "Clear findings with CVSS scores, business impact, and prioritised remediation steps." },
      { step: 5, title: "Remediation support", body: "Engineering assistance to fix identified issues, not just a report and a wave." },
      { step: 6, title: "Verification",       body: "Re-test after fixes to confirm vulnerabilities are fully closed." },
    ],
    metrics: [
      { value: "100%",  label: "Critical findings remediated" },
      { value: "< 48h", label: "Critical vuln triage SLA" },
      { value: "SOC 2", label: "Clients successfully certified" },
      { value: "0",     label: "Post-assessment breaches" },
    ],
    tech: [
      { name: "Burp Suite Pro", category: "Web Testing" },
      { name: "Metasploit",     category: "Exploitation" },
      { name: "Nessus",         category: "Vulnerability Scan" },
      { name: "CrowdStrike",    category: "EDR" },
      { name: "Splunk / ELK",  category: "SIEM" },
      { name: "HashiCorp Vault", category: "Secrets" },
      { name: "AWS Security Hub", category: "Cloud Security" },
      { name: "Wireshark",      category: "Network Analysis" },
    ],
    faqs: [
      { q: "How long does a penetration test take?", a: "A focused web app test typically takes 5–10 days. Broader infrastructure or red team engagements take 2–4 weeks." },
      { q: "Do you help with SOC 2 certification?", a: "Yes. We prepare you for the audit, help implement required controls, and can act as a technical liaison with your auditor." },
      { q: "What qualifications do your testers hold?", a: "Our team holds OSCP, CEH, CISSP, and AWS Security Specialty certifications." },
    ],
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accentFrom: "#7F1D1D", accentTo: "#DC2626", accentText: "text-red-300", accentBg: "bg-red-600/20", accentBorder: "border-red-500/30",
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    tagline: "Decisions powered by data, not gut feel",
    description: "End-to-end data platforms, dashboards, and real-time analytics infrastructure.",
    longDescription: "We build the full modern data stack — from ingestion through transformation to visualisation. Our engineers have shipped lakehouse migrations, real-time streaming systems, and BI platforms that business teams actually use. Data quality and governance are treated as first-class concerns, not afterthoughts.",
    capabilities: [
      "Data lakehouse design (Delta Lake, Iceberg)",
      "Real-time streaming pipelines (Kafka, Flink)",
      "dbt transformation layers & data modelling",
      "BI dashboards (Metabase, Looker, Power BI)",
      "Data quality & observability",
      "GDPR / data governance frameworks",
      "Data warehouse migrations (Snowflake, BigQuery)",
      "Customer data platforms & event tracking",
    ],
    deliverables: ["Data model documentation", "Pipeline DAGs", "BI dashboards", "Data quality report", "Governance policy"],
    process: [
      { step: 1, title: "Data discovery",    body: "Audit existing sources, document schemas, and map data flows across the organisation." },
      { step: 2, title: "Architecture design", body: "Choose the right stack for volume, latency, and team capability." },
      { step: 3, title: "Foundation layer",  body: "Ingest raw data into a structured landing zone with schema enforcement." },
      { step: 4, title: "Transform & model", body: "Build dbt models following dimensional modelling best practices." },
      { step: 5, title: "Visualise",         body: "Deploy dashboards with clear ownership and refresh SLAs." },
      { step: 6, title: "Monitor & govern",  body: "Data quality checks, lineage tracking, and access control policies." },
    ],
    metrics: [
      { value: "10TB+", label: "Daily data processed for clients" },
      { value: "< 5s",  label: "Dashboard refresh p95 target" },
      { value: "99.9%", label: "Pipeline uptime SLA" },
      { value: "100%",  label: "Models with quality checks" },
    ],
    tech: [
      { name: "Snowflake / BigQuery", category: "Warehouse" },
      { name: "Apache Kafka",   category: "Streaming" },
      { name: "Apache Flink",   category: "Stream Processing" },
      { name: "dbt",            category: "Transformation" },
      { name: "Apache Airflow", category: "Orchestration" },
      { name: "Delta Lake",     category: "Lakehouse" },
      { name: "Metabase / Looker", category: "BI" },
      { name: "Great Expectations", category: "Data Quality" },
    ],
    faqs: [
      { q: "We're a small team — do we need a full lakehouse?", a: "Probably not. We right-size the architecture to your data volume and team size. Many clients start with a simple warehouse + dbt setup." },
      { q: "Can you migrate us off our legacy Hadoop cluster?", a: "Yes, this is a common engagement. We've migrated several Hadoop clusters to modern cloud warehouses with zero data loss." },
      { q: "How do you handle PII in data pipelines?", a: "Through column-level encryption, dynamic data masking, role-based access, and documented data retention policies." },
    ],
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    accentFrom: "#134E4A", accentTo: "#0D9488", accentText: "text-teal-300", accentBg: "bg-teal-600/20", accentBorder: "border-teal-500/30",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    tagline: "Strategy that survives first contact",
    description: "Strategic technology advisory, digital transformation, and vendor evaluation.",
    longDescription: "We work with leadership teams to make the right technology decisions — not the loudest ones. Our advisory engagements are grounded in technical depth: we read the code, run the benchmarks, and present options with real trade-offs. No 200-slide decks that gather dust. Just a clear, actionable roadmap your team can execute.",
    capabilities: [
      "Technology audit & gap analysis",
      "Digital transformation roadmaps",
      "Vendor selection & RFP management",
      "CTO / fractional technology leadership",
      "Build vs. buy analysis",
      "M&A technology due diligence",
      "Engineering team assessment & hiring",
      "Technical debt quantification",
    ],
    deliverables: ["Current-state assessment", "Target architecture", "Phased roadmap", "ROI model", "Vendor comparison matrix"],
    process: [
      { step: 1, title: "Stakeholder interviews", body: "Understand business goals, constraints, and where technology is blocking or enabling them." },
      { step: 2, title: "Technical audit",        body: "Read the code, review architecture diagrams, and run performance benchmarks." },
      { step: 3, title: "Gap analysis",           body: "Document the delta between where you are and where you need to be." },
      { step: 4, title: "Options & trade-offs",   body: "Present 2–3 paths forward with cost, risk, and timeline for each." },
      { step: 5, title: "Roadmap",                body: "A phased plan with clear milestones, owners, and success criteria." },
      { step: 6, title: "Implementation support", body: "Optional hands-on execution of the roadmap with your team." },
    ],
    metrics: [
      { value: "40+",   label: "Technology audits completed" },
      { value: "2–4wk", label: "Typical assessment timeline" },
      { value: "3×",    label: "Avg. ROI on roadmap initiatives" },
      { value: "100%",  label: "Clients who extended engagement" },
    ],
    tech: [
      { name: "Architecture review frameworks", category: "Assessment" },
      { name: "TOGAF / C4 Model",              category: "Frameworks" },
      { name: "Gartner / Forrester research",  category: "Market Intel" },
      { name: "Financial modelling (Excel/Sheets)", category: "Analysis" },
      { name: "Miro / Lucidchart",             category: "Diagrams" },
      { name: "Linear / Jira",                 category: "Planning" },
    ],
    faqs: [
      { q: "Is this suitable for non-technical founders?", a: "Yes. We translate technical complexity into business terms and make sure every recommendation is understood before it's acted on." },
      { q: "How is this different from a Big 4 tech consultancy?", a: "We go deeper technically and stay closer to delivery. Our consultants can write code and review pull requests — we don't just recommend." },
      { q: "What do you deliver at the end?", a: "A current-state assessment, target architecture, prioritised roadmap, ROI model, and a working session to walk your team through every decision." },
    ],
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    accentFrom: "#78350F", accentTo: "#D97706", accentText: "text-amber-300", accentBg: "bg-amber-600/20", accentBorder: "border-amber-500/30",
  },
];

// Alias slugs so old footer/body links still resolve
export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "ai-ml":        "ai-development",
  "cloud-devops": "cloud",
  "data":         "data-analytics",
  "security":     "cybersecurity",
  "consulting":   "it-consulting",
};

export function getServiceBySlug(slug: string): ServiceData | undefined {
  const canonical = SERVICE_SLUG_ALIASES[slug] ?? slug;
  return SERVICES_DATA.find((s) => s.slug === canonical);
}
