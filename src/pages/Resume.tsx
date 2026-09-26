import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  Code2, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Github 
} from 'lucide-react';

export function Resume() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'pdf' | 'ats'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'ats';
    }
    return 'pdf';
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isEnglish = i18n.language.startsWith('en');

  const resumeIdUrl = "https://drive.google.com/file/d/1oJSIMlTs2hHnD1hY6rY0glTLSdGr5S_t/view?usp=sharing";
  const resumeEnUrl = "https://drive.google.com/file/d/1zmIBvzadSzNE1YKiVMwlMWOlcdPXiuPq/view?usp=sharing";
  const localPdfUrl = "/resume/Adit_Hardiansyah_Resume.pdf";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{t('resume.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('resume.subtitle')} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="animate-slideUp">
          
          {/* Header */}
          <header className="border-b border-white/[0.08] pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-medium bg-[var(--color-accent-muted)] px-2.5 py-1 rounded border border-[var(--color-accent-border)] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isEnglish ? "Official Verified Document • ATS Compliant" : "Dokumen Resmi Terverifikasi • Standar ATS"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold font-display text-[var(--color-paper-50)] mb-3">
                {t('resume.title')}
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-stone-muted)] max-w-xl leading-relaxed">
                {t('resume.subtitle')}
              </p>
            </div>
            
            {/* Download & External Links */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Direct Instant PDF Download (Local Same-Origin Asset) */}
              <a 
                href={localPdfUrl}
                download="Adit_Hardiansyah_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-full transition-all active:scale-[0.98] shadow-lg shadow-[var(--color-accent)]/20"
                title="Download ATS PDF directly"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{isEnglish ? "Download PDF (Direct)" : "Unduh CV Langsung (PDF)"}</span>
              </a>

              {/* View PDF in New Tab */}
              <a 
                href={localPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Open PDF in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>{isEnglish ? "Open Tab" : "Buka Tab"}</span>
              </a>

              {/* Google Drive Mirrors */}
              <a 
                href={resumeIdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider font-medium border border-white/10 hover:border-white/25 text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Google Drive Mirror (Bahasa Indonesia)"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Drive (ID)</span>
              </a>

              <a 
                href={resumeEnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider font-medium border border-white/10 hover:border-white/25 text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Google Drive Mirror (English)"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Drive (EN)</span>
              </a>
            </div>
          </header>

          {/* View Mode Tabs */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="inline-flex p-1 rounded-lg bg-[var(--color-canvas-900)] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-[var(--color-accent)] text-white font-semibold shadow-sm'
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isEnglish ? "PDF Preview" : "Pratinjau PDF Asli"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ats')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === 'ats'
                    ? 'bg-[var(--color-accent)] text-white font-semibold shadow-sm'
                    : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEnglish ? "Interactive ATS View" : "Format ATS Interaktif"}</span>
              </button>
            </div>

            <span className="hidden sm:inline-block font-mono text-[11px] text-[var(--color-stone-muted)]">
              PDF v1.4 • ReportLab Verified • 3.8 KB
            </span>
          </div>

          {/* TAB 1: Native Local PDF Viewer */}
          {activeTab === 'pdf' && (
            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] rounded-xl overflow-hidden shadow-2xl">
              {/* Document Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[var(--color-canvas-950)] text-xs font-mono text-[var(--color-stone-muted)]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">Adit_Hardiansyah_Resume.pdf</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a 
                    href={localPdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-paper-50)] transition-colors inline-flex items-center gap-1 active:scale-[0.98]"
                  >
                    <span>{isEnglish ? "Full Window" : "Buka Jendela Penuh"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-white/20">|</span>
                  <a 
                    href={localPdfUrl}
                    download="Adit_Hardiansyah_Resume.pdf"
                    className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isEnglish ? "Download" : "Unduh"}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* PDF Frame */}
              <div className="relative w-full h-[650px] sm:h-[820px] bg-[var(--color-canvas-950)] flex flex-col items-center justify-center">
                <object
                  data={`${localPdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-full border-0"
                  aria-label="Curriculum Vitae Adit Hardiansyah Surachman"
                >
                  <iframe 
                    src={`${localPdfUrl}#view=FitH`} 
                    className="w-full h-full border-0"
                    title="Pratinjau Resume PDF Adit Hardiansyah Surachman"
                  >
                    {/* Fallback for browsers that don't support inline PDF rendering (e.g. some mobile browsers) */}
                    <div className="p-8 text-center max-w-md mx-auto">
                      <FileText className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-3" />
                      <h3 className="text-base font-semibold text-[var(--color-paper-50)] mb-1">
                        {isEnglish ? "PDF Preview Not Supported" : "Pratinjau PDF Tidak Didukung"}
                      </h3>
                      <p className="text-xs text-[var(--color-stone-muted)] mb-4">
                        {isEnglish 
                          ? "Your browser or device does not render embedded PDFs. You can download the file directly or switch to the Interactive ATS View."
                          : "Peramban atau ponsel Anda tidak mendukung penayangan PDF bawaan. Silakan unduh langsung atau gunakan tab Format ATS Interaktif."}
                      </p>
                      <div className="flex justify-center gap-3">
                        <a
                          href={localPdfUrl}
                          download="Adit_Hardiansyah_Resume.pdf"
                          className="px-4 py-2 text-xs font-mono font-bold bg-[var(--color-accent)] text-white rounded-lg"
                        >
                          {isEnglish ? "Download PDF" : "Unduh PDF Sekarang"}
                        </a>
                        <button
                          type="button"
                          onClick={() => setActiveTab('ats')}
                          className="px-4 py-2 text-xs font-mono text-[var(--color-paper-50)] border border-white/20 rounded-lg hover:bg-white/5"
                        >
                          {isEnglish ? "Switch to ATS View" : "Buka Format ATS"}
                        </button>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>

              {/* Mobile notice */}
              <div className="p-3 bg-[var(--color-canvas-950)] border-t border-white/[0.06] text-center text-xs text-[var(--color-stone-muted)]">
                <span>{isEnglish ? "Viewing on mobile?" : "Membuka lewat ponsel?"} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('ats')}
                  className="text-[var(--color-accent)] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEnglish ? "Tap here for responsive ATS Web CV" : "Ketuk di sini untuk format teks interaktif"}</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive High-Contrast ATS Web CV */}
          {activeTab === 'ats' && (
            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] rounded-xl p-6 sm:p-10 shadow-2xl space-y-8">
              
              {/* ATS Header & Contact */}
              <div className="border-b border-white/[0.08] pb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)] tracking-tight">
                  ADIT HARDIANSYAH SURACHMAN
                </h2>
                <p className="text-sm font-mono text-[var(--color-accent)] font-medium mt-1">
                  Software Engineer • Network Security Specialist • Full-Stack Developer
                </p>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 text-xs font-mono text-[var(--color-stone-muted)]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Bandung, Jawa Barat, Indonesia
                  </span>
                  <span>•</span>
                  <button 
                    type="button"
                    onClick={() => handleCopy("adithardiansyah091@gmail.com", "email")}
                    className="flex items-center gap-1.5 hover:text-[var(--color-paper-50)] transition-colors"
                    title="Click to copy email"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>adithardiansyah091@gmail.com</span>
                    {copiedField === 'email' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                  <span>•</span>
                  <button 
                    type="button"
                    onClick={() => handleCopy("+6285659832513", "phone")}
                    className="flex items-center gap-1.5 hover:text-[var(--color-paper-50)] transition-colors"
                    title="Click to copy phone"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>+62 856-5983-2513</span>
                    {copiedField === 'phone' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </button>
                  <span>•</span>
                  <a 
                    href="https://github.com/Wilhelm-art" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>github.com/Wilhelm-art</span>
                  </a>
                </div>
              </div>

              {/* 1. Ringkasan Profesional */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{isEnglish ? "PROFESSIONAL SUMMARY" : "RINGKASAN PROFESIONAL"}</span>
                </h3>
                <p className="text-sm text-[var(--color-paper-50)] leading-relaxed bg-[var(--color-canvas-950)] p-4 rounded-lg border border-white/[0.04]">
                  {isEnglish
                    ? "Computer Science graduate from STMIK Mardira Indonesia with Best Graduate honors (GPA 3.62 / 4.00). Specializing in full-stack software engineering (Next.js, React Native, TypeScript, Prisma, Laravel) and holding official industry credentials from Google Cybersecurity and Indonesian National Board for Professional Certification (BNSP RI). Experienced in designing and shipping production-ready systems from MSMEs to enterprise-grade web applications."
                    : "Lulusan S1 Teknik Informatika STMIK Mardira Indonesia dengan predikat Lulusan Terbaik (IPK 3.62 / 4.00). Memiliki spesialisasi dalam rekayasa perangkat lunak full-stack (Next.js, React Native, TypeScript, Prisma, Laravel) serta sertifikasi profesional Google Cybersecurity dan BNSP RI. Berpengalaman merancang dan meluncurkan sistem siap produksi berskala UMKM hingga enterprise."}
                </p>
              </div>

              {/* 2. Pendidikan & Sertifikasi */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{isEnglish ? "EDUCATION & CREDENTIALS" : "PENDIDIKAN & SERTIFIKASI RESMI"}</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        {isEnglish ? "B.S. in Computer Science" : "S1 Teknik Informatika"} — STMIK Mardira Indonesia
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        {isEnglish ? "Graduation Year: 2025 • GPA: 3.62 / 4.00 (Summa Cum Laude / Best Graduate)" : "Periode 2021 – 2025 • IPK: 3.62 / 4.00 (Predikat Lulusan Terbaik)"}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                      IPK 3.62
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        Google Cybersecurity Professional Certificate — Google Career Certificates
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        Threat Intelligence, SIEM (Chronicle/Splunk), Linux Hardening, SQL Injection Mitigation, Network Security
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)] self-start sm:self-auto">
                      Verified Credential
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        Sertifikasi Profesi BNSP RI — Badan Nasional Sertifikasi Profesi
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        Skema Sertifikasi: Teknisi Jaringan Komputer & Infrastruktur IT Nasional
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)] self-start sm:self-auto">
                      BNSP RI
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Proyek Rekayasa & Sistem Produksi */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>{isEnglish ? "KEY PRODUCTION PROJECTS" : "PROYEK REKAYASA & SISTEM PRODUKSI"}</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        GadgetVault — Flagship Marketplace & KYC Verification System
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-stone-muted)]">
                        Next.js 16 • Prisma • PostgreSQL • Docker
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      {isEnglish 
                        ? "Engineered a high-performance e-commerce platform with automated KYC verification, role-based access control (RBAC), multi-layer CSRF/HSTS security hardening, and sub-100ms database index query optimization."
                        : "Membangun marketplace gadget premium dengan verifikasi KYC multi-role, proteksi CSRF/HSTS, dan optimasi database indexing PostgreSQL untuk query latensi rendah di bawah 100ms."}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        Meracik Ide — Mobile Business Engine for Indonesian MSMEs
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-stone-muted)]">
                        React Native • Expo SDK 57 • Zustand • SQLite
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      {isEnglish
                        ? "Developed an offline-first financial calculator mobile app with automated COGS (HPP) engine, marketplace commission tiers (Shopee/Tokopedia/Grab), and real-time break-even point (BEP) visual meter."
                        : "Mengembangkan aplikasi mobile offline-first dengan kalkulator HPP otomatis, multi-tier pricing komisi platform, dan BEP survival meter berbasis SQLite lokal."}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        Sistem Kas Masjid AT-Tijaniyah — Public Transparency Ledger
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-stone-muted)]">
                        Laravel 10 • MySQL • Tailwind CSS
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      {isEnglish
                        ? "Implemented a public ledger system providing transparent weekly balance sheets, prayer schedules, and automated audit export reports for congregation accountability."
                        : "Merancang portal transparansi kas publik dan jadwal sholat terintegrasi untuk akuntabilitas infak jamaah dan pelaporan bendahara secara real-time."}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        Surabi Cikal Cisangkan — Digital Storefront & Direct Order Engine
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-stone-muted)]">
                        React • Tailwind CSS • WhatsApp Direct API
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      {isEnglish
                        ? "Delivered a lightning-fast responsive storefront for a culinary business featuring instant cart calculation and automated WhatsApp API checkout payloads."
                        : "Digitalisasi storefront UMKM kuliner lokal dengan integrasi katalog menu interaktif dan generator pesanan otomatis ke WhatsApp."}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Keahlian Teknis */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEnglish ? "TECHNICAL SKILLS" : "KEAHLIAN TEKNIS"}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {isEnglish ? "Languages & Frameworks" : "Bahasa & Framework"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      TypeScript, JavaScript (ES6+), Python, PHP, Next.js 16, React 19, React Native (Expo), Laravel 10, Tailwind CSS v4.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {isEnglish ? "Database & Infrastructure" : "Basis Data & Infrastruktur"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      PostgreSQL, MySQL, Prisma ORM, SQLite, Docker, Linux (Ubuntu/Debian), Nginx, Git, CI/CD GitHub Actions, Vercel.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {isEnglish ? "Security & Networking" : "Keamanan & Jaringan"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Threat Modeling, Content-Security-Policy (CSP), HSTS, CSRF Defense, Vulnerability Scanning, Mikrotik/Cisco Routing, TCP/IP.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}
