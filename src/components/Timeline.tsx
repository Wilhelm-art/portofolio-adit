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
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const timelineCardRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const centerNode: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
  };

  return (
    <section id="experience" className="py-20 sm:py-24 bg-slate-100/30 dark:bg-navy-950/30 relative overflow-hidden transition-colors duration-300">
      {/* Background visual enhancements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-accent/3 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('experience.title').split(' ')[0]} <span className="text-gradient font-extrabold text-cyber-glow font-display">{t('experience.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-base sm:text-lg">
              {language === 'id' ? 'Perjalanan akademik dan profesional saya sejauh ini.' : 'My academic and professional journey so far.'}
            </p>
          </motion.div>

          <div className="relative">
            {/* Central Timeline Line with gradient glow */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-cyan-accent to-blue-600 md:-translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />

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
                    {/* Glowing Bullet Node */}
                    <motion.div 
                      variants={centerNode}
                      className="absolute left-6 md:left-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-navy-900 border-2 border-cyan-accent flex items-center justify-center -translate-x-1/2 z-10 shadow-cyber-glow group"
                    >
                      <div className="absolute inset-0 rounded-full bg-cyan-accent/20 animate-ping group-hover:animate-none scale-125 pointer-events-none" />
                      <Icon size={16} className="text-cyan-500 sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform" />
                    </motion.div>

                    {/* Timeline Item Box */}
                    <motion.div 
                      variants={cardVariant}
                      className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${
                        isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'
                      }`}
                    >
                      <motion.div 
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="glass-cyber-card p-6 rounded-2xl shadow-sm hover:shadow-cyber-glow border-glow-pulse"
                      >
                        <span className="inline-block px-3.5 py-1 bg-cyan-accent/10 border border-cyan-accent/25 dark:border-white/5 rounded-full text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-4 font-display tracking-wider">
                          {item.period}
                        </span>
                        
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1.5 hover:text-cyan-500 transition-colors font-display leading-snug">
                          {item.title}
                        </h3>
                        
                        <h4 className="text-electric-blue dark:text-slate-350 font-medium mb-3.5 text-sm sm:text-base font-sans">
                          {item.organization}
                        </h4>
                        
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans text-justify md:text-inherit">
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
