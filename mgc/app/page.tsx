import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Prizepool from "@/components/Prizepool";
import Header from "@/components/ui/Header";
import AudioPlayer from "@/components/AudioPlayer";
import GoldParticles from "@/components/GoldParticles";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Global Gold Particles Shimmer Effect */}
      <GoldParticles />

      {/* Navigation Header */}
      <Header />

      {/* Background Music Player */}
      <AudioPlayer />

      {/* Section 1: Hero */}
      <Hero />
      
      {/* Section 2: Story */}
      <Story />

      {/* Section 3: Prizepool */}
      <Prizepool />
    </main>
  );
}