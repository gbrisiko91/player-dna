"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ARCHETYPES } from "@/lib/data";
import ResultCard from "@/components/ResultCard";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, History, Settings, Crown, Download, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Dashboard() {
  const { t, lang } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadReport = async (share_token: string, nickname: string) => {
    setDownloadingId(share_token);
    try {
      const response = await fetch(`/api/report/download?share_token=${share_token}`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PlayerDNA_Premium_Report_${nickname}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download error. Use the link in your email.");
    } finally {
      setDownloadingId(null);
    }
  };

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
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (!mounted || loading) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-dna-neon animate-spin mb-4" />
      <div className="font-esports text-[10px] tracking-[0.5em] text-dna-neon animate-pulse uppercase">
        {t.dashboard?.loading || 'AUTHENTICATING...'}
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-esports italic mb-8 uppercase tracking-tighter">Access Denied</h2>
      <Link href="/">
         <button className="px-12 py-5 bg-white text-black font-esports text-xs tracking-widest uppercase hover:bg-dna-neon transition-all">
            Back to Base
         </button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-dna-purple/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dna-neon/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h1 className="text-dna-neon font-esports text-[10px] tracking-[0.6em] mb-4 uppercase">{t.dashboard?.subtitle || 'USER COMMAND CENTER'}</h1>
            <h2 className="text-5xl md:text-7xl font-esports italic font-black uppercase tracking-tighter leading-none">
              {t.dashboard?.welcome || 'WELCOME BACK,'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {user.user_metadata?.full_name || user.email?.split('@')[0] || 'PLAYER'}
              </span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="group relative px-8 py-4 bg-transparent border border-dna-toxic/30 text-dna-toxic font-esports text-[10px] tracking-widest uppercase hover:bg-dna-toxic hover:text-black transition-all duration-300 flex items-center gap-3">
              <Crown className="w-4 h-4" />
              {t.dashboard?.upgrade || 'UPGRADE'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Archetype Card */}
          <div className="lg:col-span-5">
            <h3 className="font-esports text-[10px] text-gray-500 mb-6 uppercase tracking-[0.4em]">{t.dashboard?.currentDna || 'CURRENT DNA'}</h3>
            {history[0] ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ResultCard 
                  archetype={history[0].archetype} 
                  nickname={history[0].nickname || 'PLAYER'} 
                  share_token={history[0].share_token}
                  is_premium={history[0].is_premium}
                />
              </motion.div>
            ) : (
              <div className="p-16 border border-white/5 bg-white/[0.02] text-center backdrop-blur-sm">
                <p className="text-gray-500 text-xs mb-8 uppercase font-esports tracking-widest">{t.dashboard?.noDna || 'NO DNA DETECTED'}</p>
                <Link href="/quiz">
                   <button className="px-10 py-4 bg-white text-black font-esports text-[10px] tracking-widest uppercase hover:bg-dna-neon transition-all">
                      {t.dashboard?.startAnalysis || 'START ANALYSIS'}
                   </button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: History & Badges */}
          <div className="lg:col-span-7 space-y-16">
            {/* History List */}
            <section>
              <h3 className="font-esports text-[10px] text-gray-500 mb-8 uppercase tracking-[0.4em] flex items-center gap-3">
                <History className="w-4 h-4 text-dna-neon" /> {t.dashboard?.history || 'ANALYSIS HISTORY'}
              </h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {history.map((item, idx) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-6 border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all flex flex-wrap justify-between items-center group gap-4"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-1 h-10" style={{ backgroundColor: item.archetype?.color }} />
                        <div>
                          <span className="block font-esports uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                            {item.archetype?.name || 'Unknown Archetype'}
                          </span>
                          <span className="text-[9px] text-gray-600 font-esports uppercase">
                            {mounted ? new Date(item.created_at).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US') : ''}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Link href={`/results/${item.share_token}`} className="p-3 border border-white/10 hover:border-dna-neon hover:text-dna-neon transition-all" title="View Result">
                           <ExternalLink className="w-4 h-4" />
                        </Link>
                        
                        {item.is_premium ? (
                          <button 
                            onClick={() => handleDownloadReport(item.share_token, item.nickname || 'PLAYER')}
                            disabled={downloadingId === item.share_token}
                            className="flex items-center gap-2 px-4 py-3 bg-dna-neon/10 border border-dna-neon/30 text-dna-neon text-[10px] font-esports tracking-widest uppercase hover:bg-dna-neon hover:text-black transition-all disabled:opacity-50"
                          >
                            {downloadingId === item.share_token ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            {t.dashboard?.downloadReport || 'DOWNLOAD'}
                          </button>
                        ) : (
                          <Link href={`/results/${item.share_token}`}>
                            <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-[10px] font-esports tracking-widest uppercase hover:bg-white/10 text-gray-400 transition-all">
                               <Crown className="w-4 h-4 text-dna-purple" />
                               UPGRADE
                            </button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {history.length === 0 && (
                  <p className="text-gray-700 font-esports text-[10px] uppercase tracking-widest text-center py-10 border border-dashed border-white/5">
                    No data entries in neural database
                  </p>
                )}
              </div>
            </section>

            {/* Badges Section */}
            <section>
              <h3 className="font-esports text-[10px] text-gray-500 mb-8 uppercase tracking-[0.4em] flex items-center gap-3">
                <Trophy className="w-4 h-4 text-dna-purple" /> {t.dashboard?.badges || 'EARNED BADGES'}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {[1,2,3,4,5].map(i => (
                  <div 
                    key={i} 
                    className="aspect-square border border-white/5 bg-white/[0.02] flex items-center justify-center filter grayscale opacity-30 hover:opacity-100 transition-all cursor-help relative group" 
                    title={t.dashboard?.lockedBadge || 'Locked Badge'}
                  >
                    <span className="text-xl">🔒</span>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-3 py-1 text-[8px] font-esports text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       ENCRYPTED DATA
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
