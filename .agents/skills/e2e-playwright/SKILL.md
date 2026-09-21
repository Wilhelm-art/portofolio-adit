---
name: e2e-playwright
description: "Menulis test end-to-end dengan Playwright yang menguji user flow nyata, bukan unit individu. Gunakan saat user menyebut 'tulis e2e test', 'test Playwright', 'automated testing', 'test flow user', atau saat butuh verifikasi fitur dari perspektif user."
---
# e2e-playwright

> Menulis E2E test dengan Playwright yang menguji flow user nyata. Test harus stabil, readable, dan maintainable.

## Kapan Dipakai
- User butuh test end-to-end untuk fitur atau halaman.
- User bilang "tulis e2e test", "test Playwright", "test otomatis", atau varian serupa.
- Setelah implementasi fitur baru, untuk memastikan flow user bekerja.

## Kapan TIDAK Dipakai
- User butuh unit test murni (fungsi tanpa DOM/browser).
- User minta performance test atau load test.

## Instruksi

### Setup (jika belum ada)

1. **Cek apakah Playwright sudah terinstall:**
   ```bash
   npx playwright --version
   ```
   Jika belum, install:
   ```bash
   npm init playwright@latest
   ```

2. **Pastikan config mendukung project yang dibutuhkan:**
   - Chromium minimal. Firefox dan WebKit opsional.
   - Base URL sesuai dev server.

### Menulis Test

3. **Identifikasi user flow yang akan ditest.** Tanyakan user jika tidak jelas:
   - Flow mana: login, checkout, form submit, navigation?
   - Happy path saja atau termasuk error case?

4. **Struktur test mengikuti pola ini:**

   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('Feature Name', () => {
     test('should [expected behavior] when [user action]', async ({ page }) => {
       // Arrange — navigasi ke halaman
       await page.goto('/path');

       // Act — lakukan aksi user
       await page.getByRole('button', { name: 'Submit' }).click();

       // Assert — verifikasi hasil
       await expect(page.getByText('Success')).toBeVisible();
     });
   });
   ```

5. **Aturan selector (prioritas tinggi ke rendah):**
   - `getByRole` — paling stabil, aksesibel.
   - `getByLabel` — untuk form input.
   - `getByText` — untuk verifikasi konten.
   - `getByTestId` — fallback terakhir jika tidak ada semantik.
   - **JANGAN** pakai CSS selector fragile: `.btn-primary`, `#submit-btn`, `div > span:nth-child(2)`.

6. **Aturan assertion:**
   - Pakai `expect` dengan matcher yang spesifik.
   - `toBeVisible()` lebih baik dari `toHaveCount(1)`.
   - `toHaveText()` lebih baik dari `toContainText()` kalau teks diketahui pasti.
   - Selalu tunggu elemen: Playwright auto-waiting, tapi pastikan assertion pada elemen yang tepat.

7. **Aturan test:**
   - Satu test = satu user scenario. Jangan chain scenario.
   - Test harus bisa jalan sendiri (tidak bergantung urutan).
   - Gunakan `test.beforeEach` untuk setup berulang (navigasi, login).
   - Beri nama test deskriptif: `should show error when email is invalid`, bukan `test 1`.

8. **Handling state dan data:**
   - Jika test butuh data (user login, item di cart), setup via API call atau fixture, bukan melalui UI.
   - Gunakan `test.use({ storageState })` untuk test yang butuh session login.

### Menjalankan Test

9. **Jalankan test dan verifikasi:**
   ```bash
   npx playwright test --project=chromium
   ```

10. **Jika ada test gagal:**
    - Baca error message dan screenshot/trace.
    - Perbaiki test atau kode, bukan keduanya sekaligus.
    - Jalankan ulang untuk konfirmasi.

### Output

11. **Simpan file test** di folder yang sesuai:
    - `tests/` atau `e2e/` sesuai konvensi proyek.
    - Nama file: `[feature-name].spec.ts`.

## Aturan Wajib
- JANGAN tulis test yang bergantung pada timing (sleep/setTimeout). Pakai auto-waiting Playwright.
- JANGAN pakai CSS selector yang fragile.
- Setiap test harus independen.
- Test harus bisa dijalankan di CI tanpa modifikasi.
- Nama test menjelaskan behavior, bukan implementasi.
