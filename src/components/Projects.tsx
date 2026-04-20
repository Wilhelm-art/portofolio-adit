import { motion } from 'motion/react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedProject, getOtherProjects } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Projects() {
  const { t, language } = useLanguage();
  const featuredProject = getFeaturedProject(language);
  const otherProjects = getOtherProjects(language);

  return (
    <section id="projects" className="py-20 sm:py-24 relative transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('projects.title').split(' ')[0]} <span className="text-gradient">{t('projects.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl px-2 sm:px-0">
              {language === 'id'
                ? 'Beberapa karya terbaik saya, mulai dari penelitian akademis hingga aplikasi full-stack.'
                : 'A selection of my best work, from academic research to full-stack applications.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden group flex flex-col lg:col-span-1 shadow-md dark:shadow-xl border border-slate-200 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-6 sm:p-8">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-electric-blue to-cyan-accent text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg uppercase">
                  {t('projects.featured').replace('🏆 ', '')}
                </div>
                <div className="text-slate-400 dark:text-white/20 font-bold text-2xl sm:text-3xl tracking-tighter opacity-50 group-hover:opacity-80 transition-opacity">SiKeuMas</div>
              </div>
              
              <div className="p-5 sm:p-6 flex-1 flex flex-col bg-white dark:bg-transparent">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-electric-blue transition-colors leading-tight">
                  {featuredProject.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-6 flex-1">
                  {featuredProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tags.map(tag => (
                     <span key={tag} className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-1 rounded shadow-sm dark:shadow-none">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5 mt-auto">
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <Github size={16} />
                    {t('projects.sourceCode')}
                  </a>
                  {featuredProject.demo !== '#' && (
                    <a
                      href={featuredProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric-blue hover:text-blue-600 dark:text-slate-400 dark:hover:text-electric-blue flex items-center gap-2 text-sm font-medium transition-colors ml-auto"
                    >
                      {t('projects.viewDemo')}
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {otherProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden group flex flex-col shadow-md dark:shadow-xl border border-slate-200 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-6 sm:p-8 text-center">
                  <div className="text-slate-400 dark:text-white/20 font-bold text-lg sm:text-xl tracking-widest opacity-50 group-hover:opacity-80 transition-opacity uppercase px-4 line-clamp-2">{project.title.split(' ')[0]}</div>
                </div>
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col bg-white dark:bg-transparent">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-electric-blue transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-1 rounded shadow-sm dark:shadow-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Github size={16} />
                      {t('projects.sourceCode')}
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-blue-600 dark:text-slate-400 dark:hover:text-electric-blue flex items-center gap-2 text-sm font-medium transition-colors ml-auto"
                      >
                         {t('projects.viewDemo')}
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
