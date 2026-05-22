"use client";
import { motion } from "framer-motion";
import { Archetype } from "@/lib/data";
import { Share2, Download, Trophy, Target, Zap, Shield, Brain } from "lucide-react";

interface ResultCardProps {
  archetype: Archetype;
}

export default function ResultCard({ archetype }: ResultCardProps) {
  const traits = [
    { label: "EGO", value: archetype.traits.ego, icon: <Trophy className="w-3 h-3" /> },
    { label: "CLUTCH", value: archetype.traits.clutch, icon: <Target className="w-3 h-3" /> },
    { label: "TOXIC", value: archetype.traits.toxic, icon: <Zap className="w-3 h-3" /> },
    { label: "TACTICS", value: archetype.traits.tactics, icon: <Brain className="w-3 h-3" /> },
    { label: "RESILIENCE", value: archetype.traits.resilience, icon: <Shield className="w-3 h-3" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative w-full max-w-sm mx-auto bg-dna-dark border border-white/10 rounded-3xl p-8 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]"
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20"
        style={{ backgroundColor: archetype.color }}
      />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <span className="text-[10px] font-esports tracking-[0.4em] text-gray-500 uppercase block mb-2">
          Gamer Identity Verified
        </span>
        <h2 
          className="text-4xl font-esports italic font-black uppercase text-glow tracking-tighter"
          style={{ color: archetype.color }}
        >
          {archetype.name}
        </h2>
      </div>

      {/* Visual representation placeholder */}
      <div className="relative h-48 flex items-center justify-center mb-8 z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-white/5 animate-spin-slow" />
          <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-reverse-spin-slow" />
        </div>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-6xl relative z-20 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          {/* Mapping emoji or icons to archetypes in a real app */}
          🧬
        </motion.div>
      </div>

      {/* Traits Grid */}
      <div className="space-y-4 mb-10 relative z-10">
        {traits.map((trait) => (
          <div key={trait.label} className="group">
            <div className="flex justify-between items-center text-[10px] font-esports tracking-widest text-gray-400 mb-1.5 uppercase">
              <span className="flex items-center gap-2">
                {trait.icon}
                {trait.label}
              </span>
              <span style={{ color: archetype.color }}>{trait.value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trait.value}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: archetype.color, boxShadow: `0 0 10px ${archetype.color}` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="text-center mb-10 relative z-10 px-4">
        <p className="text-sm text-gray-300 italic font-light leading-relaxed">
          "{archetype.quote}"
        </p>
      </div>

      {/* Footer / Branding */}
      <div className="flex justify-between items-center border-t border-white/5 pt-6 relative z-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-esports text-gray-500 tracking-widest uppercase">Global Rarity</span>
          <span className="text-sm font-esports text-white italic">{archetype.rarity}%</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-esports text-dna-blue tracking-widest uppercase block mb-1">PLAYERDNA.GG</span>
          <div className="flex gap-2 justify-end">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
">
          <span className="text-[8px] font-esports text-gray-500 tracking-widest uppercase">Global Rarity</span>
          <span className="text-sm font-esports text-white italic">{archetype.rarity}%</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-esports text-dna-blue tracking-widest uppercase block mb-1">PLAYERDNA.GG</span>
          <div className="flex gap-2 justify-end">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
