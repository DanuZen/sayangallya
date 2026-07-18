"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  startDate: string;
}

export default function RelationshipTimer({ startDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      if (difference > 0) {
        // Approximate calculations for display purposes
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ years, months, days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (!isMounted) return null; // Avoid hydration mismatch

  const timeBlocks = [
    { label: "Years", value: timeLeft.years },
    { label: "Months", value: timeLeft.months },
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-12 mx-auto w-full max-w-4xl px-4 relative">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full z-0 pointer-events-none"></div>
      
      {/* Elegant Unified Glass Pane */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 grid grid-cols-3 md:grid-cols-6 gap-y-8 md:gap-y-0 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-2xl"
      >
        {timeBlocks.map((block, index) => (
          <div key={block.label} className="relative flex flex-col items-center justify-center">
            
            {/* Animated Number Wrapper */}
            <div className="relative h-[48px] md:h-[60px] lg:h-[72px] w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={block.value}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-charcoal drop-shadow-sm"
                >
                  {String(block.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="text-[10px] md:text-[11px] text-rose font-poppins font-bold uppercase tracking-[0.25em] mt-2 opacity-90">
              {block.label}
            </span>
            
            {/* Desktop Divider */}
            {index < timeBlocks.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-charcoal/10 rounded-full"></div>
            )}
            
            {/* Mobile Divider (rows of 3) */}
            {index % 3 !== 2 && (
              <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[60%] bg-charcoal/10 rounded-full"></div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
