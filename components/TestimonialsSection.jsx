'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 5000;

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    id: 'rahul',
    name: 'Rahul Sharma',
    role: 'Customer',
    location: 'Mumbai',
    type: 'customer',
    stars: 5,
    text: 'Found an excellent painter in 30 minutes. The quality of work was outstanding and the worker arrived exactly on time.',
    badge: 'House Painting',
    gradient: { from: 'var(--accent)', to: 'var(--accent-deep)' },
  },
  {
    id: 'rajesh',
    name: 'Rajesh Kumar',
    role: 'Painter',
    location: 'Andheri',
    type: 'worker',
    stars: 5,
    text: 'I get 3-4 job requests every week now. My income has doubled since joining. The payment always comes on time.',
    badge: 'Earned ₹45,000 this month',
    gradient: { from: 'var(--violet)', to: '#7c3aed' },
  },
  {
    id: 'sharma-mistri',
    name: 'Sharma Mistri',
    role: 'Mistri',
    location: 'Bandra',
    type: 'mistri',
    stars: 5,
    text: 'Managing my team of 12 workers is now completely digital. No more confusion about attendance or payments.',
    badge: 'Manages 12 workers',
    gradient: { from: 'var(--emerald)', to: '#059669' },
  },
  {
    id: 'priya',
    name: 'Priya Mehta',
    role: 'Customer',
    location: 'Pune',
    type: 'customer',
    stars: 5,
    text: 'The plumber fixed everything in 2 hours. Transparent pricing, no hidden charges. Will definitely use again.',
    badge: 'Plumbing',
    gradient: { from: 'var(--sky)', to: '#0284c7' },
  },
  {
    id: 'suresh-patil',
    name: 'Suresh Patil',
    role: 'Plumber',
    location: 'Dadar',
    type: 'worker',
    stars: 5,
    text: 'Before Ezra I struggled to find work. Now I have steady income every month and customers can see my ratings.',
    badge: 'Steady Income',
    gradient: { from: 'var(--accent)', to: 'var(--accent-deep)' },
  },
  {
    id: 'amit',
    name: 'Amit Singh',
    role: 'Customer',
    location: 'Delhi',
    type: 'customer',
    stars: 4,
    text: 'Very easy to use. Posted a job and got 5 quotes within an hour. Hired the best rated electrician and loved the work.',
    badge: 'Electrical',
    gradient: { from: 'var(--amber)', to: '#d97706' },
  },
  {
    id: 'ravi',
    name: 'Ravi Contractor',
    role: 'Mistri',
    location: 'Andheri',
    type: 'mistri',
    stars: 5,
    text: "My team's reputation is now visible online. Customers trust us more because they can see our verified reviews.",
    badge: 'Team of 8',
    gradient: { from: 'var(--cyan)', to: '#0891b2' },
  },
  {
    id: 'anil',
    name: 'Anil Carpenter',
    role: 'Carpenter',
    location: 'Thane',
    type: 'worker',
    stars: 5,
    text: 'The attendance tracking is great. Everything is recorded automatically and my earnings are always accurate.',
    badge: 'Carpentry Expert',
    gradient: { from: 'var(--rose)', to: '#e11d48' },
  },
];

const TYPE_COLORS = {
  customer: 'var(--accent)',
  worker: 'var(--sky)',
  mistri: 'var(--violet)',
};

