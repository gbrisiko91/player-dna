"use client";
import { motion } from "framer-motion";
import { Zap, Brain, Share2, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dna-purple opacity-10 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dna-blue opacity-10 blur-[120px] rounded-full animate-float" style={{ animationDelay: "-3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <h2 className="text-dna-neon font-esports text-sm tracking-[0.5em] mb-4 uppercase">
          Neural Analysis System v1.0
        </h2>
        <h1 className="text-6xl md:text-8xl font-esports italic font-black mb-6 tracking-tighter">
          SCOPRI IL TUO VERO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-dna-purple via-dna-neon to-dna-blue text-glow">
            PLAYER DNA
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Non analizziamo il tuo rank. <br />
          <span className="text-white font-medium">Analizziamo la tua mente in game.</span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-dna-purple rounded-none font-esports text-lg tracking-widest skew-x-[-12deg] transition-all"
            >
              <span className="inline-block skew-x-[12deg]">FAI IL TEST GRATIS</span>
            </motion.button>
          </Link>
          <button className="px-10 py-5 border border-white/10 hover:bg-white/5 rounded-none font-esports text-lg tracking-widest skew-x-[-12deg] transition-all">
            <span className="inline-block skew-x-[12deg] text-gray-400">ESPLORA ARCHETIPI</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/5 pt-12"
      >
        <StatItem icon={<Zap className="w-5 h-5 text-dna-neon" />} label="ANALISI" value="1.2M+" />
        <StatItem icon={<Brain className="w-5 h-5 text-dna-purple" />} label="ARCHETIPI" value="12" />
        <StatItem icon={<Share2 className="w-5 h-5 text-dna-blue" />} label="CONDIVISI" value="850K" />
        <StatItem icon={<Users className="w-5 h-5 text-dna-toxic" />} label="COMMUNITY" value="450K" />
      </motion.div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-esports font-bold">{value}</div>
      <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">{label}</div>
    </div>
  );
}
