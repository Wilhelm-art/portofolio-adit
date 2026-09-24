import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data';

export function Projects() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';

  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'systems' | 'frontend'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as const, label: isEnglish ? 'All Projects' : 'Semua Proyek' },
    { id: 'fullstack' as const, label: isEnglish ? 'Full-Stack' : 'Full-Stack Web' },
    { id: 'systems' as const, label: isEnglish ? 'Systems & DB' : 'Sistem & Basis Data' },
    { id: 'frontend' as const, label: isEnglish ? 'Frontend / Utility' : 'Frontend / Utilitas' },
  ];

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      project.title.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.stack.some(s => s.toLowerCase().includes(query));

    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'fullstack') return project.stack.some(s => ['Next.js', 'Next.js 16', 'Laravel', 'Laravel 10', 'Prisma', 'Express.js'].includes(s));
    if (activeCategory === 'systems') return project.stack.some(s => ['PostgreSQL', 'MySQL', 'Docker', 'Prisma'].includes(s));
    if (activeCategory === 'frontend') return project.stack.some(s => ['React', 'Tailwind CSS', 'Framer Motion'].includes(s));
    return true;
  });

  return (
    <>
      <Helmet>
        <title>{t('projects.title')} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={t('projects.subtitle')} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-white/[0.08] pb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-medium bg-[var(--color-accent-muted)] px-2.5 py-1 rounded border border-[var(--color-accent-border)]">
              {isEnglish ? "Engineered Systems & Products" : "Sistem & Aplikasi Produksi"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[var(--color-paper-50)] mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-stone-muted)] max-w-3xl leading-relaxed">
            {t('projects.subtitle')}
          </p>

          {/* Interactive Filter & Search Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
            
            {/* Category Pill Filters */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter kategori proyek">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all active:scale-[0.98] ${
                    activeCategory === cat.id
                      ? 'bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] font-semibold shadow-sm'
                      : 'bg-[var(--color-canvas-900)] text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] border border-white/[0.08] hover:bg-[var(--color-canvas-850)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[var(--color-stone-subtle)] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEnglish ? "Search by tech or name..." : "Cari teknologi atau nama..."}
                aria-label={isEnglish ? "Search projects" : "Cari proyek"}
                className="w-full bg-[var(--color-canvas-900)] border border-white/[0.08] rounded pl-9 pr-4 py-2 text-xs font-mono text-[var(--color-paper-50)] placeholder-[var(--color-stone-subtle)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </div>

          </div>
        </header>

        {/* Project Archive List */}
        <div className="space-y-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-lg">
              <p className="font-mono text-sm text-[var(--color-stone-muted)]">
                {isEnglish ? "No projects match the selected filter." : "Tidak ada proyek yang cocok dengan filter pencarian."}
              </p>
              <button
                type="button"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 text-xs font-mono text-[var(--color-accent)] hover:underline"
              >
                {isEnglish ? "Reset filter" : "Atur ulang filter"}
              </button>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="border border-white/[0.07] bg-[var(--color-canvas-900)] rounded-lg overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Visual Project Preview */}
                  <div className="lg:col-span-5">
                    <Link 
                      to={`${basePath}/projects/${project.id}`}
                      className="block relative aspect-[16/10] overflow-hidden rounded bg-[var(--color-canvas-850)] border border-white/[0.08] group"
                    >
                      <img 
                        src={project.screenshot} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
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
                              className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-stone-muted)] bg-[var(--color-canvas-800)] border border-white/[0.06] rounded"
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

                    <div className="space-y-3 text-xs sm:text-sm text-[var(--color-stone-muted)] border-t border-white/[0.08] pt-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-50)] block mb-0.5 font-medium">
                          {t('projects.problem')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed">{project.problem}</p>
                      </div>

                      <div className="bg-[var(--color-canvas-850)]/70 p-3.5 rounded-md border border-white/[0.06]">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)] block mb-1 font-medium">
                          {t('projects.impact')}
                        </span>
                        <p className="line-clamp-2 leading-relaxed text-[var(--color-paper-100)]">{project.impact}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        to={`${basePath}/projects/${project.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider font-medium border border-white/15 hover:border-white/30 text-[var(--color-paper-50)] hover:bg-[var(--color-canvas-850)] rounded transition-all active:scale-[0.98]"
                      >
                        <span>{t('projects.view_details')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-paper-50)] transition-colors active:scale-[0.98]"
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
          )))}
        </div>

      </div>
    </>
  );
}
