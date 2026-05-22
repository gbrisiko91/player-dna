"use client";
import { motion } from "framer-motion";
import { ARCHETYPES } from "@/lib/data";

export default function ArchetypePreview() {
  return (
    <section className="py-24 px-4 bg-dna-dark/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-dna-neon font-esports text-sm tracking-[0.3em] mb-4 uppercase">Identità Rilevate</h2>
          <h3 className="text-4xl md:text-5xl font-esports italic font-black">ARCHETIPI DNA</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHETYPES.slice(0, 6).map((archetype) => (
            <motion.div
              key={archetype.id}
              whileHover={{ scale: 1.02, borderColor: archetype.color }}
              className="glass-morphism border border-white/5 p-8 rounded-xl transition-colors group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: archetype.color }}
              />
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-esports tracking-widest text-gray-500 uppercase">Class {archetype.rarity <= 5 ? "Elite" : "Standard"}</span>
                <span className="text-[10px] font-esports tracking-widest px-2 py-1 border border-white/10 rounded" style={{ color: archetype.color }}>RARITY {archetype.rarity}%</span>
              </div>
              <h4 className="text-2xl font-esports italic mb-2 group-hover:text-glow transition-all uppercase" style={{ color: archetype.color }}>{archetype.name}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{archetype.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-esports text-xs tracking-[0.2em] uppercase">E altri 6 profili classificati...</p>
        </div>
      </div>
    </section>
  );
}
