import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "PlayerDNA | Neural Identity Protocol",
  description: "Stop counting pixels. Start mapping your competitive consciousness.",
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://player-dna.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} font-body bg-[#030303] text-white antialiased overflow-x-hidden`}>
        <LanguageProvider>
          {/* Global FX Layer */}
          <div className="fixed inset-0 pointer-events-none z-[999] bg-noise opacity-[0.03]" />
          
          <Navbar />
          <div className="relative w-full min-h-screen">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
