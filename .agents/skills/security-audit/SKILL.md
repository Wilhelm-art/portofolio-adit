---
name: security-audit
description: "Melakukan audit keamanan menyeluruh pada codebase. Gunakan saat user menyebut 'cek keamanan', 'security audit', 'review security', 'cari vulnerability', atau saat menambahkan fitur autentikasi, payment, atau handling data sensitif."
---
# security-audit

> Melakukan audit keamanan sebagai security engineer. Identifikasi kerentanan nyata, bukan daftar checklist generik.

## Kapan Dipakai
- User minta review keamanan codebase.
- User menambahkan fitur auth, payment, upload, atau data sensitif.
- User bilang "cek security", "ada vulnerability?", "aman gak ini?"

## Kapan TIDAK Dipakai
- User cuma minta code review kualitas umum (bukan fokus security).
- User minta penetration testing (ini butuh tool external).

## Instruksi

1. **Identifikasi scope audit.** Tanyakan:
   - File/folder/fitur mana yang mau diaudit? Atau seluruh codebase?
   - Stack teknologi: frontend, backend, database?
   - Apakah ada auth, payment, atau handling data user?
   - Deployment: static, server, serverless, container?

   **Tunggu jawaban** kecuali scope sudah jelas dari konteks.

2. **Scan codebase untuk kerentanan di 8 kategori:**

   ### Injection
   - SQL injection: raw query tanpa parameterized statement.
   - XSS: user input dirender tanpa sanitasi.
   - Command injection: exec/spawn dengan input user.

   ### Authentication & Session
   - Password storage: harus bcrypt/argon2, bukan plain/md5/sha.
   - Token handling: JWT secret hardcoded? Expiry terlalu lama?
   - Session fixation: session ID diganti setelah login?

   ### Authorization
   - IDOR: akses resource tanpa cek ownership.
   - Missing role checks: endpoint tanpa middleware auth.
   - Privilege escalation: user biasa bisa akses endpoint admin?

   ### Data Exposure
   - API key/secret di source code (bukan env var).
   - Error message yang leak stack trace atau internal state.
   - Sensitive data di log (password, token, PII).
   - `.env` file di git (cek .gitignore).

   ### Input Validation
   - File upload tanpa validasi tipe dan ukuran.
   - Missing rate limiting pada endpoint sensitif.
   - Deserialization input yang tidak trusted.

   ### Dependency
   - Package dengan known vulnerability (cek npm audit / pip audit).
   - Dependency lock file ada dan up to date?

   ### Transport
   - HTTPS enforcement.
   - CORS misconfiguration (wildcard origin di production).
   - Cookie tanpa Secure/HttpOnly/SameSite flag.

   ### Infrastructure
   - Docker running as root.
   - Exposed debug ports.
   - Default credentials yang belum diganti.

3. **Untuk setiap temuan, dokumentasikan:**
   - **File dan line number** (link clickable).
   - **Severity**: Critical / High / Medium / Low / Info.
   - **Deskripsi**: apa yang salah, kenapa berbahaya.
   - **Bukti**: snippet kode yang bermasalah.
   - **Remediasi**: kode fix yang konkret, bukan saran umum.

4. **Simpan laporan** sebagai artifact `security-audit.md`.

## Format Laporan

```markdown
# Security Audit Report

## Summary
- Critical: N
- High: N
- Medium: N
- Low: N

## Findings

### [SEV-001] [Critical] SQL Injection di login endpoint
**File**: [auth.js](file:///path/to/auth.js#L42)
**Deskripsi**: ...
**Bukti**: (code snippet)
**Remediasi**: (code fix)
```

## Aturan Wajib
- Jangan buat daftar checklist generik. Hanya laporkan temuan nyata dari kode yang ada.
- Setiap temuan harus punya file + line reference.
- Setiap temuan harus punya fix yang bisa langsung diaplikasikan.
- Jangan menandai sesuatu sebagai Critical kalau dampaknya rendah.
