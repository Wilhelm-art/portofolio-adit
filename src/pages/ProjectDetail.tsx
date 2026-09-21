import { useTranslation } from 'react-i18next';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en');
  const basePath = isEnglish ? '/en' : '';
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold font-display text-[var(--color-paper-50)] mb-4">
          {isEnglish ? "Project Not Found" : "Proyek Tidak Ditemukan"}
        </h1>
        <p className="text-[var(--color-stone-muted)] text-sm mb-8">
          {isEnglish ? "The requested case study could not be located." : "Studi kasus yang diminta tidak tersedia dalam arsip."}
        </p>
        <Link 
          to={`${basePath}/projects`} 
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-terracotta)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEnglish ? "Back to Projects" : "Kembali ke Daftar Proyek"}</span>
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "operatingSystem": "Web",
    "applicationCategory": "WebApplication",
    "description": project.tagline,
    "url": project.liveUrl,
    "author": {
      "@type": "Person",
      "name": "Adit Hardiansyah Surachman"
    }
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | Adit Hardiansyah Surachman</title>
        <meta name="description" content={project.tagline} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          
          {/* Back Navigation */}
          <Link 
            to={`${basePath}/projects`}
            className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[var(--color-stone-muted)] hover:text-[var(--color-paper-50)] transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>{isEnglish ? "Back to Projects Archive" : "Kembali ke Arsip Proyek"}</span>
          </Link>
          
          {/* Project Header */}
          <header className="border-b border-[rgba(245,242,235,0.08)] pb-10 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-stone-muted)]">
                {isEnglish ? "Case Study" : "Studi Kasus Sistem"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-[var(--color-paper-50)] mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-stone-muted)] max-w-3xl leading-relaxed mb-8">
              {project.tagline}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] hover:bg-[var(--color-paper-100)] rounded-sm transition-colors shadow-sm"
              >
                <span>{t('projects.view_live')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </header>

          {/* Project Visual / Architecture Card */}
          <div className="border border-[rgba(245,242,235,0.1)] bg-[var(--color-canvas-900)] rounded-sm overflow-hidden mb-16">
            <div className="relative aspect-video w-full bg-[var(--color-canvas-850)] flex items-center justify-center">
              <img 
                src={project.screenshot} 
                alt={`Tampilan antarmuka ${project.title}`}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to clean architectural typography box instead of stock photo
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="p-8 text-center flex flex-col items-center justify-center">
                        <span class="font-mono text-xs text-[var(--color-stone-subtle)] uppercase tracking-widest mb-2">Architectural Blueprint</span>
                        <h4 class="text-xl font-bold text-[var(--color-paper-50)] mb-3">${project.title}</h4>
                        <div class="flex flex-wrap justify-center gap-2 max-w-md">
                          ${project.stack.map(s => `<span class="px-2 py-0.5 text-[11px] font-mono bg-[var(--color-canvas-800)] text-[var(--color-stone-muted)] rounded-sm">${s}</span>`).join('')}
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

          {/* Detailed Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content Columns */}
            <div className="lg:col-span-8 space-y-12">
              
              <section className="border-b border-[rgba(245,242,235,0.08)] pb-10">
                <h2 className="text-xl font-bold font-display text-[var(--color-paper-50)] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
                  {t('projects.problem')}
                </h2>
                <p className="text-base text-[var(--color-stone-muted)] leading-relaxed">
                  {project.problem}
                </p>
              </section>

              <section className="border-b border-[rgba(245,242,235,0.08)] pb-10">
                <h2 className="text-xl font-bold font-display text-[var(--color-paper-50)] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
                  {t('projects.solution')}
                </h2>
                <p className="text-base text-[var(--color-stone-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold font-display text-[var(--color-paper-50)] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
                  {t('projects.impact')}
                </h2>
                <div className="bg-[var(--color-canvas-900)] border-l-2 border-[var(--color-terracotta)] p-6 rounded-sm">
                  <p className="text-base text-[var(--color-paper-50)] leading-relaxed font-medium">
                    {project.impact}
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar Metadata */}
            <div className="lg:col-span-4 space-y-8">
              
              <div className="border border-[rgba(245,242,235,0.08)] bg-[var(--color-canvas-900)] p-6 rounded-sm">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-paper-50)] mb-4">
                  {t('projects.tech_stack')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-[var(--color-canvas-850)] text-[var(--color-stone-muted)] rounded-sm border border-[rgba(245,242,235,0.06)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <div className="border border-[rgba(245,242,235,0.08)] bg-[var(--color-canvas-900)] p-6 rounded-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-paper-50)] mb-2">
                    {isEnglish ? "Live Deployment" : "Status Penerapan"}
                  </h3>
                  <p className="text-xs text-[var(--color-stone-muted)] mb-4 leading-relaxed">
                    {isEnglish ? "Production deployment actively hosted and monitored." : "Aplikasi aktif dan dapat diuji secara langsung pada tautan publik."}
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-terracotta)] hover:underline"
                  >
                    <span>{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            </div>

          </div>

        </motion.div>
      </article>
    </>
  );
}
