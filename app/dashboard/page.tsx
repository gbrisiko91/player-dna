"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ARCHETYPES } from "@/lib/data";
import ResultCard from "@/components/ResultCard";
import { motion } from "framer-motion";
import { Trophy, History, Settings, Crown } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          const formattedHistory = data.map(item => ({
            ...item,
            archetype: ARCHETYPES.find(a => a.slug === item.archetype_slug)
          }));
          setHistory(formattedHistory);
        }
      }
    };
    loadDashboard();
  }, []);

  if (!user) return <div className="pt-32 text-center font-esports animate-pulse">AUTENTICAZIONE IN CORSO...</div>;

  return (
    <div className="min-h-screen bg-dna-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-dna-neon font-esports text-sm tracking-[0.5em] mb-4 uppercase">User Command Center</h1>
            <h2 className="text-5xl font-esports italic font-black uppercase tracking-tighter">
              BENTORNATO, <span className="text-glow">{user.user_metadata.full_name || 'PLAYER'}</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-dna-toxic/10 border border-dna-toxic/30 text-dna-toxic font-esports text-[10px] tracking-widest uppercase skew-x-[-12deg]">
              <span className="skew-x-[12deg] flex items-center gap-2"><Crown className="w-4 h-4" /> Upgrade to Pro</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Archetype */}
          <div className="lg:col-span-1">
            <h3 className="font-esports text-xs text-gray-500 mb-6 uppercase tracking-[0.2em]">DNA Attuale</h3>
            {history[0] ? (
              <ResultCard 
                archetype={history[0].archetype} 
                nickname={user.user_metadata.full_name || 'PLAYER'} 
              />
            ) : (
              <div className="p-12 border border-white/5 glass-morphism rounded-3xl text-center">
                <p className="text-gray-500 text-sm mb-6 uppercase font-esports">Nessun DNA rilevato</p>
                <a href="/quiz" className="text-dna-purple hover:text-dna-neon underline font-esports text-xs">Inizia Analisi</a>
              </div>
            )}
          </div>

          {/* History & Achievements */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="font-esports text-xs text-gray-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                <History className="w-4 h-4" /> Storico Analisi
              </h3>
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.archetype?.color }} />
                      <span className="font-esports uppercase tracking-wider">{item.archetype?.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 font-esports">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-esports text-xs text-gray-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Badge Guadagnati
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="aspect-square border border-white/5 bg-white/5 rounded-lg flex items-center justify-center filter grayscale hover:grayscale-0 transition-all cursor-help" title="Badge sbloccabile">
                    <span className="text-2xl">🔒</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
