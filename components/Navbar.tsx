"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Dna, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dna-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Dna className="w-8 h-8 text-dna-purple group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-esports italic font-black text-xl tracking-tighter">
            PLAYER<span className="text-dna-neon">DNA</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-[10px] font-esports text-gray-500 uppercase tracking-widest">Authorized Player</span>
                <span className="text-xs font-medium text-white">{user.user_metadata.full_name || user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-none font-esports text-[10px] tracking-[0.2em] uppercase hover:bg-dna-purple hover:border-dna-purple transition-all skew-x-[-12deg]"
            >
              <span className="inline-block skew-x-[12deg] flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Discord Login
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
