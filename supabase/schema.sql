-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Linked to Auth)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    avatar_url TEXT,
    dna_archetype_id TEXT, -- Slugs for simplicity in this MVP
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Quiz Results (Publicly shareable via share_token)
CREATE TABLE public.quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users ON DELETE SET NULL,
    archetype_slug TEXT NOT NULL,
    scores JSONB NOT NULL, -- {ego: 80, clutch: 90...}
    share_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read quiz results by token
CREATE POLICY "Public read quiz results" ON public.quiz_results
    FOR SELECT USING (true);

-- Allow anyone to insert (anonymous test)
CREATE POLICY "Anonymous insert quiz results" ON public.quiz_results
    FOR INSERT WITH CHECK (true);

-- Profile policies
CREATE POLICY "Public read profiles" ON public.profiles
    FOR SELECT USING (true);
