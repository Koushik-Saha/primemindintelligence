import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Prime Mind Intelligence",
  description:
    "End-to-end AI development, cloud architecture, data engineering, web & mobile, cybersecurity, and IT consulting services from Prime Mind Intelligence.",
  openGraph: {
    title: "Services — Prime Mind Intelligence",
    description:
      "End-to-end AI development, cloud architecture, data engineering, web & mobile, cybersecurity, and IT consulting services.",
    url: "https://primemindintelligence.com/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
