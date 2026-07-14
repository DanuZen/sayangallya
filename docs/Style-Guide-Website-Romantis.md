# 🎨 Style Guide — Website Romantis

Dokumen ini jadi acuan visual supaya semua komponen yang dibuat (baik manual maupun via Claude AI) konsisten satu sama lain.

---

## 1. 🎨 Color Palette

### Primary Colors
| Nama | Hex | Penggunaan |
|---|---|---|
| Cream White | `#FFFDF9` | Background utama |
| Soft Peach | `#FFF8F0` | Background alternatif (section kedua) |
| Blush Pink | `#F7C6D9` | Aksen utama, tombol, highlight |
| Rose Pink | `#E88CA8` | Hover state, aksen lebih kuat |

### Secondary Colors
| Nama | Hex | Penggunaan |
|---|---|---|
| Lavender Mist | `#E8DFF5` | Aksen sekunder (card bucket list, badge) |
| Peach Glow | `#FDE2D0` | Aksen sekunder (envelope, timeline dot) |
| Sage Green | `#DCE8DD` | Elemen sukses (misal: bucket list selesai) |

### Neutral / Teks
| Nama | Hex | Penggunaan |
|---|---|---|
| Warm Charcoal | `#3D3D3D` | Teks utama (bukan hitam pekat) |
| Soft Gray | `#8A8A8A` | Teks sekunder / caption |
| Border Gray | `#EDE6E0` | Border tipis, divider |

### Contoh Tailwind Config
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      cream: '#FFFDF9',
      peach: '#FFF8F0',
      blush: '#F7C6D9',
      rose: '#E88CA8',
      lavender: '#E8DFF5',
      peachglow: '#FDE2D0',
      sage: '#DCE8DD',
      charcoal: '#3D3D3D',
      graytext: '#8A8A8A',
      bordergray: '#EDE6E0',
    }
  }
}
```

---

## 2. ✍️ Typography

### Font Family
| Peran | Font | Import (Google Fonts) |
|---|---|---|
| Heading / Judul | **Playfair Display** (serif elegan) | `Playfair+Display:wght@500;600;700` |
| Body / Teks | **Poppins** atau **Inter** (sans-serif) | `Poppins:wght@300;400;500;600` |
| Aksen dekoratif (opsional) | **Dancing Script** (script/cursive, untuk quote romantis) | `Dancing+Script:wght@600` |

### Type Scale
| Elemen | Ukuran (Desktop) | Ukuran (Mobile) | Font | Weight |
|---|---|---|---|---|
| H1 (Hero title) | 56px | 36px | Playfair Display | 600 |
| H2 (Section title) | 36px | 28px | Playfair Display | 600 |
| H3 (Card title) | 22px | 18px | Playfair Display | 500 |
| Body text | 16px | 15px | Poppins | 400 |
| Caption / small text | 13px | 12px | Poppins | 400 |
| Quote / dekoratif | 24px | 20px | Dancing Script | 600 |

### Contoh CSS
```css
h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}
body, p, span {
  font-family: 'Poppins', sans-serif;
  color: #3D3D3D;
}
```

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

**Container width:** max-width `1200px`, dengan padding horizontal `24px` (mobile) / `48px` (desktop).

**Grid:** gunakan grid 12 kolom untuk layout desktop, 1 kolom (stack) untuk mobile.

---

## 4. 🧩 Komponen UI

### Button
```
Primary Button:
- Background: blush (#F7C6D9) → hover: rose (#E88CA8)
- Text: white
- Border-radius: 9999px (pill shape)
- Padding: 12px 28px
- Font: Poppins, 500, 15px
- Transition: 200ms ease

Secondary Button (outline):
- Border: 1.5px solid rose (#E88CA8)
- Background: transparent
- Text: rose (#E88CA8)
- Border-radius: 9999px
```

### Card
```
- Background: white / cream
- Border-radius: 20px
- Shadow: soft (0 4px 20px rgba(0,0,0,0.06))
- Padding: 24px
- Hover: shadow sedikit lebih tebal + translateY(-2px)
```

### Input / Form (jika ada)
```
- Border: 1px solid border-gray (#EDE6E0)
- Border-radius: 12px
- Padding: 10px 16px
- Focus: border rose (#E88CA8) + ring lembut
```

### Icon Style
- Gunakan icon set dengan garis tipis (outline), bukan solid — contoh: **Lucide Icons** atau **Phosphor Icons**.
- Warna icon default: `charcoal` atau `rose` untuk aksen.

---

## 5. 🌀 Animasi & Transisi

| Elemen | Efek | Durasi | Easing |
|---|---|---|---|
| Page transition | Fade in + slight slide up | 400ms | ease-out |
| Card hover | translateY(-2px) + shadow naik | 200ms | ease |
| Envelope buka | Scale + flip | 500ms | ease-in-out |
| Timeline item muncul | Fade in saat scroll (on view) | 600ms | ease-out |
| Button hover | Background color transition | 200ms | ease |
| Timer angka berubah | Fade/flip digit | 300ms | ease |

**Library rekomendasi:** Framer Motion untuk animasi React, atau `AOS` (Animate On Scroll) untuk animasi scroll sederhana.

---

## 6. 🖼️ Imagery & Media Guidelines

- Foto pasangan: gunakan aspect ratio konsisten (misal `4:5` untuk portrait card, `16:9` untuk hero banner).
- Beri sedikit overlay gradient pastel (misal dari `blush/30%` ke transparan) di atas foto hero supaya teks tetap terbaca.
- Rounded corners konsisten: `16px–24px` untuk foto dalam card, hero image bisa full-bleed tanpa radius.
- Kompres gambar sebelum upload (gunakan format WebP jika memungkinkan) untuk performa loading.

---

## 7. ♿ Aksesibilitas & Responsif

- Kontras teks vs background minimal rasio 4.5:1 (hindari teks pink muda di atas background putih polos tanpa penambahan weight/size).
- Semua tombol/klik area minimal `44x44px` untuk kenyamanan di mobile.
- Breakpoint Tailwind yang dipakai:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- Test tampilan di ukuran mobile kecil (iPhone SE ~375px) untuk memastikan tidak ada elemen terpotong.

---

## 8. 📋 Quick Reference (Cheat Sheet)

```
Background utama   : #FFFDF9
Aksen utama        : #F7C6D9 (hover #E88CA8)
Teks utama         : #3D3D3D
Font judul         : Playfair Display
Font body          : Poppins
Border-radius card : 20px
Border-radius btn  : 9999px (pill)
Shadow card         : 0 4px 20px rgba(0,0,0,0.06)
```

Simpan cheat sheet ini di dekat kamu saat coding — semua nilai di atas bisa langsung dipakai tanpa perlu scroll ke atas.
