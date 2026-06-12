"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// List video recap MGC
const recapVideos = [
  {
    id: "1",
    videoId: "LTvGBe2N-W4", 
    title: "MGC TUR VOL 6 WILCARD DAY 1",
  },
  {
    id: "2",
    videoId: "7sq7MjuL4_c",
    title: "MGC TOUR VOL 6 DAY 5",
  },
  {
    id: "3",
    videoId: "C6YPU8kfoaA",
    title: "MGC X VDR IDN OFFICIALY PARTNERSHIP",
  },
  {
    id: "4",
    videoId: "oHyl5V3jXEQ",
    title: "Grand Final Tournament Violence District Vol. 7 by MGC",
  },
];

export default function Recap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fungsi navigasi slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recapVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recapVideos.length) % recapVideos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Efek Auto-Slide (berganti setiap 5 detik)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  // Efek Animasi GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animasi Title (RECAP EVENT)
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

      // Animasi Slider Box (Fade-in + Scale)
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recap"
      className="relative w-full min-h-[500px] sm:min-h-[700px] lg:min-h-[1037px] flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 bg-white"
    >
      {/* Background Image Layer */}
      <Image
        src="/images/RECAP BACKGROUND.png"
        alt="Recap Section Background"
        fill
        className="object-cover object-center select-none pointer-events-none z-0"
        priority
      />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1240px] px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center">
        {/* Title: RECAP EVENT (Cinzel Decorative, Orange-Gold Text + Glow) */}
        <h2
          ref={titleRef}
          className="font-cinzel text-[#D27000] text-3xl sm:text-5xl md:text-7xl lg:text-[89.8px] leading-none tracking-wider uppercase select-none text-center"
          style={{
            textShadow: "0 0 15px rgba(210, 112, 0, 0.5), 0 0 30px rgba(210, 112, 0, 0.25)"
          }}
        >
          RECAP EVENT
        </h2>

        {/* Video Slider Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-[960px] mt-8 sm:mt-14 lg:mt-20 group/slider"
        >
          {/* Main Slider Wrapper */}
          <div className="relative w-full aspect-video overflow-hidden rounded-[8px] sm:rounded-[14px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-zinc-950">
            <div
              className="flex w-full h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {recapVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-full flex-shrink-0 group overflow-hidden block"
                >
                  {/* Thumbnail Image */}
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                    priority
                  />

                  {/* Dark Gradients Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-75 group-hover:opacity-55 transition-opacity duration-300 z-10" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D27000] group-hover:bg-[#D27000]/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(210,112,0,0.6)]">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current translate-x-[3px]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Title Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-20 bg-gradient-to-t from-black/95 to-transparent">
                    <h3 className="font-poppins font-semibold text-white text-sm sm:text-lg md:text-2xl tracking-wide group-hover:text-[#D27000] transition-colors duration-300">
                      {video.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-timer border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all duration-300 hover:border-[#D27000] group md:opacity-0 md:group-hover/slider:opacity-100"
              aria-label="Previous Slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#D27000] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-timer border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all duration-300 hover:border-[#D27000] group md:opacity-0 md:group-hover/slider:opacity-100"
              aria-label="Next Slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#D27000] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
            {recapVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-[#D27000] scale-125 shadow-[0_0_8px_rgba(210,112,0,0.8)]"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
