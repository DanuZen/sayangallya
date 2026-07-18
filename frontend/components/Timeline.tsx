"use client";

import TimelineItem from "./TimelineItem";

// Dummy Data
const dummyEvents = [
  {
    id: "1",
    event_date: "2023-09-20",
    title: "First Time We Met",
    description: "The day everything changed. We talked for hours at the corner cafe and I just knew you were someone special.",
    image_url: "/images/dummy-photo.png"
  },
  {
    id: "2",
    event_date: "2023-11-15",
    title: "Our First Trip Together",
    description: "Driving to the mountains, singing along to our favorite songs. The sunset view was breathtaking, but not as much as you.",
    image_url: "/images/dummy-photo.png"
  },
  {
    id: "3",
    event_date: "2024-02-14",
    title: "Valentine's Day",
    description: "A simple dinner, but filled with so much laughter and love. You gave me that handwritten letter that I still keep in my wallet.",
  }
];

export default function Timeline() {
  return (
    <section className="py-24 relative overflow-hidden corner-flourish" id="timeline"
      style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3F8 50%, #F9F5FF 100%)' }}
    >
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
      {/* Decorative large rose blurred circle top-right */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose/10 blur-[80px] pointer-events-none" />
      {/* Decorative lavender circle bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-lavender/20 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <span className="font-dancing text-rose text-3xl mb-2 block drop-shadow-sm">Cerita Kita</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Our Love Timeline</h2>
          <p className="text-charcoal/70 font-poppins max-w-2xl mx-auto">Every beautiful moment we've shared, leading up to today.</p>
        </div>

        <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
          {/* Vertical line */}
          <div className="absolute border-opacity-20 border-rose h-full border-l-2 left-4 md:left-1/2 transform md:-translate-x-1/2 top-0"></div>
          
          {dummyEvents.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
