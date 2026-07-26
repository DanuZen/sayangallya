"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import SplashScreen from "@/components/SplashScreen";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingMusicPlayer from "@/components/FloatingMusicPlayer";
import PhotoGallery from "@/components/PhotoGallery";
import FloatingEnvelopes from "@/components/FloatingEnvelopes";
import PaperPlaneNavigator from "@/components/PaperPlaneNavigator";
import FloatingQuickAccess from "@/components/FloatingQuickAccess";
import FloatingHearts from "@/components/FloatingHearts";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

type Stage = "envelope" | "splash" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("main");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("sayangallya_intro_seen");
      if (!hasSeenIntro) {
        setStage("envelope");
      }
      setIsLoaded(true);
    }
  }, []);

  const handleIntroDone = () => {
    setStage("splash");
  };

  const handleSplashFinish = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sayangallya_intro_seen", "true");
    }
    setStage("main");
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen relative bg-[#F3EAE3] selection:bg-rose/20">
      <SmoothScroll />
      {/* Stage 1: Envelope Opening Intro */}
      <AnimatePresence>
        {stage === "envelope" && (
          <EnvelopeIntro onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Stage 2: Splash Story Steps (Memory Slides) */}
      <AnimatePresence>
        {stage === "splash" && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>

      {/* Main Website */}
      <AnimatePresence>
        {stage === "main" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative overflow-hidden bg-[#FAF5EF]"
          >
            {/* Romantic Ambient Particles & Mouse Spotlight Overlay */}
            <FloatingHearts />

            {/* Atmospheric Ambient Backdrop Layers (Desktop Only) */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] ambient-glow-rose pointer-events-none z-0 hidden lg:block opacity-60" />
            <div className="absolute top-[35%] -left-[200px] w-[800px] h-[800px] rounded-full blur-[140px] ambient-glow-gold pointer-events-none z-0 hidden lg:block opacity-50" />
            <div className="absolute top-[65%] -right-[200px] w-[750px] h-[750px] rounded-full blur-[130px] ambient-glow-maroon pointer-events-none z-0 hidden lg:block opacity-40" />

            {/* Hero Section */}
            <div className="relative z-10">
              <HeroSection />
            </div>
            
            {/* Timeline & Photo Gallery Container with Photo Backdrops */}
            <div className="relative z-20 w-full">
              <Timeline />
              <PhotoGallery />
              <FloatingEnvelopes />
            </div>
            
            {/* Paper Plane Navigator (Scroll indicator) */}
            <PaperPlaneNavigator />

            {/* Romantic Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player & Floating Quick Access */}
      <FloatingMusicPlayer />
      {stage === "main" && <FloatingQuickAccess />}
    </main>
  );
}
