import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export function Resume() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('resume.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content="Download or view Adit Hardiansyah Surachman's resume." />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <h1 className="text-4xl font-bold font-display">{t('resume.title')}<span className="text-accent-red">.</span></h1>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/resume/adit-cv-id.pdf" 
                download
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-red hover:bg-accent-red/90 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('resume.download_id')}
              </a>
              <a 
                href="/resume/adit-cv-en.pdf" 
                download
                className="inline-flex items-center justify-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md text-white bg-base-800 hover:bg-base-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('resume.download_en')}
              </a>
            </div>
          </div>

          <div className="bg-base-800 p-2 sm:p-4 rounded-xl border border-white/10 shadow-2xl h-[800px]">
             {/* Using an iframe to render the PDF directly in the browser */}
             <iframe 
                src="/resume/adit-cv-id.pdf" 
                className="w-full h-full rounded bg-white"
                title="Resume PDF Viewer"
             />
          </div>
        </motion.div>
      </div>
    </>
  );
}
