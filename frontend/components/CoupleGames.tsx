"use client";

import { useState } from "react";
import { Gamepad2, Image as ImageIcon } from "lucide-react";
import RelationshipQuiz from "./RelationshipQuiz";
import GuessPicture from "./GuessPicture";

export default function CoupleGames() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isGuessOpen, setIsGuessOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden corner-flourish" id="games"
      style={{ background: 'linear-gradient(145deg, #FFFDF9 0%, #F7F0FF 50%, #FFF8F0 100%)' }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      {/* Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-lavender/25 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-peachglow/30 blur-[90px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="font-dancing text-rose text-3xl mb-2 block drop-shadow-sm">For fun</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Mini Games</h2>
          <p className="text-charcoal/70 font-poppins max-w-2xl mx-auto">
            A little test to see how well you remember our memories together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quiz Card */}
          <div 
            onClick={() => setIsQuizOpen(true)}
            className="group cursor-pointer bg-gradient-to-br from-peachglow/20 to-cream rounded-3xl p-8 border border-bordergray hover:border-rose/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-rose mb-6 group-hover:scale-110 group-hover:bg-rose group-hover:text-white transition-all duration-300">
              <Gamepad2 size={32} />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">Kuis Hubungan</h3>
            <p className="font-poppins text-sm text-charcoal/70 mb-8 leading-relaxed">
              Seberapa ingat kamu tentang detail kecil dari perjalanan cinta kita? Ayo buktikan di sini!
            </p>
            <button className="mt-auto px-6 py-2.5 bg-rose/10 text-rose group-hover:bg-rose group-hover:text-white rounded-full font-poppins text-sm font-medium transition-colors">
              Mainkan Kuis
            </button>
          </div>

          {/* Guess Picture Card */}
          <div 
            onClick={() => setIsGuessOpen(true)}
            className="group cursor-pointer bg-gradient-to-br from-lavender/20 to-cream rounded-3xl p-8 border border-bordergray hover:border-rose/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-rose mb-6 group-hover:scale-110 group-hover:bg-rose group-hover:text-white transition-all duration-300">
              <ImageIcon size={32} />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">Tebak Gambar</h3>
            <p className="font-poppins text-sm text-charcoal/70 mb-8 leading-relaxed">
              Gambarnya sengaja disamarkan. Bisakah kamu menebak ini foto waktu kita lagi di mana?
            </p>
            <button className="mt-auto px-6 py-2.5 bg-rose/10 text-rose group-hover:bg-rose group-hover:text-white rounded-full font-poppins text-sm font-medium transition-colors">
              Tebak Gambar
            </button>
          </div>
        </div>
      </div>

      {/* Game Modals */}
      <RelationshipQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <GuessPicture isOpen={isGuessOpen} onClose={() => setIsGuessOpen(false)} />
    </section>
  );
}
