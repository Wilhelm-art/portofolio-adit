import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data';

export function Projects() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  return (
    <>
      <Helmet>
        <title>{t('projects.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('projects.subtitle')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <header className="mb-14 border-b border-white/10 pb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-medium">
              {isEnglish ? "Engineered Systems & Products" : "Sistem & Aplikasi Produksi"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[var(--color-paper-50)] mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-stone-muted)] max-w-3xl leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </header>

        {/* Project Archive List */}
        <div className="space-y-10">
          {projects.map((project, idx) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="border border-white/10 bg-[var(--color-canvas-900)] rounded-lg overflow-hidden hover:border-[var(--color-accent)]/50 transition-all"
            >
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Visual Project Preview */}
                  <div className="lg:col-span-5">
                    <Link 
                      to={`${basePath}/projects/${project.id}`}
                      className="block relative aspect-[16/10] overflow-hidden rounded bg-[var(--color-canvas-850)] border border-white/10 group"
                    >
                      <img 
                        src={project.screenshot} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-canvas-950)]/60 via-transparent to-transparent opacity-60 group-hover:opacity-10 transition-opacity" />
                    </Link>
                  </div>

                  {/* Right Column: Title, Stack, Narrative & Actions */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[var(--color-stone-subtle)]">
                          NO. 0{idx + 1}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-stone-muted)] bg-[var(--color-canvas-800)] border border-white/5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-paper-50)] mb-2">
                        <Link 
                          to={`${basePath}/projects/${project.id}`}
                          className="hover:text-[var(--color-accent)] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-[var(--color-stone-muted)] leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-[var(--color-stone-muted)] border-t border-white/10 pt-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-50)] block mb-0.5 font-medium">
                          {t('projects.problem')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed">{project.problem}</p>
                      </div>

                      <div className="bg-[var(--color-canvas-850)] p-3 rounded border-l-2 border-[var(--color-accent)]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] block mb-0.5 font-medium">
                          {t('projects.impact')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed text-[var(--color-paper-100)]">{project.impact}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to={`${basePath}/projects/${project.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold border border-white/20 hover:border-white/40 text-[var(--color-paper-50)] rounded transition-all active:scale-[0.98]"
                      >
                        <span>{t('projects.view_details')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-all active:scale-[0.98]"
                        >
                          <span>{t('projects.view_live')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </>
  );
}
