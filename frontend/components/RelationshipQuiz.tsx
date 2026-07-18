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
    }, 1000); // 1s delay to show the correct/wrong color feedback
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetQuiz, 300); // reset after exit animation
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
            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-charcoal/40 hover:text-rose p-2 transition-colors rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            
            {!showResult ? (
              <div className="pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-poppins font-medium text-rose bg-rose/10 px-3 py-1 rounded-full">
                    Pertanyaan {currentQ + 1} dari {quizData.length}
                  </span>
                  <Sparkles size={18} className="text-peachglow" />
                </div>
                
                <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-8 leading-snug">
                  {quizData[currentQ].question}
                </h3>
                
                <div className="space-y-3">
                  {quizData[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-2xl font-poppins text-[15px] transition-all duration-300 border outline-none ${
                        selectedOpt === null 
                          ? 'bg-gray-50 border-gray-100 hover:border-rose/40 hover:bg-rose/5 text-charcoal' 
                          : selectedOpt === idx 
                            ? idx === quizData[currentQ].answer 
                              ? 'bg-sage border-sage text-white font-medium shadow-md' // Correct selected
                              : 'bg-red-500 border-red-500 text-white shadow-md' // Wrong selected
                            : idx === quizData[currentQ].answer
                              ? 'bg-sage border-sage text-white' // Show correct if wrong selected
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
                <div className="inline-flex justify-center items-center w-20 h-20 bg-peachglow/30 rounded-full mb-6">
                  {score === quizData.length ? (
                    <Trophy size={40} className="text-rose" />
                  ) : (
                    <Heart size={40} className="text-rose" fill="currentColor" />
                  )}
                </div>
                
                <h2 className="font-playfair text-3xl font-bold text-charcoal mb-2">
                  Skormu: {score} / {quizData.length}
                </h2>
                
                <p className="font-poppins text-charcoal/70 mb-8">
                  {score === quizData.length 
                    ? "Sempurna! Kamu emang paling tahu soal hubungan kita. I love you! ❤️" 
                    : score > 0 
                      ? "Lumayan lah yaa, walau ada yang lupa dikit hihi. 😜"
                      : "Wah parah, masa lupa semua?! Harus diajak kencan lagi nih biar inget! 😂"}
                </p>
                
                <button
                  onClick={resetQuiz}
                  className="bg-rose text-white font-poppins font-medium px-6 py-3 rounded-full hover:bg-rose/90 transition-colors shadow-md w-full"
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
