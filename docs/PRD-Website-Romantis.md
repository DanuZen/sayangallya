# 💌 Project Brief / PRD: Website Romantis untuk Pasangan

---

## 📁 1. Project Overview

| Aspek | Keterangan |
|---|---|
| **Nama Proyek** | Website Cinta Kita (bisa disesuaikan) |
| **Tujuan** | Membangun website personal romantis & interaktif sebagai hadiah/kejutan untuk pasangan |
| **Target Pengguna** | Pasangan penerima hadiah (dan kamu sebagai pembuat/admin) |
| **Fokus Utama** | UI/UX yang indah, memori perjalanan cinta, interaktivitas personal |
| **Platform** | Web (responsif — mobile & desktop) |
| **Timeline Pengembangan** | Bertahap (lihat Fase Pengembangan di bagian 7) |

---

## 🛠️ 2. Tech Stack & Tools

| Kategori | Tools | Alasan Pemilihan |
|---|---|---|
| IDE & AI Assistant | **Claude** | AI bisa generate scaffolding kode dari prompt |
| Framework Frontend | **Next.js (React)** | App Router modern, mudah untuk SEO & routing halaman |
| Styling | **Tailwind CSS** | Cepat implementasi desain custom (pastel, spacing, responsif) |
| Animasi (opsional) | **Framer Motion** | Transisi halus untuk timeline, envelope pesan, dsb |
| Database & Storage | **Supabase** | Postgres + Auth + Storage foto dalam satu platform, gratis untuk skala kecil |
| Hosting/Deployment | **Vercel** | Deploy otomatis dari GitHub, gratis untuk proyek personal |
| Version Control | **Git + GitHub** | Backup kode & histori perubahan |

### ⚠️ Catatan Keamanan
- Simpan Supabase URL & Anon Key di file `.env.local` — **jangan pernah di-commit ke Git**.
- Tambahkan `.env.local` ke `.gitignore`.
- Jika ada fitur pesan rahasia yang sensitif, pertimbangkan proteksi tambahan (misalnya password sederhana atau PIN) sebelum konten bisa dibuka.

---

## 🎨 3. UI/UX & Design Guidelines

### Palet Warna
| Elemen | Warna Contoh |
|---|---|
| Background utama | Putih / Creamy (`#FFFDF9`, `#FFF8F0`) |
| Aksen utama | Pink pastel (`#F7C6D9`, `#FADCE0`) |
| Aksen sekunder | Lavender lembut (`#E8DFF5`) atau peach (`#FDE2D0`) |
| Teks utama | Abu gelap hangat (`#3D3D3D`), bukan hitam pekat agar terasa lembut |

### Tipografi
- **Heading/Judul:** Font serif elegan — contoh: *Playfair Display*, *Cormorant Garamond*, atau *Lora* (via Google Fonts).
- **Body/Teks:** Font sans-serif rapi — contoh: *Inter*, *Poppins*, atau *Nunito Sans*.

### Prinsip Desain
- Banyak *white space*, jangan penuh sesak.
- Gunakan ilustrasi/foto bulat (rounded corners) dan shadow lembut, bukan garis tegas.
- Transisi antar halaman/section: fade atau slide halus (Framer Motion).
- Referensi visual: cari di Dribbble/Behance/Figma Community dengan kata kunci *"romantic website UI"*, *"couple web app"*, *"anniversary website design"*.

---

## ⚙️ 4. Arsitektur Fitur & Breakdown Komponen

### 1️⃣ Halaman Utama (Hero Section)
**Deskripsi:** Halaman pembuka dengan foto terbaik berdua sebagai background, dan penghitung waktu hubungan.

**Komponen:**
- `HeroSection.tsx` — wrapper utama, background image/overlay gradient pastel.
- `RelationshipTimer.tsx` — komponen client-side yang menghitung selisih waktu dari tanggal jadian sampai sekarang (real-time, update tiap detik).

**Data yang dibutuhkan:**
- Tanggal jadian (bisa disimpan sebagai konstanta di `.env.local` atau di tabel Supabase `settings`).

**Contoh prompt Claude:**
> "Buatkan komponen React `RelationshipTimer` yang menerima prop `startDate` (ISO string). Komponen ini menghitung dan menampilkan Tahun, Bulan, Hari, Jam, Menit, Detik sejak `startDate` hingga waktu sekarang, update setiap detik menggunakan `useEffect` dan `setInterval`. Styling menggunakan Tailwind dengan tema pastel, font serif untuk angka besar."

