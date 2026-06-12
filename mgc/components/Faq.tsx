"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqData = [
  {
    id: "1",
    question: "Kapan turnamen MGC Vol. 8 diselenggarakan?",
    answer: "Turnamen MGC Vol. 8: Violence District dijadwalkan akan resmi diselenggarakan mulai tanggal 22 Juli 2026 secara daring (online).",
  },
  {
    id: "2",
    question: "Bagaimana cara melakukan registrasi pendaftaran?",
    answer: "Pendaftaran dapat dilakukan dengan mengisi formulir registrasi yang akan tersedia di discord resmi kami di https://discord.gg/fXHWVZkGa.",
  },
  {
    id: "3",
    question: "Berapa total hadiah yang diperebutkan?",
    answer: "Total hadiah (Prize Pool) tunai resmi yang diperebutkan di turnamen MGC Vol. 8 ini adalah sebesar Rp 4.000.000 untuk juara kompetisi.",
  },
  {
    id: "4",
    question: "Apakah turnamen ini terbuka untuk umum?",
    answer: "Ya, turnamen MGC Vol. 8 ini terbuka untuk seluruh tim kompetitif umum yang memenuhi kriteria regulasi serta syarat pendaftaran resmi kami.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const accordionContainerRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

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

      // 2. Animasi Accordions
      if (accordionContainerRef.current) {
        gsap.fromTo(
          accordionContainerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: accordionContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-28 bg-black"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[800px] px-6 flex flex-col items-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-cinzel text-white text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase select-none text-center"
          style={{
            textShadow: "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)"
          }}
        >
          FAQ
        </h2>

        {/* Accordions */}
        <div
          ref={accordionContainerRef}
          className="w-full flex flex-col gap-4 mt-12 sm:mt-16 z-10"
        >
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="w-full rounded-[8px] bg-white/[0.02] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#D27000]/30"
              >
                {/* Header (Question Toggle) */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer select-none outline-none group"
                >
                  <span className="font-poppins font-semibold text-white text-sm sm:text-base tracking-wide transition-colors duration-300 group-hover:text-[#D27000]">
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <span className="flex-shrink-0 ml-4 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-[#D27000] group-hover:border-[#D27000]/40 transition-all duration-300">
                    <svg
                      className={`w-3.5 h-3.5 fill-current transform transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-[#D27000]" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </span>
                </button>

                {/* Content (Answer) */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-1 border-t border-white/5 text-white/70 font-poppins font-light text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
