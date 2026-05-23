import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Se la URL non è valida (es. placeholder o vuota), usiamo un fallback 
// per evitare che createClient faccia crashare la build di Next.js
const isUrlValid = rawUrl.startsWith('http');

export const supabase = createClient(
  isUrlValid ? rawUrl : 'https://placeholder.supabase.co',
  isUrlValid ? rawKey : 'placeholder'
);
