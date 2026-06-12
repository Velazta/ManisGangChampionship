"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        lenis?.scrollTo(`#${targetId}`, {
          duration: 1.5,
          offset: 0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  };

  return (
    <footer className="relative w-full bg-zinc-950 text-white border-t border-white/5 py-12 md:py-16 overflow-hidden">
      {/* Background Radial Glow at the bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(210,112,0,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col gap-10">
        
        {/* Top Section: Logo & Brand Info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          
          {/* Logo & Title */}
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-3.5 group cursor-pointer">
                <Image src="/images/mgclogo.png" alt="MGC Logo" width={50} height={50} className="object-contain" />
             
              <div className="flex flex-col">
                <span className="font-poppins text-lg sm:text-xl font-normal tracking-wider text-white group-hover:text-[#D27000] transition-colors duration-300">
                  MANIS GANG
                </span>
                <span className="font-poppins text-[10px] text-white/50 tracking-[0.22em] uppercase">
                  CHAMPIONSHIP
                </span>
              </div>
            </div>
            
            <p className="font-poppins font-light text-xs sm:text-sm text-white/60 leading-relaxed mt-2">
              Official Tournament Page of Manis Gang Championship Vol 8: Violence District.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
            {[
              { label: "STORY", id: "story" },
              { label: "PRIZEPOOL", id: "prizepool" },
              { label: "RECAP", id: "recap" },
              { label: "STAFF", id: "staff" },
              { label: "SPONSORED", id: "sponsored" },
              { label: "FAQ", id: "faq" }
            ].map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="font-poppins text-xs font-semibold tracking-wider text-white/60 hover:text-[#D27000] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-white/5 w-full" />

        {/* Bottom Section: Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Left: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="font-poppins text-xs text-white/40 tracking-wider">
              &copy; 2026 Manis Gang Championship. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/10 font-light">|</span>
            <span className="font-poppins text-[11px] text-white/30 tracking-widest uppercase font-semibold">
              Official Manis Gang Championship Vol 8
            </span>
          </div>

          {/* Right: Social Media Links */}
          <div className="flex items-center gap-4">
            {/* Discord */}
            <a
              href="https://discord.gg/fXHWVZkGa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#D27000]/60 hover:bg-[#D27000]/10 transition-all duration-300 group shadow-md"
              aria-label="Discord"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@mgcturevent"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#D27000]/60 hover:bg-[#D27000]/10 transition-all duration-300 group shadow-md"
              aria-label="TikTok"
            >
              <svg className="w-4.5 h-4.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.99 1.23 2.37 2.11 3.89 2.5v3.91c-1.63-.07-3.21-.68-4.52-1.67-.65-.48-1.22-1.09-1.66-1.8v8.6c.07 1.83-.55 3.68-1.74 5.09-1.26 1.5-3.15 2.38-5.11 2.38-2.34-.05-4.55-1.31-5.69-3.34-1.27-2.22-1.13-5.09.35-7.16 1.3-1.84 3.47-2.88 5.74-2.71v3.93c-1.29-.11-2.58.42-3.35 1.47-.84 1.1-.82 2.67.04 3.76.8 1.03 2.16 1.48 3.42 1.11 1.08-.31 1.88-1.31 1.95-2.44.02-3.16-.01-6.32-.01-9.48-.03-2.6.01-5.2-.02-7.8z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@ManisGang0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#D27000]/60 hover:bg-[#D27000]/10 transition-all duration-300 group shadow-md"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
