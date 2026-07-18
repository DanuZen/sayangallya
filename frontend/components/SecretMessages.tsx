"use client";

import EnvelopeCard from "./EnvelopeCard";

const dummyMessages = [
  {
    id: "1",
    title: "Buka saat kangen",
    content: "Hai sayang, kalau kamu baca ini berarti kamu lagi kangen ya? Sabar ya, we will see each other soon. Just know that I am missing you too, probably even more. I love you! ❤️",
  },
  {
    id: "2",
    title: "Buka saat ngerasa sedih",
    content: "Everything is going to be okay. Kamu sudah melakukan yang terbaik. Tarik napas dalam-dalam, istirahat sebentar. I am always here for you, no matter what.",
  },
  {
    id: "3",
    title: "Happy Anniversary!",
    content: "Happy Anniversary sayang! Terima kasih sudah bertahan denganku selama ini. Let's make more beautiful memories together.",
    unlock_date: "2026-09-20", // Locked example
  },
  {
    id: "4",
    title: "Just a reminder",
    content: "You are the most beautiful person I have ever met, inside and out. I'm so lucky to be yours.",
  }
];

export default function SecretMessages() {
  return (
    <section className="py-24 relative overflow-hidden corner-flourish" id="messages"
      style={{ background: 'linear-gradient(125deg, #FDE2D0 0%, #FFF3F8 40%, #F0EBF8 100%)' }}
    >
      {/* Circles pattern overlay */}
      <div className="absolute inset-0 bg-circles pointer-events-none" />
      {/* Decorative orbs */}
      <div className="absolute -top-10 left-1/3 w-72 h-72 rounded-full bg-rose/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-lavender/25 blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="font-dancing text-rose text-3xl mb-2 block drop-shadow-sm">Hanya untukmu</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Secret Messages</h2>
          <p className="text-charcoal/70 font-poppins max-w-2xl mx-auto">
            Little letters for you. Some you can read now, some you have to wait for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {dummyMessages.map(msg => (
            <div key={msg.id} className="h-full">
              <EnvelopeCard message={msg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
