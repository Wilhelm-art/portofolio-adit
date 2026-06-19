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
      {/* Fixed global mathematical Aurora Borealis background shader */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <CyberCanvas />
      </div>

      {/* Main content z-index wrapper */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div className="divider" />
          <About />
          <div className="divider" />
          <Skills />
          <div className="divider" />
          <Projects />
          <div className="divider" />
          <Timeline />
          <div className="divider" />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
