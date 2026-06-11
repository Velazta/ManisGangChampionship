import Hero from "@/components/Hero";
import Header from "@/components/ui/Header";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Navigation Header */}
      <Header />

      {/* Background Music Player */}
      <AudioPlayer />

      {/* Section 1: Hero */}
      <Hero />
      
      {/* Section 2 dst. (Bisa ditambahkan nanti) */}
    </main>
  );
}