"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import SplashScreen from "@/components/SplashScreen";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingMusicPlayer from "@/components/FloatingMusicPlayer";
import ChapterNavigator from "@/components/ChapterNavigator";
import PhotoGallery from "@/components/PhotoGallery";
import FloatingEnvelopes from "@/components/FloatingEnvelopes";
import PaperPlaneNavigator from "@/components/PaperPlaneNavigator";

type Stage = "envelope" | "splash" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("envelope");

  return (
    <main className="min-h-screen relative bg-maroon selection:bg-rose/20">
      {/* Stage 1: Envelope Opening Intro */}
      <AnimatePresence>
        {stage === "envelope" && (
          <EnvelopeIntro onDone={() => setStage("splash")} />
        )}
      </AnimatePresence>

      {/* Stage 2: Splash Story Steps */}
      <AnimatePresence>
        {stage === "splash" && (
          <SplashScreen onFinish={() => setStage("main")} />
        )}
      </AnimatePresence>

      {/* Stage 3: Main Website */}
      <AnimatePresence>
        {stage === "main" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Sticky Parallax Hero */}
            <div className="relative z-0 h-[100vh]">
              <div className="sticky top-0 h-screen w-full">
                <HeroSection />
              </div>
            </div>

            {/* Content — sections handle their own backgrounds */}
            <div className="relative z-20 w-full">
              <Timeline />
              <PhotoGallery />
              <ChapterNavigator />
            </div>
            
            {/* Floating Envelopes (Persists across the main page) */}
            <FloatingEnvelopes />
            
            {/* Paper Plane Navigator (Scroll indicator) */}
            <PaperPlaneNavigator />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player (Persists across stages) */}
      <FloatingMusicPlayer />
    </main>
  );
}
