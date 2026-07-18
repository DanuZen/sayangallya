"use client";

import { Plus, Edit2, Trash2 } from "lucide-react";

export default function DashboardTimelinePage() {
  const dummyEvents = [
    { id: "1", date: "20 Sep 2023", title: "First Time We Met" },
    { id: "2", date: "15 Nov 2023", title: "Our First Trip Together" },
    { id: "3", date: "14 Feb 2024", title: "Valentine's Day" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">Love Timeline</h1>
          <p className="text-charcoal/60">Kelola memori dan momen-momen indah kalian.</p>
        </div>
        <button className="bg-rose text-white px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-rose/90 transition-colors shadow-sm text-sm shrink-0">
          <Plus size={18} /> Tambah Momen
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm w-1/4">Tanggal</th>
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm">Judul Momen</th>
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm text-right w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 text-sm text-charcoal">{event.date}</td>
                  <td className="py-4 px-6 text-sm text-charcoal font-medium">{event.title}</td>
                  <td className="py-4 px-6 flex justify-end gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center text-xs text-charcoal/40 bg-gray-50/30 border-t border-gray-100">
          (Ini adalah tampilan mockup, tombol belum terhubung ke database)
        </div>
      </div>
    </div>
  );
}
