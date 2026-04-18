import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar }  from "@/components/navbar/Navbar";
import { Footer }  from "@/components/footer/Footer";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor: "#0A0F2C",
  width:      "device-width",
  initialScale: 1,
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://primemindintelligence.com"),

  title: {
    default:  "Prime Mind Intelligence — AI & IT Solutions",
    template: "%s — Prime Mind Intelligence",
  },

  description:
    "Premium AI development, cloud architecture, data engineering, and digital transformation services for forward-thinking enterprises. Trusted by 40+ clients worldwide.",

  keywords: [
    "AI development",
    "machine learning consultancy",
    "cloud solutions",
    "data engineering",
    "Next.js development",
    "enterprise software",
    "digital transformation",
    "Prime Mind Intelligence",
  ],

  authors:  [{ name: "Prime Mind Intelligence" }],
  creator:  "Prime Mind Intelligence",
  publisher: "Prime Mind Intelligence",

  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://primemindintelligence.com",
    siteName:    "Prime Mind Intelligence",
    title:       "Prime Mind Intelligence — AI & IT Solutions",
    description: "AI development, cloud, and full-stack engineering for companies that move fast and build to last.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Prime Mind Intelligence",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@primemindai",
    creator:     "@primemindai",
    title:       "Prime Mind Intelligence — AI & IT Solutions",
    description: "AI development, cloud, and full-stack engineering.",
    images:      ["/og-image.png"],
  },

  robots: {
    index:            true,
    follow:           true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  icons: {
    icon:    [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple:   "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

// ─── JSON-LD structured data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  name:       "Prime Mind Intelligence",
  url:        "https://primemindintelligence.com",
  logo:       "https://primemindintelligence.com/logo.png",
  description:
    "AI development, cloud architecture, data engineering, web & mobile, cybersecurity, and IT consulting services.",
  address: {
    "@type":           "PostalAddress",
    addressLocality:   "San Francisco",
    addressRegion:     "CA",
    addressCountry:    "US",
  },
  contactPoint: {
    "@type":       "ContactPoint",
    email:         "hello@primemindintelligence.com",
    contactType:   "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/primemind",
    "https://twitter.com/primemindai",
    "https://github.com/primemind",
  ],
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0F2C] text-white">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
