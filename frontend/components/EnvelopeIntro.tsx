"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LETTER_LINES = [
  "Hei, sayang...",
  "Aku tahu kita sering sibuk dan",
  "jarak kadang terasa berat.",
  " ",
  "Tapi aku mau kamu tahu — setiap",
  "detik bersamamu adalah hal",
  "paling berharga yang kumiliki.",
  " ",
  "Website ini aku buat khusus",
  "untukmu. Sebagai tempat kita.",
  " ",
  "Dengan penuh cinta,",
  "— Aku  ♡",
];

type Phase = "idle" | "opening" | "peeking" | "reading" | "done";

export default function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("opening");
      setTimeout(() => setPhase("peeking"), 950);
    } else if (phase === "peeking") {
      setPhase("reading");
    } else if (phase === "reading") {
      setPhase("done");
      setTimeout(onDone, 700);
    }
  };

  // How far the letter peeks above the envelope top
  const PEEK_Y = -120; // px above envelope top edge

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8 }}
      onClick={handleTap}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      {/* ── Background photo + maroon overlay ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="bg"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(58,18,28,0.82) 0%, rgba(74,30,44,0.70) 50%, rgba(48,14,22,0.88) 100%)",
          }}
        />
      </div>

      {/* ── Decorative feathers ── */}
      {[
        { style: { top: "8%",  left: "5%",  width: 56 }, r: -18, delay: 0   },
        { style: { top: "12%", right: "6%", width: 44 }, r:  22, delay: 1.2 },
        { style: { top: "72%", left: "4%",  width: 38 }, r: -10, delay: 0.6 },
        { style: { top: "75%", right: "5%", width: 50 }, r:  15, delay: 2   },
      ].map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ ...f.style, opacity: 0.18, rotate: f.r }}
          animate={{ y: [0, -14, 0], rotate: [f.r, f.r + 5, f.r] }}
          transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 80 160" fill="#F3EAE3">
            <path d="M40 0 C32 25 15 55 22 100 C27 128 40 160 40 160 C40 160 53 128 58 100 C65 55 48 25 40 0 Z" />
            <path d="M40 15 C36 45 32 80 36 120 C40 105 44 70 40 15 Z" fill="rgba(74,30,44,0.2)" />
          </svg>
        </motion.div>
      ))}

      {/* ── ENVELOPE + LETTER SCENE ── */}
      {/*
        Layering (bottom → top):
          z-0  : envelope back
          z-10 : letter (narrower, slides up)
          z-20 : front flaps (left, right, bottom) — masks letter while inside
          z-30 : top flap (rotates open)
      */}
      <motion.div
        className="relative z-10 scale-110 sm:scale-125 md:scale-150"
        style={{ width: 300, perspective: "1200px" }}
        animate={phase === "idle" ? { rotate: [-1, 1, -1], x: [-4, 4, -4] } : { rotate: 0, x: 0 }}
        transition={phase === "idle" ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      >

        {/* ── LETTER (Wrapped in a clipping mask so it doesn't stick out the bottom!) ── */}
        <AnimatePresence>
          {(phase === "peeking" || phase === "reading") && (
            <div 
              className="absolute z-10"
              style={{ 
                left: 14, 
                right: 14, 
                bottom: 2, // Slightly above the absolute bottom to fit inside the flap
                height: 1000, // Extends way up to allow peeking
                overflow: "hidden", // Clips the bottom!
                pointerEvents: "none"
              }}
            >
              <motion.div
                initial={{ y: 1000 - 180, opacity: 1 }} // Starts hidden inside (envelope height is 190)
                animate={
                  phase === "reading"
                    ? { y: 1000 - 180, opacity: 0, transition: { duration: 0.4 } }
                    : { y: 1000 - 320, transition: { duration: 1.1, type: "spring", stiffness: 60, damping: 13 } } // Slides up to peek
                }
                exit={{ y: 1000 - 180, opacity: 0 }}
                className="absolute w-full"
              >
                {/* Physical letter paper */}
                <div
                  style={{
                    backgroundColor: "#F7F2E8",
                    backgroundImage: `
                      repeating-linear-gradient(
                        transparent,
                        transparent 23px,
                        rgba(139,108,80,0.12) 23px,
                        rgba(139,108,80,0.12) 24px
                      )
                    `,
                    backgroundPosition: "0 32px",
                    boxShadow: "0 -6px 20px rgba(0,0,0,0.15)",
                    padding: "18px 20px 40px",
                    minHeight: 400, // Ensure it's long enough
                  }}
                >
                  {/* Monogram / decorative top */}
                  <div className="flex items-center justify-center mb-3">
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid rgba(139,90,90,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="rgba(180,80,80,0.7)">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>

                  {/* Letter text lines */}
                  {LETTER_LINES.map((line, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "font-dancing text-xl mb-1"
                          : i === LETTER_LINES.length - 1
                          ? "font-dancing text-lg text-right mt-2"
                          : i === LETTER_LINES.length - 2
                          ? "font-dancing text-sm"
                          : "font-poppins text-[11px] leading-[24px]"
                      }
                      style={{
                        color:
                          i === 0
                            ? "rgba(100,40,40,0.95)"
                            : i >= LETTER_LINES.length - 2
                            ? "rgba(120,55,55,0.85)"
                            : line === " "
                            ? "transparent"
                            : "rgba(60,40,30,0.75)",
                        margin: 0,
                        lineHeight: line === " " ? "24px" : undefined,
                      }}
                    >
                      {line === " " ? "\u00A0" : line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── ENVELOPE BODY 300×190 ── */}
        <div className="relative" style={{ height: 190 }}>

          {/* 1. Back */}
          <motion.div
            animate={
              phase === "done"
                ? { y: 250, opacity: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(145deg, #f0e4d8 0%, #f8f3ed 60%, #ede1d4 100%)",
              border: "1px solid #ddd0c4",
              boxShadow: "0 24px 70px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.03)",
            }}
          />

          {/* 2. Front flaps — masks letter bottom while inside */}
          <motion.div
            animate={
              phase === "done"
                ? { y: 250, opacity: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <svg viewBox="0 0 300 190" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fg2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#faf5ef" />
                  <stop offset="100%" stopColor="#ede3d8" />
                </linearGradient>
                <linearGradient id="bfg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5ede3" />
                  <stop offset="100%" stopColor="#e8d9ca" />
                </linearGradient>
                <filter id="bs2">
                  <feDropShadow dx="0" dy="-2" stdDeviation="3" floodColor="#5a3020" floodOpacity="0.08" />
                </filter>
              </defs>
              {/* Left triangle */}
              <polygon points="0,0 150,96 0,190" fill="url(#fg2)" stroke="#d9cab8" strokeWidth="0.8" />
              {/* Right triangle */}
              <polygon points="300,0 150,96 300,190" fill="url(#fg2)" stroke="#d9cab8" strokeWidth="0.8" />
              {/* Bottom triangle — key: masks letter bottom */}
              <polygon
                points="0,190 150,90 300,190"
                fill="url(#bfg2)"
                filter="url(#bs2)"
                stroke="#d9cab8"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* 3. Top flap */}
          <motion.div
            animate={
              phase === "done"
                ? { y: 250, opacity: 0, rotateX: -178, zIndex: 5 }
                : phase === "opening" || phase === "peeking"
                ? { rotateX: -178, y: 0, opacity: 1, zIndex: 5 }
                : { rotateX: 0, y: 0, opacity: 1, zIndex: 30 }
            }
            transition={{
              rotateX: { duration: 0.85, ease: [0.3, 1.1, 0.6, 1] },
              y: { duration: 0.7, ease: "easeIn" },
              opacity: { duration: 0.5 },
              zIndex: { delay: phase === "idle" ? 0 : 0.35 } // Flips behind the letter exactly as it points straight up
            }}
            className="absolute top-0 left-0 right-0 origin-top pointer-events-none"
          >
            <svg
              viewBox="0 0 300 106"
              className="w-full overflow-visible"
              style={{ height: 106, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))" }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="tg2" x1="0" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#fdfaf6" />
                  <stop offset="100%" stopColor="#f0e6da" />
                </linearGradient>
              </defs>
              <polygon points="0,0 150,102 300,0" fill="url(#tg2)" stroke="#d9cab8" strokeWidth="1" />
            </svg>

            {/* Wax seal */}
            <motion.div
              animate={
                phase !== "idle"
                  ? { opacity: 0, scale: 0.3, y: -5 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                bottom: -18,
                background: "radial-gradient(circle at 35% 35%, #d9385e, #6e0a1c)",
                boxShadow: "0 3px 12px rgba(110,10,28,0.55), inset 0 1px 2px rgba(255,255,255,0.15)",
                border: "2px solid #9a1228",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,180,195,0.9)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── FULL LETTER MODAL ── */}
      <AnimatePresence>
        {phase === "reading" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40"
              style={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(48,14,22,0.55)" }}
            />

            <motion.div
              initial={{ y: 60, opacity: 0, rotate: -1.5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.65, type: "spring", stiffness: 110, damping: 18 }}
              className="absolute z-50 overflow-hidden w-[90vw] max-w-[360px] sm:max-w-[420px] md:max-w-[480px]"
              style={{
                backgroundColor: "#F7F2E8",
                backgroundImage: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 31px,
                    rgba(139,108,80,0.12) 31px,
                    rgba(139,108,80,0.12) 32px
                  )
                `,
                backgroundPosition: "0 44px",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.06), -4px 4px 0 rgba(0,0,0,0.04)",
                padding: "32px 30px 48px",
              }}
            >
              {/* Top monogram */}
              <div className="flex items-center justify-center mb-6">
                <div style={{ height: 1, flex: 1, backgroundColor: "rgba(139,90,80,0.2)" }} />
                <div className="mx-3 flex items-center gap-1.5">
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="rgba(180,80,80,0.5)">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="font-dancing text-base" style={{ color: "rgba(120,60,60,0.6)" }}>untukmu</span>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="rgba(180,80,80,0.5)">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div style={{ height: 1, flex: 1, backgroundColor: "rgba(139,90,80,0.2)" }} />
              </div>

              {/* Letter text */}
              {LETTER_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                  className={
                    i === 0
                      ? "font-dancing text-3xl sm:text-4xl mb-2"
                      : i === LETTER_LINES.length - 1
                      ? "font-dancing text-2xl sm:text-3xl text-right mt-4"
                      : i === LETTER_LINES.length - 2
                      ? "font-dancing text-base sm:text-lg"
                      : "font-poppins text-[13px] sm:text-[15px]"
                  }
                  style={{
                    margin: 0,
                    lineHeight: line === " " ? "32px" : "32px",
                    color:
                      i === 0
                        ? "rgba(100,35,35,0.95)"
                        : i >= LETTER_LINES.length - 2
                        ? "rgba(120,50,50,0.85)"
                        : line === " "
                        ? "transparent"
                        : "rgba(60,35,25,0.72)",
                  }}
                >
                  {line === " " ? "\u00A0" : line}
                </motion.p>
              ))}

              {/* Tap hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.25, 0.5] }}
                transition={{ delay: 1.8, duration: 2.5, repeat: Infinity }}
                className="font-poppins text-center mt-8"
                style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(100,60,40,0.35)", textTransform: "uppercase" }}
              >
                tap untuk melanjutkan
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Tap hint ── */}
      {phase !== "reading" && (
        <motion.p
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 z-10 font-poppins tracking-widest uppercase"
          style={{ fontSize: 10, color: "rgba(243,234,227,0.45)" }}
        >
          {phase === "peeking" ? "tap untuk baca surat" : "tap untuk membuka"}
        </motion.p>
      )}
    </motion.div>
  );
}
