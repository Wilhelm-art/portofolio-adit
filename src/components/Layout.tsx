import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas-950)] text-[var(--color-paper-50)] selection:bg-[var(--color-accent)]/30 selection:text-white">
      {/* Skip to Content link for accessibility (antislop-human) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[var(--color-paper-50)] text-[var(--color-canvas-950)] font-semibold px-4 py-2 text-xs font-mono uppercase tracking-wider rounded shadow-lg"
      >
        Skip to main content
      </a>
      
      <Navbar />
      <main id="main-content" className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
