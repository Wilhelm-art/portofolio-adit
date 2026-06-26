import { motion } from 'motion/react';
import { getExperienceData } from '../lib/constants';
import { useLanguage } from '../lib/LanguageContext';

export default function Timeline() {
  const { t, language } = useLanguage();
  const experienceData = getExperienceData(language);

  return (
    <section id="experience" className="py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-zinc-950 dark:text-zinc-50 leading-[1.1] geist-font mb-6">
              {t('experience.title')}
            </h2>
            <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400 font-light inter-font">
              {language === 'id'
                ? 'Perjalanan akademik dan profesional saya sejauh ini.'
                : 'My academic and professional journey so far.'}
            </p>
          </motion.div>

          <div className="flex flex-col gap-12 sm:gap-20">
            {experienceData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16 border-t border-zinc-200 dark:border-zinc-800 pt-8"
              >
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-2 inter-font">
                    {item.period}
                  </h3>
                  <h4 className="text-xl font-medium text-zinc-950 dark:text-zinc-50 font-display">
                    {item.organization}
                  </h4>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-zinc-950 dark:text-zinc-50 mb-4 tracking-tight geist-font">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base sm:text-lg font-light inter-font">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
