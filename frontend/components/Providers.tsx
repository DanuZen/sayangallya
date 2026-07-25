"use client";

import React from "react";
import { AudioProvider } from "@/lib/AudioContext";
import FloatingMusicPlayer from "./FloatingMusicPlayer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      {children}
      <FloatingMusicPlayer />
    </AudioProvider>
  );
}
