"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// List staff members dasar (4 orang)
const staffMembers = [
  { id: "1", name: "VELAZTA", role: "DESAINER" },
  { id: "2", name: "MGC STAFF 1", role: "DEVELOPER" },
  { id: "3", name: "MGC STAFF 2", role: "ORGANIZER" },
  { id: "4", name: "MGC STAFF 3", role: "COMMUNITY" },
];

// Buat list 20 staff dengan menduplikasi data dasar
const extendedStaffList = [];
for (let i = 0; i < 5; i++) {
  extendedStaffList.push(...staffMembers.map((staff, index) => ({
    ...staff,
    id: `${staff.id}-${i}-${index}`,
    name: staff.name,
  })));
}

// Duplikasi 2x agar marquee loop tidak terputus secara visual
const marqueeList = [...extendedStaffList, ...extendedStaffList];

export default function Staff() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Daftarkan ScrollTrigger di sisi klien
    gsap.registerPlugin(ScrollTrigger);

    let isLoadAnimDone = false;

    const ctx = gsap.context(() => {
      // 1. Animasi Title (OUR STAFF) - Glow Putih
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Animasi Cards (Fade-in + slide-up staggered)
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.fromTo(
          marquee.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05, // Stagger cepat karena total 40 kartu di DOM
            ease: "power4.out",
            scrollTrigger: {
              trigger: sliderContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              isLoadAnimDone = true;
            }
          }
        );
      }
    }, sectionRef);

    // 3. Logika Drag-to-Scroll & Auto-Scroll (Desktop & Mobile)
    const slider = sliderContainerRef.current;
    const marquee = marqueeRef.current;

    if (slider && marquee) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;
      let isHovered = false;
      let animationFrameId: number;

      let singleSetWidth = marquee.scrollWidth / 2;

      // KECEPAN SLIDE: Ubah nilai ini untuk mengatur kecepatan (semakin kecil nilainya, semakin lambat, misal 0.5 atau 0.8)
      const scrollSpeed = 0.5;

      const handleResize = () => {
        singleSetWidth = marquee.scrollWidth / 2;
      };
      window.addEventListener("resize", handleResize);

      const step = () => {
        if (isLoadAnimDone && !isDown && !isHovered && singleSetWidth > 0) {
          slider.scrollLeft += scrollSpeed;
          if (slider.scrollLeft >= singleSetWidth) {
            slider.scrollLeft -= singleSetWidth;
          }
        }
        animationFrameId = requestAnimationFrame(step);
      };

      // Mulai auto-scroll loop
      animationFrameId = requestAnimationFrame(step);

      // Event Handlers untuk Drag-to-Scroll (Desktop)
      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        slider.classList.add("cursor-grabbing");
        slider.classList.remove("cursor-grab");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        isHovered = false;
        slider.classList.add("cursor-grab");
        slider.classList.remove("cursor-grabbing");
      };

      const handleMouseUp = () => {
        isDown = false;
        slider.classList.add("cursor-grab");
        slider.classList.remove("cursor-grabbing");
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Faktor sensitivitas seret
        slider.scrollLeft = scrollLeft - walk;

        // Reset scrollLeft saat melewati batas agar drag scroll terus menyambung
        if (slider.scrollLeft >= singleSetWidth) {
          slider.scrollLeft -= singleSetWidth;
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        } else if (slider.scrollLeft <= 0) {
          slider.scrollLeft += singleSetWidth;
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
        }
      };

      const handleMouseEnter = () => {
        isHovered = true;
      };

      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);
      slider.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        ctx.revert();
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
        slider.removeEventListener("mouseenter", handleMouseEnter);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="staff"
      className="relative z-10 w-full overflow-hidden -mt-[235px] sm:-mt-[330px] lg:-mt-[420px] min-h-[820px] sm:min-h-[1080px] lg:min-h-[1340px] flex flex-col justify-between"
    >
      {/* Anchor link untuk kompatibilitas menu ABOUT US */}
      <div id="about-us" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />

      {/* Background Image Layer (Wrapper Div dengan Clip-path untuk mempermudah pengaturan offset gambar latar) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden translate-y-[100px] sm:translate-y-[140px] lg:translate-y-[160px] [--img-offset:60px] sm:[--img-offset:90px] lg:[--img-offset:120px]"
        style={{
          clipPath: "polygon(0% 0%, 5% 4.8%, 10% 9.2%, 15% 13.0%, 20% 16.3%, 25% 19.1%, 30% 21.4%, 35% 23.3%, 40% 24.5%, 45% 25.2%, 50% 25.5%, 55% 25.2%, 60% 24.5%, 65% 23.3%, 70% 21.4%, 75% 19.1%, 80% 16.3%, 85% 13.0%, 90% 9.2%, 95% 4.8%, 100% 0%, 100% 100%, 0% 100%)"
        }}
      >
        <Image
          src="/images/STAFF BACKGROUND.png"
          alt="Staff Section Background"
          fill
          className="object-cover object-top select-none pointer-events-none scale-[1.03]"
          style={{
            transform: "translateY(calc(-1 * var(--img-offset)))"
          }}
          priority
        />
      </div>

      {/* Spacer atas (menghindari gelombang emas atas dan mencegah tulisan terpotong) */}
      <div className="h-[34vh] sm:h-[40vh] lg:h-[50vh] min-h-[300px] sm:min-h-[410px] lg:min-h-[520px] w-full z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-6">
        {/* Title: OUR STAFF (Cinzel Decorative, White Glow) */}
        <h2
          ref={titleRef}
          className="font-cinzel text-white text-3xl sm:text-5xl md:text-7xl lg:text-[89.8px] leading-none tracking-wider uppercase select-none text-center"
          style={{
            textShadow: "0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.35)"
          }}
        >
          OUR STAFF
        </h2>

        {/* Horizontal Marquee Card Slider Container */}
        <div
          ref={sliderContainerRef}
          className="relative w-full mt-10 sm:mt-16 lg:mt-20 overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
        >
          {/* Slider Track Wrapper */}
          <div
            ref={marqueeRef}
            className="flex gap-6 w-max flex-nowrap whitespace-nowrap px-4"
          >
            {marqueeList.map((staff, index) => (
              <div
                key={`${staff.id}-${index}`}
                className="relative w-[260px] h-[390px] sm:w-[300px] sm:h-[450px] lg:w-[340px] lg:h-[510px] flex-shrink-0 overflow-hidden rounded-[5px] group select-none pointer-events-none"
              >
                {/* Card Background Image (Avatar + Orange bottom gradient) */}
                <Image
                  src="/images/CARD BACKGROUND.png"
                  alt={`${staff.name} Avatar`}
                  fill
                  className="object-cover select-none pointer-events-none"
                  priority
                />

                {/* Text Overlay (Poppins Bold, White, Bottom Aligned - Raised & Enlarged) */}
                <div className="absolute inset-x-0 bottom-0 pb-12 pt-6 px-6 z-10 flex flex-col items-center text-center">
                  {/* Text 1: Nama */}
                  <h3 className="font-poppins font-bold text-white text-[24px] sm:text-[26px] lg:text-[32px] tracking-wide uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {staff.name}
                  </h3>
                  {/* Text 2: Divisi */}
                  <p className="font-poppins font-normal text-white/80 text-xs sm:text-xs lg:text-sm tracking-[0.18em] uppercase mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {staff.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer bawah untuk keseimbangan visual */}
      <div className="h-[4vh] sm:h-[6vh] w-full z-10 pointer-events-none" />
    </section>
  );
}
