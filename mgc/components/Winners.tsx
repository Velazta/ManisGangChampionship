"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const winners = [
  {
    id: "1",
    title: "MGC VOL 5 CHAMPIONS",
    image: "/images/1-MGC.png",
  },
  {
    id: "2",
    title: "MGC VOL 6 CHAMPIONS",
    image: "/images/2-MGC.png",
  },
  {
    id: "3",  
    title: "MGC VOL 7 CHAMPIONS",
    image: "/images/3-MGC.png",
  },
];

export default function Winners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Drag / Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const currentTranslateXRef = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + winners.length) % winners.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % winners.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto Play (tiap 4 detik)
  useEffect(() => {
    if (isHovered || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide, isHovered, isDragging]);

  // GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (sliderRef.current) {
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
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Drag & Touch handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    currentTranslateXRef.current = 0;
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    currentTranslateXRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (currentTranslateXRef.current < -threshold) {
      nextSlide();
    } else if (currentTranslateXRef.current > threshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  const getCardStyle = (index: number) => {
    const total = winners.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      return {
        transform: `translateX(${dragOffset}px) scale(1.05) rotateY(0deg) translateZ(0px)`,
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1) drop-shadow(0 25px 35px rgba(210, 112, 0, 0.5))",
        cursor: isDragging ? "grabbing" : "pointer",
      };
    } else if (diff === 1) {
      return {
        transform: `translateX(calc(58% + ${dragOffset * 0.5}px)) scale(0.85) rotateY(-20deg) translateZ(-100px)`,
        zIndex: 10,
        opacity: 0.65,
        filter: "brightness(0.6) blur(0.5px)",
        cursor: "pointer",
      };
    } else {
      return {
        transform: `translateX(calc(-58% + ${dragOffset * 0.5}px)) scale(0.85) rotateY(20deg) translateZ(-100px)`,
        zIndex: 10,
        opacity: 0.65,
        filter: "brightness(0.6) blur(0.5px)",
        cursor: "pointer",
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="winners"
      className="relative w-full aspect-video min-h-[550px] sm:min-h-[750px] lg:min-h-[1080px] max-h-[1080px] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image Layer (1920x1080 canvas fit) */}
      <Image
        src="/images/winner background.png"
        alt="Winner Section Background"
        fill
        className="object-cover object-center select-none pointer-events-none z-0"
        priority
      />

      {/* Main Slider Container (melebar & digeser lebih turun) */}
      <div
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        className="relative z-10 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center translate-y-6 sm:translate-y-12 lg:translate-y-20 group/slider"
      >
        {/* 3D Perspective Stage Container (diperbesar lebih melebar) */}
        <div className="relative w-full h-[420px] sm:h-[580px] md:h-[680px] lg:h-[760px] flex items-center justify-center select-none">
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
            }}
          >
            {winners.map((winner, index) => {
              const cardStyle = getCardStyle(index);
              const isCenter = (index - currentIndex + winners.length) % winners.length === 0;

              return (
                <div
                  key={winner.id}
                  onClick={() => {
                    if (isCenter) {
                      setSelectedImage(winner.image);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                  className="absolute w-[260px] sm:w-[370px] md:w-[460px] lg:w-[540px] aspect-[1630/2266] rounded-xl overflow-hidden transition-transform duration-500 ease-out border border-white/20 shadow-2xl"
                  style={{
                    ...cardStyle,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <Image
                    src={winner.image}
                    alt={winner.title}
                    fill
                    className="object-cover pointer-events-none select-none"
                    priority
                  />
                </div>
              );
            })}
          </div>

          {/* Left Nav Arrow (Matching Recap.tsx style) */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-timer border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all duration-300 hover:border-[#D27000] group md:opacity-0 md:group-hover/slider:opacity-100"
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

          {/* Right Nav Arrow (Matching Recap.tsx style) */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-timer border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all duration-300 hover:border-[#D27000] group md:opacity-0 md:group-hover/slider:opacity-100"
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

        {/* Indicator Dots (Matching Recap.tsx style) */}
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6 z-40">
          {winners.map((_, index) => (
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

      {/* Lightbox Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Winner Poster Expanded"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