---

### 2️⃣ Linimasa Perjalanan Cinta (Love Timeline)
**Deskripsi:** Alur waktu vertikal/horizontal berisi momen-momen penting.

**Komponen:**
- `Timeline.tsx` — container yang me-render list `TimelineItem`.
- `TimelineItem.tsx` — kartu berisi tanggal, judul, deskripsi, foto (opsional).

**Skema Tabel Supabase — `timeline_events`:**
```sql
create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default now()
);
```

**Contoh prompt Claude:**
> "Buatkan komponen `Timeline` yang mengambil data dari Supabase tabel `timeline_events`, urutkan berdasarkan `event_date` ascending, dan tampilkan sebagai vertical timeline dengan garis penghubung di tengah, alternating kiri-kanan untuk desktop, dan single column untuk mobile."

---

### 3️⃣ Digital Bucket List
**Deskripsi:** Daftar checklist rencana masa depan berdua.

**Komponen:**
- `BucketList.tsx` — list item dengan checkbox interaktif.
- `BucketListItem.tsx` — satu item, bisa toggle status selesai.

**Skema Tabel Supabase — `bucket_list`:**
```sql
create table bucket_list (
  id uuid primary key default gen_random_uuid(),
  item text not null,
  is_done boolean default false,
  created_at timestamp with time zone default now()
);
```

**Contoh prompt Claude:**
> "Buatkan komponen `BucketList` yang mengambil dan menampilkan data dari tabel Supabase `bucket_list`. Setiap item punya checkbox; ketika diklik, update kolom `is_done` di Supabase secara real-time (optimistic update di UI). Style checklist dengan animasi strikethrough saat item selesai."

---

### 4️⃣ Ruang Pesan Rahasia (Secret Messages)
**Deskripsi:** Kumpulan pesan manis dalam bentuk "amplop digital" yang bisa diklik untuk dibuka.

**Komponen:**
- `SecretMessages.tsx` — grid amplop-amplop.
- `EnvelopeCard.tsx` — kartu amplop tertutup → animasi terbuka saat diklik, menampilkan isi pesan (modal/overlay).

**Skema Tabel Supabase — `secret_messages`:**
```sql
create table secret_messages (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text not null,
  unlock_date date, -- opsional: pesan baru terbuka di tanggal tertentu
  created_at timestamp with time zone default now()
);
```

**Contoh prompt Claude:**
> "Buatkan komponen `EnvelopeCard` dengan animasi Framer Motion: kondisi tertutup menampilkan ikon amplop, saat diklik animasi flip/scale membuka modal berisi teks pesan dari props `content`. Jika ada `unlockDate` di masa depan, tampilkan amplop dalam kondisi terkunci (disabled + ikon gembok)."

---

### 5️⃣ Mini Music Player
**Deskripsi:** Pemutar musik untuk lagu-lagu bermakna.

**Opsi Implementasi:**
| Opsi | Kelebihan | Kekurangan |
|---|---|---|
| File audio sendiri (`/public/audio`) | Kontrol penuh, tidak bergantung API eksternal | Perlu upload file manual, ukuran repo membesar |
| Embed Spotify | Kualitas bagus, mudah setup | Perlu akun Spotify aktif, tampilan kurang custom |
| Embed YouTube (audio only) | Mudah, gratis | Ada visual video, kurang "clean" |

**Komponen:**
- `MusicPlayer.tsx` — floating player kecil di pojok layar (play/pause, progress bar, nama lagu).

**Contoh prompt Claude:**
> "Buatkan komponen `MusicPlayer` floating di pojok kanan bawah, menggunakan HTML5 `<audio>` element dengan file dari folder `/public/audio`. Tampilkan tombol play/pause, progress bar minimalis, dan nama lagu yang sedang diputar. Style rounded pill dengan warna pastel."

---

### 6️⃣ Fitur Game & Bucket List Terdedikasi
**Deskripsi:** Halaman mandiri untuk daftar impian dan game ringan interaktif.
**Komponen:**
- `CoupleGames.tsx` — Komponen game interaktif (Kuis Hubungan, Tebak Gambar).
- `app/game/page.tsx` & `app/bucket/page.tsx` — Routing terpisah untuk pengalaman yang lebih terfokus.

