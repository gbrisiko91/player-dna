"use client";
import { motion } from "framer-motion";
import { MessageSquare, Twitter, Instagram, Quote } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    { user: "TenzFan99", platform: "Twitter", text: "Sono un Clutch Demon... i miei amici dicono che è vero. PlayerDNA mi ha letto dentro.", color: "text-blue-400" },
    { user: "GamerGirl_x", platform: "Discord", text: "Pensavo di essere Zen, invece sono una Fake Chill. Sto ridendo da 10 minuti.", color: "text-dna-toxic" },
    { user: "ProPlayer_01", platform: "Instagram", text: "L'analisi tattica è spaventosamente precisa. Indispensabile per chi vuole salire di rank.", color: "text-dna-purple" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col gap-6 p-8 border-l border-white/10 hover:border-dna-purple transition-all group"
          >
            <Quote className="w-8 h-8 text-white/10 group-hover:text-dna-purple transition-colors" />
            <p className="text-xl text-gray-400 leading-relaxed font-light italic">"{t.text}"</p>
            <div className="flex flex-col mt-auto">
              <span className="text-white font-esports text-xs uppercase tracking-widest">{t.user}</span>
              <span className={`${t.color} text-[10px] uppercase tracking-widest font-bold mt-1`}>Verified Player</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
