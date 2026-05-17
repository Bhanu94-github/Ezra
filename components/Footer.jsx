'use client';

import { useState } from 'react';

/* ═══════════════════════════════════════════════════
   FOOTER DATA
═══════════════════════════════════════════════════ */
const LINK_GROUPS = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Services', href: '#services' },
      { label: 'For Workers', href: '#for-everyone' },
      { label: 'For Businesses', href: '#for-everyone' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Painting', href: '#painting' },
      { label: 'Plumbing', href: '#plumbing' },
      { label: 'Electrical', href: '#electrical' },
      { label: 'Carpentry', href: '#carpentry' },
      { label: 'Cleaning', href: '#cleaning' },
      { label: 'AC Repair', href: '#ac-repair' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Report Issue', href: '#report' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/ezra',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/ezra',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/ezra',
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@ezra',
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

/* ═══════════════════════════════════════════════════
   FOOTER COMPONENT
═══════════════════════════════════════════════════ */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    /* Simulate API call — replace with real endpoint */
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <footer id="footer" className="footer" aria-label="Site footer">
      <div className="section-container">

        {/* ════════════════════════════════════
            TOP — BRAND + NAV + NEWSLETTER
        ════════════════════════════════════ */}
        <div className="footer-top">

          {/* Brand column */}
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="footer-logo-text">Ezra</span>
            </a>
            <p className="footer-tagline">
              India's trusted marketplace for finding skilled workers —
              instantly.
            </p>
            <p className="footer-promise">
              Free to use · No commission
            </p>

            {/* Newsletter */}
            <form
              className="footer-newsletter"
              onSubmit={handleSubmit}
              noValidate
            >
              <label
                htmlFor="footer-email"
                className="footer-newsletter-label"
              >
                Stay updated
              </label>
              <div className="footer-newsletter-row">
                <input
                  id="footer-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className="footer-newsletter-input"
                  aria-describedby="footer-email-status"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="footer-newsletter-btn"
                  disabled={status === 'loading' || status === 'success'}
                  aria-label="Subscribe to newsletter"
                >
                  {status === 'loading' ? '…' : status === 'success' ? '✓' : '→'}
                </button>
              </div>
              <p
                id="footer-email-status"
                className={`footer-newsletter-status ${status === 'error' ? 'footer-newsletter-status-error' :
                    status === 'success' ? 'footer-newsletter-status-success' : ''
                  }`}
                aria-live="polite"
              >
                {status === 'error' ? 'Please enter a valid email address.' :
                  status === 'success' ? 'Thanks! You\'re on the list.' :
                    'Get product updates. No spam.'}
              </p>
            </form>
          </div>

          {/* Link columns */}
          {LINK_GROUPS.map((group) => (
            <nav
              key={group.title}
              className="footer-nav-col"
              aria-label={group.title}
            >
              <h2 className="footer-nav-heading">{group.title}</h2>
              <ul className="footer-nav-list" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ════════════════════════════════════
            DIVIDER
        ════════════════════════════════════ */}
        <hr className="footer-divider" aria-hidden />

        {/* ════════════════════════════════════
            BOTTOM — COPYRIGHT + SOCIAL + LEGAL
        ════════════════════════════════════ */}
        <div className="footer-bottom">

          <p className="footer-copyright">
            © {currentYear} Ezra. All rights reserved.
          </p>

          {/* Social */}
          <ul className="footer-social" role="list" aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ezra on ${social.label}`}
                >
                  <svg
                    width="18" height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Legal */}
          <ul className="footer-legal" role="list">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer-legal-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Footer base ── */
        .footer {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: var(--space-11) 0 var(--space-7);
          color: var(--text-2);
        }

        /* ── Top grid ── */
        .footer-top {
          display: grid;
          grid-template-columns: minmax(260px, 1.4fr) repeat(3, 1fr);
          gap: var(--space-8);
          margin-bottom: var(--space-9);
        }

        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
            max-width: 480px;
          }
        }
        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-7);
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 420px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
        }

        /* ── Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          margin-bottom: var(--space-2);
          width: fit-content;
        }
        .footer-logo-text {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.375rem;
          color: var(--text-1);
          letter-spacing: -0.03em;
        }
        .footer-tagline {
          color: var(--text-2);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
          max-width: 360px;
        }
        .footer-promise {
          color: var(--text-3);
          font-size: 0.8125rem;
          margin: 0 0 var(--space-2);
        }

        /* ── Newsletter ── */
        .footer-newsletter {
          margin-top: var(--space-4);
          max-width: 360px;
        }
        .footer-newsletter-label {
          display: block;
          color: var(--text-1);
          font-size: 0.8125rem;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .footer-newsletter-row {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: var(--r-full);
          padding: 4px;
          transition: border-color .2s ease;
        }
        .footer-newsletter-row:focus-within {
          border-color: var(--accent);
        }
        .footer-newsletter-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-1);
          font-family: inherit;
          font-size: 0.875rem;
          padding: 8px 14px;
        }
        .footer-newsletter-input::placeholder {
          color: var(--text-3);
        }
        .footer-newsletter-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .footer-newsletter-btn {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--accent-deep),
            var(--accent)
          );
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .2s ease, opacity .2s ease;
        }
        .footer-newsletter-btn:hover:not(:disabled) {
          transform: scale(1.06);
        }
        .footer-newsletter-btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        .footer-newsletter-status {
          color: var(--text-3);
          font-size: 0.75rem;
          margin: 8px 0 0;
          min-height: 1em;
          transition: color .2s ease;
        }
        .footer-newsletter-status-error   { color: var(--rose);    }
        .footer-newsletter-status-success { color: var(--emerald); }

        /* ── Nav columns ── */
        .footer-nav-col {
          min-width: 0;
        }
        .footer-nav-heading {
          color: rgba(255, 255, 255, 0.4);
          font-family: inherit;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 var(--space-5);
          line-height: 1;
        }
        .footer-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-nav-link {
          color: var(--text-3);
          text-decoration: none;
          font-size: 0.875rem;
          line-height: 1.4;
          transition: color .2s ease;
          display: inline-block;
        }
        .footer-nav-link:hover,
        .footer-nav-link:focus-visible {
          color: var(--text-1);
          outline: none;
        }
        .footer-nav-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 2px;
        }

        /* ── Divider ── */
        .footer-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0 0 var(--space-6);
        }

        /* ── Bottom row ── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-5);
        }

        .footer-copyright {
          color: var(--text-3);
          font-size: 0.8125rem;
          margin: 0;
          order: 1;
        }

        .footer-social {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: var(--space-2);
          order: 2;
        }
        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: var(--text-3);
          text-decoration: none;
          transition: color .2s ease,
                      background .2s ease,
                      border-color .2s ease,
                      transform .2s ease;
        }
        .footer-social-link:hover {
          color: var(--text-1);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        .footer-social-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .footer-legal {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: var(--space-5);
          order: 3;
        }
        .footer-legal-link {
          color: var(--text-3);
          font-size: 0.8125rem;
          text-decoration: none;
          transition: color .2s ease;
        }
        .footer-legal-link:hover,
        .footer-legal-link:focus-visible {
          color: var(--text-2);
          outline: none;
        }
        .footer-legal-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 2px;
        }

        @media (max-width: 640px) {
          .footer-bottom {
            justify-content: center;
            text-align: center;
          }
          .footer-copyright { order: 3; flex: 1 1 100%; }
          .footer-social    { order: 1; }
          .footer-legal     { order: 2; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .footer-social-link:hover,
          .footer-newsletter-btn:hover:not(:disabled) {
            transform: none !important;
          }
        }
      `}</style>
    </footer>
  );
}