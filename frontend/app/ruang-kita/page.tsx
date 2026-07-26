"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquareHeart, Dices, Plane, Music } from "lucide-react";
import CoupleGames from "@/components/CoupleGames";
import DateSpinner from "@/components/DateSpinner";
import LoveNotesBoard from "@/components/LoveNotesBoard";
import BucketList from "@/components/BucketList";
import MusicPlaylistBoard from "@/components/MusicPlaylistBoard";
import Image from "next/image";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";
import PasscodeGuard from "@/components/PasscodeGuard";
import { Dock, DockIcon } from "@/components/ui/dock";

type TabId = "games" | "spinner" | "notes" | "bucket" | "playlist";

export default function RuangKitaPage() {
  const [activeTab, setActiveTab] = useState<TabId>("notes");
  const [hoveredTab, setHoveredTab] = useState<TabId | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Unified Romantic Burgundy Active Style for All Tabs (No different color per tab)
  const unifiedActiveBg =
    "bg-[#4A1E2C] text-[#F3EAE3] ring-2 ring-rose-300/50 shadow-lg border border-white/20";

  const tabs = [
    {
      id: "games" as const,
      label: "Game Pasangan",
      icon: Dices,
      activeBg: unifiedActiveBg,
    },
    {
      id: "spinner" as const,
      label: "Date Spinner",
      icon: Sparkles,
      activeBg: unifiedActiveBg,
    },
    {
      id: "notes" as const,
      label: "Love Notes Board",
      icon: MessageSquareHeart,
      activeBg: unifiedActiveBg,
    },
    {
      id: "bucket" as const,
      label: "Mimpi Kita",
      icon: Plane,
      activeBg: unifiedActiveBg,
    },
    {
      id: "playlist" as const,
      label: "Playlist Musik",
      icon: Music,
      activeBg: unifiedActiveBg,
    },
  ];

  const handleTabSelect = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsPopupOpen(false); // Always reset popup state on tab change so dock is guaranteed visible!
  };

  return (
    <PasscodeGuard>
      <main className="h-screen w-screen overflow-hidden relative flex flex-col justify-between p-3 md:p-6 selection:bg-rose-300">
        
        {/* 🖼️ ROMANTIC LANDING PAGE STYLE BACKGROUND WITH PAPER TEXTURE & PINK GLOW */}
        <div
          className="absolute inset-0 z-0 scale-105 transition-transform duration-1000 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3A1020 0%, #521B2F 35%, #421426 70%, #220813 100%)" }}
        >
          {/* Paper Texture Overlay matching landing page */}
          <div className="absolute inset-0 z-0 opacity-45 mix-blend-soft-light pointer-events-none">
            <Image
              src="/kertas.jpg"
              alt="Paper Texture"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Romantic Pink & Rose Ambient Spotlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[950px] h-[650px] md:h-[950px] rounded-full bg-radial from-[#F7C6D9]/30 via-[#E88CA8]/15 to-transparent blur-3xl pointer-events-none z-0" />
        </div>

        {/* 👑 CLEAN HEADER */}
        <div className="z-10 relative flex justify-between items-center px-4 py-2 border-b border-rose-300/10">
          <div className="flex items-center gap-3">
            <h1 className="font-playfair text-xl md:text-2xl font-bold text-[#FFF0F5] tracking-wider flex items-center gap-2">
              RUANG KITA
              <span className="font-dancing text-rose-300 text-sm font-normal">
                Our Space
              </span>
            </h1>
          </div>
          <p className="font-poppins text-[10px] md:text-xs text-rose-200/60 font-light hidden sm:block">
            Ruang privat kenangan Allya & Danu
          </p>
        </div>

        {/* 🎭 MAIN STANDALONE BOARD CONTAINER */}
        <div className="z-10 relative flex-1 w-full max-w-7xl mx-auto my-2 overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full flex flex-col justify-center"
            >
              {activeTab === "games" && <CoupleGames standalone />}
              {activeTab === "spinner" && (
                <DateSpinner standalone onPopupStateChange={setIsPopupOpen} />
              )}
              {activeTab === "notes" && (
                <LoveNotesBoard standalone onPopupStateChange={setIsPopupOpen} />
              )}
              {activeTab === "bucket" && <BucketList standalone />}
              {activeTab === "playlist" && <MusicPlaylistBoard />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🎛️ MACOS STYLE MAGNIFIED FLOATING DOCK */}
        <div
          className={`z-40 relative flex flex-col items-center justify-center flex-shrink-0 pb-1 transition-all duration-300 ${
            isPopupOpen
              ? "opacity-0 pointer-events-none translate-y-6 scale-95"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <Dock iconSize={42} iconMagnification={58} iconDistance={140}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <DockIcon
                  key={tab.id}
                  isActive={isActive}
                  onClick={() => handleTabSelect(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative font-poppins text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                    isActive
                      ? `${tab.activeBg} px-4 py-2 sm:px-5 sm:py-2.5`
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {/* 🏷️ FLOATING HOVER TOOLTIP SIGN */}
                  <AnimatePresence>
                    {hoveredTab === tab.id && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[#4A1E2C] text-[#F3EAE3] text-[11px] font-poppins font-medium px-3 py-1 rounded-lg shadow-2xl border border-rose-300/40 whitespace-nowrap pointer-events-none z-50 flex items-center gap-1"
                      >
                        <span>{tab.label}</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#4A1E2C]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-2">
                    <Icon size={18} className={isActive ? "text-rose-200" : ""} />

                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="whitespace-nowrap overflow-hidden inline-block"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-full border border-rose-300/40 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </DockIcon>
              );
            })}
          </Dock>
        </div>

        {/* Floating Quick Access Menu */}
        <FloatingQuickAccess />
      </main>
    </PasscodeGuard>
  );
}
