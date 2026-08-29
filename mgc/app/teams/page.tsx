"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import GoldParticles from "@/components/GoldParticles";
import gsap from "gsap";

// ============================================================
// KONFIGURASI TIM — Edit daftar ini untuk mengubah data tim
// Letakkan file PNG setiap tim di: /public/images/teams/
// Contoh: /public/images/teams/nba-reborn.png
// ============================================================
const teams = [
  { id: "1",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "2",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "3",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "4",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "5",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "6",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "7",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "8",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "9",  name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "10", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "11", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "12", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "13", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "14", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "15", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
  { id: "16", name: "NBA REBORN",  img: "/images/teams/NBA.png" },
];

function TeamCard({ team }: { team: { id: string; name: string; img: string } }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default">
      {/* Card Image — square aspect ratio */}
      <div
        className="relative w-full overflow-hidden rounded-[3px] transition-all duration-300
                    group-hover:scale-[1.05]
                    group-hover:drop-shadow-[0_0_14px_rgba(210,160,0,0.65)]"
        style={{ aspectRatio: "1 / 1" }}
      >
        {!hasError && (
          <Image
            src={team.img}
            alt={`${team.name} logo`}
            fill
            className={`object-cover select-none pointer-events-none transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        )}

        {/* Fallback placeholder jika gambar error ATAU belum dimuat */}
        {(!isLoaded || hasError) && (
          <div
            className="absolute inset-0 flex items-center justify-center
                        bg-[#0a0a0a] border border-[#D27000]/50 rounded-[3px]"
          >
            <div className="flex flex-col items-center gap-1 opacity-40">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D27000] fill-current" viewBox="0 0 24 24">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
              </svg>
              <span className="font-poppins text-[7px] sm:text-[9px] text-[#D27000] tracking-widest uppercase">
                SLOT
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Team Name — Poppins SemiBold */}
      <span
        className="font-poppins font-semibold text-white text-center uppercase
                    leading-tight tracking-wide w-full
                    transition-colors duration-300 group-hover:text-[#FFD591]"
        style={{
          fontSize: "clamp(8px, 0.85vw, 13px)",
          textShadow: "0 1px 4px rgba(0,0,0,0.95)",
          wordBreak: "break-word",
        }}
      >
        {team.name}
      </span>
    </div>
  );
}

export default function TeamsPage() {
  const pageRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Typewriter + Fade-in Combo for TEAM REGISTERED characters
      if (text1Ref.current) {
        gsap.fromTo(
          text1Ref.current.children,
          { opacity: 0, y: 15, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.045, // smooth sequential typing reveal
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }

      // 2. OFFICIAL LINEUP smooth fade & slide in (starts as typewriter is ending)
      if (titleRef.current) {
        const lineupText = titleRef.current.querySelector(".relative");
        if (lineupText) {
          gsap.fromTo(
            lineupText,
            { opacity: 0, y: 10, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
              delay: 0.75, // timed perfectly after text1 finishes typing
            }
          );
        }
      }

      // 3. Grid stagger animation
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
            delay: 1.05,
          }
        );
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative w-full min-h-screen overflow-x-hidden bg-black flex flex-col justify-between"
    >
      {/* Gold Particles */}
      <GoldParticles />

      {/* Shared Header */}
      <Header />

      {/* ── Background ───────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/teams/TEAM LIST BACKGROUND.png"
          alt="Teams Background"
          fill
          priority
          className="object-cover object-top select-none pointer-events-none"
        />
        {/* Subtle dark veil */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* ── Page Content ─────────────────────────────────── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center
                      px-4 sm:px-6 lg:px-8 xl:px-10
                      pt-28 sm:pt-32 pb-12">

        {/* ── Title Block (Justify Center) ─────────────────── */}
        <div
          ref={titleRef}
          className="w-full flex flex-col items-center justify-center text-center select-none mb-8 sm:mb-10 lg:mb-12"
        >
          {/* TEXT 1: TEAM REGISTERED (Typewriter split characters) */}
          <h1
            ref={text1Ref}
            className="font-poppins font-bold italic text-white text-center w-full select-none flex justify-center flex-wrap"
            style={{
              fontSize: "clamp(22px, 7.8vw, 114px)",
              lineHeight: 1,
              textShadow:
                "0 3px 0 rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.15)",
              letterSpacing: "0.01em",
            }}
          >
            {"TEAM REGISTERED".split("").map((char, idx) => (
              <span
                key={idx}
                className="inline-block opacity-0"
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* TEXT 2: OFFICIAL LINEUP (Center Aligned with Negative Margin-Y offset) */}
          <div
            className="relative w-full flex justify-center items-center opacity-0"
            style={{
              marginTop: "clamp(-15px, -3.8vw, -60px)",
              height: "clamp(12px, 4vw, 58px)",
            }}
          >
            {/* Layer 1: Stroke putih solid */}
            <span
              aria-hidden="true"
              className="font-cinzel absolute inset-0 flex items-center justify-center text-center text-white"
              style={{
                fontSize: "clamp(11px, 4.2vw, 58px)",
                lineHeight: 1,
                color: "white",
                WebkitTextStroke: "clamp(2px, 0.35vw, 5.5px) white",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                zIndex: 0,
              }}
            >
              OFFICIAL LINEUP
            </span>

            {/* Layer 2: Fill gradient emas */}
            <span
              className="font-cinzel absolute inset-0 flex items-center justify-center text-center"
              style={{
                fontSize: "clamp(11px, 4.2vw, 58px)",
                lineHeight: 1,
                background: "linear-gradient(180deg, #FFD591 0%, #D4920A 45%, #995E00 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                zIndex: 1,
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55))",
              }}
            >
              OFFICIAL LINEUP
            </span>
          </div>
        </div>

        {/* ── Team Card Grid ───────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 w-full max-w-[1440px] mx-auto"
        >
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </main>
  );
}
