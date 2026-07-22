"use client";

import { motion } from "framer-motion";
import BucketListItem from "./BucketListItem";

const dummyBucketList = [
  { id: "1", item: "Nonton konser band favorit bareng di luar kota", is_done: true },
  { id: "2", item: "Piknik sore di kebun raya bawa bekal buatan sendiri", is_done: false },
  { id: "3", item: "Bikin pottery (keramik) bareng", is_done: false },
  { id: "4", item: "Roadtrip lintas pulau hanya berdua", is_done: false },
  { id: "5", item: "Masak resep ribet dari YouTube dan berhasil", is_done: true },
  { id: "6", item: "Adopt anabul bareng", is_done: false },
];

export default function BucketList() {
  const completedCount = dummyBucketList.filter((i) => i.is_done).length;

  return (
    <section
      className="py-28 relative overflow-hidden"
      id="bucket-list"
      style={{ backgroundColor: "#FCFBF9" }}
    >
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Animated Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-24 md:mb-32 relative flex flex-col items-center justify-center text-center pt-10"
        >
          {/* Decorative Top Element */}
          <div className="flex items-center gap-4 mb-4 opacity-70">
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#4A1E2C" strokeWidth={1.5} className="rotate-45">
              <rect x="4" y="4" width="16" height="16" rx="1" />
              <circle cx="12" cy="12" r="3" fill="#4A1E2C" opacity="0.5" />
            </svg>
            <div className="w-10 md:w-16 h-[1px] bg-[#4A1E2C]/30" />
          </div>

          {/* Title wrapper */}
          <div className="relative inline-block mt-2">
            {/* Teks 1 - outline stroke text, full section name */}
            <h2 className="font-playfair font-bold leading-none tracking-[0.15em] select-none"
              style={{ 
                fontSize: "clamp(2rem, 6vw, 5rem)",
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(74, 30, 44, 0.4)"
              }}>
              Our Bucket List
            </h2>

            {/* Teks 2 - script, smaller, bottom-right corner */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="font-dancing text-[#4A1E2C] drop-shadow-sm absolute -bottom-4 right-0"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1 }}
            >
              Dreams
            </motion.div>
          </div>

          {/* Subtitle + progress pill */}
          <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-10 gap-4 w-full max-w-2xl px-4">
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#4A1E2C]/20" />
            <p className="font-poppins text-[9px] md:text-xs tracking-[0.25em] md:tracking-[0.4em] uppercase text-[#4A1E2C]/50 px-4 md:px-6">
              Dreams &amp; adventures we want to do together.
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#4A1E2C]/20" />
          </div>
          {/* Progress pill */}
          <span className="mt-4 font-poppins text-xs font-semibold px-4 py-1.5 rounded-full border"
            style={{ color: "#4A1E2C", borderColor: "rgba(74,30,44,0.3)", backgroundColor: "rgba(74,30,44,0.06)" }}>
            {completedCount} / {dummyBucketList.length} done
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyBucketList.map((item) => (
            <BucketListItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
