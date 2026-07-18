"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import RelationshipTimer from "./RelationshipTimer";

export default function HeroSection() {
  const { scrollY } = useScroll();

  // Fade out and move text down as user scrolls down the page
  const textY = useTransform(scrollY, [0, 600], [0, 250]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden bg-cream" id="hero">
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/hero-bg.png"
            alt="Romantic Background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        {/* Soft pastel gradient overlay - transparent at bottom to blend with sliding sheet */}
        <div className="absolute inset-0 bg-gradient-to-b from-blush/30 via-peach/20 to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center -mt-10 md:-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-dancing text-rose text-3xl md:text-5xl mb-4 tracking-wider drop-shadow-[0_2px_4px_rgba(232,140,168,0.4)]">
            Our Love Story
          </span>
          <div className="relative overflow-hidden mb-6 py-2 px-4 rounded-xl">
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] relative z-10">
              The Journey Of Us
            </h1>
            {/* Sweeping Light Flare Overlay */}
            <motion.div
              animate={{ x: ['-200%', '300%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[30deg] w-1/2"
            />
          </div>
          <p className="font-poppins text-lg md:text-2xl text-charcoal/80 max-w-xl font-medium leading-relaxed drop-shadow-sm">
            "Every second with you is a blessing."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 md:mt-12 w-full max-w-4xl"
        >
          <RelationshipTimer startDate="2023-09-20" />
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-xs text-charcoal/60 uppercase tracking-widest mb-2 font-poppins">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-rose/50"
        />
      </motion.div>
    </section>
  );
}
