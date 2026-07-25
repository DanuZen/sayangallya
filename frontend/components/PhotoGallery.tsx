"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { 
    id: 1, 
    src: "/images/hero-bg.png", 
    caption: "The beginning of forever",
    date: "14 Februari 2024",
    location: "Taman Bunga, Bandung",
    story: "Hari di mana kisah indah ini resmi dimulai. Senyuman manismu hari itu selalu menjadi alasan di balik bahagiaku setiap harinya.",
    rotation: -4 
  },
  { 
    id: 2, 
    src: "/images/hero-bg.png", 
    caption: "Lost in your eyes",
    date: "28 Maret 2024",
    location: "Bukit Bintang",
    story: "Tatap mata yang selalu menenangkan raguku. Di matamu, aku selalu menemukan hangatnya rumah tempatku pulang.",
    rotation: 6 
  },
  { 
    id: 3, 
    src: "/images/hero-bg.png", 
    caption: "Coffee dates",
    date: "12 Mei 2024",
    location: "Kedai Kopi Favorit",
    story: "Kopi hangat dan obrolan manis tanpa akhir tentang impian kita bersama. Momen sederhana yang selalu paling kurindukan.",
    rotation: -3 
  },
  { 
    id: 4, 
    src: "/images/hero-bg.png", 
    caption: "Late night drives",
    date: "19 Juni 2024",
    location: "Jalanan Kota Malam Hari",
    story: "Menembus dinginnya malam berdua, mendengarkan lagu favorit kita yang diputar berulang kali di dalam mobil.",
    rotation: 8 
  },
  { 
    id: 5, 
    src: "/images/hero-bg.png", 
    caption: "Just us",
    date: "17 Agustus 2024",
    location: "Pantai Senja",
    story: "Hanya ada aku, kamu, dan suara ombak. Tak perlu banyak kata, kehadiranmu saja sudah cukup melengkapi segalanya.",
    rotation: -6 
  },
  { 
    id: 6, 
    src: "/images/hero-bg.png", 
    caption: "To many more adventures",
    date: "31 Desember 2024",
    location: "Puncak Gunung",
    story: "Langkah kita masih sangat panjang, dan aku bersyukur bisa menjelajahi indah dunia ini bergandengan tangan bersamamu.",
    rotation: 4 
  },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});

  // Lock body scroll and hide paper plane when popup is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.classList.add("modal-open", "envelope-open");
      document.documentElement.classList.add("modal-open", "envelope-open");
    } else {
      document.body.classList.remove("modal-open", "envelope-open");
      document.documentElement.classList.remove("modal-open", "envelope-open");
    }

    return () => {
      document.body.classList.remove("modal-open", "envelope-open");
      document.documentElement.classList.remove("modal-open", "envelope-open");
    };
  }, [selectedPhoto]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20 pt-20 md:pt-28">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
              className="relative z-30 group cursor-pointer select-none transition-transform duration-300 hover:scale-[1.04] hover:z-50"
            >
              {/* Native Button with Gentle CSS Sway Animation (9-12s ultra peaceful cycle) */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="polaroid-sway block bg-[#FCFBF9] p-4 pb-6 shadow-[0_15px_35px_rgba(0,0,0,0.1)] rounded-[2px] transition-shadow duration-500 hover:shadow-[0_25px_50px_rgba(74,30,44,0.25)] w-[280px] md:w-[320px] text-left cursor-pointer border-0 outline-none relative z-10"
                style={{
                  "--base-rot": `${photo.rotation}deg`,
                  animationDelay: `${index * 0.4}s`,
                  animationDuration: `${9 + (index % 3) * 1.5}s`
                } as React.CSSProperties}
              >
                {/* Washi Tape */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#E6D5C9]/70 backdrop-blur-sm z-20 pointer-events-none"
                  style={{ 
                    transform: `rotate(${photo.rotation > 0 ? -4 : 3}deg)`,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }} 
                />

                {/* Photo Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200 rounded-[1px] pointer-events-none">
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
                <div className="w-full mt-5 px-2 text-center flex flex-col items-center justify-center min-h-[48px] pointer-events-none">
                  <p className="font-dancing text-[#4A1E2C] text-2xl md:text-[28px] font-medium tracking-wide leading-tight">
                    {photo.caption}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* POLAROID MODAL POPUP */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="polaroid-modal-backdrop"
            initial={{ opacity: 0, pointerEvents: "auto" }}
            animate={{ opacity: 1, pointerEvents: "auto" }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.15 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[9999] bg-[#2A1820]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto cursor-pointer pointer-events-auto touch-none overscroll-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: [0, -4, 0],
                rotate: [-0.8, 0.8, -0.8]
              }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ 
                scale: { type: "spring", damping: 25, stiffness: 300 },
                opacity: { duration: 0.3 },
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#FCFBF9] p-6 md:p-8 rounded-[4px] shadow-[0_30px_90px_rgba(0,0,0,0.5)] max-w-md md:max-w-lg w-full border border-[#E6D5C9]/50 my-auto cursor-default"
            >
              {/* Decorative Washi Tape on Modal */}
              <div 
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-36 h-9 bg-[#E6D5C9]/80 backdrop-blur-sm z-20"
                style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.08)" }} 
              />

              {/* Large Photo Display (Full Color in Popup) */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100 rounded-[2px] shadow-inner mb-6">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] pointer-events-none" />
              </div>

              {/* Memory Details Section */}
              <div className="flex flex-col items-center text-center space-y-4 px-2">
                {/* Title */}
                <h3 className="font-dancing text-[#4A1E2C] text-3xl sm:text-4xl font-bold tracking-wide">
                  {selectedPhoto.caption}
                </h3>

                {/* Metadata Pills: Date & Location */}
                <div className="flex flex-wrap items-center justify-center gap-3 font-poppins text-xs text-[#8C6050]">
                  <span className="flex items-center gap-1.5 bg-[#F3EAE3] px-3 py-1.5 rounded-full border border-[#E6D5C9]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {selectedPhoto.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#F3EAE3] px-3 py-1.5 rounded-full border border-[#E6D5C9]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {selectedPhoto.location}
                  </span>
                </div>

                {/* Story / Description */}
                <p className="font-serif italic text-[#5A3E32] text-sm sm:text-base leading-relaxed max-w-lg bg-[#F8F3EE] p-4 rounded-lg border border-[#E8DDD3] mt-2">
                  &quot;{selectedPhoto.story}&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

