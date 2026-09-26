import { useState, useEffect } from 'react';
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
  Github,
  Globe
} from 'lucide-react';

export function Resume() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');

  // Select between PDF Preview and Interactive ATS View
  const [activeTab, setActiveTab] = useState<'pdf' | 'ats'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'ats';
    }
    return 'pdf';
  });

  // Select between Indonesian and English authentic CV PDF
  const [pdfLang, setPdfLang] = useState<'id' | 'en'>(isEnglish ? 'en' : 'id');

  useEffect(() => {
    setPdfLang(isEnglish ? 'en' : 'id');
  }, [isEnglish]);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Original Authentic CV Files in public/resume/
  const cvIdFile = "/resume/CV_Adit_Hardiansyah_Surachman.pdf";
  const cvEnFile = "/resume/CV_Adit_Hardiansyah_Surachman_EN.pdf";

  // Active CV file based on selected language
  const activePdfUrl = pdfLang === 'en' ? cvEnFile : cvIdFile;
  const activePdfName = pdfLang === 'en' ? "CV_Adit_Hardiansyah_Surachman_EN.pdf" : "CV_Adit_Hardiansyah_Surachman.pdf";

  // Google Drive Mirrors
  const resumeIdUrl = "https://drive.google.com/file/d/1oJSIMlTs2hHnD1hY6rY0glTLSdGr5S_t/view?usp=sharing";
  const resumeEnUrl = "https://drive.google.com/file/d/1zmIBvzadSzNE1YKiVMwlMWOlcdPXiuPq/view?usp=sharing";

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
                  {isEnglish ? "Official Verified Document • Authentic CV" : "Dokumen Resmi Terverifikasi • CV Asli"}
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
              {/* Direct Instant PDF Download (Bahasa Indonesia) */}
              <a 
                href={cvIdFile}
                download="CV_Adit_Hardiansyah_Surachman.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-full transition-all active:scale-[0.98] shadow-lg shadow-[var(--color-accent)]/20"
                title="Unduh CV Asli Bahasa Indonesia"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Unduh CV (ID)</span>
              </a>

              {/* Direct Instant PDF Download (English) */}
              <a 
                href={cvEnFile}
                download="CV_Adit_Hardiansyah_Surachman_EN.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Download Authentic English CV"
              >
                <Download className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Download CV (EN)</span>
              </a>

              {/* View PDF in New Tab */}
              <a 
                href={activePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider font-medium border border-white/10 hover:border-white/25 text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Open PDF in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isEnglish ? "Open Tab" : "Buka Tab"}</span>
              </a>

              {/* Google Drive Mirrors */}
              <a 
                href={pdfLang === 'en' ? resumeEnUrl : resumeIdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono uppercase tracking-wider font-medium border border-white/10 hover:border-white/25 text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
                title="Google Drive Mirror"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Drive</span>
              </a>
            </div>
          </header>

          {/* View Mode Tabs & PDF Language Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            {/* View Mode: PDF Preview vs ATS View */}
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
                <span>{isEnglish ? "Authentic PDF Preview" : "Pratinjau PDF Asli"}</span>
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

            {/* Language Switcher for Original CV (ID vs EN) */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--color-stone-muted)] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Dokumen:</span>
              </span>
              <div className="inline-flex p-0.5 rounded-md bg-[var(--color-canvas-900)] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setPdfLang('id')}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    pdfLang === 'id'
                      ? 'bg-[var(--color-accent)] text-white font-semibold shadow-xs'
                      : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                  }`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setPdfLang('en')}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    pdfLang === 'en'
                      ? 'bg-[var(--color-accent)] text-white font-semibold shadow-xs'
                      : 'text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* TAB 1: Native Local PDF Viewer (Using the Authentic CV Files) */}
          {activeTab === 'pdf' && (
            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] rounded-xl overflow-hidden shadow-2xl">
              {/* Document Toolbar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-white/[0.08] bg-[var(--color-canvas-950)] text-[11px] sm:text-xs font-mono text-[var(--color-stone-muted)] gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate font-medium text-[var(--color-paper-50)]">{activePdfName}</span>
                  <span className="hidden md:inline-block text-white/30">• 43.6 KB</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <a 
                    href={activePdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-paper-50)] transition-colors inline-flex items-center gap-1 active:scale-[0.98]"
                  >
                    <span>{isEnglish ? "Full Window" : "Buka Jendela Penuh"}</span>
                    <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </a>
                  <span className="text-white/20">|</span>
                  <a 
                    href={activePdfUrl}
                    download={activePdfName}
                    className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>{isEnglish ? "Download" : "Unduh"}</span>
                    <Download className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </a>
                </div>
              </div>

              {/* PDF Frame */}
              <div className="relative w-full h-[650px] sm:h-[840px] bg-[var(--color-canvas-950)] flex flex-col items-center justify-center">
                <object
                  data={`${activePdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                  type="application/pdf"
                  className="w-full h-full border-0"
                  aria-label={`Curriculum Vitae Adit Hardiansyah Surachman (${pdfLang.toUpperCase()})`}
                >
                  <iframe 
                    src={`${activePdfUrl}#view=FitH`} 
                    className="w-full h-full border-0"
                    title={`Pratinjau Resume PDF Adit Hardiansyah Surachman (${pdfLang.toUpperCase()})`}
                  >
                    {/* Fallback for browsers that don't support inline PDF rendering */}
                    <div className="p-8 text-center max-w-md mx-auto">
                      <FileText className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-3" />
                      <h3 className="text-base font-semibold text-[var(--color-paper-50)] mb-1">
                        {isEnglish ? "PDF Preview Not Supported" : "Pratinjau PDF Tidak Didukung"}
                      </h3>
                      <p className="text-xs text-[var(--color-stone-muted)] mb-4">
                        {isEnglish 
                          ? "Your browser or device does not render embedded PDFs. You can download the authentic file directly or switch to the Interactive ATS View."
                          : "Peramban atau ponsel Anda tidak mendukung penayangan PDF bawaan. Silakan unduh file asli langsung atau gunakan tab Format ATS Interaktif."}
                      </p>
                      <div className="flex justify-center gap-3">
                        <a
                          href={activePdfUrl}
                          download={activePdfName}
                          className="px-4 py-2 text-xs font-mono font-bold bg-[var(--color-accent)] text-white rounded-lg"
                        >
                          {isEnglish ? "Download Authentic PDF" : "Unduh Dokumen PDF Asli"}
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
                <span>{isEnglish ? "Viewing on mobile device?" : "Membuka lewat ponsel?"} </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('ats')}
                  className="text-[var(--color-accent)] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>{isEnglish ? "Tap here for responsive text format" : "Ketuk di sini untuk format teks interaktif"}</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive High-Contrast ATS Web CV (Exact Data from Authentic CV) */}
          {activeTab === 'ats' && (
            <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] rounded-xl p-6 sm:p-10 shadow-2xl space-y-8">
              
              {/* ATS Header & Contact */}
              <div className="border-b border-white/[0.08] pb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)] tracking-tight">
                  ADIT HARDIANSYAH SURACHMAN
                </h2>
                <p className="text-sm font-mono text-[var(--color-accent)] font-medium mt-1">
                  {pdfLang === 'en' 
                    ? "Informatics Engineering Graduate • IT Administration • Software Engineering" 
                    : "Lulusan S1 Teknik Informatika • Staf IT & Administrasi • Software Engineering"}
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
                    href="https://linkedin.com/in/adit-hardiansyah-surachman-b9aab1315" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-accent)] hover:underline"
                  >
                    <span>LinkedIn</span>
                  </a>
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

              {/* 1. Profil / Profile */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "PROFILE" : "PROFIL"}</span>
                </h3>
                <p className="text-sm text-[var(--color-paper-50)] leading-relaxed bg-[var(--color-canvas-950)] p-4 rounded-lg border border-white/[0.04]">
                  {pdfLang === 'en'
                    ? "Bachelor of Informatics Engineering graduate with hands-on experience in administration, information technology, and industrial operations, including within government institutions. Skilled in data management, official correspondence, financial reporting, and daily operational support. Possesses strong analytical skills, a high attention to detail, and the ability to quickly adapt to new procedures and work environments. Ready to actively contribute across various fields including administration, IT, and production operations."
                    : "Lulusan S1 Teknik Informatika dengan pengalaman nyata di bidang administrasi dan teknologi informasi, termasuk di lingkungan instansi pemerintahan. Terbiasa menangani pengelolaan data, surat-menyurat, pelaporan keuangan, dan dukungan operasional harian. Memiliki kemampuan analitis yang kuat, teliti dalam bekerja, serta mudah beradaptasi dengan prosedur dan lingkungan kerja baru. Siap berkontribusi secara aktif dalam mendukung kelancaran operasional di berbagai bidang, termasuk administrasi, teknologi informasi, dan operasional produksi."}
                </p>
              </div>

              {/* 2. Pendidikan / Education */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "EDUCATION" : "PENDIDIKAN"}</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        STMIK Mardira Indonesia — Bandung, Jawa Barat
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        {pdfLang === 'en' ? "Bachelor of Informatics Engineering • Jul 2021 – Oct 2025" : "Sarjana Teknik Informatika • Jul 2021 – Okt 2025"}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto font-medium">
                      IPK: 3,61 / 4,00
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        SMK Mahardhika Batujajar — Bandung Barat, Jawa Barat
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        {pdfLang === 'en' ? "Machining Technology • Jul 2018 – Jun 2021" : "Teknik Pemesinan • Jul 2018 – Jun 2021"}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 text-[var(--color-paper-50)] border border-white/10 self-start sm:self-auto">
                      Nilai: 81,79 / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Pengalaman Kerja / Work Experience */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "WORK EXPERIENCE" : "PENGALAMAN KERJA"}</span>
                </h3>
                <div className="space-y-4">
                  {/* Dinas Perdagangan dan Perindustrian */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        {pdfLang === 'en' ? "Department of Trade and Industry, City of Bandung" : "Dinas Perdagangan dan Perindustrian Kota Bandung"}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Okt 2024 – Jan 2025
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "IT / Administration Staff • Bandung, West Java" : "Staf IT / Administrasi • Bandung, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Developed a web-based budget calculation application to digitize manual processes, significantly improving accuracy and efficiency of annual financial reporting."
                          : "Mengembangkan aplikasi perhitungan anggaran berbasis web untuk mendigitalisasi proses manual, meningkatkan akurasi dan efisiensi pelaporan keuangan tahunan dinas secara signifikan."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Conducted comprehensive system testing and data recapitulation to ensure integrity of financial reports prior to formal audits."
                          : "Melakukan pengujian sistem secara menyeluruh dan rekap data untuk memastikan integritas laporan keuangan sebelum audit formal."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Provided IT technical support and maintained smooth daily operations of the department."
                          : "Memberikan dukungan teknis IT dan menjaga kelancaran operasional harian departemen."}
                      </li>
                    </ul>
                  </div>

                  {/* Masjid AT-Tijaniyah */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        Masjid AT-Tijaniyah
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Mar 2025 – Agt 2025
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "Lead Developer • West Bandung, West Java" : "Lead Developer • Bandung Barat, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Independently designed and developed a web-based financial management system to modernize bookkeeping previously done manually."
                          : "Merancang dan mengembangkan sistem manajemen keuangan berbasis web secara mandiri untuk memodernisasi pembukuan yang sebelumnya dilakukan secara manual."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Implemented a cash-based accounting model to simplify financial recording and reporting."
                          : "Mengimplementasikan model akuntansi berbasis kas untuk menyederhanakan pencatatan dan pelaporan keuangan organisasi."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Managed full end-to-end development cycle from requirements analysis, coding, and testing to deployment."
                          : "Mengelola siklus pengembangan end-to-end mulai dari analisis kebutuhan, pengkodean, pengujian, hingga deployment."}
                      </li>
                    </ul>
                  </div>

                  {/* PT. Bahagia Sejahtera Metalindo */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        PT. Bahagia Sejahtera Metalindo
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Agt 2020 – Sep 2020
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "Production Operator • West Bandung, West Java" : "Operator Produksi • Bandung Barat, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Carried out production processes according to technical specifications with high precision and full compliance with occupational health and safety (K3) standards and industry SOPs."
                          : "Menjalankan proses produksi sesuai spesifikasi teknis dengan tingkat presisi tinggi dan kepatuhan penuh terhadap standar K3 serta SOP industri."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Sertifikasi & Lisensi / Certifications & Licenses */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "CERTIFICATIONS & LICENSES" : "SERTIFIKASI & LISENSI"}</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        Google Cybersecurity Certificate
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        Google Career Certificates • 2026
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)] self-start sm:self-auto font-medium">
                      Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        Sertifikat Kompetensi Kerja Nasional (BNSP) — Teknik Pemesinan
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        Badan Nasional Sertifikasi Profesi • 2021
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)] self-start sm:self-auto font-medium">
                      BNSP RI
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Keahlian / Skills */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "SKILLS" : "KEAHLIAN"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {pdfLang === 'en' ? "Administration & Office" : "Administrasi & Perkantoran"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Microsoft Office (Word, Excel, PowerPoint), Google Workspace, pengelolaan dokumen & arsip, surat-menyurat dinas, rekap data.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {pdfLang === 'en' ? "Information Technology" : "Teknologi Informasi"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      PHP, Python, Next.js, React, Laravel, TypeScript, Tailwind CSS, SQL, Linux, SDLC.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {pdfLang === 'en' ? "Cybersecurity & Networking" : "Keamanan Siber & Jaringan"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Network Security, Threat Analysis, Risk Management, LAN/WAN, System Testing & Troubleshooting.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-paper-50)] mb-1">
                      {pdfLang === 'en' ? "Production & Languages" : "Operasional & Bahasa"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Operasional mesin industri, quality control, K3 & SOP produksi. Bahasa Indonesia (Native), Bahasa Inggris (Aktif).
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
