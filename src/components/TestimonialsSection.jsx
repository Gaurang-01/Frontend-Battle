/**
 * SOCIAL PROOF / TESTIMONIALS SECTION
 * Semantic <section> with article cards for schema compatibility.
 * Glassmorphic cards with staggered section-reveal class (IntersectionObserver).
 *
 * FIX: Cards now use transitionDelay (not animationDelay) for staggered entrance.
 * section-reveal uses CSS transition triggered by IntersectionObserver adding
 * .visible — animationDelay had no effect on a transition-based reveal.
 *
 * Icons sourced from: src/assets/icons.jsx (SVG assets folder)
 *   - IconChartPie → section badge (analytics / social proof signal)
 */
import { IconChartPie } from '../assets/icons';

const TESTIMONIALS = [
  {
    id:      'testimonial-1',
    quote:   "NeuralGrid cut our data pipeline build time from 3 weeks to under 4 hours. The StreamWeaver engine alone pays for the entire subscription.",
    author:  "Priya Mehta",
    role:    "Principal ML Engineer",
    company: "Quantex AI",
    avatar:  "PM",
    rating:  5,
  },
  {
    id:      'testimonial-2',
    quote:   "We migrated from a custom Kafka + Spark stack to NeuralGrid in a single sprint. PhantomCache eliminated our latency spikes completely.",
    author:  "Lucas Brentfield",
    role:    "VP of Engineering",
    company: "DataSphere Labs",
    avatar:  "LB",
    rating:  5,
  },
  {
    id:      'testimonial-3',
    quote:   "The Synapse Mesh orchestration is genuinely brilliant. We run 47 models across 3 regions with zero config drift. Synapse Grid tier is non-negotiable for us.",
    author:  "Yuki Tanaka",
    role:    "Head of Data Infrastructure",
    company: "Orbion Systems",
    avatar:  "YT",
    rating:  5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFC801" aria-hidden="true">
          <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.7 3.5L7 9.5l-3.2 1.5.7-3.5L2 5l3.5-.5z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(17,76,90,0.2) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-6 text-xs font-mono text-forsythia tracking-widest">
            {/* chart-pie.svg — signals data-driven social proof / analytics */}
            <IconChartPie size={14} color="#FFC801" aria-hidden="true" />
            CUSTOMER STORIES
          </div>
          <h2
            id="testimonials-heading"
            className="font-mono font-bold text-4xl md:text-5xl text-arctic mb-4"
          >
            Trusted by <span className="text-shimmer">10,000+ Engineers</span>
          </h2>
          <p className="font-sans text-mint/60 text-lg max-w-xl mx-auto">
            Teams at startups and Fortune 500s rely on NeuralGrid every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              id={t.id}
              aria-label={`Testimonial from ${t.author} at ${t.company}`}
              className="glass-card p-8 flex flex-col gap-5 section-reveal"
              style={{
                // FIX: use transitionDelay, not animationDelay.
                // section-reveal uses CSS transition (opacity + transform) triggered
                // by IntersectionObserver — animationDelay has no effect on transitions.
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <StarRating count={t.rating} />

              <blockquote className="font-sans text-sm text-mint/70 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              <footer className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs text-canvas"
                  style={{ background: 'linear-gradient(135deg, #FFC801, #FF9932)' }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-sans font-semibold text-sm text-arctic">
                    {t.author}
                  </div>
                  <div className="font-sans text-xs text-mint/40">
                    {t.role} · {t.company}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Trust logos row */}
        <div className="mt-16 section-reveal">
          <p className="text-center font-mono text-xs text-mint/30 tracking-widest mb-8">
            POWERING DATA INFRASTRUCTURE AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['Quantex AI', 'DataSphere', 'Orbion', 'Vektor Labs', 'PulseNet'].map((name) => (
              <div
                key={name}
                className="font-mono text-sm font-semibold text-mint/20 tracking-widest hover:text-mint/50 transition-colors duration-200"
              >
                {name.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}