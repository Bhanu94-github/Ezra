'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   HOVER EFFECT GRID
   ─────────────────────────────────────────────────
   • Animated hover background using shared layoutId
   • Unique per-instance ID prevents cross-component bleeding
   • Full keyboard + screen reader support
   • Respects reduced-motion preference
═══════════════════════════════════════════════════ */
export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /*
    Unique ID per HoverEffect instance.
    Without this, two <HoverEffect> on the same page would share
    the same layoutId and animate between each other.
  */
  const instanceId = useId();

  return (
    <ul
      className={cn('hover-effect-grid', className)}
      role="list"
    >
      {items.map((item, idx) => {
        const isExternal = item?.link?.startsWith('http');
        const href = item?.link || '#';

        return (
          <li key={item.title || idx} className="hover-effect-item">
            <a
              href={href}
              className="hover-effect-link group"
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(idx)}
              onBlur={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId={`hover-bg-${instanceId}`}
                    className="hover-effect-bg"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                    aria-hidden
                  />
                )}
              </AnimatePresence>

              <Card>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            </a>
          </li>
        );
      })}

      <style>{`
        .hover-effect-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--grid-gap-lg);
        }
        @media (max-width: 900px) {
          .hover-effect-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .hover-effect-grid {
            grid-template-columns: 1fr;
            gap: var(--grid-gap);
          }
        }

        .hover-effect-item {
          display: block;
        }

        .hover-effect-link {
          position: relative;
          display: block;
          height: 100%;
          width: 100%;
          padding: 12px;
          border-radius: var(--r-xl);
          text-decoration: none;
          color: inherit;
          outline: none;
        }
        .hover-effect-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .hover-effect-bg {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          background: rgba(49, 46, 129, 0.55);
          border-radius: var(--r-xl);
          z-index: 1;
        }

        /* Reduced motion — disable layout animation */
        @media (prefers-reduced-motion: reduce) {
          .hover-effect-bg {
            transition: none !important;
          }
        }
      `}</style>
    </ul>
  );
};

/* ═══════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════ */
export const Card = ({ className, children }) => {
  return (
    <article className={cn('hover-card', className)}>
      <div className="hover-card-inner">{children}</div>

      <style>{`
        .hover-card {
          position: relative;
          z-index: 2;
          height: 100%;
          width: 100%;
          overflow: hidden;
          background: #0a0a14;
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          transition: border-color .3s var(--ease-smooth),
                      box-shadow .3s ease,
                      transform .3s var(--ease-smooth);
        }
        .group:hover .hover-card,
        .group:focus-visible .hover-card {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.12);
        }

        .hover-card-inner {
          position: relative;
          z-index: 3;
          height: 100%;
          width: 100%;
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-3);
        }

        @media (prefers-reduced-motion: reduce) {
          .hover-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </article>
  );
};

/* ═══════════════════════════════════════════════════
   CARD TITLE
═══════════════════════════════════════════════════ */
export const CardTitle = ({ className, children }) => {
  return (
    <h3 className={cn('hover-card-title', className)}>
      {children}

      <style>{`
        .hover-card-title {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          color: var(--text-1);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0;
        }
      `}</style>
    </h3>
  );
};

/* ═══════════════════════════════════════════════════
   CARD DESCRIPTION
═══════════════════════════════════════════════════ */
export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn('hover-card-desc', className)}>
      {children}

      <style>{`
        .hover-card-desc {
          color: var(--text-2);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </p>
  );
};