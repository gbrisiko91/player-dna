"use client";
import { motion } from "framer-motion";
import { ARCHETYPES } from "@/lib/data";
import { Trophy, Users, Zap, Ghost, Target } from "lucide-react";

export default function Leaderboard() {
  // Mock data representing popular archetypes in the community
  const leaderboardData = [
    { rank: 1, name: "Tilt Berserker", count: "128,432", icon: <Zap className="text-dna-toxic" /> },
    { rank: 2, name: "The Human Shield", count: "98,210", icon: <Users className="text-dna-blue" /> },
    { rank: 3, name: "The Main Character", count: "85,443", icon: <Trophy className="text-yellow-500" /> },
    { rank: 4, name: "The Silent Killer", count: "42,120", icon: <Ghost className="text-white" /> },
    { rank: 5, name: "Clutch Demon", count: "15,200", icon: <Target className="text-dna-neon" /> },
  ];

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-dna-neon font-esports text-sm tracking-[0.3em] mb-4 uppercase">Global Ranking</h2>
          <h3 className="text-4xl md:text-5xl font-esports italic font-black">LEADERBOARD ARCHETIPI</h3>
          <p className="mt-4 text-gray-500 uppercase font-esports text-[10px] tracking-widest">Basato sugli ultimi 1.2M di scansioni neurali</p>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-dna-purple/30 transition-all skew-x-[-12deg] group"
            >
              <div className="flex items-center gap-6 skew-x-[12deg]">
                <span className="font-esports italic text-2xl text-gray-700">#{item.rank}</span>
                <div className="w-10 h-10 rounded bg-black flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-esports text-lg uppercase tracking-wider group-hover:text-glow transition-all">{item.name}</span>
              </div>
              <div className="text-right skew-x-[12deg]">
                <span className="block text-[10px] text-gray-500 font-esports uppercase tracking-widest">Soggetti</span>
                <span className="font-esports text-xl text-white">{item.count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
