"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Smile, X } from "lucide-react";

interface LoveNote {
  id: string;
  sender: string;
  message: string;
  color: string;
  date: string;
  rotation: string;
}

// Vintage Warm Cream Paper Memo Notes (Matching Mimpi Kita bg-[#FAF5EF])
const defaultNotes: LoveNote[] = [
  {
    id: "1",
    sender: "Danu",
    message: "Jangan lupa makan siang ya sayang! Semangat buat hari ini 💕",
    color: "#FAF5EF",
    date: "Hari Ini, 12:30",
    rotation: "-2deg",
  },
  {
    id: "2",
    sender: "Allya",
    message: "Terima kasih ya sudah selalu sabar sama aku. Love you most! ✨",
    color: "#FAF5EF",
    date: "Kemarin, 21:15",
    rotation: "3deg",
  },
  {
    id: "3",
    sender: "Danu",
    message: "Weekend besok mau jalan ke mana? Aku sudah catat beberapa tempat lucu di Date Spinner!",
    color: "#FAF5EF",
    date: "2 Hari Lalu",
    rotation: "-4deg",
  },
  {
    id: "4",
    sender: "Allya",
    message: "Kapan-kapan bikin pottery studio bareng yuk! Mau cobain sesuatu yang baru 😊",
    color: "#FAF5EF",
    date: "3 Hari Lalu",
    rotation: "2deg",
  },
];

interface LoveNotesBoardProps {
  standalone?: boolean;
  onPopupStateChange?: (isOpen: boolean) => void;
}

