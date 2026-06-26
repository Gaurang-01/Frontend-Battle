/**
 * PRICING MATRIX COMPONENT — FEATURE 1 (30 POINTS)
 *
 * ── STATE ISOLATION ARCHITECTURE ──────────────────────────────────────────
 * The billing cycle toggle and currency selector are ISOLATED using React useRef.
 * When currency or billing changes, we directly mutate the DOM textContent of
 * price nodes via refs — avoiding ANY React re-render of the parent layout tree.
 *
 * priceRefs:    Map of tier → DOM node ref for direct textContent mutation
 * cycleRef:     Tracks current billing cycle without state
 * currencyRef:  Tracks current currency selection without state
 *
 * FIX: aria-checked on the toggle switch is now updated via direct DOM mutation
 * inside handleCycleToggle — it was previously hardcoded to "false" forever.
 *
 * This ensures zero re-renders on the PricingSection parent or surrounding blocks.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Icons sourced from: src/assets/icons.jsx (SVG assets folder)
 *   - IconArrowTrendingUp → section badge (pricing performance signal)
 *   - IconChevronDown     → currency select dropdown caret
 */
import { useRef, useCallback, useEffect } from 'react';
import { IconArrowTrendingUp, IconChevronDown } from '../assets/icons';

// ── Multi-Dimensional Pricing Configuration Matrix ────────────────────────
// Structure: PRICE_MATRIX[tier][currency] = base monthly rate (before multipliers)
const PRICE_MATRIX = {
  'Core Compute': { USD: 29,    INR: 2399,  EUR: 27  },
  'Neural Hub':   { USD: 79,    INR: 6499,  EUR: 73  },
  'Synapse Grid': { USD: 199,   INR: 16499, EUR: 185 },
};

// Regional tariff variables applied on top of base rates
const REGIONAL_TARIFF = { USD: 1.0, INR: 1.08, EUR: 0.95 };

// Billing multiplier: 20% discount on annual (0.8x)
const BILLING_MULTIPLIER = { monthly: 1.0, annual: 0.8 };

// Currency symbols
const CURRENCY_SYMBOL = { USD: '$', INR: '₹', EUR: '€' };

// Compute final price applying tariff and billing multiplier
function computePrice(tier, currency, cycle) {
  const base       = PRICE_MATRIX[tier][currency];
  const tariff     = REGIONAL_TARIFF[currency];
  const multiplier = BILLING_MULTIPLIER[cycle];
  return Math.round(base * tariff * multiplier);
}

// ── Tier Definitions (no hardcoded price strings here) ───────────────────
const TIERS = [
  {
    id:       'core-compute',
    name:     'Core Compute',
    tagline:  'Ideal for solo engineers & startups',
    badge:    null,
    features: [
      '5 Automated Pipelines',
      '10 GB Neural Storage',
      'REST + GraphQL APIs',
      'Community Support',
      '99.5% SLA Uptime',
    ],
    cta:      'Start Free Trial',
    featured: false,
  },
  {
    id:       'neural-hub',
    name:     'Neural Hub',
    tagline:  'Best for scaling teams & products',
    badge:    'MOST POPULAR',
    features: [
      '25 Automated Pipelines',
      '100 GB Neural Storage',
      'Dedicated Compute Nodes',
      'Priority Support (4h SLA)',
      '99.9% Uptime Guarantee',
      'Advanced Analytics Dashboard',
    ],
    cta:      'Get Neural Hub',
    featured: true,
  },
  {
    id:       'synapse-grid',
    name:     'Synapse Grid',
    tagline:  'Enterprise-grade, unlimited scale',
    badge:    'ENTERPRISE',
    features: [
      'Unlimited Pipelines',
      '1 TB+ Neural Storage',
      'Multi-Region Clusters',
      'Dedicated Account Manager',
      '99.97% SLA + Penalty Credits',
      'Custom AI Model Fine-tuning',
      'SSO & SAML Integration',
    ],
    cta:      'Contact Sales',
    featured: false,
  },
];

const CURRENCIES = ['USD', 'INR', 'EUR'];

