import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resguardo Inga Kamentsá de Mocoa — Cabildo Inga Kamentsá",
  description:
    "Pueblo Inga Kamentsá de Mocoa, Putumayo. Territorio, lengua, medicina ancestral y armonía con la selva. Cabildo Inga Kamentsá de Mocoa.",
  keywords: ["Inga", "Kamentsá", "Inga Kamentsá", "Mocoa", "Putumayo", "Cabildo Inga Kamentsá", "Resguardo", "Pueblo Inga"],
  openGraph: {
    title: "Resguardo Inga Kamentsá de Mocoa",
    description: "Nukanchipa Iuiaí — Memoria, territorio y armonía",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${jakarta.variable} antialiased bg-niebla-50 dark:bg-selva-950 text-foreground`}>
        {children}
      </body>
    </html>
  );
}
