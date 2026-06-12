"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ValorantDistrictLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Geometric V logo */}
    <path d="M12 15 H24 L34 45 H22 Z" fill="#D27000" />
    <path d="M26 15 H38 L28 45 H16 Z" fill="white" fillOpacity="0.85" />
    <text x="52" y="28" fill="white" className="font-poppins font-black text-[13.5px] tracking-[0.11em] uppercase">VALORANT</text>
    <text x="52" y="42" fill="#D27000" className="font-poppins font-semibold text-[9.5px] tracking-[0.24em] uppercase">DISTRICT</text>
  </svg>
);

const VdrIdnLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Interlocking crest */}
    <path d="M12 15 L32 15 L37 25 L17 25 Z" fill="white" fillOpacity="0.9" />
    <path d="M8 28 L28 28 L23 45 L3 45 Z" fill="#D27000" />
    <path d="M30 28 L35 28 L40 45 L35 45 Z" fill="white" fillOpacity="0.4" />
    <text x="48" y="28" fill="white" className="font-poppins font-black text-[13.5px] tracking-[0.13em] uppercase">VDR IDN</text>
    <text x="48" y="42" fill="#D27000" className="font-poppins font-semibold text-[9.5px] tracking-[0.21em] uppercase">PARTNERS</text>
  </svg>
);

const MgcStoreLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monogram brand icon */}
    <path d="M22 15 L30 23 L35 15 L40 33 L15 33 Z" fill="#D27000" />
    <circle cx="27" cy="40" r="2.5" fill="white" />
    <circle cx="34" cy="40" r="2.5" fill="white" />
    <text x="50" y="28" fill="white" className="font-poppins font-black text-[13.5px] tracking-[0.16em] uppercase">MGC</text>
    <text x="50" y="42" fill="#D27000" className="font-poppins font-semibold text-[9.5px] tracking-[0.28em] uppercase">STORE</text>
  </svg>
);

const VelaztaDesignLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Interlocking polygons */}
    <path d="M12 15 H38 L25 31 Z" fill="white" fillOpacity="0.9" />
    <path d="M25 31 H42 L34 45 Z" fill="#D27000" />
    <text x="52" y="28" fill="white" className="font-poppins font-black text-[13.5px] tracking-[0.14em] uppercase">VELAZTA</text>
    <text x="52" y="42" fill="#D27000" className="font-poppins font-semibold text-[9px] tracking-[0.22em] uppercase">DESIGN STUDIO</text>
  </svg>
);

const sponsors = [
  { id: "1", render: () => <ValorantDistrictLogo /> },
  { id: "2", render: () => <VdrIdnLogo /> },
  { id: "3", render: () => <MgcStoreLogo /> },
  { id: "4", render: () => <VelaztaDesignLogo /> },
];

export default function Sponsored() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animasi Judul
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Animasi Staggered Grid Cards
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsored"
      className="relative w-full min-h-[350px] flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 bg-black border-t border-white/5"
    >
      {/* Background radial gradient glow matched with FAQ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1100px] px-6 flex flex-col items-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-cinzel text-white text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase select-none text-center"
          style={{
            textShadow: "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)"
          }}
        >
          OFFICIAL SPONSORS
        </h2>

        {/* Grid Sponsor Logos - Clean layout without card boxes */}
        <div
          ref={gridRef}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:gap-16 w-full mt-14 max-w-[1000px]"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="relative flex items-center justify-center w-[180px] sm:w-[200px] h-14 transition-all duration-500 hover:scale-105 cursor-pointer select-none opacity-45 hover:opacity-100 hover:drop-shadow-[0_0_12px_rgba(210,112,0,0.75)]"
            >
              {sponsor.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