/* ═══════════════════════════════════════════════════
   STAR RATING
═══════════════════════════════════════════════════ */
function Stars({ count, max = 5 }) {
  return (
    <div
      className="testi-stars"
      role="img"
      aria-label={`${count} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width="14" height="14"
          viewBox="0 0 24 24"
          fill={i < count ? 'var(--amber)' : '#27272a'}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIAL CARD
═══════════════════════════════════════════════════ */
function TestimonialCard({ t, isActive }) {
  return (
    <article
      className={`testi-card ${isActive ? 'testi-card-active' : ''}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="testi-quote" aria-hidden>"</div>

      <Stars count={t.stars} />

      <p className="testi-text">{t.text}</p>

      <div
        className="testi-badge"
        style={{
          color: TYPE_COLORS[t.type],
          backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[t.type]} 12%, transparent)`,
          borderColor: `color-mix(in srgb, ${TYPE_COLORS[t.type]} 28%, transparent)`,
        }}
      >
        {t.badge}
      </div>

      <footer className="testi-author">
        <div
          className="testi-avatar"
          style={{
            background: `linear-gradient(135deg, ${t.gradient.from}, ${t.gradient.to})`,
          }}
          aria-hidden
        >
          {t.name[0]}
        </div>
        <div className="testi-author-info">
          <div className="testi-author-name">{t.name}</div>
          <div className="testi-author-meta">
            {t.role} — {t.location}
          </div>
        </div>
      </footer>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS SECTION
═══════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const carouselId = useId();
  const total = TESTIMONIALS.length;

  /* Swipe tracking */
  const touchStartX = useRef(null);

  /* ── Navigation ── */
  const goTo = useCallback((i) => setCurrent(((i % total) + total) % total), [total]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── Responsive visible count (3 → 2 → 1) ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 720) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── Auto-play with pause-on-hidden, pause-on-hover/focus, reduced-motion ── */
  useEffect(() => {
    if (paused) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    let interval;
    const start = () => {
      interval = setInterval(() => {
        setCurrent((c) => (c + 1) % total);
      }, AUTOPLAY_MS);
    };
    const stop = () => clearInterval(interval);

    const onVis = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [paused, total]);

  /* ── Keyboard navigation ── */
  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  }, [next, prev]);

  /* ── Touch swipe support ── */
  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? prev() : next();
    }
    touchStartX.current = null;
  }, [next, prev]);

  /* ── Compute visible slice ── */
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    TESTIMONIALS[(current + i) % total]
  );

  return (
    <section id="testimonials" className="testi-section">

      {/* Decorative top rule */}
      <div className="section-rule-top" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="testi-header">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill"
          >
            Real Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="testi-heading"
          >
            What People Are{' '}
            <span className="text-gradient">Saying</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="testi-subhead"
          >
            From customers, workers, and mistris across India
          </motion.p>
        </header>

        {/* ════════════════════════════════════
            CAROUSEL
        ════════════════════════════════════ */}
        <div
          className="testi-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Live region for screen readers */}
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            Showing testimonial {current + 1} of {total}: {TESTIMONIALS[current].name}, {TESTIMONIALS[current].role}
          </div>

          {/* Slides */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              id={carouselId}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="testi-grid"
              style={{
                gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
              }}
            >
              {visible.map((t, i) => (
                <TestimonialCard
                  key={`${current}-${t.id}-${i}`}
                  t={t}
                  isActive={i === 0}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            type="button"
            className="testi-arrow testi-arrow-prev"
            onClick={prev}
            aria-label="Previous testimonial"
            aria-controls={carouselId}
          >
            <ChevronLeft size={20} aria-hidden />
          </button>

          <button
            type="button"
            className="testi-arrow testi-arrow-next"
            onClick={next}
            aria-label="Next testimonial"
            aria-controls={carouselId}
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>

        {/* ════════════════════════════════════
            DOT NAVIGATION
        ════════════════════════════════════ */}
        <div className="testi-dots" role="tablist" aria-label="Select testimonial">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === current;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
                aria-controls={carouselId}
                onClick={() => goTo(i)}
                className={`testi-dot ${isActive ? 'testi-dot-active' : ''}`}
              />
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Visually hidden ── */
        .visually-hidden {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ── Section ── */
        .testi-section {
          position: relative;
          background: var(--bg);
          padding: var(--section-py) 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .testi-header {
          text-align: center;
          margin: 0 auto var(--block-gap);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          max-width: 720px;
        }
        .testi-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: var(--text-5xl);
          color: var(--text-1);
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0;
        }
        .testi-subhead {
          color: var(--text-3);
          font-size: var(--text-base);
          margin: 0;
        }

        /* ── Carousel ── */
        .testi-carousel {
          position: relative;
          padding: 0 var(--space-7);
          outline: none;
        }
        .testi-carousel:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: var(--r-lg);
        }

        /* Grid */
        .testi-grid {
          display: grid;
          gap: var(--grid-gap-lg);
          width: 100%;
        }

        /* ── Card ── */
        .testi-card {
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: var(--space-6) var(--space-5);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          transition: opacity .3s ease, transform .3s ease, border-color .3s ease;
          opacity: 0.7;
        }
        .testi-card-active {
          opacity: 1;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .testi-quote {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 4rem;
          color: rgba(129, 140, 248, 0.22);
          line-height: 0.7;
          user-select: none;
          margin-bottom: 4px;
        }

        .testi-stars {
          display: flex;
          gap: 2px;
        }

        .testi-text {
          color: #e4e4e7;
          font-size: 0.9375rem;
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }

        .testi-badge {
          align-self: flex-start;
          border: 1px solid;
          border-radius: var(--r-full);
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: var(--space-2);
        }
        .testi-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          color: #fff;
          flex-shrink: 0;
        }
        .testi-author-info {
          min-width: 0;
        }
        .testi-author-name {
          color: var(--text-1);
          font-weight: 700;
          font-size: 0.9rem;
          line-height: 1.3;
        }
        .testi-author-meta {
          color: var(--text-3);
          font-size: 0.75rem;
          margin-top: 2px;
        }

        /* ── Arrows ── */
        .testi-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-2);
          z-index: 2;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .testi-arrow:hover {
          background: var(--accent-deep);
          color: #fff;
          border-color: var(--accent-deep);
        }
        .testi-arrow:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .testi-arrow-prev { left: -8px; }
        .testi-arrow-next { right: -8px; }

        @media (max-width: 640px) {
          .testi-carousel {
            padding: 0;
          }
          .testi-arrow {
            top: auto;
            bottom: -64px;
            transform: none;
          }
          .testi-arrow-prev { left: calc(50% - 56px); }
          .testi-arrow-next { right: calc(50% - 56px); }
        }

        /* ── Dots ── */
        .testi-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: var(--space-7);
        }
        @media (max-width: 640px) {
          .testi-dots { margin-top: var(--space-9); }
        }

        .testi-dot {
          width: 8px;
          height: 8px;
          border-radius: var(--r-full);
          background: #27272a;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width .3s var(--ease-smooth),
                      background .3s ease;
        }
        .testi-dot:hover {
          background: var(--text-3);
        }
        .testi-dot-active {
          width: 24px;
          background: var(--accent);
        }
        .testi-dot:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .testi-card,
          .testi-dot,
          .testi-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}