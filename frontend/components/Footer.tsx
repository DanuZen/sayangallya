"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#18090E] text-[#FAF5EF] pt-28 pb-20 sm:pt-36 sm:pb-24 border-t border-[#4A1E2C]/60 overflow-hidden">
      {/* Top Gradient Transition Fade to blend seamlessly with sections above */}
      <div className="absolute top-0 left-0 right-0 h-24 gradient-fade-top opacity-20 pointer-events-none" />

      {/* User's Authentic Crumpled Paper Backdrop (Soft Overlay for Dark Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/kertas.jpg" 
          alt="Footer Paper Texture" 
          fill 
          className="object-cover opacity-20 mix-blend-overlay" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F0C13]/80 via-[#18090E]/90 to-[#12050A]" />
      </div>

      {/* Romantic Soft Pink & Gold Ambient Light Halo behind Footer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-45 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(247,198,217,0.3) 0%, rgba(232,140,168,0.15) 50%, transparent 80%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Main Names Typography — Romantic Glowing Gold & Rose Light */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative inline-block mb-4"
          >
            <h3 
              className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.2em] bg-gradient-to-r from-[#FFF5ED] via-[#FDE2D0] to-[#F7C6D9] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(247,198,217,0.45)] select-none"
            >
              Danu &amp; Allya
            </h3>
          </motion.div>

          {/* Cursive Subtitle / Love Quote */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-dancing text-2xl sm:text-3xl text-[#FDE2D0] max-w-lg mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            &quot;Writing our endless love story, one beautiful moment at a time.&quot;
          </motion.p>

          {/* Decorative Divider Line */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#F7C6D9]/40 to-transparent mb-10" />

          {/* Quick Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-poppins text-xs uppercase tracking-[0.2em] text-[#FAF5EF]/80 mb-12"
          >
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-[#F7C6D9] hover:scale-105 transition-all duration-300">
              Home
            </a>
            <span className="text-[#F7C6D9]/40">•</span>
            <a href="/ruang-kita" className="hover:text-[#F7C6D9] hover:scale-105 transition-all duration-300">
              Ruang Kita
            </a>
            <span className="text-[#F7C6D9]/40">•</span>
            <a href="/bucket" className="hover:text-[#F7C6D9] hover:scale-105 transition-all duration-300">
              Bucket List
            </a>
            <span className="text-[#F7C6D9]/40">•</span>
            <a href="/game" className="hover:text-[#F7C6D9] hover:scale-105 transition-all duration-300">
              Mini Games
            </a>
            <span className="text-[#F7C6D9]/40">•</span>
            <a href="/dashboard" className="hover:text-[#F7C6D9] hover:scale-105 transition-all duration-300">
              Dashboard
            </a>
          </motion.div>

          {/* Romantic Bottom Copyright */}
          <p className="font-poppins text-[10px] tracking-[0.25em] text-[#FAF5EF]/40 uppercase">
            Made with <span className="text-[#E88CA8]">♡</span> for Danu &amp; Allya • Forever &amp; Always
          </p>

        </div>
      </div>
    </footer>
  );
}
