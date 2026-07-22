"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, X } from "lucide-react";

interface Message {
  id: string;
  title: string;
  content: string;
  unlock_date?: string;
}

interface Props {
  message: Message;
}

export default function EnvelopeCard({ message }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const now = new Date();
  const unlockDate = message.unlock_date ? new Date(message.unlock_date) : null;
  const isLocked = unlockDate && unlockDate > now;

  const handleOpen = () => {
    if (!isLocked) setIsOpen(true);
  };

  return (
    <>
      {/* Envelope Card — polaroid style */}
      <motion.div
        whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
        whileTap={!isLocked ? { scale: 0.97 } : {}}
        onClick={handleOpen}
        className="group relative w-full h-full min-h-[220px] flex flex-col border transition-all duration-500 overflow-hidden"
        style={{
          backgroundColor: isLocked ? "rgba(243,234,227,0.12)" : "#FCFBF9",
          borderColor: isLocked ? "rgba(243,234,227,0.15)" : "rgba(243,234,227,0.9)",
          cursor: isLocked ? "not-allowed" : "pointer",
          boxShadow: isLocked
            ? "none"
            : "0 15px 40px rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.1)",
          padding: "14px 14px 30px",
        }}
      >
        {/* Tape */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-12 h-6 rotate-1 z-10 opacity-60"
          style={{
            backgroundColor: isLocked ? "rgba(243,234,227,0.3)" : "rgba(243,234,227,0.8)",
            border: "1px solid rgba(74,30,44,0.1)",
          }} />

        {/* "Photo" area — decorative envelope icon */}
        <div className="w-full aspect-square flex flex-col items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isLocked ? "rgba(243,234,227,0.08)" : "rgba(74,30,44,0.06)" }}>
          {isLocked ? (
            <Lock size={32} strokeWidth={1.2} style={{ color: "rgba(243,234,227,0.4)" }} />
          ) : (
            <Mail size={32} strokeWidth={1.2} style={{ color: "rgba(243,234,227,0.8)" }} className="group-hover:scale-110 transition-transform duration-300" />
          )}
        </div>

        {/* Caption */}
        <div className="pt-4 px-1">
          <h3 className="font-dancing text-2xl leading-snug"
            style={{ color: isLocked ? "rgba(243,234,227,0.35)" : "#FCFBF9" }}>
            {message.title}
          </h3>
          {isLocked && unlockDate && (
            <p className="font-poppins text-[11px] tracking-wider mt-1"
              style={{ color: "rgba(243,234,227,0.35)" }}>
              Opens {unlockDate.toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          )}
          {!isLocked && (
            <p className="font-poppins text-[11px] tracking-widest uppercase mt-1"
              style={{ color: "rgba(243,234,227,0.45)" }}>
              tap to open
            </p>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(74,30,44,0.7)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="relative w-full max-w-lg overflow-hidden"
              style={{
                backgroundColor: "#FCFBF9",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5), 8px 8px 0 rgba(0,0,0,0.1)",
                padding: "0 0 40px",
              }}
            >
              {/* Top color bar */}
              <div className="h-2 w-full" style={{ backgroundColor: "#4A1E2C" }} />

              <div className="p-8 md:p-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 transition-opacity hover:opacity-60"
                  style={{ color: "#4A1E2C" }}
                >
                  <X size={20} />
                </button>

                <div className="mb-8 text-center">
                  <span className="font-dancing text-3xl mb-1 block" style={{ color: "#4A1E2C" }}>For you,</span>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#4A1E2C" }}>
                    {message.title}
                  </h2>
                </div>

                {/* Lined paper background for content */}
                <div className="p-6 rounded-sm"
                  style={{
                    backgroundColor: "rgba(74,30,44,0.03)",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(74,30,44,0.07) 27px, rgba(74,30,44,0.07) 28px)",
                    backgroundPosition: "0 36px",
                  }}>
                  <p className="font-poppins text-[15px] leading-loose whitespace-pre-line"
                    style={{ color: "rgba(74,30,44,0.8)" }}>
                    {message.content}
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(74,30,44,0.2)" }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
