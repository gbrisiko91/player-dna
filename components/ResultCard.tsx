"use client";
import { motion } from "framer-motion";
import { Archetype } from "@/lib/data";
import { Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

interface ResultCardProps {
  archetype: Archetype;
}

export default function ResultCard({ archetype }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000',
      });
      
      const link = document.createElement('a');
      link.download = `playerdna-${archetype.slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Errore durante il download:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const traits = [
    { label: "EGO INDEX", value: archetype.traits.ego, color: "text-white" },
    { label: "CLUTCH FACTOR", value: archetype.traits.clutch, color: "text-dna-neon" },
    { label: "TOXICITY LEVEL", value: archetype.traits.toxic, color: "text-dna-danger" },
    { label: "TACTICAL BRAIN", value: archetype.traits.tactics, color: "text-dna-purple" },
    { label: "MENTAL SHIELD", value: archetype.traits.resilience, color: "text-dna-toxic" },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[380px] aspect-[9/16] bg-black border-[1px] border-white/20 overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Background FX */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-mesh opacity-10" />
          <div className="scanline opacity-30" />
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 blur-[120px] opacity-30"
            style={{ backgroundColor: archetype.color }}
          />
        </div>

        {/* Top Header */}
        <div className="relative z-20 px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-sm">
          <span className="font-esports text-[9px] tracking-[0.4em] text-white/70">NEURAL_SCAN_SUCCESS</span>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-dna-neon" />
            <div className="w-1 h-3 bg-dna-neon/40" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 px-8 py-6 flex flex-col justify-between">
          
          {/* Title Section */}
          <div>
            <span className="font-esports text-[8px] text-gray-500 tracking-widest uppercase block mb-1">Subject Profile:</span>
            <h2 
              className="text-4xl md:text-5xl font-esports italic font-black uppercase tracking-tighter leading-none"
              style={{ color: archetype.color, textShadow: `0 0 20px ${archetype.color}44` }}
            >
              {archetype.name}
            </h2>
          </div>

          {/* Image Container - Fixed height to prevent overflow */}
          <div className="relative h-56 w-full my-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-dna-neon/5 rounded-2xl blur-xl" />
            <div className="relative w-full h-full rounded-xl border border-white/10 overflow-hidden bg-zinc-900/50">
                <img 
                  src={archetype.image} 
                  alt={archetype.name}
                  className="w-full h-full object-cover mix-blend-lighten" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-2 right-2 px-2 py-0.5 border border-white/20 rounded text-[7px] font-esports text-white/50">
                  REF_{archetype.id}
                </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-3">
            {traits.map((trait) => (
              <div key={trait.label} className="group">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-esports text-[8px] text-gray-500 tracking-widest group-hover:text-white transition-colors">{trait.label}</span>
                  <span className={`font-esports text-[10px] font-bold ${trait.color}`}>{trait.value}%</span>
                </div>
                <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: archetype.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Branding */}
          <div className="pt-6 border-t border-white/10 flex justify-between items-center mt-4">
            <div>
              <span className="block font-esports text-[7px] text-gray-600 uppercase">Frequency</span>
              <span className="font-esports text-xl text-white italic leading-none">{archetype.rarity}%</span>
            </div>
            <div className="text-right">
              <span className="block font-esports text-[9px] text-dna-neon font-black italic tracking-widest">PLAYERDNA.GG</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Action Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full max-w-[380px] py-4 bg-white hover:bg-dna-neon text-black font-esports text-xs tracking-[0.4em] uppercase transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isDownloading ? "Processing..." : "Download DNA Card"}
      </button>
    </div>
  );
}
