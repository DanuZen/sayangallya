"use client";

import { useState } from "react";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import RelationshipTimer from "./RelationshipTimer";

const polaroidsData = [
  { id: 0, title: "first date", img: "/images/hero-bg.png", tapeRotate: "-4deg" },
  { id: 1, title: "love is in the air", img: "/images/hero-bg.png", tapeRotate: "1deg" },
  { id: 2, title: "sweetest smile", img: "/images/hero-bg.png", tapeRotate: "5deg" },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, 100]); // Reduced sinking effect
  const [positions, setPositions] = useState([0, 1, 2]); // Maps polaroid index -> slot index

  const handlePolaroidClick = (clickedIndex: number) => {
    const currentSlot = positions[clickedIndex];
    if (currentSlot === 1) return; // Already in center

    const centerIndex = positions.findIndex(slot => slot === 1);
    
    const newPositions = [...positions];
    newPositions[clickedIndex] = 1;
    newPositions[centerIndex] = currentSlot;
    setPositions(newPositions);
  };

  return (
    <section className="relative min-h-[110vh] w-full flex flex-col items-center overflow-hidden bg-[#F3EAE3]" id="hero">
      
      {/* Background Image with Cream Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/images/hero-bg.png" alt="Background" fill className="object-cover opacity-15 grayscale" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3EAE3]/60 via-[#F3EAE3]/90 to-[#F3EAE3]" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Top Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="w-full flex justify-between items-center px-4 md:px-12 lg:px-16 py-8 absolute top-0 z-50 text-maroon/80 font-poppins text-[9px] md:text-xs tracking-[0.2em] uppercase"
      >
        <div className="flex gap-4 md:gap-8 w-1/3"></div>
        <div className="flex flex-col items-center justify-center w-1/3 whitespace-nowrap">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-8 md:w-12 h-[1px] bg-maroon/40 hidden md:block"></div>
            <div className="font-playfair text-2xl md:text-4xl text-maroon tracking-[0.35em] font-bold">
              THE JOURNEY
            </div>
            <div className="w-8 md:w-12 h-[1px] bg-maroon/40 hidden md:block"></div>
          </div>
          <div className="font-dancing text-base md:text-xl text-maroon/70 lowercase mt-1.5 tracking-widest relative flex items-center justify-center gap-3 md:gap-4">
            <span className="w-1.5 h-1.5 rounded-full border border-maroon/50 inline-block"></span>
            a story of us
            <span className="w-1.5 h-1.5 rounded-full border border-maroon/50 inline-block"></span>
          </div>
        </div>
        <div className="flex gap-4 md:gap-8 justify-end w-1/3"></div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full pt-32 pb-48 relative z-10">
        
        {/* Polaroids Cluster Wrapper */}
        <div className="relative w-full max-w-[90rem] h-[450px] md:h-[600px] lg:h-[700px] flex items-center justify-center mt-20 md:mt-24 mb-12 z-20">
          
          {/* Left Text (Asymmetrical) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
            className="hidden md:block absolute left-4 lg:left-8 top-1/3 max-w-[200px] lg:max-w-[250px] z-30"
          >
            <p className="font-playfair text-maroon/80 text-sm lg:text-base leading-relaxed">
              Designing moments that linger long after the final toast.
            </p>
          </motion.div>

          {/* Right Text & Button (Asymmetrical) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.9 }}
            className="hidden md:flex absolute right-4 lg:right-8 top-[45%] max-w-[200px] lg:max-w-[250px] flex-col items-end text-right z-30 gap-6"
          >
            <p className="font-playfair text-maroon/80 text-sm lg:text-base leading-relaxed">
              Crafting soulful memories that feel as good as they look.
            </p>
            <a href="#timeline" className="inline-block bg-[#1B1425] text-[#F3EAE3] font-poppins text-[10px] tracking-[0.2em] px-6 py-3 rounded-full hover:bg-maroon transition-colors uppercase shadow-lg">
              Let's Celebrate
            </a>
          </motion.div>

          {polaroidsData.map((polaroid, index) => {
            const slot = positions[index];
            const isCenter = slot === 1;

            const slotProps = {
              0: {
                classes: "w-[180px] md:w-[320px] lg:w-[380px]",
                animate: { x: "-85%", y: 20, rotate: -15, scale: 1, zIndex: 10 },
                hover: { scale: 1.02, rotate: -15, y: 20 },
              },
              1: {
                classes: "w-[220px] md:w-[380px] lg:w-[460px] shadow-[0_25px_50px_rgba(74,30,44,0.25)]",
                animate: { x: "0%", y: -20, rotate: -2, scale: 1, zIndex: 50 },
                hover: { scale: 1.02, rotate: -2, y: -20 },
              },
              2: {
                classes: "w-[180px] md:w-[320px] lg:w-[380px]",
                animate: { x: "85%", y: 40, rotate: 12, scale: 1, zIndex: 10 },
                hover: { scale: 1.02, rotate: 12, y: 40 },
              }
            }[slot];

            return (
              <motion.div 
                key={polaroid.id}
                layout
                onClick={() => handlePolaroidClick(index)}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1, ...slotProps.animate }}
                whileHover={slotProps.hover}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: slot * 0.15 + 0.4 }}
                className={`absolute bg-[#FCFBF9] p-3 md:p-4 pb-10 md:pb-16 shadow-[0_15px_35px_rgba(74,30,44,0.15)] cursor-pointer origin-center ${slotProps.classes}`}
              >
                {/* Tape effect */}
                <div 
                  className="absolute -top-3 left-1/2 w-12 md:w-16 h-6 md:h-7 rounded-sm shadow-sm z-10 opacity-80" 
                  style={{ backgroundColor: "rgba(230,220,210,0.9)", transform: `translateX(-50%) rotate(${polaroid.tapeRotate})` }} 
                />
                
                {/* Image */}
                <div className={`relative w-full aspect-[4/5] bg-gray-100 overflow-hidden shadow-inner ${isCenter ? '' : 'grayscale'}`}>
                  <Image src={polaroid.img} alt="Memory" fill className="object-cover" />
                </div>
                
                {/* Text */}
                <p className={`font-dancing text-center ${isCenter ? 'text-2xl md:text-4xl text-maroon mt-5 md:mt-6' : 'text-lg md:text-2xl text-maroon/80 mt-4 md:mt-5'}`}>
                  {polaroid.title}
                </p>
              </motion.div>
            );
          })}

        </div> {/* End of Polaroids Cluster Wrapper */}

        {/* Giant Typography (Editorial Style) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
          className="relative z-30 w-full flex justify-center mt-12 md:mt-0 pointer-events-none mb-32 md:mb-48"
        >
          <motion.div style={{ y: textY }} className="relative inline-block text-center">
            {/* Massive "THE" */}
            <h1 className="font-playfair text-[8rem] md:text-[16rem] lg:text-[22rem] text-maroon font-bold tracking-tight select-none pt-4 pb-12">
              THE
            </h1>
            {/* Overlapping "Journey" and large feather */}
            <div className="absolute bottom-4 right-[-10%] md:right-[-5%] flex items-center justify-center">
               <h2 
                 className="font-dancing text-[6rem] md:text-[14rem] lg:text-[18rem] text-maroon drop-shadow-md whitespace-nowrap z-20" 
                 style={{ textShadow: "-3px -3px 0 #F3EAE3, 3px -3px 0 #F3EAE3, -3px 3px 0 #F3EAE3, 3px 3px 0 #F3EAE3" }}
               >
                 Journey
               </h2>
               {/* Large Feather intersecting text */}
               <svg viewBox="0 0 100 100" className="absolute z-10 w-[200px] md:w-[450px] lg:w-[600px] fill-maroon opacity-90 drop-shadow-2xl translate-x-[20%] translate-y-[20%] rotate-[-25deg]">
                 <path d="M50 0 C40 20 20 40 30 70 C35 85 50 100 50 100 C50 100 65 85 70 70 C80 40 60 20 50 0 Z M50 20 C45 40 40 60 45 80 C50 70 55 50 50 20 Z" />
               </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Corner Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.1 }}
          className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-16 flex flex-col sm:flex-row justify-between items-end z-50 pointer-events-none gap-6 sm:gap-0"
        >
          
          {/* Left: Description */}
          <div className="max-w-[200px] md:max-w-[320px] pointer-events-auto">
            <p className="font-playfair text-maroon/90 text-[10px] md:text-sm leading-relaxed text-center sm:text-left">
              From the first sketch of your vision to the final toast of the night, we curate every detail with intention.
            </p>
          </div>

          {/* Center: Timer */}
          <div className="pointer-events-auto mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:bottom-0">
            <RelationshipTimer startDate="2023-09-20" />
          </div>

          {/* Right: Premium Scroll Indicator */}
          <div className="hidden sm:flex flex-col items-center gap-3 pointer-events-none select-none">
            {/* Mouse icon */}
            <div className="relative" style={{ width: 22, height: 34 }}>
              <svg viewBox="0 0 22 34" width="22" height="34" fill="none">
                <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(74,30,44,0.35)" strokeWidth="1.5" />
                <motion.rect
                  x="9.5" y="5" width="3" height="7" rx="1.5"
                  fill="rgba(74,30,44,0.65)"
                  animate={{ y: [5, 11, 5], opacity: [0.9, 0.3, 0.9] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
              </svg>
            </div>
            {/* Vertical gradient line */}
            <div className="relative w-[1px] h-14 overflow-hidden rounded-full" style={{ background: "rgba(74,30,44,0.12)" }}>
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: "45%",
                  background: "linear-gradient(to bottom, transparent, rgba(74,30,44,0.7), transparent)"
                }}
                animate={{ y: ["-100%", "300%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
            {/* Label */}
            <span
              className="font-poppins uppercase tracking-[0.28em] text-maroon/40"
              style={{ fontSize: 7, writingMode: "vertical-rl", letterSpacing: "0.3em" }}
            >
              scroll
            </span>
          </div>
        </motion.div>
      </div>





      {/* Torn Paper Bottom Edge */}


      <div className="absolute bottom-0 w-full leading-none z-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 md:h-32 fill-cream drop-shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          {/* Organic wave imitating torn paper/clouds */}
          <path d="M0 120 L1200 120 L1200 60 C1100 90 1000 20 900 60 C800 100 700 30 600 70 C500 110 400 30 300 70 C200 110 100 40 0 60 Z"></path>
        </svg>
      </div>


    </section>
  );
}
