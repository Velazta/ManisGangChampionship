import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Prizepool from "@/components/Prizepool";
import Recap from "@/components/Recap";
import Staff from "@/components/Staff";
import Sponsored from "@/components/Sponsored";
import Faq from "@/components/Faq";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import GoldParticles from "@/components/GoldParticles";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-white">
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

      {/* Section 4: Recap */}
      <Recap />

      {/* Section 5: Staff */}
      <Staff />

      {/* Section 6: Sponsored */}
      <Sponsored />

      {/* Section 7: FAQ */}
      <Faq />

      {/* Footer */}
      <Footer />
    </main>
  );
}