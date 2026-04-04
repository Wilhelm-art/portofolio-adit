import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CONTACT_DATA } from '../lib/constants';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Build Something <span className="text-gradient">Together</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={slideInLeft} className="lg:w-1/3 space-y-6">
              <div className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-lg group-hover:bg-electric-blue group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <a href={`mailto:${CONTACT_DATA.email}`} className="text-slate-400 hover:text-electric-blue transition-colors">
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-lg group-hover:bg-electric-blue group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">WhatsApp</h3>
                  <p className="text-slate-400">{CONTACT_DATA.phone}</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-start gap-4 group hover:border-electric-blue/30 transition-colors">
                <div className="p-3 bg-electric-blue/10 text-electric-blue rounded-lg group-hover:bg-electric-blue group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Location</h3>
                  <p className="text-slate-400">{CONTACT_DATA.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={slideInRight} className="lg:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors resize-none"
                    placeholder="Hello Adit, I would like to discuss..."
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-electric-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400">
                    <CheckCircle size={20} />
                    <p>Message sent successfully! I'll get back to you soon.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
                    <AlertCircle size={20} />
                    <p>Failed to send message. Please try again later.</p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
