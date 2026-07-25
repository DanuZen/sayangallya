"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#E8DDD3] text-[#4A3228] pt-28 pb-24 sm:pt-36 sm:pb-28 border-t border-[#DCD0C5] overflow-hidden">
      {/* Subtle glowing ambient light behind footer */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(217,56,94,0.15) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Divider Line (Landing Area for Paper Plane) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-[1px] w-32 bg-[#C8B8AB]" />
          </motion.div>

          {/* Main Title / Monogram Names */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-[#3A2218] tracking-wide mb-4"
          >
            Danu &amp; Allya
          </motion.h3>

          {/* Romantic Closing Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dancing text-xl sm:text-2xl text-[#8C6050] max-w-lg mb-10"
          >
            &quot;Writing our endless love story, one beautiful moment at a time.&quot;
          </motion.p>

          {/* Quick Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-poppins text-xs uppercase tracking-widest text-[#6E4E40]"
          >
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-[#D9385E] transition-colors">
              Home
            </a>
            <span className="text-[#C8B8AB]">•</span>
            <a href="/ruang-kita" className="hover:text-[#D9385E] transition-colors">
              Ruang Kita
            </a>
            <span className="text-[#C8B8AB]">•</span>
            <a href="/bucket" className="hover:text-[#D9385E] transition-colors">
              Bucket List
            </a>
            <span className="text-[#C8B8AB]">•</span>
            <a href="/game" className="hover:text-[#D9385E] transition-colors">
              Mini Games
            </a>
            <span className="text-[#C8B8AB]">•</span>
            <a href="/dashboard" className="hover:text-[#D9385E] transition-colors">
              Dashboard
            </a>
          </motion.div>




        </div>
      </div>
    </footer>
  );
}
