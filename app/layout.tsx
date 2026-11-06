import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Herr_Von_Muellerhoff } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const herrVonMuellerhoff = Herr_Von_Muellerhoff({
  variable: "--font-herr-von-muellerhoff",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Projeto Next.js",
  description: "Gerado com base nas referências",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${cinzel.variable} 
        ${herrVonMuellerhoff.variable} 
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}