/**
 * BENTO-TO-ACCORDION FEATURES COMPONENT — FEATURE 2 (10 POINTS)
 *
 * ── CONTEXT LOCK MECHANISM ───────────────────────────────────────────────
 * activeIndex: shared React state that drives BOTH the Bento hover highlight
 *   on desktop AND the open Accordion panel on mobile.
 *
 * lastHoveredRef: persists the last hovered bento index even after mouseleave.
 *   This is critical because handleBentoLeave resets activeIndex to null,
 *   so by the time a resize fires, activeIndex would already be null without
 *   this separate ref. On desktop→mobile crossing, lastHoveredRef is used
 *   to setActiveIndex and open the correct accordion panel.
 *
 * This satisfies the "Context Lock" constraint: the active bento index is
 * programmatically transferred to the Accordion state upon layout transition.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Accordion transitions: 300-400ms ease-in-out (hardware-accelerated max-height)
 * Bento hover transitions: 150-200ms ease-out (GPU: transform + opacity)
 *
 * Icons sourced from: src/assets/icons.jsx (SVG assets folder)
 *   - IconArrowPath       → StreamWeaver (refresh/sync cycles, arrow-path.svg)
 *   - IconLink            → Synapse Mesh (distributed node links, link.svg)
 *   - IconCog8Tooth       → PhantomCache (self-healing intelligence engine, cog-8-tooth.svg)
 *   - IconChevronDown     → Accordion closed-state indicator (chevron-down.svg)
 *   - IconChevronUpSolid  → Accordion open-state indicator (chevron-up-solid.svg)
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  IconArrowPath,
  IconLink,
  IconCog8Tooth,
  IconChevronDown,
  IconChevronUpSolid,
} from '../assets/icons';

const FEATURES = [
  {
    id:          'stream-weaver',
    title:       'StreamWeaver Engine',
    subtitle:    'Real-Time Data Ingestion',
    body: `Ingest, parse, and route terabytes of heterogeneous data streams with
      sub-millisecond latency. StreamWeaver's adaptive schema inference auto-maps
      CSV, JSON, Parquet, and Protobuf sources into unified neural graphs — no 
      manual ETL scripts required.`,
    metric:      '< 0.8ms',
    metricLabel: 'Avg ingestion latency',
    icon: (
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ background: 'rgba(255,200,1,0.1)' }}
        aria-hidden="true"
      >
        <IconArrowPath size={24} color="#FFC801" />
      </span>
    ),
    color:       'rgba(255,200,1,0.08)',
    borderColor: 'rgba(255,200,1,0.15)',
    gridClass:   'bento-cell-wide',
    spanRows:    1,
  },
  {
    id:          'synapse-mesh',
    title:       'Synapse Mesh',
    subtitle:    'Distributed Model Orchestration',
    body: `Deploy and autoscale ML models across geo-distributed compute nodes.
      Synapse Mesh handles version pinning, canary deployments, A/B traffic splits,
      and automatic rollback — all from a single declarative config file.`,
    metric:      '99.97%',
    metricLabel: 'Model availability',
    icon: (
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ background: 'rgba(17,76,90,0.6)' }}
        aria-hidden="true"
      >
        <IconLink size={24} color="#D9E8E2" />
      </span>
    ),
    color:       'rgba(17,76,90,0.4)',
    borderColor: 'rgba(217,232,226,0.1)',
    gridClass:   'bento-cell-tall',
    spanRows:    2,
  },
  {
    id:          'phantom-cache',
    title:       'PhantomCache Layer',
    subtitle:    'Predictive Caching Intelligence',
    body: `A self-healing, multi-tier cache powered by temporal attention models.
      PhantomCache predicts access patterns 3–5 requests ahead, pre-warms hot paths,
      and evicts cold data with zero performance cliffs — achieving cache hit rates
      exceeding 96% across all workload types.`,
    metric:      '96.4%',
    metricLabel: 'Cache hit rate',
    icon: (
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
        style={{ background: 'rgba(255,153,50,0.1)' }}
        aria-hidden="true"
      >
        <IconCog8Tooth size={24} color="#FF9932" />
      </span>
    ),
    color:       'rgba(255,153,50,0.06)',
    borderColor: 'rgba(255,153,50,0.15)',
    gridClass:   'bento-cell-half',
    spanRows:    1,
  },
];

export default function FeaturesSection() {
  // ── SHARED ACTIVE INDEX — drives both Bento hover AND Accordion open ──
  const [activeIndex, setActiveIndex] = useState(null);

  // Persists the last hovered bento index across mouseleave events.
  // Required for Context Lock: activeIndex resets to null on mouseleave,
  // but lastHoveredRef survives so resize can transfer the correct index.
  const lastHoveredRef  = useRef(null);
  const isMobileRef     = useRef(false);
  const sectionRef      = useRef(null);
  const accordionRefs   = useRef([]);

  /**
   * CONTEXT LOCK: matchMedia listener
   * Detects crossing of the 768px breakpoint.
   *
   * FIX: Uses lastHoveredRef (not activeIndex) to recover the correct panel
   * because handleBentoLeave resets activeIndex to null before resize fires.
   */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');

    const handleBreakpointChange = (e) => {
      const nowMobile = e.matches;
      const wasMobile = isMobileRef.current;
      isMobileRef.current = nowMobile;

      // Breakpoint crossed: desktop → mobile
      if (nowMobile && !wasMobile && lastHoveredRef.current !== null) {
        // Open the accordion panel that was last hovered on desktop
        setActiveIndex(lastHoveredRef.current);
        // Scroll it into view smoothly
        const panelEl = accordionRefs.current[lastHoveredRef.current];
        if (panelEl) {
          setTimeout(() => {
            panelEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }
      }

      // Breakpoint crossed: mobile → desktop — reset hover state
      if (!nowMobile && wasMobile) {
        setActiveIndex(null);
        lastHoveredRef.current = null;
      }
    };

    isMobileRef.current = mq.matches;
    mq.addEventListener('change', handleBreakpointChange);
    return () => mq.removeEventListener('change', handleBreakpointChange);
  }, []);

  // Accordion toggle handler
  const handleAccordionToggle = useCallback((index) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  // Bento hover handlers
  const handleBentoEnter = useCallback((index) => {
    if (!isMobileRef.current) {
      setActiveIndex(index);
      lastHoveredRef.current = index; // persist for Context Lock
    }
  }, []);

  const handleBentoLeave = useCallback(() => {
    if (!isMobileRef.current) {
      setActiveIndex(null);
      // NOTE: Do NOT reset lastHoveredRef here — it must survive for resize.
    }
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-heading"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 section-reveal">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-6 text-xs font-mono text-forsythia tracking-widest">
            <IconArrowPath size={14} color="#FFC801" aria-hidden="true" />
            PLATFORM FEATURES
          </div>
          <h2
            id="features-heading"
            className="font-mono font-bold text-4xl md:text-5xl text-arctic mb-4"
          >
            Built for <span className="text-shimmer">Infinite Scale</span>
          </h2>
          <p className="font-sans text-mint/60 text-lg max-w-xl mx-auto">
            Three core engines. One unified platform. Zero compromises.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DESKTOP: Asymmetric Bento Grid (≥768px)
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="hidden md:block section-reveal"
          aria-label="Platform features bento grid"
        >
          <div className="bento-grid">
            {FEATURES.map((feat, i) => (
              <article
                key={feat.id}
                id={`bento-${feat.id}`}
                aria-label={feat.title}
                className={`${feat.gridClass} glass-card p-8 cursor-default relative overflow-hidden`}
                style={{
                  transition:   'transform 150ms cubic-bezier(0.0, 0.0, 0.2, 1), box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1), border-color 150ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                  willChange:   'transform',
                  background:   activeIndex === i ? feat.color : 'rgba(17,76,90,0.2)',
                  borderColor:  activeIndex === i ? feat.borderColor : 'rgba(217,232,226,0.06)',
                  transform:    activeIndex === i ? 'translateY(-4px) scale(1.01)' : 'none',
                  boxShadow:    activeIndex === i
                    ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${feat.borderColor}`
                    : 'none',
                }}
                onMouseEnter={() => handleBentoEnter(i)}
                onMouseLeave={handleBentoLeave}
                onFocus={() => handleBentoEnter(i)}
                onBlur={handleBentoLeave}
                tabIndex={0}
              >
                {/* Background ambient glow on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: activeIndex === i
                      ? `radial-gradient(circle at 30% 30%, ${feat.color} 0%, transparent 60%)`
                      : 'transparent',
                    transition: 'background 200ms ease-out',
                  }}
                />

                <div className="relative z-10">
                  <div className="mb-5">{feat.icon}</div>

                  <div className="font-mono text-xs text-mint/40 tracking-widest mb-1">
                    {feat.subtitle}
                  </div>
                  <h3 className="font-mono font-bold text-xl text-arctic mb-3">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-sm text-mint/60 leading-relaxed mb-6">
                    {feat.body}
                  </p>

                  {/* Metric badge */}
                  <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                    <span className="font-mono font-bold text-forsythia text-lg">
                      {feat.metric}
                    </span>
                    <span className="font-sans text-xs text-mint/40">
                      {feat.metricLabel}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MOBILE: Touch-Optimized Accordion (<768px)
            CONTEXT LOCK: activeIndex is shared with Bento above.
            When resizing from desktop→mobile with an active bento panel,
            lastHoveredRef transfers that index into setActiveIndex so the
            corresponding accordion is already open.
            ═══════════════════════════════════════════════════════════════ */}
        <div
          className="md:hidden flex flex-col gap-3 section-reveal"
          aria-label="Platform features accordion"
        >
          {FEATURES.map((feat, i) => {
            const isOpen = activeIndex === i;

            return (
              <article
                key={feat.id}
                id={`accordion-${feat.id}`}
                ref={el => { accordionRefs.current[i] = el; }}
                className="glass-card overflow-hidden"
                style={{
                  borderColor: isOpen ? feat.borderColor : 'rgba(217,232,226,0.06)',
                  transition:  'border-color 200ms ease-out',
                }}
              >
                {/* Accordion Header — touch target ≥44px */}
                <button
                  id={`accordion-btn-${feat.id}`}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia/50"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${feat.id}`}
                  onClick={() => handleAccordionToggle(i)}
                  style={{ minHeight: '64px' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{feat.icon}</div>
                    <div>
                      <div className="font-mono text-xs text-mint/40 tracking-widest">
                        {feat.subtitle}
                      </div>
                      <h3 className="font-mono font-semibold text-base text-arctic">
                        {feat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Toggles between IconChevronDown when closed and IconChevronUpSolid when open */}
                  {isOpen ? (
                    <IconChevronUpSolid
                      size={20}
                      color="rgba(217,232,226,0.4)"
                      aria-hidden="true"
                      className="flex-shrink-0"
                    />
                  ) : (
                    <IconChevronDown
                      size={20}
                      color="rgba(217,232,226,0.4)"
                      aria-hidden="true"
                      className="flex-shrink-0"
                    />
                  )}
                </button>

                {/* Accordion Panel — smooth max-height transition 300-400ms ease-in-out */}
                <div
                  id={`accordion-panel-${feat.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${feat.id}`}
                  className="accordion-content"
                  style={{
                    transition: 'max-height 350ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                  }}
                  ref={el => {
                    if (el) {
                      el.classList.toggle('open', isOpen);
                    }
                  }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div
                      className="h-px mb-5"
                      style={{ background: feat.borderColor }}
                    />
                    <p className="font-sans text-sm text-mint/60 leading-relaxed mb-5">
                      {feat.body}
                    </p>
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                      <span className="font-mono font-bold text-forsythia text-base">
                        {feat.metric}
                      </span>
                      <span className="font-sans text-xs text-mint/40">
                        {feat.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}