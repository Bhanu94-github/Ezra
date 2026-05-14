'use client';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { WobbleCard } from '@/components/ui/wobble-card';

/* ── Bento headers — subtle animated visuals ── */
function GridPattern({ color = '#818cf8' }) {
  return (
    <div style={{
      width: '100%', minHeight: 200,
      background: `radial-gradient(circle at 40% 60%, ${color}12 0%, transparent 60%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', borderRadius: 8,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, ${color}20 1px, transparent 1px)`,
        backgroundSize: '16px 16px', opacity: 0.5,
      }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{
          width: 48, height: 48, borderRadius: 12,
          background: `linear-gradient(135deg, ${color}30, ${color}08)`,
          border: `1px solid ${color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: color, opacity: 0.6 }} />
      </motion.div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Share Your Location',
    description: 'Open Ezra — we surface verified workers sorted by distance, rating, and availability. No typing needed.',
    color: '#818cf8',
    className: 'md:col-span-2',
  },
  {
    title: 'Browse & Pick',
    description: 'View profiles, skills, real reviews, and live availability. 30+ filters to find the perfect match.',
    color: '#a78bfa',
    className: 'md:col-span-1',
  },
  {
    title: 'Book in One Tap',
    description: 'Worker gets an instant notification and confirms in seconds. You receive their ETA and live location.',
    color: '#22d3ee',
    className: 'md:col-span-1',
  },
  {
    title: 'Done & Paid',
    description: 'Work completed. Rate the experience. Secure payment through the app. Worker gets paid on time, every time.',
    color: '#34d399',
    className: 'md:col-span-2',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#000', padding: '120px 5%', position: 'relative', overflow: 'hidden' }}>
      {/* top divider */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.12), transparent)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill"
            style={{ display: 'inline-flex', marginBottom: 20 }}
          >
            ⚡ Simple by design
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.04em', color: '#f4f4f5',
              marginBottom: 14,
            }}
          >
            From search to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>done</span>{' '}
            in 5 minutes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{ color: '#52525b', fontSize: '1rem', maxWidth: 440, margin: '0 auto' }}
          >
            Four simple steps. No registration needed to browse.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          {STEPS.map((step, i) => (
            <BentoGridItem
              key={i}
              title={
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    color: step.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: 2,
                    background: `${step.color}15`,
                    padding: '4px 10px',
                    borderRadius: '8px'
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step.title}</span>
                </span>
              }
              description={step.description}
              header={<GridPattern color={step.color} />}
              className={step.className}
            />
          ))}
        </BentoGrid>

        {/* Wobble CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: 48 }}
        >
          <WobbleCard containerClassName="bg-indigo-900">
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24,
            }}>
              <div style={{ maxWidth: 480 }}>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.5rem', fontWeight: 800,
                  color: '#fff', marginBottom: 8, letterSpacing: '-0.03em',
                }}>
                  Ready to get started?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  Sign up takes 30 seconds. Start browsing workers near you instantly — completely free.
                </p>
              </div>
              <button className="btn-primary" style={{ background: '#fff', color: '#312e81' }}>
                Get Started — Free
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </WobbleCard>
        </motion.div>
      </div>
    </section>
  );
}