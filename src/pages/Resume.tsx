import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHead } from '../components/PageHead';
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
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en') || Boolean(i18n?.language?.startsWith('en'));

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
      <PageHead title={`${t('resume.title')} | Adit Hardiansyah Surachman`} description={t('resume.subtitle')} />
      
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

              {/* Desktop PDF Frame (Native embedded PDF viewer) */}
              <div className="hidden sm:flex relative w-full h-[840px] bg-[var(--color-canvas-950)] flex-col items-center justify-center">
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

              {/* Mobile Dedicated Document Card (Resolves blank/black void on mobile browsers) */}
              <div className="sm:hidden p-6 bg-[var(--color-canvas-950)] text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] shadow-inner">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dokumen PDF Resmi • 43.6 KB</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-[var(--color-paper-50)]">
                    {activePdfName}
                  </h3>
                  <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                    {isEnglish
                      ? "Mobile browsers (Android/iOS) do not support inline PDF frames. Open the full document in a new tab or read the mobile-optimized ATS view below."
                      : "Peramban ponsel (Android & iOS) secara bawaan tidak mendukung bingkai PDF di dalam halaman web. Silakan buka PDF langsung di layar penuh atau baca format teks ATS yang nyaman di bawah."}
                  </p>
                </div>

                <div className="w-full max-w-xs space-y-2.5 pt-2">
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--color-accent)] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-accent)]/90 transition-all shadow-md active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{isEnglish ? "Open PDF in Full Screen" : "Buka PDF di Layar Penuh"}</span>
                  </a>

                  <a
                    href={activePdfUrl}
                    download={activePdfName}
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-canvas-900)] border border-white/10 text-[var(--color-paper-50)] text-xs font-mono font-medium flex items-center justify-center gap-2 hover:border-[var(--color-accent)] transition-all active:scale-[0.98]"
                  >
                    <Download className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>{isEnglish ? "Download Authentic PDF" : "Unduh File PDF"}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveTab('ats')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-[var(--color-accent)] text-xs font-mono font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEnglish ? "Read Plain Text Version" : "Baca Versi Teks Terstruktur"}</span>
                  </button>
                </div>
              </div>

              {/* Desktop notice */}
              <div className="hidden sm:block p-3 bg-[var(--color-canvas-950)] border-t border-white/[0.06] text-center text-xs text-[var(--color-stone-muted)]">
                <span>{isEnglish ? "Viewing on desktop?" : "Membaca di komputer?"} </span>
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
                    ? "IT Systems Specialist & Technical Operations • Software, Infrastructure & Industrial Machinery" 
                    : "IT Systems Specialist & Technical Operations • Software, Infrastructure & Industrial Machinery"}
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
                    ? "Dual-discipline Information Technology & Technical Operations Specialist holding a Bachelor of Computer Science in Informatics Engineering (GPA 3.62/4.00), Google Cybersecurity Professional Certification, and an accredited vocational foundation in Machining Engineering (Official UKK Certificate). Combines hands-on software systems engineering, relational database administration, reporting workflow automation, and IT infrastructure troubleshooting with the rigorous operational discipline required for precision industrial machinery and high-pressure steam boiler utility systems. Demonstrated track record of reducing administrative reporting turnaround time by 40% through end-to-end data digitalization, while upholding strict compliance with industrial SOP and occupational safety standards (OHS/K3) backed by a 100% Zero Accident record."
                    : "Profesional Teknologi Informasi & Operasional Teknis berkualifikasi ganda lulusan S1 Teknik Informatika (IPK 3,62/4,00) bersertifikasi Google Cybersecurity dengan fondasi kejuruan Teknik Pemesinan (Sertifikat UKK Resmi). Menggabungkan kemampuan rekayasa sistem perangkat lunak, administrasi database, otomasi pelaporan, dan troubleshooting TI dengan kedisiplinan operasional mesin manufaktur berpresisi serta sistem utilitas ketel uap industri (steam boiler). Terbukti memangkas waktu kerja administrasi hingga 40% melalui digitalisasi data, serta menjunjung tinggi kepatuhan SOP dan K3 dengan rekam jejak 100% Zero Accident."}
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
                      IPK: 3,62 / 4,00
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
                        {pdfLang === 'en' ? "IT Systems & Administration Specialist" : "Staf IT & Administrasi Sistem"}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Okt 2024 – Jan 2025
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "Department of Trade and Industry, Bandung City • Bandung, West Java" : "Dinas Perdagangan dan Perindustrian Kota Bandung • Bandung, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Engineered a web-based budget data recapitulation application (PHP & MySQL), automating manual cross-divisional ledger calculations and cutting financial reporting turnaround time by 40%."
                          : "Mengembangkan aplikasi rekapitulasi data anggaran berbasis web (PHP & MySQL), mengotomasi kalkulasi manual lintas bidang dinas dan mempercepat waktu penyusunan laporan keuangan hingga 40%."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Eliminated human data entry errors ahead of official municipal BPK/Inspectorate audits through automated input validation rules and centralized relational database reconciliation."
                          : "Mengeliminasi potensi human error pada data anggaran menjelang audit resmi BPK/Inspektorat melalui validasi input formulir otomatis dan rekonsiliasi basis data terpusat."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Delivered Tier-1/2 daily IT Helpdesk support: resolved hardware/software issues for staff workstations, managed local area network (LAN) configurations, and maintained 99%+ operational workstation availability."
                          : "Menyediakan layanan IT Helpdesk harian: menangani troubleshooting hardware/software workstation staf, konfigurasi jaringan lokal (LAN), serta memastikan 99%+ ketersediaan operasional perangkat kerja."}
                      </li>
                    </ul>
                  </div>

                  {/* DKM Masjid AT-Tijaniyah */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        {pdfLang === 'en' ? "Lead Full-Stack Developer (Capstone Project)" : "Lead Full-Stack Developer (Proyek Skripsi)"}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Mar 2025 – Agt 2025
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "DKM AT-Tijaniyah Mosque • West Bandung, West Java" : "DKM Masjid AT-Tijaniyah • Bandung Barat, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Architected and built an end-to-end web cash management system (Laravel 10, Tailwind CSS, MySQL), digitizing manual paper ledgers into an accountable, transparent financial platform."
                          : "Merancang dan membangun arsitektur sistem informasi kas web (Laravel 10, Tailwind CSS, MySQL) yang mendigitalisasi 100% pembukuan fisik manual menjadi sistem kas digital akuntabel dan transparan."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Implemented a cash-basis accounting ledger engine with automated monthly and annual financial balance statements alongside scheduled database backup and recovery protocols."
                          : "Mengimplementasikan modul akuntansi berbasis kas (cash-basis) dengan otomatisasi pelaporan bulanan/tahunan serta mekanisme pencadangan basis data berkala (database backup & recovery)."}
                      </li>
                    </ul>
                  </div>

                  {/* PT. Lestari Makaroni */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        {pdfLang === 'en' ? "Boiler & Utilities System Operator" : "Operator Boiler & Sistem Utilitas"}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Jun 2023 – Agt 2023
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "PT. Lestari Makaroni • West Bandung, West Java" : "PT. Lestari Makaroni • Bandung Barat, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Operated and regulated industrial steam boiler utility systems continuously, guaranteeing stable, uninterrupted high-pressure thermal steam delivery across food manufacturing lines."
                          : "Mengoperasikan dan mengontrol sistem ketel uap industri (steam boiler) secara berkelanjutan guna menjamin kestabilan suplai uap panas bertekanan tinggi untuk seluruh lini mesin produksi makanan."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Conducted hourly instrument telemetry monitoring on steam pressure gauges, water column levels, and burner combustion temperatures to proactively prevent overpressure explosion hazards."
                          : "Melakukan monitoring instrumen secara berkala per jam terhadap manometer tekanan kerja (steam pressure gauge), level air ketel, dan suhu burner untuk mengantisipasi risiko bahaya ledakan/overpressure."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Executed scheduled preventive maintenance protocols: performed routine sediment blowdowns, burner cleanings, and safety valve inspections with a 100% Zero Accident safety record."
                          : "Menjalankan SOP perawatan preventif terjadwal: melaksanakan prosedur pengurasan endapan kerak (blowdown rutin), pembersihan burner, dan inspeksi valve dengan rekam jejak 100% Zero Accident."}
                      </li>
                    </ul>
                  </div>

                  {/* PT. Bahagia Sejahtera Metalindo */}
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                        {pdfLang === 'en' ? "Production & Machining Operator" : "Operator Produksi & Pemesinan Logam"}
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                        Agt 2020 – Sep 2020
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                      {pdfLang === 'en' ? "PT. Bahagia Sejahtera Metalindo • West Bandung, West Java" : "PT. Bahagia Sejahtera Metalindo • Bandung Barat, Jawa Barat"}
                    </p>
                    <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                      <li>
                        {pdfLang === 'en'
                          ? "Operated industrial metal fabrication machinery for plate shearing and stamping according to CAD engineering drawings and tight ISO dimensional tolerances."
                          : "Mengoperasikan mesin manufaktur industri logam untuk proses pemotongan dan pencetakan pelat baja sesuai lembar kerja gambar teknik (engineering drawing) dan batas toleransi dimensi ketat."}
                      </li>
                      <li>
                        {pdfLang === 'en'
                          ? "Performed in-process Quality Control (QC) inspections using vernier calipers to minimize scrap rates and enforced 5S workplace standardization protocols."
                          : "Menjalankan inspeksi Quality Control (QC) in-process menggunakan jangka sorong (vernier caliper) guna menekan rasio produk cacat (scrap) serta menerapkan budaya kerja 5S/5R."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Proyek Teknis Unggulan / Featured Technical Projects */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "FEATURED TECHNICAL PROJECTS" : "PROYEK TEKNIS UNGGULAN"}</span>
                </h3>
                <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                    <h4 className="text-sm font-bold text-[var(--color-paper-50)]">
                      PayNote &amp; Meracik-Ide — Web &amp; Mobile Applications
                    </h4>
                    <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold">
                      Jan 2024 – Des 2024
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[var(--color-stone-muted)] mb-2.5">
                    Independent Technical Projects (github.com/Wilhelm-art) • Bandung, Jawa Barat
                  </p>
                  <ul className="text-xs text-[var(--color-stone-muted)] leading-relaxed list-disc list-inside space-y-1">
                    <li>
                      <strong className="text-[var(--color-paper-50)]">PayNote:</strong> {pdfLang === 'en'
                        ? "Engineered a financial tracking web application with MVC architecture, automated multi-category balance computation, and interactive analytical visual charts built with Laravel 10 and MySQL."
                        : "Membangun aplikasi pencatatan keuangan dengan arsitektur MVC, kalkulasi saldo multi-kategori otomatis, dan visualisasi chart analitik interaktif menggunakan Laravel 10 dan MySQL."}
                    </li>
                    <li>
                      <strong className="text-[var(--color-paper-50)]">Meracik-Ide:</strong> {pdfLang === 'en'
                        ? "Developed a mobile financial calculator (COGS/HPP & Break-Even Point for MSMEs) using React Native/Expo, and designed an interactive portfolio web application achieving optimal Google Web Vitals scores (95+)."
                        : "Mengembangkan aplikasi mobile kalkulasi finansial (HPP & BEP UMKM) berbasis React Native/Expo serta merancang website portofolio interaktif dengan skor Google Web Vitals optimal (95+)."}
                    </li>
                  </ul>
                </div>
              </div>

              {/* 5. Sertifikasi & Lisensi / Certifications & Licenses */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "CERTIFICATIONS & LICENSES" : "SERTIFIKASI & LISENSI PROFESIONAL"}</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        Google Cybersecurity Professional Certificate
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        Google Career Certificates / Coursera • 2026
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)] self-start sm:self-auto font-medium">
                      Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-paper-50)]">
                        {pdfLang === 'en' ? "Vocational Competency Certificate (UKK) in Machining Engineering" : "Sertifikat Uji Kompetensi Keahlian (UKK) Teknik Pemesinan"}
                      </h4>
                      <p className="text-xs text-[var(--color-stone-muted)] mt-0.5">
                        PT. Indo Integral Sekawan • 2021
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 text-[var(--color-paper-50)] border border-white/10 self-start sm:self-auto font-medium">
                      UKK Resmi
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. Keahlian Teknis & Alat Kerja / Technical Skills */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{pdfLang === 'en' ? "TECHNICAL SKILLS & TOOLS" : "KEAHLIAN TEKNIS & ALAT KERJA"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-accent)] mb-1">
                      {pdfLang === 'en' ? "Software Development" : "Pengembangan Perangkat Lunak"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      PHP, Laravel, MySQL, JavaScript, TypeScript, React, Next.js, React Native, RESTful APIs, Git &amp; GitHub.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-accent)] mb-1">
                      {pdfLang === 'en' ? "IT Support, Networking & Security" : "IT Support, Jaringan & Keamanan"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Troubleshooting PC (Hardware/Software), Jaringan LAN/WAN, TCP/IP, DNS/DHCP, Windows Server/10/11, Linux, Keamanan Siber (Google Certified).
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-accent)] mb-1">
                      {pdfLang === 'en' ? "Machining & Plant Operations" : "Teknis Mesin & Operasional Pabrik"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Pengoperasian Sistem Boiler Industri, Mesin Bubut Konvensional, Mesin Frais, Quality Control (Jangka Sorong, Mikrometer), SOP K3 Manufaktur, 5S/5R.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--color-canvas-950)] border border-white/[0.04]">
                    <h5 className="font-mono text-xs font-bold text-[var(--color-accent)] mb-1">
                      {pdfLang === 'en' ? "Administration & Computing" : "Administrasi & Komputasi"}
                    </h5>
                    <p className="text-xs text-[var(--color-stone-muted)] leading-relaxed">
                      Microsoft Excel (Advanced Formula &amp; Rekap Data Logsheet), Microsoft Word, Google Workspace, Command Prompt / PowerShell.
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
