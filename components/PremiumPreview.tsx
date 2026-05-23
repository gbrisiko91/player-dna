"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Check, ShieldCheck, Zap, BrainCircuit, BarChart3 } from "lucide-react";

export default function PremiumPreview() {
  const { t } = useLanguage();

  const features = [
    { 
      icon: <BrainCircuit className="w-6 h-6 text-dna-neon" />, 
      title: t.premium.feature1, 
      desc: t.premium.desc1 
    },
    { 
      icon: <Zap className="w-6 h-6 text-dna-purple" />, 
      title: t.premium.feature2, 
      desc: t.premium.desc2 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-dna-toxic" />, 
      title: t.premium.feature3, 
      desc: t.premium.desc3 
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dna-neon/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Mockup del PDF */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative z-10 bg-[#0a0a0a] border border-white/10 p-4 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="bg-[#111] border border-white/5 p-8 h-[600px] relative overflow-hidden flex flex-col">
              {/* Fake HUD elements */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-dna-neon" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-dna-neon" />
              
              <div className="mb-8">
                <p className="text-[8px] font-esports text-dna-neon tracking-widest uppercase mb-1">Neural Dossier // Classified</p>
                <h3 className="text-2xl font-esports italic font-black uppercase">NEURAL IDENTITY REPORT</h3>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                <div className="h-40 w-full bg-white/5 border border-white/5 rounded-sm flex items-center justify-center">
                   <BarChart3 className="w-20 h-20 text-dna-neon/20" />
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-white/5 rounded-full" />
                    <div className="h-2 w-full bg-white/5 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                </div>
                
                <div className="mt-auto pt-8 border-t border-white/5">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[6px] font-esports text-gray-600 mb-1">CERTIFICATE ID</p>
                        <p className="text-[8px] font-esports text-white">DNA-CERT-XXXX-XXXX</p>
                      </div>
                      <div className="w-12 h-12 border-2 border-dna-neon/30 rounded-full flex items-center justify-center">
                         <div className="w-8 h-8 border border-dna-neon/50 rounded-full" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
            {/* Sfumatura Premium */}
            <div className="absolute inset-0 bg-gradient-to-tr from-dna-neon/10 via-transparent to-purple-500/10 pointer-events-none" />
          </div>
          
          {/* Decoro dietro */}
          <div className="absolute -inset-4 border border-dna-neon/20 -rotate-3 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-dna-neon/5 blur-[80px] rounded-full z-0" />
        </motion.div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-esports italic font-black mb-4 tracking-tighter uppercase leading-none">
              {t.premium.title} <span className="text-dna-neon">{t.premium.titleSecondary}</span>
            </h2>
            <p className="text-gray-400 font-esports text-sm tracking-widest uppercase">{t.premium.subtitle}</p>
          </div>

          <div className="space-y-8 mb-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <div className="mt-1 p-3 bg-white/5 border border-white/10 group-hover:border-dna-neon group-hover:bg-dna-neon/5 transition-all">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-lg font-esports italic font-bold mb-2 uppercase group-hover:text-dna-neon transition-colors">{f.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-light">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-5 bg-white text-black font-esports text-sm tracking-widest uppercase hover:bg-dna-neon transition-all"
          >
            {t.premium.cta}
          </motion.button>
        </div>
      </div>
    </section>
  );
}