"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Plus, Trash2, ListFilter, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { triggerConfetti } from "@/components/ui/confetti";

interface Option {
  id: string;
  text: string;
  color: string;
}

// 2 Alternating Colors: Romantic Pink & Soft Pink Pastel
const twoColorPalette = [
  { bg: "#E88CA8", text: "#3D1020" }, // Elegant Pink
  { bg: "#FCE7F3", text: "#3D1020" }, // Soft Pink Pastel
];

const defaultIdeas: Option[] = [
  { id: "1", text: "Piknik Sore di Taman", color: twoColorPalette[0].bg },
  { id: "2", text: "Nonton Movie Night + Popcorn", color: twoColorPalette[1].bg },
  { id: "3", text: "Masak Resep Baru Bareng", color: twoColorPalette[0].bg },
  { id: "4", text: "Jalan-Jalan Malam & Es Krim", color: twoColorPalette[1].bg },
  { id: "5", text: "Pottery / Crafting Studio", color: twoColorPalette[0].bg },
  { id: "6", text: "Karaoke Lagu Favorit", color: twoColorPalette[1].bg },
];

interface DateSpinnerProps {
  standalone?: boolean;
  onPopupStateChange?: (isOpen: boolean) => void;
}

// SVG Pie Slice Path Generator (0 deg starts at top 12 o'clock)
function getPieSlicePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

