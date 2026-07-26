"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  {
    id: 1,
    content: [
      "Hai sayang,",
      " ",
      "Terima kasih sudah selalu sabar dan mengerti.",
      "Aku sangat bersyukur memilikimu.",
      " ",
      "Dengan penuh cinta,",
      "— Aku  ♡",
    ],
    // Positioned right BELOW Polaroid 1 ("First Time We Met")
    position: { top: "34%", left: "22%" },
    rotation: -15,
  },
  {
    id: 2,
    content: [
      "Tahukah kamu?",
      " ",
      "Setiap kali melihatmu tersenyum,",
      "duniaku terasa jauh lebih baik.",
      " ",
      "Jangan pernah berubah ya.",
      "— Selalu untukmu  ♡",
    ],
    // Positioned higher up near Polaroid 2
    position: { top: "42%", left: "68%" },
    rotation: 12,
  },
  {
    id: 3,
    content: [
      "Aku sering membayangkan",
      "masa depan kita.",
      " ",
      "Membangun rumah hangat bersama,",
      "merencanakan petualangan seru,",
      "dan menua bersama-sama.",
      " ",
      "I love you.",
      "— Aku  ♡",
    ],
    // Positioned further BELOW Polaroid 3 so it never covers the polaroid card
    position: { top: "85%", left: "22%" },
    rotation: -8,
  },
];

type Phase = "idle" | "opening" | "peeking" | "reading";

// Mini envelope graphic reused for floating envelopes
function MiniEnvelope({ id }: { id: number }) {
  return (
    <div className="relative drop-shadow-2xl" style={{ width: 110, height: 76 }}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #f0e4d8 0%, #f8f3ed 60%, #ede1d4 100%)",
          border: "1px solid #ddd0c4",
          boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
        }}
      />
      <svg viewBox="0 0 110 76" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`mfg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#faf5ef" />
            <stop offset="100%" stopColor="#ede3d8" />
          </linearGradient>
          <linearGradient id={`mbfg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5ede3" />
            <stop offset="100%" stopColor="#e8d9ca" />
          </linearGradient>
        </defs>
        <polygon points="0,0 55,37 110,0" fill="#fdfaf6" stroke="#d9cab8" strokeWidth="0.6" />
        <polygon points="0,0 55,37 0,76" fill={`url(#mfg-${id})`} stroke="#d9cab8" strokeWidth="0.5" />
        <polygon points="110,0 55,37 110,76" fill={`url(#mfg-${id})`} stroke="#d9cab8" strokeWidth="0.5" />
        <polygon points="0,76 55,36 110,76" fill={`url(#mbfg-${id})`} stroke="#d9cab8" strokeWidth="0.6" />
      </svg>
      {/* Wax seal */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full z-10"
        style={{
          top: 26,
          width: 22,
          height: 22,
          background: "radial-gradient(circle at 35% 35%, #d9385e, #6e0a1c)",
          boxShadow: "0 2px 8px rgba(110,10,28,0.5), inset 0 1px 2px rgba(255,180,195,0.15)",
          border: "1.5px solid #9a1228",
        }}
      >
        <svg width={9} height={9} viewBox="0 0 24 24" fill="rgba(255,180,195,0.9)">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
}

