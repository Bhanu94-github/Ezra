'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════
   STATIC DATA — defined outside component
   to prevent recreation on every render
═══════════════════════════════════════════════════ */
const WORKERS = [
  {
    name: 'Rajesh Kumar',
    role: 'Plumber',
    dist: '0.3 km',
    rating: 4.9,
    online: true,
    avatar: { bg: '#151530', fg: 'var(--accent)' },
  },
  {
    name: 'Priya Sharma',
    role: 'Painter',
    dist: '0.7 km',
    rating: 4.8,
    online: true,
    avatar: { bg: '#201510', fg: 'var(--violet)' },
  },
  {
    name: 'Suresh Verma',
    role: 'Electrician',
    dist: '1.1 km',
    rating: 5.0,
    online: false,
    avatar: { bg: '#152015', fg: 'var(--emerald)' },
  },
];

const MAP_PINS = [
  { x: '30%', y: '45%', color: 'var(--accent)' },
  { x: '58%', y: '30%', color: 'var(--sky)' },
  { x: '72%', y: '60%', color: 'var(--emerald)' },
];

const PHONE_BUTTONS = [
  { side: 'left', top: 118, height: 30 },
  { side: 'left', top: 160, height: 46 },
  { side: 'left', top: 216, height: 46 },
  { side: 'right', top: 150, height: 64 },
];

const STATS = [
  { value: '50+', label: 'Cities', sub: 'Across India', color: 'var(--accent)' },
  { value: '2.5K', label: 'Workers', sub: 'Verified & active', color: 'var(--emerald)' },
  { value: '10K+', label: 'Jobs done', sub: '& counting', color: 'var(--sky)' },
  { value: '4.9★', label: 'Rating', sub: 'Real customer reviews', color: 'var(--amber)' },
];

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Chennai', 'Pune', 'Kolkata', 'Ahmedabad',
  'Jaipur', 'Surat', 'Chandigarh', 'Hubli',
];

