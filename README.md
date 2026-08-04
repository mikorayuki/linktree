# Mikorayuki — Interactive Linktree & Music Player

![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-8a2be2?style=for-the-badge)

Aplikasi web **Linktree & Music Player** interaktif yang futuristik dan responsif untuk **Mikorayuki**. Aplikasi ini menggabungkan antarmuka UI bergaya *glassmorphism* modern dengan efek animasi partikel canvas, widget musik yang tersinkronisasi dengan lirik karaoke secara real-time, pencarian tautan langsung, serta opsi penggantian tema.

---

## ✨ Fitur Utama

- **🎨 Modern Glassmorphism UI:** Desain antarmuka kaca transparan dengan efek blur tinggi, border neon halus, dan kartu profil yang responsif.
- **✨ Animated Particle Canvas:** Latar belakang partikel melayang yang dirender murni menggunakan HTML5 Canvas.
- **🎵 Music Player & Lirik Karaoke:** Widget pemutar musik bawaan yang dilengkapi lirik lagu yang otomatis bergerak seirama dengan detiks audio (`timeSync`).
- **🔍 Pencarian Tautan Real-time:** Fitur pencarian instan untuk menyaring tautan media sosial dan portofolio secara cepat.
- **📋 Salin Tautan Instan:** Tombol *copy link* pada setiap kartu tautan disertai notifikasi toast melayang.
- **🎨 Opsi Tema Waktu Nyata:** Pilihan tema antarmuka (*Dark Glass*, *Sakura Pink*, dan *Cyber Neon*).
- **📱 Responsif Total:** Pengalaman pengguna yang mulus pada perangkat ponsel pintar, tablet, maupun desktop.
- **⚙️ Konfigurasi JSON Terpusat:** Pengaturan profil, daftar tautan, dan data lirik musik tersimpan dalam file `data.json`.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5:** Struktur utama antarmuka dan canvas 2D.
- **CSS3:** Variabel CSS, animasi keyframe, glassmorphism, dan tata letak flexbox/grid.
- **Vanilla JavaScript (ES6+):** Logika sinkronisasi audio, filter pencarian, pengubah tema, dan efek partikel.
- **FontAwesome 6.5:** Ikon antarmuka dan media sosial.
- **Google Fonts (Outfit & JetBrains Mono):** Tipografi modern dan bersih.

---

## 📁 Struktur Direktori

```text
linktree/
├── index.html     # Kerangka utama halaman HTML
├── styles.css     # Desain sistem Glassmorphism & Animasi
├── script.js      # Engine interaktivitas, partikel, & pemutar audio
├── data.json      # Konfigurasi data profil, tautan, & lirik lagu
├── LICENSE        # Lisensi lisensi terbuka
└── README.md      # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

1. Clone repositori ini:
   ```bash
   git clone https://github.com/mikorayuki/linktree.git
   ```
2. Buka file `index.html` menggunakan browser pilihan Anda, atau jalankan melalui web server lokal (seperti Live Server).
3. Untuk mengubah tautan atau musik, perbarui data pada file `data.json`.
