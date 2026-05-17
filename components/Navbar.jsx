'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   NAV CONFIG
═══════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'For Workers', href: '#for-everyone' },
  { label: 'Coverage', href: '#coverage' },
];

/* ═══════════════════════════════════════════════════
   NAVBAR COMPONENT
═══════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll detection (throttled with rAF) ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock when mobile menu open ── */
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileOpen]);

  /* ── Close menu on Escape key ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  /* ── Logo click → scroll to top ── */
  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ── Mobile link click → close menu ── */
  const handleMobileLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP / MOBILE NAVBAR
      ════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        aria-label="Primary navigation"
      >
        <div className="nav-inner">

          {/* ── Logo ── */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="nav-logo"
            aria-label="Ezra — Home"
          >
            <span className="nav-logo-text">Ezra</span>
          </a>

          {/* ── Desktop Links ── */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop Actions ── */}
          <div className="nav-actions">
            <button type="button" className="nav-login">
              Log in
            </button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="nav-cta"
            >
              Get Started
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="22" height="22"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              aria-hidden
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE MENU OVERLAY
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu"
          >
            {/* Top bar inside mobile menu */}
            <div className="mobile-menu-header">
              <a
                href="#"
                onClick={handleLogoClick}
                className="nav-logo"
                aria-label="Ezra — Home"
              >
                <span className="nav-logo-text">Ezra</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mobile-menu-close"
                aria-label="Close navigation menu"
              >
                <svg
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="mobile-menu-nav" aria-label="Mobile primary navigation">
              <ul role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      className="mobile-menu-link"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.4 }}
              className="mobile-menu-actions"
            >
              <button
                type="button"
                className="btn-ghost"
                style={{ width: '100%' }}
                onClick={handleMobileLinkClick}
              >
                Log in
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={handleMobileLinkClick}
              >
                Get Started — Free
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          NAVBAR STYLES
          Scoped here for component cohesion.
          Uses design tokens from globals.css.
      ════════════════════════════════════════ */}
      <style>{`
        /* ── Nav container ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9000;
          height: 64px;
          display: flex;
          align-items: center;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background .35s var(--ease-smooth),
                      border-color .35s var(--ease-smooth),
                      backdrop-filter .35s var(--ease-smooth);
        }
        .nav-scrolled {
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom-color: var(--border);
        }

        /* ── Inner container — matches site container ── */
        .nav-inner {
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-px);
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: auto;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-text {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-1);
          letter-spacing: -0.03em;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          list-style: none;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color .2s ease;
          position: relative;
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          color: var(--text-1);
          outline: none;
        }
        .nav-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 6px;
          border-radius: 2px;
        }

        /* ── Desktop actions ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .nav-login {
          background: transparent;
          color: rgba(255, 255, 255, 0.65);
          border: none;
          padding: 8px 16px;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          border-radius: var(--r-sm);
          transition: color .2s ease, background .2s ease;
        }
        .nav-login:hover {
          color: var(--text-1);
          background: rgba(255, 255, 255, 0.04);
        }
        .nav-cta {
          background: linear-gradient(135deg, var(--accent-deep), var(--accent));
          color: #fff;
          border: none;
          border-radius: var(--r-full);
          padding: 9px 22px;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);
          transition: box-shadow .2s ease;
        }
        .nav-cta:hover {
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.45);
        }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
          padding: 8px;
          border-radius: var(--r-sm);
          transition: background .2s ease;
        }
        .nav-hamburger:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        /* ── Mobile menu ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .mobile-menu-header {
          height: 64px;
          padding: 0 var(--container-px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .mobile-menu-close {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          padding: 8px;
          border-radius: var(--r-sm);
          transition: color .2s ease, background .2s ease;
        }
        .mobile-menu-close:hover {
          color: var(--text-1);
          background: rgba(255, 255, 255, 0.06);
        }
        .mobile-menu-nav {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8) var(--container-px);
        }
        .mobile-menu-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-6);
          width: 100%;
        }
        .mobile-menu-link {
          color: var(--text-1);
          text-decoration: none;
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 6vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.1;
          display: inline-block;
          padding: 4px 8px;
          transition: color .2s ease;
        }
        .mobile-menu-link:hover,
        .mobile-menu-link:focus-visible {
          color: var(--accent);
          outline: none;
        }
        .mobile-menu-actions {
          padding: var(--space-6) var(--container-px) var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          max-width: 360px;
          width: 100%;
          margin: 0 auto;
          flex-shrink: 0;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 900px) {
          .nav-links { display: none; }
        }
        @media (max-width: 768px) {
          .nav-actions   { display: none; }
          .nav-hamburger { display: inline-flex; align-items: center; justify-content: center; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}