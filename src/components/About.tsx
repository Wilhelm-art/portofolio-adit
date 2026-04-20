import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { getAboutData } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInRight } from '../lib/animations';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();
  const aboutData = getAboutData(language);

  return (
    <section id="about" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={slideInRight} className="flex-1 w-full glass-card p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/5 to-cyan-accent/5 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
                {t('about.title').split(' ')[0]} <span className="text-gradient">{t('about.title').split(' ').slice(1).join(' ')}</span>
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-8 text-justify">
                {t('about.bio')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {aboutData.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center sm:items-start p-4 bg-slate-50/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                    <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white flex items-baseline">
                      <AnimatedCounter value={stat.value} />
                      <span className="text-electric-blue">{stat.suffix}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center sm:justify-start">
                <a
                  href="https://drive.google.com/file/d/1MH7uaqvyoAH9m9-N6185lMznZVtxhR04/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
                >
                  <Download size={18} />
                  <span>{t('common.viewFullCV')}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
