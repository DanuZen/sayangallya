"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, Trophy } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const quizData = [
  {
    question: "Di mana kita pertama kali nge-date?",
    options: ["Di Kampus", "Di Cafe Sudut Kota", "Nonton Bioskop", "Taman Kota"],
    answer: 1 // Index of correct option
  },
  {
    question: "Siapa yang pertama kali bilang 'I Love You'?",
    options: ["Kamu dong!", "Aku pastinya", "Sama-sama bilang", "Nggak ada yang bilang"],
    answer: 1
  },
  {
    question: "Apa kebiasaan anehku yang kamu paling hafal?",
    options: ["Tidur ngorok", "Suka gigit sedotan", "Ketawa telat", "Lupa taruh kunci"],
    answer: 2
  }
];

export default function RelationshipQuiz({ isOpen, onClose }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    setSelectedOpt(idx);
    
    setTimeout(() => {
      if (idx === quizData[currentQ].answer) {
        setScore(score + 1);
      }
      
      if (currentQ < quizData.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetQuiz, 300);
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
            className="absolute inset-0 bg-[#180A15]/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#FFF9FA] border border-pink-200 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 p-2 transition-colors rounded-full hover:bg-pink-50 cursor-pointer"
            >
              <X size={20} />
            </button>
            
            {!showResult ? (
              <div className="pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-poppins font-semibold text-pink-600 bg-pink-100 px-3.5 py-1 rounded-full border border-pink-200">
                    Pertanyaan {currentQ + 1} dari {quizData.length}
                  </span>
                  <Sparkles size={18} className="text-pink-400" />
                </div>
                
                <h3 className="font-playfair text-2xl font-bold text-[#3A1420] mb-8 leading-snug">
                  {quizData[currentQ].question}
                </h3>
                
                <div className="space-y-3">
                  {quizData[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-2xl font-poppins text-[15px] transition-all duration-300 border outline-none cursor-pointer ${
                        selectedOpt === null 
                          ? 'bg-white border-pink-100 hover:border-pink-400 hover:bg-pink-50/60 text-[#3A1420] shadow-2xs' 
                          : selectedOpt === idx 
                            ? idx === quizData[currentQ].answer 
                              ? 'bg-pink-600 border-pink-600 text-white font-medium shadow-md' // Correct selected
                              : 'bg-rose-500 border-rose-500 text-white shadow-md' // Wrong selected
                            : idx === quizData[currentQ].answer
                              ? 'bg-pink-600 border-pink-600 text-white' // Show correct if wrong selected
                              : 'bg-gray-50 border-gray-100 opacity-40' // Unselected
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex justify-center items-center w-20 h-20 bg-pink-100 rounded-full mb-6 border border-pink-200">
                  {score === quizData.length ? (
                    <Trophy size={40} className="text-pink-600" />
                  ) : (
                    <Heart size={40} className="text-pink-500" fill="currentColor" />
                  )}
                </div>
                
                <h2 className="font-playfair text-3xl font-bold text-[#3A1420] mb-2">
                  Skormu: {score} / {quizData.length}
                </h2>
                
                <p className="font-poppins text-xs text-[#3A1420]/80 mb-8 leading-relaxed">
                  {score === quizData.length 
                    ? "Sempurna! Kamu emang paling tahu soal hubungan kita. I love you! ❤️" 
                    : score > 0 
                      ? "Lumayan lah yaa, walau ada yang lupa dikit hihi. 😜"
                      : "Wah parah, masa lupa semua?! Harus diajak kencan lagi nih biar inget! 😂"}
                </p>
                
                <button
                  onClick={resetQuiz}
                  className="bg-pink-600 text-white font-poppins font-medium px-6 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-md w-full cursor-pointer"
                >
                  Main Lagi
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
