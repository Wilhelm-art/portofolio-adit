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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <header className="border-b border-[rgba(245,242,235,0.08)] pb-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-stone-muted)]">
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
              <a 
                href={resumeIdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] hover:bg-[var(--color-paper-100)] rounded-sm transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-[var(--color-terracotta)]" />
                <span>{t('resume.download_id')}</span>
              </a>

              <a 
                href={resumeEnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold border border-[rgba(245,242,235,0.18)] hover:border-[rgba(245,242,235,0.4)] text-[var(--color-paper-50)] rounded-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('resume.download_en')}</span>
              </a>
            </div>
          </header>

          {/* Document Preview Frame */}
          <div className="border border-[rgba(245,242,235,0.12)] bg-[var(--color-canvas-900)] p-2 sm:p-4 rounded-sm">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[rgba(245,242,235,0.06)] mb-3 text-xs font-mono text-[var(--color-stone-muted)]">
              <span>Curriculum Vitae Preview • Adit Hardiansyah Surachman</span>
              <a 
                href={resumeIdUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--color-paper-50)] inline-flex items-center gap-1"
              >
                <span>Buka Dokumen Penuh</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="h-[750px] w-full bg-white rounded-sm overflow-hidden">
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
