"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  { 
    id: 1, 
    src: "/images/hero-bg.png", 
    caption: "The beginning of forever", 
    rotation: -4 
  },
  { 
    id: 2, 
    src: "/images/hero-bg.png", 
    caption: "Lost in your eyes", 
    rotation: 6 
  },
  { 
    id: 3, 
    src: "/images/hero-bg.png", 
    caption: "Coffee dates", 
    rotation: -3 
  },
  { 
    id: 4, 
    src: "/images/hero-bg.png", 
    caption: "Late night drives", 
    rotation: 8 
  },
  { 
    id: 5, 
    src: "/images/hero-bg.png", 
    caption: "Just us", 
    rotation: -6 
  },
  { 
    id: 6, 
    src: "/images/hero-bg.png", 
    caption: "To many more adventures", 
    rotation: 4 
  },
];

export default function PhotoGallery() {
  return (
    <section className="w-full bg-[#F3EAE3] py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header (Matches Timeline) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 md:mb-20 relative flex flex-col items-center justify-center text-center"
        >
          {/* Decorative Top Element */}
          <div className="flex items-center gap-4 mb-4 opacity-70">
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#4A1E2C" strokeWidth={1.5} className="rotate-45">
              <rect x="4" y="4" width="16" height="16" rx="1" />
              <circle cx="12" cy="12" r="3" fill="#4A1E2C" opacity="0.5" />
            </svg>
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
          </div>

          {/* Title wrapper */}
          <div className="relative inline-block mt-2">
            {/* Teks 1 - outline stroke text */}
            <h2 className="font-playfair font-bold leading-none tracking-[0.15em] select-none uppercase"
              style={{ 
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(74, 30, 44, 0.4)"
              }}>
              Captured
            </h2>
            
            {/* Teks 2 - script, smaller, bottom-right corner */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-dancing text-[#4A1E2C] drop-shadow-sm absolute -bottom-6 right-0"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1 }}
            >
              Moments
            </motion.div>
          </div>

          {/* Subtitle with flanking lines */}
          <div className="flex items-center justify-center mt-10 md:mt-14 w-full max-w-2xl px-4">
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#4A1E2C]/20" />
            <p className="font-poppins text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#4A1E2C]/50 relative z-10 px-4 md:px-8 text-center leading-relaxed">
              Kepingan memori yang kita abadikan bersama, selamanya.
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#4A1E2C]/20" />
          </div>
        </motion.div>

        {/* Scattered Polaroids */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 pt-10">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
              className="group relative cursor-pointer"
              style={{ zIndex: index }} // Base z-index so they stack correctly in order
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.4 } }}
            >
              {/* Polaroid Frame */}
              <div 
                className="bg-[#FCFBF9] p-4 pb-6 shadow-[0_15px_35px_rgba(0,0,0,0.1)] rounded-[2px] transition-shadow duration-500 group-hover:shadow-[0_25px_50px_rgba(74,30,44,0.15)] w-[280px] md:w-[320px]"
                style={{ transform: `rotate(${photo.rotation}deg)` }}
              >
                {/* Washi Tape */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#E6D5C9]/70 backdrop-blur-sm z-20"
                  style={{ 
                    transform: `rotate(${photo.rotation > 0 ? -4 : 3}deg)`,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }} 
                />

                {/* Photo Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                  <Image 
                    src={photo.src} 
                    alt={photo.caption}
                    fill
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] pointer-events-none" />
                </div>
                
                {/* Handwriting Caption */}
                <div className="w-full mt-5 px-2 text-center flex flex-col items-center justify-center min-h-[48px]">
                  <p className="font-dancing text-[#4A1E2C] text-2xl md:text-[28px] font-medium tracking-wide leading-tight">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
