"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "sayang") { // Hardcoded password for demo
      document.cookie = "is_admin=true; path=/;";
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-white/50 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-peachglow/30 rounded-bl-full -z-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose/10 rounded-tr-full -z-10 blur-2xl"></div>

        <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose">
          <Lock size={28} />
        </div>
        
        <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">Login Dashboard</h1>
        <p className="font-poppins text-charcoal/60 mb-8 text-sm">Masukkan kata sandi rahasia untuk mengatur isi website.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Kata sandi..."
              className={`w-full px-5 py-4 rounded-xl border font-poppins text-charcoal focus:outline-none focus:ring-2 transition-all ${
                error ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:border-rose focus:ring-rose/20 bg-gray-50'
              }`}
            />
            {error && <p className="text-red-500 text-xs text-left mt-2 pl-2 font-poppins">Kata sandi salah. Coba lagi!</p>}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-rose text-white font-poppins font-medium py-4 rounded-xl shadow-md hover:bg-rose/90 transition-all flex justify-center items-center gap-2"
          >
            Masuk <Heart size={18} fill="currentColor" />
          </button>
        </form>

        <p className="mt-8 text-xs text-charcoal/40 font-poppins">
          (Note: Untuk demo, gunakan password "sayang")
        </p>
      </motion.div>
    </div>
  );
}
