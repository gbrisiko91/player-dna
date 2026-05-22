"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Dna, LogIn, LogOut } from "lucide-react";
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
      options: { redirectTo: window.location.origin }
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-dna-neon flex items-center justify-center">
            <Dna className="w-5 h-5 text-black" />
          </div>
          <span className="font-esports italic font-black text-2xl tracking-tighter">
            PLAYER<span className="text-dna-neon">DNA</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/quiz" className="hidden md:block font-esports text-[10px] tracking-[0.4em] uppercase text-gray-400 hover:text-dna-neon transition-colors">
            Init_Scan
          </Link>
          
          {user ? (
            <Link href="/dashboard" className="w-10 h-10 border border-dna-neon/50 p-1 rounded-full overflow-hidden hover:scale-110 transition-transform">
               <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </Link>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2 border border-white/20 font-esports text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all"
            >
              Auth_Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
