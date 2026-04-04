import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { ABOUT_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations';
import AnimatedCounter from './AnimatedCounter';

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Left: Illustration/Photo */}
          <motion.div variants={slideInLeft} className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card group">
              <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 to-cyan-accent/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=800&auto=format&fit=crop" 
                alt="Developer coding" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-electric-blue rounded-full blur-2xl opacity-50" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-cyan-accent rounded-full blur-3xl opacity-30" />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div variants={slideInRight} className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {ABOUT_DATA.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {ABOUT_DATA.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-3xl md:text-4xl font-bold text-white flex items-baseline">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-electric-blue">{stat.suffix}</span>
                  </div>
                  <span className="text-sm text-slate-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <a
              href="/portofolio-adit/Adit_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Download size={18} />
              <span>Download Full CV</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
