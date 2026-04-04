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

          {/* Featured Project (Thesis) */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="glass-card rounded-3xl overflow-hidden relative group border-electric-blue/30">
              {/* Glowing border effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-electric-blue to-cyan-accent opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Ribbon */}
              <div className="absolute top-6 -right-12 bg-gradient-to-r from-electric-blue to-cyan-accent text-white text-xs font-bold px-12 py-1 rotate-45 shadow-lg z-20">
                THESIS
              </div>

              <div className="flex flex-col lg:flex-row relative z-10 bg-navy-900/90">
                {/* Image */}
                <div className="lg:w-1/2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={FEATURED_PROJECT.image} 
                    alt={FEATURED_PROJECT.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Content */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-medium mb-4 w-max">
                    {FEATURED_PROJECT.badge}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {FEATURED_PROJECT.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 line-clamp-4">
                    {FEATURED_PROJECT.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {FEATURED_PROJECT.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-cyan-accent bg-cyan-accent/10 px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Link
                      to={FEATURED_PROJECT.demo}
                      className="px-6 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      View Case Study
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href={FEATURED_PROJECT.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {OTHER_PROJECTS.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1">
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
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-electric-blue flex items-center gap-2 text-sm font-medium transition-colors ml-auto"
                    >
                      Live Demo
                      <ExternalLink size={16} />
                    </a>
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
