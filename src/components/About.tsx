import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { getAboutData } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';
import React from 'react';

export default function About() {
  const { t, language } = useLanguage();
  const aboutData = getAboutData(language);

  return (
    <section id="about" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] geist-font mb-12">
              {t('about.title')}
            </h2>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
              <div className="flex-1">
                <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed inter-font">
                  {t('about.bio')}
                </p>
                <div className="mt-16">
                  <a
                    href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-zinc-950 dark:text-zinc-50 font-display font-medium tracking-widest uppercase hover:text-zinc-500 transition-colors border-b border-zinc-950 dark:border-zinc-50 pb-1"
                  >
                    <span>{t('common.viewFullCV')}</span>
                    <Download size={16} />
                  </a>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="grid grid-cols-2 gap-8 lg:flex lg:flex-col lg:gap-12">
                  {aboutData.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-5xl md:text-6xl font-medium text-zinc-950 dark:text-zinc-50 mb-2 geist-font tracking-tighter">
                        {stat.value}
                        <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium inter-font uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
