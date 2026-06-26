"use client";

import { useEffect, useRef, useState } from "react";

const playlist = [
  { 
    id: "1", 
    title: "Akuma no Ko", 
    src: "/audio/akuma no ko.mp3" 
  },
  { 
    id: "2", 
    title: "Memories - Maki", 
    src: "/audio/memories maki.mp3" 
  }
];

export default function AudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.05; 
    audioRef.current = audio;

    // Load initial track
    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    // Auto-play next track when current ends
    const handleEnded = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };
    audio.addEventListener("ended", handleEnded);

    // Attaching first interaction handlers for autoplay permissions
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Autoplay blocked, requires manual click:", err));
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  // 2. Handle track index changes (e.g. Next / Prev)
  useEffect(() => {
    if (!audioRef.current) return;

    const wasPlaying = isPlaying;
    const targetSrc = playlist[currentTrackIndex].src;

    // Only load if the source actually changed
    if (!audioRef.current.src.endsWith(targetSrc)) {
      audioRef.current.src = targetSrc;
      audioRef.current.load();

      if (wasPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Playback failed on track change:", err));
      }
    }
  }, [currentTrackIndex]);

  // 3. Play & Pause handler
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  // Skip to next track
  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Skip to previous track
  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center px-4 py-2 sm:py-2.5 rounded-full border border-white/10 glass-nav shadow-2xl gap-3 sm:gap-4 max-w-[280px] sm:max-w-xs overflow-hidden select-none">
      
      {/* 1. Play / Pause Button with soundwave bars */}
      <button
        onClick={togglePlay}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-timer flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md group shrink-0"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          /* Animated soundwave */
          <div className="flex items-end gap-[2px] h-[13px] w-[14px]">
            <span className="w-[2px] bg-white rounded-[1px] animate-bounce-custom-1"></span>
            <span className="w-[2px] bg-white rounded-[1px] animate-bounce-custom-2"></span>
            <span className="w-[2px] bg-white rounded-[1px] animate-bounce-custom-3"></span>
            <span className="w-[2px] bg-white rounded-[1px] animate-bounce-custom-4"></span>
          </div>
        ) : (
          /* Play Triangle SVG */
          <svg className="w-4.5 h-4.5 text-zinc-400 group-hover:text-white fill-current transition-colors translate-x-[1.5px]" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* 2. Track Details (Now Playing) */}
      <div className="flex flex-col min-w-[70px] sm:min-w-[90px] max-w-[120px] shrink-0">
        <span className="text-[8px] text-[#D27000] tracking-[0.18em] font-semibold uppercase leading-none">
          {isPlaying ? "NOW PLAYING" : "MUSIC PAUSED"}
        </span>
        <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide truncate mt-0.5" title={currentTrack.title}>
          {currentTrack.title}
        </span>
      </div>

      {/* 3. Navigation Controls (Prev / Next Buttons) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Previous Track */}
        <button
          onClick={handlePrev}
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#D27000]/40 hover:bg-[#D27000]/10 hover:text-[#D27000] text-zinc-400 flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Previous Track"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        {/* Next Track */}
        <button
          onClick={handleNext}
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#D27000]/40 hover:bg-[#D27000]/10 hover:text-[#D27000] text-zinc-400 flex items-center justify-center transition-all cursor-pointer active:scale-90"
          aria-label="Next Track"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z"/>
          </svg>
        </button>
      </div>

    </div>
  );
}
