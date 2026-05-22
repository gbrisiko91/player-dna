import Hero from "@/components/Hero";
import ArchetypePreview from "@/components/ArchetypePreview";
import Leaderboard from "@/components/Leaderboard";
import SocialProof from "@/components/SocialProof";
import { Dna } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: SOCIAL PROOF (Centrato e Pulito) */}
      <div className="w-full bg-neutral-950 py-20 border-y border-white/5">
        <SocialProof />
      </div>

      {/* SECTION 3: ARCHETYPES (Grid Display) */}
      <div className="w-full">
        <ArchetypePreview />
      </div>

      {/* SECTION 4: LEADERBOARD */}
      <div className="w-full bg-neutral-950 border-t border-white/5">
        <Leaderboard />
      </div>

      {/* FOOTER: VIRAL CLOSURE */}
      <footer className="w-full py-40 flex flex-col items-center justify-center bg-black relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-dna-purple/20 -bottom-20" />
        <Dna className="w-16 h-16 text-dna-purple mb-8 animate-pulse" />
        <h2 className="text-4xl md:text-6xl font-esports font-black italic mb-12 text-center px-4">
          PRONTO A RECODARE LA TUA <br/> <span className="text-dna-neon">IDENTITÀ?</span>
        </h2>
        <a href="/quiz" className="px-16 py-6 bg-white text-black font-esports text-lg tracking-[0.3em] uppercase hover:bg-dna-neon transition-all skew-x-[-12deg]">
           <span className="inline-block skew-x-[12deg]">INIZIA ORA</span>
        </a>
        <p className="mt-20 text-[10px] font-esports text-gray-700 tracking-[0.5em] uppercase">
          PlayerDNA Protocol © 2026 | All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
