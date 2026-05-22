"use client";
import { motion } from "framer-motion";
import { ARCHETYPES } from "@/lib/data";

export default function ArchetypePreview() {
  return (
    <section className="py-40 px-6 relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-32">
          <h2 className="text-6xl md:text-9xl font-esports italic font-black text-outline mb-0">CATALOGUE</h2>
          <h3 className="text-4xl md:text-7xl font-esports italic font-black text-dna-purple -mt-6 md:-mt-10 ml-8 md:ml-20">SPECIES_012</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCHETYPES.slice(0, 8).map((archetype, idx) => (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[450px] overflow-hidden border border-white/5 bg-neutral-950 p-6 flex flex-col justify-end transition-all hover:border-dna-purple/30"
            >
              {/* Background Reveal */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                style={{ backgroundColor: archetype.color }}
              />
              
              <div className="relative z-10">
                <span className="block font-esports text-[8px] text-gray-500 mb-2">RARITY: {archetype.rarity}%</span>
                <h4 className="text-3xl font-esports font-black italic uppercase leading-none mb-4 group-hover:text-white transition-colors" style={{ color: `${archetype.color}cc` }}>
                  {archetype.name}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors">
                  {archetype.description}
                </p>
              </div>

              {/* Number Decor */}
              <div className="absolute top-4 right-4 text-4xl font-esports font-black text-white/5 group-hover:text-white/10 transition-colors italic">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
