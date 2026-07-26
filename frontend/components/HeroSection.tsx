"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import RelationshipTimer from "@/components/RelationshipTimer";
import { TornPaperEdgeBottom } from "@/components/TornPaperEdge";

const polaroidsData = [
  { id: 0, title: "first date", img: "/images/hero-bg.png", tapeRotate: "-4deg" },
  { id: 1, title: "love is in the air", img: "/images/hero-bg.png", tapeRotate: "1deg" },
  { id: 2, title: "sweetest smile", img: "/images/hero-bg.png", tapeRotate: "5deg" },
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, 60]);
  const [positions, setPositions] = useState([0, 1, 2]);

  const handlePolaroidClick = (clickedIndex: number) => {
    const currentSlot = positions[clickedIndex];
    if (currentSlot === 1) return;

    const centerIndex = positions.findIndex(slot => slot === 1);
    const newPositions = [...positions];
    newPositions[clickedIndex] = 1;
    newPositions[centerIndex] = currentSlot;
    setPositions(newPositions);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-[#F3EAE3]" id="hero">
      {/* Background Image with Authentic Crisp Crumpled Paper Overlay & Ambient Pink Halo */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image src="/kertas.jpg" alt="Paper Backdrop" fill className="object-cover opacity-75 mix-blend-multiply" priority />
        <Image src="/images/hero-bg.png" alt="Background" fill className="object-cover opacity-15 mix-blend-overlay" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EF]/35 via-[#F3EAE3]/40 to-[#FAF5EF]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-28 md:h-40 gradient-fade-bottom z-10" />
        
        {/* Romantic Light Leak Overlay */}
        <div className="absolute inset-0 light-leak-overlay opacity-60" />

        {/* Soft Radial Backlight Spotlight (Desktop Halo) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[650px] md:h-[900px] rounded-full bg-radial from-[#F7C6D9]/25 via-[#FDE2D0]/15 to-transparent blur-3xl hidden md:block" />

        {/* Floating Sparkle Particles */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#E88CA8] sparkle-particle hidden md:block" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-[35%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FDE2D0] sparkle-particle hidden md:block" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[65%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#E88CA8] sparkle-particle hidden md:block" style={{ animationDelay: "2.8s" }} />
        <div className="absolute top-[75%] right-[25%] w-2 h-2 rounded-full bg-[#C5A8E0] sparkle-particle hidden md:block" style={{ animationDelay: "4.1s" }} />

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
            <div className="font-playfair text-2xl md:text-4xl gold-shimmer-text tracking-[0.35em] font-bold">
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
      <div className="flex-1 flex flex-col items-center justify-center w-full pt-32 md:pt-36 pb-12 relative z-10">
        
        {/* Polaroids Cluster Wrapper */}
        <div className="relative w-full max-w-[90rem] h-[400px] md:h-[550px] lg:h-[620px] flex items-center justify-center mt-12 md:mt-16 lg:mt-20 mb-8 z-20">
          
          {/* Left Text (Asymmetrical) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
            className="hidden md:block absolute left-4 lg:left-8 top-1/3 max-w-[200px] lg:max-w-[250px] z-30"
          >
            <p className="font-playfair text-maroon/80 text-sm lg:text-base leading-relaxed italic">
              Mengukir setiap detik kenangan indah dalam perjalanan cinta kita.
            </p>
          </motion.div>

          {/* Right Text & Button (Asymmetrical) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.9 }}
            className="hidden md:flex absolute right-4 lg:right-8 top-[45%] max-w-[200px] lg:max-w-[250px] flex-col items-end text-right z-30 gap-6"
          >
            <p className="font-playfair text-maroon/80 text-sm lg:text-base leading-relaxed italic">
              Merayakan setiap kisah & tawa yang telah kita lalui bersama.
            </p>
            <a href="#timeline" className="inline-block bg-[#4A1E2C] text-[#F3EAE3] font-poppins text-[10px] tracking-[0.2em] px-6 py-3 rounded-full hover:bg-maroon/80 transition-colors uppercase shadow-md">
              Jelajahi Cerita
            </a>
          </motion.div>

          {polaroidsData.map((polaroid, index) => {
            const slot = positions[index];
            const isCenter = slot === 1;

            const slotPropsConfig = {
              0: {
                classes: "w-[180px] md:w-[320px] lg:w-[380px]",
                animate: { x: "-85%", y: 20, rotate: -15, scale: 1, zIndex: 10 },
                hover: { scale: 1.02, rotate: -15, y: 20 },
              },
              1: {
                classes: "w-[220px] md:w-[380px] lg:w-[460px]",
                animate: { x: "0%", y: -20, rotate: -2, scale: 1, zIndex: 50 },
                hover: { scale: 1.02, rotate: -2, y: -20 },
              },
              2: {
                classes: "w-[180px] md:w-[320px] lg:w-[380px]",
                animate: { x: "85%", y: 40, rotate: 12, scale: 1, zIndex: 10 },
                hover: { scale: 1.02, rotate: 12, y: 40 },
              }
            };
            const slotProps = slotPropsConfig[slot as keyof typeof slotPropsConfig] || slotPropsConfig[0];

            return (
              <motion.div 
                key={polaroid.id}
                layout
                onClick={() => handlePolaroidClick(index)}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, ...slotProps.animate }}
                whileHover={slotProps.hover}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: slot * 0.15 + 0.4 }}
                className={`absolute cursor-pointer origin-center ${slotProps.classes}`}
              >
                {/* Single Unified Floating Sway Frame */}
                <div
                  className={`polaroid-sway w-full h-full bg-[#FCFBF9] p-3 md:p-4 pb-10 md:pb-16 relative rounded-sm ${
                    isCenter 
                      ? 'shadow-[0_25px_50px_rgba(74,30,44,0.25)]' 
                      : 'shadow-[0_15px_35px_rgba(74,30,44,0.15)]'
                  }`}
                  style={{
                    "--base-rot": "0deg",
                    animationDelay: `${index * 0.6}s`,
                    animationDuration: `${9 + (index % 3) * 1.5}s`,
                  } as React.CSSProperties}
                >
                  <div 
                    className="absolute -top-3 left-1/2 w-12 md:w-16 h-6 md:h-7 rounded-sm shadow-sm z-10 opacity-80" 
                    style={{ backgroundColor: "rgba(230,220,210,0.9)", transform: `translateX(-50%) rotate(${polaroid.tapeRotate})` }} 
                  />
                  <div className={`relative w-full aspect-[4/5] bg-gray-100 overflow-hidden shadow-inner ${isCenter ? '' : 'grayscale'}`}>
                    <Image src={polaroid.img} alt="Memory" fill className="object-cover" />
                  </div>
                  <p className={`font-dancing text-center ${isCenter ? 'text-2xl md:text-4xl text-maroon mt-5 md:mt-6' : 'text-lg md:text-2xl text-maroon/80 mt-4 md:mt-5'}`}>
                    {polaroid.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Giant Typography (Editorial Style) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
          className="relative z-20 w-full flex flex-col items-center mt-12 md:mt-16 lg:mt-20 pointer-events-none mb-6 md:mb-10"
        >
          <motion.div style={{ y: textY }} className="relative inline-block text-center">
            <h1 className="font-playfair text-[6rem] md:text-[12rem] lg:text-[16rem] text-maroon font-bold tracking-tight select-none pt-4 pb-8">
              THE
            </h1>
            <div className="absolute bottom-4 right-[-10%] md:right-[-5%] flex items-center justify-center">
               <h2 
                 className="font-dancing text-[4.5rem] md:text-[10rem] lg:text-[13rem] text-maroon drop-shadow-md whitespace-nowrap z-20" 
                 style={{ textShadow: "-3px -3px 0 #F3EAE3, 3px -3px 0 #F3EAE3, -3px 3px 0 #F3EAE3, 3px 3px 0 #F3EAE3" }}
               >
                 Journey
               </h2>
            </div>
          </motion.div>

          {/* Subtitle text positioned directly below "THE Journey" and center aligned */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 md:mt-10 max-w-sm md:max-w-md px-4 text-center pointer-events-auto z-30"
          >
            <p className="font-playfair text-maroon/90 text-xs md:text-sm leading-relaxed text-center italic">
              Setiap detik bersamamu adalah momen paling berharga yang takkan pernah pudar.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Timer (100% Dead-Center Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 1.1 }}
          className="relative w-full px-6 md:px-16 flex justify-center items-center z-30 mt-4 md:mt-8"
        >
          <div className="w-full flex justify-center items-center pointer-events-auto relative">
            {/* Subtle Pink Ambient Halo behind timer */}
            <div className="absolute inset-0 max-w-2xl mx-auto rounded-full bg-[#F7C6D9]/25 blur-2xl pointer-events-none z-0" />
            <div className="relative z-10">
              <RelationshipTimer startDate="2023-09-20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
