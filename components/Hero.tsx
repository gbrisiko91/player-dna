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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-dna-neon to-dna-purple rounded-none blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
            <Link href="/quiz">
              <button className="relative px-12 py-6 bg-black border border-white/10 font-esports text-xl tracking-[0.3em] uppercase group-hover:bg-dna-neon group-hover:text-black transition-all duration-300">
                Start Scan
              </button>
            </Link>
          </div>

          <a 
            href="https://discord.gg/CcTgHeDpMc" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-12 py-6 bg-transparent border border-white/20 font-esports text-xl tracking-[0.3em] uppercase hover:bg-white/5 transition-all duration-300 flex items-center gap-4"
          >
            <svg className="w-6 h-6 fill-white group-hover:fill-dna-neon transition-colors" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
            Join Server
          </a>
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
