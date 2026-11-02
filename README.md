Penjelasan

Wowo Rental adalah platform layanan penyewaan kendaraan (mobil dan motor) berbasis web modern yang dirancang untuk memberikan kemudahan, kecepatan, dan keamanan bagi masyarakat dalam memenuhi kebutuhan mobilitas mereka. Platform ini tidak hanya berfokus pada kemudahan pemesanan bagi pelanggan (end-user), tetapi juga menyediakan sistem manajemen operasional yang lengkap dan terintegrasi bagi pengelola usaha rental.

Tujuan Project Wowo Rental :
1. Mempermudah Akses Transportasi: Menyediakan platform digital yang cepat, transparan, dan andal bagi masyarakat atau wisatawan untuk memesan kendaraan (mobil dan motor) sesuai kebutuhan.
2. Digitalisasi Operasional Rental: Membantu pemilik usaha rental kendaraan untuk beralih dari sistem manual ke sistem manajemen digital yang terpusat guna menghindari kesalahan pencatatan (double booking).
3. Otomatisasi Layanan & Keamanan: Meningkatkan efisiensi bisnis melalui fitur kalkulasi biaya otomatis, verifikasi dokumen identitas penyewa yang ketat, serta pemantauan armada secara real-time.

Fitur yang Di implementasikan :

🧑‍💻 Sisi Pelanggan
- Autentikasi — Login Google, Facebook, atau Nomor Telepon (simulasi OTP 6 digit)
- Search Widget — Input lokasi pick-up & drop-off, Date/Time Picker (Flatpickr), filter tipe & jenis sewa
- Katalog Armada — 12 unit (semua gambar <img> asli dari folder /image/) dengan status real-time Tersedia/Tersewa
- Filter Interaktif — Filter tipe, transmisi, kapasitas, rentang harga (slider), status
- Detail Kendaraan — Gallery foto (3 thumbnail), spesifikasi teknis, kalkulator harga otomatis (durasi + add-ons + deposit)
- Booking 3-Langkah — Detail pesanan → Upload KTP/SIM (FileReader preview) → Pembayaran (Transfer Bank, QRIS, e-Wallet, Kartu Kredit)
- Floating Buttons — WhatsApp CS + tombol scroll-to-top
- Toast Notification — Konfirmasi visual setiap aksi
  
⚙️ Admin Panel
- Dashboard — 4 stat cards + tabel pesanan terbaru + log notifikasi otomatis
- Manajemen Armada — Tabel CRUD dengan foto <img>, form tambah unit, hapus dengan konfirmasi
- Pesanan — Tabel lengkap dengan status + tombol kirim notifikasi
- Kalender Booking — Grid kalender bulan ini dengan penanda booking aktif
- Verifikasi Dokumen — Approve/Reject KTP & SIM per pesanan
- Sopir — Cards driver dengan status, rating, form penugasan ke pesanan
- Perawatan — Jadwal servis berkala, tandai selesai
- Laporan — Bar chart pendapatan 7 hari (SVG murni), unit terpopuler, riwayat transaksi
- GPS Tracking — Mock peta dengan marker + daftar unit aktif + koordinat real-time
  
🎨 Desain
- Skema Navy Blue + Orange Accent — profesional & terpercaya
- Rounded corners, soft shadows, hover transitions, smooth scroll
- Fully responsive (mobile-first, Tailwind breakpoints)
- Lucide Icons + Flatpickr (date/time picker custom)

🔒 Keamanan & Otomatisasi
- Sistem Notifikasi Otomatis: Konfirmasi pesanan dan bukti pembayaran via Email/WhatsApp Gateway, serta pengingat otomatis saat masa sewa kendaraan hampir habis.
- Integrasi GPS Tracking (Opsional): Dashboard pemantauan koordinat posisi kendaraan dari alat GPS untuk keamanan unit dari risiko pencurian.
