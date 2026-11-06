import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";
import { FaviconBoil } from "@/components/favicon-boil";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "mimo",
  description: "Vita non in magnis rebus, sed in parvis est.",
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="la" className={ebGaramond.variable}>
      <body>
        <div className="paper paper-sheet paper-fiber" aria-hidden="true" />
        <div className="paper paper-sheet paper-grain" aria-hidden="true" />
        <div className="paper paper-sheet paper-scuff" aria-hidden="true" />
        <div className="paper paper-dust" aria-hidden="true" />
        <div className="paper paper-film" aria-hidden="true" />
        <FaviconBoil />
        {children}
      </body>
    </html>
  );
}
