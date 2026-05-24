"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, EyeOff, Terminal } from "lucide-react";
import Link from "next/link";

export default function PremiumTeaser() {
  const { t } = useLanguage();

  if (!t.premiumTeaser) return null;

  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden border-y border-white/5">
      {/* Visual FX */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 border border-dna-danger/30 text-dna-danger font-esports text-[10px] tracking-[0.4em] mb-8 animate-pulse"
        >
          <Lock className="w-3 h-3" />
          {t.premiumTeaser.title}
        </motion.div>

        <h2 className="text-4xl md:text-7xl font-esports italic text-white mb-6 tracking-tighter">
          {t.premiumTeaser.subtitle}
        </h2>

        <p className="text-dna-neon font-esports text-xs tracking-widest mb-12 uppercase italic">
          {t.premiumTeaser.hook}
        </p>

        <div className="bg-black/40 border border-white/5 p-8 md:p-12 mb-12 backdrop-blur-md relative group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-dna-neon/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-dna-neon/50" />
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light mb-8 italic">
            "{t.premiumTeaser.description}"
          </p>

          <div className="flex items-center justify-center gap-4 text-[10px] font-esports text-dna-danger/50 tracking-[0.2em] uppercase">
            <EyeOff className="w-4 h-4" />
            <span className="hidden md:inline">{t.premiumTeaser.redacted}</span>
            <span className="md:hidden">CLASSIFIED DATA</span>
          </div>
        </div>

        <Link href="/quiz">
          <button className="group relative px-12 py-5 bg-white text-black font-esports text-sm tracking-[0.3em] uppercase hover:bg-dna-neon hover:text-black transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-dna-neon translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              <Terminal className="w-4 h-4" />
              {t.premiumTeaser.cta}
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
