'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { WobbleCard } from '@/components/ui/wobble-card';

/* ═══════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════
   TAB DATA
═══════════════════════════════════════════════════ */
const TABS = [
  {
    id: 'customer',
    label: 'Customers',
    icon: '👤',
    headline: 'Getting quality workers was never this easy',
    benefits: [
      'Post your job in under 2 minutes',
      'See verified workers on map near you',
      'Compare prices, ratings, and reviews',
      'Track work progress with daily photos',
      'Pay only when you are satisfied',
    ],
    cta: 'Start as Customer — Free',
    color: 'var(--accent)',
  },
  {
    id: 'worker',
    label: 'Workers',
    icon: '🔧',
    headline: 'Get consistent work and earn more',
    benefits: [
      'Find jobs near your exact location',
      'Set your own availability and schedule',
      'Track your daily and monthly earnings',
      'Build your professional reputation online',
      'Get paid on time, every time',
    ],
    cta: 'Join as Worker — Free',
    color: 'var(--emerald)',
  },
  {
    id: 'mistri',
    label: 'Mistris',
    icon: '👷',
    headline: 'Manage your team the professional way',
    benefits: [
      'Manage up to 20 workers in one platform',
      'Bid on multiple jobs simultaneously',
      "Track each worker's attendance digitally",
      'Handle all team payments through the app',
      'Build your business reputation online',
    ],
    cta: 'Join as Mistri — Free',
    color: 'var(--violet)',
  },
];

/* ═══════════════════════════════════════════════════
   VISUAL PANEL DATA
═══════════════════════════════════════════════════ */
const NOTIFICATIONS = [
  { id: 'n1', text: 'Worker accepted your job' },
  { id: 'n2', text: 'Worker arrived on location' },
  { id: 'n3', text: 'Job completed — rate now' },
];

const EARNINGS_BARS = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 70 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 65 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 75 },
];

const TEAM_MEMBERS = [
  { id: 't1', name: 'Raj', online: true },
  { id: 't2', name: 'Suresh', online: false },
  { id: 't3', name: 'Amit', online: true },
  { id: 't4', name: 'Dev', online: false },
];

/* ═══════════════════════════════════════════════════
   VISUAL PANELS (extracted for readability)
═══════════════════════════════════════════════════ */
function CustomerPanel({ color }) {
  return (
    <>
      <p className="fe-panel-label">Your notifications</p>
      <div className="fe-notif-list">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, ease: EASE }}
            className="fe-notif"
          >
            <span
              className="fe-notif-dot"
              style={{ background: color }}
              aria-hidden
            />
            <span>{n.text}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function WorkerPanel() {
  return (
    <>
      <p className="fe-panel-label">This Month</p>
      <p className="fe-earnings">₹12,400</p>
      <p className="fe-earnings-trend">↑ 24% from last month</p>

      <div
        className="fe-chart"
        role="img"
        aria-label="Earnings chart showing 24% growth over the week"
      >
        {EARNINGS_BARS.map((bar, i) => (
          <motion.div
            key={bar.day}
            initial={{ height: 0 }}
            animate={{ height: `${bar.value}%` }}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: EASE,
            }}
            className="fe-chart-bar"
            title={`${bar.day}: ${bar.value}%`}
          />
        ))}
      </div>
    </>
  );
}

