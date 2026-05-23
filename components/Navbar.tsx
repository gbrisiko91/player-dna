"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, LogIn, LogOut, Globe, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const { lang, setLang, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (provider: 'discord' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
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
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 font-esports text-[10px] tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3" />
              {lang.toUpperCase()}
            </button>
            <AnimatePresence>
              {showLangMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 right-0 bg-black border border-white/10 p-2 min-w-[120px] z-[110]"
                >
                  <button 
                    onClick={() => { setLang('en'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] font-esports hover:bg-white/5 ${lang === 'en' ? 'text-dna-neon' : 'text-gray-400'}`}
                  >
                    ENGLISH
                  </button>
                  <button 
                    onClick={() => { setLang('it'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] font-esports hover:bg-white/5 ${lang === 'it' ? 'text-dna-neon' : 'text-gray-400'}`}
                  >
                    ITALIANO
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="w-10 h-10 border border-dna-neon/50 p-1 rounded-full overflow-hidden hover:scale-110 transition-transform">
                 <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </Link>
              <button onClick={() => supabase.auth.signOut()} className="text-gray-400 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowLoginMenu(!showLoginMenu)}
                className="px-6 py-2 border border-white/20 font-esports text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <LogIn className="w-3 h-3" />
                {t.nav.login}
              </button>
              
              <AnimatePresence>
                {showLoginMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 bg-black border border-white/10 p-4 min-w-[200px] z-[110] flex flex-col gap-3"
                  >
                    <button 
                      onClick={() => handleLogin('discord')}
                      className="flex items-center gap-3 w-full px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-[10px] font-esports transition-colors rounded-sm"
                    >
                      <img src="https://assets-global.website-files.com/6257adef93867e3d8405e670/636e0a6a49cf127bf92de1e2_icon_clyde_white_RGB.png" className="w-5 h-5" alt="Discord" />
                      DISCORD
                    </button>
                    <button 
                      onClick={() => handleLogin('google')}
                      className="flex items-center gap-3 w-full px-4 py-2 bg-white hover:bg-gray-100 text-black text-[10px] font-esports transition-colors rounded-sm"
                    >
                      <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="G" />
                      GMAIL / GOOGLE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
