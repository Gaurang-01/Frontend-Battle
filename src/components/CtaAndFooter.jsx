/**
 * CTA SECTION + FOOTER — Redesigned
 * CTA: editorial horizontal layout (not a centered card)
 * Footer: full dark panel with large wordmark, gradient divider, proper link columns
 *
 * Icons sourced from: src/assets/icons.jsx
 *   - IconLinkSolid  → CTA early-access badge (link-solid.svg)
 *   - IconChevronUp  → Footer “Back to top” button (chevron-up.svg)
 */
import { useRef, useCallback } from 'react';
import { IconLinkSolid, IconChevronUp } from '../assets/icons';

export default function CtaAndFooter() {
  const emailRef    = useRef(null);
  const feedbackRef = useRef(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const email = emailRef.current?.value?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (feedbackRef.current) {
        feedbackRef.current.textContent = 'Enter a valid work email.';
        feedbackRef.current.style.color = '#FF9932';
      }
      return;
    }
    if (feedbackRef.current) {
      feedbackRef.current.textContent = `✓ You're in. We'll reach you at ${email}`;
      feedbackRef.current.style.color = '#FFC801';
    }
    if (emailRef.current) emailRef.current.value = '';
  }, []);

  const FOOTER_LINKS = {
    Product:    ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Developers: ['API Docs', 'SDKs', 'Status Page', 'GitHub'],
    Company:    ['About', 'Blog', 'Careers', 'Press Kit'],
    Legal:      ['Privacy', 'Terms', 'Security', 'GDPR'],
  };

  return (
    <>
      {/* ── CTA SECTION ── */}
      <section
        id="cta"
        aria-labelledby="cta-heading"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        {/* Gradient accent line at top */}
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.3), transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Horizontal editorial layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 items-center">

            {/* Left: Copy */}
            <div className="section-reveal">
              <div className="flex items-center gap-3 mb-6">
                <IconLinkSolid size={14} color="#FF9932" aria-hidden="true" />
                <span className="font-mono text-xs text-saffron tracking-[0.2em] uppercase">
                  Limited Early Access
                </span>
              </div>

              <h2
                id="cta-heading"
                className="font-mono font-bold text-4xl md:text-5xl text-arctic leading-[1.05] tracking-tight mb-6"
              >
                Deploy faster.<br />
                <span className="text-shimmer">Scale smarter.</span>
              </h2>

              <p className="font-sans text-mint/55 text-lg leading-relaxed max-w-md mb-0">
                Join 10,000+ engineers shipping ML-powered data products at 10× velocity.
                14-day free trial. No card required.
              </p>
            </div>

            {/* Right: Form */}
            <div className="section-reveal">
              {/* Form card */}
              <div
                className="rounded-2xl p-8 border border-white/8"
                style={{ background: 'rgba(17,76,90,0.2)', backdropFilter: 'blur(16px)' }}
              >
                <p className="font-mono text-sm text-arctic/70 mb-5">
                  Start your free trial
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Early access signup"
                  className="flex flex-col gap-3 mb-3"
                >
                  <label htmlFor="cta-email" className="sr-only">
                    Your work email address
                  </label>
                  <input
                    ref={emailRef}
                    id="cta-email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="font-mono text-sm text-arctic placeholder-mint/25 bg-white/4 border border-white/8 rounded-xl px-5 py-3.5 focus:outline-none focus:border-forsythia/40 transition-colors duration-150 w-full"
                  />
                  <button
                    type="submit"
                    id="cta-submit-btn"
                    className="btn-glow font-mono text-sm font-semibold px-6 py-3.5 rounded-xl text-canvas w-full"
                    style={{ background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)' }}
                  >
                    Get Early Access →
                  </button>
                </form>

                <p ref={feedbackRef} role="status" aria-live="polite" className="font-mono text-xs min-h-[1.1rem] text-mint/40" />

                {/* Trust signals */}
                <div className="mt-5 pt-5 border-t border-white/6 grid grid-cols-3 gap-2">
                  {[
                    { icon: '🔒', text: 'No card required' },
                    { icon: '⚡', text: 'Deploy in 5 mins' },
                    { icon: '↩', text: 'Cancel anytime' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="text-center">
                      <div className="text-base mb-0.5">{icon}</div>
                      <div className="font-mono text-[9px] text-mint/30 tracking-wide leading-tight">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        role="contentinfo"
        aria-label="Site footer"
        className="relative overflow-hidden"
        style={{ background: '#111f2a' }}
      >
        {/* Top gradient separator */}
        <div aria-hidden="true" className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,1,0.25) 30%, rgba(255,153,50,0.25) 70%, transparent 100%)' }} />

        {/* Large wordmark background */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none overflow-hidden"
          style={{ height: '160px' }}
        >
          <div
            className="font-mono font-bold text-[clamp(5rem,14vw,11rem)] leading-none tracking-tight select-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,200,1,0.06)',
              marginBottom: '-0.15em',
            }}
          >
            NEURALGRID
          </div>
        </div>

        {/* Main footer content */}
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">

          {/* Top row: brand + nav */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2">
              <div className="font-mono font-bold text-xl text-arctic mb-1 tracking-wider">
                NEURAL<span className="text-forsythia">GRID</span>
              </div>
              <p className="font-sans text-xs text-mint/35 leading-relaxed mb-5 max-w-[220px]">
                AI-native data automation for the next generation of intelligent applications.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="#" aria-label="NeuralGrid on GitHub"
                  className="text-mint/25 hover:text-mint/60 transition-colors duration-150">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a href="#" aria-label="NeuralGrid on X"
                  className="text-mint/25 hover:text-mint/60 transition-colors duration-150">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="NeuralGrid on LinkedIn"
                  className="text-mint/25 hover:text-mint/60 transition-colors duration-150">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <h3 className="font-mono text-[10px] font-semibold text-mint/40 tracking-[0.2em] mb-4 uppercase">
                  {category}
                </h3>
                <ul role="list" className="flex flex-col gap-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-sm text-mint/35 hover:text-arctic transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-6" style={{ background: 'rgba(217,232,226,0.05)' }} />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[10px] text-mint/20 tracking-wide">
              © 2026 NeuralGrid, Inc. All rights reserved. · SOC 2 Type II Certified
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                <span className="font-mono text-[10px] text-mint/25 tracking-wide">All systems operational</span>
              </div>
              <span className="font-mono text-[10px] text-mint/20">v2.4.1</span>
              <button
                onClick={scrollToTop}
                className="flex items-center justify-center p-1.5 rounded bg-white/5 border border-white/10 text-mint/50 hover:text-arctic hover:bg-white/10 transition-all duration-150 cursor-pointer"
                aria-label="Scroll to top"
              >
                <IconChevronUp size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}