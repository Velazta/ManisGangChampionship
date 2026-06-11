"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Prizepool() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const hasTyped = useRef(false);

  useEffect(() => {
    // Daftarkan ScrollTrigger di sisi klien
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Membuat GSAP Timeline untuk menjamin urutan animasi yang presisi
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });

      // 1. Animasi Title (TOTAL PRIZEPOOL) - Mulai di detik 0
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // 2. Animasi Card Banner (Slide-in dari Kiri ke Kanan) - Mulai tepat selang 1.5 detik dari awal timeline
      tl.fromTo(
        cardRef.current,
        { x: "-100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            // 3. Efek Typewriter dijalankan tepat setelah slide-in selesai
            if (!hasTyped.current) {
              hasTyped.current = true;
              
              const fullText = "RP 4.000.000";
              let currentText = "";
              let index = 0;
              
              const interval = setInterval(() => {
                if (index < fullText.length) {
                  currentText += fullText[index];
                  setTypedText(currentText);
                  index++;
                } else {
                  clearInterval(interval);
                }
              }, 80); // Kecepatan mengetik
            }
          }
        },
        1.5 // Posisi absolut pada timeline: tepat di detik 1.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizepool"
      className="relative w-full min-h-[450px] sm:min-h-[500px] lg:min-h-[557px] flex flex-col items-center justify-center overflow-hidden py-14 sm:py-20 lg:py-24 bg-black"
    >
      {/* Background Image Layer */}
      <Image
        src="/images/PRIZEPOOL BACKGROUND.png"
        alt="Prizepool Section Background"
        fill
        className="object-cover object-center select-none pointer-events-none z-0"
        priority
      />

      {/* Title Wrapper (dengan padding agar judul terpusat dengan aman) */}
      <div className="relative z-10 w-full max-w-[1240px] px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center">
        {/* Title: TOTAL PRIZEPOOL (Cinzel Decorative, Orange-Gold Text + Glow) */}
        <h2
          ref={titleRef}
          className="font-cinzel text-[#D27000] text-3xl sm:text-5xl md:text-7xl lg:text-[89.8px] leading-none tracking-wider uppercase select-none text-center"
          style={{
            textShadow: "0 0 15px rgba(210, 112, 0, 0.5), 0 0 30px rgba(210, 112, 0, 0.25)"
          }}
        >
          TOTAL PRIZEPOOL
        </h2>
      </div>

      {/* Card Banner Prizepool (Lebar Penuh Mentok Tepi Layar, Tanpa Rounded, Ukuran Dikunci Kokoh) */}
      <div
        ref={cardRef}
        className="relative z-10 w-full h-[120px] sm:h-[190px] md:h-[230px] lg:h-[290px] xl:h-[340px] mt-8 sm:mt-12 lg:mt-16 overflow-hidden shadow-[inset_0_4px_16px_rgba(0,0,0,0.7),0_15px_40px_rgba(0,0,0,0.75)] border-t border-b border-black/40 flex items-center justify-center"
      >
        {/* Card Background Image */}
        <Image
          src="/images/PRIZE BACKGROUND.png"
          alt="Prize Card Background"
          fill
          className="object-cover object-center select-none pointer-events-none z-0"
          priority
        />

        {/* Prize Amount Text (Poppins Bold, White, Diperbesar, 1 Baris Penuh, Tanpa Shadow) */}
        <span className="relative z-10 font-poppins font-bold text-white text-[42px] sm:text-[76px] md:text-[104px] lg:text-[150px] xl:text-[210px] 2xl:text-[240px] leading-none tracking-tight text-center select-none whitespace-nowrap min-h-[1em] flex items-center justify-center">
          {typedText}
        </span>
      </div>
    </section>
  );
}