---

### 7️⃣ Navigasi Interaktif & Estetika Premium
**Deskripsi:** Elemen global untuk meningkatkan UI/UX dan kesan romantis, sinematik, dan mewah.
**Komponen:**
- `FloatingMusicPlayer.tsx` — Pemutar musik mengambang dengan dukungan kontrol penuh di seluruh navigasi.
- `ChapterNavigator.tsx` & `PaperPlaneNavigator.tsx` — Navigasi antar bab yang interaktif, *playful*, dan terintegrasi dengan scroll.
- `FloatingEnvelopes.tsx` — Animasi amplop bertebaran yang melayang di background.
- `PhotoGallery.tsx` — Galeri memori polaroid dengan transisi yang halus.
- `SplashScreen.tsx` — Animasi pembuka bergaya memori polaroid.

---

## 🗂️ 5. Struktur Folder Proyek (Rekomendasi)

```
love-website/
├── app/
│   ├── page.tsx                 # Halaman utama (Hero, Splash Screen, dll)
│   ├── bucket/page.tsx          # Halaman khusus Bucket List
│   ├── game/page.tsx            # Halaman khusus Couple Games
│   └── layout.tsx               # Global navigators & music player
├── components/
│   ├── HeroSection.tsx
│   ├── SplashScreen.tsx
│   ├── RelationshipTimer.tsx
│   ├── Timeline.tsx & TimelineItem.tsx
│   ├── BucketList.tsx & BucketListItem.tsx
│   ├── SecretMessages.tsx & EnvelopeCard.tsx
│   ├── FloatingMusicPlayer.tsx
│   ├── FloatingEnvelopes.tsx
│   ├── ChapterNavigator.tsx
│   ├── PaperPlaneNavigator.tsx
│   ├── PhotoGallery.tsx
│   └── CoupleGames.tsx
├── lib/
│   └── supabaseClient.ts        # Inisialisasi Supabase client
├── public/
│   ├── images/
│   ├── audio/
│   └── plane.png
├── .env.local                   # Environment variables (JANGAN commit)
├── tailwind.config.ts
└── package.json
```

---

## 🔌 6. Setup Supabase Client (Contoh Kode)

```ts
// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
```

---

## 🚀 7. Fase Pengembangan (Roadmap)

| Fase | Fitur | Estimasi Prioritas |
|---|---|---|
| **Fase 1** | Setup project Next.js + Tailwind + Vercel deploy awal | 🔴 Wajib pertama |
| **Fase 2** | Hero Section + Relationship Timer | 🔴 Tinggi |
| **Fase 3** | Setup Supabase + tabel database | 🔴 Tinggi |
| **Fase 4** | Love Timeline | 🟠 Sedang-Tinggi |
| **Fase 5** | Digital Bucket List | 🟠 Sedang |
| **Fase 6** | Secret Messages | 🟠 Sedang |
| **Fase 7** | Mini Music Player | 🟡 Rendah-Sedang |
| **Fase 8** | Polish UI, animasi, testing responsif | 🟡 Selesai |
| **Fase 9** | Fitur Game (kuis/tebak gambar) & Halaman Terpisah | 🟡 Selesai |
| **Fase 10** | Refinement Estetika, Navigasi Premium (Paper Plane), & Floating Elements | 🟢 Selesai |

---

## 💡 8. Tips Menggunakan Claude Secara Efektif

1. **Mulai dari scaffolding project**, baru breakdown per komponen — jangan minta semua fitur sekaligus dalam satu prompt.
2. **Berikan konteks tabel Supabase** setiap kali minta komponen yang terhubung ke database, supaya AI tidak menebak struktur data.
3. **Gunakan prompt spesifik** — sebutkan nama file, props yang dibutuhkan, dan behavior yang diinginkan (contoh-contoh prompt di atas sudah mengikuti pola ini).
4. **Test tiap komponen secara terpisah** sebelum menggabungkan ke halaman utama, supaya lebih mudah melacak bug.
5. Simpan dokumen PRD ini dan **paste bagian yang relevan saja** ke Claude sesuai fitur yang sedang dikerjakan, bukan seluruh dokumen sekaligus — supaya AI lebih fokus.

---

**Siap coding!** Kalau nanti ada kendala teknis di Next.js, Supabase, atau logika komponen tertentu saat pakai Claude, langsung tanyakan di chat ini. 🎉
