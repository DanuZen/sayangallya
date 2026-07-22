"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ============================================================
// EDIT DATA DI SINI - Ganti teks & foto sesuai cerita kalian
// ============================================================
const STEPS = [
  {
    type: "welcome",
    title: "Hei, sayang...",
    subtitle: "Ada sesuatu yang ingin aku tunjukkan.",
    caption: "Sebuah tempat kecil yang aku buat khusus untuk kita. 💕",
  },
  {
    type: "memory",
    date: "20 September 2023",
    label: "Awal Segalanya",
    title: "First Time We Met",
    caption: "Hari pertama kita bertemu. Aku langsung tahu, ada sesuatu yang spesial dari dirimu.",
    image: "/images/dummy-photo.png",
    emoji: "🌸",
  },
  {
    type: "memory",
    date: "15 November 2023",
    label: "Petualangan Pertama",
    title: "Our First Trip",
    caption: "Perjalanan pertama kita. Meski sederhana, itu adalah salah satu hari terbaik dalam hidupku.",
    image: "/images/dummy-photo.png",
    emoji: "🗺️",
  },
  {
    type: "memory",
    date: "14 Februari 2024",
    label: "Momen Spesial",
    title: "Valentine's Day",
    caption: "Kamu memberiku surat tulisan tanganmu. Sampai sekarang masih kusimpan di dompet.",
    image: "/images/dummy-photo.png",
    emoji: "💌",
  },
  {
    type: "closing",
    title: "Dan ini baru permulaan...",
    subtitle: "Masih banyak halaman yang akan kita tulis bersama.",
    caption: "Selamat datang di cerita kita. ❤️",
  },
];
// ============================================================

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      handleEnter();
    }
  };

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onFinish, 1000);
  };

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden cursor-pointer select-none"
          style={{ background: "linear-gradient(135deg, #2D0D1A 0%, #4A1E2C 40%, #3A1525 70%, #1E0810 100%)" }}
          onClick={goNext}
        >
          {/* Deep vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(10,2,6,0.55) 100%)"
          }} />

          {/* Center warm glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(140,45,65,0.45) 0%, transparent 65%)"
          }} />

          {/* Ambient orb top-right */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(180,60,80,0.4) 0%, transparent 70%)" }}
          />

          {/* Ambient orb bottom-left */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(120,30,60,0.45) 0%, transparent 70%)" }}
          />

          {/* Decorative circle outlines */}
          <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full pointer-events-none" style={{ border: "1px solid rgba(243,234,227,0.08)" }} />
          <div className="absolute -top-14 -left-14 w-44 h-44 rounded-full pointer-events-none" style={{ border: "1px solid rgba(243,234,227,0.05)" }} />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none" style={{ border: "1px solid rgba(243,234,227,0.08)" }} />
          <div className="absolute -bottom-14 -right-14 w-52 h-52 rounded-full pointer-events-none" style={{ border: "1px solid rgba(243,234,227,0.05)" }} />

          {/* Subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Top decorative feather left */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-8 opacity-20 w-16 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="fill-[#F3EAE3]">
              <path d="M50 0 C40 20 20 40 30 70 C35 85 50 100 50 100 C50 100 65 85 70 70 C80 40 60 20 50 0 Z M50 20 C45 40 40 60 45 80 C50 70 55 50 50 20 Z" />
            </svg>
          </motion.div>

          {/* Top decorative feather right */}
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-24 right-10 opacity-15 w-12 pointer-events-none transform scale-x-[-1]"
          >
            <svg viewBox="0 0 100 100" className="fill-[#F3EAE3]">
              <path d="M50 0 C40 20 20 40 30 70 C35 85 50 100 50 100 C50 100 65 85 70 70 C80 40 60 20 50 0 Z M50 20 C45 40 40 60 45 80 C50 70 55 50 50 20 Z" />
            </svg>
          </motion.div>

          {/* Step Content Area */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center overflow-hidden px-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-lg flex flex-col items-center text-center"
              >
                {/* WELCOME STEP */}
                {current.type === "welcome" && (
                  <div className="flex flex-col items-center gap-4">
                    {/* Decorative top line ornament */}
                    <div className="flex items-center gap-3 mb-2 opacity-40">
                      <div className="w-12 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                      <svg width={10} height={10} viewBox="0 0 10 10" fill="#F3EAE3"><polygon points="5,0 10,5 5,10 0,5" /></svg>
                      <div className="w-12 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                    </div>

                    <motion.div
                      animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="mb-2"
                    >
                      {/* Elegant outline heart icon */}
                      <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="#F3EAE3" strokeWidth={0.8} className="drop-shadow-[0_0_16px_rgba(243,234,227,0.5)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </motion.div>
                    
                    <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight tracking-wide" style={{ color: "#F3EAE3" }}>
                      {current.title}
                    </h1>
                    
                    <div className="w-16 h-[1px] my-2" style={{ backgroundColor: "rgba(243,234,227,0.2)" }} />
                    
                    <p className="font-poppins text-base md:text-lg font-light tracking-widest leading-relaxed" style={{ color: "rgba(243,234,227,0.65)" }}>
                      {current.subtitle}
                    </p>
                    
                    <p className="font-dancing text-3xl md:text-4xl mt-2" style={{ color: "rgba(243,234,227,0.9)" }}>
                      {current.caption}
                    </p>

                    {/* Decorative bottom line ornament */}
                    <div className="flex items-center gap-3 mt-4 opacity-30">
                      <div className="w-8 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F3EAE3" }} />
                      <div className="w-8 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                    </div>
                  </div>
                )}

                {/* MEMORY STEP */}
                {current.type === "memory" && (() => {
                  const isFlipped = step % 2 !== 0;
                  const polaroidEl = (
                    <motion.div
                      key="polaroid"
                      initial={{ opacity: 0, x: isFlipped ? 40 : -40 }}
                      animate={{ opacity: 1, x: 0, rotate: isFlipped ? 3 : -3 }}
                      transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
                      className="relative flex-shrink-0 w-[320px] md:w-[420px]"
                      style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.6))" }}
                    >
                      {/* Tape */}
                      <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-7 rounded-sm shadow-sm z-10 opacity-80 rotate-1"
                        style={{ backgroundColor: "rgba(243,234,227,0.85)" }}
                      />
                      {/* Polaroid frame */}
                      <div className="bg-[#FCFBF9] p-4 pb-14">
                        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                          <Image src={current.image!} alt={current.title!} fill className="object-cover" />
                        </div>
                        <p className="font-dancing text-center text-maroon text-2xl mt-4">{current.title}</p>
                      </div>
                    </motion.div>
                  );

                  const textEl = (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, x: isFlipped ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      className={`flex flex-col justify-center gap-5 flex-1 min-w-[260px] self-stretch py-4 ${isFlipped ? "text-right items-end" : "text-left"}`}
                    >
                      {/* Emoji + label */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{current.emoji}</span>
                        <span className="font-poppins text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(243,234,227,0.5)" }}>
                          {current.label}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="font-poppins text-[11px] tracking-[0.2em]" style={{ color: "rgba(243,234,227,0.3)" }}>
                        {current.date}
                      </p>

                      {/* Title */}
                      <h2 className="font-dancing text-3xl md:text-4xl leading-snug" style={{ color: "rgba(243,234,227,0.95)" }}>
                        {current.title}
                      </h2>

                      {/* Divider */}
                      <div className="w-12 h-[1px]" style={{ backgroundColor: "rgba(243,234,227,0.2)" }} />

                      {/* Caption */}
                      <p className="font-poppins text-base md:text-lg leading-[1.9] tracking-wide" style={{ color: "rgba(243,234,227,0.75)" }}>
                        {current.caption}
                      </p>

                      {/* Bottom ornament */}
                      <div className="flex items-center gap-2 mt-1 opacity-25">
                        <div className="w-10 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F3EAE3" }} />
                        <div className="w-10 h-[1px]" style={{ backgroundColor: "#F3EAE3" }} />
                      </div>
                    </motion.div>
                  );

                  return (
                    <div className="flex flex-row items-center justify-center gap-16 md:gap-24 w-full max-w-5xl mx-auto px-6">
                      {isFlipped ? textEl : polaroidEl}
                      {isFlipped ? polaroidEl : textEl}
                    </div>
                  );
                })()}



                {/* CLOSING STEP */}
                {current.type === "closing" && (
                  <div className="flex flex-col items-center gap-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                      className="text-6xl"
                    >
                      ❤️
                    </motion.div>
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold leading-snug" style={{ color: "#F3EAE3" }}>
                      {current.title}
                    </h1>
                    <p className="font-poppins text-base leading-relaxed" style={{ color: "rgba(243,234,227,0.7)" }}>{current.subtitle}</p>
                    <p className="font-dancing text-2xl" style={{ color: "rgba(243,234,227,0.9)" }}>{current.caption}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Dots */}
          <div className="relative z-10 pb-10 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === step ? 24 : 8,
                    backgroundColor: i === step ? "#F3EAE3" : "rgba(243,234,227,0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
            <motion.p
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-xs font-poppins tracking-widest uppercase"
              style={{ color: "rgba(243,234,227,0.5)" }}
            >
              {isLast ? "Tap untuk masuk ❤️" : "Tap untuk lanjut"}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
