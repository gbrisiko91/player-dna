"use client";
import { motion } from "framer-motion";
import { ARCHETYPES } from "@/lib/data";

export default function ArchetypePreview() {
  return (
    <section className="py-40 px-6 relative bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid-mesh opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-32 border-l-4 border-dna-neon pl-8">
          <h2 className="text-dna-neon font-esports text-sm tracking-[0.5em] mb-4 uppercase">Database: Classified_Profiles</h2>
          <h3 className="text-cyber text-5xl md:text-8xl leading-none">ARCHETYPE_SPECIMENS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARCHETYPES.map((archetype, idx) => (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="group relative h-[500px] border border-white/5 bg-black flex flex-col justify-end transition-all hover:border-dna-neon/50 overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <img 
                  src={archetype.image} 
                  alt={archetype.name}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Background Glow */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: archetype.color }}
              />
              
              <div className="relative z-10 p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-esports text-[9px] text-gray-400 tracking-widest uppercase">Freq: {archetype.rarity}%</span>
                  <div className="w-1 h-4 bg-white/10 group-hover:bg-dna-neon transition-colors" />
                </div>
                
                <h4 className="text-4xl font-esports italic font-black uppercase mb-4 group-hover:text-glow transition-all" style={{ color: archetype.color }}>
                  {archetype.name}
                </h4>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                  {archetype.description}
                </p>
              </div>

              {/* Decorative HUD */}
              <div className="absolute top-8 right-8 text-xs font-esports text-white/5 group-hover:text-white/20">
                ID_{archetype.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
