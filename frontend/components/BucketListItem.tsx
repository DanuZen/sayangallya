"use client";

import { useState } from "react";
import { Check, Heart } from "lucide-react";
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

  const toggleDone = () => {
    setIsDone(!isDone);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex items-start gap-4 p-5 rounded-[20px] transition-all duration-300 border ${
        isDone 
          ? 'bg-sage/30 border-sage/50 shadow-sm' 
          : 'bg-white/80 border-bordergray shadow-sm hover:shadow-md'
      }`}
    >
      <button 
        onClick={toggleDone}
        className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
          isDone 
            ? 'bg-sage border-sage text-white' 
            : 'border-rose/50 hover:border-rose text-transparent hover:text-rose/20'
        }`}
      >
        <Check size={16} strokeWidth={3} />
      </button>
      
      <div className="flex-1">
        <p className={`font-poppins text-[15px] leading-relaxed transition-all duration-300 ${
          isDone ? 'text-charcoal/50 line-through decoration-rose/30' : 'text-charcoal'
        }`}>
          {data.item}
        </p>
      </div>
      
      {isDone && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="flex-shrink-0 text-rose"
        >
          <Heart size={20} fill="currentColor" />
        </motion.div>
      )}
    </motion.div>
  );
}
