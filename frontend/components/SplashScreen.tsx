"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ============================================================
// EDIT DATA DI SINI - Ganti teks & foto sesuai cerita kalian
// ============================================================
const STEPS = [
  {
    type: "welcome", // Layar sambutan
    title: "Hei, sayang...",
    subtitle: "Ada sesuatu yang ingin aku tunjukkan.",
    caption: "Sebuah tempat kecil yang aku buat khusus untuk kita. 💕",
  },
  {
    type: "memory", // Slide foto + kenangan
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
    type: "closing", // Layar penutup sebelum masuk
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
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-cream cursor-pointer select-none"
          onClick={goNext}
        >
          {/* Fixed Background — Blurred, stays still */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-bg.png" alt="bg" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-peachglow/50 via-cream/80 to-lavender/40" />
          </div>

          {/* Floating petal decoration */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute z-0 pointer-events-none"
              style={{ left: `${15 + i * 15}%`, top: "-4%" }}
              animate={{ y: ["0vh", "110vh"], rotate: [0, 360], opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 18 + i * 3, repeat: Infinity, delay: i * 2.5, ease: "linear" }}
            >
              <svg width={12 + i * 3} height={12 + i * 3} viewBox="0 0 24 24" fill="currentColor" className="text-rose/40">
                <path d="M12,2 C12,2 4,8 4,14 C4,18.418 7.582,22 12,22 C16.418,22 20,18.418 20,14 C20,8 12,2 12,2 Z" />
              </svg>
            </motion.div>
          ))}

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
                  <div className="flex flex-col items-center gap-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="w-24 h-24 bg-white/70 backdrop-blur-md rounded-full border border-rose/30 shadow-2xl flex items-center justify-center"
                    >
                      <svg width={44} height={44} viewBox="0 0 24 24" fill="currentColor" className="text-rose drop-shadow-[0_0_14px_rgba(232,140,168,0.8)]">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </motion.div>
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                      {current.title}
                    </h1>
                    <p className="font-poppins text-lg text-charcoal/70 leading-relaxed">{current.subtitle}</p>
                    <p className="font-dancing text-rose text-2xl">{current.caption}</p>
                  </div>
                )}

                {/* MEMORY STEP */}
                {current.type === "memory" && (
                  <div className="flex flex-col items-center w-full px-2">
                    {/* Polaroid Card */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: step % 2 === 0 ? -3 : 3 }} // Alternate tilts
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="bg-white rounded-sm p-4 pb-6 w-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] relative"
                      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.13), 4px 4px 0px rgba(0,0,0,0.04)' }}
                    >
                      {/* Subtle tape effect on top */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-7 bg-peachglow/60 backdrop-blur-sm rounded-sm rotate-1 opacity-80 shadow-sm z-10" />

                      {/* Photo Area */}
                      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-4 border border-bordergray/30">
                        <Image src={current.image!} alt={current.title!} fill className="object-cover" />
                      </div>

                      {/* Content Area */}
                      <div className="px-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                           <span className="text-base">{current.emoji}</span>
                           <span className="text-[11px] font-poppins text-rose/80 font-semibold tracking-widest uppercase">
                             {current.date} • {current.label}
                           </span>
                        </div>
                        <h2 className="font-dancing text-3xl text-charcoal mb-2 leading-snug">{current.title}</h2>
                        <p className="font-poppins text-sm md:text-base text-charcoal/70 leading-relaxed">{current.caption}</p>
                      </div>
                    </motion.div>
                  </div>
                )}

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
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal leading-snug">
                      {current.title}
                    </h1>
                    <p className="font-poppins text-base text-charcoal/70 leading-relaxed">{current.subtitle}</p>
                    <p className="font-dancing text-rose text-2xl">{current.caption}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Dots — passive indicator only */}
          <div className="relative z-10 pb-10 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === step ? 24 : 8, backgroundColor: i === step ? "#E88CA8" : "#E8DFF5" }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
            <motion.p
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-xs text-charcoal/40 font-poppins tracking-widest uppercase"
            >
              {isLast ? "Tap untuk masuk ❤️" : "Tap untuk lanjut"}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
