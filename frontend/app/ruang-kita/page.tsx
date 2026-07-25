"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquareHeart, Dices, Plane, Music } from "lucide-react";
import CoupleGames from "@/components/CoupleGames";
import DateSpinner from "@/components/DateSpinner";
import LoveNotesBoard from "@/components/LoveNotesBoard";
import BucketList from "@/components/BucketList";
import MusicPlaylistBoard from "@/components/MusicPlaylistBoard";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";

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
    <main className="h-screen w-screen overflow-hidden relative flex flex-col justify-between p-3 md:p-6 selection:bg-rose-300">
      
      {/* 🖼️ ROMANTIC PHOTO BACKGROUND WITH GLASS OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/images/ruang-kita-bg.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#180A15]/80 via-[#2A111F]/70 to-[#180A15]/85 backdrop-blur-[2px]" />
        
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 👑 CLEAN HEADER */}
      <div className="text-center pt-1 md:pt-2 z-10 relative max-w-xl mx-auto flex-shrink-0">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/40" />
          <h1 className="font-playfair font-extrabold text-2xl sm:text-4xl text-[#FCFBF9] tracking-[0.16em] drop-shadow-md inline-flex items-center gap-2 select-none">
            RUANG KITA
            <span className="font-dancing text-xl sm:text-2xl text-rose-200 font-normal">Our Space</span>
          </h1>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/40" />
        </div>
      </div>

      {/* 🏛️ FRAMELESS DIRECT DISPLAY (Zero Scrollbar Indicator) */}
      <div className="flex-1 w-full max-w-5xl mx-auto z-10 my-2 relative overflow-y-auto no-scrollbar flex flex-col justify-center px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full my-auto"
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

      {/* 🎛️ DYNAMIC EXPANDING FLOATING DOCK WITH HOVER TOOLTIP SIGN */}
      <div
        className={`z-40 relative flex flex-col items-center justify-center flex-shrink-0 pb-1 transition-all duration-300 ${
          isPopupOpen
            ? "opacity-0 pointer-events-none translate-y-6 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-black/65 backdrop-blur-2xl rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative flex items-center justify-center rounded-full font-poppins text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${tab.activeBg} px-4 py-2 sm:px-5 sm:py-2.5`
                    : "text-white/60 hover:text-white hover:bg-white/10 p-2.5 sm:p-3"
                }`}
              >
                {/* 🏷️ FLOATING HOVER TOOLTIP SIGN (Appears above non-active icons on hover) */}
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
                      {/* Downward Arrow Pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#4A1E2C]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Icon size={18} className={isActive ? "text-rose-200" : ""} />

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="whitespace-nowrap overflow-hidden inline-block"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full border border-rose-300/40 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Quick Access Menu */}
      <FloatingQuickAccess />
    </main>
  );
}
