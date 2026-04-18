import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page/AboutPage";

export const metadata: Metadata = {
  title: "About Us — Prime Mind Intelligence",
  description:
    "Learn about the people, mission, and values behind Prime Mind Intelligence — an AI-first technology company building the intelligent systems that power tomorrow's businesses.",
  openGraph: {
    title: "About Us — Prime Mind Intelligence",
    description:
      "The people, mission, and values behind Prime Mind Intelligence.",
    url: "https://primemindintelligence.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
