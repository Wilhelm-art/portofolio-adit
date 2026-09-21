---
name: design-brief
description: "Menulis brief desain UI/UX terstruktur untuk memandu implementasi frontend. Gunakan saat user menyebut 'desain UI', 'brief desain', 'bikin mockup', 'rancang tampilan', atau butuh panduan visual sebelum coding. Jangan gunakan untuk PRD (gunakan prd-writer) atau code review."
---
# design-brief

> Menulis brief desain UI/UX lengkap sebagai senior product designer. Fokus: struktur visual, hierarki, interaksi — bukan estetika generik.

## Kapan Dipakai
- User butuh panduan desain sebelum atau selama coding frontend.
- User bilang "desain halaman X", "buat UI untuk fitur Y", "brief desain", atau varian serupa.

## Kapan TIDAK Dipakai
- User butuh dokumen requirement produk (gunakan `prd-writer`).
- User minta review kode backend tanpa aspek visual.

## Instruksi

1. **Terima deskripsi fitur/halaman dari user.** Pahami konteks: ini halaman baru, redesain, atau iterasi?

2. **Tanyakan pertanyaan klarifikasi (maks 5):**
   - Siapa yang akan memakai halaman/fitur ini?
   - Perangkat utama: mobile-first, desktop-first, atau keduanya?
   - Adakah referensi visual (website, screenshot, Dribbble link)?
   - Constraint teknis: framework CSS yang sudah dipakai? Dark mode?
   - Apa aksi utama yang harus dilakukan user di halaman ini?

   **Tunggu jawaban.** Jangan lanjut sebelum dijawab.

3. **Setelah jawaban diterima, tulis brief desain dengan bagian berikut:**

   ### Information Architecture
   Struktur konten: apa saja yang ada di halaman, urutannya, dan hierarkinya. Gunakan outline bernomor.

   ### Layout Grid
   Berapa kolom, gutter, margin. Responsive breakpoint: mobile (< 640px), tablet (640–1024px), desktop (> 1024px).

   ### Component List
   Daftar komponen yang dibutuhkan: nama, fungsi, state (default, hover, active, disabled, error, loading).

   ### Visual Hierarchy
   Elemen mana yang paling penting, kedua, ketiga. Cara mencapainya: ukuran, warna, spacing, tipografi.

   ### Interaction & Micro-Interaction
   Transisi, animasi, feedback untuk aksi user. Spesifik: "tombol submit scale 0.97 saat ditekan, 150ms ease-out."

   ### Accessibility Checklist
   - Contrast ratio minimum 4.5:1 untuk teks biasa, 3:1 untuk teks besar.
   - Semua elemen interaktif punya focus state yang terlihat.
   - Urutan tab navigasi logis.
   - Alt text untuk gambar non-dekoratif.

   ### Color & Typography Intent
   Jangan menulis "gunakan warna yang menarik." Tulis: "Primary: hsl(220, 60%, 50%). Body: Inter 16px/1.5. Heading: Inter 600."

   ### Edge States
   Empty state, loading skeleton, error state, no-result state. Masing-masing butuh desain, bukan cuma pesan teks.

4. **Simpan brief** sebagai artifact `design-brief.md`.

## Aturan Wajib
- Jangan tulis estetika generik ("clean and modern design"). Spesifik atau hilangkan.
- Semua warna harus punya nilai HSL/HEX konkret.
- Semua ukuran harus punya nilai px/rem konkret.
- Jangan asumsikan framework — tanyakan dulu.

## Format Output
File markdown `design-brief.md` dengan heading per bagian dan spesifikasi konkret.
