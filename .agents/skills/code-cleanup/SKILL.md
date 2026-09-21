---
name: code-cleanup
description: "Refactor dan bersihkan kode yang berantakan tanpa mengubah behavior. Gunakan saat user menyebut 'bersihkan kode', 'refactor', 'rapikan ini', 'code cleanup', 'terlalu berantakan', atau saat kualitas kode menurun setelah iterasi cepat."
---
# code-cleanup

> Refactor sebagai senior engineer. Perbaiki struktur tanpa mengubah behavior. Setiap perubahan harus bisa dijustifikasi.

## Kapan Dipakai
- User bilang "bersihkan", "refactor", "rapikan", "cleanup" kode.
- Kode sudah bekerja tapi berantakan setelah iterasi cepat.
- File terlalu panjang, fungsi terlalu besar, duplikasi banyak.

## Kapan TIDAK Dipakai
- User minta fitur baru (tulis fitur dulu, cleanup nanti).
- Kode masih dalam proses development aktif yang belum stabil.

## Instruksi

### Fase 1: Audit

1. **Identifikasi scope.** File/folder mana? Tanyakan jika tidak jelas.

2. **Scan kode untuk masalah kualitas. Kategorikan:**

   #### Dead Code
   - Import yang tidak dipakai.
   - Variabel yang dideklarasikan tapi tidak digunakan.
   - Fungsi yang tidak pernah dipanggil.
   - Blok kode yang dikomentari (bukan dokumentasi).

   #### Duplikasi
   - Blok kode identik atau hampir identik di lebih dari satu tempat.
   - Pattern yang sama diulang tanpa abstraksi.

   #### Kompleksitas
   - Fungsi lebih dari 40 baris.
   - Nesting lebih dari 3 level.
   - Kondisional bertumpuk yang bisa di-simplify.
   - File lebih dari 300 baris tanpa pemisahan logis.

   #### Naming
   - Nama variabel/fungsi yang tidak deskriptif: `x`, `temp`, `data2`, `handleClick2`.
   - Inkonsistensi: campuran camelCase dan snake_case tanpa alasan.

   #### Struktur
   - Concerns yang tercampur dalam satu file (UI + logic + data fetching).
   - Circular dependencies.
   - Import path yang terlalu dalam.

3. **Daftar temuan** sebelum mulai mengubah apa pun. Tunjukkan ke user jika scope besar.

### Fase 2: Refactor

4. **Prioritas refactor (dari paling berdampak):**
   1. Hapus dead code — risiko paling rendah, benefit langsung.
   2. Rename — klarifikasi tanpa ubah struktur.
   3. Extract function — pecah fungsi besar jadi unit kecil.
   4. Extract module/file — pisahkan concern.
   5. Simplify conditionals — early return, guard clause.
   6. Deduplicate — abstract pattern berulang (hanya jika 3+ kali).

5. **Setiap perubahan harus:**
   - Tidak mengubah behavior yang ada (pure refactor).
   - Bisa di-revert secara independen jika bermasalah.
   - Diikuti jalankan test (jika ada) untuk konfirmasi.

6. **JANGAN lakukan saat cleanup:**
   - Menambah fitur baru.
   - Mengubah API publik tanpa diskusi.
   - "Memperbaiki" kode yang bukan bagian dari scope yang diminta.
   - Mengganti library/framework.
   - Menambahkan abstraksi untuk kode yang hanya dipakai sekali.

### Fase 3: Verifikasi

7. **Jalankan test yang ada.** Semua harus tetap pass.

8. **Jika tidak ada test, verifikasi manual** bahwa behavior tidak berubah.

9. **Dokumentasikan perubahan** dalam respons:
   - Apa yang berubah dan kenapa.
   - File mana saja yang terpengaruh.
   - Apakah ada behavior yang berpotensi berubah (seharusnya tidak).

## Aturan Wajib
- JANGAN ubah behavior. Ini cleanup, bukan feature development.
- JANGAN refactor kode yang bukan milik scope.
- Setiap rename harus lebih jelas dari nama sebelumnya. Kalau tidak, jangan rename.
- Jangan buat abstraksi untuk sesuatu yang hanya dipakai sekali.
- Jalankan test sebelum dan sesudah refactor.
