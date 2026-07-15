import { useTranslation } from 'react-i18next';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to={`${basePath}/projects`} className="text-accent-red hover:text-white transition-colors">
          Return to Projects
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to={`${basePath}/projects`}
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">{project.title}</h1>
          <p className="text-xl text-gray-400 mb-8">{project.tagline}</p>

          <div className="aspect-video w-full rounded-xl overflow-hidden bg-base-800 border border-white/10 mb-12">
            <img 
              src={project.screenshot} 
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h2 className="text-2xl font-bold font-display mb-4">{t('projects.problem')}</h2>
                <p className="text-gray-300 leading-relaxed">{project.problem}</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold font-display mb-4">{t('projects.solution')}</h2>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold font-display mb-4">{t('projects.impact')}</h2>
                <p className="text-gray-300 leading-relaxed">{project.impact}</p>
              </section>
            </div>
            
            <div className="space-y-8">
              <div className="bg-base-800 p-6 rounded-lg border border-white/5">
                <h3 className="font-bold text-lg mb-4">{t('projects.tech_stack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-base-900 border border-white/10 rounded-full text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-accent-red hover:bg-accent-red/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('projects.view_live')}
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 border border-white/20 text-sm font-medium rounded-md text-white bg-base-800 hover:bg-base-700 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {t('projects.view_source')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </>
  );
}
