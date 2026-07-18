"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import BucketList from "@/components/BucketList";
import SecretMessages from "@/components/SecretMessages";
import CoupleGames from "@/components/CoupleGames";
import FloatingHearts from "@/components/FloatingHearts";
import SplashScreen from "@/components/SplashScreen";
import EnvelopeIntro from "@/components/EnvelopeIntro";

type Stage = "envelope" | "splash" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("envelope");

  return (
    <main className="min-h-screen relative bg-cream selection:bg-rose/20">

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
            {/* Global Animated Particles */}
            <div className="fixed inset-0 z-30 pointer-events-none">
              <FloatingHearts />
            </div>

            {/* Sticky Parallax Hero */}
            <div className="relative z-0 h-[100vh]">
              <div className="sticky top-0 h-screen w-full">
                <HeroSection />
              </div>
            </div>

            {/* Content Sheet */}
            <div className="relative z-20 bg-cream/95 backdrop-blur-md w-full rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-15px_50px_rgba(0,0,0,0.08)] border-t border-white/60 pt-8 pb-10">
              <Timeline />
              <BucketList />
              <SecretMessages />
              <CoupleGames />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
