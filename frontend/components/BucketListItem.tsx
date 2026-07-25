"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface BucketItem {
  id: string;
  item: string;
  is_done: boolean;
}

interface Props {
  data: BucketItem;
  index?: number;
}

const rotations = ["-1.5deg", "2deg", "-2.2deg", "1.8deg", "-1.8deg", "2.2deg"];

export default function BucketListItem({ data, index = 0 }: Props) {
  const [isDone, setIsDone] = useState(data.is_done);
  const cardRotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ rotate: cardRotation }}
      whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 30 }}
      onClick={() => setIsDone(!isDone)}
      className="relative flex flex-col justify-between p-5 rounded-xs cursor-pointer transition-all duration-300 bg-[#FAF5EF] shadow-[0_12px_30px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.15)] border border-[#4A1E2C]/15 group select-none min-h-[170px]"
    >
      {/* 📎 REALISTIC 3D GOLDEN PAPER CLIP (Full Unclipped Display) */}
      <div className="absolute -top-3.5 left-5 z-30 pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
        <div className="w-3.5 h-8 rounded-full border-2 border-amber-500/90 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-sm opacity-95 transform -rotate-12" />
      </div>

      {/* Lined Paper Texture Background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-xs overflow-hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #000 24px)",
        }}
      />

      {/* Ticket Content */}
      <div className="relative z-10 pt-2 flex items-start gap-3">
        {/* Custom Vintage Checkbox */}
        <div
          className={`w-5 h-5 mt-1 rounded-md border-2 flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs ${
            isDone
              ? "bg-[#4A1E2C] border-[#4A1E2C] text-[#FAF5EF]"
              : "bg-white/80 border-[#4A1E2C]/30 text-transparent hover:border-[#4A1E2C]"
          }`}
        >
          {isDone && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Check size={13} strokeWidth={3} />
            </motion.div>
          )}
        </div>

        {/* Wish Text (Handwritten Font) */}
        <p
          className={`font-dancing text-xl sm:text-2xl leading-snug transition-all duration-300 font-semibold ${
            isDone
              ? "line-through text-[#4A1E2C]/50"
              : "text-[#2D121A] group-hover:text-[#4A1E2C]"
          }`}
        >
          "{data.item}"
        </p>
      </div>

      {/* Completed State Ink Stamp Badge (Pure Clean Wax Seal Style - No Emoji) */}
      <div className="relative z-10 flex justify-end pt-3 border-t border-black/5 mt-3">
        {isDone ? (
          <motion.div
            initial={{ scale: 0, rotate: 15, opacity: 0 }}
            animate={{ scale: 1, rotate: -6, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="px-2.5 py-0.5 border-2 border-rose-700/80 bg-rose-50/80 text-rose-800 rounded-md font-playfair font-black text-[9px] tracking-widest uppercase shadow-2xs select-none backdrop-blur-2xs"
          >
            TERWUJUD
          </motion.div>
        ) : (
          <span className="font-poppins text-[10px] text-gray-400 font-medium tracking-wide">
            Impian Pasangan ✦
          </span>
        )}
      </div>

      {/* Paper Dog-Ear Corner Fold (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[16px] border-t-black/15 border-r-[16px] border-r-transparent rounded-tl-xs pointer-events-none drop-shadow-xs" />
    </motion.div>
  );
}
