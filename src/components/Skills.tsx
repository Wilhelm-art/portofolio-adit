import { motion } from 'motion/react';
import { SKILLS_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { ShieldCheck, Code2, Network, Award } from 'lucide-react';

const icons = {
  Security: ShieldCheck,
  Programming: Code2,
  Infrastructure: Network,
  Certification: Award,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-navy-900/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My Tech <span className="text-gradient">Arsenal</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive list of tools and technologies I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS_DATA.map((category, idx) => {
              const Icon = icons[category.category as keyof typeof icons] || Code2;
              return (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-px bg-gradient-to-r from-electric-blue/50 to-cyan-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/5 rounded-lg text-electric-blue">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-navy-800 border border-white/5 rounded-full text-sm text-slate-300 hover:border-electric-blue/50 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
