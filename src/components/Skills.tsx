import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA, getSkillsData } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { ShieldCheck, Code2, Network, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const icons = {
  Security: ShieldCheck,
  Keamanan: ShieldCheck,
  Programming: Code2,
  Pemrograman: Code2,
  Infrastructure: Network,
  Infrastruktur: Network,
};

export default function Skills() {
  const { t, language } = useLanguage();
  const skillsData = getSkillsData(language);

  return (
    <section id="skills" className="py-20 sm:py-24 bg-slate-100/50 dark:bg-navy-900/50 relative transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('skills.title').split(' ')[0]} <span className="text-gradient">{t('skills.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 sm:px-0">
              {language === 'id' 
                ? 'Daftar komprehensif alat dan teknologi yang saya gunakan.' 
                : 'A comprehensive list of tools and technologies I use to bring ideas to life.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {skillsData.map((category) => {
              const Icon = icons[category.category as keyof typeof icons] || Code2;
              return (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="glass-card rounded-2xl p-6 sm:p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-electric-blue/30 to-cyan-accent/30 dark:from-electric-blue/50 dark:to-cyan-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg text-electric-blue border border-slate-200 dark:border-transparent">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{category.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/5 rounded-full text-sm text-slate-600 dark:text-slate-300 hover:border-electric-blue/50 hover:text-electric-blue dark:hover:text-white transition-colors shadow-sm dark:shadow-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              variants={fadeInUp}
              className="glass-card rounded-2xl p-6 sm:p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden md:col-span-2"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-electric-blue/30 to-cyan-accent/30 dark:from-electric-blue/50 dark:to-cyan-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-lg text-electric-blue border border-slate-200 dark:border-transparent">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {language === 'id' ? 'Sertifikasi & Penghargaan' : 'Certifications & Awards'}
                </h3>
              </div>
              
              <div className="flex flex-col gap-3">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <a
                    key={cert.title}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 py-3 bg-white dark:bg-navy-800 border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:border-electric-blue/50 hover:text-electric-blue dark:hover:text-white transition-colors group/cert shadow-sm dark:shadow-none"
                  >
                    <span className="flex-1">{cert.title}</span>
                    <ExternalLink size={14} className="text-slate-400 dark:text-slate-500 group-hover/cert:text-electric-blue transition-colors shrink-0 hidden sm:block" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
