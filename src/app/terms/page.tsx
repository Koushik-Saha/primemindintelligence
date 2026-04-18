import type { Metadata } from "next";
import { LegalPage }     from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Terms of Service — Prime Mind Intelligence" };
const SECTIONS = [
  { title: "Acceptance of Terms", body: "By accessing or using primemindintelligence.com, you agree to be bound by these Terms. If you do not agree, please do not use our website or services." },
  { title: "Services", body: "Prime Mind Intelligence provides technology consulting, software development, AI/ML engineering, cloud, cybersecurity, and data analytics services under separate written agreements (Statements of Work). These Terms apply to your use of the website; engagement-specific terms are governed by your project agreement." },
  { title: "Intellectual Property", body: "The website content, design, and code are owned by Prime Mind Intelligence and protected by copyright. You may not reproduce, distribute, or create derivative works without written permission. IP created during client engagements is governed by the relevant Statement of Work." },
  { title: "User Conduct", body: "You agree not to use this website for unlawful purposes, to transmit harmful code, to attempt unauthorised access to our systems, or to scrape content without permission." },
  { title: "Disclaimers", body: "The website is provided 'as is'. We make no warranties regarding availability, accuracy, or fitness for a particular purpose. Case study results and metrics are specific to the individual engagements described and are not guarantees of similar results." },
  { title: "Limitation of Liability", body: "To the maximum extent permitted by law, Prime Mind Intelligence shall not be liable for indirect, incidental, or consequential damages arising from your use of this website." },
  { title: "Governing Law", body: "These Terms are governed by the laws of the State of California, USA. Any disputes shall be resolved in the courts of San Francisco County, California." },
  { title: "Changes to Terms", body: "We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms." },
];
export default function Page() { return <LegalPage title="Terms of Service" updated="1 January 2025" sections={SECTIONS} />; }
