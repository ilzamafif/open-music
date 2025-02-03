# OpenMusic API

## Deskripsi
OpenMusic API adalah layanan berbasis Node.js yang menyediakan fitur pengelolaan album, lagu, playlist, serta autentikasi pengguna. API ini menggunakan PostgreSQL sebagai database dan mendukung fitur ekspor data serta unggahan sampul album.

## Fitur Utama

### 1. Konfigurasi Proyek Node.js
- Dapat dijalankan dengan perintah `npm run start`.
- Menggunakan environment variable untuk konfigurasi HOST dan PORT.

### 2. Pengelolaan Data Album
- Menyediakan endpoint untuk CRUD (Create, Read, Update, Delete) album.
- Data album tersimpan dalam database PostgreSQL.

### 3. Pengelolaan Data Lagu
- Menyediakan endpoint untuk CRUD lagu.
- Lagu dapat dikaitkan dengan album tertentu.
- Data lagu tersimpan dalam database PostgreSQL.

### 4. Validasi Data
- Validasi dilakukan pada setiap request payload.
- Pastikan setiap field wajib sesuai dengan tipe data yang telah ditentukan.

### 5. Penanganan Error
- Menampilkan pesan error yang sesuai untuk kasus berikut:
  - Validasi data gagal.
  - Resource tidak ditemukan.
  - Kesalahan internal server.

### 6. Penyimpanan Data dengan PostgreSQL
- Data album dan lagu disimpan dalam PostgreSQL.
- Menggunakan `node-pg-migrate` untuk pengelolaan skema database.
- Kredensial database dikelola melalui environment variable.

### 7. Registrasi dan Autentikasi Pengguna
- Registrasi user dengan username yang unik.
- Menggunakan JWT untuk autentikasi.
- Refresh token disimpan dalam database.

### 8. Pengelolaan Playlist
- Playlist hanya bisa diakses oleh pemilik atau kolaborator.
- Lagu dapat ditambahkan dan dihapus dari playlist.

### 9. Relasi Foreign Key dalam Database
- Relasi antara tabel songs dan albums.
- Relasi antara tabel playlists dan users.

### 10. Ekspor Lagu dari Playlist
- Menggunakan RabbitMQ sebagai message broker.
- Data ekspor dikirim dalam format JSON melalui email dengan `nodemailer`.

### 11. Mengunggah Sampul Album
- Sampul album dapat diunggah dalam format gambar.
- Ukuran file maksimal 1MB.
- Penyimpanan bisa dilakukan secara lokal atau menggunakan AWS S3.

## Kriteria Opsional
- Menampilkan daftar lagu dalam detail album.
- Menyediakan fitur pencarian lagu berdasarkan judul atau performer.
- Menambahkan fitur kolaborasi dalam playlist.
- Mencatat aktivitas pengguna dalam mengelola playlist.

## Teknologi yang Digunakan
- **Node.js** sebagai runtime JavaScript.
- **Hapi.js** sebagai framework backend.
- **PostgreSQL** sebagai database.
- **JWT** untuk autentikasi.
- **RabbitMQ** sebagai message broker.
- **Nodemailer** untuk pengiriman email.
- **AWS S3** untuk penyimpanan sampul album.

## Instalasi dan Menjalankan Proyek
1. Clone repository:
   ```sh
   git clone <repository-url>
   cd openmusic-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Konfigurasikan environment variables sesuai kebutuhan.
4. Jalankan migrasi database:
   ```sh
   npm run migrate up
   ```
5. Jalankan server:
   ```sh
   npm run start
   ```

