"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Image as ImageIcon } from "lucide-react";
import RelationshipQuiz from "./RelationshipQuiz";
import GuessPicture from "./GuessPicture";

const GAMES = [
  {
    id: "quiz",
    icon: Gamepad2,
    label: "Kuis Hubungan",
    caption: "quiz",
    description: "Seberapa ingat kamu tentang detail kecil dari perjalanan cinta kita? Ayo buktikan di sini!",
    buttonText: "Mainkan Kuis",
  },
  {
    id: "guess",
    icon: ImageIcon,
    label: "Tebak Gambar",
    caption: "game",
    description: "Gambarnya sengaja disamarkan. Bisakah kamu menebak ini foto waktu kita lagi di mana?",
    buttonText: "Tebak Gambar",
  },
];

export default function CoupleGames() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGuessOpen, setIsGuessOpen] = useState(false);

  return (
    <section
      className="py-28 relative overflow-hidden"
      id="games"
      style={{ backgroundColor: "#F3EAE3" }}
    >
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-24 md:mb-32 relative flex flex-col items-center justify-center text-center pt-10"
        >
          {/* Decorative Top Element */}
          <div className="flex items-center gap-4 mb-4 opacity-70">
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#4A1E2C" strokeWidth={1.5} className="rotate-45">
              <rect x="4" y="4" width="16" height="16" rx="1" />
              <circle cx="12" cy="12" r="3" fill="#4A1E2C" opacity="0.5" />
            </svg>
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
          </div>

          {/* Title wrapper */}
          <div className="relative inline-block mt-2">
            {/* Teks 1 - outline stroke text, full section name */}
            <h2 className="font-playfair font-bold leading-none tracking-[0.15em] select-none"
              style={{ 
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(74, 30, 44, 0.4)"
              }}>
              MINI Games
            </h2>

            {/* Teks 2 - script, smaller, bottom-right corner */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-dancing text-[#4A1E2C] drop-shadow-sm absolute -bottom-4 right-0"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}
            >
              Playful
            </motion.div>
          </div>

          {/* Subtitle with flanking lines */}
          <div className="flex items-center justify-center mt-6 md:mt-10 w-full max-w-2xl px-4">
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#4A1E2C]/20" />
            <p className="font-poppins text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase text-[#4A1E2C]/50 relative z-10 px-4 md:px-8">
              A little test to see how well you remember our memories together!
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#4A1E2C]/20" />
          </div>
        </motion.div>

        {/* Game cards — Polaroid style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {GAMES.map((game, i) => {
            const Icon = game.icon;
            const isOpen = game.id === "quiz" ? isQuizOpen : isGuessOpen;
            const onOpen = game.id === "quiz" ? () => setIsQuizOpen(true) : () => setIsGuessOpen(true);
            const tilt = i === 0 ? -2.5 : 2;

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", stiffness: 90, damping: 14 }}
                onClick={onOpen}
                className="cursor-pointer relative"
                style={{
                  backgroundColor: "#FCFBF9",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.18), 5px 5px 0px rgba(0,0,0,0.06)",
                  padding: "14px 14px 50px",
                }}
              >
                {/* Tape effect */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-7 rounded-sm -rotate-1 z-10 opacity-60 shadow-sm"
                  style={{ backgroundColor: "rgba(243,234,227,0.9)", border: "1px solid rgba(74,30,44,0.1)" }} />

                {/* Polaroid photo area — icon placeholder */}
                <div className="w-full aspect-video flex flex-col items-center justify-center"
                  style={{ backgroundColor: "#4A1E2C" }}>
                  <Icon size={40} color="#F3EAE3" strokeWidth={1.2} />
                  <span className="font-dancing text-2xl mt-3" style={{ color: "rgba(243,234,227,0.7)" }}>
                    {game.caption}
                  </span>
                </div>

                {/* Caption area */}
                <div className="pt-4 px-1">
                  <h3 className="font-dancing text-3xl mb-2" style={{ color: "#4A1E2C" }}>{game.label}</h3>
                  <p className="font-poppins text-xs leading-relaxed" style={{ color: "rgba(74,30,44,0.6)" }}>
                    {game.description}
                  </p>
                  <button
                    className="mt-4 text-xs font-poppins font-semibold tracking-widest uppercase px-4 py-2 border transition-all duration-200 hover:opacity-70"
                    style={{ borderColor: "#4A1E2C", color: "#4A1E2C" }}
                  >
                    {game.buttonText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Game Modals */}
      <RelationshipQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <GuessPicture isOpen={isGuessOpen} onClose={() => setIsGuessOpen(false)} />
    </section>
  );
}
