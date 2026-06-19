import { motion, Variants } from 'motion/react';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { getExperienceData } from '../lib/constants';
import { staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Timeline() {
  const { t, language } = useLanguage();
  const experienceData = getExperienceData(language);

  // Animations specifically optimized for the dual-sided timeline
  const timelineCardLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const timelineCardRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const centerNode: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
  };

  return (
    <section id="experience" className="py-20 sm:py-24 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            variants={timelineCardLeft} 
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900 dark:text-white tracking-tight geist-font">
              {t('experience.title').split(' ')[0]} <span className="gradient-text font-extrabold tracking-tight">{t('experience.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light inter-font text-base sm:text-lg">
              {language === 'id' ? 'Perjalanan akademik dan profesional saya sejauh ini.' : 'My academic and professional journey so far.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-900/10 dark:bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experienceData.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.type === 'education' ? GraduationCap : item.type === 'experience' ? Briefcase : Award;
                
                // Choose animation variants based on side layout
                const cardVariant = isEven ? timelineCardLeft : timelineCardRight;
                
                return (
                  <div 
                    key={item.id} 
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Bullet Node */}
                    <motion.div 
                      variants={centerNode}
                      className="absolute left-6 md:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-900 border border-slate-900/10 dark:border-white/10 flex items-center justify-center -translate-x-1/2 z-10 group"
                    >
                      <div className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/5 scale-110 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon size={16} className="text-cyan-accent sm:w-[18px] sm:h-[18px] group-hover:scale-105 transition-transform" />
                    </motion.div>

                    {/* Timeline Item Box */}
                    <motion.div 
                      variants={cardVariant}
                      className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${
                        isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'
                      }`}
                    >
                      <motion.div 
                        whileHover={{ y: -4 }}
                        className="glass-card p-6 rounded-2xl"
                      >
                        <span className="inline-block px-3 py-1 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-zinc-250 mb-4 font-display tracking-wider">
                          {item.period}
                        </span>
                        
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 hover:text-cyan-accent transition-colors font-display leading-snug">
                          {item.title}
                        </h3>
                        
                        <h4 className="text-slate-500 dark:text-slate-400 font-medium mb-3.5 text-sm sm:text-base font-sans">
                          {item.organization}
                        </h4>
                        
                        <p className="text-slate-600 dark:text-slate-450 text-sm leading-relaxed font-light inter-font text-justify md:text-inherit">
                          {item.details}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
