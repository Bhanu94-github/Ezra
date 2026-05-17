'use client';

import { motion } from 'framer-motion';

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
   FEATURE DATA
═══════════════════════════════════════════════════ */
const FEATURES = [
  {
    title: 'Instant Booking',
    description: 'Book a verified worker in under 60 seconds with one tap.',
    color: 'var(--accent)',
    icon: (
      <path d="M13 2L4.09 12.97a1 1 0 0 0 .77 1.64H11l-1 7.39a1 1 0 0 0 1.77.71L20.91 11.03a1 1 0 0 0-.77-1.64H13l1-7.39a1 1 0 0 0-1-1z" />
    ),
  },
  {
    title: 'Verified Workers',
    description: 'Every professional passes background checks and skill verification.',
    color: 'var(--emerald)',
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 5-3.5 8-9 8s-9-3-9-8 3.5-8 9-8 9 3 9 8z" />
      </>
    ),
  },
  {
    title: 'Hyperlocal First',
    description: 'Workers sorted by real-time proximity, availability, and rating.',
    color: 'var(--sky)',
    icon: (
      <>
        <path d="M12 22s-8-7-8-13a8 8 0 0 1 16 0c0 6-8 13-8 13z" />
        <circle cx="12" cy="9" r="3" />
      </>
    ),
  },
];

/* ═══════════════════════════════════════════════════
   APP PREVIEW SECTION
═══════════════════════════════════════════════════ */
export default function AppPreviewSection() {
  return (
    <section id="app-preview" className="app-preview-section">

      {/* Decorative background glow */}
      <div className="app-preview-glow" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="app-preview-header">
          <motion.span {...fadeUp(0)} className="pill">
            🚀 The Full Platform
          </motion.span>

          <motion.h2 {...fadeUp(0.1)} className="app-preview-heading">
            The Platform{' '}
            <span className="text-gradient">That Delivers.</span>
          </motion.h2>

          <motion.p {...fadeUp(0.2)} className="app-preview-subhead">
            A real-time, hyperlocal worker marketplace —
            beautifully designed and blindingly fast.
          </motion.p>
        </header>

        {/* ════════════════════════════════════
            BANNER
        ════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.25)}
          initial={{ opacity: 0, y: 40 }}
          className="banner banner-group app-preview-banner"
        >
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
            alt="Professional worker arriving at client site"
            className="banner-img"
            loading="lazy"
          />

          <div className="banner-gradient" aria-hidden />
          <div className="banner-hover-overlay" aria-hidden />

          <div className="overlay-centered">
            <div className="overlay-content">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="app-preview-status"
              >
                <span className="app-preview-status-dot" aria-hidden />
                Real-time Matching
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                className="app-preview-banner-heading"
              >
                Verified Professionals,{' '}
                <span style={{ color: 'var(--accent)' }}>Instantly.</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="app-preview-banner-body"
              >
                Every worker on Ezra is thoroughly vetted, highly skilled,
                and ready to deliver top-tier service at your doorstep.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            FEATURE CARDS
        ════════════════════════════════════ */}
        <ul className="app-preview-cards" role="list">
          {FEATURES.map((feature, i) => (
            <motion.li
              key={feature.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="app-preview-card"
            >
              <div
                className="app-preview-card-icon"
                style={{
                  color: feature.color,
                  backgroundColor: `color-mix(in srgb, ${feature.color} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${feature.color} 30%, transparent)`,
                }}
                aria-hidden
              >
                <svg
                  width="22" height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {feature.icon}
                </svg>
              </div>

              <h3 className="app-preview-card-heading">{feature.title}</h3>
              <p className="app-preview-card-body">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .app-preview-section {
          position: relative;
          padding: var(--section-py) 0;
          background: linear-gradient(180deg, var(--bg) 0%, #040408 100%);
          overflow: hidden;
        }

        /* ── Decorative glow ── */
        .app-preview-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(400px, 60vw, 800px);
          height: 400px;
          background: radial-gradient(
            ellipse,
            rgba(99, 102, 241, 0.05) 0%,
            transparent 70%
          );
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ── */
        .app-preview-header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin: 0 auto var(--block-gap);
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-5);
        }
        .app-preview-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: var(--text-6xl);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-1);
          margin: 0;
          max-width: 720px;
        }
        .app-preview-subhead {
          font-family: var(--font-inter), 'Inter', sans-serif;
          color: var(--text-2);
          font-size: var(--text-xl);
          line-height: 1.7;
          margin: 0;
          max-width: 600px;
        }

        /* ── Banner overrides ── */
        .app-preview-banner {
          position: relative;
          z-index: 1;
          margin-bottom: var(--block-gap);
        }
        .app-preview-banner-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 4.5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .app-preview-banner-body {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          line-height: 1.7;
          color: rgba(244, 244, 245, 0.82);
          margin: 0;
          max-width: 620px;
          font-weight: 500;
        }

        /* ── Status pill (live indicator) ── */
        .app-preview-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: var(--r-full);
          border: 1px solid rgba(99, 102, 241, 0.35);
          background: rgba(99, 102, 241, 0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--accent-hi);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .app-preview-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--emerald);
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5);
          animation: app-preview-pulse 2s ease-in-out infinite;
        }
        @keyframes app-preview-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(52, 211, 153, 0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);   }
          100% { box-shadow: 0 0 0 0   rgba(52, 211, 153, 0);   }
        }

        /* ── Cards grid ── */
        .app-preview-cards {
          position: relative;
          z-index: 1;
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--grid-gap-lg);
        }
        @media (max-width: 900px) {
          .app-preview-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .app-preview-cards {
            grid-template-columns: 1fr;
            gap: var(--grid-gap);
          }
        }

        /* ── Card ── */
        .app-preview-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          padding: var(--space-7) var(--space-6);
          transition: transform .3s var(--ease-smooth),
                      background .3s ease,
                      border-color .3s ease;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .app-preview-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(129, 140, 248, 0.25);
        }
        .app-preview-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--r-md);
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-2);
          transition: transform .3s var(--ease-smooth);
        }
        .app-preview-card:hover .app-preview-card-icon {
          transform: scale(1.08) rotate(-4deg);
        }
        .app-preview-card-heading {
          color: var(--text-1);
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .app-preview-card-body {
          color: var(--text-2);
          font-size: 0.9375rem;
          line-height: 1.65;
          margin: 0;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .app-preview-status-dot,
          .app-preview-card:hover,
          .app-preview-card:hover .app-preview-card-icon {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}