export default function LoveNotesBoard({
  standalone = false,
  onPopupStateChange,
}: LoveNotesBoardProps) {
  const [notes, setNotes] = useState<LoveNote[]>(defaultNotes);
  const [showForm, setShowForm] = useState(false);
  const [sender, setSender] = useState("Danu");
  const [messageText, setMessageText] = useState("");

  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);

  const handleOpenNoteModal = (note: LoveNote) => {
    setSelectedNote(note);
    onPopupStateChange?.(true);
  };

  const handleCloseNoteModal = () => {
    setSelectedNote(null);
    onPopupStateChange?.(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const rotations = ["-3deg", "2deg", "-2deg", "4deg", "-4deg"];
    const newNote: LoveNote = {
      id: Date.now().toString(),
      sender,
      message: messageText.trim(),
      color: "#FAF5EF",
      date: "Baru saja",
      rotation: rotations[Math.floor(Math.random() * rotations.length)],
    };

    setNotes([newNote, ...notes]);
    setMessageText("");
    setShowForm(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto relative flex flex-col justify-between ${
        standalone
          ? "py-1 min-h-[72vh]"
          : "my-12 p-6 md:p-10 bg-[#FAF7F2] rounded-[32px] shadow-xl border border-[#4A1E2C]/10"
      }`}
    >
      {/* Warm Cream Sticky Notes Grid (Matching Mimpi Kita) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10 pt-4">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.04, rotate: "0deg", zIndex: 30 }}
            onClick={() => handleOpenNoteModal(note)}
            style={{
              backgroundColor: note.color,
              rotate: note.rotation,
            }}
            className="p-5 rounded-xs shadow-[0_15px_35px_rgba(0,0,0,0.35),0_3px_8px_rgba(0,0,0,0.12)] flex flex-col justify-between min-h-[185px] relative group transition-all duration-300 border border-[#4A1E2C]/15 cursor-pointer bg-[#FAF5EF]"
          >
            {/* 📍 REALISTIC 3D RED METALLIC PUSH PIN (Full Unclipped Display) */}
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]">
              {/* Spherical Red Pin Knob */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-red-800 via-rose-600 to-rose-300 border border-red-950 shadow-inner flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 rounded-full bg-white/90 absolute top-0.5 left-0.5 shadow-2xs" />
              </div>
              {/* Steel Needle Shaft */}
              <div className="w-1 h-3 bg-gradient-to-b from-[#64748B] via-[#94A3B8] to-[#475569] -mt-1 rounded-b-xs shadow-xs" />
            </div>

            {/* Paper Dog-Ear Corner Fold (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[18px] border-t-black/15 border-r-[18px] border-r-transparent rounded-tl-xs pointer-events-none drop-shadow-xs" />

            {/* Lined Paper Texture Lines */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-xs overflow-hidden"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #000 24px)",
              }}
            />

            <div className="relative z-10 pt-1">
              <div className="flex justify-between items-center mb-2 border-b border-black/10 pb-1.5">
                <span className="font-poppins text-xs font-bold text-[#3A1420] flex items-center gap-1.5 tracking-wide">
                  <Smile size={14} className="text-[#3A1420]/80" /> Dari: {note.sender}
                </span>
                <span className="font-poppins text-[10px] text-black/50 font-medium">
                  {note.date}
                </span>
              </div>
              <p className="font-dancing text-xl sm:text-2xl text-[#2D121A] leading-relaxed py-1 font-semibold line-clamp-3">
                "{note.message}"
              </p>
            </div>

            {/* Clean Bottom Bar (Delete Button Only) */}
            <div className="flex justify-end items-center pt-2 relative z-10 border-t border-black/5">
              <button
                onClick={(e) => handleDelete(e, note.id)}
                className="text-black/40 hover:text-red-600 opacity-40 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                title="Hapus note"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Action Button (Stunning Romantic Pink Pill) */}
      <div className="flex justify-center mt-auto pt-4 relative z-10">
        <button
          onClick={() => setShowForm(!showForm)}
          className="group relative bg-gradient-to-r from-[#E88CA8] via-[#F472B6] to-[#E88CA8] hover:from-[#E06D8C] hover:to-[#EC4899] text-white px-6 py-2.5 rounded-full font-poppins text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(232,140,168,0.5)] hover:shadow-[0_12px_30px_rgba(244,114,182,0.6)] flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer border border-pink-200/80 backdrop-blur-md"
        >
          <Plus size={15} className="text-white group-hover:rotate-90 transition-transform duration-300 drop-shadow-sm" />
          <span className="tracking-wider drop-shadow-sm">Tempel Pesan Baru</span>
        </button>
      </div>

      {/* Add Form Drawer (Below) */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            className="mt-4 overflow-hidden relative z-20"
          >
            <form
              onSubmit={handleAddNote}
              className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/80 space-y-3 max-w-xl mx-auto"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="font-playfair font-bold text-sm text-[#4A1E2C]">
                  Tulis Pesan Manis Baru
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-poppins text-gray-600 mb-1 font-medium">
                    Pengirim:
                  </label>
                  <div className="flex gap-2">
                    {["Danu", "Allya"].map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setSender(name)}
                        className={`flex-1 py-1 rounded-xl font-poppins text-xs font-medium border transition-all cursor-pointer ${
                          sender === name
                            ? "bg-[#4A1E2C] text-white border-[#4A1E2C]"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Tulis ucapan manis hari ini..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#4A1E2C] outline-none text-xs font-poppins text-gray-800 resize-none"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-poppins text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#4A1E2C] text-white px-4 py-1.5 rounded-xl text-xs font-poppins font-medium hover:bg-rose-900 shadow-sm transition-colors cursor-pointer"
                >
                  Tempel Note
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 ROMANTIC LETTER POPUP MODAL */}
      <AnimatePresence>
        {selectedNote && (
          <div
            onClick={handleCloseNoteModal}
            className="fixed inset-0 bg-[#2D0D17]/60 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#FAF5EF] rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#4A1E2C]/15 max-w-md md:max-w-lg w-full p-8 md:p-10 cursor-default select-none overflow-hidden"
            >
              {/* Lined Paper Texture Background */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, #000 28px)",
                }}
              />

              {/* Close Button */}
              <button
                onClick={handleCloseNoteModal}
                className="absolute top-4 right-4 text-[#4A1E2C]/60 hover:text-[#4A1E2C] transition-colors p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
                title="Tutup surat"
              >
                <X size={18} />
              </button>

              {/* Top Header Decor Badge */}
              <div className="text-center mb-6 relative z-10">
                <span className="font-dancing text-sm text-[#4A1E2C]/70 tracking-widest flex items-center justify-center gap-2">
                  <span>♥</span> untukmu <span>♥</span>
                </span>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#4A1E2C]/25 to-transparent mx-auto mt-2" />
              </div>

              {/* Letter Salutation Title */}
              <div className="mb-6 relative z-10">
                <h3 className="font-dancing text-3xl md:text-4xl text-[#4A1E2C] font-semibold leading-snug">
                  Hei, sayang...
                </h3>
                <span className="font-poppins text-[10px] text-gray-400 font-medium block mt-1">
                  Pesan ditempel oleh {selectedNote.sender} • {selectedNote.date}
                </span>
              </div>

              {/* Message Paragraphs */}
              <div className="py-4 border-y border-[#4A1E2C]/10 my-4 relative z-10 space-y-4">
                <p className="font-poppins text-xs md:text-sm text-[#3A1420] leading-relaxed font-normal">
                  {selectedNote.message}
                </p>
              </div>

              {/* Letter Closing Signature */}
              <div className="mt-8 text-right relative z-10">
                <span className="font-dancing text-base text-[#4A1E2C]/80 block">
                  Dengan penuh cinta,
                </span>
                <span className="font-dancing text-2xl text-[#4A1E2C] font-bold mt-1 block">
                  — {selectedNote.sender} ♡
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
