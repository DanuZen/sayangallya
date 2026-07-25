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

interface CoupleGamesProps {
  standalone?: boolean;
}

export default function CoupleGames({ standalone = false }: CoupleGamesProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGuessOpen, setIsGuessOpen] = useState(false);

  const gameCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto py-4">
      {GAMES.map((game, i) => {
        const Icon = game.icon;
        const onOpen = game.id === "quiz" ? () => setIsQuizOpen(true) : () => setIsGuessOpen(true);
        const tilt = i === 0 ? -2 : 2;

        return (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: tilt }}
            whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 14 }}
            onClick={onOpen}
            className="cursor-pointer relative rounded-lg border border-black/5"
            style={{
              backgroundColor: "#FCFBF9",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25), 4px 4px 0px rgba(0,0,0,0.06)",
              padding: "14px 14px 32px",
            }}
          >
            {/* Tape effect */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-7 rounded-xs -rotate-1 z-10 opacity-60 shadow-sm"
              style={{ backgroundColor: "rgba(243,234,227,0.9)", border: "1px solid rgba(74,30,44,0.1)" }}
            />

            {/* Polaroid photo area — icon placeholder */}
            <div
              className="w-full aspect-video flex flex-col items-center justify-center rounded-xs"
              style={{ backgroundColor: "#4A1E2C" }}
            >
              <Icon size={40} color="#F3EAE3" strokeWidth={1.2} />
              <span className="font-dancing text-2xl mt-3" style={{ color: "rgba(243,234,227,0.7)" }}>
                {game.caption}
              </span>
            </div>

            {/* Caption area */}
            <div className="pt-4 px-1">
              <h3 className="font-dancing text-3xl mb-2" style={{ color: "#4A1E2C" }}>
                {game.label}
              </h3>
              <p className="font-poppins text-xs leading-relaxed" style={{ color: "rgba(74,30,44,0.6)" }}>
                {game.description}
              </p>
              <button
                className="mt-4 text-xs font-poppins font-semibold tracking-widest uppercase px-4 py-2 border rounded-md transition-all duration-200 hover:bg-[#4A1E2C] hover:text-white cursor-pointer"
                style={{ borderColor: "#4A1E2C", color: "#4A1E2C" }}
              >
                {game.buttonText}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  if (standalone) {
    return (
      <>
        {gameCards}
        <RelationshipQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
        <GuessPicture isOpen={isGuessOpen} onClose={() => setIsGuessOpen(false)} />
      </>
    );
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      id="games"
      style={{ backgroundColor: "#FCFBF9" }}
    >
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span
            className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-[#4A1E2C]/20"
            style={{ color: "#4A1E2C" }}
          >
            Fun & Games
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mt-3 text-[#4A1E2C]">
            Permainan Pasangan
          </h2>
        </motion.div>

        {gameCards}
      </div>

      <RelationshipQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <GuessPicture isOpen={isGuessOpen} onClose={() => setIsGuessOpen(false)} />
    </section>
  );
}
