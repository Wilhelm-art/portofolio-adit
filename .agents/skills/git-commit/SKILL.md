---
name: git-commit
description: "Menulis commit message dan mengelola git workflow yang bersih. Gunakan saat user menyebut 'commit', 'tulis commit message', 'commit ini', atau saat perlu memecah perubahan besar jadi commit atomik."
---
# git-commit

> Menulis commit message yang jelas dan membuat git history yang berguna untuk tim. Ikuti Conventional Commits.

## Kapan Dipakai
- User sudah selesai mengubah kode dan mau commit.
- User bilang "commit", "tulis commit message", "commit ini".
- Perlu memecah perubahan besar jadi commit terpisah.

## Kapan TIDAK Dipakai
- User belum selesai coding (commit setelah kode stabil).
- User minta git help umum (branching, merge conflict).

## Instruksi

### Menulis Commit Message

1. **Analisis perubahan yang dibuat.** Jalankan:
   ```bash
   git diff --staged --stat
   git diff --staged
   ```
   Jika belum ada yang staged, jalankan `git diff` dan tanyakan user file mana yang mau di-commit.

2. **Tulis commit message mengikuti format Conventional Commits:**

   ```
   <type>(<scope>): <subject>

   <body>

   <footer>
   ```

   **Type** (wajib):
   - `feat` — fitur baru
   - `fix` — bug fix
   - `refactor` — refactor tanpa ubah behavior
   - `style` — formatting, semicolons, whitespace (bukan CSS)
   - `docs` — perubahan dokumentasi
   - `test` — menambah atau memperbaiki test
   - `chore` — build, tooling, dependency, config
   - `perf` — perbaikan performa

   **Scope** (opsional): area kode yang terpengaruh. Contoh: `auth`, `api`, `ui`, `db`.

   **Subject** (wajib):
   - Huruf kecil, tanpa titik di akhir.
   - Imperatif: "add" bukan "added" atau "adds".
   - Maks 50 karakter.
   - Jelaskan APA yang berubah, bukan BAGAIMANA.

   **Body** (opsional, untuk perubahan kompleks):
   - Jelaskan KENAPA perubahan dibuat.
   - Pisahkan dari subject dengan baris kosong.
   - Wrap di 72 karakter.

   **Footer** (opsional):
   - `BREAKING CHANGE:` jika ada breaking change.
   - `Closes #123` untuk menutup issue.

3. **Contoh commit messages:**

   Sederhana:
   ```
   fix(auth): handle expired token redirect
   ```

   Dengan body:
   ```
   feat(cart): add quantity validation on checkout

   Prevents users from ordering more items than available stock.
   Previously, the order would fail silently at payment step.

   Closes #247
   ```

   Breaking change:
   ```
   refactor(api)!: change response format to JSON:API spec

   BREAKING CHANGE: All API responses now follow JSON:API format.
   Clients must update their response parsers.
   ```

### Memecah Commit

4. **Jika perubahan besar mencakup lebih dari satu concern:**
   - Pisahkan jadi commit atomik. Satu commit = satu perubahan logis.
   - Gunakan `git add -p` untuk stage secara selektif.
   - Urutan commit harus masuk akal: dependency dulu, lalu consumer.

5. **Jangan campurkan dalam satu commit:**
   - Fix bug + tambah fitur baru.
   - Refactor + perubahan behavior.
   - Formatting + perubahan logika.

### Eksekusi

6. **Tunjukkan commit message ke user** sebelum menjalankan `git commit`.

7. **Jalankan commit** setelah user setuju:
   ```bash
   git add <files>
   git commit -m "<message>"
   ```

## Aturan Wajib
- JANGAN tulis commit message generik: "update code", "fix stuff", "changes", "WIP".
- JANGAN commit file yang seharusnya di .gitignore (node_modules, .env, build artifacts).
- Subject maks 50 karakter. Body wrap di 72 karakter.
- Satu commit = satu perubahan logis.
- Selalu tunjukkan message ke user sebelum commit.
