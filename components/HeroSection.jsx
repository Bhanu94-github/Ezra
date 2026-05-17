'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { BackgroundLines } from '@/components/ui/background-lines';

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];

const ROLES = [
  'Painters',
  'Plumbers',
  'Electricians',
  'Carpenters',
  'Cleaners',
];

const HERO_STATS = [
  { value: '2,500+', label: 'Verified workers', color: 'var(--accent)' },
  { value: '50+', label: 'Indian cities', color: 'var(--emerald)' },
  { value: '4.9★', label: 'Average rating', color: 'var(--amber)' },
];

/* ═══════════════════════════════════════════════════
   WORD ROTATOR
   Cycles through professions with smooth animation.
   Pauses when tab hidden. Respects reduced-motion.
═══════════════════════════════════════════════════ */
function WordRotator() {
  const [idx, setIdx] = useState(0);
  const [prefersReduced, setReduced] = useState(false);

  /* ── Detect reduced-motion preference ── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ── Rotate words; pause when tab hidden ── */
  useEffect(() => {
    if (prefersReduced) return; // freeze on first word

    let interval;
    const start = () => {
      interval = setInterval(() => {
        setIdx((i) => (i + 1) % ROLES.length);
      }, 2600);
    };
    const stop = () => clearInterval(interval);

    const onVis = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [prefersReduced]);

  return (
    <span
      className="hero-rotator"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="hero-rotator-word text-gradient"
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   GEOLOCATION HOOK
   Lazy permission strategy:
   1. Try cached city from sessionStorage (instant)
   2. Only request geolocation on user interaction
      OR after a 3s delay (so it doesn't block LCP)
   3. Fallback to "your city" if denied/failed
═══════════════════════════════════════════════════ */
function useUserCity(fallback = 'your city') {
  const [city, setCity] = useState(fallback);
  const requested = useRef(false);

  const fetchCity = useCallback(async () => {
    if (requested.current) return;
    requested.current = true;

    /* Use cached value if available */
    try {
      const cached = sessionStorage.getItem('user-city');
      if (cached) { setCity(cached); return; }
    } catch { /* sessionStorage may be blocked */ }

    if (typeof navigator === 'undefined' || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=en`;
          const res = await fetch(url, {
            headers: { 'Accept': 'application/json' },
          });
          if (!res.ok) throw new Error('Reverse geocode failed');
          const data = await res.json();
          const detected =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.state ||
            fallback;
          setCity(detected);
          try { sessionStorage.setItem('user-city', detected); } catch { }
        } catch {
          /* Silent fail — keep fallback */
        }
      },
      () => { /* Permission denied — keep fallback */ },
      { timeout: 8000, maximumAge: 600000 } // 10min cache
    );
  }, [fallback]);

  /* Lazy trigger: idle callback or 3s delay (don't block LCP) */
  useEffect(() => {
    const timer = ('requestIdleCallback' in window)
      ? requestIdleCallback(fetchCity, { timeout: 3000 })
      : setTimeout(fetchCity, 3000);

    return () => {
      if ('cancelIdleCallback' in window) cancelIdleCallback(timer);
      else clearTimeout(timer);
    };
  }, [fetchCity]);

  return city;
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
export default function HeroSection() {
  const city = useUserCity('your city');

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="hero" className="hero">

      {/* ── Background layers ── */}
      <BackgroundLines className="hero-bg-lines" />

      <Spotlight
        className="hero-spotlight"
        fill="#6366f1"
      />

      <div className="hero-dot-grid" aria-hidden />

      {/* ── Content ── */}
      <div className="hero-container">

        {/* Status pill */}
        <motion.div {...fadeUp(0.1)} className="hero-pill-wrap">
          <span className="pill">
            <span className="hero-pulse-dot" aria-hidden />
            India's #1 Worker Marketplace
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.2)} className="hero-heading">
          <span className="hero-line">Hire Skilled</span>
          <span className="hero-line"><WordRotator /></span>
          <span className="hero-line">Near You.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p {...fadeUp(0.35)} className="hero-subhead">
          Real-time map of verified professionals across{' '}
          <span className="hero-city">{city}</span>.
          Book in 60 seconds. No commission. Always free.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.45)} className="hero-cta-row">
          <button type="button" className="btn-primary btn-lg">
            Find Workers Now
            <svg
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button type="button" className="btn-ghost btn-lg">
            Join as Worker
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.55)}
          className="hero-stats"
          role="list"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat" role="listitem">
              <p
                className="hero-stat-value"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="hero-stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hero-scroll"
        aria-hidden
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="hero-scroll-line"
        />
      </motion.div>

      {/* ═══════════════════════════════════════
          HERO STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .hero {
          position: relative;
          min-height: 100vh;
          /* Account for fixed 64px navbar */
          padding-top: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate; /* contains stacking context */
        }

        /* ── Background layers ── */
        .hero-bg-lines {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          background: #030308;
        }
        .hero-spotlight {
          position: absolute;
          top: -160px;
          left: 0;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .hero-spotlight {
            top: -80px;
            left: 240px;
          }
        }
        .hero-dot-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.3;
          background-image: radial-gradient(
            circle,
            rgba(129,140,248,0.05) 1px,
            transparent 1px
          );
          background-size: 32px 32px;
          -webkit-mask-image: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            black 0%,
            transparent 100%
          );
                  mask-image: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            black 0%,
            transparent 100%
          );
        }

        /* ── Container ── */
        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--space-9) var(--container-px) var(--space-11);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* ── Pill ── */
        .hero-pill-wrap {
          margin-bottom: var(--space-6);
        }
        .hero-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--emerald);
          display: inline-block;
          box-shadow: 0 0 8px var(--emerald);
          margin-right: 8px;
          animation: hero-pulse 2s ease-in-out infinite;
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 1;   box-shadow: 0 0 8px var(--emerald); }
          50%      { opacity: 0.6; box-shadow: 0 0 14px var(--emerald); }
        }

        /* ── Heading ── */
        .hero-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 7vw, 6rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: var(--text-1);
          margin: 0 0 var(--space-6);
          max-width: 14ch;
        }
        .hero-line {
          display: block;
        }

        /* ── Rotator ── */
        .hero-rotator {
          display: inline-block;
          position: relative;
          overflow: hidden;
          vertical-align: bottom;
          /* Reserve space to prevent layout shift between words */
          min-width: 6ch;
        }
        .hero-rotator-word {
          display: inline-block;
        }

        /* ── Subhead ── */
        .hero-subhead {
          color: var(--text-2);
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.7;
          max-width: 640px;
          margin: 0 0 var(--space-8);
          font-weight: 500;
        }
        .hero-city {
          color: var(--accent-hi);
          font-weight: 600;
          white-space: nowrap;
        }

        /* ── CTAs ── */
        .hero-cta-row {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: var(--space-9);
        }

        /* ── Stats ── */
        .hero-stats {
          display: flex;
          gap: clamp(24px, 6vw, 64px);
          align-items: flex-start;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 700px;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          min-width: 100px;
        }
        .hero-stat-value {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(1.4rem, 2.4vw, 1.75rem);
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .hero-stat-label {
          color: var(--text-3);
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        /* ── Scroll indicator ── */
        .hero-scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #3f3f46;
          font-size: 0.6875rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(
            to bottom,
            rgba(129,140,248,0.5),
            transparent
          );
        }

        /* Hide scroll indicator on short screens */
        @media (max-height: 700px) {
          .hero-scroll { display: none; }
        }

        /* Reduce hero padding on mobile */
        @media (max-width: 640px) {
          .hero-container {
            padding-top: var(--space-7);
            padding-bottom: var(--space-9);
          }
          .hero-stats { gap: 24px; }
          .hero-stat  { min-width: 80px; }
        }

        /* Respect reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-pulse-dot,
          .hero-scroll-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}