"use client";

import { motion } from "framer-motion";
import EnvelopeCard from "./EnvelopeCard";

const dummyMessages = [
  {
    id: "1",
    title: "Buka saat kangen",
    content: "Hai sayang, kalau kamu baca ini berarti kamu lagi kangen ya? Sabar ya, we will see each other soon. Just know that I am missing you too, probably even more. I love you! ❤️",
  },
  {
    id: "2",
    title: "Buka saat ngerasa sedih",
    content: "Everything is going to be okay. Kamu sudah melakukan yang terbaik. Tarik napas dalam-dalam, istirahat sebentar. I am always here for you, no matter what.",
  },
  {
    id: "3",
    title: "Happy Anniversary!",
    content: "Happy Anniversary sayang! Terima kasih sudah bertahan denganku selama ini. Let's make more beautiful memories together.",
    unlock_date: "2026-09-20",
  },
  {
    id: "4",
    title: "Just a reminder",
    content: "You are the most beautiful person I have ever met, inside and out. I'm so lucky to be yours.",
  },
];

export default function SecretMessages() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      id="secret-messages"
      style={{ backgroundColor: "#4A1E2C" }}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Floating feather decorations */}
      <div className="absolute top-16 right-12 opacity-10 w-20 pointer-events-none rotate-12">
        <svg viewBox="0 0 100 100" className="fill-[#F3EAE3]">
          <path d="M50 0 C40 20 20 40 30 70 C35 85 50 100 50 100 C50 100 65 85 70 70 C80 40 60 20 50 0 Z M50 20 C45 40 40 60 45 80 C50 70 55 50 50 20 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Animated Section Header — inverted (cream on maroon) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-24 md:mb-32 relative flex flex-col items-center justify-center text-center pt-10"
        >
          {/* Decorative Top Element */}
          <div className="flex items-center gap-4 mb-4 opacity-60">
            <div className="w-10 md:w-16 h-[1px] bg-[#F3EAE3]/40" />
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#F3EAE3" strokeWidth={1.5} className="rotate-45">
              <rect x="4" y="4" width="16" height="16" rx="1" />
              <circle cx="12" cy="12" r="3" fill="#F3EAE3" opacity="0.5" />
            </svg>
            <div className="w-10 md:w-16 h-[1px] bg-[#F3EAE3]/40" />
          </div>

          {/* Title wrapper */}
          <div className="relative inline-block mt-2">
            {/* Teks 1 - outline stroke text, full section name */}
            <h2 className="font-playfair font-bold leading-none tracking-[0.15em] select-none"
              style={{ 
                fontSize: "clamp(2rem, 6vw, 5rem)",
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(243, 234, 227, 0.45)"
              }}>
              SECRET Messages
            </h2>

            {/* Teks 2 - script, smaller, bottom-right corner */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-dancing drop-shadow-sm absolute -bottom-4 right-0"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1, color: "#F3EAE3" }}
            >
              Whispers
            </motion.div>
          </div>

          {/* Subtitle with flanking lines */}
          <div className="flex items-center justify-center mt-6 md:mt-10 w-full max-w-2xl px-4">
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F3EAE3]/20" />
            <p className="font-poppins text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase px-4 md:px-8"
              style={{ color: "rgba(243,234,227,0.45)" }}>
              Little letters for you. Some you can read now, some you have to wait for.
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F3EAE3]/20" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {dummyMessages.map((msg) => (
            <div key={msg.id} className="h-full">
              <EnvelopeCard message={msg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
