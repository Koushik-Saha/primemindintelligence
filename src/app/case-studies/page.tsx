import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/case-studies/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies — Prime Mind Intelligence",
  description: "Real AI and technology projects with measurable outcomes. See how Prime Mind Intelligence solves hard problems for fintech, healthcare, and logistics companies.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
