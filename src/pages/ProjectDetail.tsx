import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FEATURED_PROJECT } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';

export default function ProjectDetail() {
  const { id } = useParams();
  
  // In a real app, we would fetch the project based on ID.
  // For now, we just use the featured project data if it matches.
  const project = id === FEATURED_PROJECT.id ? FEATURED_PROJECT : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/" className="text-electric-blue hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-800 text-slate-200 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-electric-blue transition-colors mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-4">
              {project.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-cyan-accent">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img src={project.image} alt={project.title} className="w-full h-auto object-cover aspect-video" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="text-electric-blue shrink-0 mt-1" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Project Links</h3>
                <div className="space-y-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3 text-white font-medium">
                      <Github size={20} />
                      <span>Source Code</span>
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-electric-blue text-white rounded-xl hover:bg-blue-600 transition-colors group"
                  >
                    <div className="flex items-center gap-3 font-medium">
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
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
