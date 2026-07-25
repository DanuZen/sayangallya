# ✅ Task List — Website Romantis

Checklist ini disusun berurutan sesuai fase pengembangan. Kerjakan dari atas ke bawah, centang tiap selesai. Setiap task sudah dirancang cukup kecil untuk dijadikan satu prompt ke Claude.

---

## 🔴 Fase 0 — Persiapan (Sebelum Coding)

- [x] Tentukan nama domain/judul website (misal: "Perjalanan Kita", nama panggilan berdua, dll)
- [x] Kumpulkan foto-foto yang akan dipakai (hero, timeline, envelope background) — kompres ke WebP
- [x] Kumpulkan data momen penting untuk Love Timeline (tanggal + judul + deskripsi singkat)
- [x] Tulis 5–10 pesan untuk Secret Messages
- [x] Tulis daftar Bucket List (minimal 5–10 item)
- [x] Pilih 3–5 lagu bermakna + siapkan file audio (atau link Spotify/YouTube)
- [x] Buat akun Supabase (jika belum) dan buat project baru
- [x] Buat akun Vercel (jika belum) dan hubungkan ke GitHub

---

## 🔴 Fase 1 — Setup Project

- [x] Buka Claude, buat project baru Next.js + Tailwind CSS
- [x] Setup struktur folder sesuai rekomendasi di PRD (`components/`, `lib/`, `public/`)
- [x] Install dependency tambahan: `framer-motion`, `@supabase/supabase-js`, `lucide-react`
- [x] Setup Google Fonts (Playfair Display + Poppins) di `layout.tsx`
- [x] Tambahkan warna custom ke `tailwind.config.ts` sesuai Style Guide
- [x] Push project awal ke GitHub
- [x] Deploy awal ke Vercel (pastikan halaman default Next.js muncul, sebagai tes koneksi)

---

## 🔴 Fase 2 — Hero Section & Relationship Timer

- [x] Buat komponen `HeroSection.tsx` dengan background foto + overlay gradient pastel
- [x] Tambahkan judul (H1) dan sub-teks singkat di Hero
- [x] Buat komponen `RelationshipTimer.tsx` (Tahun/Bulan/Hari/Jam/Menit/Detik)
- [x] Sambungkan tanggal jadian sebagai prop/konstanta (simpan di `.env.local` atau constants file)
- [x] Pastikan timer update tiap detik tanpa reload halaman
- [x] Test tampilan Hero Section di mobile & desktop
- [x] Deploy ulang ke Vercel, cek hasil live

---

## 🔴 Fase 3 — Setup Supabase & Database

