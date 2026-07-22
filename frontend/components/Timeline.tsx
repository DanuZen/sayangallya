"use client";

import TimelineItem from "./TimelineItem";
import { motion } from "framer-motion";
// Dummy Data
const dummyEvents = [
  {
    id: "1",
    event_date: "2023-09-20",
    title: "First Time We Met",
    description: "The day everything changed. We talked for hours at the corner cafe and I just knew you were someone special.",
    image_url: "/images/dummy-photo.png"
  },
  {
    id: "2",
    event_date: "2023-11-15",
    title: "Our First Trip Together",
    description: "Driving to the mountains, singing along to our favorite songs. The sunset view was breathtaking, but not as much as you.",
    image_url: "/images/dummy-photo.png"
  },
  {
    id: "3",
    event_date: "2024-02-14",
    title: "Valentine's Day",
    description: "A simple dinner, but filled with so much laughter and love. You gave me that handwritten letter that I still keep in my wallet.",
  }
];

export default function Timeline() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      id="timeline"
      style={{ backgroundColor: "#F3EAE3" }}
    >
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Swan Agency–style stacked title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-24 md:mb-32 relative flex flex-col items-center justify-center text-center pt-10"
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
            {/* Teks 1 - outline stroke text, full section name */}
            <h2 className="font-playfair font-bold leading-none tracking-[0.15em] select-none"
              style={{ 
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(74, 30, 44, 0.4)"
              }}>
              Our Timeline
            </h2>
            
            {/* Teks 2 - script, smaller, bottom-right corner */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-dancing text-[#4A1E2C] drop-shadow-sm absolute -bottom-4 right-0"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}
            >
              Memories
            </motion.div>
          </div>
          
          {/* Subtitle with flanking lines */}
          <div className="flex items-center justify-center mt-6 md:mt-10 w-full max-w-2xl px-4">
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#4A1E2C]/20" />
            <p className="font-poppins text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase text-[#4A1E2C]/50 relative z-10 px-4 md:px-8">
              Every beautiful moment we've shared, leading up to today.
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#4A1E2C]/20" />
          </div>
        </motion.div>

        <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
          {/* Vertical line — thin maroon */}
          <div className="absolute h-full border-l border-[#4A1E2C]/20 left-4 md:left-1/2 transform md:-translate-x-1/2 top-0" />

          {dummyEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
