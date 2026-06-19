import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { getAboutData } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';
import React from 'react';

export default function About() {
  const { t, language } = useLanguage();
  const aboutData = getAboutData(language);

  return (
    <section id="about" className="py-20 sm:py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900 dark:text-white tracking-tight geist-font">
              {t('about.title').split(' ')[0]} <span className="gradient-text font-extrabold tracking-tight">{t('about.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10 inter-font text-center">
              {t('about.bio')}
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex justify-center mb-16"
          >
            <a
              href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button px-6 py-3 rounded-lg text-slate-800 dark:text-white text-sm font-medium hover:scale-102 transition-transform duration-300 inline-flex items-center gap-2 font-display"
            >
              <Download size={16} />
              <span>{t('common.viewFullCV')}</span>
            </a>
          </motion.div>

          <div className="divider mb-16" />

          {/* Minimal Horizontal Stats List (Starfall style) */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-12 text-center"
          >
            {aboutData.stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div>
                  <div className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-1.5 geist-font tracking-tight">
                    {stat.value}
                    <span className="text-cyan-accent font-extrabold font-display">{stat.suffix}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-450 text-sm font-normal inter-font">
                    {stat.label}
                  </div>
                </div>
                {index < aboutData.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
