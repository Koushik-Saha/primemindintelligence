import type { Metadata } from "next";
import { ComingSoon }    from "@/components/misc/ComingSoon";
export const metadata: Metadata = { title: "ROI Calculator — Prime Mind Intelligence" };
export default function Page() {
  return <ComingSoon title="ROI Calculator" description="Estimate the return on investment for an AI or digital transformation project with your specific metrics. Interactive tool launching Q3 2025." eta="Q3 2025" cta={{ label: "Get a Custom ROI Model", href: "/contact" }} />;
}
