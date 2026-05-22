"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-mesh" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="glow-orb w-[800px] h-[800px] bg-dna-purple -top-40 -left-40" />
        <div className="glow-orb w-[600px] h-[600px] bg-dna-neon bottom-0 -right-20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <span className="font-esports text-[10px] tracking-[0.6em] text-dna-purple border border-dna-purple/30 px-6 py-2 rounded-full bg-dna-purple/5 uppercase">
            Human Intelligence Mapping Protocol
          </span>
        </motion.div>

        <h1 className="text-mega font-esports mb-4 flex flex-col">
          <span className="text-outline">RECODE YOUR</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-dna-purple to-dna-neon">
            IDENTITY
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 font-light text-lg md:text-2xl max-w-2xl mb-12 tracking-tight"
        >
          Il tuo rank è un numero. Il tuo DNA è una <span className="text-white font-medium italic">sentenza</span>. 
          Scopri chi sei realmente quando la pressione sale.
        </motion.p>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-dna-purple to-dna-neon rounded-none blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <Link href="/quiz">
            <button className="relative px-16 py-8 bg-black border border-white/10 font-esports text-xl tracking-[0.4em] uppercase transition-all hover:border-transparent hover:text-white">
              SBLOCCA DNA
            </button>
          </Link>
        </div>
      </div>

      {/* Side HUD Decor */}
      <div className="absolute left-10 bottom-10 hidden xl:block border-l border-white/10 pl-4 py-4">
        <div className="font-esports text-[8px] text-gray-600 mb-2">SYSTEM_STATUS</div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-dna-purple/20" />)}
        </div>
      </div>
    </section>
  );
}
