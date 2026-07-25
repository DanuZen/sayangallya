"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
}

const defaultPlaylist: Track[] = [
  {
    id: "1",
    title: "Our Love Story Soundtrack",
    artist: "Danu & Allya",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Forever & Always",
    artist: "Danu & Allya",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: Track;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  addTrack: (track: Omit<Track, "id">) => void;
  deleteTrack: (index: number) => void;
  showToast: boolean;
  dismissToast: () => void;
  playlist: Track[];
  currentTrackIndex: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<Track[]>(defaultPlaylist);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved playlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sayangallya_playlist");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPlaylist(parsed);
          }
        } catch (e) {
          console.error("Error parsing saved playlist", e);
        }
      }
    }
  }, []);

  const currentTrack = playlist[currentTrackIndex] || playlist[0] || defaultPlaylist[0];

  useEffect(() => {
    if (typeof window !== "undefined" && currentTrack) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Audio autoplay error:", err));
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentTrackIndex, playlist]);

  const triggerToast = () => {
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    
    // Auto-hide toast after 5 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowToast(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerToast();
        })
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const playTrack = (index: number) => {
    if (index < 0 || index >= playlist.length) return;

    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[index].src;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          triggerToast();
        })
        .catch((err) => console.log("Audio track change error:", err));
    }
  };

  const addTrack = (track: Omit<Track, "id">) => {
    const newTrack: Track = {
      ...track,
      id: Date.now().toString(),
    };
    const updated = [...playlist, newTrack];
    setPlaylist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sayangallya_playlist", JSON.stringify(updated));
    }
    // Auto play the newly added track
    playTrack(updated.length - 1);
  };

  const deleteTrack = (index: number) => {
    if (playlist.length <= 1) return; // Keep at least 1 track
    const updated = playlist.filter((_, i) => i !== index);
    setPlaylist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sayangallya_playlist", JSON.stringify(updated));
    }
    if (currentTrackIndex >= updated.length) {
      setCurrentTrackIndex(0);
    }
  };

  const dismissToast = () => {
    setShowToast(false);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        togglePlay,
        playTrack,
        addTrack,
        deleteTrack,
        showToast,
        dismissToast,
        playlist,
        currentTrackIndex,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
