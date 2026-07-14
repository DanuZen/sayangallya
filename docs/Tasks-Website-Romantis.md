# ✅ Task List — Website Romantis

Checklist ini disusun berurutan sesuai fase pengembangan. Kerjakan dari atas ke bawah, centang tiap selesai. Setiap task sudah dirancang cukup kecil untuk dijadikan satu prompt ke Claude.

---

## 🔴 Fase 0 — Persiapan (Sebelum Coding)

- [x] Tentukan nama domain/judul website (misal: "Perjalanan Kita", nama panggilan berdua, dll)
- [ ] Kumpulkan foto-foto yang akan dipakai (hero, timeline, envelope background) — kompres ke WebP
- [ ] Kumpulkan data momen penting untuk Love Timeline (tanggal + judul + deskripsi singkat)
- [ ] Tulis 5–10 pesan untuk Secret Messages
- [ ] Tulis daftar Bucket List (minimal 5–10 item)
- [ ] Pilih 3–5 lagu bermakna + siapkan file audio (atau link Spotify/YouTube)
- [x] Buat akun Supabase (jika belum) dan buat project baru
- [x] Buat akun Vercel (jika belum) dan hubungkan ke GitHub

---

## 🔴 Fase 1 — Setup Project

- [ ] Buka Claude, buat project baru Next.js + Tailwind CSS
- [ ] Setup struktur folder sesuai rekomendasi di PRD (`components/`, `lib/`, `public/`)
- [ ] Install dependency tambahan: `framer-motion`, `@supabase/supabase-js`, `lucide-react`
- [ ] Setup Google Fonts (Playfair Display + Poppins) di `layout.tsx`
- [ ] Tambahkan warna custom ke `tailwind.config.ts` sesuai Style Guide
- [ ] Push project awal ke GitHub
- [ ] Deploy awal ke Vercel (pastikan halaman default Next.js muncul, sebagai tes koneksi)

---

## 🔴 Fase 2 — Hero Section & Relationship Timer

- [ ] Buat komponen `HeroSection.tsx` dengan background foto + overlay gradient pastel
- [ ] Tambahkan judul (H1) dan sub-teks singkat di Hero
- [ ] Buat komponen `RelationshipTimer.tsx` (Tahun/Bulan/Hari/Jam/Menit/Detik)
- [ ] Sambungkan tanggal jadian sebagai prop/konstanta (simpan di `.env.local` atau constants file)
- [ ] Pastikan timer update tiap detik tanpa reload halaman
- [ ] Test tampilan Hero Section di mobile & desktop
- [ ] Deploy ulang ke Vercel, cek hasil live

---

## 🔴 Fase 3 — Setup Supabase & Database

- [ ] Buat tabel `timeline_events` di Supabase (sesuai skema di PRD)
- [ ] Buat tabel `bucket_list` di Supabase
- [ ] Buat tabel `secret_messages` di Supabase
- [ ] Isi data awal (seed) ke masing-masing tabel lewat Supabase Table Editor
- [ ] Buat file `lib/supabaseClient.ts` untuk koneksi
- [ ] Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` ke `.env.local`
- [ ] Tambahkan `.env.local` ke `.gitignore` (pastikan belum ter-commit)
- [ ] Tambahkan environment variables yang sama di dashboard Vercel (Settings → Environment Variables)
- [ ] Test koneksi: buat 1 halaman sederhana yang fetch & tampilkan data dari salah satu tabel

---

## 🟠 Fase 4 — Love Timeline

- [ ] Buat komponen `TimelineItem.tsx` (kartu satu momen)
- [ ] Buat komponen `Timeline.tsx` yang fetch data dari Supabase & render list `TimelineItem`
- [ ] Urutkan data berdasarkan tanggal (ascending)
- [ ] Tambahkan animasi fade-in saat item muncul di viewport (scroll)
- [ ] Styling responsif: alternating kiri-kanan (desktop), single column (mobile)
- [ ] Tambahkan foto pendukung di tiap item (jika ada)
- [ ] Test dengan data asli dari Supabase

---

## 🟠 Fase 5 — Digital Bucket List

- [ ] Buat komponen `BucketListItem.tsx` dengan checkbox
- [ ] Buat komponen `BucketList.tsx` yang fetch data dari Supabase
- [ ] Implementasikan update status `is_done` ke Supabase saat checkbox diklik
- [ ] Tambahkan animasi strikethrough saat item selesai
- [ ] Tambahkan progress indicator (misal: "3 dari 10 selesai")
- [ ] Test interaksi checklist secara langsung (real-time update)

---

## 🟠 Fase 6 — Secret Messages

- [ ] Buat komponen `EnvelopeCard.tsx` (kondisi tertutup & terbuka)
- [ ] Buat komponen `SecretMessages.tsx` yang fetch data dan render grid amplop
- [ ] Tambahkan animasi buka amplop (Framer Motion: scale/flip + modal isi pesan)
- [ ] Implementasikan logika `unlock_date` (amplop terkunci jika tanggal belum tiba)
- [ ] Tambahkan ikon gembok untuk amplop yang masih terkunci
- [ ] Test seluruh amplop: buka, tutup, kondisi terkunci

---

## 🟡 Fase 7 — Mini Music Player

- [ ] Tentukan sumber audio (file lokal / embed Spotify / embed YouTube)
- [ ] Upload file audio ke `/public/audio` (jika pakai file lokal)
- [ ] Buat komponen `MusicPlayer.tsx` (floating player: play/pause, progress bar, nama lagu)
- [ ] Tambahkan fitur next/previous track (jika lebih dari 1 lagu)
- [ ] Pastikan player tidak mengganggu scroll/interaksi elemen lain (posisi fixed)
- [ ] Test autoplay policy browser (biasanya perlu interaksi user dulu sebelum audio bisa play)

---

## 🟡 Fase 8 — Polish, Testing & Launch

- [ ] Review seluruh halaman: konsistensi warna, font, spacing sesuai Style Guide
- [ ] Test responsif di berbagai ukuran layar (mobile kecil, tablet, desktop)
- [ ] Test semua animasi & transisi berjalan mulus (tidak patah/lag)
- [ ] Cek loading speed (compress gambar, lazy load jika perlu)
- [ ] Test semua link/tombol berfungsi
- [ ] Minta orang lain (teman) untuk coba akses & kasih feedback
- [ ] Setup custom domain di Vercel (opsional, jika punya domain sendiri)
- [ ] Deploy final ke production
- [ ] Siapkan momen/cara untuk memberikan link website ke pasangan 💕

---

## ⚪ Fase 9 — Fitur Tambahan (Opsional, Setelah Launch)

- [ ] Kuis Hubungan (pertanyaan seputar hubungan kalian, dengan skor)
- [ ] Tebak Gambar Pasangan (game sederhana menebak foto/momen)
- [ ] Halaman "Surat untuk masa depan" (pesan terkunci sampai tanggal tertentu, misal ulang tahun tahun depan)
- [ ] Fitur upload foto oleh pasangan sendiri (butuh Supabase Auth + Storage)

---

### 📌 Cara Pakai Checklist Ini
1. Kerjakan satu section penuh sebelum pindah ke section berikutnya.
2. Setiap poin bisa langsung dijadikan satu prompt ke Claude — tinggal sebutkan konteksnya (misal: "sesuai task Fase 4 di file Tasks, buatkan...").
3. Update file ini secara manual dengan mencentang `[x]` setiap task selesai, supaya progres selalu terlihat jelas.
