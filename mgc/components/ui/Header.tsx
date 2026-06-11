"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

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

  return (
    <header 
      ref={navRef}
      className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-auto"
    >
      <nav className="flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-3 sm:py-3.5 rounded-full border border-white/10 glass-nav shadow-2xl">
        {["HOMEPAGE", "STORY", "PRIZEPOOL", "RECAP", "ABOUT US"].map((item) => {
          // Mengarahkan ke root homepage '/' atau anchor section di homepage
          const href = item === "HOMEPAGE" 
            ? "/" 
            : `/#${item.toLowerCase().replace(/\s+/g, "-")}`;
          
          return (
            <a
              key={item}
              href={href}
              onClick={(e) => handleNavClick(e, item)}
              className="text-white font-poppins text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
            >
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
