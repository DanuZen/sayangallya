"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function PaperPlaneNavigator() {
  const { scrollYProgress } = useScroll();

  // Numeric path definitions (0 to 100 percentages)
  // X path: 21-step path to create continuous sweeping movements (no hard stops).
  // It slows down (banks) near the left and right edges where polaroids typically are, without ever stopping completely.
  const xStops = [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 
    0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1
  ];
  
  const xValues = [
    85, 78,   // Hero: gently gliding left
    50,       // Flying left fast across center
    12, 18,   // Timeline Left: slows down and banks right
    50,       // Flying right fast
    88, 82,   // Timeline Right: slows down and banks left
    50,       // Flying left fast
    12, 18,   // Left edge bank
    50,       // Flying right fast
    88, 82,   // Right edge bank
    50,       // Flying left fast
    12, 18,   // Left edge bank
    50,       // Flying right fast
    88, 82,   // Right edge bank
    50        // End: Lands precisely at 50% horizontal center at the top of Footer
  ]; 
  
  // Y path: viewport-relative percentages (lands at 64% precisely on top divider line above Danu & Allya)
  const yValues = [35, 35, 45, 45, 45, 55, 55, 55, 60, 60, 60, 62, 62, 62, 63, 63.5, 64, 64, 64, 64, 64];

  // Map scroll progress directly to coordinates (no spring = no lag)
  const xTarget = useTransform(scrollYProgress, xStops, xValues);
  const yTarget = useTransform(scrollYProgress, xStops, yValues);

  // Shadow opacity fades to 0 when entering Footer (scroll progress > 0.88)
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.85, 0.95, 1], [1, 1, 0, 0]);

  // Position directly tracks scroll with NO spring delay — instant response.
  const left = useTransform(xTarget, (x) => `${x}%`);
  const top = useTransform(yTarget, (y) => `${y}%`);

  // Rotation logic: calculate angle dynamically based on velocity/direction
  // Initial angle is ~172 degrees because the first movement is from x=85 to x=50 (left)
  const rotateRaw = useMotionValue(172);
  const rotate = useSpring(rotateRaw, { stiffness: 80, damping: 20 });

  // ScaleY logic: mirror the plane when moving left (barrel roll)
  // Starts at -1 because initial movement is to the left
  const scaleYRaw = useMotionValue(-1);
  const scaleY = useSpring(scaleYRaw, { stiffness: 80, damping: 20 });

  const prevPos = useRef({ x: 85, y: 8 });

  // Use animation frame to track real-time position and compute flight angle
  useAnimationFrame(() => {
    const currentX = xTarget.get();
    const currentY = yTarget.get();
    
    const dx = currentX - prevPos.current.x;
    const dy = currentY - prevPos.current.y;

    // Threshold prevents jitter when the spring is settling
    if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) {
      // Multiply dx by an aspect ratio factor (approx 1.5 for desktop) for realistic angles
      let angle = Math.atan2(dy, dx * 1.5) * (180 / Math.PI);

      // Prevent 360 spin by finding the shortest angular path
      let currentRotation = rotateRaw.get();
      let diff = angle - currentRotation;
      
      diff = ((diff + 180) % 360) - 180;
      if (diff < -180) diff += 360;
      
      rotateRaw.set(currentRotation + diff);
      
      // Mirror the plane vertically if it's flying left. 
      // Because we use a spring, this creates a beautiful "barrel roll" effect!
      scaleYRaw.set(dx < 0 ? -1 : 1);
    }
    
    // ALWAYS update prevPos to accurately calculate velocity
    prevPos.current = { x: currentX, y: currentY };
  });

  // Dynamic scale (dips into the page)
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 0.85, 1.1, 0.85, 1]);

  return (
    <motion.div
      className="fixed z-[999] pointer-events-none plane-navigator -translate-x-1/2 -translate-y-1/2"
      style={{ top, left, scale }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* SHADOW - Fades out smoothly when landed in the footer */}
        <motion.div
          style={{ opacity: shadowOpacity }}
          className="absolute -bottom-10 left-4 w-20 h-10 bg-[#4A1E2C]/20 blur-[12px] rounded-[100%] rotate-[-10deg]"
        />
        
        {/* Plane container - Rotates based on flight path and flips if moving left */}
        <motion.div style={{ rotate, scaleY }}>
          {/* We rotate the image by 45deg initially so its nose points strictly to the Right (0 degrees) */}
          <Image 
            src="/plane.png" 
            alt="Navigator" 
            width={120} 
            height={120} 
            className="object-contain drop-shadow-[0_12px_24px_rgba(74,30,44,0.3)] rotate-45"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
