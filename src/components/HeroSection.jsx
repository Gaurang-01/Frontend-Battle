/**
 * HERO SECTION — Redesigned
 * Asymmetric editorial split layout: left text block, right terminal widget.
 * WAAPI entrance animations completing within 500ms.
 * Canvas neural grid on full background.
 * Semantic <section> > <h1> for SEO.
 *
 * Icons sourced from: src/assets/icons.jsx
 *   - IconCubeSolid  → hero badge
 *   - IconChevronDown → scroll caret
 */
import { useEffect, useRef } from 'react';
import { IconCubeSolid, IconChevronDown } from '../assets/icons';

const TERMINAL_LINES = [
  { prefix: '$', text: 'neuralgrid init --region us-east-1', color: '#D9E8E2', delay: 600 },
  { prefix: '›', text: 'Connecting to Synapse Mesh...', color: '#FFC801', delay: 900 },
  { prefix: '›', text: 'StreamWeaver: 12 pipelines active', color: '#D9E8E2', delay: 1200 },
  { prefix: '✓', text: 'PhantomCache warmed — 96.4% hit rate', color: '#4ade80', delay: 1500 },
  { prefix: '›', text: 'Ingesting 847 GB/s across 3 regions', color: '#D9E8E2', delay: 1800 },
  { prefix: '✓', text: 'Latency: 0.8ms avg · SLA: 99.97%', color: '#4ade80', delay: 2100 },
  { prefix: '$', text: '_', color: '#FFC801', delay: 2400, blink: true },
];

