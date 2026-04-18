import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Prime Mind Intelligence",
  description: "Get in touch with Prime Mind Intelligence. Tell us about your project and we'll respond within 24 hours.",
};

export default function Page() {
  return (
    <div className="bg-[#070B1F] min-h-screen pt-28">
      <ContactSection />
    </div>
  );
}