- [x] Buat tabel `timeline_events` di Supabase (sesuai skema di PRD)
- [x] Buat tabel `bucket_list` di Supabase
- [x] Buat tabel `secret_messages` di Supabase
- [x] Isi data awal (seed) ke masing-masing tabel lewat Supabase Table Editor
- [x] Buat file `lib/supabaseClient.ts` untuk koneksi
- [x] Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` ke `.env.local`
- [x] Tambahkan `.env.local` ke `.gitignore` (pastikan belum ter-commit)
- [x] Tambahkan environment variables yang sama di dashboard Vercel (Settings → Environment Variables)
- [x] Test koneksi: buat 1 halaman sederhana yang fetch & tampilkan data dari salah satu tabel

---

## 🟠 Fase 4 — Love Timeline

- [x] Buat komponen `TimelineItem.tsx` (kartu satu momen)
- [x] Buat komponen `Timeline.tsx` yang fetch data dari Supabase & render list `TimelineItem`
- [x] Urutkan data berdasarkan tanggal (ascending)
- [x] Tambahkan animasi fade-in saat item muncul di viewport (scroll)
- [x] Styling responsif: alternating kiri-kanan (desktop), single column (mobile)
- [x] Tambahkan foto pendukung di tiap item (jika ada)
- [x] Test dengan data asli dari Supabase

---

## 🟠 Fase 5 — Digital Bucket List

- [x] Buat komponen `BucketListItem.tsx` dengan checkbox
- [x] Buat komponen `BucketList.tsx` yang fetch data dari Supabase
- [x] Implementasikan update status `is_done` ke Supabase saat checkbox diklik
- [x] Tambahkan animasi strikethrough saat item selesai
- [x] Tambahkan progress indicator (misal: "3 dari 10 selesai")
- [x] Test interaksi checklist secara langsung (real-time update)

---

## 🟠 Fase 6 — Secret Messages

- [x] Buat komponen `EnvelopeCard.tsx` (kondisi tertutup & terbuka)
- [x] Buat komponen `SecretMessages.tsx` yang fetch data dan render grid amplop
- [x] Tambahkan animasi buka amplop (Framer Motion: scale/flip + modal isi pesan)
- [x] Implementasikan logika `unlock_date` (amplop terkunci jika tanggal belum tiba)
- [x] Tambahkan ikon gembok untuk amplop yang masih terkunci
- [x] Test seluruh amplop: buka, tutup, kondisi terkunci

---

## 🟡 Fase 7 — Mini Music Player

- [x] Tentukan sumber audio (file lokal / embed Spotify / embed YouTube)
- [x] Upload file audio ke `/public/audio` (jika pakai file lokal)
- [x] Buat komponen `MusicPlayer.tsx` (floating player: play/pause, progress bar, nama lagu)
- [x] Tambahkan fitur next/previous track (jika lebih dari 1 lagu)
- [x] Pastikan player tidak mengganggu scroll/interaksi elemen lain (posisi fixed)
- [x] Test autoplay policy browser (biasanya perlu interaksi user dulu sebelum audio bisa play)

---

## 🟡 Fase 8 — Polish, Testing & Launch

- [x] Review seluruh halaman: konsistensi warna, font, spacing sesuai Style Guide
- [x] Test responsif di berbagai ukuran layar (mobile kecil, tablet, desktop)
- [x] Test semua animasi & transisi berjalan mulus (tidak patah/lag)
- [x] Cek loading speed (compress gambar, lazy load jika perlu)
- [x] Test semua link/tombol berfungsi
- [x] Minta orang lain (teman) untuk coba akses & kasih feedback
- [x] Setup custom domain di Vercel (opsional, jika punya domain sendiri)
- [x] Deploy final ke production
- [x] Siapkan momen/cara untuk memberikan link website ke pasangan 💕

---

## ⚪ Fase 9 — Fitur Tambahan (Opsional, Setelah Launch)

- [x] Kuis Hubungan (pertanyaan seputar hubungan kalian, dengan skor)
- [x] Tebak Gambar Pasangan (game sederhana menebak foto/momen)
- [x] Halaman "Surat untuk masa depan" (pesan terkunci sampai tanggal tertentu, misal ulang tahun tahun depan)
- [x] Fitur upload foto oleh pasangan sendiri (butuh Supabase Auth + Storage)

---

## 🟢 Fase 10 — Refinement Estetika & Navigasi Premium

- [x] Pisahkan halaman `/bucket` dan `/game` untuk pengalaman pengguna yang lebih baik
- [x] Tambahkan `ChapterNavigator` dan `PaperPlaneNavigator` untuk navigasi antar bagian
- [x] Implementasikan `FloatingMusicPlayer` dengan kontrol yang dapat diakses di seluruh halaman
- [x] Tambahkan animasi `FloatingEnvelopes` sebagai estetika background
- [x] Sempurnakan animasi `SplashScreen` dengan efek memori polaroid yang sinematik
- [x] Poles desain `HeroSection` dan `EnvelopeCard` untuk nuansa yang lebih *premium*
- [x] Integrasikan galeri foto polaroid (`PhotoGallery.tsx`)

---

## 🟣 Fase 11 — Estetika Ruang Kita & Penyelarasan Desain

- [x] Penyelarasan warna kertas catatan Love Notes dengan kertas tiket Mimpi Kita (`#FAF5EF`)
- [x] Transformasi roda Date Spinner menggunakan palet warna Pink Romantis & Rose Gold
- [x] Penyelarasan skema warna Kuis Hubungan & Tebak Gambar ke Pink Romantis
- [x] Eliminasi emotikon pada stempel status TERWUJUD untuk estetika fisik yang murni
- [x] Perbaikan rendering 3D jarum peniti & klip kertas emas agar tampil 100% utuh tanpa terpotong (unclipped rule)
- [x] Penyatuan warna aktif dock navigasi bawah menggunakan satu skema Burgundy Romantis (`#4A1E2C`) yang seragam
- [x] Pembaruan dokumen `Style-Guide-Website-Romantis.md` dan `Tasks-Website-Romantis.md`

---

## 🔵 Fase 12 — Polish Visual, Konten & Responsivitas Mobile (Rencana Selanjutnya)

- [ ] **Peningkatan Visual Landing Page**: Memperbagus estetika visual landing page terutama pada efek latar belakang (*background texture, gradient layering, & atmospheric elements*).
- [ ] **Persiapan Konten Utama**: Menyiapkan dan merapikan seluruh isi data asli untuk *Timeline* dan galeri foto *Captured Moments*.
- [ ] **Optimasi Responsif Mobile Total**: Menerapkan dan menyempurnakan tata letak di semua halaman agar 100% responsif dan nyaman di perangkat mobile tanpa mengubah sedikit pun tampilan desktop & tablet yang sudah presisi.
- [ ] **Penyelarasan & Polish Tambahan**: Melakukan audit performa visual, kecepatan muat gambar, serta pengisian konten tambahan untuk penyempurnaan akhir.

---

### 📌 Cara Pakai Checklist Ini
1. Kerjakan satu section penuh sebelum pindah ke section berikutnya.
2. Setiap poin bisa langsung dijadikan satu prompt ke Claude — tinggal sebutkan konteksnya (misal: "sesuai task Fase 4 di file Tasks, buatkan...").
3. Update file ini secara manual dengan mencentang `[x]` setiap task selesai, supaya progres selalu terlihat jelas.
