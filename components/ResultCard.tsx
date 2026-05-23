"use client";
import { motion } from "framer-motion";
import { Archetype } from "@/lib/data";
import { Download, Loader2, Send, BrainCircuit, Crown, ShieldCheck } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

interface ResultCardProps {
  archetype: Archetype;
  nickname: string;
  share_token?: string;
  is_premium?: boolean;
}

export default function ResultCard({ archetype, nickname, share_token, is_premium }: ResultCardProps) {

  const { lang, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  if (!archetype) return <div className="p-8 border border-white/10 text-gray-500 font-esports text-[10px] uppercase">Neural Data Corrupted</div>;

  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isReportDownloading, setIsReportDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  if (!mounted) return null;

  if (!archetype) return <div className="p-8 border border-white/10 text-gray-500 font-esports text-[10px] uppercase">Neural Data Corrupted</div>;

  const handleDownloadReport = async () => {
    if (!share_token) return;
    setIsReportDownloading(true);
    try {
      // In dashboard o success, potremmo non avere il session_id di Stripe,
      // ma abbiamo lo share_token. Dobbiamo creare un endpoint che accetti lo share_token 
      // e verifichi se è premium. Per ora usiamo il flusso esistente se abbiamo il sessionId,
      // altrimenti informiamo che il download è via email o dashboard.
      // Ottimizziamo: l'API report potrebbe accettare anche share_token se l'utente è autenticato.
      
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
      setIsReportDownloading(false);
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          archetype: archetype.name,
          archetype_id: archetype.id,
          lang: lang,
          nickname: nickname,
          share_token: share_token
        }),
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Checkout error. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleSyncDiscord = async () => {
    if (!user) {
      alert("Please login with Discord first!");
      return;
    }
    
    setIsSyncing(true);
    setSyncStatus('idle');

    try {
      const response = await fetch('/api/discord/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          archetype: archetype.name,
          discordId: user.user_metadata?.provider_id || user.id
        }),
      });

      if (response.ok) {
        setSyncStatus('success');
      } else {
        setSyncStatus('error');
      }
    } catch (err) {
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

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

  const safeTraits = archetype?.traits || { ego: 0, clutch: 0, toxic: 0, tactics: 0, resilience: 0 };

  const traits = [
    { label: "EGO", value: safeTraits.ego || 0, color: "text-white" },
    { label: "CLUTCH", value: safeTraits.clutch || 0, color: "text-dna-neon" },
    { label: "TOXICITY", value: safeTraits.toxic || 0, color: "text-dna-danger" },
    { label: "TACTICS", value: safeTraits.tactics || 0, color: "text-dna-purple" },
    { label: "RESILIENCE", value: safeTraits.resilience || 0, color: "text-dna-toxic" },
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
          <span className="font-esports text-[9px] tracking-[0.4em] text-white/70">{t.result.neuralSuccess}</span>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-dna-neon" />
            <div className="w-1 h-3 bg-dna-neon/40" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex-1 px-8 py-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          
          <div>
            <span className="font-esports text-[8px] text-gray-500 tracking-widest uppercase block mb-1">
              {t.result.subject} <span className="text-white">{nickname}</span>
            </span>
            <h2 
              className="text-3xl md:text-4xl font-esports italic font-black uppercase tracking-tighter leading-[0.9]"
              style={{ color: archetype.color, textShadow: `0 0 20px ${archetype.color}44` }}
            >
              {archetype.name}
            </h2>
          </div>

          {/* Motivation / Description Section */}
          <div className="my-4 p-4 bg-white/5 border border-white/10 rounded-lg">
             <div className="flex items-center gap-2 mb-2 text-dna-neon">
                <BrainCircuit className="w-3 h-3" />
                <span className="font-esports text-[8px] tracking-widest uppercase">{t.result.motivation}</span>
             </div>
              <p className="text-[12px] leading-relaxed text-gray-300 italic">
                {lang === 'it' ? archetype.motivation_it : archetype.motivation}
              </p>
          </div>

          {/* Image Container */}
          <div className="relative h-44 w-full my-2 flex items-center justify-center">
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
          <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-2">
            <div>
              <span className="block font-esports text-[7px] text-gray-600 uppercase">{t.result.frequency}</span>
              <span className="font-esports text-xl text-white italic leading-none">{archetype.rarity}%</span>
            </div>
            <div className="text-right">
              {/* Removed branding per user request */}
            </div>
          </div>

        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="w-full max-w-[380px] flex flex-col gap-3">
        {is_premium ? (
          <button
            onClick={handleDownloadReport}
            disabled={isReportDownloading}
            className="w-full py-5 bg-dna-neon text-black font-esports text-sm tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.4)]"
          >
            {isReportDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
            {isReportDownloading ? t.result.processing : (t.dashboard?.downloadReport || 'DOWNLOAD REPORT')}
          </button>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="w-full py-5 bg-gradient-to-r from-dna-purple to-dna-danger text-white font-esports text-sm tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            {isCheckoutLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Crown className="w-5 h-5" />
            )}
            {isCheckoutLoading ? t.result.processing : t.result.premium}
          </button>
        )}

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-4 bg-white hover:bg-dna-neon text-black font-esports text-xs tracking-[0.4em] uppercase transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isDownloading ? t.result.processing : t.result.download}
        </button>

        {user && (
          <button
            onClick={handleSyncDiscord}
            disabled={isSyncing || syncStatus === 'success'}
            className={`w-full py-4 border font-esports text-xs tracking-[0.4em] uppercase transition-all active:scale-95 flex items-center justify-center gap-3 ${
              syncStatus === 'success' 
                ? 'border-dna-toxic text-dna-toxic' 
                : 'border-white/20 hover:bg-white/10 text-white'
            }`}
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : syncStatus === 'success' ? (
              <div className="flex items-center gap-2">{t.result.synced}</div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.result.sync}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
