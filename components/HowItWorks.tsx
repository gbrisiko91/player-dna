"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Brain, Zap, Skull, Map, Timer } from "lucide-react";

export default function HowItWorks() {
  const { t } = useLanguage();

  const traits = [
    { icon: <Brain />, name: t.howItWorks.ego, desc: t.howItWorks.egoDesc, color: "text-dna-neon" },
    { icon: <Timer />, name: t.howItWorks.clutch, desc: t.howItWorks.clutchDesc, color: "text-dna-purple" },
    { icon: <Skull />, name: t.howItWorks.toxic, desc: t.howItWorks.toxicDesc, color: "text-dna-danger" },
    { icon: <Map />, name: t.howItWorks.tactics, desc: t.howItWorks.tacticsDesc, color: "text-blue-500" },
    { icon: <Zap />, name: t.howItWorks.resil, desc: t.howItWorks.resilDesc, color: "text-dna-toxic" },
  ];

  return (
    <section className="py-24 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-esports italic font-black mb-4 tracking-tighter uppercase">
            {t.howItWorks.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-dna-neon to-dna-purple">{t.howItWorks.titleSecondary}</span>
          </h2>
          <p className="text-gray-500 font-esports text-xs tracking-[0.5em] uppercase">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
          {traits.map((trait, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#030303] p-10 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors"
            >
              <div className={`w-12 h-12 mb-8 ${trait.color} group-hover:scale-110 transition-transform`}>
                {trait.icon}
              </div>
              <h4 className="font-esports italic font-black text-xl mb-4 uppercase tracking-wider">{trait.name}</h4>
              <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-tighter font-light">
                {trait.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}