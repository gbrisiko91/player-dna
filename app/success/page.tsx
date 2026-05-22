"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Loader2, Share2, ShieldCheck } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      // Qui potremmo verificare la sessione con Stripe via API
      setTimeout(() => setStatus("success"), 3000); // Simulazione caricamento neurale
    }
  }, [sessionId]);

  const handleDownload = async () => {
    if (!sessionId) return;
    try {
      const response = await fetch(`/api/report?session_id=${sessionId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const contentType = response.headers.get('content-type');
      if (contentType !== 'application/pdf') {
        throw new Error('Response is not a PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PlayerDNA_Premium_Report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Download error:", err);
      alert(`Errore nella generazione del report: ${err.message}. Contatta l'assistenza.`);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl bg-black/60 border border-white/10 p-12 backdrop-blur-xl">
      {status === "loading" ? (
        <div className="text-center py-20">
          <Loader2 className="w-16 h-16 text-dna-neon animate-spin mx-auto mb-8" />
          <h2 className="text-cyber text-4xl italic animate-pulse">GENERATING_NEURAL_REPORT...</h2>
          <p className="font-esports text-[10px] text-gray-500 tracking-[0.5em] mt-4 uppercase">Encrypting datasets / Mapping synapses</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-dna-toxic/20 border border-dna-toxic rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-dna-toxic" />
          </div>
          
          <h1 className="text-cyber text-5xl md:text-7xl mb-4 italic">TRANSACTION_SUCCESS</h1>
          <p className="text-gray-400 mb-12 font-light text-lg">
            Il tuo **Premium Neural Report** è pronto. Abbiamo analizzato ogni tua risposta per creare il dossier definitivo sulla tua identità competitiva.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <button 
              onClick={handleDownload}
              className="group relative py-6 bg-white text-black font-esports text-sm tracking-widest uppercase hover:bg-dna-neon transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" />
              Download PDF
              <div className="absolute -top-2 -right-2 bg-dna-danger text-white text-[8px] px-2 py-1">PREMIUM</div>
            </button>
            
            <button className="py-6 border border-white/10 hover:bg-white/5 font-esports text-sm tracking-widest uppercase flex items-center justify-center gap-3">
              <Share2 className="w-5 h-5" />
              Share Access
            </button>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[10px] font-esports text-gray-600 tracking-[0.3em] uppercase">Security Protocol: AES-256 Encrypted</p>
            <Link href="/" className="text-dna-neon font-esports text-[10px] tracking-widest hover:underline uppercase">
              Back to Command Center
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dna-purple/20 blur-[120px] rounded-full" />
      </div>

      <Suspense fallback={
        <div className="relative z-10 w-full max-w-2xl bg-black/60 border border-white/10 p-12 backdrop-blur-xl flex flex-col items-center py-20">
          <Loader2 className="w-16 h-16 text-dna-neon animate-spin mb-8" />
          <h2 className="text-cyber text-4xl italic animate-pulse uppercase">Initializing_Secure_Link...</h2>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
