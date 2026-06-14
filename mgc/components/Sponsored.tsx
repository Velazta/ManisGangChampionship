"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sponsors = [
  { id: "1", name: "VELAZTA", img: "/images/velazta.png", width: 138, height: 80 },
  { id: "2", name: "NEOPAREA", img: "/images/neoparea.png", width: 80, height: 80 },
  { id: "3", name: "SHIFER", img: "/images/SHIFER.png", width: 80, height: 80 },
];

export default function Sponsored() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 1. Smooth Fade-in + Blur + Slide-up for Title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // 2. Staggered Entrance for Sponsor Cards
      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.4"
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
          SPONSORED x SUPPORTED BY
        </h2>

        {/* Grid Sponsor Logos - Clean layout without card boxes */}
        <div
          ref={gridRef}
          className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:gap-16 w-full mt-14 max-w-[1000px]"
        >
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex items-center justify-center">
              <div
                className="relative flex items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer select-none opacity-45 hover:opacity-100 hover:drop-shadow-[0_0_12px_rgba(210,112,0,0.75)]"
              >
                <Image
                  src={sponsor.img}
                  alt={`${sponsor.name} Logo`}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="h-16 w-auto sm:h-24 md:h-32 object-contain select-none pointer-events-none"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
