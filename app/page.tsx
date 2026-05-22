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
      <footer className="w-full py-60 flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 grid-mesh opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dna-purple opacity-10 blur-[150px] rounded-full" />
        
        <Dna className="w-20 h-20 text-dna-neon mb-12 animate-spin-slow" />
        
        <h2 className="text-cyber text-5xl md:text-[100px] text-center mb-16 leading-none">
          RECODE YOUR<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-dna-neon to-dna-purple">FUTURE_SELF</span>
        </h2>

        <Link href="/quiz">
          <button className="px-20 py-8 bg-dna-neon text-black font-esports text-xl tracking-[0.4em] uppercase hover:bg-white transition-all shadow-[0_0_50px_rgba(0,242,255,0.3)]">
            Initialize Scan
          </button>
        </Link>

        <div className="mt-40 text-center font-esports text-[8px] text-gray-700 tracking-[0.8em] uppercase border-t border-white/5 pt-8 w-full">
          PlayerDNA Protocol © 2026 // Neural Mapping Active
        </div>
      </footer>
    </div>
  );
}
