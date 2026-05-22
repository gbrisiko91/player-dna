"use client";
import { motion } from "framer-motion";
import { MessageSquare, Twitter, Instagram } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    { user: "TenzFan99", platform: "Twitter", text: "Sono un Clutch Demon... i miei amici dicono che è vero. PlayerDNA mi ha letto dentro.", icon: <Twitter className="w-4 h-4" /> },
    { user: "GamerGirl_x", platform: "Discord", text: "Pensavo di essere Zen, invece sono una Fake Chill. Sto ridendo da 10 minuti.", icon: <MessageSquare className="w-4 h-4" /> },
    { user: "ProPlayer_01", platform: "Instagram", text: "L'analisi tattica è spaventosamente precisa. Indispensabile per chi vuole salire di rank.", icon: <Instagram className="w-4 h-4" /> },
  ];

  return (
    <section className="py-24 px-6 bg-dna-dark/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 border border-white/5 glass-morphism rounded-2xl relative"
            >
              <div className="absolute top-4 right-4 text-gray-600">
                {t.icon}
              </div>
              <p className="text-lg text-gray-300 italic mb-6">"{t.text}"</p>
              <div className="flex flex-col">
                <span className="text-white font-esports text-xs uppercase tracking-widest">{t.user}</span>
                <span className="text-dna-blue text-[10px] uppercase tracking-tighter">Verified Player via {t.platform}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
