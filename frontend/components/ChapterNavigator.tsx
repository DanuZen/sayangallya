"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ChapterNavigator() {
  return (
    <section className="w-full bg-[#F3EAE3] py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F3EAE3] to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 md:mb-16 z-20 px-4">
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
          Jelajahi Ruang Kita
        </motion.h2>
      </div>

      {/* Cards Container - Single Card "Ruang Kita" */}
      <div className="flex items-center justify-center w-full max-w-md px-6 z-20">
        <Link href="/ruang-kita" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group relative flex flex-col items-center p-10 md:p-12 rounded-t-full rounded-b-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-maroon/10 bg-gradient-to-b from-[#FDE2D0] to-[#E8DFF5]"
          >
            {/* Inner stroke */}
            <div className="absolute inset-3 border border-white/50 rounded-t-full rounded-b-2xl pointer-events-none" />
            
            {/* Heart Icon */}
            <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center text-rose-500 mb-6 shadow-md border border-white group-hover:scale-110 transition-transform duration-300">
              <Heart size={36} fill="currentColor" />
            </div>

            {/* Title */}
            <h3 className="font-dancing text-4xl md:text-5xl mb-3 text-center text-[#4A1E2C]">
              Ruang Kita
            </h3>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-[#4A1E2C]/20 my-3" />

            {/* Subtitle */}
            <p className="font-poppins text-xs md:text-sm text-center leading-relaxed px-4 font-medium text-[#4A1E2C]/80">
              Kuis Hubungan, Roda Keberuntungan Kencan, Papan Pesan Cinta & Impian Bersama
            </p>

            {/* Explore Text Button */}
            <div className="mt-8 font-poppins text-xs uppercase tracking-[0.25em] font-bold text-[#4A1E2C] group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5 bg-white/60 px-6 py-2.5 rounded-full shadow-xs">
              Masuk Ruang Kita &rarr;
            </div>
          </motion.div>
        </Link>
      </div>

    </section>
  );
}
