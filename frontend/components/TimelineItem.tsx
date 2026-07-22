"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TimelineEvent {
  id: string;
  event_date: string;
  title: string;
  description: string;
  image_url?: string;
  rotation?: number;
}

interface Props {
  event: TimelineEvent;
  index: number;
}

const TILTS = [-3, 2.5, -2, 3.5, -1.5, 2];

export default function TimelineItem({ event, index }: Props) {
  const isEven = index % 2 === 0;
  const tilt = event.rotation ?? TILTS[index % TILTS.length];

  return (
    <div className={`mb-24 flex justify-between items-center w-full ${isEven ? "flex-row-reverse" : ""} group`}>
      
      {/* Description Text (Desktop: Opposite side of timeline) */}
      <div className={`hidden md:flex w-5/12 flex-col justify-center px-8 ${isEven ? "items-start text-left" : "items-end text-right"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`w-16 h-[1px] bg-[#4A1E2C]/20 mb-6 ${isEven ? "ml-0" : "ml-auto"}`} />
          <h4 className="font-playfair text-xl text-[#4A1E2C] mb-3 opacity-90">The Story</h4>
          <p className="font-poppins text-base leading-relaxed text-[#4A1E2C]/70">
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot — small maroon circle */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#4A1E2C] border-2 border-[#F3EAE3] shadow-md z-10" />

      {/* Polaroid Column */}
      <div className="w-full md:w-5/12 ml-6 md:ml-0">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: tilt }}
          whileHover={{ rotate: 0, scale: 1.03, y: -8, zIndex: 30 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 14 }}
          className="w-full cursor-pointer relative"
        >
          {/* Polaroid Frame */}
          <div
            className="rounded-sm relative bg-[#FCFBF9]"
            style={{
              boxShadow: "0 15px 40px rgba(0,0,0,0.12), 4px 4px 0px rgba(0,0,0,0.04)",
              padding: "12px 12px 76px", // Increased bottom padding to fit title perfectly
            }}
          >
            {/* Mobile dot */}
            <div className="md:hidden absolute -left-10 top-6 w-4 h-4 rounded-full bg-[#4A1E2C] border-2 border-[#F3EAE3] shadow-sm z-10" />

            {/* Tape effect */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-7 rounded-sm rotate-1 z-10 opacity-70 shadow-sm"
              style={{ backgroundColor: "rgba(230,220,210,0.9)", border: "1px solid rgba(74,30,44,0.1)" }} />

            {/* Photo area */}
            {event.image_url ? (
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 shadow-inner">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] bg-[#F3EAE3] flex items-center justify-center">
                <svg width={40} height={40} viewBox="0 0 24 24" fill="currentColor" className="text-[#4A1E2C]/30">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            )}

            {/* Caption area (Title and Date Only) */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 flex flex-col justify-center h-[76px] items-center text-center">
              <span className="text-[9px] md:text-[10px] font-poppins tracking-[0.2em] uppercase font-semibold mb-1"
                style={{ color: "rgba(74,30,44,0.5)" }}>
                {new Date(event.event_date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <h3 className="font-dancing text-2xl md:text-3xl leading-none" style={{ color: "#4A1E2C" }}>
                {event.title}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Description Text (Mobile: Below the polaroid) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden mt-8 px-2"
        >
          <div className="w-10 h-[1px] bg-[#4A1E2C]/20 mb-4" />
          <p className="font-poppins text-sm leading-relaxed text-[#4A1E2C]/75">
            {event.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
