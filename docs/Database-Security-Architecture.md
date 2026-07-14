# 🔐 Database Schema & Security Architecture

Dokumen ini mendetailkan struktur tabel di **Supabase**, tipe data, dan yang paling krusial: **Row Level Security (RLS)**. Karena ini adalah website publik (tanpa sistem login/Auth untuk pembaca), kita harus mengatur kebijakan keamanan agar data tidak mudah dihapus atau dirusak oleh pihak tak bertanggung jawab.

---

## 1. Tabel: `timeline_events`
Menyimpan data momen sejarah untuk halaman Love Timeline.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | Auto-generate |
| `event_date` | `date` | Tanggal kejadian momen |
| `title` | `text` | Judul momen |
| `description` | `text` | Deskripsi cerita (opsional) |
| `image_url` | `text` | URL gambar/foto (opsional) |
| `created_at` | `timestamptz` | Waktu data dibuat |

### 🛡️ RLS Policy (`timeline_events`)
Data ini bersifat **Read-Only** untuk pengguna web. Anda hanya akan mengedit/menambahkannya lewat Dashboard Supabase.
- **Enable RLS:** `TRUE`
- **SELECT (Read):** `public` (Anon) diperbolehkan melihat semua data.
- **INSERT/UPDATE/DELETE:** DILARANG untuk publik. (Hanya via Supabase Dashboard).

---

## 2. Tabel: `secret_messages`
Menyimpan amplop pesan digital.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | Auto-generate |
| `title` | `text` | Judul/Hint di luar amplop |
| `content` | `text` | Isi pesan rahasia |
| `unlock_date` | `date` | Tanggal pesan boleh dibuka (opsional) |
| `created_at` | `timestamptz` | Waktu data dibuat |

### 🛡️ RLS Policy (`secret_messages`)
- **Enable RLS:** `TRUE`
- **SELECT (Read):** `public` (Anon) diperbolehkan membaca data. Logika penguncian amplop berdasarkan `unlock_date` akan di-*handle* di frontend (UI), namun untuk keamanan maksimal, policy SQL juga bisa diatur agar data `content` disembunyikan jika `unlock_date > now()`.
- **INSERT/UPDATE/DELETE:** DILARANG untuk publik.

---

## 3. Tabel: `bucket_list`
Menyimpan daftar rencana masa depan.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | Auto-generate |
| `item` | `text` | Nama aktivitas/rencana |
| `is_done` | `boolean` | Status centang (default: `false`) |
| `created_at` | `timestamptz` | Waktu data dibuat |

### 🛡️ RLS Policy (`bucket_list`)
Tabel ini sedikit berbeda karena di PRD ada fitur centang (*checkbox*) di UI. Ini berarti kita butuh akses **UPDATE** dari frontend.
- **Enable RLS:** `TRUE`
- **SELECT (Read):** `public` (Anon) diperbolehkan.
- **UPDATE:** `public` (Anon) diperbolehkan, **TETAPI HANYA UNTUK KOLOM `is_done`**.
  *(Untuk mencegah orang mengganti teks `item` seenaknya dari console browser)*.
- **INSERT/DELETE:** DILARANG untuk publik.

*(Saran Alternatif: Jika Anda tidak ingin publik sembarangan mengubah status centang, jadikan Read-Only saja. Anda dapat memperbarui statusnya secara manual melalui dasbor Supabase saat mimpi tersebut terwujud).*

---

## 📝 Kesimpulan Keamanan
Karena kita mengandalkan **Anon Key** dari Supabase yang terekspos di sisi *Client* (browser), **Row Level Security (RLS)** adalah tembok pertahanan utama kita. Jangan biarkan *insert/delete* terbuka untuk `anon`. Selalu set operasi tulis ke *restricted* kecuali untuk interaksi minor seperti *toggle* checklist.
