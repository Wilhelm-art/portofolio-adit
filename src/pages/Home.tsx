import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CyberCanvas from '../components/CyberCanvas';

export default function Home() {
  return (
    <div className="min-h-[100svh] relative bg-background text-foreground select-text transition-colors duration-300">
      {/* Background canvas subtly sits behind */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none opacity-40 dark:opacity-20 transition-opacity duration-700">
        <CyberCanvas />
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        <Navbar />
        <main className="flex flex-col gap-32 sm:gap-48 pb-32">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
