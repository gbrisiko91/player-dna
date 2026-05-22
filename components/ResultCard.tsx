"use client";
import { motion } from "framer-motion";
import { Archetype } from "@/lib/data";
import { Share2, Download, Trophy, Target, Zap, Shield, Brain, Fingerprint } from "lucide-react";
import { useRef } from "react";

interface ResultCardProps {
  archetype: Archetype;
}

export default function ResultCard({ archetype }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const traits = [
    { label: "EGO INDEX", value: archetype.traits.ego, color: "text-white" },
    { label: "CLUTCH FACTOR", value: archetype.traits.clutch, color: "text-dna-neon" },
    { label: "TOXICITY LEVEL", value: archetype.traits.toxic, color: "text-dna-danger" },
    { label: "TACTICAL BRAIN", value: archetype.traits.tactics, color: "text-dna-purple" },
    { label: "MENTAL SHIELD", value: archetype.traits.resilience, color: "text-dna-toxic" },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      className="relative w-full max-w-[400px] aspect-[9/16] bg-black border-[3px] border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
    >
      {/* Background FX */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-mesh opacity-20" />
        <div className="scanline" />
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 blur-[120px] opacity-40"
          style={{ backgroundColor: archetype.color }}
        />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md z-20">
        <span className="font-esports text-[10px] tracking-[0.4em] text-white">NEURAL_SCAN_SUCCESS</span>
        <div className="flex gap-1">
          <div className="w-1 h-3 bg-dna-neon" />
          <div className="w-1 h-3 bg-dna-neon/50" />
          <div className="w-1 h-3 bg-dna-neon/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 pt-24 h-full flex flex-col">
        <div className="mb-2">
          <span className="font-esports text-[10px] text-gray-500 tracking-widest uppercase">Identified Archetype:</span>
        </div>
        <h2 
          className="text-6xl font-esports italic font-black uppercase tracking-tighter leading-none mb-6"
          style={{ color: archetype.color, textShadow: `0 0 30px ${archetype.color}66` }}
        >
          {archetype.name}
        </h2>

        {/* Central Visual - Holographic */}
        <div className="relative flex-1 flex items-center justify-center my-8">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dna-neon/5 to-transparent animate-pulse" />
           <div className="relative w-48 h-48 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-dna-neon/20 rounded-full"
              />
              <Fingerprint className="w-24 h-24" style={{ color: archetype.color }} />
           </div>
        </div>

        {/* Stats */}
        <div className="space-y-6 mb-12">
          {traits.map((trait) => (
            <div key={trait.label}>
              <div className="flex justify-between items-end mb-2">
                <span className="font-esports text-[9px] text-gray-500 tracking-widest uppercase">{trait.label}</span>
                <span className={`font-esports text-sm font-bold ${trait.color}`}>{trait.value}%</span>
              </div>
              <div className="h-[2px] bg-white/5 w-full relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: archetype.color, boxShadow: `0 0 10px ${archetype.color}` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-end">
          <div>
            <span className="block font-esports text-[8px] text-gray-600 uppercase mb-1">Global Frequency</span>
            <span className="font-esports text-2xl text-white italic">{archetype.rarity}%</span>
          </div>
          <div className="text-right">
             <span className="block font-esports text-[10px] text-dna-neon font-black italic">PLAYERDNA.GG</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
