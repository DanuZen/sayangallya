# 🎨 Style Guide — Website Romantis

Dokumen ini jadi acuan visual supaya semua komponen yang dibuat konsisten satu sama lain, baik di halaman utama maupun di modul interaktif **Ruang Kita (Our Space)**.

---

## 1. 🎨 Color Palette

### Primary & Luxury Accent Colors
| Nama | Hex | Penggunaan |
|---|---|---|
| Deep Burgundy / Wine | `#4A1E2C` / `#3A1420` | Aksen utama luxury, header Ruang Kita, background active dock navigasi, tombol utama |
| Warm Cream Paper | `#FAF5EF` / `#FAF7F2` | Kertas catatan Love Notes, tiket impian Bucket List, & popup modal vintage |
| Cream White | `#FFFDF9` | Background umum halaman |
| Soft Peach | `#FFF8F0` | Background alternatif (section kedua) |
| Blush Pink | `#F7C6D9` | Highlight & aksen lembut |
| Rose Pink | `#E88CA8` | Hover state, aksen sekunder |

### Romantic Pink & Rose Palette (Date Spinner & Kuis Hubungan)
| Nama | Hex | Penggunaan |
|---|---|---|
| Cotton Pink | `#FCE7F3` | Wheel slice Date Spinner / Opsi kuis |
| Vibrant Pink | `#F472B6` | Wheel slice Date Spinner / Highlight kuis |
| Warm Blush Pink | `#FBCFE8` | Wheel slice Date Spinner / Card aksen |
| Coral Rose | `#FB7185` | Wheel slice Date Spinner / Rose pin accent |
| Pastel Rose | `#F48FB1` | Wheel slice Date Spinner / Sub-text |
| Creamy Pink | `#F8BBD0` | Wheel slice Date Spinner / Soft badge |

### Neutral / Teks & Fisik
| Nama | Hex | Penggunaan |
|---|---|---|
| Deep Wine Text | `#3A1420` / `#2D121A` | Teks utama pada kertas vintage & modal |
| Soft Gray Caption | `#8A8A8A` / `rgba(0,0,0,0.5)` | Teks sekunder, tanggal, & caption |
| Border Vintage | `#4A1E2C`/15 | Border halus pada kertas fisik & card |

---

## 2. ✍️ Typography

### Font Family
| Peran | Font | Import (Google Fonts) |
|---|---|---|
| Heading / Judul | **Playfair Display** (serif elegan) | `Playfair+Display:wght@500;600;700;800` |
| Body / Teks | **Poppins** atau **Inter** (sans-serif) | `Poppins:wght@300;400;500;600` |
| Handwritten / Quotes | **Dancing Script** (cursive romantis) | `Dancing+Script:wght@600;700` |

### Type Scale
| Elemen | Ukuran (Desktop) | Ukuran (Mobile) | Font | Weight |
|---|---|---|---|---|
| H1 (Hero title) | 56px | 36px | Playfair Display | 700 |
| H2 (Section title) | 36px | 28px | Playfair Display | 600 |
| H3 (Card title) | 22px | 18px | Playfair Display | 600 |
| Body text | 16px | 15px | Poppins | 400 |
| Caption / small text | 13px | 12px | Poppins | 400 |
| Handwritten Note | 24px | 20px | Dancing Script | 600 |

---

## 3. 📐 Spacing & Layout

| Token | Nilai | Penggunaan |
|---|---|---|
| `xs` | 4px | Gap antar ikon-teks kecil |
| `sm` | 8px | Padding button kecil |
| `md` | 16px | Padding card, gap antar elemen |
| `lg` | 32px | Margin antar section (mobile) |
| `xl` | 64px | Margin antar section (desktop) |
| `2xl` | 96px | Padding hero section |

---

## 4. 📌 Standar Desain "Ruang Kita" (Stationery & Physical Decor Rules)

### 1. Kertas Fisik (Vintage Paper Aesthetic)
- Seluruh komponen berbasis kertas (*Love Notes Board*, *Bucket List*, *Modal Popup*) wajib menggunakan warna latar belakang **Warm Cream Paper (`#FAF5EF`)**.
- Gunakan garis tekstur samar (*repeating linear gradient*) dan lipatan sudut (*dog-ear corner fold*) untuk efek kertas fisik otentik.

### 2. Jarum Peniti 3D & Klip Kertas Emas (Unclipped Decor Rule)
- **Haram menggunakan `overflow-hidden`** pada kontainer utama tempat jarum peniti atau klip kertas bertengger.
- Jarum peniti 3D merah dan klip kertas emas wajib diletakkan secara `absolute` menembus batas atas kontainer agar **tampil 100% utuh tanpa terpotong**.

### 3. Stempel Fisik Murni (Pure Clean Stamp Rule)
- Stempel status (seperti stempel `TERWUJUD`) wajib menampilkan **teks murni murni tanpa emotikon/sparkle** dengan rotasi miring murni (-12deg s/d 12deg) dan border ganda untuk estetika cetak fisik yang bersih dan elegan.

### 4. Navigation Floating Dock (Unified Active Style Rule)
- Seluruh tab navigasi bawah saat kondisi aktif **wajib menggunakan warna latar belakang aktif yang seragam**: `#4A1E2C` (Deep Burgundy) dengan `ring-2 ring-rose-300/50`.
- **Tidak boleh ada perbedaan warna aktif antar tab** agar tampilan navigasi tetap konsisten dan tidak seperti "warna-warni".

---

## 5. 🧩 Komponen UI

### Button
```
Primary Button:
- Background: Deep Burgundy (#4A1E2C) → hover: Rose Burgundy (#881337)
- Text: Soft Cream (#F3EAE3)
- Border-radius: 9999px (pill shape)
- Padding: 10px 24px
- Font: Poppins, 600, 12px
- Border: border border-white/20
```

### Card (Vintage Memo & Ticket)
```
- Background: #FAF5EF
- Border-radius: 4px (stationery cut) atau 16px (ticket)
- Border: border border-[#4A1E2C]/15
- Shadow: 0 15px 35px rgba(0,0,0,0.35)
- Padding: 20px - 24px
```

---

## 6. 📋 Quick Reference (Cheat Sheet)

```
Header & Active Dock : #4A1E2C (Deep Burgundy)
Kertas Memo & Tiket  : #FAF5EF (Warm Cream Paper)
Teks Kertas Utama    : #3A1420 (Wine Text)
Palet Pink Romantis  : #FCE7F3, #F472B6, #FBCFE8, #FB7185
Font Judul           : Playfair Display
Font Body            : Poppins
Font Tulisan Tangan  : Dancing Script
Aturan Dekorasi 3D   : Dilarang overflow-hidden pada parent jarum/klip
Stempel Status       : Teks murni tanpa emotikon (Pure Clean Stamp)
Dock Navigasi        : 100% warna aktif seragam (#4A1E2C)
```
