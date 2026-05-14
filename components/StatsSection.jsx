'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function CountUp({ to, suffix = '', duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration / 16);
    const id = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(Math.floor(start));
      if (start >= to) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString('en-IN')}{suffix}</span>;
}

const STATS = [
  { to: 2500, suffix: '+', label: 'Verified Workers', sub: 'Active across India',  color: '#818cf8' },
  { to: 50,   suffix: '+', label: 'Cities',           sub: 'And expanding weekly', color: '#38bdf8' },
  { to: 10000, suffix: '+', label: 'Jobs Completed',  sub: 'Happy customers',      color: '#34d399' },
  { to: 98,   suffix: '%', label: 'Satisfaction',     sub: 'Based on real reviews', color: '#fbbf24' },
];

export default function StatsSection() {
  return (
    <section id="stats" style={{ background: '#000', padding: '64px 5%', position: 'relative' }}>
      <div style={{ position:'absolute', top:0, left:'5%', right:'5%', height:1, background:'linear-gradient(90deg, transparent, rgba(129,140,248,0.1), transparent)' }} />
      <div style={{ position:'absolute', bottom:0, left:'5%', right:'5%', height:1, background:'linear-gradient(90deg, transparent, rgba(129,140,248,0.06), transparent)' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
        {STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} viewport={{ once: true }}
            style={{
              padding: '32px 24px', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, color: s.color, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}>
              <CountUp to={s.to} suffix={s.suffix} duration={1600 + i * 150} />
            </p>
            <p style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{s.label}</p>
            <p style={{ color: '#3f3f46', fontSize: '0.75rem' }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width:700px) {
          #stats > div > div { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
