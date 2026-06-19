import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Layers, Code, Sparkles } from 'lucide-react';
import { getFeaturedProject, getOtherProjects } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Projects() {
  const { t, language } = useLanguage();
  const featured = getFeaturedProject(language);
  const others = getOtherProjects(language);
  
  // Combine projects for uniform filtering
  // Index 0 will be the featured project
  const allProjects = [
    { ...featured, isFeatured: true, category: 'web-app' },
    ...others.map((p) => ({
      ...p,
      isFeatured: false,
      // Assign category groups for filter
      category: p.id === 'logsentinel' || p.id === 'budget-calc' || p.id === 'gadget-vault' ? 'web-app' : 'ui-ux'
    }))
  ];

  const [activeFilter, setActiveFilter] = useState<'all' | 'web-app' | 'ui-ux'>('all');

  const filteredProjects = allProjects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const filterButtons = [
    { id: 'all', label: language === 'id' ? 'Semua Karya' : 'All Work', icon: <Layers size={14} /> },
    { id: 'web-app', label: language === 'id' ? 'Aplikasi Web' : 'Web Apps', icon: <Code size={14} /> },
    { id: 'ui-ux', label: language === 'id' ? 'Desain UI/UX' : 'UI/UX & Landing', icon: <Sparkles size={14} /> }
  ] as const;

  return (
    <section id="projects" className="py-20 sm:py-24 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Side: Header & Filters (Sticky on desktop) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-light mb-4 text-slate-900 dark:text-white leading-tight tracking-tight geist-font">
                {t('projects.title').split(' ')[0]} <span className="gradient-text font-extrabold tracking-tight">{t('projects.title').split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-light inter-font text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                {language === 'id'
                  ? 'Beberapa karya terbaik saya, mulai dari penelitian akademis hingga aplikasi full-stack.'
                  : 'A selection of my best work, from academic research to full-stack applications.'}
              </p>
              
              <div className="flex flex-row lg:flex-col flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-2.5 w-full">
                {filterButtons.map(btn => {
                  const isActive = activeFilter === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => setActiveFilter(btn.id)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer w-full sm:w-auto lg:w-full border ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                          : 'bg-slate-900/5 dark:bg-white/5 border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-slate-350 hover:border-slate-900/20 dark:hover:border-white/20'
                      }`}
                    >
                      <span className={`${isActive ? 'text-white' : 'text-cyan-accent'}`}>{btn.icon}</span>
                      <span className="font-display">{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Projects Grid */}
            <div className="lg:col-span-8">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => {
                    const isFeaturedCard = project.isFeatured && activeFilter !== 'ui-ux';
                    
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        key={project.id}
                        className={`glass-card rounded-2xl overflow-hidden group flex flex-col ${
                          isFeaturedCard ? 'md:col-span-2' : 'md:col-span-1'
                        }`}
                      >
                        {/* Project Image Panel */}
                        <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900/5 dark:bg-zinc-950 border-b border-slate-900/10 dark:border-white/5">
                          {project.isFeatured && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-md uppercase tracking-wider font-display border border-white/10">
                              {t('projects.featured').replace('🏆 ', '')}
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent z-10 opacity-60" />
                          
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700 ease-out" 
                          />
                        </div>
                        
                        {/* Project Body */}
                        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-xl sm:text-2xl group-hover:text-cyan-accent transition-colors leading-tight font-display">
                              {project.title}
                            </h3>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-light inter-font text-justify">
                              {project.description}
                            </p>
                            
                            {/* Display features list for featured project */}
                            {isFeaturedCard && 'features' in project && (
                              <div className="mb-6 hidden sm:block">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200 mb-2.5 font-display">KEY FEATURES:</h4>
                                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-650 dark:text-slate-400">
                                  {(project.features as string[]).map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <span className="w-1 h-1 rounded-full bg-cyan-accent shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          
                          {/* Footer Actions */}
                          <div>
                            <div className="flex flex-wrap gap-2 mb-5">
                              {project.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="skill-badge px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4 pt-3.5 border-t border-slate-900/10 dark:border-white/5 mt-auto">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors group/link"
                              >
                                <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                                <span className="font-display">{t('projects.sourceCode')}</span>
                              </a>
                              
                              {project.demo !== '#' && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-800 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white flex items-center gap-1.5 text-sm font-semibold transition-colors ml-auto group/demo"
                                >
                                  <span className="font-display">{t('projects.viewDemo')}</span>
                                  <ExternalLink size={14} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
