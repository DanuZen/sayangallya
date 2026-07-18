"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TimelineEvent {
  id: string;
  event_date: string;
  title: string;
  description: string;
  image_url?: string;
  rotation?: number; // Optional custom tilt
}

interface Props {
  event: TimelineEvent;
  index: number;
}

// Subtle random tilts for polaroid feel — alternating left/right
const TILTS = [-3, 2.5, -2, 3.5, -1.5, 2];

export default function TimelineItem({ event, index }: Props) {
  const isEven = index % 2 === 0;
  const tilt = event.rotation ?? TILTS[index % TILTS.length];

  return (
    <div className={`mb-16 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : ''} group`}>
      {/* Spacer for opposite side */}
      <div className="hidden md:block w-5/12" />

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-peachglow border-4 border-white shadow-sm z-10 items-center justify-center">
        <div className="w-3 h-3 bg-rose rounded-full" />
      </div>

      {/* Polaroid Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60, rotate: 0 }}
        whileInView={{ opacity: 1, x: 0, rotate: tilt }}
        whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 14 }}
        className="w-full md:w-5/12 ml-6 md:ml-0 cursor-pointer"
      >
        {/* Polaroid Frame */}
        <div className="bg-white rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] p-4 pb-6 relative"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.13), 4px 4px 0px rgba(0,0,0,0.04)' }}
        >
          {/* Mobile dot */}
          <div className="md:hidden absolute -left-10 top-6 w-6 h-6 rounded-full bg-peachglow border-4 border-white shadow-sm z-10 items-center justify-center flex">
            <div className="w-2 h-2 bg-rose rounded-full" />
          </div>

          {/* Photo area */}
          {event.image_url ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : (
            /* Placeholder if no photo */
            <div className="w-full aspect-[4/3] mb-4 bg-gradient-to-br from-peachglow/40 to-lavender/30 flex items-center justify-center">
              <svg width={40} height={40} viewBox="0 0 24 24" fill="currentColor" className="text-rose/40">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          )}

          {/* Polaroid caption area */}
          <div className="px-1">
            <span className="text-[11px] font-poppins text-rose/80 font-semibold tracking-[0.15em] uppercase block mb-1">
              {new Date(event.event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <h3 className="font-dancing text-2xl text-charcoal mb-1.5 leading-snug">{event.title}</h3>
            <p className="text-charcoal/65 font-poppins text-xs md:text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Subtle tape effect on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-peachglow/60 backdrop-blur-sm rounded-sm rotate-1 opacity-80 shadow-sm" />
        </div>
      </motion.div>
    </div>
  );
}
