import { notFound }      from "next/navigation";
import type { Metadata } from "next";
import { SOLUTIONS_DATA, getSolutionBySlug } from "@/data/solutionsData";
import { SolutionDetailPage } from "@/components/solutions/SolutionDetailPage";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SOLUTIONS_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) return { title: "Not Found" };
  return {
    title:       sol.title,
    description: sol.description,
    openGraph: {
      title:       `${sol.title} — Prime Mind Intelligence`,
      description: sol.description,
      url:         `https://primemindintelligence.com/solutions/${sol.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) notFound();
  return <SolutionDetailPage solution={sol} />;
}
