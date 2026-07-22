# 🧩 Frontend Architecture & Component Map

Dokumen ini memetakan arsitektur komponen di **Next.js (App Router)**. Tujuannya agar pembagian antara *Server Components* (optimal untuk *fetching* data SEO) dan *Client Components* (untuk animasi dan interaktivitas) menjadi sangat jelas sebelum mulai *coding*.

---

## 1. Strategi Rendering (App Router)

- **Server Components (Default):** Digunakan untuk komponen struktural (halaman utama, layout) dan komponen yang mengambil data (*fetch*) langsung dari Supabase tanpa butuh interaksi *real-time* tinggi dari *user*. Ini membuat website sangat cepat saat pertama kali dimuat.
- **Client Components (`"use client"`):** Hanya digunakan pada komponen spesifik yang membutuhkan:
  - *React Hooks* (`useState`, `useEffect`)
  - Interaksi *User* (`onClick`, input)
  - *Browser API* (`setInterval` untuk timer, `Audio` untuk musik)
  - Animasi menggunakan *Framer Motion*

---

## 2. Hirarki Komponen & Page Structure

```text
app/
├── layout.tsx (Server Component)
│   ├── Mengatur Font, Metadata dasar, Global Layout.
│   ├── <FloatingMusicPlayer /> (Client Component) -> Global music player
│   └── <PaperPlaneNavigator /> / <ChapterNavigator /> (Client Component) -> Global navigations
│
├── page.tsx (Server Component) -> [HALAMAN UTAMA]
│   ├── <HeroSection /> (Server Component)
│   │   └── <RelationshipTimer startDate="..." /> (Client Component)
│   ├── <SplashScreen /> (Client Component) -> Animasi polaroid di awal
│   ├── <FloatingEnvelopes /> (Client Component) -> Animasi background
│   ├── <TimelineWrapper /> (Server Component)
│   │   └── <TimelineList events={data} /> (Client Component)
│   │       └── <TimelineItem /> (Client Component)
│   ├── <PhotoGallery /> (Client Component)
│   └── <SecretMessagesWrapper /> (Server Component)
│       └── <MessagesGrid messages={data} /> (Client Component)
│           └── <EnvelopeCard /> (Client Component)
│
├── bucket/page.tsx (Server Component) -> [HALAMAN BUCKET LIST]
│   └── <BucketList items={data} /> (Client Component)
│       └── <BucketListItem /> (Client Component)
│
└── game/page.tsx (Server Component) -> [HALAMAN COUPLE GAMES]
    └── <CoupleGames /> (Client Component)
```

---

## 3. Manajemen State (State Management)

Karena skala website ini kecil hingga menengah, kita **tidak** membutuhkan *library state management* kompleks seperti Redux atau Zustand.
*   **Data Fetching:** Dilakukan di level *Server Component* (`page.tsx` atau wrapper), lalu data di-passing ke bawah sebagai `props`.
*   **UI State:** (Misal: status amplop terbuka, status checklist) di-handle secara lokal menggunakan `useState` di masing-masing komponen.
*   **Supabase Client:**
    *   Menggunakan `@supabase/supabase-js` biasa jika *fetching* di Client Component.
    *   (Rekomendasi) Menggunakan `@supabase/ssr` jika *fetching* dilakukan di *Server Components* untuk keamanan yang lebih baik.

## 4. Pola Reusabilitas

- **UI Tokens:** Tombol (Button), Card, dan Modal akan dibuat sebagai komponen mandiri di `components/ui/` agar dapat digunakan berulang-kali (misal: tombol tutup di dalam amplop pesan).
- **Icons:** Akan menggunakan komponen dari `lucide-react` (seperti yang tertera di Style Guide). Tentukan ukuran seragam untuk ikon via properti bawaan *Lucide*.
