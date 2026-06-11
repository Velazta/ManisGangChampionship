"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Daftarkan ScrollTrigger di sisi klien
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animasi Title (Fade-in + slide-up lembut)
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
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animasi Paragraphs Grid (Staggered Fade-in + slide-up)
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      id="story"
      className="relative w-full overflow-hidden -mt-[40px] sm:-mt-[60px] lg:-mt-[120px] min-h-screen flex flex-col justify-between"
    >
      {/* Background Image Layer */}
      <Image
        src="/images/BACKGROUND STORY.png"
        alt="Story Section Background"
        fill
        className="object-cover object-top select-none pointer-events-none z-0"
        priority
      />

      {/* Spacer atas (menghindari area gelombang emas di background) */}
      <div className="h-[22vh] sm:h-[26vh] lg:h-[30vh] min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] z-10 w-full pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 pb-[8vh] sm:pb-[10vh] lg:pb-[12vh]">
        {/* Title: MAIN STORY (Cinzel Decorative, 89.8px, White Glow) */}
        <h2
          ref={titleRef}
          className="font-cinzel text-white text-3xl sm:text-5xl md:text-7xl lg:text-[89.8px] leading-none tracking-wider text-glow-white uppercase select-none text-center"
        >
          Main Story
        </h2>

        {/* Story Paragraphs Grid (2 Kolom Poppins Light 24.39px) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 lg:gap-24 w-full max-w-[1200px] mt-8 sm:mt-10 lg:mt-14 text-white/90"
        >
          {/* Kolom Kiri */}
          <p className="font-poppins font-light text-[13px] sm:text-base lg:text-[24.39px] leading-relaxed text-center">
            Welcome to MGC Vol. 8: Violence District, our final chapter and the official &quot;Last Dance&quot; of this tournament series. Over the course of eight volumes, this event has grown into a premier competitive platform built on sportsmanship and solidarity. We are immensely proud of the enthusiasm, dedication, and professional level of competition showcased by all participants throughout the years.
          </p>

          {/* Kolom Kanan */}
          <p className="font-poppins font-light text-[13px] sm:text-base lg:text-[24.39px] leading-relaxed text-center">
            As the organizing committee, we are hosting this event for the last time and officially stepping down. We extend our deepest gratitude to every player, supporter, and partner who has been an integral part of this long journey. While this volume marks the end of our operations, the legacy, milestones, and memories we have built together will remain a proud achievement.
          </p>
        </div>
      </div>
    </section>
  );
}
