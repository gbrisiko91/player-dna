"use client";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const leaderboardData = [
    { rank: "01", name: "TILT BERSERKER", count: "128,432 SAMPLES", color: "text-dna-danger" },
    { rank: "02", name: "HUMAN SHIELD", count: "98,210 SAMPLES", color: "text-dna-blue" },
    { rank: "03", name: "MAIN CHARACTER", count: "85,443 SAMPLES", color: "text-yellow-500" },
    { rank: "04", name: "SILENT KILLER", count: "42,120 SAMPLES", color: "text-white" },
    { rank: "05", name: "CLUTCH DEMON", count: "15,200 SAMPLES", color: "text-dna-neon" },
  ];

  return (
    <section className="py-40 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-12">
          <div>
            <h2 className="text-dna-neon font-esports text-xs tracking-[0.5em] mb-4 uppercase">Global Frequency Ranking</h2>
            <h3 className="text-cyber text-6xl md:text-8xl italic">COMMUNITY_DNA</h3>
          </div>
          <div className="hidden md:block text-right font-esports text-[10px] text-gray-700 uppercase tracking-widest leading-loose">
            Last Updated: 22.05.2026<br />
            Total Scans: 1,245,890
          </div>
        </div>

        <div className="space-y-2">
          {leaderboardData.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-10 bg-white/5 border border-white/5 hover:border-dna-neon/30 hover:bg-white/10 transition-all cursor-crosshair group"
            >
              <div className="flex items-center gap-12">
                <span className="font-esports italic text-4xl text-white/5 group-hover:text-white transition-colors">{item.rank}</span>
                <h4 className="text-3xl md:text-5xl font-esports font-black italic uppercase group-hover:tracking-[0.1em] transition-all duration-500">{item.name}</h4>
              </div>
              <div className="text-right">
                <span className="block font-esports text-[8px] text-gray-600 uppercase mb-2 tracking-[0.2em]">Detection Density</span>
                <span className={`font-esports text-2xl ${item.color} group-hover:text-glow transition-all`}>{item.count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
