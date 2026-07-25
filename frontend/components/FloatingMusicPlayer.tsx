"use client";

import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Disc } from "lucide-react";

export default function FloatingMusicPlayer() {
  const { isPlaying, currentTrack, showToast, dismissToast } = useAudio();

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={dismissToast}
          className="fixed bottom-6 left-6 z-[99999] cursor-pointer flex items-center group pointer-events-auto"
          title="Klik untuk menutup notifikasi"
        >
          {/* Main Capsule Body (Expands Out From Behind the Vinyl Circle) */}
          <motion.div
            initial={{ width: 48, opacity: 0.8 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 48, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1], // Smooth cubic bezier expansion
              delay: 0.1,
            }}
            className="flex items-center bg-[#FAF5EF]/95 backdrop-blur-md border border-[#4A1E2C]/20 rounded-full pl-1.5 pr-6 py-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Spinning Vinyl Record Badge (Pops In First) */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="relative flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-[#2A111F] text-[#F3EAE3] shadow-md border-2 border-white overflow-hidden z-10"
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-1 rounded-full border border-white/15" />

              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Disc size={20} className="text-rose-300" />
              </motion.div>
            </motion.div>

            {/* Track Information (Slides & Fades Out from Circle) */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32, delay: 0.25 }}
              className="flex flex-col select-none max-w-[200px] ml-3 whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-[#4A1E2C]/80 font-bold font-poppins">
                <Music size={10} className="text-rose-600 animate-pulse" />
                {isPlaying ? "Sedang Diputar" : "Musik Dihentikan"}
              </div>
              <p className="font-dancing text-lg text-[#3A1420] font-bold truncate leading-tight mt-0.5">
                {currentTrack.title}
              </p>
              <p className="font-poppins text-[10px] text-black/50 font-medium truncate">
                {currentTrack.artist}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
