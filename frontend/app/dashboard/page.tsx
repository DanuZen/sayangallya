"use client";

import { Save } from "lucide-react";

export default function DashboardHeroPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">Pengaturan Hero & Timer</h1>
      <p className="text-charcoal/60 mb-8">Atur foto background, teks ucapan, dan tanggal jadian kalian.</p>

      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">Teks Judul Kecil</label>
            <input type="text" defaultValue="Our Love Story" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">Teks Judul Besar (H1)</label>
            <input type="text" defaultValue="The Journey Of Us" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-2">Kutipan Pemanis</label>
            <textarea defaultValue='"Every second with you is a blessing."' rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all resize-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-2">Tanggal Jadian</label>
              <input type="date" defaultValue="2023-09-20" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all" />
              <p className="text-xs text-charcoal/40 mt-2">Digunakan untuk menghitung timer otomatis.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-2">Foto Background</label>
              <div className="flex items-center justify-center w-full h-[110px] px-4 py-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-rose/50 bg-gray-50 cursor-pointer transition-colors">
                <span className="text-sm text-charcoal/50 text-center">Klik untuk upload foto baru<br/>(Visual mockup)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button className="bg-rose text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-rose/90 transition-colors shadow-md">
            <Save size={18} /> Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
