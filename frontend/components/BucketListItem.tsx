"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BucketItem {
  id: string;
  item: string;
  is_done: boolean;
}

interface Props {
  data: BucketItem;
}

export default function BucketListItem({ data }: Props) {
  const [isDone, setIsDone] = useState(data.is_done);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => setIsDone(!isDone)}
      className="flex items-start gap-4 p-5 cursor-pointer transition-all duration-300 border-b group"
      style={{ borderColor: "rgba(74,30,44,0.12)" }}
    >
      {/* Checkbox — minimal maroon style */}
      <div
        className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: isDone ? "#4A1E2C" : "rgba(74,30,44,0.3)",
          backgroundColor: isDone ? "#4A1E2C" : "transparent",
        }}
      >
        {isDone && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            width={12} height={12} viewBox="0 0 24 24"
            fill="none" stroke="#F3EAE3" strokeWidth={3}
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </div>

      <div className="flex-1">
        <p className={`font-poppins text-[15px] leading-relaxed transition-all duration-300 ${isDone ? "line-through" : ""}`}
          style={{ color: isDone ? "rgba(74,30,44,0.35)" : "#4A1E2C" }}>
          {data.item}
        </p>
      </div>

      {isDone && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-shrink-0 font-dancing text-xl"
          style={{ color: "#4A1E2C" }}
        >
          ✓
        </motion.span>
      )}
    </motion.div>
  );
}
