'use client';

import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   BENTO GRID
   ─────────────────────────────────────────────────
   • Responsive 3 / 2 / 1 column layout
   • Header (visual) sits on top, content below
   • Subtle lift + glow on hover
   • Respects reduced-motion
═══════════════════════════════════════════════════ */
export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn('bento-grid', className)}>
      {children}

      <style>{`
        .bento-grid {
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(0, auto);
          gap: var(--grid-gap-lg);
        }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .bento-grid {
            grid-template-columns: 1fr;
            gap: var(--grid-gap);
          }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   BENTO GRID ITEM
═══════════════════════════════════════════════════ */
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <article className={cn('bento-item', className)}>

      {/* Visual header (top) */}
      {header && (
        <div className="bento-item-header">
          {header}
        </div>
      )}

      {/* Content */}
      <div className="bento-item-content">
        {icon && <div className="bento-item-icon">{icon}</div>}

        {title && (
          <h3 className="bento-item-title">{title}</h3>
        )}

        {description && (
          <p className="bento-item-desc">{description}</p>
        )}
      </div>

      <style>{`
        .bento-item {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
          padding: var(--space-6);
          background: #0a0a14;
          border: 1px solid var(--border);
          border-radius: var(--r-xl);
          overflow: hidden;
          transition: border-color .3s var(--ease-smooth),
                      box-shadow .3s ease,
                      transform .3s var(--ease-smooth);
        }
        .bento-item:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 16px 40px rgba(99, 102, 241, 0.12);
          transform: translateY(-2px);
        }

        /* Header visual block */
        .bento-item-header {
          width: 100%;
          border-radius: var(--r-md);
          overflow: hidden;
          background: #060610;
          border: 1px solid rgba(255, 255, 255, 0.04);
          /*
            Keeps the visual contained; child components
            (like GridPattern) define their own aspect-ratio.
          */
        }

        /* Content stack */
        .bento-item-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .bento-item-icon {
          display: flex;
          align-items: center;
          color: var(--accent);
          margin-bottom: var(--space-1);
        }

        .bento-item-title {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          color: var(--text-1);
          font-weight: 700;
          font-size: 1.0625rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .bento-item-desc {
          color: var(--text-2);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bento-item {
            transition: none !important;
          }
          .bento-item:hover {
            transform: none !important;
          }
        }
      `}</style>
    </article>
  );
};