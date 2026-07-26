"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, PartyPopper } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const gameData = {
  imageUrl: "/images/dummy-photo.png",
  question: "Masih ingat nggak, foto ini diambil waktu kita lagi ngapain?",
  options: ["Liburan ke pantai Kuta", "Anniversary tahun pertama", "Kencan pertama kali", "Piknik sore-sore"],
  answer: 1
};

export default function GuessPicture({ isOpen, onClose }: Props) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleAnswer = (idx: number) => {
    setSelectedOpt(idx);
    if (idx === gameData.answer) {
      setTimeout(() => setIsRevealed(true), 600);
    }
  };

  const resetGame = () => {
    setSelectedOpt(null);
    setIsRevealed(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetGame, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#2D0D17]/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#FFF9FA] border border-pink-200 rounded-sm p-6 shadow-2xl overflow-hidden flex flex-col"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-pink-200 z-20 p-2 bg-[#3A1420]/40 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <div className="relative w-full aspect-square rounded-xs overflow-hidden mb-6 shadow-inner bg-pink-100">
              <Image 
                src={gameData.imageUrl} 
                alt="Guess the moment" 
                fill 
                className={`object-cover transition-all duration-1000 ease-out ${isRevealed ? 'blur-0 scale-100' : 'blur-xl scale-110'}`}
              />
              {!isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center bg-pink-900/20 pointer-events-none">
                   <ImageIcon size={48} className="text-white/80 drop-shadow-md" />
                </div>
              )}
            </div>
            
            {!isRevealed ? (
              <div className="flex-1 flex flex-col">
                <h3 className="font-playfair text-xl font-bold text-[#3A1420] mb-4 text-center px-2">
                  {gameData.question}
                </h3>
                
                <div className="space-y-3 mt-auto">
                  {gameData.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null && selectedOpt === gameData.answer}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full p-3.5 rounded-xl font-poppins text-xs font-medium transition-all duration-300 border outline-none cursor-pointer ${
                        selectedOpt === null 
                          ? 'bg-white border-pink-100 hover:border-pink-400 hover:bg-pink-50/60 text-[#3A1420] shadow-2xs' 
                          : selectedOpt === idx 
                            ? idx === gameData.answer 
                              ? 'bg-pink-600 border-pink-600 text-white shadow-md font-semibold' 
                              : 'bg-rose-500 border-rose-500 text-white animate-pulse shadow-md'
                            : 'bg-white border-pink-100 opacity-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4 text-pink-600">
                  <PartyPopper size={40} />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-[#3A1420] mb-2">Benar Banget! 🎉</h2>
                <p className="font-poppins text-xs text-[#3A1420]/80 mb-6 leading-relaxed">
                  Itu momen {gameData.options[gameData.answer].toLowerCase()}. Momen terindah yang nggak akan pernah aku lupain.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-pink-600 text-white font-poppins font-medium px-6 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-sm w-full cursor-pointer"
                >
                  Tutup Gambar
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
