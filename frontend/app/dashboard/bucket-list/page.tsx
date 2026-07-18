"use client";

import { Plus, Edit2, Trash2, CheckCircle2, Circle } from "lucide-react";

export default function DashboardBucketListPage() {
  const dummyBucketList = [
    { id: "1", item: "Nonton konser band favorit bareng di luar kota", is_done: true },
    { id: "2", item: "Piknik sore di kebun raya bawa bekal buatan sendiri", is_done: false },
    { id: "3", item: "Bikin pottery (keramik) bareng", is_done: false },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">Bucket List</h1>
          <p className="text-charcoal/60">Tambah dan tandai impian yang ingin kalian capai.</p>
        </div>
        <button className="bg-rose text-white px-5 py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-rose/90 transition-colors shadow-sm text-sm shrink-0">
          <Plus size={18} /> Tambah Impian
        </button>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm w-16">Status</th>
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm">Target / Impian</th>
                <th className="py-4 px-6 font-medium text-charcoal/60 text-sm text-right w-1/4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyBucketList.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 text-sm text-charcoal">
                    {item.is_done ? (
                      <CheckCircle2 className="text-sage" size={20} />
                    ) : (
                      <Circle className="text-gray-300" size={20} />
                    )}
                  </td>
                  <td className={`py-4 px-6 text-sm ${item.is_done ? 'text-charcoal/50 line-through' : 'text-charcoal font-medium'}`}>
                    {item.item}
                  </td>
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
          (Ini adalah tampilan mockup, data belum terhubung ke database)
        </div>
      </div>
    </div>
  );
}
