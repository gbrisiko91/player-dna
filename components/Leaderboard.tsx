"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface LeaderboardEntry {
  username: string;
  aura: number;
  archetype: string;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from('global_leaderboard')
        .select('*');
      if (!error && data) setLeaders(data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md border-l-4 border-l-purple-500">
      <h3 className="text-xl font-esports italic mb-6 text-white tracking-wider">
        TOP AURA RANKING
      </h3>
      <div className="space-y-4">
        {leaders.length > 0 ? (
          leaders.map((user, index) => (
            <div key={index} className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-3">
                <span className="font-esports text-gray-500 text-xs">#{index + 1}</span>
                <span className="font-bold text-gray-200">{user.username || "Anonymous"}</span>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-esports text-xs">+{user.aura} AURA</div>
                <div className="text-[9px] text-gray-500 uppercase">{user.archetype}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 font-esports text-xs italic">WAITING FOR DATA...</div>
        )}
      </div>
    </div>
  );
}
