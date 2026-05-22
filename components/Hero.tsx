"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dna, ShieldAlert, Cpu, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden the-void">
      {/* Visual FX Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanline" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-dna-neon opacity-10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-dna-purple opacity-10 blur-[150px] animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top HUD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-dna-neon/50" />
          <span className="font-esports text-[10px] tracking-[0.5em] text-dna-neon uppercase">
            Protocol: Identity_Scan_v4
          </span>
          <div className="h-px w-12 bg-dna-neon/50" />
        </motion.div>

        {/* Main Title */}
        <h1 className="text-cyber text-6xl md:text-[140px] leading-[0.85] mb-8 tracking-tighter">
          <motion.span 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="block text-white"
          >
            DISCOVER YOUR
          </motion.span>
          <motion.span 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-dna-neon via-dna-purple to-dna-danger"
          >
            PLAYER DNA
          </motion.span>
        </h1>

        <p className="font-light text-xl md:text-3xl text-gray-400 mb-16 max-w-2xl italic">
          "Rank is a number. DNA is a <span className="text-white font-bold">sentence</span>."
        </p>

        {/* Call to Action */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-dna-neon to-dna-purple rounded-none blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
          <Link href="/quiz">
            <button className="relative px-20 py-8 bg-black border border-white/10 font-esports text-2xl tracking-[0.3em] uppercase group-hover:bg-dna-neon group-hover:text-black transition-all duration-300">
              Start Scan
            </button>
          </Link>
        </div>

        {/* HUD Footprints */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-white/5 pt-12">
          <HUDItem icon={<ShieldAlert className="w-5 h-5 text-dna-danger" />} label="Toxicity Monitor" value="ACTIVE" />
          <HUDItem icon={<Cpu className="w-5 h-5 text-dna-neon" />} label="Neural Mapping" value="READY" />
          <HUDItem icon={<Zap className="w-5 h-5 text-dna-purple" />} label="Clutch Index" value="CALIBRATING" />
        </div>
      </div>
    </section>
  );
}

function HUDItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center md:items-start p-4 bg-white/5 border-l border-white/10">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="font-esports text-[10px] text-gray-500 tracking-widest uppercase">{label}</span>
      </div>
      <span className="font-esports text-lg text-white">{value}</span>
    </div>
  );
}
