import React from 'react';
import { motion } from 'motion/react';
import { CERTIFICATIONS_DATA, getSkillsData } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { ShieldCheck, Code2, Award, ExternalLink, Wrench, Languages, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const icons: Record<string, React.ElementType> = {
  'Programming & Frameworks': Code2,
  'Pemrograman & Framework': Code2,
  'Information Technology': Code2,
  'Teknologi Informasi': Code2,
  'Security & Networking': ShieldCheck,
  'Keamanan & Jaringan': ShieldCheck,
  'Cybersecurity & Networking': ShieldCheck,
  'Keamanan Siber & Jaringan': ShieldCheck,
  'Systems & Tools': Wrench,
  'Sistem & Alat': Wrench,
  'Administration & Office': ClipboardCheck,
  'Administrasi & Perkantoran': ClipboardCheck,
  'Languages': Languages,
  'Bahasa': Languages,
};

export default function Skills() {
  const { t, language } = useLanguage();
  const skillsData = getSkillsData(language);

  return (
    <section id="skills" className="py-20 sm:py-24 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900 dark:text-white tracking-tight geist-font">
              {t('skills.title').split(' ')[0]} <span className="gradient-text font-extrabold tracking-tight">{t('skills.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 sm:px-0 font-light inter-font text-base sm:text-lg">
              {language === 'id' 
                ? 'Daftar komprehensif alat dan teknologi yang saya gunakan.' 
                : 'A comprehensive list of tools and technologies I use to bring ideas to life.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((category) => {
              const Icon = icons[category.category as keyof typeof icons] || Code2;
              return (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 sm:p-8 group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-xl text-slate-800 dark:text-white border border-slate-900/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                        <Icon size={22} className="text-cyan-accent" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white geist-font">{category.category}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="skill-badge px-3 py-1.5 rounded-lg text-xs font-medium inter-font"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 sm:p-8 group relative overflow-hidden md:col-span-2"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-xl text-slate-800 dark:text-white border border-slate-900/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <Award size={22} className="text-cyan-accent" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white geist-font">
                    {language === 'id' ? 'Sertifikasi & Penghargaan' : 'Certifications & Awards'}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <a
                      key={cert.title}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 px-5 py-4 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-900/20 dark:hover:border-white/20 transition-all group/cert font-sans"
                    >
                      <span className="flex-1 text-slate-800 dark:text-zinc-200">{cert.title}</span>
                      <div className="p-1.5 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 group-hover/cert:bg-slate-900/10 dark:group-hover/cert:bg-white/10 transition-colors">
                        <ExternalLink size={14} className="text-slate-400 dark:text-slate-400 group-hover/cert:text-slate-800 dark:group-hover/cert:text-white transition-colors shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
