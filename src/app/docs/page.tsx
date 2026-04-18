import type { Metadata } from "next";
import { ComingSoon }    from "@/components/misc/ComingSoon";
export const metadata: Metadata = { title: "Documentation — Prime Mind Intelligence" };
export default function Page() {
  return <ComingSoon title="Documentation" description="Technical guides, API references, and integration docs for Prime Mind Intelligence services. Launching Q3 2025." eta="Q3 2025" cta={{ label: "Contact Us in the Meantime", href: "/contact" }} />;
}
