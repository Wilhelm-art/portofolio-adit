import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';

export function Resume() {
  const { t } = useTranslation();

  const resumeIdUrl = "https://drive.google.com/file/d/1oJSIMlTs2hHnD1hY6rY0glTLSdGr5S_t/view?usp=sharing";
  const resumeEnUrl = "https://drive.google.com/file/d/1zmIBvzadSzNE1YKiVMwlMWOlcdPXiuPq/view?usp=sharing";

  return (
    <>
      <Helmet>
        <title>{t('resume.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('resume.subtitle')} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Header */}
          <header className="border-b border-white/[0.08] pb-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-medium bg-[var(--color-accent-muted)] px-2.5 py-1 rounded border border-[var(--color-accent-border)]">
                  Dokumen Resmi
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-display text-[var(--color-paper-50)] mb-3">
                {t('resume.title')}
              </h1>
              <p className="text-base text-[var(--color-stone-muted)] max-w-xl leading-relaxed">
                {t('resume.subtitle')}
              </p>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Direct Instant PDF Download (Local Asset) */}
              <a 
                href="/resume/Adit_Hardiansyah_Resume.pdf"
                download="Adit_Hardiansyah_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider font-bold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-full transition-all active:scale-[0.98] shadow-lg"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Unduh CV Langsung (PDF)</span>
              </a>

              <a 
                href={resumeIdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Google Drive (ID)</span>
              </a>

              <a 
                href={resumeEnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-medium border border-white/15 hover:border-white/30 text-[var(--color-paper-50)] hover:bg-white/5 rounded-full transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4 text-[var(--color-stone-muted)]" />
                <span>Google Drive (EN)</span>
              </a>
            </div>
          </header>

          {/* Document Preview Frame */}
          <div className="border border-white/[0.08] bg-[var(--color-canvas-900)] p-2 sm:p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-3 text-xs font-mono text-[var(--color-stone-muted)]">
              <span>Curriculum Vitae Preview • Adit Hardiansyah Surachman</span>
              <a 
                href={resumeIdUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--color-paper-50)] transition-colors inline-flex items-center gap-1 active:scale-[0.98]"
              >
                <span>Buka Dokumen Penuh</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="h-[750px] w-full bg-[var(--color-canvas-950)] rounded overflow-hidden">
              <iframe 
                src="https://drive.google.com/file/d/1oJSIMlTs2hHnD1hY6rY0glTLSdGr5S_t/preview" 
                className="w-full h-full border-0"
                title="Pratinjau Resume PDF"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </>
  );
}
