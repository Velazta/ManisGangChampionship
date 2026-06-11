"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import GoldParticles from "./GoldParticles";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  // 1. Logika Countdown Timer ke 22 Juli 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-07-22T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2. Logika Animasi GSAP (Appear & Fade-in)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Trofi muncul dari bawah ke atas + fade in
      gsap.fromTo(
        trophyRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out", delay: 0.2 }
      );

      // Animasi teks depan muncul berurutan (stagger)
      if (textGroupRef.current) {
        const children = textGroupRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.2, 
            ease: "power3.out", 
            delay: 0.6 
          }
        );
      }

      // Animasi Timer muncul dari bawah
      gsap.fromTo(
        timerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen min-h-[750px] overflow-hidden flex flex-col items-center bg-black"
    >
      {/* Layer 1: Latar Belakang (Nebula + Teks LAST DANCE) */}
      <div 
        className="absolute inset-0 z-0 bg-nebula opacity-90"
        style={{
          backgroundImage: "url('/images/HERO SECTION - BACKGROUND2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <GoldParticles />

      {/* Layer 2: Trophy & Foreground (Diposisikan secara Absolut Terpisah - Responsif) */}
      <div 
        ref={trophyRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[290px] sm:max-w-[500px] md:max-w-[680px] lg:max-w-[850px] aspect-[565/667] z-10"
      >
        {/* Trophy Image */}
        <div className="w-full h-full relative">
          <Image
            src="/images/TROPHY2.png"
            alt="MGC Gold Trophy"
            fill
            priority
            className="object-contain drop-shadow-[0_10px_50px_rgba(234,179,8,0.35)] select-none pointer-events-none"
          />
        </div>

        {/* Layer 3: Teks Depan Poppins (Menimpa Trofi - Centered Vertically) */}
        <div 
          ref={textGroupRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center translate-y-[7%] z-20"
        >
          {/* TEXT 1: MANIS GANG (Poppins Semibold) */}
          <h1 className="text-white font-poppins font-semibold text-4xl sm:text-7xl lg:text-[123px] leading-none tracking-[-0.05em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            MANIS GANG
          </h1>
          
          {/* TEXT 2: CHAMPIONSHIP (Poppins Regular) */}
          <h2 className="text-white font-poppins font-normal text-3xl sm:text-6xl lg:text-[109.22px] leading-none tracking-[-0.05em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] -mt-1 md:-mt-2">
            CHAMPIONSHIP
          </h2>
          
          {/* TEXT 3: VOL 8 (Poppins Extra Light) */}
          <p className="text-white font-poppins font-extralight text-[10px] sm:text-2xl lg:text-[40px] leading-none tracking-[0.25em] lg:tracking-[0.3em] pl-[0.25em] lg:pl-[0.3em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] mt-3 lg:mt-4 uppercase">
            VOL 8
          </p>
        </div>
      </div>

      {/* Layer 4: Countdown Timer Event (Diposisikan Terpisah di Bagian Bawah Layar) */}
      <div 
        ref={timerRef}
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-row justify-center items-center gap-3 sm:gap-6 lg:gap-10 z-30"
      >
        {/* CARD: DAYS */}
        <div className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] rounded-[6px] lg:rounded-[8px] glass-timer flex items-center justify-center overflow-hidden">
          <span className="font-aodaliya text-[62px] sm:text-[95px] lg:text-[130px] leading-none text-white select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] translate-y-1">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-black font-helvetica text-[10px] sm:text-[14px] lg:text-[18px] font-normal tracking-[0.2em] pl-[0.2em] uppercase select-none pointer-events-none">
            DAYS
          </span>
        </div>

        {/* CARD: HOURS */}
        <div className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] rounded-[6px] lg:rounded-[8px] glass-timer flex items-center justify-center overflow-hidden">
          <span className="font-aodaliya text-[62px] sm:text-[95px] lg:text-[130px] leading-none text-white select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] translate-y-1">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-black font-helvetica text-[10px] sm:text-[14px] lg:text-[18px] font-normal tracking-[0.15em] pl-[0.15em] uppercase select-none pointer-events-none">
            HOURS
          </span>
        </div>

        {/* CARD: MINUTES */}
        <div className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] rounded-[6px] lg:rounded-[8px] glass-timer flex items-center justify-center overflow-hidden">
          <span className="font-aodaliya text-[62px] sm:text-[95px] lg:text-[130px] leading-none text-white select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] translate-y-1">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-black font-helvetica text-[10px] sm:text-[14px] lg:text-[18px] font-normal tracking-[0.05em] pl-[0.05em] uppercase select-none pointer-events-none">
            MINUTES
          </span>
        </div>

        {/* CARD: SECONDS */}
        <div className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] rounded-[6px] lg:rounded-[8px] glass-timer flex items-center justify-center overflow-hidden">
          <span className="font-aodaliya text-[62px] sm:text-[95px] lg:text-[130px] leading-none text-white select-none pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] translate-y-1">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-black font-helvetica text-[10px] sm:text-[14px] lg:text-[18px] font-normal tracking-[0.05em] pl-[0.05em] uppercase select-none pointer-events-none">
            SECONDS
          </span>
        </div>

      </div>

    </section>
  );
}