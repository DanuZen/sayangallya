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
import Footer from "@/components/Footer";

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
      {/* Stage 1: Envelope Opening Intro */}
      <AnimatePresence>
        {stage === "envelope" && (
          <EnvelopeIntro onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Stage 2: Splash Story Steps */}
      <AnimatePresence>
        {stage === "splash" && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Website */}
      <AnimatePresence>
        {stage === "main" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative bg-[#F3EAE3]"
          >
            {/* Hero Section (Clean - No floating envelopes) */}
            <HeroSection />
            
            {/* Timeline & Photo Gallery Container (Floating envelopes exist ONLY here) */}
            <div className="relative z-20 w-full bg-[#F3EAE3]">
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
