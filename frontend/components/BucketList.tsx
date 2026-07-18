"use client";

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
  const completedCount = dummyBucketList.filter(i => i.is_done).length;

  return (
    <section className="py-24 relative overflow-hidden corner-flourish" id="bucket-list"
      style={{ background: 'linear-gradient(160deg, #FFFDF9 0%, #F9F5FF 60%, #FFF8F0 100%)' }}
    >
      {/* Crosshatch pattern overlay */}
      <div className="absolute inset-0 bg-crosshatch pointer-events-none" />
      {/* Decorative orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-peachglow/30 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-blush/15 blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="font-dancing text-rose text-3xl mb-2 block drop-shadow-sm">Impian Kita</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Our Bucket List</h2>
          <p className="text-charcoal/70 font-poppins max-w-2xl mx-auto mb-6">
            Dreams, adventures, and silly things we want to do together.
          </p>
          
          <div className="inline-block bg-lavender/40 px-4 py-2 rounded-full border border-lavender">
            <span className="font-poppins text-sm font-medium text-charcoal/80">
              Completed: <span className="text-rose font-bold">{completedCount}</span> of {dummyBucketList.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyBucketList.map(item => (
            <BucketListItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
