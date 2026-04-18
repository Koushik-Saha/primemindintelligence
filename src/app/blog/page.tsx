import type { Metadata } from "next";
import { BlogPage } from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "Blog — Prime Mind Intelligence",
  description: "Practical insights on AI, cloud architecture, and software engineering from the Prime Mind Intelligence team.",
};

export default function Page() { return <BlogPage />; }
