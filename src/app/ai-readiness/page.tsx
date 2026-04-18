import type { Metadata } from "next";
import { ComingSoon }    from "@/components/misc/ComingSoon";
export const metadata: Metadata = { title: "AI Readiness Assessment — Prime Mind Intelligence" };
export default function Page() {
  return <ComingSoon title="AI Readiness Assessment" description="A free 10-minute self-assessment to understand where your organisation stands on the AI maturity curve — and what to do next. Launching soon." eta="Coming Soon" cta={{ label: "Book a Manual Assessment", href: "/contact" }} />;
}
