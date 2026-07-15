import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
        <meta name="description" content="Portfolio of full-stack web development and network security projects." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold font-display mb-12">{t('projects.title')}<span className="text-accent-red">.</span></h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-base-800 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
              >
                <Link to={`${basePath}/projects/${project.id}`} className="block relative aspect-video overflow-hidden bg-base-900">
                  {/* Fallback pattern if image is missing */}
                  <div className="absolute inset-0 bg-base-900 opacity-50"></div>
                  <img 
                    src={project.screenshot} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-display text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs font-mono text-gray-500 bg-base-900 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs font-mono text-gray-500 bg-base-900 px-2 py-1 rounded">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`${basePath}/projects/${project.id}`}
                    className="inline-flex items-center text-accent-red hover:text-white transition-colors text-sm font-medium mt-auto"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
