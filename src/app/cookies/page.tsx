import type { Metadata } from "next";
import { LegalPage }     from "@/components/legal/LegalPage";
export const metadata: Metadata = { title: "Cookie Policy — Prime Mind Intelligence" };
const SECTIONS = [
  { title: "What Are Cookies", body: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you interact with them." },
  { title: "Cookies We Use", body: "Essential cookies: required for the website to function (session management, security). Analytics cookies: we use privacy-respecting analytics to understand aggregate traffic patterns — no personally identifiable data is collected without consent. No advertising or tracking cookies are set." },
  { title: "Third-Party Cookies", body: "We may embed content from third-party services (e.g. YouTube videos, embedded maps). These services may set their own cookies governed by their respective privacy policies." },
  { title: "Managing Cookies", body: "You can control cookies through your browser settings. Disabling essential cookies may affect website functionality. To opt out of analytics cookies, use the cookie preference centre accessible from the footer." },
  { title: "Updates", body: "We may update this Cookie Policy as we introduce new features or comply with regulatory changes. Check back periodically for the latest version." },
];
export default function Page() { return <LegalPage title="Cookie Policy" updated="1 January 2025" sections={SECTIONS} />; }
