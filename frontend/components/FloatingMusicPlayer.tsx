"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isExpanded = isPlaying || isHovered;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
      if (!hasStarted) setHasStarted(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        width: isExpanded ? 246 : 68
      }}
      transition={{ 
        opacity: { duration: 1, delay: 1.5 },
        y: { duration: 1, delay: 1.5 },
        width: { duration: 0.4, type: "spring", bounce: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-[999] flex items-center gap-4 bg-[#FCFBF9]/90 backdrop-blur-md border border-[#F3EAE3] rounded-full p-1.5 shadow-[0_8px_25px_rgba(74,30,44,0.15)] overflow-hidden"
    >
      {/* 
        GANTI SRC AUDIO INI DENGAN LAGU PILIHANMU! 
        Contoh: simpan file "lagu-kita.mp3" di folder public/ 
        lalu ubah src menjadi src="/lagu-kita.mp3"
      */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      {/* Play/Pause Button - Premium Vinyl Record Style */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-[#1B1425] text-[#F3EAE3] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-[3px] border-[#FCFBF9]"
      >
        {/* Vinyl Grooves */}
        <div className="absolute inset-1 rounded-full border border-white/10" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
        
        {/* Record Label / Play Icon */}
        <div className="relative w-5 h-5 rounded-full bg-maroon flex items-center justify-center shadow-inner">
          {isPlaying ? (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="5" height="18" rx="1" />
              <rect x="14" y="3" width="5" height="18" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Spinning animation overlay when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.1) 15%, transparent 30%)" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Track Info Marquee */}
      <div className="flex flex-col overflow-hidden flex-shrink-0 w-36 pointer-events-none select-none">
        <span className="font-poppins text-[9px] uppercase tracking-[0.25em] text-maroon/60 font-semibold">
          Now Playing
        </span>
        <div className="relative w-full h-6 overflow-hidden mt-0.5" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <motion.div
            animate={isPlaying ? { x: ["0%", "-50%"] } : { x: "0%" }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute whitespace-nowrap font-dancing text-lg text-maroon/90 flex gap-2 drop-shadow-sm"
          >
            <span>Our Love Story Soundtrack •</span>
            <span>Our Love Story Soundtrack •</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
