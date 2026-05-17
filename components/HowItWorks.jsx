'use client';

import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { WobbleCard } from '@/components/ui/wobble-card';

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
   GRID PATTERN — Animated header for each bento card
═══════════════════════════════════════════════════ */
function GridPattern({ color = 'var(--accent)' }) {
  return (
    <div
      className="hiw-grid-pattern"
      style={{
        background: `radial-gradient(circle at 40% 60%, color-mix(in srgb, ${color} 10%, transparent) 0%, transparent 60%)`,
      }}
      aria-hidden
    >
      {/* Dot grid */}
      <div
        className="hiw-grid-dots"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${color} 22%, transparent) 1px, transparent 1px)`,
        }}
      />

      {/* Pulsing orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: 'easeInOut',
        }}
        className="hiw-grid-orb"
        style={{
          background: `linear-gradient(135deg,
            color-mix(in srgb, ${color} 35%, transparent),
            color-mix(in srgb, ${color} 8%, transparent))`,
          borderColor: `color-mix(in srgb, ${color} 28%, transparent)`,
        }}
      >
        <span
          className="hiw-grid-orb-inner"
          style={{ background: color }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEPS DATA
═══════════════════════════════════════════════════ */
const STEPS = [
  {
    title: 'Share Your Location',
    description: 'Open Ezra — we surface verified workers sorted by distance, rating, and availability. No typing needed.',
    color: 'var(--accent)',
    className: 'md:col-span-2',
  },
  {
    title: 'Browse & Pick',
    description: 'View profiles, skills, real reviews, and live availability. 30+ filters to find the perfect match.',
    color: 'var(--violet)',
    className: 'md:col-span-1',
  },
  {
    title: 'Book in One Tap',
    description: 'Worker gets an instant notification and confirms in seconds. You receive their ETA and live location.',
    color: 'var(--cyan)',
    className: 'md:col-span-1',
  },
  {
    title: 'Done & Paid',
    description: 'Work completed. Rate the experience. Secure payment through the app. Worker gets paid on time, every time.',
    color: 'var(--emerald)',
    className: 'md:col-span-2',
  },
];

/* ═══════════════════════════════════════════════════
   STEP TITLE — number badge + label
═══════════════════════════════════════════════════ */
function StepTitle({ index, label, color }) {
  return (
    <span className="hiw-step-title">
      <span
        className="hiw-step-badge"
        style={{ color }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="hiw-step-label">
        <span className="visually-hidden">Step {index + 1}: </span>
        {label}
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS SECTION
═══════════════════════════════════════════════════ */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hiw-section">

      {/* Decorative top rule */}
      <div className="section-rule-top" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="hiw-header">
          <motion.span {...fadeUp(0)} className="pill">
            ⚡ Simple by design
          </motion.span>

          <motion.h2 {...fadeUp(0.1)} className="hiw-heading">
            From search to{' '}
            <span className="text-gradient">done</span>{' '}
            in 5 minutes.
          </motion.h2>

          <motion.p {...fadeUp(0.18)} className="hiw-subhead">
            Four steps. Zero confusion. Every single time.
          </motion.p>
        </header>

        {/* ════════════════════════════════════
            BENTO GRID OF STEPS
        ════════════════════════════════════ */}
        <motion.div {...fadeUp(0.2)} className="hiw-bento-wrap">
          <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[22rem]">
            {STEPS.map((step, i) => (
              <BentoGridItem
                key={step.title}
                title={
                  <StepTitle
                    index={i}
                    label={step.title}
                    color={step.color}
                  />
                }
                description={step.description}
                header={<GridPattern color={step.color} />}
                className={step.className}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* ════════════════════════════════════
            BANNER
        ════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.25)}
          initial={{ opacity: 0, y: 40 }}
          className="banner banner-group hiw-banner"
        >
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
            alt="Customer using the app while a professional completes a repair"
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
                className="hiw-banner-heading"
              >
                Seamless Experience from{' '}
                <span style={{ color: 'var(--accent)' }}>
                  Start to Finish
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
                className="hiw-banner-body"
              >
                Track progress in real-time, communicate directly through
                the app, pay securely, and enjoy total peace of mind.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            WOBBLE CARD CTA
        ════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.3)}
          initial={{ opacity: 0, y: 32 }}
          className="hiw-cta-wrap"
        >
          <WobbleCard
            containerClassName="bg-indigo-900"
            className="p-8 md:p-14"
          >
            <div className="hiw-cta-inner">
              <div className="hiw-cta-text">
                <h3 className="hiw-cta-heading">
                  Ready to get started?
                </h3>
                <p className="hiw-cta-body">
                  Sign up takes 30 seconds. Start browsing workers near
                  you instantly — completely free.
                </p>
              </div>

              <button type="button" className="hiw-cta-btn">
                Get Started — Free
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </WobbleCard>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .hiw-section {
          position: relative;
          background: var(--bg);
          padding: var(--section-py) 0;
          overflow: hidden;
        }

        /* ── Visually-hidden (a11y helper) ── */
        .visually-hidden {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ── Header ── */
        .hiw-header {
          text-align: center;
          margin: 0 auto var(--block-gap);
          max-width: 720px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-5);
          padding: 0 var(--space-2);
        }
        .hiw-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: var(--text-6xl);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-1);
          margin: 0;
          max-width: 680px;
        }
        .hiw-subhead {
          font-family: var(--font-inter), 'Inter', sans-serif;
          color: var(--text-2);
          font-size: var(--text-xl);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Grid pattern (bento header) ── */
        .hiw-grid-pattern {
          width: 100%;
          aspect-ratio: 16 / 5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border-radius: var(--r-sm);
        }
        .hiw-grid-dots {
          position: absolute;
          inset: 0;
          background-size: 18px 18px;
          opacity: 0.55;
        }
        .hiw-grid-orb {
          position: relative;
          z-index: 1;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hiw-grid-orb-inner {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          opacity: 0.65;
        }

        /* ── Step title ── */
        .hiw-step-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hiw-step-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }
        .hiw-step-label {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-1);
        }

        /* ── Bento wrapper ── */
        .hiw-bento-wrap {
          margin-bottom: var(--block-gap);
        }

        /* ── Banner ── */
        .hiw-banner {
          margin-bottom: var(--block-gap);
        }
        .hiw-banner-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 4.5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
        }
        .hiw-banner-body {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          line-height: 1.7;
          color: rgba(244, 244, 245, 0.82);
          margin: 0;
          max-width: 620px;
          font-weight: 500;
        }

        /* ── Wobble CTA ── */
        .hiw-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-6);
        }
        .hiw-cta-text {
          flex: 1 1 280px;
          max-width: 520px;
        }
        .hiw-cta-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 var(--space-2);
          letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .hiw-cta-body {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }

        /* CTA button — dedicated, not overriding btn-primary */
        .hiw-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: #fff;
          color: #312e81;
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 700;
          border: none;
          border-radius: var(--r-full);
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: -0.01em;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: transform .2s ease, box-shadow .2s ease;
          flex-shrink: 0;
        }
        .hiw-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .hiw-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .hiw-cta-btn {
            width: 100%;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hiw-grid-orb,
          .hiw-cta-btn:hover {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}