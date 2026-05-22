"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS, ARCHETYPES } from "@/lib/data";
import { calculateDNA } from "@/lib/engine";
import { ChevronRight, Dna, Loader2, ShieldAlert } from "lucide-react";
import ResultCard from "./ResultCard";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

export default function QuizSystem() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Loading, 3: Result
  const [nickname, setNickname] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    ego: 50, clutch: 50, toxic: 50, tactics: 50, resilience: 50
  });
  const [result, setResult] = useState<any>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const startQuiz = () => setStep(1);

  const saveResult = async (dna: any, finalScores: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    const token = Math.random().toString(36).substring(2, 15);
    
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        { 
          user_id: user?.id || null,
          nickname: nickname,
          archetype_slug: dna.slug, 
          scores: finalScores, 
          share_token: token 
        }
      ])
      .select();

    if (!error) {
      setShareToken(token);
    }
  };

  const handleAnswer = (weights: any) => {
    const newScores = { ...scores };
    Object.keys(weights).forEach((trait) => {
      newScores[trait] = Math.min(100, Math.max(0, newScores[trait] + weights[trait]));
    });
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2);
      setTimeout(async () => {
        const dna = calculateDNA(newScores);
        setResult(dna);
        await saveResult(dna, newScores);
        setStep(3);
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-mesh opacity-10 pointer-events-none" />
      <div className="scanline" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
             <ShieldAlert className="w-20 h-20 text-dna-neon mx-auto mb-8 animate-pulse" />
            <h2 className="text-cyber text-5xl md:text-8xl mb-4 italic">IDENTITY_SCAN</h2>
            <p className="font-esports text-[10px] text-gray-500 tracking-[0.6em] mb-12 uppercase">Authorization Required: Access Granted</p>
            
            <div className="max-w-sm mx-auto mb-8">
              <input 
                type="text" 
                placeholder="ENTER_SUBJECT_NICKNAME..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-black/40 border border-white/20 p-4 font-esports text-sm text-dna-neon placeholder:text-gray-700 focus:border-dna-neon outline-none transition-all text-center"
              />
            </div>

            <button
              onClick={startQuiz}
              disabled={!nickname.trim()}
              className="px-16 py-6 bg-dna-neon text-black font-esports text-xl tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(0,242,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.hero.start}
            </button>
          </motion.div>
        )}


        {step === 1 && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-3xl z-10"
          >
            <div className="mb-16">
              <div className="flex justify-between items-end mb-4 font-esports text-[10px] tracking-[0.4em] text-gray-600 uppercase">
                <span>{t.quiz.sequence} {currentQuestion + 1} / {QUESTIONS.length}</span>
                <span className="text-dna-neon">{t.quiz.scanning}</span>
              </div>
              <div className="h-[3px] bg-white/5 w-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  className="h-full bg-dna-neon shadow-[0_0_15px_rgba(0,242,255,1)]"
                />
              </div>
            </div>

            <h3 className="text-4xl md:text-6xl font-esports italic font-black mb-16 uppercase leading-tight tracking-tighter">
              {lang === 'it' ? QUESTIONS[currentQuestion].text_it : QUESTIONS[currentQuestion].text}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ x: 10, backgroundColor: "rgba(0, 242, 255, 0.08)", borderColor: "rgba(0, 242, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.weights)}
                  className="w-full p-8 text-left border border-white/5 bg-white/5 flex justify-between items-center group transition-all duration-300"
                >
                  <span className="text-xl md:text-2xl font-light text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-dna-neon/40 mr-4 font-esports text-sm">0{idx + 1}</span>
                    {lang === 'it' ? option.text_it : option.text}
                  </span>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all text-dna-neon" />
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
            className="text-center z-10"
          >
            <div className="relative w-40 h-40 mx-auto mb-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border-[6px] border-dna-neon border-t-transparent rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Dna className="w-12 h-12 text-dna-neon animate-pulse" />
              </div>
            </div>
            <h2 className="text-cyber text-4xl italic text-dna-neon animate-pulse">{t.quiz.decoding}</h2>
            <div className="mt-12 space-y-3 font-esports text-[10px] text-gray-600 uppercase tracking-widest">
              <p>{t.quiz.agg}</p>
              <p>{t.quiz.norm}</p>
              <p className="text-dna-danger">{t.quiz.anomaly}</p>
              <p>{t.quiz.finalizing}</p>
            </div>
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-16 py-20 w-full"
          >
             <ResultCard archetype={result} nickname={nickname} />
             
             <div className="flex flex-col md:flex-row gap-6 w-full max-w-[400px]">
               <button 
                onClick={() => {
                  if (shareToken) {
                    const url = `${window.location.origin}/results/${shareToken}`;
                    navigator.clipboard.writeText(url);
                    alert(t.quiz.copied);
                  }
                }}
                className="flex-1 py-6 bg-dna-neon text-black font-esports text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.4)]"
               >
                 {t.quiz.share}
               </button>
               <button 
                 onClick={() => window.location.reload()}
                 className="flex-1 py-6 border border-white/10 hover:bg-white/5 font-esports text-sm tracking-widest uppercase"
               >
                 {t.quiz.retry}
               </button>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
