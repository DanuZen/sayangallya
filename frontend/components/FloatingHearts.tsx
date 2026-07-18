"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ✅ Pre-generate all particle data OUTSIDE the component (stable, no re-compute on render)
const PARTICLES = Array.from({ length: 40 }).map((_, i) => {
  const typeRand = i % 3 === 0 ? 0.8 : i % 3 === 1 ? 0.5 : 0.2; // deterministic type assignment
  let type = 'sparkle';
  if (typeRand > 0.7) type = 'heart';
  else if (typeRand > 0.3) type = 'petal';

  // Pre-compute x drift so it's stable
  const drift1 = (Math.random() * 120 - 60);
  const drift2 = (Math.random() * 120 - 60);

  return {
    id: i,
    left: `${(i * 2.5) % 100}%`, // Evenly distributed, stable positions
    top: `${Math.floor(Math.random() * 100)}%`,
    size: type === 'petal' ? 14 + (i % 8) : 10 + (i % 12),
    // ✅ Much slower durations
    duration: type === 'heart' ? 35 + (i % 20) : type === 'petal' ? 30 + (i % 18) : 18 + (i % 12),
    delay: -(i * 1.1) % 30, // Staggered but controlled start
    driftX1: drift1,
    driftX2: drift2,
    type,
  };
});

export default function FloatingHearts() {
  const mousePosRef = useRef({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  // ✅ Use direct DOM manipulation for spotlight - no re-renders
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Edge Vignette — very slow breath */}
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-10"
        style={{ boxShadow: 'inset 0 0 12vw rgba(232,140,168,0.28)' }}
      />

      {/* Aurora Orbs — all slowed to 45–60s */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -80, 40, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-rose/8 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -80, 40, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-peachglow/15 blur-[160px]"
      />
      <motion.div
        animate={{ x: [0, 40, -80, 0], y: [0, -40, 80, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-lavender/15 blur-[120px]"
      />

      {/* Mouse Spotlight — DOM-driven, no state re-renders */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full mix-blend-overlay"
        style={{ willChange: 'transform', transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />

      {/* Floating Particles */}
      {PARTICLES.map((p) => {
        if (p.type === 'heart') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: "110vh", x: 0, opacity: 0 }}
              animate={{
                y: "-10vh",
                x: [0, p.driftX1, p.driftX2, 0],
                opacity: [0, 0.6, 0.6, 0],
                rotate: [-15, 15, -15],
              }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
              className="absolute"
              style={{ left: p.left }}
            >
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor" className="text-rose/35 drop-shadow-[0_0_10px_rgba(232,140,168,0.7)]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          );
        } else if (p.type === 'petal') {
          return (
            <motion.div
              key={p.id}
              initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
              animate={{
                y: "110vh",
                x: [0, p.driftX1, p.driftX2, 0],
                opacity: [0, 0.75, 0.75, 0],
                rotate: [0, 180, 360], // ✅ Slower rotation (only 360 not 720)
              }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
              className="absolute"
              style={{ left: p.left }}
            >
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor" className="text-peachglow/60 drop-shadow-[0_2px_8px_rgba(253,226,208,0.7)]">
                <path d="M12,2 C12,2 4,8 4,14 C4,18.418 7.582,22 12,22 C16.418,22 20,18.418 20,14 C20,8 12,2 12,2 Z" />
              </svg>
            </motion.div>
          );
        } else {
          // Sparkles — slow fade in/out
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
              transition={{
                duration: p.duration * 0.8, // ✅ Much slower: 14–22s
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
              className="absolute flex items-center justify-center"
              style={{ left: p.left, top: p.top }}
            >
              <div
                className="bg-white rounded-full shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]"
                style={{ width: p.size / 3.5, height: p.size / 3.5 }}
              />
            </motion.div>
          );
        }
      })}

      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
