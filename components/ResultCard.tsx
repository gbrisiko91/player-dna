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
        pixelRatio: 2
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
        <div className="relative z-10 p-6 pt-20 h-full flex flex-col">
          <div className="mb-1">
            <span className="font-esports text-[9px] text-gray-500 tracking-widest uppercase">Identified Archetype:</span>
          </div>
          <h2 
            className="text-5xl font-esports italic font-black uppercase tracking-tighter leading-tight mb-4"
            style={{ color: archetype.color, textShadow: `0 0 30px ${archetype.color}66` }}
          >
            {archetype.name}
          </h2>

          {/* Central Visual */}
          <div className="relative flex-1 flex items-center justify-center my-2 min-h-0">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dna-neon/5 to-transparent animate-pulse" />
             <div className="relative w-full aspect-square max-w-[220px] flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/5 border-dashed rounded-full"
                />
                <div className="absolute inset-2 overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                   <img 
                      src={archetype.image} 
                      alt={archetype.name}
                      className="w-full h-full object-cover filter brightness-110 contrast-125 mix-blend-screen" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
             </div>
          </div>

          {/* Stats Container */}
          <div className="space-y-4 mb-6">
            {traits.map((trait) => (
              <div key={trait.label}>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-esports text-[8px] text-gray-500 tracking-widest uppercase">{trait.label}</span>
                  <span className={`font-esports text-xs font-bold ${trait.color}`}>{trait.value}%</span>
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
          <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-end">
            <div>
              <span className="block font-esports text-[8px] text-gray-600 uppercase mb-1">Global Frequency</span>
              <span className="font-esports text-2xl text-white italic">{archetype.rarity}%</span>
            </div>
            <div className="text-right">
               <span className="block font-esports text-[10px] text-dna-neon font-black italic tracking-widest">PLAYERDNA.GG</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full max-w-[400px] py-5 bg-white text-black font-esports text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-dna-neon transition-all"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Image...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Social Card
          </>
        )}
      </motion.button>
    </div>
  );
}
