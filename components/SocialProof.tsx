"use client";
import { motion } from "framer-motion";
import { MessageSquare, Twitter, Instagram, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialProof() {
  const { lang, t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1, 2, 3].map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col gap-6 p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Quote className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="w-12 h-1 bg-white/10" />
              <p className="text-sm text-gray-500 font-esports uppercase tracking-widest">
                {lang === 'it' ? 'IN ARRIVO' : 'COMING SOON'}
              </p>
              <p className="text-gray-600 leading-relaxed italic">
                {lang === 'it' 
                  ? "Siamo in attesa delle prime recensioni verificate dalla community." 
                  : "Awaiting the first verified reviews from our community."}
              </p>
            </div>

            <div className="flex flex-col mt-auto pt-6 border-t border-white/5">
              <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-2" />
              <div className="h-2 w-16 bg-white/5 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
