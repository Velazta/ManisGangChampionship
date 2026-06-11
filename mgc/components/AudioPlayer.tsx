"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Membuat instance audio saat komponen di-mount
    // Aset diletakkan di public/audio/background-theme.mp3
    const audio = new Audio("/audio/akuma no ko.mp3");
    audio.loop = true;
    audio.volume = 0.05; // Atur volume agar tidak terlalu keras (5%)
    audioRef.current = audio;

    // Upaya autoplay saat pertama kali interaksi terdeteksi (opsional)
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Autoplay diblokir browser, memerlukan klik manual:", err));
      }
      // Bersihkan event listener setelah interaksi pertama
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Gagal memutar audio:", err));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Tombol Melayang Glassmorphism */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full glass-timer flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg group"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          /* Animasi Soundwave / Equalizer saat musik menyala */
          <div className="flex items-end gap-[3px] h-[16px] w-[18px]">
            <span className="w-[3px] bg-white rounded-[1px] animate-bounce-custom-1"></span>
            <span className="w-[3px] bg-white rounded-[1px] animate-bounce-custom-2"></span>
            <span className="w-[3px] bg-white rounded-[1px] animate-bounce-custom-3"></span>
            <span className="w-[3px] bg-white rounded-[1px] animate-bounce-custom-4"></span>
          </div>
        ) : (
          /* Icon Volume Muted saat musik mati */
          <svg
            className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        )}
      </button>

      {/* Label Keterangan Kecil yang muncul saat musik menyala */}
      {isPlaying && (
        <span className="text-white/60 font-poppins text-[10px] tracking-widest uppercase animate-fade-in select-none">
          Playing Music
        </span>
      )}
    </div>
  );
}
