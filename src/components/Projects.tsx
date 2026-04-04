import { motion } from 'motion/react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_PROJECT, OTHER_PROJECTS } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl">
              A selection of my best work, from academic research to full-stack applications.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Project */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden group flex flex-col lg:col-span-1">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-electric-blue to-cyan-accent text-white text-[10px] font-bold px-3 py-1 rounded-full z-20 shadow-lg">
                  THESIS
                </div>
                <div className="text-white/20 font-bold text-2xl tracking-tighter opacity-50 group-hover:opacity-80 transition-opacity">SiKeuMas</div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                  {FEATURED_PROJECT.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {FEATURED_PROJECT.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {FEATURED_PROJECT.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                  <a
                    href={FEATURED_PROJECT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {FEATURED_PROJECT.demo !== '#' && (
                    <a
                      href={FEATURED_PROJECT.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-electric-blue flex items-center gap-2 text-sm font-medium transition-colors ml-auto"
                    >
                      Live Demo
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Other Projects */}
            {OTHER_PROJECTS.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8 text-center">
                  <div className="text-white/20 font-bold text-lg tracking-widest opacity-50 group-hover:opacity-80 transition-opacity uppercase px-4 line-clamp-2">{project.title}</div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-electric-blue flex items-center gap-2 text-sm font-medium transition-colors ml-auto"
                      >
                        Live Demo
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  );
}
