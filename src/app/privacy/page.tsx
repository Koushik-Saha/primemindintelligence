import type { Metadata } from "next";
import { LegalPage }     from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy — Prime Mind Intelligence", description: "How Prime Mind Intelligence collects, uses, and protects your personal data." };

const SECTIONS = [
  { title: "Information We Collect", body: "We collect information you provide directly — such as your name, email address, and project details when you fill out our contact form. We also collect usage data automatically through analytics (page views, session duration, and referring pages)." },
  { title: "How We Use Your Information", body: "We use your information to respond to enquiries, deliver services, send requested communications (such as our newsletter with your consent), improve our website, and comply with legal obligations. We do not sell your personal data." },
  { title: "Legal Basis for Processing", body: "Where GDPR applies, we process your data on the basis of: (a) contract performance — when processing is necessary to provide services you've requested; (b) legitimate interests — for analytics and fraud prevention; and (c) consent — for marketing communications." },
  { title: "Data Sharing", body: "We share data only with trusted service providers who process it on our behalf (e.g. email delivery, analytics). We require all processors to maintain confidentiality and use data only for the specified purpose. We do not share data with advertising networks." },
  { title: "Data Retention", body: "Contact form submissions are retained for 3 years. Newsletter subscriptions until you unsubscribe. Analytics data is aggregated and retained for 24 months. You may request deletion at any time." },
  { title: "Your Rights", body: "You have the right to access, rectify, erase, or port your personal data. You may also restrict or object to processing. To exercise these rights, email privacy@primemindintelligence.com. We respond within 30 days." },
  { title: "Cookies", body: "We use essential cookies for site functionality and analytics cookies (with consent) to understand how visitors interact with our content. See our Cookie Policy for full details and opt-out instructions." },
  { title: "Security", body: "We use industry-standard encryption (TLS 1.3), access controls, and regular security audits to protect your data. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by law." },
  { title: "Contact Us", body: "For privacy-related enquiries, contact: privacy@primemindintelligence.com · Prime Mind Intelligence LLC · San Francisco, CA, USA" },
];

export default function Page() {
  return <LegalPage title="Privacy Policy" updated="1 January 2025" sections={SECTIONS} />;
}
