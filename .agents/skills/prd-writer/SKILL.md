---
name: prd-writer
description: "Menulis PRD (Product Requirements Document) lengkap dan terstruktur. Gunakan saat user menyebut 'buatkan PRD', 'tulis spesifikasi produk', 'saya punya ide produk', atau 'buat requirements document'. Jangan gunakan untuk brief desain UI (gunakan design-brief) atau dokumentasi teknis biasa."
---
# prd-writer

> Menulis PRD lengkap sebagai senior product manager. Selalu mulai dengan pertanyaan klarifikasi, baru tulis dokumen setelah dijawab.

## Kapan Dipakai
- User punya ide produk dan butuh dokumen spesifikasi sebelum mulai development.
- User bilang "buatkan PRD", "tulis spec", "saya mau bikin aplikasi X", atau varian serupa.

## Kapan TIDAK Dipakai
- User sudah punya PRD dan mau langsung ngoding.
- User butuh brief desain visual (gunakan `design-brief`).
- User butuh dokumentasi API atau README biasa.

## Instruksi

1. **Terima ide produk dari user.** Jangan langsung menulis. Baca ide yang diberikan, pahami konteksnya.

2. **Tanyakan maksimal 5 pertanyaan klarifikasi.** Pertanyaan harus mencakup:
   - Siapa target user utama dan sekunder?
   - Apa scope must-have vs nice-to-have?
   - Adakah batasan teknis (stack, hosting, budget, timeline)?
   - Seperti apa "selesai" itu bagi user?
   - Adakah produk kompetitor atau referensi yang sudah dilihat?

   **Berhenti dan tunggu jawaban user.** Jangan lanjut sebelum dijawab.

3. **Setelah jawaban diterima, tulis PRD dengan 10 bagian berikut:**

   ### Bagian 1: Problem Statement
   Siapa yang dirugikan dan kenapa. Spesifik — sebutkan persona, bukan "users."

   ### Bagian 2: Target User + 2 Persona
   Dua persona konkret dengan nama, pekerjaan, motivasi, dan frustrasi. Bukan fiktif tanpa dasar — harus berkaitan dengan jawaban user.

   ### Bagian 3: Goals dan Non-Goals
   Goals: apa yang harus dicapai produk ini.
   Non-goals: apa yang secara eksplisit TIDAK akan dilakukan (sama pentingnya).

   ### Bagian 4: User Stories
   Format: "Sebagai [persona], saya ingin [aksi] supaya [manfaat]."
   Tulis per fitur. Jangan generik.

   ### Bagian 5: Daftar Fitur (MVP / v2 / Nanti)
   Tiga kolom. MVP = wajib ada di launch pertama. v2 = iterasi kedua. Nanti = backlog.

   ### Bagian 6: Functional Requirements Detail (MVP saja)
   Per fitur MVP: input, output, validasi, edge case, error handling.

   ### Bagian 7: Sketsa Data Model
   Entitas utama + field kunci + relasi. Format tabel atau diagram teks.

   ### Bagian 8: Edge Cases dan Failure States
   Minimal 5 skenario: data kosong, input tidak valid, koneksi putus, state race condition, dsb.

   ### Bagian 9: Success Metrics
   KPI yang bisa diukur. Jangan tulis "user satisfaction" tanpa cara mengukurnya.

   ### Bagian 10: Open Questions
   Requirement yang masih ambigu — tandai di sini, jangan mengarang jawaban sendiri.

4. **Simpan PRD sebagai artifact** di `PRD.md` pada root proyek.

## Aturan Wajib
- Jangan menulis PRD sebelum pertanyaan klarifikasi dijawab.
- Jangan mengarang fakta, angka, atau asumsi. Kalau tidak tahu, masukkan ke Open Questions.
- Spesifik dan tegas. Tanpa basa-basi.
- Semua requirement ambigu masuk Open Questions, bukan jadi asumsi diam-diam.

## Format Output
File markdown `PRD.md` dengan 10 bagian di atas, heading yang jelas, dan tabel di tempat yang tepat.
