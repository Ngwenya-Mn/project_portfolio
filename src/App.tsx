import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleCanvas from './components/ParticleCanvas';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Ensure your CSS is imported (usually done in main.tsx, but safe to have here)
import './index.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * This component bridges Lenis smooth scrolling with GSAP ScrollTrigger.
 * Without this, GSAP won't know when Lenis is scrolling, and animations will break.
 */
function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Tell ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis's animation frame
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.15 }}>
      {/* Crucial: Syncs smooth scroll with GSAP */}
      <LenisGSAPSync />

      {/* Particle Background - fixed, full page */}
      <ParticleCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </ReactLenis>
  );
}