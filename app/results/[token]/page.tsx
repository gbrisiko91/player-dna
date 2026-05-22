"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ARCHETYPES } from "@/lib/data";
import ResultCard from "@/components/ResultCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dna } from "lucide-react";

export default function ResultPage({ params }: { params: { token: string } }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('share_token', params.token)
        .single();

      if (data && !error) {
        const archetype = ARCHETYPES.find(a => a.slug === data.archetype_slug);
        if (archetype) {
          setResult({ ...archetype, traits: data.scores });
        }
      }
      setLoading(false);
    };

    fetchResult();
  }, [params.token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dna-black flex items-center justify-center">
        <Dna className="w-12 h-12 text-dna-purple animate-pulse" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-dna-black flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-esports italic mb-4 uppercase">DNA Non Trovato</h1>
        <p className="text-gray-500 mb-8">Questo link di condivisione è scaduto o non è valido.</p>
        <Link href="/">
          <button className="px-8 py-4 bg-dna-purple font-esports text-xs tracking-widest uppercase skew-x-[-12deg]">
            <span className="inline-block skew-x-[12deg]">TORNA ALLA HOME</span>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dna-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto flex flex-col items-center gap-12"
      >
        <div className="text-center">
          <h1 className="text-dna-neon font-esports text-sm tracking-[0.4em] mb-4 uppercase">Rilevamento Neurale Completato</h1>
          <p className="text-gray-400">Ecco l'identità gamer analizzata tramite PlayerDNA.</p>
        </div>

        <ResultCard archetype={result} />

        <div className="flex flex-col items-center gap-6">
          <p className="text-gray-500 font-esports text-xs uppercase tracking-widest text-center">
            Vuoi scoprire il tuo vero Player DNA?
          </p>
          <Link href="/quiz">
            <button className="px-12 py-5 bg-white text-black font-esports tracking-widest skew-x-[-12deg] hover:bg-dna-neon transition-colors">
              <span className="inline-block skew-x-[12deg]">FAI IL TEST GRATIS</span>
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