export default function DateSpinner({ standalone = false, onPopupStateChange }: DateSpinnerProps) {
  const [list, setList] = useState<Option[]>(defaultIdeas);
  const [newOptionText, setNewOptionText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState<Option | null>(null);

  const openListModal = () => {
    setIsListModalOpen(true);
    onPopupStateChange?.(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
    onPopupStateChange?.(false);
  };

  const closeWinnerPopup = () => {
    setSelectedWinner(null);
    onPopupStateChange?.(false);
  };

  const handleSpin = () => {
    if (spinning || list.length === 0) return;

    setSelectedWinner(null);
    onPopupStateChange?.(false);
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * list.length);
    const sliceAngle = 360 / list.length;
    
    const extraTurns = (5 + Math.floor(Math.random() * 3)) * 360;
    const targetDegree = 360 - (randomIndex * sliceAngle + sliceAngle / 2);
    const newTotalRotation = rotation + extraTurns + (targetDegree - (rotation % 360));

    setRotation(newTotalRotation);

    setTimeout(() => {
      setSpinning(false);
      const winner = list[randomIndex];
      setSelectedWinner(winner);
      onPopupStateChange?.(true);
      triggerConfetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
    }, 4000);
  };

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionText.trim()) return;

    const paletteItem = twoColorPalette[list.length % 2];
    const newOpt: Option = {
      id: Date.now().toString(),
      text: newOptionText.trim(),
      color: paletteItem.bg,
    };

    setList([...list, newOpt]);
    setNewOptionText("");
    setShowAddForm(false);
  };

  const handleDeleteOption = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  };

  const sliceAngle = list.length > 0 ? 360 / list.length : 360;

  return (
    <div
      className={`w-full max-w-5xl mx-auto relative flex flex-col justify-between ${
        standalone
          ? "py-1 min-h-[72vh]"
          : "my-12 p-6 md:p-10 bg-[#FAF7F2] rounded-xl shadow-xl border border-[#4A1E2C]/10"
      }`}
    >
      {/* Centered Large SVG Wheel Spinner Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative select-none my-auto pt-4">
        
        {/* SVG Wheel Circle Outer Shadow & Gold Frame */}
        <div className="relative w-80 h-80 sm:w-[440px] sm:h-[440px] md:w-[470px] md:h-[470px] rounded-full p-3 bg-gradient-to-b from-[#2E0E18] via-[#4A1E2C] to-[#1A060E] shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-2 border-amber-300/40">
          
          {/* Wheel Pointer Pin — Luxury Gold Teardrop Arrow */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]">
            <div
              className="w-7 h-10 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 rounded-t-full flex items-center justify-center border border-amber-100/60 shadow-lg"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
            />
            <div className="w-3 h-3 rounded-full bg-rose-900 -mt-8 border border-amber-200 shadow-inner" />
          </div>

          <div className="w-full h-full rounded-full overflow-hidden relative border border-amber-400/30">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{
                duration: spinning ? 4 : 0,
                ease: [0.15, 0.99, 0.35, 1],
              }}
              className="w-full h-full"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  {/* Luxury Gold Metallic Gradient */}
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                </defs>

                {list.map((idea, i) => {
                  const startAngle = i * sliceAngle;
                  const endAngle = (i + 1) * sliceAngle;
                  const pathData = getPieSlicePath(200, 200, 196, startAngle, endAngle);

                  const midAngle = startAngle + sliceAngle / 2;
                  const isUpsideDown = midAngle > 90 && midAngle < 270;

                  const formattedText =
                    idea.text.length > 18 ? idea.text.substring(0, 18) + "..." : idea.text;

                  // 2 Alternating Colors: Pink (#E88CA8) and Pink Pastel (#FCE7F3)
                  const sliceStyle = twoColorPalette[i % 2];

                  return (
                    <g key={idea.id}>
                      <path
                        d={pathData}
                        fill={sliceStyle.bg}
                        stroke="#4A1E2C"
                        strokeOpacity="0.3"
                        strokeWidth="2"
                      />
                      <g transform={`rotate(${midAngle - 90}, 200, 200)`}>
                        <text
                          x={320}
                          y={200}
                          fill={sliceStyle.text}
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="Playfair Display, Georgia, serif"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={isUpsideDown ? "rotate(180, 320, 200)" : ""}
                          className="pointer-events-none select-none tracking-normal font-serif"
                        >
                          {formattedText}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Outer Decorative Gold Rim Circle */}
                <circle cx="200" cy="200" r="195" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" strokeOpacity="0.8" />
              </svg>
            </motion.div>

            {/* Inner Center Circle Wax Seal Frame */}
            <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#2E0E18] border-4 border-amber-300/60 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-[#3D1421] via-[#4A1E2C] to-[#6C263A] border border-amber-200/40 shadow-inner flex items-center justify-center" />
            </div>
          </div>

          {/* Center SPIN Trigger Button (Luxury Wax Seal Style) */}
          <button
            onClick={handleSpin}
            disabled={spinning || list.length === 0}
            className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#5C1D30] via-[#4A1E2C] to-[#2B0E18] text-[#F3EAE3] font-playfair font-bold text-lg sm:text-xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] z-20 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 cursor-pointer border-2 border-amber-300/80 tracking-widest"
          >
            {spinning ? (
              <RefreshCw size={26} className="animate-spin text-amber-200" />
            ) : (
              <span className="drop-shadow-md text-amber-200">PUTAR</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Action Button (Stunning Romantic Pink Pill) */}
      <div className="flex justify-center mt-auto pt-4 relative z-10">
        <button
          onClick={openListModal}
          className="group relative bg-gradient-to-r from-[#E88CA8] via-[#F472B6] to-[#E88CA8] hover:from-[#E06D8C] hover:to-[#EC4899] text-white px-6 py-2.5 rounded-full font-poppins text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(232,140,168,0.5)] hover:shadow-[0_12px_30px_rgba(244,114,182,0.6)] flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer border border-pink-200/80 backdrop-blur-md"
        >
          <SlidersHorizontal size={14} className="text-white group-hover:rotate-90 transition-transform duration-300 drop-shadow-sm" />
          <span className="tracking-wider drop-shadow-sm">Kelola</span>
        </button>
      </div>

      {/* 🌟 VINTAGE PAPER OPTION LIST POPUP MODAL */}
      <AnimatePresence>
        {isListModalOpen && (
          <div
            onClick={closeListModal}
            className="fixed inset-0 bg-[#180A15]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#FAF5EF] rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#4A1E2C]/15 max-w-lg w-full p-6 md:p-8 cursor-default select-none"
            >
              {/* 📎 REALISTIC 3D GOLDEN PAPER CLIP (Full Unclipped Display) */}
              <div className="absolute -top-3.5 left-6 z-30 pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
                <div className="w-3.5 h-8 rounded-full border-2 border-amber-500/90 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-sm opacity-95 transform -rotate-12" />
              </div>

              {/* Lined Paper Texture Background */}
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-xs overflow-hidden"
                style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #000 24px)",
                }}
              />

              {/* Close Button */}
              <button
                onClick={closeListModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#4A1E2C] transition-colors p-1.5 rounded-full hover:bg-black/5 cursor-pointer z-20"
                title="Tutup daftar pilihan"
              >
                <X size={18} />
              </button>

              {/* Header Bar */}
              <div className="flex justify-between items-center mb-5 relative z-10 pt-2 border-b border-[#4A1E2C]/10 pb-3">
                <div>
                  <h3 className="font-playfair font-bold text-[#4A1E2C] text-xl md:text-2xl">
                    Daftar Pilihan Kencan
                  </h3>
                  <span className="font-poppins text-xs text-gray-500 font-medium">
                    Total {list.length} pilihan aktivitas manis
                  </span>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-[#4A1E2C] text-[#F3EAE3] rounded-full hover:bg-rose-900 transition-colors flex items-center gap-1.5 text-xs px-4 py-2 font-poppins font-semibold cursor-pointer shadow-md border border-white/20"
                >
                  <Plus size={14} /> Opsi Baru
                </button>
              </div>

              {/* Add Form */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddOption}
                    className="mb-4 overflow-hidden relative z-10"
                  >
                    <div className="flex gap-2 bg-white/90 p-2.5 rounded-xl border border-gray-300 shadow-sm">
                      <input
                        type="text"
                        value={newOptionText}
                        onChange={(e) => setNewOptionText(e.target.value)}
                        placeholder="Tulis opsi kencan baru..."
                        className="flex-1 px-3 py-1.5 rounded-lg text-xs font-poppins bg-gray-50 border border-gray-200 text-[#4A1E2C] focus:outline-none focus:ring-1 focus:ring-[#4A1E2C]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-[#4A1E2C] text-white px-4 py-1.5 rounded-lg text-xs font-poppins font-medium hover:bg-rose-900 cursor-pointer shadow-xs"
                      >
                        Simpan
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Options List Items */}
              <div className="max-h-[320px] overflow-y-auto space-y-2.5 no-scrollbar pr-1 relative z-10">
                {list.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex justify-between items-center p-3 rounded-xs bg-white/80 backdrop-blur-2xs border border-[#4A1E2C]/10 shadow-2xs group hover:bg-white hover:border-[#4A1E2C]/30 hover:scale-[1.01] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-pink-300 shadow-2xs"
                        style={{ backgroundColor: opt.color }}
                      />
                      <span className="font-dancing text-xl font-semibold text-[#2D121A] group-hover:text-[#4A1E2C]">
                        {opt.text}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteOption(opt.id)}
                      className="text-gray-400 hover:text-red-500 p-1 opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Hapus opsi"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🌟 FULL SCREEN POPUP BACKDROP WITH PURE FLOATING TYPOGRAPHY OVERLAY */}
      <AnimatePresence>
        {selectedWinner && (
          <div
            onClick={closeWinnerPopup}
            className="fixed inset-0 bg-[#2D0D17]/60 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-center max-w-2xl w-full px-6 py-4 flex flex-col items-center justify-center select-none"
            >
              {/* Pure Floating Winner Text */}
              <h2 className="font-playfair text-4xl sm:text-6xl font-extrabold text-[#FFFDF9] leading-tight my-3 drop-shadow-[0_4px_30px_rgba(0,0,0,1)] tracking-wide">
                "{selectedWinner.text}"
              </h2>

              <p className="font-dancing text-2xl sm:text-4xl text-rose-200 mt-3 drop-shadow-xl">
                Siap-siap kencan bareng ya pasangan manis! 💕
              </p>

              <span className="font-poppins text-xs tracking-widest text-white/50 uppercase mt-8">
                (Klik di mana saja untuk menutup)
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
