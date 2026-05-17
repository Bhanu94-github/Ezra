'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

/* ═══════════════════════════════════════════════════
   DYNAMIC IMPORTS
   ─────────────────────────────────────────────────
   Strategy:
   • Above-the-fold (Navbar, Hero)        → SSR enabled for SEO + LCP
   • Below-the-fold heavy components      → SSR enabled, no loading flash
   • Three.js / Globe (massive bundle)    → SSR disabled, lazy loaded
═══════════════════════════════════════════════════ */

// ── Above-the-fold: load eagerly with SSR ──
const Navbar = dynamic(() => import('@/components/Navbar'));
const HeroSection = dynamic(() => import('@/components/HeroSection'));

// ── Below-the-fold: SSR enabled for SEO ──
const StatsSection = dynamic(() => import('@/components/StatsSection'));
const AppPreviewSection = dynamic(() => import('@/components/AppPreviewSection'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const ServicesSection = dynamic(() => import('@/components/ServicesSection'));
const ForEveryoneSection = dynamic(() => import('@/components/ForEveryoneSection'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const GetStartedSection = dynamic(() => import('@/components/GetStartedSection'));
const Footer = dynamic(() => import('@/components/Footer'));

// ── Heavy 3D component: client-only ──
const GlobeSection = dynamic(() => import('@/components/GlobeSection'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} aria-hidden />,
});

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    /* ── Respect reduced-motion preference ── */
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /* ── Detect touch device → skip cursor entirely ── */
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /* ════════════════════════════════════════
       SCROLL PROGRESS + BACK-TO-TOP
       Throttled with rAF for 60fps performance
    ════════════════════════════════════════ */
    const progressBar = document.getElementById('scroll-progress');
    const backTop = document.getElementById('back-to-top');

    let scrollTicking = false;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) progressBar.style.width = `${pct}%`;
      if (backTop) backTop.classList.toggle('visible', scrollTop > 500);

      scrollTicking = false;
    };

    const onScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateScroll);
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    /* ════════════════════════════════════════
       CUSTOM CURSOR
       Skip entirely on touch devices or reduced-motion
    ════════════════════════════════════════ */
    let cleanupCursor = () => { };

    if (!isTouchDevice && !prefersReducedMotion) {
      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');

      const cursorPos = { x: 0, y: 0 };
      const ringPos = { x: 0, y: 0 };
      let cursorFrame;

      const moveCursor = (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;
        if (dot) {
          dot.style.left = `${e.clientX}px`;
          dot.style.top = `${e.clientY}px`;
        }
      };

      const animateRing = () => {
        ringPos.x += (cursorPos.x - ringPos.x) * 0.12;
        ringPos.y += (cursorPos.y - ringPos.y) * 0.12;
        if (ring) {
          ring.style.left = `${ringPos.x}px`;
          ring.style.top = `${ringPos.y}px`;
        }
        cursorFrame = requestAnimationFrame(animateRing);
      };

      /* ── Hover states via EVENT DELEGATION ──
         Single listener on document, no MutationObserver.
         Massive performance improvement vs old approach. */
      const handlePointerOver = (e) => {
        const target = e.target.closest('button, a, [role="button"]');
        if (target && ring) {
          ring.style.width = '56px';
          ring.style.height = '56px';
          ring.style.background = 'rgba(99,102,241,0.06)';
          ring.style.borderColor = 'rgba(129,140,248,0.5)';
        }
      };

      const handlePointerOut = (e) => {
        const target = e.target.closest('button, a, [role="button"]');
        if (target && ring) {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.background = 'transparent';
          ring.style.borderColor = 'rgba(129,140,248,0.35)';
        }
      };

      document.addEventListener('mousemove', moveCursor, { passive: true });
      document.addEventListener('pointerover', handlePointerOver, { passive: true });
      document.addEventListener('pointerout', handlePointerOut, { passive: true });
      cursorFrame = requestAnimationFrame(animateRing);

      cleanupCursor = () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('pointerover', handlePointerOver);
        document.removeEventListener('pointerout', handlePointerOut);
        cancelAnimationFrame(cursorFrame);
      };
    } else {
      /* Hide cursor elements on touch / reduced-motion */
      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
      document.body.style.cursor = 'auto';
    }

    /* ════════════════════════════════════════
       CLEANUP
    ════════════════════════════════════════ */
    return () => {
      window.removeEventListener('scroll', onScroll);
      cleanupCursor();
    };
  }, []);

  /* ── Smooth scroll handler for back-to-top ── */
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* ════════════════════════════════════════
          SKIP TO CONTENT — Accessibility
      ════════════════════════════════════════ */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ════════════════════════════════════════
          GLOBAL UI ELEMENTS
          All styling lives in globals.css —
          no inline styles needed.
      ════════════════════════════════════════ */}
      <div id="scroll-progress" aria-hidden />
      <div id="cursor-dot" aria-hidden />
      <div id="cursor-ring" aria-hidden />

      {/* ════════════════════════════════════════
          PAGE STRUCTURE
      ════════════════════════════════════════ */}
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <AppPreviewSection />
        <HowItWorks />
        <ServicesSection />
        <GlobeSection />
        <ForEveryoneSection />
        <TestimonialsSection />
        <GetStartedSection />
      </main>

      <Footer />

      {/* ════════════════════════════════════════
          BACK TO TOP — styled via globals.css
      ════════════════════════════════════════ */}
      <button
        id="back-to-top"
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            d="M18 15l-6-6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ════════════════════════════════════════
          SKIP-LINK STYLES (only thing not in globals)
      ════════════════════════════════════════ */}
      <style>{`
        .skip-link {
          position: absolute;
          top: -100px;
          left: 16px;
          padding: 12px 20px;
          background: var(--accent-deep);
          color: #fff;
          font-weight: 600;
          border-radius: var(--r-md);
          z-index: 999999;
          transition: top 0.2s ease;
        }
        .skip-link:focus {
          top: 16px;
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* Back-to-top icon color (inherits from button) */
        #back-to-top { color: #fff; }
      `}</style>
    </>
  );
}