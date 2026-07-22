"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const chapters = [
  {
    id: "bucket",
    title: "Mimpi Kita",
    subtitle: "Daftar janji dan rencana masa depan",
    emoji: "✈️",
    href: "/bucket",
    color: "#E8DFF5",
    textColor: "#3A2A45",
  },
  {
    id: "game",
    title: "Tebak-Tebakan",
    subtitle: "Seberapa jauh kamu mengenalku?",
    emoji: "🎲",
    href: "/game",
    color: "#FDE2D0",
    textColor: "#5A3020",
  }
];

export default function ChapterNavigator() {
  return (
    <section className="w-full bg-[#F3EAE3] py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F3EAE3] to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 md:mb-24 z-20 px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-maroon/50 mb-4"
        >
          Langkah Selanjutnya
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-maroon font-bold"
        >
          Jelajahi Bab Kita
        </motion.h2>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-10 w-full max-w-6xl px-6 z-20">
        {chapters.map((chapter, index) => (
          <Link href={chapter.href} key={chapter.id} className="w-full md:w-1/3 max-w-[320px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative flex flex-col items-center p-8 rounded-t-full rounded-b-3xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-maroon/5"
              style={{ backgroundColor: chapter.color }}
            >
              {/* Inner stroke */}
              <div className="absolute inset-3 border border-white/40 rounded-t-full rounded-b-2xl pointer-events-none" />
              
              {/* Emoji Icon */}
              <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center text-4xl mb-6 shadow-sm border border-white/80 group-hover:scale-110 transition-transform duration-300">
                {chapter.emoji}
              </div>

              {/* Title */}
              <h3 className="font-dancing text-3xl md:text-4xl mb-3 text-center" style={{ color: chapter.textColor }}>
                {chapter.title}
              </h3>

              {/* Divider */}
              <div className="w-12 h-[1px] bg-black/10 my-3" />

              {/* Subtitle */}
              <p className="font-poppins text-[11px] md:text-xs text-center leading-relaxed px-2 font-medium opacity-70" style={{ color: chapter.textColor }}>
                {chapter.subtitle}
              </p>

              {/* Explore Text */}
              <div className="mt-8 font-poppins text-[9px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: chapter.textColor }}>
                Buka Bab &rarr;
              </div>

            </motion.div>
          </Link>
        ))}
      </div>

    </section>
  );
}
