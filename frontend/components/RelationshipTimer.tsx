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
    <div className="mx-auto w-full relative">
      {/* Seamless Editorial Timer (No Card Container) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex items-center justify-center gap-3 sm:gap-5 md:gap-7"
      >
        {timeBlocks.map((block, index) => (
          <div key={block.label} className="relative flex flex-col items-center justify-center px-1.5 sm:px-2.5">
            
            {/* Animated Number Wrapper */}
            <div className="relative h-[36px] sm:h-[46px] md:h-[56px] min-w-[36px] sm:min-w-[48px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={block.value}
                  initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#4A1E2C] tracking-tight"
                >
                  {String(block.value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#E88CA8] font-poppins font-bold uppercase tracking-[0.22em] mt-1 opacity-90">
              {block.label}
            </span>
            
            {/* Elegant Divider between columns */}
            {index < timeBlocks.length - 1 && (
              <div className="absolute -right-1 sm:-right-2.5 md:-right-3.5 top-1/2 -translate-y-1/2 w-[1px] h-[55%] bg-[#4A1E2C]/15 rounded-full" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