function MistriPanel() {
  return (
    <>
      <p className="fe-panel-label">Team of 12 · 8 Active</p>
      <ul className="fe-team-list" role="list">
        {TEAM_MEMBERS.map((m) => (
          <li key={m.id} className="fe-team-member">
            <span className="fe-team-avatar" aria-hidden>
              {m.name[0]}
            </span>
            <span className="fe-team-name">{m.name}</span>
            <span
              className="fe-team-status"
              style={{
                background: m.online ? 'var(--emerald)' : 'var(--amber)',
              }}
              aria-label={m.online ? 'Online' : 'Away'}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

const PANEL_COMPONENTS = {
  customer: CustomerPanel,
  worker: WorkerPanel,
  mistri: MistriPanel,
};

/* ═══════════════════════════════════════════════════
   FOR EVERYONE SECTION
═══════════════════════════════════════════════════ */
export default function ForEveryoneSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef([]);
  const tab = TABS.find((t) => t.id === activeTab);
  const Panel = PANEL_COMPONENTS[tab.id];

  /* ── Keyboard navigation between tabs ── */
  const handleKeyDown = useCallback(
    (e, idx) => {
      const last = TABS.length - 1;
      let nextIdx;

      switch (e.key) {
        case 'ArrowRight':
          nextIdx = idx === last ? 0 : idx + 1;
          break;
        case 'ArrowLeft':
          nextIdx = idx === 0 ? last : idx - 1;
          break;
        case 'Home':
          nextIdx = 0;
          break;
        case 'End':
          nextIdx = last;
          break;
        default:
          return;
      }

      e.preventDefault();
      setActiveTab(TABS[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    },
    []
  );

  return (
    <section id="for-everyone" className="fe-section">

      {/* Decorative top rule */}
      <div className="section-rule-top" aria-hidden />

      <div className="section-container">

        {/* ════════════════════════════════════
            HEADER
        ════════════════════════════════════ */}
        <header className="fe-header">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill"
          >
            Built For Everyone
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="fe-heading"
          >
            The Platform That{' '}
            <span className="text-gradient">Works For All</span>
          </motion.h2>

          {/* ════════════════════════════════════
              TAB BAR
          ════════════════════════════════════ */}
          <div
            className="fe-tabs"
            role="tablist"
            aria-label="Choose your role"
          >
            {TABS.map((t, i) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(t.id)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`fe-tab ${isActive ? 'fe-tab-active' : ''}`}
                >
                  <span aria-hidden>{t.icon}</span> {t.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* ════════════════════════════════════
            ANIMATED PANEL
        ════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <WobbleCard
              containerClassName="bg-indigo-950"
              className="px-6 py-10 sm:px-12 sm:py-14"
            >
              <div className="fe-panel">

                {/* LEFT: Benefits + CTA */}
                <div className="fe-panel-content">
                  <h3 className="fe-panel-heading">{tab.headline}</h3>

                  <ul className="fe-benefits" role="list">
                    {tab.benefits.map((benefit, i) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, ease: EASE }}
                        className="fe-benefit"
                      >
                        <CheckCircle
                          size={22}
                          style={{
                            color: tab.color,
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button type="button" className="fe-cta">
                    {tab.cta}
                    <svg
                      width="16" height="16"
                      viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* RIGHT: Visual */}
                <div className="fe-panel-visual">
                  <div className="fe-visual-card">
                    <Panel color={tab.color} />
                  </div>
                </div>
              </div>
            </WobbleCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════
          STYLES
      ═══════════════════════════════════════ */}
      <style>{`
        /* ── Section ── */
        .fe-section {
          position: relative;
          background: var(--bg);
          padding: var(--section-py) 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .fe-header {
          text-align: center;
          margin: 0 auto var(--space-8);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-5);
        }
        .fe-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: var(--text-5xl);
          font-weight: 900;
          color: var(--text-1);
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin: 0;
          max-width: 720px;
        }

        /* ── Tab bar ── */
        .fe-tabs {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: var(--r-md);
          padding: 3px;
          gap: 3px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .fe-tab {
          background: transparent;
          color: var(--text-3);
          border: none;
          border-radius: 11px;
          padding: 10px 22px;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background .25s var(--ease-smooth),
                      color .25s var(--ease-smooth);
          white-space: nowrap;
        }
        .fe-tab:hover {
          color: var(--text-1);
        }
        .fe-tab:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .fe-tab-active {
          background: linear-gradient(135deg, var(--accent-deep), var(--accent));
          color: #fff;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
        }
        .fe-tab-active:hover {
          color: #fff;
        }

        /* ── Panel layout ── */
        .fe-panel {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-9);
          align-items: center;
        }
        @media (max-width: 900px) {
          .fe-panel {
            grid-template-columns: 1fr;
            gap: var(--space-7);
          }
          .fe-panel-content { order: 2; }
          .fe-panel-visual  { order: 1; }
        }

        /* ── Panel content (left) ── */
        .fe-panel-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .fe-panel-heading {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .fe-benefits {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .fe-benefit {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          color: rgba(255, 255, 255, 0.85);
          font-size: 1.0625rem;
          line-height: 1.55;
        }

        /* CTA button — dedicated, no override fight */
        .fe-cta {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: #fff;
          color: #312e81;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: var(--r-full);
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .fe-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 640px) {
          .fe-cta { width: 100%; }
        }

        /* ── Panel visual (right) ── */
        .fe-panel-visual {
          display: flex;
          justify-content: center;
        }
        .fe-visual-card {
          width: 100%;
          max-width: 380px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--r-lg);
          padding: var(--space-6);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ── Shared panel pieces ── */
        .fe-panel-label {
          color: var(--text-2);
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          margin: 0 0 var(--space-3);
        }

        /* ── Customer panel ── */
        .fe-notif-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .fe-notif {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--r-md);
          padding: 14px 18px;
          font-size: 0.9375rem;
          color: var(--text-1);
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .fe-notif-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Worker panel ── */
        .fe-earnings {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-2);
          font-variant-numeric: tabular-nums;
        }
        .fe-earnings-trend {
          color: var(--emerald);
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0 0 var(--space-6);
        }
        .fe-chart {
          display: flex;
          gap: 6px;
          align-items: flex-end;
          height: 100px;
        }
        .fe-chart-bar {
          flex: 1;
          background: linear-gradient(
            to top,
            var(--accent-deep),
            var(--violet)
          );
          border-radius: 4px 4px 0 0;
          min-height: 4px;
        }

        /* ── Mistri panel ── */
        .fe-team-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .fe-team-member {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: 6px 0;
        }
        .fe-team-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--accent-deep),
            var(--accent)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .fe-team-name {
          color: var(--text-1);
          font-size: 1rem;
          font-weight: 500;
          flex: 1;
        }
        .fe-team-status {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .fe-tab,
          .fe-cta:hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}