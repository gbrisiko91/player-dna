"use client";
import Link from "next/link";
import { Dna } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  
  return (
    <footer className="bg-black border-t border-white/5 py-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dna-neon/5 blur-[120px] rounded-full -mb-48 -mr-48" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-dna-neon flex items-center justify-center">
              <Dna className="w-5 h-5 text-black" />
            </div>
            <span className="font-esports italic font-black text-2xl tracking-tighter">
              PLAYER<span className="text-dna-neon">DNA</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
            {lang === 'it' 
              ? "Il laboratorio definitivo per la psico-metria dei videogiocatori. Scopri il tuo DNA competitivo e domina la lobby." 
              : "The ultimate laboratory for gamer psychometrics. Discover your competitive DNA and dominate the lobby."}
          </p>
        </div>

        <div>
          <h4 className="font-esports text-[10px] text-white tracking-[0.4em] mb-6 uppercase">NAVIGATION</h4>
          <ul className="space-y-4">
            <li><Link href="/quiz" className="text-gray-500 hover:text-dna-neon text-xs font-esports transition-colors uppercase">Quiz</Link></li>
            <li><Link href="/dashboard" className="text-gray-500 hover:text-dna-neon text-xs font-esports transition-colors uppercase">Dashboard</Link></li>
            <li><Link href="/#leaderboard" className="text-gray-500 hover:text-dna-neon text-xs font-esports transition-colors uppercase">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-esports text-[10px] text-white tracking-[0.4em] mb-6 uppercase">LEGAL</h4>
          <ul className="space-y-4">
            <li><Link href="/privacy" className="text-gray-500 hover:text-white text-xs font-esports transition-colors uppercase">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-gray-500 hover:text-white text-xs font-esports transition-colors uppercase">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-esports text-gray-700 uppercase tracking-widest">
          © 2026 PLAYERDNA.GG // NEURAL IDENTITY LAB
        </p>
        <div className="flex gap-6">
          <span className="text-[8px] font-esports text-gray-800 uppercase tracking-[0.5em]">DECRYPTING HUMAN PERFORMANCE</span>
        </div>
      </div>
    </footer>
  );
}
