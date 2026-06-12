"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Animasi kemunculan Header Nav saat pertama dimuat
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    const targetId = item.toLowerCase().replace(/\s+/g, "-");
    
    // Close mobile menu
    setIsOpen(false);

    if (item === "HOMEPAGE") {
      e.preventDefault();
      if (pathname === "/") {
        // Jika sudah di homepage, smooth scroll ke paling atas
        lenis?.scrollTo(0, { 
          duration: 1.5, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
      } else {
        router.push("/");
      }
      return;
    }

    const element = document.getElementById(targetId);
    if (pathname === "/" && element) {
      e.preventDefault();
      // Smooth scroll menggunakan Lenis
      lenis?.scrollTo(`#${targetId}`, {
        duration: 1.5,
        offset: 0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  };

  const navItems = ["HOMEPAGE", "STORY", "PRIZEPOOL", "RECAP", "STAFF", "SPONSORED", "FAQ"];

  return (
    <header 
      ref={navRef}
      className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-[90%] max-w-[420px] md:max-w-none md:w-auto"
    >
      {/* 1. Desktop Navigation Layout (md:flex, hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 px-8 lg:px-10 py-3.5 rounded-full border border-white/10 glass-nav shadow-2xl">
        {navItems.map((item) => {
          const href = item === "HOMEPAGE" 
            ? "/" 
            : `/#${item.toLowerCase().replace(/\s+/g, "-")}`;
          
          return (
            <a
              key={item}
              href={href}
              onClick={(e) => handleNavClick(e, item)}
              className="text-white font-poppins text-[10px] sm:text-[11px] lg:text-xs font-semibold tracking-[0.12em] lg:tracking-[0.15em] transition-all duration-300 hover:text-[#D27000] hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
            >
              {item}
            </a>
          );
        })}
      </nav>

      {/* 2. Mobile Navigation Bar (md:hidden, layout centered absolute) */}
      <div className="flex md:hidden flex-col w-full relative">
        <div className="flex items-center justify-between w-full px-5 py-3 rounded-full border border-white/10 glass-nav shadow-2xl">
          {/* Mobile Brand Title */}
          <span className="font-poppins font-bold text-white text-[11px] tracking-[0.2em] uppercase select-none">
            MGC VOL 8
          </span>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white active:scale-90 transition-all duration-200 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? (
              // Close Icon "X"
              <svg className="w-4 h-4 text-[#D27000] fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-4 h-4 text-white fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* 3. Mobile Dropdown Menu Panel */}
        {isOpen && (
          <div className="absolute top-[calc(100%+10px)] left-0 right-0 rounded-2xl border border-white/10 glass-nav shadow-2xl flex flex-col gap-1.5 p-3.5 z-50 overflow-hidden animate-fade-in">
            {navItems.map((item) => {
              const href = item === "HOMEPAGE" 
                ? "/" 
                : `/#${item.toLowerCase().replace(/\s+/g, "-")}`;
              
              return (
                <a
                  key={item}
                  href={href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="w-full text-center py-2 sm:py-2.5 rounded-lg text-white font-poppins text-xs font-semibold tracking-wider hover:bg-[#D27000]/10 hover:text-[#D27000] transition-colors duration-200"
                >
                  {item}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
