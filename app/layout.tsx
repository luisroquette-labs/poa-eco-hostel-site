import type { Metadata } from "next";
import "./globals.css";
import { BASE } from "./base";
import LovableConnectors from "../components/LovableConnectors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poaecohostel.lovable.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "POA Eco Hostel — Cidade Baixa, Porto Alegre", template: "%s · POA Eco Hostel" },
  description: "Hospedagem multicultural na Cidade Baixa, com quartos privados e compartilhados, áreas de convivência, jardim e piscina.",
  icons: {
    icon: [
      { url: `${BASE}/assets/logo-mark.svg?v=2`, type: "image/svg+xml" },
      { url: `${BASE}/favicon.ico?v=2`, sizes: "any" },
    ],
  },
  openGraph: {
    title: "POA Eco Hostel — Cidade Baixa, Porto Alegre",
    description: "Seu lugar para viver Porto Alegre, conhecer gente e ficar perto de tudo.",
    images: [`${BASE}/og-image.png`],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}<LovableConnectors /></body>
    </html>
  );
}
