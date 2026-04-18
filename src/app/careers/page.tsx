import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/CareersPage";

export const metadata: Metadata = {
  title: "Careers — Prime Mind Intelligence",
  description: "Join the Prime Mind Intelligence team. We're hiring engineers, designers, and AI researchers who are excellent at their craft.",
};

export default function Page() { return <CareersPage />; }
