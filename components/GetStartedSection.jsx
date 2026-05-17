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
   CARDS DATA
═══════════════════════════════════════════════════ */
const CARDS = [
  {
    title: 'I Need Work Done',
    description: 'Post a job and find verified workers near you in minutes. Free to use, no commission.',
    link: '#customer',
  },
  {
    title: 'I Am a Skilled Worker',
    description: 'Find jobs near you, build your professional reputation, and get paid on time.',
    link: '#worker',
  },
  {
    title: 'I Manage a Team',
    description: 'Get more jobs, manage your crew digitally, and scale your business.',
    link: '#mistri',
  },
];

/* ═══════════════════════════════════════════════════
   GET STARTED SECTION
═══════════════════════════════════════════════════ */
export default function GetStartedSection() {
  return (
    <section id="get-started" className="gs-section">

      {/* Decorative layers */}
      <div className="gs-grid" aria-hidden />
      <div className="gs-glow-left" aria-hidden />
      <div className="gs-glow-right" aria-hidden />

      <div className="section-container gs-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="gs-header">
          <motion.span {...fadeUp(0)} className="gs-pill">
            🚀 Free Forever
          </motion.span>

          <motion.h2 {...fadeUp(0.1)} className="gs-heading">
            Start Today —{' '}
            <span className="gs-heading-accent">Completely Free</span>
          </motion.h2>

          <motion.p {...fadeUp(0.2)} className="gs-subhead">
            Join thousands of workers and customers already using
            Ezra across India.
          </motion.p>
        </header>

        {/* ════════════════════════════════════
            CARDS
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.25)} className="gs-cards">
          <HoverEffect items={CARDS} className="py-0" />
        </motion.div>

        {/* ════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.3)} className="gs-cta-wrap">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="gs-cta"
          >
            Get Started — It's Free
            <svg
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>

          <p className="gs-cta-note">
            No credit card · No commission · Available in 50+ cities
          </p>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .gs-section {
          position: relative;
          background: linear-gradient(
            135deg,
            #1e1b4b 0%,
            #312e81 50%,
            #3730a3 100%
          );
          padding: var(--section-py) 0;
          overflow: hidden;
          isolation: isolate;
        }

        /* Subtle dot grid */
        .gs-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        /* Soft glows for depth */
        .gs-glow-left,
        .gs-glow-right {
          position: absolute;
          width: clamp(400px, 50vw, 700px);
          height: clamp(400px, 50vw, 700px);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }
        .gs-glow-left {
          top: -10%;
          left: -10%;
          background: radial-gradient(
            circle,
            rgba(129, 140, 248, 0.18) 0%,
            transparent 70%
          );
        }
        .gs-glow-right {
          bottom: -15%;
          right: -10%;
          background: radial-gradient(
            circle,
            rgba(167, 139, 250, 0.15) 0%,
            transparent 70%
          );
        }

        /* ── Container ── */
        .gs-container {
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .gs-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto var(--block-gap);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-5);
        }

        /* Custom pill — white-on-indigo variant for contrast */
        .gs-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: var(--r-full);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .gs-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: var(--text-5xl);
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0;
        }
        .gs-heading-accent {
          background: linear-gradient(135deg, #fff 0%, #c7d2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gs-subhead {
          color: rgba(255, 255, 255, 0.75);
          font-size: var(--text-xl);
          line-height: 1.65;
          margin: 0;
          max-width: 580px;
        }

        /* ── Cards ── */
        .gs-cards {
          margin-bottom: var(--block-gap);
        }

        /* ── Final CTA ── */
        .gs-cta-wrap {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }

        .gs-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 44px;
          background: #fff;
          color: #312e81;
          font-family: inherit;
          font-weight: 800;
          font-size: 1.0625rem;
          letter-spacing: -0.01em;
          border: none;
          border-radius: var(--r-full);
          cursor: pointer;
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.25),
            0 2px 4px rgba(0, 0, 0, 0.15);
          transition: box-shadow .25s ease;
        }
        .gs-cta:hover {
          box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.35),
            0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .gs-cta:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }

        .gs-cta-note {
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.875rem;
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .gs-cta {
            padding: 16px 32px;
            font-size: 1rem;
            width: 100%;
            max-width: 360px;
          }
          .gs-cta-note {
            font-size: 0.8125rem;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .gs-cta {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}