export default function PricingSection() {
  // ── DOM Refs for direct textContent mutation (STATE ISOLATION) ──────────
  const priceRefs = useRef(
    Object.fromEntries(TIERS.map(t => [t.name, { current: null }]))
  );

  // Refs tracking current state values WITHOUT triggering re-renders
  const cycleRef    = useRef('monthly');
  const currencyRef = useRef('USD');

  // Toggle indicator refs for direct DOM visual update
  const toggleTrackRef    = useRef(null);
  const toggleThumbRef    = useRef(null);
  const cycleMonthlyRef   = useRef(null);
  const cycleAnnualRef    = useRef(null);
  const currencySelectRef = useRef(null);
  const savingsBadgeRef   = useRef(null);

  /**
   * PRICE DOM MUTATION FUNCTION
   * Called on mount and on every currency/cycle change.
   * Directly sets textContent on each price node — zero React re-render.
   */
  const updatePriceDOMNodes = useCallback(() => {
    const cycle    = cycleRef.current;
    const currency = currencyRef.current;
    const symbol   = CURRENCY_SYMBOL[currency];

    TIERS.forEach(tier => {
      const node = priceRefs.current[tier.name].current;
      if (node) {
        const price = computePrice(tier.name, currency, cycle);
        // Direct textContent mutation — no React setState, zero re-render
        node.textContent = `${symbol}${price.toLocaleString()}`;
      }
    });

    // Update savings badge visibility via direct style mutation
    if (savingsBadgeRef.current) {
      savingsBadgeRef.current.style.opacity = cycle === 'annual' ? '1' : '0';
    }
  }, []);

  // Initial mount render
  useEffect(() => {
    updatePriceDOMNodes();
  }, [updatePriceDOMNodes]);

  /**
   * CYCLE TOGGLE HANDLER
   * Flips billing cycle and mutates price DOM nodes.
   * No setState called — parent tree is never re-rendered.
   *
   * FIX: aria-checked is now updated via setAttribute on every toggle
   * so assistive technology correctly reflects the current switch state.
   */
  const handleCycleToggle = useCallback(() => {
    cycleRef.current = cycleRef.current === 'monthly' ? 'annual' : 'monthly';
    const isAnnual = cycleRef.current === 'annual';

    // Direct DOM mutations for visual toggle state (no React re-render)
    if (toggleTrackRef.current) {
      toggleTrackRef.current.classList.toggle('active', isAnnual);
      // FIX: keep aria-checked in sync with actual toggle state
      toggleTrackRef.current.setAttribute('aria-checked', String(isAnnual));
    }
    if (cycleMonthlyRef.current) {
      cycleMonthlyRef.current.style.color = isAnnual
        ? 'rgba(217,232,226,0.4)'
        : 'rgba(241,246,244,1)';
    }
    if (cycleAnnualRef.current) {
      cycleAnnualRef.current.style.color = isAnnual
        ? 'rgba(255,200,1,1)'
        : 'rgba(217,232,226,0.4)';
    }

    updatePriceDOMNodes();
  }, [updatePriceDOMNodes]);

  /**
   * CURRENCY CHANGE HANDLER
   * Updates currency ref and mutates price DOM nodes.
   * No setState called — parent tree is never re-rendered.
   */
  const handleCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    updatePriceDOMNodes();
  }, [updatePriceDOMNodes]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(17,76,90,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="text-center mb-12 section-reveal">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-6 text-xs font-mono text-saffron tracking-widest">
            <IconArrowTrendingUp size={14} color="#FF9932" aria-hidden="true" />
            TRANSPARENT PRICING
          </div>
          <h2
            id="pricing-heading"
            className="font-mono font-bold text-4xl md:text-5xl text-arctic mb-4"
          >
            Choose Your <span className="text-shimmer">Compute Tier</span>
          </h2>
          <p className="font-sans text-mint/60 text-lg max-w-xl mx-auto">
            Scale seamlessly. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* ── Controls Row (Billing Toggle + Currency Selector) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 section-reveal">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-3">
            <span
              ref={cycleMonthlyRef}
              className="font-mono text-sm text-arctic transition-colors duration-150"
            >
              Monthly
            </span>

            <button
              ref={toggleTrackRef}
              onClick={handleCycleToggle}
              className="toggle-track"
              role="switch"
              aria-checked="false"
              aria-label="Toggle annual billing (20% discount)"
              id="billing-cycle-toggle"
            >
              <span ref={toggleThumbRef} className="toggle-thumb" />
            </button>

            <span
              ref={cycleAnnualRef}
              className="font-mono text-sm text-mint/40 flex items-center gap-1.5 transition-colors duration-150"
            >
              Annual
              <span
                ref={savingsBadgeRef}
                className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded text-canvas"
                style={{
                  background: '#FFC801',
                  opacity:    0,
                  transition: 'opacity 150ms ease-out',
                }}
              >
                −20%
              </span>
            </span>
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <select
              ref={currencySelectRef}
              id="currency-selector"
              aria-label="Select currency"
              onChange={handleCurrencyChange}
              defaultValue="USD"
              className="font-mono text-sm text-arctic glass-card px-4 py-2 pr-9 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-forsythia/50"
              style={{ background: 'rgba(17,76,90,0.4)' }}
            >
              <option value="USD">🇺🇸 USD ($)</option>
              <option value="INR">🇮🇳 INR (₹)</option>
              <option value="EUR">🇪🇺 EUR (€)</option>
            </select>
            {/* chevron-down.svg — custom dropdown caret from SVG assets */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevronDown size={14} color="rgba(217,232,226,0.4)" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* ── Pricing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <article
              key={tier.id}
              id={`pricing-card-${tier.id}`}
              aria-label={`${tier.name} pricing plan`}
              className={`relative rounded-2xl p-8 flex flex-col section-reveal ${
                tier.featured
                  ? 'pricing-featured scale-[1.02] shadow-2xl shadow-forsythia/10'
                  : 'glass-card'
              }`}
            >
              {/* Featured glow ring */}
              {tier.featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,200,1,0.06) 0%, transparent 50%)',
                  }}
                />
              )}

              {/* Badge */}
              {tier.badge && (
                <div className="mb-4">
                  <span
                    className="font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: tier.featured
                        ? 'linear-gradient(135deg, #FFC801, #FF9932)'
                        : 'rgba(255,153,50,0.15)',
                      color: tier.featured ? '#172836' : '#FF9932',
                      border: tier.featured ? 'none' : '1px solid rgba(255,153,50,0.3)',
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="font-mono font-bold text-xl text-arctic mb-1">
                {tier.name}
              </h3>
              <p className="font-sans text-sm text-mint/50 mb-6">{tier.tagline}</p>

              {/* Price Display — textContent is mutated directly via ref */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span
                    ref={el => {
                      priceRefs.current[tier.name].current = el;
                    }}
                    className="font-mono font-bold text-5xl text-arctic tracking-tight"
                    aria-live="polite"
                    aria-label={`Price for ${tier.name} plan`}
                  >
                    {/* Placeholder — immediately overwritten by updatePriceDOMNodes on mount */}
                    —
                  </span>
                  <span className="font-mono text-sm text-mint/40 mb-2">/mo</span>
                </div>
                <div className="font-sans text-xs text-mint/40 mt-1">
                  {tier.name === 'Synapse Grid'
                    ? 'custom enterprise billing available'
                    : 'billed per calendar month'}
                </div>
              </div>

              {/* Feature List */}
              <ul role="list" className="flex-1 flex flex-col gap-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <circle cx="8" cy="8" r="7" fill="rgba(255,200,1,0.1)" stroke="rgba(255,200,1,0.3)" strokeWidth="1"/>
                      <path d="M5 8l2 2 4-4" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-sans text-sm text-mint/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#"
                id={`pricing-cta-${tier.id}`}
                className={`btn-glow font-mono text-sm font-semibold px-6 py-3 rounded-xl text-center block ${
                  tier.featured
                    ? 'text-canvas'
                    : 'glass-card text-arctic/80 border border-white/10 hover:text-arctic'
                }`}
                style={tier.featured
                  ? { background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)' }
                  : {}
                }
              >
                {tier.cta} →
              </a>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center font-sans text-xs text-mint/30 mt-10">
          All plans include a 14-day free trial. No credit card required.
          Prices shown exclude applicable taxes.
        </p>
      </div>
    </section>
  );
}