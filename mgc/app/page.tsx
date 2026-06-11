export default function Home() {
  return (
    <main className="relative w-full">
      {/* Section 1: Hero */}
      <section className="h-screen flex flex-col items-center justify-center bg-zinc-900 border-b border-zinc-700">
        <h1 className="text-5xl font-bold tracking-widest text-white">
          MANIS GANG CHAMPIONSHIP
        </h1>
        <p className="text-xl text-zinc-400 mt-4">
          VIOLENCE DISTRICT
        </p>
        <p className="mt-10 animate-bounce text-zinc-500">
          Scroll ke bawah ↓
        </p>
      </section>

      {/* Section 2: Spacer Panjang */}
      <section className="h-[150vh] flex items-center justify-center bg-black">
        <h2 className="text-3xl text-zinc-600">
          Rasakan transisi scroll-nya di sini...
        </h2>
      </section>

      {/* Section 3: Footer Dummy */}
      <section className="h-screen flex items-center justify-center bg-zinc-900 border-t border-zinc-700">
        <h2 className="text-4xl font-bold text-white">
          See You in The Fog!
        </h2>
      </section>
    </main>
  );
}