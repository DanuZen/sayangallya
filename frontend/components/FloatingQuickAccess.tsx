"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Heart,
  Home,
  X,
  Play,
  Pause,
  SkipForward,
  Music,
} from "lucide-react";

export default function FloatingQuickAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isPlaying, togglePlay, currentTrack, playTrack, currentTrackIndex, playlist } = useAudio();

  const navItems = [
    {
      id: "home",
      label: "Beranda",
      href: "/",
      icon: Home,
      color: "bg-rose-100 text-rose-800",
    },
    {
      id: "our-space",
      label: "Ruang Kita",
      href: "/ruang-kita",
      icon: Heart,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % playlist.length;
    playTrack(nextIdx);
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-end gap-3 pointer-events-auto select-none">
      
      {/* Expanded Menu Stack (Unified Liquid Origin Anchor at Bottom Right Trigger) */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 16 }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "bottom right" }}
            className="flex flex-col items-end gap-2.5 mb-1 w-60 origin-bottom-right"
          >
            {/* Music Control Widget Inside Floating Menu */}
            <div className="bg-[#FAF5EF]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#4A1E2C]/15 w-full flex flex-col gap-2.5">
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                <span className="font-poppins text-[10px] uppercase tracking-widest text-[#4A1E2C]/70 font-bold flex items-center gap-1">
                  <Music size={12} className="text-rose-500" /> Pemutar Musik
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 text-rose-500">
                    <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce" />
                    <span className="w-1 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-3.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                )}
              </div>

              {/* Track Name */}
              <div className="w-full min-w-0">
                <p className="font-dancing text-lg text-[#3A1420] font-bold truncate leading-snug" title={currentTrack.title}>
                  {currentTrack.title}
                </p>
                <p className="font-poppins text-[10px] text-gray-500 font-medium truncate" title={currentTrack.artist}>
                  {currentTrack.artist}
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={togglePlay}
                  className="flex-1 py-2 px-3 bg-[#4A1E2C] text-[#F3EAE3] rounded-xl flex items-center justify-center gap-1.5 text-xs font-poppins font-medium shadow-xs hover:bg-rose-900 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={14} /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" /> Play Musik
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-2 text-[#4A1E2C] hover:bg-black/5 rounded-xl transition-colors ml-1 cursor-pointer"
                  title="Lagu Berikutnya"
                >
                  <SkipForward size={16} />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <div key={item.id} className="w-full">
                  <Link href={item.href} onClick={() => setIsOpen(false)} className="w-full block">
                    <div
                      className={`flex items-center justify-between px-4 py-2.5 rounded-full shadow-md border border-white/40 backdrop-blur-md transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#4A1E2C] text-[#F3EAE3] ring-2 ring-rose-300/60"
                          : "bg-white/90 text-[#4A1E2C] hover:bg-white hover:scale-[1.02]"
                      }`}
                    >
                      <span className="font-poppins text-xs font-semibold tracking-wide">
                        {item.label}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isActive ? "bg-white/20 text-[#F3EAE3]" : item.color
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`relative group p-3.5 md:p-4 rounded-full shadow-xl border-2 border-white/60 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
          isOpen
            ? "bg-[#4A1E2C] text-white"
            : "bg-gradient-to-r from-[#4A1E2C] to-[#6A2B3F] text-[#F3EAE3]"
        }`}
        title="Menu Navigasi & Musik"
      >
        {/* Glow pulse indicator when music is playing */}
        {isPlaying && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1.5"
            >
              <Compass size={22} />
              <span className="hidden group-hover:inline font-poppins text-xs font-medium pl-1 tracking-wider uppercase">
                Menu
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
