"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import GoldParticles from "@/components/GoldParticles";
import gsap from "gsap";

export interface TeamItem {
  id: string;
  name: string;
  img: string;
  poster: string;
}

// ============================================================
// KONFIGURASI TIM — Edit daftar ini untuk mengubah data tim
// Letakkan file PNG logo & poster player di: /public/images/teams/
// ============================================================
const teams: TeamItem[] = [
  { id: "1",  name: "NBA REBORN",    img: "/images/teams/nba.png",        poster: "/images/teams/NBA LINEUP PLAYERs.png" },
  { id: "2",  name: "666",           img: "/images/teams/666.png",        poster: "/images/teams/666 LINEUP PLAYER.png" },
  { id: "3",  name: "ASYLUM",        img: "/images/teams/asylum.png",     poster: "/images/teams/ASYLUM LINEUP PLAYER.png" },
  { id: "4",  name: "AWAKENING",     img: "/images/teams/awakening.png",  poster: "/images/teams/AWEKENING LINEUP PLAYER.png" },
  { id: "5",  name: "VELORA",        img: "/images/teams/velora.png",     poster: "/images/teams/VELLORA LINEUP PLAYER.png" },
  { id: "6",  name: "B2W",           img: "/images/teams/B2W.png",        poster: "/images/teams/B2W LINEUP PLAYER.png" },
  { id: "7",  name: "BUTTERFLY",     img: "/images/teams/butterfly.png",  poster: "/images/teams/BUTTERFLY LINEUP PLAYER.png" },
  { id: "8",  name: "CHROMA",        img: "/images/teams/chroma.png",     poster: "/images/teams/CHROMA LINEUP PLAYER.png" },
  { id: "9",  name: "CLWN",          img: "/images/teams/clwn.png",       poster: "/images/teams/CLWN LINEUP PLAYER.png" },
  { id: "10", name: "DOMITHRONE",    img: "/images/teams/domithrone.png", poster: "/images/teams/DOMITHRONE LINEUP PLAYER.png" },
  { id: "11", name: "ECLIPSE",       img: "/images/teams/eclipse.png",    poster: "/images/teams/ECLIPSE LINEUP PLAYER.png" },
  { id: "12", name: "GENTACE",       img: "/images/teams/gentace.png",    poster: "/images/teams/GENTACE LINEUP PLAYERs.png" },
  { id: "13", name: "SADNESS",       img: "/images/teams/sadness.png",    poster: "/images/teams/SADNESS LINEUP PLAYER.png" },
  { id: "14", name: "SNIGHTFALL",    img: "/images/teams/snightfall.png", poster: "/images/teams/S NIGHTFALL LINEUP PLAYER.png" },
  { id: "15", name: "SUNSET",        img: "/images/teams/sunset.png",     poster: "/images/teams/127 LINEUP PLAYER.png" },
  { id: "16", name: "SUS",           img: "/images/teams/sus.png",        poster: "/images/teams/SUS LINEUP PLAYER.png" },
];

function TeamCard({
  team,
  onSelect,
}: {
  team: TeamItem;
  onSelect: (team: TeamItem) => void;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onSelect(team)}
      className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-pointer select-none"
    >
      {/* Card Image — Canvas ratio 844/1184 matching source graphics without cropping */}
      <div
        className="relative w-full overflow-hidden rounded-[4px] transition-all duration-300
                    group-hover:scale-[1.05]
                    group-hover:drop-shadow-[0_0_16px_rgba(210,160,0,0.75)]"
        style={{ aspectRatio: "844 / 1184" }}
      >
        {!hasError && (
          <Image
            src={team.img}
            alt={`${team.name} logo`}
            fill
            className={`object-contain select-none pointer-events-none transition-opacity duration-300 ${
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
                        bg-[#0a0a0a] border border-[#D27000]/50 rounded-[4px]"
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

  const [selectedTeam, setSelectedTeam] = useState<TeamItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTeam(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

            </span>
          </div>
        </div>

        {/* ── Team Card Grid ───────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 w-full max-w-[1440px] mx-auto"
        >
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} onSelect={(t) => setSelectedTeam(t)} />
          ))}
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>

      {/* ── Interactive Player Lineup Poster Modal ──────────────── */}
      {selectedTeam && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in select-none"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar (Centered Team Name + Top Right Close Button) */}
            <div className="relative w-full flex items-center justify-center pb-3 mb-3 border-b border-white/15">
              <h3 className="font-poppins font-black text-white text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase text-glow-white text-center">
                {selectedTeam.name}
              </h3>

              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center active:scale-90"
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            {/* Poster Preview Container */}
            <div className="relative w-full flex-1 max-h-[82vh] flex items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={selectedTeam.poster}
                alt={`${selectedTeam.name} Player Lineup Poster`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
