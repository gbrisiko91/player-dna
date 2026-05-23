"use client";
import Hero from "@/components/Hero";
import ArchetypePreview from "@/components/ArchetypePreview";
import Leaderboard from "@/components/Leaderboard";
import GlobalStats from "@/components/GlobalStats";
import SocialProof from "@/components/SocialProof";
import { Dna } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col w-full bg-[#030303]">
      {/* SECTION 1: HERO (THE SCANNER) */}
      <Hero />

      {/* SECTION 2: WORLD_DATA (GLOBAL STATS & LEADERBOARD) - MOVED HERE */}
      <section id="stats" className="py-24 px-4 bg-black/50 border-y border-white/5 relative">
        <div className="absolute inset-0 grid-mesh opacity-5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-esports italic font-black mb-4 tracking-tighter uppercase">
              {t.worldData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">{t.worldData.titleSecondary}</span>
            </h2>
            <p className="text-gray-500 font-esports text-xs tracking-[0.5em] uppercase">{t.worldData.subtitle}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <GlobalStats />
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* SECTION 3: TESTIMONIALS (REALITY CHECK) */}
      <div className="w-full py-40 border-b border-white/5 bg-black relative">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dna-neon/50 to-transparent" />
         <SocialProof />
      </div>

      {/* SECTION 4: ARCHETYPES (THE DATABASE) */}
      <ArchetypePreview />

      {/* SECTION 5: FINAL CTA (THE CONVERSION) */}
      <section className="py-40 px-4 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-dna-neon to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-esports italic font-black mb-8 leading-tight">
            {t.cta.ready} <br/>
            <span className="text-dna-neon">{t.cta.potential}</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto italic">
            {t.cta.desc}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-dna-neon to-dna-purple rounded-none blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
              <Link href="/quiz">
                <button className="relative px-12 py-6 bg-black border border-white/10 font-esports text-xl tracking-[0.3em] uppercase group-hover:bg-dna-neon group-hover:text-black transition-all duration-300">
                  {t.hero.start}
                </button>
              </Link>
            </div>

            <a 
              href="https://discord.gg/CcTgHeDpMc" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-6 bg-transparent border border-white/20 font-esports text-xl tracking-[0.3em] uppercase hover:bg-white/5 transition-all duration-300 flex items-center gap-4"
            >
              <svg className="w-6 h-6 fill-white group-hover:fill-dna-neon transition-colors" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
              </svg>
              {t.hero.join}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Dna className="w-5 h-5 text-dna-neon" />
          <span className="font-esports text-xs tracking-widest">PLAYERDNA.GG</span>
        </div>
        <p className="text-[9px] text-gray-600 font-esports uppercase tracking-widest">
          © 2026 NEURAL_SYSTEMS_GLOBAL. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}

