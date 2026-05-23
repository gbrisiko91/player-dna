"use client";
import { ARCHETYPES } from "@/lib/data";
import ResultCard from "@/components/ResultCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ResultClient({ data, token }: { data: any, token: string }) {
  const { t, lang } = useLanguage();
  
  const archetype = ARCHETYPES.find(a => a.slug === data.archetype_slug);
  if (!archetype) return null;

  const resultWithScores = { ...archetype, traits: data.scores || archetype.traits };

  return (
    <div className="min-h-screen bg-[#030303] py-20 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto flex flex-col items-center gap-12 w-full"
      >
        <div className="text-center">
          <h1 className="text-dna-neon font-esports text-sm tracking-[0.4em] mb-4 uppercase">
            {lang === 'it' ? 'RILEVAMENTO NEURALE COMPLETATO' : 'NEURAL DETECTION COMPLETED'}
          </h1>
          <p className="text-gray-400">
            {lang === 'it' 
              ? `Ecco l'identità di ${data.nickname || 'SOGGETTO'} analizzata tramite PlayerDNA.`
              : `This is the identity of ${data.nickname || 'SUBJECT'} analyzed via PlayerDNA.`}
          </p>
        </div>

        <ResultCard archetype={resultWithScores} nickname={data.nickname || 'SUBJECT'} />

        <div className="flex flex-col items-center gap-6">
          <p className="text-gray-500 font-esports text-xs uppercase tracking-widest text-center">
            {lang === 'it' ? 'Vuoi scoprire il tuo vero Player DNA?' : 'Want to discover your true Player DNA?'}
          </p>
          <Link href="/quiz">
            <button className="px-12 py-5 bg-white text-black font-esports tracking-widest hover:bg-dna-neon transition-colors uppercase">
              {lang === 'it' ? 'FAI IL TEST GRATIS' : 'START FREE SCAN'}
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}