import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "PlayerDNA | Neural Identity Protocol",
  description: "Stop counting pixels. Start mapping your competitive consciousness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} font-body bg-black text-white antialiased overflow-x-hidden`}>
        {/* Global FX Layer */}
        <div className="fixed inset-0 pointer-events-none z-50 border-[10px] md:border-[20px] border-white/5" />
        <div className="fixed inset-0 bg-noise opacity-[0.02] pointer-events-none z-50" />
        
        <Navbar />
        <div className="relative w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
