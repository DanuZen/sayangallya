"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2 } from "lucide-react";
import BucketListItem from "./BucketListItem";

interface BucketItem {
  id: string;
  item: string;
  is_done: boolean;
}

const initialBucketList: BucketItem[] = [
  { id: "1", item: "Nonton konser band favorit bareng di luar kota", is_done: true },
  { id: "2", item: "Piknik sore di kebun raya bawa bekal buatan sendiri", is_done: false },
  { id: "3", item: "Bikin pottery (keramik) bareng", is_done: false },
  { id: "4", item: "Roadtrip lintas pulau hanya berdua", is_done: false },
  { id: "5", item: "Masak resep ribet dari YouTube dan berhasil", is_done: true },
  { id: "6", item: "Adopt anabul bareng", is_done: false },
];

interface BucketListProps {
  standalone?: boolean;
}

export default function BucketList({ standalone = false }: BucketListProps) {
  const [items, setItems] = useState<BucketItem[]>(initialBucketList);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: BucketItem = {
      id: Date.now().toString(),
      item: newItemText.trim(),
      is_done: false,
    };

    setItems([...items, newItem]);
    setNewItemText("");
    setShowAddForm(false);
  };

  const content = (
    <div className="w-full max-w-5xl mx-auto py-1 flex flex-col justify-between min-h-[72vh]">
      {/* 3-Column Bucket List Grid (Exact Matching Love Notes Board Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10 pt-4">
        {items.map((item, idx) => (
          <BucketListItem key={item.id} data={item} index={idx} />
        ))}
      </div>

      {/* Bottom Add Button (Pushed cleanly to the bottom) */}
      <div className="flex justify-center mt-auto pt-4 px-2 relative z-10">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#4A1E2C] text-[#F3EAE3] hover:bg-rose-900 px-6 py-2.5 rounded-full font-poppins text-xs font-semibold tracking-wide transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
        >
          <Plus size={16} /> Tambah Impian Baru
        </button>
      </div>

      {/* Add New Dream Input Form Drawer (Appears Below) */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            onSubmit={handleAddItem}
            className="mt-3 px-2 overflow-hidden relative z-20"
          >
            <div className="flex gap-2 bg-[#FAF5EF] p-3 rounded-2xl border border-[#4A1E2C]/20 shadow-xl max-w-xl mx-auto">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Tulis rencana / impian manis baru kalian..."
                className="flex-1 px-4 py-2 rounded-xl text-xs font-poppins bg-white/80 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4A1E2C] text-[#4A1E2C]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#4A1E2C] text-[#F3EAE3] px-5 py-2 rounded-xl text-xs font-poppins font-medium hover:bg-rose-900 shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 size={14} /> Simpan
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 text-xs font-poppins text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Batal
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  if (standalone) {
    return content;
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      id="bucket-list"
      style={{ backgroundColor: "#FCFBF9" }}
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {content}
      </div>
    </section>
  );
}
