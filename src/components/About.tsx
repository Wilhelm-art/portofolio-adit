import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { ABOUT_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations';
import AnimatedCounter from './AnimatedCounter';

export default function About() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Text Content */}
          <motion.div variants={slideInRight} className="flex-1 w-full glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/5 to-cyan-accent/5 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {ABOUT_DATA.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
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
                href="https://drive.google.com/file/d/1hYE9VO-6FSNTNs8u2o9DthaKgkWcW497/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Download size={18} />
                <span>View Full CV</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
