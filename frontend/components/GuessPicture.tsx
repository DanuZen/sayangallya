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
  imageUrl: "/images/dummy-photo.png", // Reusing the timeline dummy photo
  question: "Masih ingat nggak, foto ini diambil waktu kita lagi ngapain?",
  options: ["Liburan ke pantai Kuta", "Anniversary tahun pertama", "Kencan pertama kali", "Piknik sore-sore"],
  answer: 1 // Anniversary
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
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-cream rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-rose z-20 p-2 bg-charcoal/30 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-inner bg-gray-200">
              <Image 
                src={gameData.imageUrl} 
                alt="Guess the moment" 
                fill 
                className={`object-cover transition-all duration-1000 ease-out ${isRevealed ? 'blur-0 scale-100' : 'blur-xl scale-110'}`}
              />
              {!isRevealed && (
                <div className="absolute inset-0 flex items-center justify-center bg-rose/10 pointer-events-none">
                   <ImageIcon size={48} className="text-white/60 drop-shadow-md" />
                </div>
              )}
            </div>
            
            {!isRevealed ? (
              <div className="flex-1 flex flex-col">
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4 text-center px-2">
                  {gameData.question}
                </h3>
                
                <div className="space-y-3 mt-auto">
                  {gameData.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null && selectedOpt === gameData.answer} // Disable if correct
                      onClick={() => handleAnswer(idx)}
                      className={`w-full p-3.5 rounded-xl font-poppins text-sm transition-all duration-300 border outline-none ${
                        selectedOpt === null 
                          ? 'bg-white border-bordergray hover:border-rose/50 hover:shadow-sm text-charcoal' 
                          : selectedOpt === idx 
                            ? idx === gameData.answer 
                              ? 'bg-sage border-sage text-white shadow-md' 
                              : 'bg-red-500 border-red-500 text-white animate-pulse shadow-md'
                            : 'bg-white border-bordergray opacity-50'
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
                <div className="flex justify-center mb-4 text-rose">
                  <PartyPopper size={40} />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-charcoal mb-2">Benar Banget! 🎉</h2>
                <p className="font-poppins text-sm text-charcoal/70 mb-6">
                  Itu momen {gameData.options[gameData.answer].toLowerCase()}. Momen terindah yang nggak akan pernah aku lupain.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-rose text-white font-poppins font-medium px-6 py-3 rounded-full hover:bg-rose/90 transition-colors shadow-sm w-full"
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