export default function FloatingEnvelopes() {
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (selectedMessage) {
      document.body.classList.add("envelope-open");
    } else {
      document.body.classList.remove("envelope-open");
    }
    return () => document.body.classList.remove("envelope-open");
  }, [selectedMessage]);

  const handleOpenMessage = (msg: typeof messages[0]) => {
    setSelectedMessage(msg);
    setPhase("idle");
  };

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("opening");
      setTimeout(() => setPhase("peeking"), 950);
    } else if (phase === "peeking") {
      setPhase("reading");
    } else if (phase === "reading") {
      setPhase("idle");
      setTimeout(() => setSelectedMessage(null), 500);
    }
  };

  return (
    <>
      {/* Absolute floating envelopes — positioned directly BELOW each polaroid card */}
      {messages.map((msg, idx) => (
        <motion.div
          key={msg.id}
          className="absolute z-[80] cursor-pointer"
          style={msg.position}
          initial={{ opacity: 0, scale: 0.3, rotate: msg.rotation - 20, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: msg.rotation, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, delay: idx * 0.15, type: "spring", stiffness: 100, damping: 15 }}
          onClick={() => handleOpenMessage(msg)}
          whileHover={{ scale: 1.1, zIndex: 90 }}
        >
          {/* Subtle Pink Ambient Halo behind envelope */}
          <div className="absolute inset-0 rounded-full bg-[#F7C6D9]/35 blur-lg transform scale-125 pointer-events-none z-0" />

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [msg.rotation, msg.rotation + 2.5, msg.rotation],
            }}
            transition={{ duration: 4 + idx * 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <MiniEnvelope id={msg.id} />
          </motion.div>
        </motion.div>
      ))}

      {/* ── ENVELOPE OPEN MODAL ── */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200]"
            style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(48,14,22,0.65)" }}
            onClick={handleTap}
          >
            {/* Envelope scene — absolutely centered, hidden during reading */}
            <AnimatePresence>
              {phase !== "reading" && (
                <motion.div
                  key="envelope-scene"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, y: 40 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    className="relative scale-110 sm:scale-125 md:scale-150 pointer-events-auto"
                    style={{ width: 300, perspective: "1200px" }}
                  >
                    {/* Letter peeking out */}
                    <AnimatePresence>
                      {phase === "peeking" && (
                        <div
                          className="absolute z-10"
                          style={{ left: 14, right: 14, bottom: 2, height: 1000, overflow: "hidden", pointerEvents: "none" }}
                        >
                          <motion.div
                            initial={{ y: 1000 - 180 }}
                            animate={{ y: 1000 - 320 }}
                            exit={{ y: 1000 - 180 }}
                            transition={{ duration: 1.1, type: "spring", stiffness: 60, damping: 13 }}
                            className="absolute w-full"
                          >
                            <div style={{
                              backgroundColor: "#F7F2E8",
                              backgroundImage: `repeating-linear-gradient(transparent, transparent 23px, rgba(139,108,80,0.12) 23px, rgba(139,108,80,0.12) 24px)`,
                              backgroundPosition: "0 32px",
                              boxShadow: "0 -6px 20px rgba(0,0,0,0.15)",
                              padding: "18px 20px 40px",
                              minHeight: 400,
                            }}>
                              <div className="flex items-center justify-center mb-3">
                                <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(139,90,90,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <svg width={12} height={12} viewBox="0 0 24 24" fill="rgba(180,80,80,0.7)">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                  </svg>
                                </div>
                              </div>
                              {selectedMessage.content.map((line, i) => (
                                <p key={i}
                                  className={i === 0 ? "font-dancing text-xl mb-1" : i === selectedMessage.content.length - 1 ? "font-dancing text-lg text-right mt-2" : "font-poppins text-[11px] leading-[24px]"}
                                  style={{ color: i === 0 ? "rgba(100,40,40,0.95)" : line === " " ? "transparent" : "rgba(60,40,30,0.75)", margin: 0 }}>
                                  {line === " " ? "\u00A0" : line}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Envelope body 300×190 */}
                    <div className="relative" style={{ height: 190 }}>
                      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(145deg, #f0e4d8 0%, #f8f3ed 60%, #ede1d4 100%)", border: "1px solid #ddd0c4", boxShadow: "0 24px 70px rgba(0,0,0,0.35)" }} />
                      <div className="absolute inset-0 z-20 pointer-events-none">
                        <svg viewBox="0 0 300 190" className="w-full h-full" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="smfg" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#faf5ef" /><stop offset="100%" stopColor="#ede3d8" />
                            </linearGradient>
                            <linearGradient id="smbfg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f5ede3" /><stop offset="100%" stopColor="#e8d9ca" />
                            </linearGradient>
                          </defs>
                          <polygon points="0,0 150,96 0,190" fill="url(#smfg)" stroke="#d9cab8" strokeWidth="0.8" />
                          <polygon points="300,0 150,96 300,190" fill="url(#smfg)" stroke="#d9cab8" strokeWidth="0.8" />
                          <polygon points="0,190 150,90 300,190" fill="url(#smbfg)" stroke="#d9cab8" strokeWidth="1.2" />
                        </svg>
                      </div>

                      {/* Top flap */}
                      <motion.div
                        animate={
                          phase === "opening" || phase === "peeking"
                            ? { rotateX: -178, zIndex: 5 }
                            : { rotateX: 0, zIndex: 30 }
                        }
                        transition={{ rotateX: { duration: 0.85, ease: [0.3, 1.1, 0.6, 1] }, zIndex: { delay: phase === "idle" ? 0 : 0.35 } }}
                        className="absolute top-0 left-0 right-0 origin-top pointer-events-none"
                      >
                        <svg viewBox="0 0 300 106" className="w-full overflow-visible" style={{ height: 106, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))" }} preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="smtg" x1="0" y1="0" x2="0.5" y2="1">
                              <stop offset="0%" stopColor="#fdfaf6" /><stop offset="100%" stopColor="#f0e6da" />
                            </linearGradient>
                          </defs>
                          <polygon points="0,0 150,102 300,0" fill="url(#smtg)" stroke="#d9cab8" strokeWidth="1" />
                        </svg>
                        <motion.div
                          animate={phase !== "idle" ? { opacity: 0, scale: 0.3, y: -5 } : { opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            top: 78,
                            background: "radial-gradient(circle at 35% 35%, #d9385e, #6e0a1c)",
                            boxShadow: "0 3px 12px rgba(110,10,28,0.55), inset 0 1px 2px rgba(255,180,195,0.15)",
                            border: "2px solid #9a1228",
                          }}
                        >
                          <svg width={16} height={16} viewBox="0 0 24 24" fill="rgba(255,180,195,0.9)">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Tap hint below envelope */}
                    <motion.p
                      animate={{ opacity: [0.35, 0.75, 0.35] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute -bottom-16 left-0 w-full text-center font-poppins tracking-widest uppercase pointer-events-none"
                      style={{ fontSize: 10, color: "rgba(243,234,227,0.55)" }}
                    >
                      {phase === "peeking" ? "tap untuk baca surat" : "tap untuk membuka"}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FULL LETTER — Reading Phase ── */}
            <AnimatePresence>
              {phase === "reading" && (
                <motion.div
                  key="reading-letter"
                  initial={{ y: 60, opacity: 0, rotate: -1.5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.65, type: "spring", stiffness: 110, damping: 18 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    className="w-[90vw] max-w-[360px] sm:max-w-[420px] md:max-w-[480px] overflow-hidden pointer-events-auto"
                    style={{
                      backgroundColor: "#F7F2E8",
                      backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, rgba(139,108,80,0.12) 31px, rgba(139,108,80,0.12) 32px)`,
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

                    {/* Letter text — staggered */}
                    {selectedMessage.content.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                        className={
                          i === 0 ? "font-dancing text-3xl sm:text-4xl mb-2"
                          : i === selectedMessage.content.length - 1 ? "font-dancing text-2xl sm:text-3xl text-right mt-4"
                          : i === selectedMessage.content.length - 2 ? "font-dancing text-base sm:text-lg"
                          : "font-poppins text-[13px] sm:text-[15px]"
                        }
                        style={{
                          margin: 0,
                          lineHeight: "32px",
                          color: i === 0 ? "rgba(100,35,35,0.95)"
                            : i >= selectedMessage.content.length - 2 ? "rgba(120,50,50,0.85)"
                            : line === " " ? "transparent"
                            : "rgba(60,35,25,0.72)",
                        }}
                      >
                        {line === " " ? "\u00A0" : line}
                      </motion.p>
                    ))}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0.25, 0.5] }}
                      transition={{ delay: 1.8, duration: 2.5, repeat: Infinity }}
                      className="font-poppins text-center mt-8"
                      style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(100,60,40,0.35)", textTransform: "uppercase" }}
                    >
                      tap untuk menutup
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
