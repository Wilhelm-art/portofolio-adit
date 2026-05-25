import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Filter, Layers, Code, Sparkles } from 'lucide-react';
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
    ...others.map((p, idx) => ({
      ...p,
      isFeatured: false,
      // Assign category groups for filter
      category: p.id === 'logsentinel' || p.id === 'budget-calc' ? 'web-app' : 'ui-ux'
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
    { id: 'ui-ux', label: language === 'id' ? 'Desain UI/UX & Landing' : 'UI/UX & Landing', icon: <Sparkles size={14} /> }
  ] as const;

  return (
    <section id="projects" className="py-20 sm:py-24 relative overflow-hidden bg-slate-50/20 dark:bg-navy-950/10">
      {/* Decorative blurs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-accent/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-electric-blue/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {t('projects.title').split(' ')[0]} <span className="text-gradient font-extrabold text-cyber-glow font-display">{t('projects.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 font-sans text-base sm:text-lg">
              {language === 'id'
                ? 'Beberapa karya terbaik saya, mulai dari penelitian akademis hingga aplikasi full-stack.'
                : 'A selection of my best work, from academic research to full-stack applications.'}
            </p>
          </motion.div>

          {/* Filtering Tabs */}
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-wrap justify-center items-center gap-3 mb-12"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2">
              <Filter size={12} />
              <span>FILTER:</span>
            </div>
            {filterButtons.map(btn => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  activeFilter === btn.id
                    ? 'bg-electric-blue border-electric-blue text-white shadow-md shadow-electric-blue/20'
                    : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-350 hover:border-cyan-accent/50 dark:hover:border-cyan-accent/40'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Bento Grid layout */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                // If it is the featured project AND we are in 'all' or 'web-app' view, let it span 2 columns on desktop
                const isFeaturedCard = project.isFeatured && activeFilter !== 'ui-ux';
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    className={`glass-cyber-card rounded-3xl overflow-hidden group flex flex-col shadow-md hover:shadow-cyber-glow border-glow-pulse ${
                      isFeaturedCard ? 'lg:col-span-2' : 'lg:col-span-1'
                    }`}
                  >
                    {/* Project Image Panel */}
                    <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100 dark:bg-navy-950 border-b border-slate-200/50 dark:border-white/5">
                      {project.isFeatured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-electric-blue to-cyan-accent text-white text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full z-20 shadow-lg uppercase tracking-wider font-display animate-cyber-pulse border border-white/20">
                          {t('projects.featured').replace('🏆 ', '')}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10 opacity-60" />
                      
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                    </div>
                    
                    {/* Project Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white/40 dark:bg-transparent">
                      <div>
                        <h3 className={`font-bold text-slate-800 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors leading-tight font-display ${
                          isFeaturedCard ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                        }`}>
                          {project.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base mb-6 leading-relaxed font-sans text-justify">
                          {project.description}
                        </p>
                        
                        {/* Display features list for featured project when it is expanded (desktop 2-col) */}
                        {isFeaturedCard && 'features' in project && (
                          <div className="mb-6 hidden sm:block">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2.5 font-display">KEY FEATURES:</h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                              {(project.features as string[]).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {/* Footer Actions */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 px-2.5 py-1 rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-200/50 dark:border-white/5 mt-auto">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 flex items-center gap-2 text-sm font-semibold transition-colors group/link"
                          >
                            <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                            <span className="font-display">{t('projects.sourceCode')}</span>
                          </a>
                          
                          {project.demo !== '#' && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-electric-blue hover:text-blue-600 dark:text-slate-350 dark:hover:text-cyan-400 flex items-center gap-1.5 text-sm font-semibold transition-colors ml-auto group/demo"
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
        </motion.div>
      </div>
    </section>
  );
}
