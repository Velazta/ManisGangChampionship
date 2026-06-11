import Hero from "@/components/Hero";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Navigation Header */}
      <Header />

      {/* Section 1: Hero */}
      <Hero />
      
      {/* Section 2 dst. (Bisa ditambahkan nanti) */}
    </main>
  );
}