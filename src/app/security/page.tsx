import type { Metadata } from "next";
import { LegalPage }     from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Security — Prime Mind Intelligence" };
const SECTIONS = [
  { title: "Our Security Posture", body: "Security is a first-class concern at Prime Mind Intelligence — both in the systems we build for clients and in how we operate internally. We follow the principle of least privilege, encrypt data in transit and at rest, and conduct regular security reviews." },
  { title: "Infrastructure Security", body: "Our infrastructure runs on AWS with VPC isolation, security groups, and encrypted storage. All production secrets are managed via HashiCorp Vault or AWS Secrets Manager. We do not store credentials in code or configuration files." },
  { title: "Application Security", body: "We follow OWASP Top 10 guidelines in all software we develop. Code is peer-reviewed with security checklists, and we run static analysis tools as part of our CI pipeline. Dependencies are monitored for vulnerabilities using automated scanning." },
  { title: "Responsible Disclosure", body: "If you discover a security vulnerability in our systems, please report it responsibly to security@primemindintelligence.com. We will acknowledge receipt within 24 hours and provide a resolution timeline within 72 hours for critical issues." },
  { title: "Certifications & Compliance", body: "We assist clients in achieving SOC 2 Type II, ISO 27001, HIPAA, GDPR, and PCI-DSS compliance. Our internal practices are aligned with NIST CSF and CIS Controls." },
  { title: "Bug Bounty", body: "We operate a private bug bounty programme. Contact security@primemindintelligence.com to request scope details and participation terms." },
];
export default function Page() { return <LegalPage title="Security" updated="1 January 2025" sections={SECTIONS} />; }
