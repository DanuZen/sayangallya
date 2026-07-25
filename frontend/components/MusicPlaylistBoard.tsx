"use client";

import { useState, useRef } from "react";
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Plus, Play, Pause, Trash2, Disc, Heart, Sparkles, UploadCloud, CheckCircle2 } from "lucide-react";

export default function MusicPlaylistBoard() {
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    playTrack,
    togglePlay,
    addTrack,
    deleteTrack,
  } = useAudio();

  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [src, setSrc] = useState("");
  
  // Drag & Drop File States
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processAudioFile = (file: File) => {
    if (!file.type.includes("audio") && !file.name.endsWith(".mp3") && !file.name.endsWith(".m4a") && !file.name.endsWith(".wav")) {
      alert("Harap pilih file audio (.mp3, .m4a, .wav)");
      return;
    }

    setSelectedFile(file);
    const audioBlobUrl = URL.createObjectURL(file);
    setSrc(audioBlobUrl);

    // Auto-fill title & artist from filename if empty
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    const nameParts = cleanName.split("-");
    if (nameParts.length > 1) {
      if (!artist) setArtist(nameParts[0].trim());
      if (!title) setTitle(nameParts.slice(1).join("-").trim());
    } else {
      if (!title) setTitle(cleanName);
      if (!artist) setArtist("Sayangku");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAudioFile(e.target.files[0]);
    }
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !src.trim()) return;

    addTrack({
      title: title.trim(),
      artist: artist.trim(),
      src: src.trim(),
    });

    // Reset Form
    setTitle("");
    setArtist("");
    setSrc("");
    setSelectedFile(null);
    setShowAddForm(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-visible select-none my-auto">
      {/* 📎 REALISTIC 3D GOLDEN PAPER CLIP (Unclipped Top Left Display) */}
      <div className="absolute -top-4 left-8 z-30 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
        <div className="w-4 h-9 rounded-full border-2 border-amber-500/90 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 shadow-md opacity-95 transform -rotate-12" />
      </div>

      {/* 📜 WARM VINTAGE CREAM PAPER CONTAINER */}
      <div className="relative bg-[#FAF5EF] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#4A1E2C]/15 p-5 md:p-8 backdrop-blur-md overflow-visible">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4A1E2C]/15 mb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-poppins text-xs font-semibold uppercase tracking-wider">
              <Music size={15} className="animate-pulse" />
              Soundtrack Cinta Kita
            </div>
            <h2 className="font-playfair font-extrabold text-2xl md:text-3xl text-[#4A1E2C] mt-0.5">
              Musik Romantis <span className="font-dancing font-normal text-rose-800 text-2xl">Playlist</span>
            </h2>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start sm:self-center bg-[#4A1E2C] text-[#F3EAE3] hover:bg-rose-900 transition-all px-4 py-2 rounded-full font-poppins text-xs font-semibold flex items-center gap-1.5 shadow-md border border-white/20 cursor-pointer active:scale-95"
          >
            <Plus size={15} />
            {showAddForm ? "Batal" : "Tambah Lagu"}
          </button>
        </div>

        {/* Add Song Form Section (100% Pure Drag & Drop MP3) */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onSubmit={handleAddSong}
              className="bg-white/95 rounded-2xl p-4 md:p-5 border border-[#4A1E2C]/20 shadow-md relative z-10 space-y-3.5 overflow-hidden"
            >
              <div className="flex items-center gap-1.5 text-xs font-poppins font-bold text-[#4A1E2C] border-b border-gray-100 pb-2">
                <Sparkles size={14} className="text-amber-500" />
                Formulir Lagu Baru (Unggah File Audio)
              </div>

              {/* 📥 PURE DRAG & DROP MP3 FILE DROPZONE */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  dragActive
                    ? "border-[#4A1E2C] bg-rose-50/80 scale-[1.01]"
                    : selectedFile
                    ? "border-emerald-500 bg-emerald-50/40"
                    : "border-gray-300 hover:border-[#4A1E2C]/60 bg-gray-50/60 hover:bg-rose-50/20"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,.mp3,.m4a,.wav"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex items-center gap-2.5 text-emerald-800">
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                    <div className="text-left min-w-0">
                      <p className="font-poppins text-xs font-semibold truncate max-w-[240px]">
                        {selectedFile.name}
                      </p>
                      <p className="font-poppins text-[10px] text-emerald-600 font-medium">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • File Berhasil Dipilih
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-[#4A1E2C]/10 text-[#4A1E2C] flex items-center justify-center">
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <p className="font-poppins text-xs font-semibold text-[#4A1E2C]">
                        Seret & Lepas file <span className="text-rose-700 font-bold">.mp3</span> di sini
                      </p>
                      <p className="font-poppins text-[10px] text-gray-500 font-medium mt-0.5">
                        atau <span className="underline font-semibold text-[#4A1E2C]">klik untuk memilih file audio</span> dari perangkat kamu
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Title & Artist Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-poppins font-semibold text-[#4A1E2C]/80 mb-1 uppercase tracking-wider">
                    Judul Lagu *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Penjaga Hati"
                    className="w-full px-3 py-2 rounded-xl text-xs font-poppins bg-gray-50 border border-gray-200 text-[#4A1E2C] focus:outline-none focus:ring-1 focus:ring-[#4A1E2C]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-poppins font-semibold text-[#4A1E2C]/80 mb-1 uppercase tracking-wider">
                    Penyanyi / Artis *
                  </label>
                  <input
                    type="text"
                    required
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Contoh: Nadhif Basalamah"
                    className="w-full px-3 py-2 rounded-xl text-xs font-poppins bg-gray-50 border border-gray-200 text-[#4A1E2C] focus:outline-none focus:ring-1 focus:ring-[#4A1E2C]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={!selectedFile || !title || !artist}
                  className="bg-[#4A1E2C] text-white px-5 py-2 rounded-xl text-xs font-poppins font-semibold hover:bg-rose-900 transition-colors shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan & Putar Musik
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Playlist Items List */}
        <div className="max-h-[340px] overflow-y-auto space-y-2.5 no-scrollbar pr-1 relative z-10">
          {playlist.map((track, index) => {
            const isCurrent = currentTrackIndex === index;

            return (
              <div
                key={track.id}
                onClick={() => playTrack(index)}
                className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "bg-[#4A1E2C] text-[#F3EAE3] border-rose-300/40 shadow-lg scale-[1.01]"
                    : "bg-white/85 text-[#3A1420] border-[#4A1E2C]/10 hover:bg-white hover:border-[#4A1E2C]/30 hover:scale-[1.005] shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  {/* Spinning Vinyl Record Badge */}
                  <div
                    className={`relative w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 overflow-hidden shadow-sm transition-colors ${
                      isCurrent
                        ? "bg-[#2A111F] border-white/60 text-rose-300"
                        : "bg-[#180A15] border-white/80 text-rose-200"
                    }`}
                  >
                    <div className="absolute inset-1 rounded-full border border-white/10" />
                    <motion.div
                      animate={{ rotate: isCurrent && isPlaying ? 360 : 0 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="flex items-center justify-center"
                    >
                      <Disc size={18} />
                    </motion.div>
                  </div>

                  {/* Song Information */}
                  <div className="min-w-0">
                    <p className="font-dancing text-xl font-bold truncate leading-snug">
                      {track.title}
                    </p>
                    <p
                      className={`font-poppins text-xs truncate mt-0.5 ${
                        isCurrent ? "text-rose-200" : "text-gray-500 font-medium"
                      }`}
                    >
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrent) {
                        togglePlay();
                      } else {
                        playTrack(index);
                      }
                    }}
                    className={`p-2.5 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-white/20 text-white hover:bg-white/30"
                        : "bg-[#4A1E2C] text-[#F3EAE3] hover:bg-rose-900"
                    }`}
                    title={isCurrent && isPlaying ? "Pause" : "Play"}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause size={15} />
                    ) : (
                      <Play size={15} fill="currentColor" />
                    )}
                  </button>

                  {/* Delete Button (If playlist has more than 1 song) */}
                  {playlist.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrack(index);
                      }}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isCurrent
                          ? "text-rose-200 hover:text-white hover:bg-white/10"
                          : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title="Hapus lagu ini"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-[#4A1E2C]/10 text-center">
          <p className="font-poppins text-[11px] text-[#4A1E2C]/70 font-medium flex items-center justify-center gap-1">
            <Heart size={12} className="text-rose-500 fill-rose-500" />
            Setiap lagu menyimpan kenangan indah cerita cinta kalian berdua.
          </p>
        </div>
      </div>
    </div>
  );
}
