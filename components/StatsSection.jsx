'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════
   COUNT UP HOOK
   ─────────────────────────────────────────────────
   • rAF-based for 60fps smoothness
   • Respects prefers-reduced-motion
   • Ease-out curve for natural deceleration
═══════════════════════════════════════════════════ */
function useCountUp(target, { duration = 1800, enabled = true } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    /* Reduced motion → snap to final value */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let rafId;
    let startTime;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out cubic for natural counting feel */
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, enabled]);

  return value;
}

/* ═══════════════════════════════════════════════════
   COUNT UP DISPLAY
═══════════════════════════════════════════════════ */
function CountUp({ to, suffix = '', duration = 1800, locale = 'en-IN' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const value = useCountUp(to, { duration, enabled: inView });

  return (
    <span ref={ref}>
      {value.toLocaleString(locale)}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   STATS DATA
═══════════════════════════════════════════════════ */
const STATS = [
  {
    to: 2500,
    suffix: '+',
    label: 'Verified Workers',
    sub: 'Active across India',
    color: 'var(--accent)',
  },
  {
    to: 50,
    suffix: '+',
    label: 'Cities',
    sub: 'And expanding weekly',
    color: 'var(--sky)',
  },
  {
    to: 10000,
    suffix: '+',
    label: 'Jobs Completed',
    sub: 'Happy customers',
    color: 'var(--emerald)',
  },
  {
    to: 98,
    suffix: '%',
    label: 'Satisfaction',
    sub: 'Based on real reviews',
    color: 'var(--amber)',
  },
];

/* ═══════════════════════════════════════════════════
   STATS SECTION
═══════════════════════════════════════════════════ */
export default function StatsSection() {
  return (
    <section id="stats" className="stats-section">

      {/* Decorative top + bottom rules */}
      <div className="section-rule-top" aria-hidden />
      <div className="section-rule-bottom" aria-hidden />

      <div className="section-container">
        <ul className="stats-grid" role="list">
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              className="stats-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="stats-value"
                style={{ color: stat.color }}
              >
                <CountUp
                  to={stat.to}
                  suffix={stat.suffix}
                  duration={1800}
                />
              </p>
              <p className="stats-label">{stat.label}</p>
              <p className="stats-sub">{stat.sub}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .stats-section {
          position: relative;
          background: var(--bg);
          padding: var(--space-9) 0;
          overflow: hidden;
        }

        /* ── Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* ── Item ── */
        .stats-item {
          position: relative;
          padding: var(--space-6) var(--space-5);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }

        /* Vertical separator — pseudo-element handles wrap correctly */
        .stats-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 25%;
          right: 0;
          bottom: 25%;
          width: 1px;
          background: rgba(255, 255, 255, 0.06);
        }

        /* ── Value ── */
        .stats-value {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          margin: 0;
          /* Reserve width to prevent layout shift while counting */
          font-variant-numeric: tabular-nums;
        }

        /* ── Label ── */
        .stats-label {
          color: var(--text-1);
          font-weight: 600;
          font-size: 0.9375rem;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ── Sub-label ── */
        .stats-sub {
          color: var(--text-3);
          font-size: 0.8125rem;
          margin: 0;
          line-height: 1.4;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* Remove right border from 2nd item (end of row 1) */
          .stats-item:nth-child(2)::after {
            display: none;
          }
          /* Add bottom border separator between rows */
          .stats-item:nth-child(-n+2)::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 25%;
            right: 25%;
            height: 1px;
            background: rgba(255, 255, 255, 0.06);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2);
          }
          /* Remove all vertical separators on single column */
          .stats-item::after {
            display: none;
          }
          /* Horizontal separators between rows */
          .stats-item:not(:last-child)::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 20%;
            right: 20%;
            height: 1px;
            background: rgba(255, 255, 255, 0.06);
          }
          .stats-item {
            padding: var(--space-5) var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}