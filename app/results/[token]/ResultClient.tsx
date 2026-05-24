"use client";
import { ARCHETYPES } from "@/lib/data";
import ResultCard from "@/components/ResultCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Check, ShieldCheck, Zap, BrainCircuit, BarChart3, Crown, FileText, Target } from "lucide-react";

export default function ResultClient({ data, token }: { data: any, token: string }) {
  const { t, lang } = useLanguage();
  
  const archetype = ARCHETYPES.find(a => a.slug === data.archetype_slug);
  if (!archetype) return null;

  const resultWithScores = { ...archetype, traits: data.scores || archetype.traits };

  const benefits = [
    { 
      icon: <FileText className="w-5 h-5 text-dna-neon" />, 
      title: t.premiumUpsell.benefit1, 
      desc: t.premiumUpsell.benefit1Desc 
    },
    { 
      icon: <BarChart3 className="w-5 h-5 text-dna-purple" />, 
      title: t.premiumUpsell.benefit2, 
      desc: t.premiumUpsell.benefit2Desc 
    },
    { 
      icon: <Target className="w-5 h-5 text-dna-danger" />, 
      title: t.premiumUpsell.benefit3, 
      desc: t.premiumUpsell.benefit3Desc 
    },
    { 
      icon: <ShieldCheck className="w-5 h-5 text-dna-toxic" />, 
      title: t.premiumUpsell.benefit4, 
      desc: t.premiumUpsell.benefit4Desc 
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] py-20 px-4 flex flex-col items-center">
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

        <ResultCard archetype={resultWithScores} nickname={data.nickname || 'SUBJECT'} share_token={token} is_premium={data.is_premium} />

        {/* Premium Upsell Section */}
        {!data.is_premium && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl bg-white/[0.02] border border-white/10 p-8 md:p-12 relative overflow-hidden mt-8"
          >
            <div className="absolute top-0 right-0 p-4">
              <Crown className="w-12 h-12 text-dna-neon/20 rotate-12" />
            </div>
            
            <div className="relative z-10 text-center mb-12">
              <h2 className="text-dna-neon font-esports text-[10px] tracking-[0.5em] mb-4 uppercase">{t.premiumUpsell.title}</h2>
              <h3 className="text-cyber text-4xl uppercase italic">{t.premiumUpsell.subtitle}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{benefit.icon}</div>
                  <div>
                    <h4 className="font-esports text-[10px] text-white tracking-widest uppercase mb-1">{benefit.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="#checkout" onClick={(e) => {
              e.preventDefault();
              const checkoutBtn = document.querySelector('button[className*="from-dna-purple"]');
              if (checkoutBtn) checkoutBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}>
              <button className="w-full py-6 bg-white text-black font-esports text-sm tracking-[0.3em] uppercase hover:bg-dna-neon transition-all">
                {t.premiumUpsell.cta}
              </button>
            </Link>
          </motion.div>
        )}

        <div className="flex flex-col items-center gap-6 mt-12 pb-20">
          <p className="text-gray-500 font-esports text-xs uppercase tracking-widest text-center">
            {lang === 'it' ? 'Vuoi scoprire il tuo vero Player DNA?' : 'Want to discover your true Player DNA?'}
          </p>
          <Link href="/quiz">
            <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-esports tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              {lang === 'it' ? 'FAI IL TEST GRATIS' : 'START FREE SCAN'}
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}