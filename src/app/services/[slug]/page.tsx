import { notFound }       from "next/navigation";
import type { Metadata }  from "next";
import { SERVICES_DATA, getServiceBySlug } from "@/data/servicesData";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return { title: "Service Not Found" };
  return {
    title:       svc.title,
    description: svc.description,
    openGraph: {
      title:       `${svc.title} — Prime Mind Intelligence`,
      description: svc.description,
      url:         `https://primemindintelligence.com/services/${svc.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) notFound();
  return <ServiceDetailPage service={svc} />;
}
