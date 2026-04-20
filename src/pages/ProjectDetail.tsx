import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getFeaturedProject } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { useLanguage } from '../lib/LanguageContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  const featuredProject = getFeaturedProject(language);
  const project = id === featuredProject.id ? featuredProject : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center flex-col gap-4 bg-slate-50 dark:bg-navy-800 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/" className="text-electric-blue hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-slate-50 dark:bg-navy-800 text-slate-800 dark:text-slate-200 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-electric-blue dark:hover:text-electric-blue transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{language === 'id' ? 'Kembali ke Portofolio' : 'Back to Portfolio'}</span>
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs sm:text-sm font-medium mb-4">
              {t('projects.featured')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs sm:text-sm text-cyan-600 dark:text-cyan-accent shadow-sm dark:shadow-none">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden mb-10 sm:mb-12 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl">
            <img src={project.image} alt={project.title} className="w-full h-auto object-cover aspect-video" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.description}
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {language === 'id' ? 'Fitur Utama' : 'Key Features'}
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                      <CheckCircle2 className="text-electric-blue shrink-0 mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="glass-card p-5 sm:p-6 rounded-2xl shadow-md dark:shadow-xl border border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {language === 'id' ? 'Tautan Proyek' : 'Project Links'}
                </h3>
                <div className="space-y-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-transparent rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center gap-3 text-slate-800 dark:text-white font-medium text-sm sm:text-base">
                      <Github size={20} />
                      <span>{t('projects.sourceCode')}</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-electric-blue dark:group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-electric-blue text-white rounded-xl hover:bg-blue-600 transition-colors group shadow-md"
                  >
                    <div className="flex items-center gap-3 font-medium text-sm sm:text-base">
                      <ExternalLink size={20} />
                      <span>{t('projects.viewDemo')}</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
