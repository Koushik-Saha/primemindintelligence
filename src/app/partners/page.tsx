import type { Metadata } from "next";
import { ComingSoon }    from "@/components/misc/ComingSoon";
export const metadata: Metadata = { title: "Partner Programme — Prime Mind Intelligence" };
export default function Page() {
  return <ComingSoon title="Partner Programme" description="Reseller, referral, and technology partnership opportunities with Prime Mind Intelligence. Our formal programme launches Q4 2025. In the meantime, reach out directly." eta="Q4 2025" cta={{ label: "Express Interest", href: "/contact" }} />;
}