export default function HeroSection() {
  const heroRef      = useRef(null);
  const canvasRef    = useRef(null);
  const terminalRef  = useRef(null);

  // ── WAAPI entrance — staggered per data-animate delay ──
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.querySelectorAll('[data-animate]').forEach((target) => {
      const delay = parseInt(target.dataset.animate, 10) || 0;
      target.animate(
        [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 420, delay, easing: 'cubic-bezier(0.0,0.0,0.2,1)', fill: 'forwards' }
      );
    });
  }, []);

  // ── Terminal typewriter effect ──
  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        const row = document.createElement('div');
        row.className = 'terminal-row';
        row.style.cssText = `
          display: flex; gap: 8px; font-family: 'JetBrains Mono', monospace;
          font-size: 12px; line-height: 1.7; opacity: 0;
          animation: termFadeIn 200ms ease-out forwards;
        `;

        const prefix = document.createElement('span');
        prefix.textContent = line.prefix;
        prefix.style.color = line.prefix === '✓' ? '#4ade80' : 'rgba(255,200,1,0.6)';
        prefix.style.flexShrink = '0';

        const text = document.createElement('span');
        text.style.color = line.color;
        if (line.blink) {
          text.style.animation = 'cursorBlink 1s step-end infinite';
        }
        text.textContent = line.text;

        row.appendChild(prefix);
        row.appendChild(text);
        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
      }, line.delay);
    });
  }, []);

  // ── Neural canvas background ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 28 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.6,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,200,1,${0.10 * (1 - d / 140)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,200,1,0.35)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-x-clip"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5, zIndex: 1 }}
      />

      {/* Ambient orbs */}
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,200,1,0.05) 0%, transparent 65%)', animation: 'float-orb 12s ease-in-out infinite', willChange: 'transform' }} />
      <div aria-hidden="true" className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(17,76,90,0.4) 0%, transparent 65%)', animation: 'float-orb-2 16s ease-in-out infinite', willChange: 'transform' }} />

      {/* Scan line */}
      <div aria-hidden="true" className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.25), transparent)', animation: 'scan-line 8s linear infinite' }} />

      {/* ── MAIN CONTENT — Asymmetric split ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Editorial text block ── */}
          <div>
            {/* Badge */}
            <div
              data-animate="60"
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2.5 mb-6"
            >
              <div className="h-px w-8 bg-forsythia/60" />
              <span className="font-mono text-xs text-forsythia/80 tracking-[0.2em] uppercase">
                AI-Powered · Real-Time · Zero-Latency
              </span>
            </div>

            {/* H1 — three-line staggered editorial treatment */}
            <h1
              id="hero-heading"
              className="font-mono font-bold leading-none tracking-tight mb-5"
            >
              <span
                data-animate="100"
                style={{ opacity: 0, display: 'block' }}
                className="text-[clamp(2.8rem,6vw,5.5rem)] text-arctic"
              >
                AUTOMATE
              </span>
              <span
                data-animate="160"
                style={{ opacity: 0, display: 'block' }}
                className="text-[clamp(1.6rem,4vw,3.5rem)] text-forsythia pl-[0.1em]"
              >
                intelligence
              </span>
              <span
                data-animate="220"
                style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '0.4em' }}
                className="text-[clamp(2.4rem,5.5vw,4.5rem)] text-arctic/30 font-light"
              >
                at scale
                <span className="text-[clamp(1rem,2vw,1.5rem)] text-forsythia/50 font-mono font-normal tracking-widest self-end mb-[0.25em]">
                  v2.4
                </span>
              </span>
            </h1>

            {/* Horizontal rule */}
            <div
              data-animate="260"
              style={{ opacity: 0 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,200,1,0.3)' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-forsythia/40" />
            </div>

            {/* Subtext */}
            <p
              data-animate="300"
              style={{ opacity: 0 }}
              className="font-sans text-sm md:text-base text-mint/60 max-w-lg leading-relaxed mb-6"
            >
              NeuralGrid orchestrates your entire data pipeline with adaptive AI models —
              delivering millisecond-precision insights across distributed compute clusters.
              No infrastructure overhead. No ETL scripts. Just results.
            </p>

            {/* CTAs */}
            <div
              data-animate="360"
              style={{ opacity: 0 }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-8"
            >
              <a
                href="#pricing"
                id="hero-primary-cta"
                className="btn-glow btn-shimmer font-mono font-semibold text-sm px-7 py-3.5 rounded-lg text-canvas tracking-wide"
                style={{ background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)' }}
              >
                Start Free — $0/mo →
              </a>
              <a
                href="#features"
                id="hero-secondary-cta"
                className="group font-mono text-sm font-medium px-7 py-3.5 rounded-lg text-arctic/60 hover:text-arctic border border-white/8 hover:border-white/20 transition-all duration-150 flex items-center gap-2"
              >
                Watch Demo
                <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-150">▶</span>
              </a>
            </div>

            {/* Stats — compact horizontal */}
            <div
              data-animate="420"
              style={{ opacity: 0 }}
              className="flex items-center gap-6 flex-wrap"
            >
              {[
                { value: '99.97%', label: 'Uptime SLA' },
                { value: '<2ms',   label: 'Avg Latency' },
                { value: '10TB+',  label: 'Daily Throughput' },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-6 bg-white/8" />}
                  <div>
                    <div className="stat-value font-mono font-bold text-forsythia text-lg leading-none">{value}</div>
                    <div className="font-sans text-[10px] text-mint/40 mt-0.5 tracking-wide uppercase">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Terminal widget ── */}
          <div
            data-animate="200"
            style={{ opacity: 0 }}
            className="hidden lg:block"
          >
            <div
              className="rounded-xl overflow-hidden border border-white/8"
              style={{ background: 'rgba(17,40,54,0.8)', backdropFilter: 'blur(20px)' }}
            >
              {/* Terminal chrome bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6"
                style={{ background: 'rgba(23,44,60,0.6)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="font-mono text-[10px] text-mint/30 tracking-widest">
                  neuralgrid — bash
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  <span className="font-mono text-[9px] text-mint/30">LIVE</span>
                </div>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="p-5 overflow-y-auto"
                style={{ minHeight: '220px', maxHeight: '260px' }}
                aria-label="Live platform status terminal"
              />

              {/* Metrics bar below terminal */}
              <div className="border-t border-white/6 grid grid-cols-3 divide-x divide-white/6">
                {[
                  { label: 'PIPELINES', value: '12', color: '#FFC801' },
                  { label: 'THROUGHPUT', value: '847 GB/s', color: '#FF9932' },
                  { label: 'REGIONS', value: '3', color: '#D9E8E2' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="px-4 py-3 text-center">
                    <div className="font-mono font-bold text-sm" style={{ color }}>{value}</div>
                    <div className="font-mono text-[9px] text-mint/30 tracking-widest mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge below terminal */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] text-mint/35 tracking-widest">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ animation: 'float-orb 3s ease-in-out infinite', opacity: 0.35 }}
      >
        <div className="font-mono text-[9px] text-mint/60 tracking-[0.25em]">SCROLL</div>
        <IconChevronDown size={16} color="rgba(217,232,226,0.5)" aria-hidden="true" />
      </div>
    </section>
  );
}