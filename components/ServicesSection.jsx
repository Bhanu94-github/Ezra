'use client';

import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover-effect';

/* ═══════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: EASE, delay },
});

/* ═══════════════════════════════════════════════════
   SERVICE DATA
═══════════════════════════════════════════════════ */
const SERVICE_ITEMS = [
  {
    title: 'Painting',
    description: '340 verified painters • ₹800/day avg',
    link: '#painting',
  },
  {
    title: 'Plumbing',
    description: '280 licensed plumbers • ₹700/job avg',
    link: '#plumbing',
  },
  {
    title: 'Electrical',
    description: '215 certified electricians • ₹900/day',
    link: '#electrical',
  },
  {
    title: 'Carpentry',
    description: '180 skilled carpenters • ₹850/day avg',
    link: '#carpentry',
  },
  {
    title: 'Cleaning',
    description: '420 professional cleaners • ₹500/day',
    link: '#cleaning',
  },
  {
    title: 'AC Repair',
    description: '145 HVAC technicians • ₹600/visit',
    link: '#ac-repair',
  },
];

/* ═══════════════════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════════════════ */
export default function ServicesSection() {
  return (
    <section id="services" className="services-section">

      {/* Decorative top rule */}
      <div className="section-rule-top" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="services-header">
          <motion.span {...fadeUp(0)} className="pill">
            🔧 All services
          </motion.span>

          <div className="services-header-row">
            <motion.h2 {...fadeUp(0.1)} className="services-heading">
              Every skill.{' '}
              <span className="text-gradient">One platform.</span>
            </motion.h2>

            <motion.a
              {...fadeUp(0.15)}
              href="#"
              className="services-view-all"
            >
              <span>View all services</span>
              <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="services-view-all-arrow"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </header>

        {/* ════════════════════════════════════
            BANNER
        ════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.2)}
          initial={{ opacity: 0, y: 40 }}
          className="banner banner-group services-banner"
        >
          <img
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
            alt="Expert craftsman at work"
            className="banner-img"
            loading="lazy"
          />

          <div className="banner-gradient" aria-hidden />
          <div className="banner-hover-overlay" aria-hidden />

          <div className="overlay-centered">
            <div className="overlay-content">
              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="services-banner-heading"
              >
                Masters of their Trade
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
                className="services-banner-body"
              >
                From complex electrical installations to delicate carpentry,
                we connect you with the city's finest tradespeople.
                Quality and reliability — guaranteed.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            SERVICE CARDS
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.1)} className="services-cards-wrap">
          <HoverEffect items={SERVICE_ITEMS} />
        </motion.div>

        {/* ════════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.1)} className="services-cta">
          <div className="services-cta-text">
            <h3 className="services-cta-heading">
              Don't see your service?
            </h3>
            <p className="services-cta-body">
              Request any trade — we'll find the right professional within
              24 hours through our trusted network.
            </p>
          </div>

          <button
            type="button"
            className="btn-primary btn-lg services-cta-btn"
          >
            Request a Service
          </button>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .services-section {
          position: relative;
          background: var(--bg);
          padding: var(--section-py) 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .services-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--space-5);
          margin-bottom: var(--block-gap);
        }
        .services-header-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: var(--space-5);
        }
        .services-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: var(--text-6xl);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-1);
          margin: 0;
          max-width: 760px;
          flex: 1 1 auto;
        }

        /* "View all" link */
        .services-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          padding: 8px 0;
          transition: color .2s ease;
        }
        .services-view-all-arrow {
          transition: transform .2s var(--ease-smooth);
        }
        .services-view-all:hover {
          color: var(--accent-hi);
        }
        .services-view-all:hover .services-view-all-arrow {
          transform: translateX(4px);
        }
        .services-view-all:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 2px;
        }

        /* ── Banner ── */
        .services-banner {
          margin-bottom: var(--block-gap);
        }
        .services-banner-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .services-banner-body {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.7;
          color: rgba(244, 244, 245, 0.82);
          margin: 0;
          max-width: 640px;
          font-weight: 500;
        }

        /* ── Cards wrap ── */
        .services-cards-wrap {
          margin-bottom: var(--block-gap);
        }

        /* ── Bottom CTA ── */
        .services-cta {
          padding: var(--space-8) var(--space-8);
          background: rgba(99, 102, 241, 0.04);
          border: 1px solid var(--border);
          border-radius: var(--r-2xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-7);
        }
        .services-cta-text {
          flex: 1 1 320px;
          max-width: 620px;
        }
        .services-cta-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 900;
          color: var(--text-1);
          margin: 0 0 var(--space-3);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .services-cta-body {
          color: var(--text-2);
          font-size: 1.0625rem;
          line-height: 1.65;
          margin: 0;
        }
        .services-cta-btn {
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .services-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-3);
          }
          .services-view-all {
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .services-cta {
            padding: var(--space-7) var(--space-6);
            flex-direction: column;
            align-items: flex-start;
          }
          .services-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}