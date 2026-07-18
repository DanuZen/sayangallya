"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, X, Heart } from "lucide-react";

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
      {/* Envelope Card */}
      <motion.div
        whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
        whileTap={!isLocked ? { scale: 0.98 } : {}}
        onClick={handleOpen}
        className={`group relative w-full h-full min-h-[220px] rounded-[24px] p-6 flex flex-col items-center justify-center border transition-all duration-500 overflow-hidden ${
          isLocked 
            ? 'bg-gradient-to-b from-bordergray/20 to-bordergray/5 border-bordergray/50 cursor-not-allowed opacity-90' 
            : 'bg-gradient-to-b from-white/90 to-peachglow/20 border-white hover:border-rose/30 hover:shadow-[0_8px_30px_rgb(232,140,168,0.15)] cursor-pointer backdrop-blur-md shadow-sm'
        }`}
      >
        {/* Decorative Top Flap (Subtle) */}
        {!isLocked && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-peachglow via-rose/40 to-peachglow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}

        <div className={`p-4 rounded-full mb-5 transition-all duration-500 ${
          isLocked 
            ? 'bg-gray-100/50 text-gray-400 border border-gray-200/50' 
            : 'bg-rose/5 text-rose border border-rose/10 group-hover:bg-rose group-hover:text-white group-hover:shadow-md'
        }`}>
          {isLocked ? <Lock size={26} strokeWidth={1.5} /> : <Mail size={26} strokeWidth={1.5} />}
        </div>
        
        <h3 className={`font-playfair text-xl font-semibold text-center leading-snug px-2 ${
          isLocked ? 'text-gray-400' : 'text-charcoal group-hover:text-rose transition-colors duration-300'
        }`}>
          {message.title}
        </h3>
        
        {isLocked && unlockDate && (
          <div className="mt-4 flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
            <Lock size={12} className="text-gray-400" />
            <span className="text-xs font-poppins text-gray-500 font-medium">
              Opens {unlockDate.toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        )}

        {/* Decorative Heart for unlocked state */}
        {!isLocked && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 text-rose">
            <Heart size={24} fill="currentColor" />
          </div>
        )}
      </motion.div>

      {/* Modal / Opened Letter */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20, rotateX: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-cream rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/50 overflow-hidden"
            >
              {/* Decorative Corner Flaps */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-peachglow/40 rounded-bl-full -z-10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose/10 rounded-tr-full -z-10 blur-2xl"></div>

              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-charcoal/40 hover:text-rose transition-all bg-white/50 hover:bg-white rounded-full p-2.5 shadow-sm"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8 text-center pt-2">
                <span className="font-dancing text-rose text-3xl mb-2 block">For you,</span>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal leading-tight">{message.title}</h2>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-rose/0 via-rose/20 to-rose/0"></div>
                <div className="prose prose-p:font-poppins prose-p:text-charcoal/80 prose-p:leading-loose prose-p:text-[15px] max-w-none text-left pl-2">
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <Heart size={24} className="text-rose/30" fill="currentColor" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
