import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { EXPERIENCE_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer } from '../lib/animations';

export default function Timeline() {
  return (
    <section className="py-24 bg-navy-900/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience & <span className="text-gradient">Education</span>
            </h2>
            <p className="text-slate-400">My academic and professional journey so far.</p>
          </motion.div>

          <div className="relative">
            {/* Center Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            <div className="space-y-12">
              {EXPERIENCE_DATA.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.type === 'education' ? GraduationCap : item.type === 'experience' ? Briefcase : Award;
                
                return (
                  <motion.div 
                    key={item.id} 
                    variants={fadeInUp}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-navy-800 border-2 border-electric-blue flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                      <Icon size={18} className="text-electric-blue" />
                    </div>

                    {/* Content Box */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                      <div className="glass-card p-6 rounded-2xl hover:border-electric-blue/30 transition-colors group">
                        <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-cyan-accent mb-3">
                          {item.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-electric-blue transition-colors">
                          {item.title}
                        </h3>
                        <h4 className="text-slate-300 font-medium mb-3">{item.organization}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
