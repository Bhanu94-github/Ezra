'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   CONTAINER SCROLL ANIMATION
   ─────────────────────────────────────────────────
   3D tilt-on-scroll effect for showcasing content.
   • Auto-disabled on prefers-reduced-motion
   • Throttled resize detection
   • Theme-aligned colors
   • Performant transforms with will-change
═══════════════════════════════════════════════════ */
export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    /*
      offset controls when animation starts and ends.
      Default behavior keyed to the container's visibility.
    */
    offset: ['start end', 'end start'],
  });

  /* ── Detect mobile (throttled with rAF) ── */
  useEffect(() => {
    let rafId;
    const checkMobile = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth <= 768);
      });
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  /* ── Detect reduced-motion preference ── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /*
    Animation ranges:
    - Desktop: starts slightly zoomed-in, tilts 20°, scales to 1.0
    - Mobile:  smaller scale range for less aggressive movement
    - Reduced motion: no rotation, no scale change, no translate
  */
  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [20, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : scaleRange
  );
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -100]
  );

  return (
    <div ref={containerRef} className="container-scroll">
      <div className="container-scroll-inner">

        <Header
          translate={translate}
          titleComponent={titleComponent}
        />

        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>

      <style>{`
        .container-scroll {
          position: relative;
          height: 50rem;
          padding: var(--space-2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .container-scroll {
            height: 60rem;
            padding: var(--space-8);
          }
        }

        .container-scroll-inner {
          width: 100%;
          position: relative;
          padding: var(--space-7) 0;
          perspective: 1000px;
        }
        @media (min-width: 768px) {
          .container-scroll-inner {
            padding: var(--space-12) 0;
          }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════ */
export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        willChange: 'transform',
      }}
      className="container-scroll-header"
    >
      {titleComponent}

      <style>{`
        .container-scroll-header {
          max-width: 64rem;
          margin: 0 auto;
          text-align: center;
        }
      `}</style>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════ */
export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        willChange: 'transform',
      }}
      className="container-scroll-card"
    >
      <div className="container-scroll-card-inner">
        {children}
      </div>

      <style>{`
        .container-scroll-card {
          position: relative;
          max-width: 64rem;
          width: 100%;
          height: 30rem;
          margin: 0 auto;
          padding: var(--space-2);
          background: #0e0e1a;
          border: 2px solid #27274a;
          border-radius: 30px;
          box-shadow:
            0 9px 20px    rgba(0, 0, 0, 0.29),
            0 37px 37px   rgba(0, 0, 0, 0.26),
            0 84px 50px   rgba(0, 0, 0, 0.15),
            0 149px 60px  rgba(0, 0, 0, 0.04),
            0 233px 65px  rgba(0, 0, 0, 0.01);
        }
        @media (min-width: 768px) {
          .container-scroll-card {
            height: 40rem;
            padding: var(--space-5);
          }
        }

        .container-scroll-card-inner {
          height: 100%;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: var(--surface-2);
        }
        @media (min-width: 768px) {
          .container-scroll-card-inner {
            padding: var(--space-4);
          }
        }

        /* Reduced motion — flat card, no transforms */
        @media (prefers-reduced-motion: reduce) {
          .container-scroll-card {
            transform: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
};