"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Stats {
  archetype: string;
  total: number;
  percentage: number;
}

export default function GlobalStats() {
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('archetype_distribution')
        .select('*')
        .order('total', { ascending: false });

      if (!error && data) setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div className="text-cyan-500 font-esports text-xs animate-pulse">LOADING_GLOBAL_DATA...</div>;

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md border-l-4 border-l-cyan-500">
      <h3 className="text-xl font-esports italic mb-6 text-white tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
        GLOBAL DISTRIBUTION
      </h3>
      
      <div className="space-y-5">
        {stats.map((item, index) => (
          <div key={item.archetype}>
            <div className="flex justify-between text-[10px] font-esports mb-1.5 tracking-tighter">
              <span className="text-gray-300">{item.archetype?.toUpperCase() || "UNKNOWN"}</span>
              <span className="text-cyan-400">{Math.round(item.percentage)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-white/5">
        <p className="text-[9px] font-esports text-gray-500 uppercase text-center tracking-widest">
          Network size: {stats.reduce((acc, curr) => acc + curr.total, 0)} scanned_devs
        </p>
      </div>
    </div>
  );
}
