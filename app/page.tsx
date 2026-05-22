import Hero from "@/components/Hero";
import ArchetypePreview from "@/components/ArchetypePreview";
import Leaderboard from "@/components/Leaderboard";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SocialProof />
      <ArchetypePreview />
      <Leaderboard />
    </main>
  );
}
