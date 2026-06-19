import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Layers, Code, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProject, getOtherProjects } from '../lib/constants';
import { slideInLeft, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function Projects() {
  const { t, language } = useLanguage();
  const featured = getFeaturedProject(language);
  const others = getOtherProjects(language);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'web-app' | 'ui-ux'>('all');

  const filterButtons = [
    { id: 'all', label: language === 'id' ? 'Semua Karya' : 'All Work', icon: <Layers size={14} /> },
    { id: 'web-app', label: language === 'id' ? 'Aplikasi Web' : 'Web Apps', icon: <Code size={14} /> },
    { id: 'ui-ux', label: language === 'id' ? 'Desain UI/UX' : 'UI/UX & Landing', icon: <Sparkles size={14} /> }
  ] as const;

  const showFeatured = activeFilter === 'all' || activeFilter === 'web-app';

  // Filter others based on category
  const filteredOthers = others.filter(p => {
    if (activeFilter === 'all') return true;
    const isWebApp = p.id === 'logsentinel' || p.id === 'budget-calc' || p.id === 'gadget-vault';
    return activeFilter === 'web-app' ? isWebApp : !isWebApp;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Scroll by one card width (340px card + 24px gap = 364px)
      const scrollAmount = direction === 'left' ? -364 : 364;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-24 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Top Section: Split layout for header & featured project (Figure 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            
            {/* Left Column: Title & Filter */}
            <motion.div 
              variants={slideInLeft}
              className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit flex flex-col items-center lg:items-start text-center lg:text-left"
            >
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
            </motion.div>

            {/* Right Column: Featured Project Card */}
            <motion.div 
              variants={slideInLeft}
              className="lg:col-span-8 w-full"
            >
              <AnimatePresence mode="wait">
                {showFeatured ? (
                  <motion.div
                    key="featured-project"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card rounded-2xl overflow-hidden group flex flex-col w-full"
                  >
                    {/* Featured Image */}
                    <div className="relative h-60 sm:h-80 overflow-hidden bg-slate-900/5 dark:bg-zinc-950 border-b border-slate-900/10 dark:border-white/5">
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full z-20 shadow-md uppercase tracking-wider font-display border border-white/10">
                        {t('projects.featured').replace('🏆 ', '')}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent z-10 opacity-60" />
                      <img 
                        src={featured.image} 
                        alt={featured.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-101 transition-all duration-750 ease-out" 
                      />
                    </div>

                    {/* Featured Details */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xl sm:text-2xl font-display leading-tight">
                          {featured.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-light inter-font text-justify">
                          {featured.description}
                        </p>
                        
                        {featured.features && (
                          <div className="mb-6 hidden sm:block">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200 mb-2.5 font-display">KEY FEATURES:</h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-650 dark:text-slate-405">
                              {featured.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {featured.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="skill-badge px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-900/10 dark:border-white/5">
                          <a
                            href={featured.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors group/link"
                          >
                            <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                            <span className="font-display">{t('projects.sourceCode')}</span>
                          </a>
                          
                          {featured.demo !== '#' && (
                            <a
                              href={featured.demo}
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
                ) : (
                  <motion.div
                    key="no-featured"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full w-full flex items-center justify-center p-8 border border-dashed border-slate-900/10 dark:border-white/10 rounded-2xl min-h-[300px]"
                  >
                    <p className="text-slate-400 dark:text-slate-500 font-light text-sm text-center">
                      {language === 'id' ? 'Pilih kategori "Aplikasi Web" untuk melihat proyek unggulan.' : 'Select "Web Apps" filter to view the featured project.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Bottom Section: Carousel Slider for Other Projects (Figure 2) */}
          <div className="relative group/slider pt-4">
            <h3 className="text-xl font-light text-slate-800 dark:text-zinc-200 tracking-tight geist-font mb-6">
              {language === 'id' ? 'Karya Lainnya' : 'Other Projects'}
            </h3>

            <div className="relative flex items-center">
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-30 w-10 h-10 -ml-4 rounded-full bg-slate-950/90 dark:bg-black/90 border border-slate-900/10 dark:border-white/10 text-white flex items-center justify-center hover:bg-slate-950 dark:hover:bg-black transition-all shadow-lg hover:scale-105 cursor-pointer"
                aria-label="Previous Projects"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Horizontal Scrollable Area */}
              <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-4 px-2 w-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredOthers.map((project) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={project.id}
                      className="min-w-[280px] sm:min-w-[340px] max-w-[360px] snap-start glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Project Image Panel */}
                      <div className="relative h-44 overflow-hidden bg-slate-900/5 dark:bg-zinc-950 border-b border-slate-900/10 dark:border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent z-10 opacity-50" />
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500 ease-out" 
                        />
                      </div>

                      {/* Project Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg sm:text-xl font-display leading-tight group-hover:text-cyan-accent transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-light inter-font text-justify">
                            {project.description}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="skill-badge px-2.5 py-0.5 rounded-md text-[10px] font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 pt-3 border-t border-slate-900/10 dark:border-white/5 mt-auto">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors group/link"
                            >
                              <Github size={14} className="group-hover/link:rotate-12 transition-transform" />
                              <span className="font-display">{t('projects.sourceCode')}</span>
                            </a>
                            
                            {project.demo !== '#' && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-800 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors ml-auto group/demo"
                              >
                                <span className="font-display">{t('projects.viewDemo')}</span>
                                <ExternalLink size={12} className="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-30 w-10 h-10 -mr-4 rounded-full bg-slate-950/90 dark:bg-black/90 border border-slate-900/10 dark:border-white/10 text-white flex items-center justify-center hover:bg-slate-950 dark:hover:bg-black transition-all shadow-lg hover:scale-105 cursor-pointer"
                aria-label="Next Projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
