import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "PlayerDNA | Discover Your True Gamer Identity",
  description: "We don't analyze your rank. We analyze your mind in game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} font-body bg-dna-black text-white antialiased`}>
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40 z-0" />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
