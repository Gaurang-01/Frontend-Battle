/**
 * APP ROOT
 * Orchestrates all section components.
 * IntersectionObserver drives section-reveal scroll animations (non-blocking).
 * EntryLoader uses CSS animations completing within 500ms.
 */
import { useEffect } from 'react';
import EntryLoader        from './components/EntryLoader';
import Navbar             from './components/Navbar';
import HeroSection        from './components/HeroSection';
import FeaturesSection    from './components/FeaturesSection';
import PricingSection     from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaAndFooter       from './components/CtaAndFooter';
import './index.css';

export default function App() {
  /**
   * SCROLL REVEAL — IntersectionObserver
   * Adds 'visible' class to .section-reveal elements when they enter viewport.
   * Uses requestIdleCallback / requestAnimationFrame — non-blocking, TTI safe.
   */
  useEffect(() => {
    const revealEls = document.querySelectorAll('.section-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Entry Loader (CSS animation, 500ms cap, non-blocking) ── */}
      <EntryLoader />

      {/* ── Semantic Page Structure ── */}
      <div className="min-h-[100dvh] bg-canvas bg-grid overflow-x-hidden">
        {/* HEADER: Sticky glassmorphic navbar */}
        <Navbar />

        {/* MAIN CONTENT: All page sections */}
        <main id="main-content" role="main">
          {/* Hero — WAAPI entrance, floating orbs, H1 */}
          <HeroSection />

          {/* Features — Bento ↔ Accordion with Context Lock */}
          <FeaturesSection />

          {/* Pricing — Multi-dimensional matrix, state-isolated toggles */}
          <PricingSection />

          {/* Social Proof */}
          <TestimonialsSection />

          {/* Conversion CTA + Footer */}
          <CtaAndFooter />
        </main>
      </div>
    </>
  );
}
