---
name: debug-error
description: "Debug error secara sistematis dengan isolasi, reproduksi, dan fix yang terverifikasi. Gunakan saat user memberikan error message, stack trace, screenshot error, atau bilang 'ini error', 'kenapa gagal', 'fix bug ini', 'crash di sini'."
---
# debug-error

> Debug sebagai senior engineer. Isolasi → reproduksi → identifikasi root cause → fix → verifikasi. Jangan tebak.

## Kapan Dipakai
- User memberikan error message atau stack trace.
- User bilang "error", "bug", "crash", "gagal", "tidak jalan", atau varian serupa.
- Build/test gagal dan user butuh bantuan.

## Kapan TIDAK Dipakai
- User minta fitur baru (bukan fixing bug).
- User minta code review umum tanpa error spesifik.

## Instruksi

### Fase 1: Kumpulkan Fakta (JANGAN SKIP)

1. **Baca error message/stack trace dengan teliti.** Identifikasi:
   - Error type dan message exact.
   - File dan line number dari stack trace.
   - Apakah error terjadi saat build, runtime, atau test?

2. **Jika informasi kurang, tanyakan:**
   - Kapan error mulai muncul? (setelah commit/perubahan apa?)
   - Apakah bisa direproduksi secara konsisten?
   - Environment: OS, Node/Python version, browser?
   - Ada perubahan terbaru di config, dependencies, atau environment?

### Fase 2: Isolasi

3. **Cari file dan line yang disebut di error.** Baca kode di sekitarnya.

4. **Trace alur eksekusi.** Dari mana fungsi dipanggil? Data apa yang masuk?

5. **Formulasikan hipotesis.** Tulis secara eksplisit:
   - "Error terjadi karena X memanggil Y dengan parameter Z yang bernilai null."
   - Jangan tulis "mungkin karena..." tanpa bukti.

### Fase 3: Verifikasi Hipotesis

6. **Cari bukti pendukung hipotesis:**
   - Baca kode caller/callee.
   - Cek apakah ada perubahan terbaru di file terkait (git log).
   - Cek dependency version mismatch.
   - Jalankan test yang relevan jika ada.

7. **Jika hipotesis pertama salah, ulangi Fase 2** dengan hipotesis baru. Jangan tempel fix trial-and-error tanpa pemahaman.

### Fase 4: Fix

8. **Tulis fix yang mengatasi root cause**, bukan symptom.
   - Buruk: menambahkan try-catch di sekitar error tanpa fix logika.
   - Baik: memperbaiki kondisi yang menyebabkan null reference.

9. **Pastikan fix tidak merusak hal lain:**
   - Jalankan test suite yang ada.
   - Jika tidak ada test, tulis test yang mereproduksi bug, lalu fix.

### Fase 5: Laporan

10. **Dokumentasikan di respons:**
    - **Root cause**: satu kalimat yang menjelaskan kenapa error terjadi.
    - **Fix**: kode perubahan yang dibuat.
    - **Verifikasi**: bukti bahwa fix bekerja (test result, output).
    - **Pencegahan**: apakah perlu ditambahkan guard/validation/test agar tidak terulang?

## Aturan Wajib
- JANGAN langsung mengedit kode tanpa memahami root cause.
- JANGAN menambahkan try-catch sebagai "fix" kecuali memang error handling yang tepat.
- JANGAN menebak. Kalau tidak cukup informasi, tanyakan.
- Setiap fix harus bisa di-trace ke root cause yang diidentifikasi.
- Jalankan test setelah fix. Jika test tidak ada, tulis minimal satu regression test.
