"use client";
import { motion } from "framer-motion";
import { ARCHETYPES } from "@/lib/data";

export default function Leaderboard() {
  const leaderboardData = [
    { rank: "01", name: "Tilt Berserker", count: "128,432", color: "#ff4b2b" },
    { rank: "02", name: "The Human Shield", count: "98,210", color: "#4facfe" },
    { rank: "03", name: "The Main Character", count: "85,443", color: "#f9d423" },
    { rank: "04", name: "The Silent Killer", count: "42,120", color: "#ffffff" },
  ];

  return (
    <section className="py-40 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="text-dna-neon font-esports text-sm tracking-[0.4em] mb-4 uppercase">Population Density</h2>
            <h3 className="text-6xl md:text-8xl font-esports italic font-black text-glow-neon">RANKING</h3>
          </div>
          <p className="text-gray-500 font-esports text-[10px] tracking-widest uppercase max-w-xs text-right">
            Analisi aggregata della community basata sull'ultima ondata di sequenziamento.
          </p>
        </div>

        <div className="border-t border-white/5">
          {leaderboardData.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-between py-10 border-b border-white/5 group cursor-crosshair"
            >
              <div className="flex items-center gap-12">
                <span className="font-esports italic text-4xl text-white/5 group-hover:text-white transition-colors">
                  {item.rank}
                </span>
                <h4 className="text-3xl md:text-5xl font-esports font-black italic uppercase group-hover:translate-x-4 transition-transform duration-500">
                  {item.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-gray-600 font-esports uppercase mb-1">Detected Samples</span>
                <span className="font-esports text-2xl" style={{ color: item.color }}>{item.count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
