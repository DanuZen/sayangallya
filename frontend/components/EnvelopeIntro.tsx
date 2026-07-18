"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Teks surat yang muncul di dalam amplop
const LETTER_TEXT = [
  "Hei, sayang...",
  "Aku tahu kita sering sibuk dan jarak kadang terasa berat.",
  "Tapi aku mau kamu tahu, setiap detik bersamamu adalah hal paling berharga yang kumiliki.",
  "Website ini aku buat khusus untukmu — sebagai tempat menyimpan semua kenangan kita.",
  "Dengan penuh cinta,",
];

// Pre-generate sprinkle particles for the burst
const SPRINKLES = Array.from({ length: 45 }).map((_, i) => {
  const angle = Math.random() * Math.PI * 2; 
  const velocity = 150 + Math.random() * 250;
  return {
    id: i,
    x: Math.cos(angle) * velocity,
    y: Math.sin(angle) * velocity,
    scale: Math.random() + 0.6,
    duration: 1.5 + Math.random(),
    color: ['#E88CA8', '#F7C6D9', '#FFFDF9', '#E8DFF5'][i % 4]
  };
});

export default function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "letter" | "done">("idle");

  // Auto-start opening after mount
  useState(() => {
    const t = setTimeout(() => setPhase("opening"), 700);
    return () => clearTimeout(t);
  });

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("opening");
      setTimeout(() => setPhase("letter"), 1500);
    } else if (phase === "opening") {
      setPhase("letter");
    } else if (phase === "letter") {
      setPhase("done");
      setTimeout(onDone, 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={handleTap}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-gradient-to-br from-peachglow/60 via-cream to-lavender/40 cursor-pointer select-none overflow-hidden"
    >
      {/* Floating petals in background */}
      {[0,1,2,3,4].map(i => (
        <motion.div key={i}
          className="absolute pointer-events-none"
          style={{ left: `${15 + i * 18}%`, top: "-5%" }}
          animate={{ y: ["0vh","110vh"], rotate:[0,360], opacity:[0,0.5,0.5,0] }}
          transition={{ duration: 20 + i*3, repeat: Infinity, delay: i*2, ease:"linear" }}
        >
          <svg width={10+i*3} height={10+i*3} viewBox="0 0 24 24" fill="currentColor" className="text-rose/40">
            <path d="M12,2 C12,2 4,8 4,14 C4,18.418 7.582,22 12,22 C16.418,22 20,18.418 20,14 C20,8 12,2 12,2 Z"/>
          </svg>
        </motion.div>
      ))}

      {/* SPRINKLES BURST */}
      <AnimatePresence>
        {phase === "letter" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            {SPRINKLES.map((s) => (
              <motion.div
                key={s.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: s.x, y: s.y, scale: s.scale, opacity: 0 }}
                transition={{ duration: s.duration, ease: "easeOut" }}
                className="absolute w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: s.color }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ENVELOPE CONTAINER */}
      <div className="relative w-[340px] md:w-[380px] h-[220px]" style={{ perspective: "1500px" }}>

        {/* 1. Envelope Back */}
        <motion.div
          animate={phase === "letter" || phase === "done" ? { y: 250, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          className="absolute inset-0 bg-gradient-to-br from-[#efe4db] to-[#fcfaf8] rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] border border-[#e8dcd3] z-0"
        />

        {/* 2. Letter (Slides up from INSIDE the envelope) */}
        <AnimatePresence>
          {(phase === "letter" || phase === "done") && (
            <motion.div
              initial={{ y: 120, opacity: 0, scale: 0.85 }}
              animate={{ y: -30, opacity: 1, scale: 1.15 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.9, type: "spring", stiffness: 85, damping: 14 }}
              className="absolute left-2 right-2 md:left-4 md:right-4 top-[-20px] z-10 bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Letter header decoration */}
              <div className="h-3 bg-gradient-to-r from-rose/40 via-peachglow to-lavender/50" />

              {/* Letter content */}
              <div className="p-6 md:p-8 min-h-[300px] flex flex-col gap-3"
                style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(232,140,168,0.08) 27px, rgba(232,140,168,0.08) 28px)", backgroundPosition: "0 36px" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-rose flex items-center justify-center shadow-md">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <span className="font-dancing text-rose text-sm font-semibold tracking-wide">Surat untukmu</span>
                </div>

                {LETTER_TEXT.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className={`font-poppins leading-relaxed ${
                      i === 0
                        ? "font-playfair text-xl md:text-2xl font-bold text-charcoal"
                        : i === LETTER_TEXT.length - 1
                        ? "font-dancing text-rose text-xl md:text-2xl mt-2"
                        : "text-sm md:text-base text-charcoal/80"
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="font-dancing text-charcoal text-2xl md:text-3xl text-right mt-1"
                >
                  — Aku 💕
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Envelope Front Flaps (Left, Right, Bottom) */}
        <motion.div
          animate={phase === "letter" || phase === "done" ? { y: 250, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <svg viewBox="0 0 340 220" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
            <defs>
              <linearGradient id="front-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdfcfb" />
                <stop offset="100%" stopColor="#f3eae3" />
              </linearGradient>
              <filter id="flap-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#3d2a1d" floodOpacity="0.08" />
              </filter>
            </defs>
            {/* Left Flap */}
            <polygon points="0,0 170,110 0,220" fill="url(#front-grad)" stroke="#ebdcd0" strokeWidth="1" />
            {/* Right Flap */}
            <polygon points="340,0 170,110 340,220" fill="url(#front-grad)" stroke="#ebdcd0" strokeWidth="1" />
            {/* Bottom Flap */}
            <polygon points="0,220 170,105 340,220" fill="url(#front-grad)" filter="url(#flap-shadow)" stroke="#ebdcd0" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* 4. Top Flap (Animated opening) */}
        <motion.div
          animate={
            phase === "letter" || phase === "done"
              ? { y: 250, opacity: 0, scale: 0.9, rotateX: -175 }
              : phase === "opening"
                ? { rotateX: -175, y: 0, opacity: 1, scale: 1 }
                : { rotateX: 0, y: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.9, ease: [0.34, 1.3, 0.64, 1] }} // smooth spring-like bezier
          className="absolute top-0 left-0 right-0 z-30 origin-top pointer-events-none"
        >
          <svg viewBox="0 0 340 120" className="w-full h-[120px] drop-shadow-md overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="top-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f7f0eb" />
              </linearGradient>
            </defs>
            <polygon points="0,0 170,115 340,0" fill="url(#top-grad)" stroke="#ebdcd0" strokeWidth="1.5" />
          </svg>

          {/* Realistic Wax Seal */}
          <motion.div
            animate={phase === "opening" || phase === "letter" || phase === "done" ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#d9385e] to-[#8c0f26] shadow-[0_4px_12px_rgba(140,15,38,0.4)] flex items-center justify-center border-[2.5px] border-[#a1142e] cursor-pointer pointer-events-auto"
            whileHover={{ scale: 1.05 }}
          >
            {/* Inner embossed ring */}
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shadow-inner">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffb3c6" className="drop-shadow-sm">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
               </svg>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Tap hint */}
      <motion.p
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-12 text-xs text-charcoal/40 font-poppins tracking-widest uppercase"
      >
        {phase === "letter" ? "Tap untuk lanjut →" : "Tap untuk membuka"}
      </motion.p>
    </motion.div>
  );
}
