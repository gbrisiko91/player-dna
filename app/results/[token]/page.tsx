import { supabase } from "@/lib/supabase";
import { ARCHETYPES } from "@/lib/data";
import ResultClient from "./ResultClient";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { token: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('share_token', params.token)
    .single();

  if (!data) return { title: "PlayerDNA - DNA Not Found" };

  const archetype = ARCHETYPES.find(a => a.slug === data.archetype_slug);
  if (!archetype) return { title: "PlayerDNA - Analysis" };

  const nickname = data.nickname || "Subject";
  const title = `PlayerDNA: ${nickname} is a ${archetype.name}`;
  const description = `Analysis complete. Archetype: ${archetype.name}. Discover your true competitive identity on PlayerDNA.gg.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [archetype.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [archetype.image],
    }
  };
}

export default async function ResultPage({ params }: { params: { token: string } }) {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('share_token', params.token)
    .single();

  if (!data || error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-esports italic mb-4 uppercase text-white">DNA Not Found</h1>
        <p className="text-gray-500 mb-8 uppercase text-xs tracking-widest">This share link is expired or invalid.</p>
        <Link href="/">
          <button className="px-8 py-4 bg-white text-black font-esports text-xs tracking-widest uppercase transition-all hover:bg-dna-neon">
            BACK TO HOME
          </button>
        </Link>
      </div>
    );
  }

  return <ResultClient data={data} token={params.token} />;
}
