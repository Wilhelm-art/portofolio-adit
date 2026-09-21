---
name: task-to-skill
description: "Mengubah workflow atau interaksi yang baru selesai menjadi skill Antigravity yang reusable. Gunakan saat user menyebut 'jadikan skill', 'buat skill dari ini', 'simpan workflow ini', 'package ini jadi reusable', atau saat workflow berulang layak diotomasi."
---
# task-to-skill

> Ubah workflow yang baru selesai jadi skill Antigravity yang bisa dipakai ulang. Bukan template kosong — harus berdasarkan workflow nyata.

## Kapan Dipakai
- User bilang "jadikan skill", "buat skill dari ini", "simpan workflow ini".
- User baru menyelesaikan workflow multi-step yang kemungkinan akan diulang.
- User minta mengotomasi proses yang baru dilakukan.

## Kapan TIDAK Dipakai
- User mau buat skill dari nol tanpa workflow yang sudah jalan (gunakan pendekatan manual).
- Workflow terlalu sederhana (satu langkah) — tidak perlu jadi skill.

## Instruksi

### Fase 1: Identifikasi Workflow

1. **Review apa yang baru dilakukan.** Lihat conversation history untuk:
   - Langkah-langkah yang dilakukan secara berurutan.
   - Keputusan yang dibuat (tool mana, format apa, output apa).
   - Input yang diterima dari user.
   - Output yang dihasilkan.

2. **Tanyakan klarifikasi jika perlu:**
   - Nama skill yang diinginkan?
   - Bagian mana dari workflow yang harus parameterized (input berubah setiap kali)?
   - Ada langkah yang ingin ditambah/dihapus?

### Fase 2: Struktur Skill

3. **Buat SKILL.md dengan format standar:**

   ```markdown
   ---
   name: <skill-name>
   description: "<kapan dipakai, trigger phrase, dan kapan TIDAK dipakai>"
   ---
   # <skill-name>

   > Satu kalimat yang menjelaskan apa yang skill ini lakukan.

   ## Kapan Dipakai
   - Trigger phrases dan kondisi.

   ## Kapan TIDAK Dipakai
   - Kondisi di mana skill ini salah dipilih.

   ## Instruksi
   Langkah-langkah terstruktur berdasarkan workflow yang baru dilakukan.

   ## Aturan Wajib
   Constraint yang harus dipatuhi.

   ## Format Output
   Apa yang dihasilkan skill ini.
   ```

4. **Konversi langkah workflow jadi instruksi skill:**
   - Generalisasi: ganti nilai spesifik jadi parameter (nama file, URL, dsb).
   - Jaga urutan yang sama — jangan reorganisasi kalau urutan penting.
   - Tambahkan error handling yang ditemukan selama workflow.
   - Sertakan decision points: "jika X, lakukan A; jika Y, lakukan B."

5. **Tulis description frontmatter yang bagus:**
   - Harus menjelaskan KAPAN skill ini relevan.
   - Sertakan trigger phrases yang natural.
   - Sertakan kapan TIDAK dipakai (mencegah false positive).

### Fase 3: Simpan dan Verifikasi

6. **Simpan skill** di lokasi yang tepat:
   - Workspace-level: `.agents/skills/<skill-name>/SKILL.md`
   - Global: `~/.gemini/config/skills/<skill-name>/SKILL.md`

   Tanyakan user mau di mana.

7. **Verifikasi skill bisa ditemukan:**
   - Skill harus muncul di daftar "Available skills" di session berikutnya.
   - Frontmatter harus valid YAML.
   - Name dan description harus ada.

8. **Jika skill butuh file pendukung** (script, template, contoh):
   - Simpan di subfolder: `scripts/`, `examples/`, `resources/`.
   - Referensikan dari SKILL.md dengan path relatif.

## Aturan Wajib
- Skill HARUS berdasarkan workflow nyata yang sudah dijalankan. Jangan mengarang.
- Description harus cukup spesifik agar agent tahu kapan memakainya.
- Instruksi harus bisa diikuti agent tanpa konteks tambahan.
- Jangan membuat skill untuk workflow yang hanya dilakukan sekali.
- Nama skill huruf kecil, pakai dash: `my-skill-name`.
