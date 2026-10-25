import type { Metadata, Viewport } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#09111c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sanivex.com.co"),
  title: {
    default: "Sanivex | Control de Plagas, Fumigación y Sanidad Ambiental",
    template: "%s | Sanivex",
  },
  description:
    "Expertos en Manejo Integrado de Plagas (MIP), desratización, desinsectación, control de termitas y desinfección hospitalaria y corporativa en Colombia. Certificación INVIMA y BPM con respuesta en menos de 24 horas.",
  keywords: [
    "control de plagas",
    "control de plagas colombia",
    "fumigacion bucaramanga",
    "fumigacion santander",
    "sanidad ambiental",
    "manejo integrado de plagas",
    "MIP",
    "desratizacion",
    "control de roedores",
    "desinsectacion",
    "control de cucarachas",
    "control de termitas",
    "exclusion de palomas",
    "sanitizacion institucional",
    "desinfeccion quirurgica",
    "normatividad BPM INVIMA",
    "bioseguridad empresarial",
  ],
  authors: [{ name: "Sanivex Sanidad Ambiental", url: "https://sanivex.com.co" }],
  creator: "Sanivex",
  publisher: "Sanivex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sanivex | Control de Plagas, Fumigación y Sanidad Ambiental",
    description:
      "Tu operación segura, nuestra razón de ser. Soluciones avanzadas en bioseguridad, control de vectores y sanidad ambiental institucional y corporativa en Colombia.",
    url: "https://sanivex.com.co",
    siteName: "Sanivex",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/logos/Logo Sanivex-09.png",
        width: 1200,
        height: 630,
        alt: "Sanivex - Control de Plagas y Sanidad Ambiental en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanivex | Control de Plagas, Fumigación y Sanidad Ambiental",
    description:
      "Tu operación segura, nuestra razón de ser. Soluciones avanzadas en bioseguridad y control de vectores en Colombia.",
    images: ["/logos/Logo Sanivex-09.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Pest Control & Environmental Sanitation",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sanivex",
  },
  icons: {
    icon: [
      { url: "/logos/favicon-brand.png", sizes: "512x512", type: "image/png" },
      { url: "/logos/icon-white.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/logos/favicon-brand.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logos/favicon-brand.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "PestControlService",
      "@id": "https://sanivex.com.co/#organization",
      "name": "Sanivex - Control de Plagas y Sanidad Ambiental",
      "url": "https://sanivex.com.co",
      "logo": "https://sanivex.com.co/logos/brand-full-white.png",
      "image": "https://sanivex.com.co/logos/Logo%20Sanivex-09.png",
      "description":
        "Tu operación segura, nuestra razón de ser. Soluciones avanzadas en bioseguridad, control de vectores y sanidad ambiental institucional y corporativa en Colombia.",
      "telephone": "+573009123456",
      "email": "ventas@sanivex.com.co",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CO",
        "addressRegion": "Santander",
        "addressLocality": "Bucaramanga"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 7.1193,
        "longitude": -73.1227
      },
      "areaServed": [
        { "@type": "Country", "name": "Colombia" },
        { "@type": "AdministrativeArea", "name": "Santander" },
        { "@type": "City", "name": "Bucaramanga" },
        { "@type": "City", "name": "Floridablanca" },
        { "@type": "City", "name": "Girón" },
        { "@type": "City", "name": "Piedecuesta" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "08:00",
          "closes": "13:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/sanivex.co",
        "https://www.linkedin.com/company/sanivex/",
        "https://www.facebook.com/sanivex/",
        "https://wa.me/573009123456"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios Especializados de Sanidad Ambiental",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Manejo Integrado de Plagas (MIP)",
              "description":
                "Protocolo técnico preventivo en 3 fases continuas según normativas BPM e INVIMA."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Control Avanzado de Roedores",
              "description":
                "Control técnico progresivo y exclusión estructural de roedores protegiendo cableados y tableros eléctricos."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Control Integral de Insectos",
              "description":
                "Control progresivo de cucarachas, hormigas, chinches y moscas con geles biorracionales y trampas UV."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Manejo y Exclusión de Aves",
              "description":
                "Barreras mecánicas pasivas y mallas de alta resistencia sin crueldad animal."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Control Profesional de Termitas",
              "description":
                "Diagnóstico acústico, termografía, inyección y barrera química perimetral contra termitas."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sanitización y Desinfección de Alto Nivel",
              "description":
                "Nebulización en frío y desinfección grado quirúrgico contra virus, bacterias y hongos."
            }
          }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
