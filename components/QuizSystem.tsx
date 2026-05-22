"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS, ARCHETYPES } from "@/lib/data";
import { calculateDNA } from "@/lib/engine";
import { ChevronRight, Dna, Loader2 } from "lucide-react";
import ResultCard from "./ResultCard";

export default function QuizSystem() {
  const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Loading, 3: Result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    ego: 50, clutch: 50, toxic: 50, tactics: 50, resilience: 50
  });
  const [result, setResult] = useState<any>(null);

  const startQuiz = () => setStep(1);

  const saveResult = async (dna: any, finalScores: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    const token = Math.random().toString(36).substring(2, 15);
    
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        { 
          user_id: user?.id || null,
          archetype_slug: dna.slug, 
          scores: finalScores, 
          share_token: token 
        }
      ])
      .select();

    if (!error) {
      setShareToken(token);
      // Se l'utente è loggato, aggiorniamo il suo profilo col nuovo archetipo
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          username: user.user_metadata.full_name,
          dna_archetype_id: dna.slug
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-dna-black flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center"
          >
            <Dna className="w-16 h-16 text-dna-purple mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-esports italic font-black mb-4 uppercase">Neural Sequence</h2>
            <p className="text-gray-500 font-esports text-xs tracking-[0.3em] mb-12 uppercase">Inizializzazione database psicologico</p>
            <button
              onClick={startQuiz}
              className="px-12 py-5 bg-dna-purple text-white font-esports tracking-widest skew-x-[-12deg] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
            >
              <span className="inline-block skew-x-[12deg]">AVVIA ANALISI</span>
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4 font-esports text-[10px] tracking-[0.3em] text-gray-500 uppercase">
                <span>Domanda {currentQuestion + 1} / {QUESTIONS.length}</span>
                <span>Mappatura Sinaptica...</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  className="h-full bg-dna-purple shadow-[0_0_10px_rgba(139,92,246,1)]"
                />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-esports italic mb-12 uppercase leading-tight text-glow">
              {QUESTIONS[currentQuestion].text}
            </h3>

            <div className="space-y-4">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                  onClick={() => handleAnswer(option.weights)}
                  className="w-full p-6 text-left border border-white/10 glass-morphism flex justify-between items-center group transition-colors hover:border-dna-purple/30"
                >
                  <span className="text-lg font-light group-hover:text-white text-gray-400 transition-colors">
                    {option.text}
                  </span>
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-dna-purple" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-4 border-dna-purple border-t-transparent rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-dna-neon animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-esports italic text-dna-neon animate-pulse uppercase tracking-[0.2em]">
              Elaborazione DNA...
            </h2>
            <div className="mt-8 space-y-2">
              <p className="text-[10px] font-esports text-gray-600 uppercase">Verifica integrità mentale: OK</p>
              <p className="text-[10px] font-esports text-gray-600 uppercase">Calcolo Toxicity Index: ELEVATO</p>
              <p className="text-[10px] font-esports text-gray-600 uppercase">Ricerca archetipo compatibile...</p>
            </div>
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-12 pt-12"
          >
             <ResultCard archetype={result} />
             
             <div className="flex flex-col md:flex-row gap-6 justify-center">
               <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (shareToken) {
                    const url = `${window.location.origin}/results/${shareToken}`;
                    navigator.clipboard.writeText(url);
                    alert("Link copiato negli appunti!");
                  }
                }}
                className="px-10 py-4 bg-dna-purple font-esports text-sm tracking-widest uppercase skew-x-[-12deg] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
               >
                 <span className="inline-block skew-x-[12deg]">CONDIVIDI DNA</span>
               </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 onClick={() => window.location.reload()}
                 className="px-10 py-4 border border-white/10 hover:bg-white/5 font-esports text-sm tracking-widest uppercase skew-x-[-12deg]"
               >
                 <span className="inline-block skew-x-[12deg]">RIFAI ANALISI</span>
               </motion.button>
             </div>

             <div className="mt-8 text-center max-w-sm">
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Analisi basata su 6 pattern neurali. <br />
                  Versione Premium disponibile per report di 30+ pagine.
                </p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
