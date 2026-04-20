import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { getExperienceData } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Timeline() {
  const { t, language } = useLanguage();
  const experienceData = getExperienceData(language);

  return (
    <section id="experience" className="py-20 sm:py-24 bg-slate-100/50 dark:bg-navy-900/50 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('experience.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'id' ? 'Perjalanan akademik dan profesional saya sejauh ini.' : 'My academic and professional journey so far.'}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12">
              {experienceData.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.type === 'education' ? GraduationCap : item.type === 'experience' ? Briefcase : Award;
                
                return (
                  <motion.div 
                    key={item.id} 
                    variants={fadeInUp}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="absolute left-6 md:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-navy-800 border-2 border-electric-blue flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.3)] dark:shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                      <Icon size={16} className="text-electric-blue sm:w-[18px] sm:h-[18px]" />
                    </div>

                    <div className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                      <div className="glass-card p-5 sm:p-6 rounded-2xl hover:border-electric-blue/30 transition-colors group shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10">
                        <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] sm:text-xs font-medium text-electric-blue dark:text-cyan-accent mb-3">
                          {item.period}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-electric-blue transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <h4 className="text-slate-600 dark:text-slate-300 font-medium mb-3 text-sm sm:text-base">{item.organization}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
