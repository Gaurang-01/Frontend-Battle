/**
 * NAVBAR COMPONENT
 * Semantic <header> + <nav> with glassmorphic backdrop.
 * Nav links use pure CSS ::after underline hover (150-200ms ease-out).
 * Icons sourced from: src/assets/icons.jsx (SVG assets folder)
 *   - IconXMark  → mobile menu close button (x-mark.svg)
 *   - IconSearch → search trigger button in desktop CTA bar & mobile header (search.svg)
 */
import { useState, useEffect } from 'react';
import { IconXMark, IconSearch } from '../assets/icons';

const NAV_LINKS = [
  { label: 'Platform', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'Docs',     href: '#docs'     },
  { label: 'About',    href: '#about'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'glass-card-strong border-b border-white/5 shadow-2xl shadow-canvas/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Brand */}
        <a
          href="#"
          className="font-mono font-bold text-lg tracking-wider flex items-center gap-2"
          aria-label="NeuralGrid – Home"
        >
          {/* SVG Logo Mark */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="6" fill="rgba(255,200,1,0.15)" />
            <path d="M7 7 L14 14 L21 7" stroke="#FFC801" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 21 L14 14 L21 21" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="14" cy="14" r="2" fill="#FFC801"/>
          </svg>
          <span className="text-shimmer">NEURALGRID</span>
        </a>

        {/* Desktop Links */}
        <ul role="list" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="nav-link font-sans text-sm font-medium text-mint/70 hover:text-arctic"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Search site"
            className="p-2 rounded-lg text-mint/70 hover:text-arctic hover:bg-white/5 transition-all duration-150 flex items-center justify-center"
          >
            <IconSearch size={18} aria-hidden="true" />
          </button>
          <a
            href="#"
            className="font-sans text-sm font-medium text-mint/70 hover:text-arctic transition-colors duration-150"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            id="nav-cta-btn"
            className="btn-glow font-mono text-sm font-semibold px-5 py-2.5 rounded-lg text-canvas"
            style={{ background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)' }}
          >
            Get Started →
          </a>
        </div>

        {/* Mobile menu trigger + search placeholder */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Search site"
            className="p-2 rounded-lg text-mint/70 hover:text-arctic hover:bg-white/5 transition-all duration-150 flex items-center justify-center"
          >
            <IconSearch size={18} aria-hidden="true" />
          </button>
          <button
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex items-center justify-center p-2 rounded-lg transition-colors duration-150 hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              /* X-Mark SVG from assets */
              <IconXMark
                size={20}
                color="rgba(217,232,226,0.8)"
                aria-hidden="true"
              />
            ) : (
              /* Hamburger lines */
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="block w-5 h-0.5 bg-mint transition-all duration-200"
                  />
                ))}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={`md:hidden glass-card-strong border-t border-white/5 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul role="list" className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-sans text-sm font-medium text-mint/80 hover:text-arctic transition-colors duration-150 block"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-white/5">
            <a
              href="#pricing"
              className="btn-glow font-mono text-sm font-semibold px-5 py-2.5 rounded-lg text-canvas inline-block"
              style={{ background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started →
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