/* ═══════════════════════════════════════════════════
   PHONE MOCKUP
═══════════════════════════════════════════════════ */
function PhoneMockup() {
  const [active, setActive] = useState(0);
  const [prefersReduced, setReduced] = useState(false);
  const intervalRef = useRef(null);

  /* Reduced-motion preference */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Auto-cycle active worker — pause on hidden tab + reduced-motion */
  useEffect(() => {
    if (prefersReduced) return;

    const start = () => {
      intervalRef.current = setInterval(() => {
        setActive((i) => (i + 1) % WORKERS.length);
      }, 3000);
    };
    const stop = () => clearInterval(intervalRef.current);

    const onVis = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [prefersReduced]);

  return (
    <div className="phone" role="img" aria-label="Ezra mobile app preview showing nearby workers">

      {/* Side buttons */}
      {PHONE_BUTTONS.map((btn, i) => (
        <div
          key={`btn-${i}`}
          className="phone-side-btn"
          style={{
            [btn.side]: -3,
            top: btn.top,
            height: btn.height,
            borderRadius: btn.side === 'left' ? '4px 0 0 4px' : '0 4px 4px 0',
          }}
          aria-hidden
        />
      ))}

      {/* Screen */}
      <div className="phone-screen">

        {/* Dynamic Island */}
        <div className="phone-island" aria-hidden>
          <span className="phone-island-cam" />
          <span className="phone-island-dot" />
        </div>

        {/* App UI */}
        <div className="phone-app">

          {/* Header */}
          <div className="phone-header">
            <div>
              <p className="phone-brand">Ezra</p>
              <p className="phone-city">Mumbai</p>
            </div>
            <div className="phone-live">
              <span className="phone-live-dot" aria-hidden />
              LIVE
            </div>
          </div>

          {/* Map */}
          <div className="phone-map" aria-hidden>
            {/* Grid lines */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="phone-map-line phone-map-line-v"
                style={{ left: `${i * 25}%` }}
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="phone-map-line phone-map-line-h"
                style={{ top: `${i * 33}%` }}
              />
            ))}

            {/* Worker pins */}
            {MAP_PINS.map((pin, i) => (
              <div
                key={`pin-${i}`}
                className="phone-map-pin-wrap"
                style={{ left: pin.x, top: pin.y }}
              >
                <span
                  className="phone-map-pin"
                  style={{
                    background: pin.color,
                    boxShadow: `0 0 6px ${pin.color}`,
                  }}
                />
                <span
                  className="phone-map-ring"
                  style={{
                    borderColor: pin.color,
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
              </div>
            ))}

            <span className="phone-map-label">BANDRA WEST</span>
          </div>

          {/* Worker list label */}
          <p className="phone-list-label">Nearby Workers</p>

          {/* Worker cards */}
          <div className="phone-worker-list">
            {WORKERS.map((w, i) => {
              const initials = w.name.split(' ').map((n) => n[0]).join('');
              const isActive = active === i;

              return (
                <button
                  key={w.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`phone-worker ${isActive ? 'phone-worker-active' : ''}`}
                  aria-label={`Select ${w.name}, ${w.role}, ${w.dist} away`}
                  aria-pressed={isActive}
                >
                  <span
                    className="phone-worker-avatar"
                    style={{
                      background: w.avatar.bg,
                      color: w.avatar.fg,
                    }}
                    aria-hidden
                  >
                    {initials}
                  </span>

                  <span className="phone-worker-info">
                    <span className="phone-worker-name">{w.name}</span>
                    <span className="phone-worker-meta">
                      {w.role} · {w.dist}
                    </span>
                  </span>

                  <span className="phone-worker-right">
                    <span className="phone-worker-rating">★ {w.rating}</span>
                    {w.online && (
                      <span
                        className="phone-worker-online"
                        aria-label="Online"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glass reflection */}
        <div className="phone-glass" aria-hidden />

        {/* Home indicator */}
        <div className="phone-home" aria-hidden />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   GLOBE / COVERAGE SECTION
═══════════════════════════════════════════════════ */
export default function GlobeSection() {
  return (
    <section id="coverage" className="globe-section">

      {/* Decorative glow */}
      <div className="globe-glow" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="globe-header">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill"
          >
            📱 The Ultimate App
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="globe-heading"
          >
            Experience Seamless{' '}
            <span className="text-gradient">Connections.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="globe-subhead"
          >
            A meticulously designed mobile interface that makes finding
            workers incredibly simple.
          </motion.p>
        </header>

        {/* ════════════════════════════════════
            PHONE + STATS
        ════════════════════════════════════ */}
        <div className="globe-showcase">

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
            className="globe-phone-wrap"
          >
            <div className="globe-phone-halo" aria-hidden />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="globe-phone-float"
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>

          {/* Stats */}
          <ul className="globe-stats" role="list">
            {STATS.map((stat, i) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                viewport={{ once: true }}
                className="globe-stat"
                style={{ borderLeftColor: stat.color }}
              >
                <p
                  className="globe-stat-value"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="globe-stat-label">{stat.label}</p>
                <p className="globe-stat-sub">{stat.sub}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ════════════════════════════════════
            CITY TAGS
        ════════════════════════════════════ */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: EASE }}
          viewport={{ once: true }}
          className="globe-cities"
          role="list"
          aria-label="Available cities"
        >
          {CITIES.map((city) => (
            <li key={city}>
              <span className="tag">{city}</span>
            </li>
          ))}
          <li>
            <span className="tag globe-city-more">+ 38 more</span>
          </li>
        </motion.ul>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .globe-section {
          position: relative;
          background: linear-gradient(180deg, #040408 0%, var(--bg) 100%);
          padding: var(--section-py) 0;
          overflow: hidden;
        }
        .globe-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: clamp(400px, 60vw, 600px);
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.04) 0%,
            transparent 70%
          );
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }

        /* ── Header ── */
        .globe-header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin: 0 auto var(--block-gap);
          max-width: 640px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }
        .globe-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: var(--text-5xl);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text-1);
          margin: 0;
        }
        .globe-subhead {
          color: var(--text-3);
          font-size: var(--text-base);
          line-height: 1.6;
          margin: 0;
          max-width: 440px;
        }

        /* ── Showcase row ── */
        .globe-showcase {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(32px, 5vw, 64px);
          flex-wrap: wrap;
        }

        /* ── Phone wrapper ── */
        .globe-phone-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .globe-phone-halo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.08) 0%,
            transparent 70%
          );
          filter: blur(40px);
          pointer-events: none;
        }
        .globe-phone-float {
          position: relative;
          z-index: 1;
        }

        /* ── Stats column ── */
        .globe-stats {
          flex: 0 1 280px;
          min-width: 240px;
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .globe-stat {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-left: 3px solid;
          border-radius: var(--r-md);
          padding: var(--space-4) var(--space-5);
        }
        .globe-stat-value {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: 1.75rem;
          line-height: 1;
          margin: 0;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .globe-stat-label {
          color: var(--text-1);
          font-weight: 600;
          font-size: 0.875rem;
          margin: 4px 0 2px;
        }
        .globe-stat-sub {
          color: var(--text-3);
          font-size: 0.75rem;
          margin: 0;
        }

        /* ── City tags ── */
        .globe-cities {
          position: relative;
          z-index: 1;
          margin: var(--space-8) 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .globe-city-more {
          color: var(--accent);
          border-color: rgba(99, 102, 241, 0.25);
        }

        /* ═══════════════════════════════════════
           PHONE MOCKUP
        ═══════════════════════════════════════ */
        .phone {
          width: 280px;
          height: 570px;
          border-radius: 52px;
          background: linear-gradient(160deg, #1c1c1e 0%, #141414 100%);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 40px 100px rgba(0, 0, 0, 0.75),
            0 0 0 8px #000;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .phone-side-btn {
          position: absolute;
          width: 3px;
          background: #2a2a2e;
        }

        .phone-screen {
          position: absolute;
          inset: 6px;
          border-radius: 48px;
          background: #000;
          overflow: hidden;
        }

        /* Dynamic Island */
        .phone-island {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 115px;
          height: 32px;
          background: #000;
          border-radius: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 12px;
          gap: 6px;
        }
        .phone-island-cam {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #1c1c1e;
          border: 1px solid #2a2a2a;
        }
        .phone-island-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #1e3a5f;
        }

        /* App */
        .phone-app {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #08080f 0%, #04040a 100%);
          padding: 60px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .phone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .phone-brand {
          color: var(--text-3);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0;
        }
        .phone-city {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
        }
        .phone-live {
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 11px;
          color: var(--accent);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .phone-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--emerald);
        }

        /* Map */
        .phone-map {
          height: 140px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0a0a14, #0e1020);
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }
        .phone-map-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.03);
        }
        .phone-map-line-v {
          top: 0; bottom: 0;
          width: 1px;
        }
        .phone-map-line-h {
          left: 0; right: 0;
          height: 1px;
        }
        .phone-map-pin-wrap {
          position: absolute;
        }
        .phone-map-pin {
          display: block;
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .phone-map-ring {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid;
          opacity: 0.35;
          animation: pulse-ring 2s ease-out infinite;
        }
        .phone-map-label {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-3);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        /* Worker list */
        .phone-list-label {
          color: var(--text-3);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin: 0;
        }
        .phone-worker-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .phone-worker {
          all: unset;
          box-sizing: border-box;
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background .3s ease, border-color .3s ease;
          font-family: inherit;
        }
        .phone-worker-active {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.25);
        }

        .phone-worker-avatar {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .phone-worker-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .phone-worker-name {
          color: #e4e4e7;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .phone-worker-meta {
          color: var(--text-3);
          font-size: 11px;
          margin-top: 1px;
        }

        .phone-worker-right {
          flex-shrink: 0;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .phone-worker-rating {
          color: var(--amber);
          font-size: 11px;
          font-weight: 700;
        }
        .phone-worker-online {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--emerald);
        }

        /* Glass / home */
        .phone-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.025) 0%,
            transparent 50%
          );
          pointer-events: none;
          border-radius: 48px;
        }
        .phone-home {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          z-index: 10;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .globe-stats {
            flex: 1 1 100%;
            max-width: 400px;
          }
        }

        @media (max-width: 380px) {
          .phone {
            width: 260px;
            height: 530px;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .phone-map-ring,
          .globe-phone-float {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}