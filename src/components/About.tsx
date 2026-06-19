import { motion } from 'motion/react';
import { Download, Award, GraduationCap, CalendarRange } from 'lucide-react';
import { getAboutData } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInRight } from '../lib/animations';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();
  const aboutData = getAboutData(language);

  // Icon mapping for stats to look premium
  const statIcons = [
    <Award size={20} className="text-cyan-400" />,
    <CalendarRange size={20} className="text-electric-blue" />,
    <GraduationCap size={20} className="text-cyan-400" />
  ];

  return (
    <section id="about" className="py-20 sm:py-24 relative overflow-hidden">
      {/* Subtle glowing accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-accent/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-electric-blue/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={slideInRight} 
            className="flex-1 w-full minimal-card p-6 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden group"
          >
            {/* Elegant top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-electric-blue to-cyan-accent" />
            
            <div className="relative z-10">
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight"
              >
                {t('about.title').split(' ')[0]} <span className="text-gradient font-extrabold font-display">{t('about.title').split(' ').slice(1).join(' ')}</span>
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-slate-600 dark:text-slate-350 text-base sm:text-lg leading-relaxed mb-10 text-justify font-sans"
              >
                {t('about.bio')}
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10"
              >
                {aboutData.stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center sm:items-start p-5 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-200/50 dark:border-white/5 shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">{stat.label}</span>
                      <div className="p-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200/50 dark:border-white/10">
                        {statIcons[index] || statIcons[0]}
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold font-display text-slate-800 dark:text-white flex items-baseline gap-0.5">
                      <AnimatedCounter value={stat.value} />
                      <span className="text-cyan-500 dark:text-cyan-400 font-display font-extrabold">{stat.suffix}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="flex justify-center sm:justify-start"
              >
                <a
                  href="https://drive.google.com/file/d/1gnTbq-vJhQnL2z-wkXwxheaXb1D6rH40/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-250 font-medium hover:bg-slate-200/80 dark:hover:bg-white/10 transition-all w-full sm:w-auto justify-center font-display shadow-sm hover:shadow-md"
                >
                  <Download size={18} className="animate-bounce" />
                  <span>{t('common.viewFullCV')}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
