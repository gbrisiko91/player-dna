import Hero from "@/components/Hero";
import ArchetypePreview from "@/components/ArchetypePreview";
import Leaderboard from "@/components/Leaderboard";
import GlobalStats from "@/components/GlobalStats";
import SocialProof from "@/components/SocialProof";
import { Dna } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#030303]">
      {/* SECTION 1: HERO (THE SCANNER) */}
      <Hero />

      {/* SECTION 2: WORLD_DATA (GLOBAL STATS & LEADERBOARD) - MOVED HERE */}
      <section id="stats" className="py-24 px-4 bg-black/50 border-y border-white/5 relative">
        <div className="absolute inset-0 grid-mesh opacity-5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-esports italic font-black mb-4 tracking-tighter">
              WORLD_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">DATA</span>
            </h2>
            <p className="text-gray-500 font-esports text-xs tracking-[0.5em] uppercase">Real-time global network synchronization</p>
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
            READY TO UNLOCK YOUR <br/>
            <span className="text-dna-neon">TRUE POTENTIAL?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto italic">
            Join thousands of players already optimized. Get your role, share your DNA, and dominate the leaderboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://discord.gg/CcTgHeDpMc" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[#5865F2] text-white font-esports text-sm tracking-[0.3em] uppercase hover:bg-[#4752C4] transition-all flex items-center gap-3"
            >
              Step 1: Join Discord
            </a>
            <Link 
              href="/quiz"
              className="px-10 py-5 border border-white/20 text-white font-esports text-sm tracking-[0.3em] uppercase hover:bg-white/10 transition-all flex items-center gap-3"
            >
              Step 2: Start Scan
            </Link>
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

