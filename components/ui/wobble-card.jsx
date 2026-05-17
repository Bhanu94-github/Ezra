'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   WOBBLE CARD
   ─────────────────────────────────────────────────
   • Tilt-follows-mouse parallax effect
   • Auto-disabled on touch devices
   • Auto-disabled on prefers-reduced-motion
   • Performance: will-change hints + transform3d
═══════════════════════════════════════════════════ */
export const WobbleCard = ({
  children,
  containerClassName,
  className,
  sensitivity = 20,    // higher = subtler wobble
  scale = 1.03,  // inner zoom amount on hover
  noise = true,  // toggle noise texture
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const cardRef = useRef(null);

  /* ── Auto-disable on touch + reduced-motion ── */
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    setIsEnabled(!isTouch && !prefersReduced);

    /* Listen for runtime preference changes */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setIsEnabled(!isTouch && !e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ── Mouse tracking ── */
  const handleMouseMove = useCallback(
    (e) => {
      if (!isEnabled || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / sensitivity;
      const y = (e.clientY - (rect.top + rect.height / 2)) / sensitivity;
      setMousePos({ x, y });
    },
    [isEnabled, sensitivity]
  );

  const handleMouseEnter = useCallback(() => {
    if (isEnabled) setIsHovering(true);
  }, [isEnabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  /* ── Transforms ── */
  const outerTransform = isHovering
    ? `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
    : 'translate3d(0, 0, 0)';

  const innerTransform = isHovering
    ? `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0) scale3d(${scale}, ${scale}, 1)`
    : 'translate3d(0, 0, 0) scale3d(1, 1, 1)';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: outerTransform,
        transition: 'transform 0.15s ease-out',
        willChange: isEnabled ? 'transform' : 'auto',
      }}
      className={cn('wobble-card', containerClassName)}
    >
      <div className="wobble-card-surface">
        <motion.div
          style={{
            transform: innerTransform,
            transition: 'transform 0.15s ease-out',
            willChange: isEnabled ? 'transform' : 'auto',
          }}
          className={cn('wobble-card-inner', className)}
        >
          {noise && <Noise />}
          {children}
        </motion.div>
      </div>

      <style>{`
        .wobble-card {
          position: relative;
          width: 100%;
          margin: 0 auto;
          background: #3730a3; /* indigo-800 default, overridden by containerClassName */
          border-radius: var(--r-xl);
          overflow: hidden;
        }

        .wobble-card-surface {
          position: relative;
          height: 100%;
          overflow: hidden;
          border-radius: var(--r-xl);
          background-image: radial-gradient(
            88% 100% at top,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0)
          );
          box-shadow:
            0 10px 32px  rgba(34, 42, 53, 0.12),
            0 1px 1px    rgba(0, 0, 0, 0.05),
            0 0 0 1px    rgba(34, 42, 53, 0.05),
            0 4px 6px    rgba(34, 42, 53, 0.08),
            0 24px 108px rgba(47, 48, 55, 0.10);
        }

        .wobble-card-inner {
          position: relative;
          height: 100%;
          padding: var(--space-7);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .wobble-card-inner {
            padding: var(--space-8);
          }
        }
      `}</style>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   NOISE TEXTURE
   ─────────────────────────────────────────────────
   Subtle film grain over the card.
   Loads /noise.webp lazily via CSS.
═══════════════════════════════════════════════════ */
const Noise = () => {
  return (
    <div className="wobble-noise" aria-hidden>
      <style>{`
        .wobble-noise {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: scale(1.2);
          opacity: 0.1;
          background-image: url('/noise.webp');
          background-size: 30%;
          -webkit-mask-image: radial-gradient(#fff, transparent, 75%);
                  mask-image: radial-gradient(#fff, transparent, 75%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};