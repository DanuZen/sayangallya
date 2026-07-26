"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface PasscodeGuardProps {
  children: React.ReactNode;
}

export default function PasscodeGuard({ children }: PasscodeGuardProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = sessionStorage.getItem("ruang_kita_unlocked") === "true";
      setIsUnlocked(unlocked);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const normalized = passcode.trim().toLowerCase().replace(/[\s\-_&]/g, "");

    // Supported secret keys strictly: allyadanu or danuallya
    if (normalized === "allyadanu" || normalized === "danuallya") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ruang_kita_unlocked", "true");
      }
      setIsUnlocked(true);
      setError(null);
    } else {
      setIsShaking(true);
      setError("Kata kunci tidak cocok. Silakan coba lagi.");
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Wait for client-side storage check
  if (isUnlocked === null) return null;

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 selection:bg-rose-300 overflow-hidden">
      {/* Landing Page Style Background (Paper Texture + Deep Burgundy + Pink Glow) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[850px] h-[650px] md:h-[850px] rounded-full bg-radial from-[#F7C6D9]/30 via-[#E88CA8]/15 to-transparent blur-3xl pointer-events-none z-0" />
      </div>

      {/* Editorial Luxury Lock Card Container */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={
            isShaking
              ? { x: [-10, 10, -7, 7, -3, 3, 0], scale: 1, y: 0 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={
            isShaking
              ? { duration: 0.4 }
              : { type: "spring", stiffness: 220, damping: 24 }
          }
          className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#240B17]/90 backdrop-blur-2xl p-7 sm:p-9 rounded-3xl border border-[#F7C6D9]/25 shadow-[0_30px_70px_rgba(0,0,0,0.8)] text-center flex flex-col items-center gap-6 ring-1 ring-white/10"
        >
          {/* Subtle Paper Texture inside Card */}
          <div className="absolute inset-0 rounded-3xl opacity-20 mix-blend-soft-light pointer-events-none overflow-hidden">
            <Image
              src="/kertas.jpg"
              alt="Texture"
              fill
              className="object-cover"
            />
          </div>

          {/* Header Icon Emblem (Wax-seal inspired double ring) */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-[#421927] to-[#1E0812] border border-[#F7C6D9]/40 shadow-inner">
            <div className="absolute inset-1 rounded-full border border-[#F7C6D9]/20" />
            <Lock className="w-6 h-6 text-[#F7C6D9] drop-shadow-[0_0_10px_rgba(247,198,217,0.5)]" />
          </div>

          {/* Header Copy */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <span className="font-poppins text-[10px] tracking-[0.35em] text-[#F7C6D9]/70 uppercase font-semibold">
              Akses Terbatas
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FFF0F5] tracking-wide">
              Ruang Kita
            </h2>
            <div className="w-12 h-[1px] bg-[#F7C6D9]/30 my-0.5" />
            <p className="font-poppins text-xs text-[#FAF5EF]/75 font-light leading-relaxed max-w-xs">
              Ruang khusus untuk Allya & Danu. Masukkan kata kunci rahasia untuk melanjutkan.
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4 relative z-10 mt-1">
            <div className="relative w-full">
              <input
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Kata kunci rahasia..."
                className="w-full bg-[#14050E]/80 text-[#FFF0F5] font-poppins text-sm px-4 py-3.5 pr-11 rounded-xl border border-[#F7C6D9]/25 focus:border-[#F7C6D9]/60 focus:outline-none focus:ring-1 focus:ring-[#F7C6D9]/40 transition-all placeholder:text-[#F7C6D9]/35 tracking-wider"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F7C6D9]/50 hover:text-[#F7C6D9] transition-colors"
                title={showPasscode ? "Sembunyikan" : "Tampilkan"}
              >
                {showPasscode ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="font-poppins text-xs text-[#F7C6D9] bg-[#421422]/70 py-2 px-3 rounded-lg border border-[#F7C6D9]/25 flex items-center justify-center gap-2"
                >
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unlock Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-[#4A1E2C] via-[#5C2235] to-[#4A1E2C] text-[#FAF5EF] font-poppins font-medium text-xs tracking-widest uppercase rounded-xl shadow-lg border border-[#F7C6D9]/35 hover:border-[#F7C6D9]/65 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#F7C6D9]" />
              <span>Masuk</span>
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
