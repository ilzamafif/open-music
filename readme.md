# OpenMusic API Documentation

## Overview
OpenMusic API adalah sebuah proyek untuk mengelola data musik yang mencakup album, lagu, playlist, dan pengguna. API ini dirancang untuk memenuhi berbagai kebutuhan dalam pengelolaan data musik dengan menerapkan teknik modern seperti validasi data, autentikasi, dan penggunaan database relasional PostgreSQL. Dokumentasi ini mencakup kriteria utama dan opsional yang diterapkan dalam proyek ini.

---

## Kriteria Utama

### 1. **Konfigurasi Proyek Node.js**
- Aplikasi HTTP Server dapat dijalankan menggunakan perintah `npm run start`.
- Host dan port server ditentukan menggunakan environment variable `HOST` dan `PORT`.

### 2. **Pengelolaan Data Album**
- Menyediakan endpoint untuk pengelolaan album, termasuk operasi CRUD (Create, Read, Update, Delete).
- Album memiliki properti utama:
  - `id`: ID unik dari album.
  - `name`: Nama album.
  - `year`: Tahun rilis album.

### 3. **Pengelolaan Data Lagu**
- Menyediakan endpoint untuk pengelolaan lagu dengan properti utama:
  - `id`: ID unik dari lagu.
  - `title`: Judul lagu.
  - `year`: Tahun rilis lagu.
  - `performer`: Penyanyi lagu.
  - `genre`: Genre lagu.
  - `duration`: Durasi lagu (dalam detik).
  - `albumId`: ID album tempat lagu berada.

### 4. **Menerapkan Data Validation**
- Validasi diterapkan pada semua request payload.
- Data wajib memenuhi format berikut:
  - Album: `name` (string, required), `year` (number, required).
  - Lagu: `title` (string, required), `year` (number, required), `genre` (string, required), `performer` (string, required), `duration` (number), `albumId` (string).

### 5. **Penanganan Eror (Error Handling)**
- Validasi data yang gagal akan menghasilkan status code `400` (Bad Request).
- Resource yang tidak ditemukan akan menghasilkan status code `404` (Not Found).
- Masalah internal server akan menghasilkan status code `500` (Internal Server Error).

### 6. **Menggunakan Database dalam Menyimpan Data**
- Data disimpan di PostgreSQL agar tetap tersedia setelah server di-restart.
- Struktur database dikelola menggunakan teknik migrations dengan package `node-pg-migrate`.
- Environment variables digunakan untuk konfigurasi database:
  - `PGUSER`: Username database.
  - `PGPASSWORD`: Password database.
  - `PGDATABASE`: Nama database.
  - `PGHOST`: Host database.
  - `PGPORT`: Port database.
- `dotenv` digunakan untuk mengelola environment variables.

---

## Kriteria Opsional

### 1. **Memunculkan Daftar Lagu dalam Detail Album**
- Endpoint untuk mendapatkan detail album mencantumkan daftar lagu yang ada di dalam album tersebut.

### 2. **Query Parameter untuk Pencarian Lagu**
- Menyediakan fitur pencarian lagu berdasarkan judul (`title`) dan/atau penyanyi (`performer`) melalui query parameter.
- Kedua parameter dapat digunakan secara bersamaan.

### 3. **Registrasi dan Autentikasi Pengguna**
- API mendukung registrasi dan autentikasi pengguna.
- Fitur autentikasi menggunakan JWT (JSON Web Token).
- Token JWT memiliki payload berisi `userId` yang unik.
- Refresh token disimpan di database.

### 4. **Pengelolaan Data Playlist**
- Playlist hanya dapat diakses oleh pemilik atau kolaborator.
- Lagu dapat ditambahkan atau dihapus dari playlist.
- Data playlist mencakup:
  - `id`: ID unik playlist.
  - `name`: Nama playlist.
  - `owner`: ID pemilik playlist.

### 5. **Menerapkan Foreign Key**
- Relasi database diterapkan menggunakan Foreign Key, termasuk:
  - Tabel `songs` terhadap tabel `albums`.
  - Tabel `playlists` terhadap tabel `users`.

### 6. **Fitur Kolaborator Playlist**
- Pemilik playlist dapat menambahkan kolaborator.
- Kolaborator memiliki hak akses untuk:
  - Melihat playlist.
  - Menambahkan atau menghapus lagu dalam playlist.
  - Melihat daftar lagu dalam playlist.

### 7. **Fitur Playlist Activities**
- Riwayat aktivitas playlist dicatat, termasuk penambahan dan penghapusan lagu.
- Riwayat dapat diakses melalui endpoint khusus.

---

## Teknologi yang Digunakan
- **Node.js**: Backend server.
- **PostgreSQL**: Database untuk menyimpan data album, lagu, playlist, dan pengguna.
- **node-pg-migrate**: Pengelolaan migrasi database.
- **JWT (JSON Web Token)**: Autentikasi pengguna.
- **dotenv**: Pengelolaan environment variables.

---

## Panduan Penggunaan
1. Clone repository proyek ini.
2. Instal dependensi dengan perintah `npm install`.
3. Konfigurasikan environment variables di file `.env`.
4. Jalankan migrasi database menggunakan `npm run migrate up`.
5. Mulai server dengan perintah `npm run start`.

---

## Catatan Tambahan
- Pastikan semua environment variables sudah dikonfigurasi dengan benar.
- Dokumentasi ini dirancang agar mudah dipahami oleh pengembang yang akan menggunakan atau melanjutkan proyek ini.

