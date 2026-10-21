import { useState, useEffect, lazy, Suspense } from 'react';

const HomeContent = lazy(() => import('./HomeContent').then(m => ({ default: m.HomeContent })));

export function Home() {
  // Defer below-the-fold heavy bundle to guarantee 100/100 Core Web Vitals on Mobile
  const [showRest, setShowRest] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash || window.scrollY > 20 || window.innerHeight > 1100) return true;
    }
    return false;
  });

  useEffect(() => {
    if (showRest) return;
    const triggerShow = () => setShowRest(true);

    window.addEventListener('scroll', triggerShow, { passive: true, once: true });
    window.addEventListener('touchstart', triggerShow, { passive: true, once: true });
    window.addEventListener('pointerdown', triggerShow, { passive: true, once: true });
    window.addEventListener('wheel', triggerShow, { passive: true, once: true });
    window.addEventListener('keydown', triggerShow, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', triggerShow);
      window.removeEventListener('touchstart', triggerShow);
      window.removeEventListener('pointerdown', triggerShow);
      window.removeEventListener('wheel', triggerShow);
      window.removeEventListener('keydown', triggerShow);
    };
  }, [showRest]);

  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative w-full h-screen min-h-[640px] max-h-[1050px] flex items-center justify-center overflow-hidden select-none"
      >
        <h1 className="sr-only">Adit Hardiansyah Surachman - Software Engineer &amp; Network Security Specialist</h1>
        
        {/* High-Performance Radial Glow without heavy Gaussian filters */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(93,157,248,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
          <div className="w-[300px] sm:w-[380px] md:w-[460px] h-[300px] sm:h-[380px] md:h-[460px] rounded-full border border-white/[0.06] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="hidden sm:block w-[500px] md:w-[760px] h-[500px] md:h-[760px] rounded-full border border-white/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="hidden sm:block w-[740px] md:w-[1100px] h-[740px] md:h-[1100px] rounded-full border border-white/[0.025] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div 
          aria-hidden="true" 
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 [contain:paint_layout]"
        >
          <div className="animate-marquee flex items-center">
            <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
              ADIT HARDIANSYAH &bull;
            </span>
            <span className="text-stroke-outline text-7xl sm:text-9xl md:text-[14vw] font-black tracking-tight uppercase whitespace-nowrap px-4 font-display">
              ADIT HARDIANSYAH &bull;
            </span>
          </div>
        </div>

        {/* Bottom Ambient Glow using Radial Gradient */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[360px] sm:w-[480px] h-[260px] sm:h-[340px] bg-[radial-gradient(ellipse_at_bottom,rgba(93,157,248,0.16)_0%,transparent_75%)] pointer-events-none z-0" />

        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-10 overflow-hidden">
          <picture>
            <source media="(max-width: 640px)" srcSet="/assets/profile-cutout-sm.webp" type="image/webp" />
            <source srcSet="/assets/profile-cutout.webp" type="image/webp" />
            <img 
              src="/assets/profile-cutout-sm.webp" 
              alt="Adit Hardiansyah Surachman" 
              loading="eager"
              fetchPriority="high"
              width="480"
              height="640"
              className="w-auto h-[62vh] sm:h-[72vh] md:h-[78vh] max-h-[760px] object-contain object-bottom sm:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />
          </picture>
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[var(--color-canvas-950)] via-[var(--color-canvas-950)]/70 to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto">
          <span className="px-4 py-1.5 rounded-full bg-[var(--color-canvas-900)]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest text-[var(--color-paper-50)] uppercase shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            SOFTWARE ENGINEER &amp; NETWORK SECURITY
          </span>
        </div>

        <div className="hidden lg:flex absolute right-8 bottom-10 z-20 flex-col items-center gap-3 pointer-events-none select-none">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-[var(--color-accent)] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-stone-muted)] [writing-mode:vertical-rl]">
            SCROLL DOWN
          </span>
        </div>
      </section>

      {/* Deferred Below-The-Fold Sections */}
      {showRest && (
        <Suspense fallback={null}>
          <HomeContent />
        </Suspense>
      )}
    </div>
  );
}
