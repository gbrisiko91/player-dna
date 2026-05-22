"use client";
import { motion } from "framer-motion";
import { Zap, Brain, Share2, Users, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-cyber-mesh">
      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-overlay pointer-events-none" />
      
      {/* Decorative Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-dna-purple blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-dna-blue blur-[120px] rounded-full" 
      />

      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 border border-dna-purple/30 bg-dna-purple/5 text-dna-purple font-esports text-[10px] tracking-[0.4em] mb-8 uppercase rounded-full">
            Neural Identification Protocol Active
          </span>
          
          <h1 className="text-7xl md:text-[120px] font-esports italic font-black mb-8 tracking-tighter leading-none">
            PLAYER<span className="text-transparent bg-clip-text bg-gradient-to-r from-dna-neon via-dna-purple to-dna-blue text-glow-neon">DNA</span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
            Smetti di contare i tuoi pixel. <br />
            <span className="text-white font-medium italic">Inizia a mappare la tua coscienza competitiva.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/quiz">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-dna-purple rounded-none font-esports text-xl tracking-[0.2em] skew-x-[-12deg] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative inline-block skew-x-[12deg] text-white">AVVIA SEQUENZIAMENTO</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
