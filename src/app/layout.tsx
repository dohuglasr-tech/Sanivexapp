import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Sanivex - Control de Plagas y Sanidad Ambiental",
  description: "Tu operación segura, nuestra razón de ser. Soluciones avanzadas en bioseguridad, control de vectores y sanidad ambiental en Colombia.",
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
