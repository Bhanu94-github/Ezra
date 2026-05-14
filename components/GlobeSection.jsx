'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PhoneMockup() {
  const [active, setActive] = useState(0);
  const workers = [
    { name: 'Rajesh Kumar', role: 'Plumber', dist: '0.3 km', rating: 4.9, online: true },
    { name: 'Priya Sharma', role: 'Painter', dist: '0.7 km', rating: 4.8, online: true },
    { name: 'Suresh Verma', role: 'Electrician', dist: '1.1 km', rating: 5.0, online: false },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % workers.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      width: 280, height: 570, borderRadius: 52,
      background: 'linear-gradient(160deg, #1c1c1e, #141414)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 40px 100px rgba(0,0,0,0.75), 0 0 0 8px #000',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* buttons */}
      {[{ s: 'left', t: 118, h: 30 }, { s: 'left', t: 160, h: 46 }, { s: 'left', t: 216, h: 46 }, { s: 'right', t: 150, h: 64 }].map((b, i) => (
        <div key={i} style={{ position: 'absolute', [b.s]: -3, top: b.t, width: 3, height: b.h, background: '#2a2a2e', borderRadius: b.s === 'left' ? '4px 0 0 4px' : '0 4px 4px 0' }} />
      ))}
      {/* screen */}
      <div style={{ position: 'absolute', inset: 6, borderRadius: 48, background: '#000', overflow: 'hidden' }}>
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 115, height: 32, background: '#000', borderRadius: 20, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 12, gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1c1c1e', border: '1px solid #2a2a2a' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1e3a5f' }} />
        </div>

        {/* App UI */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #08080f, #04040a)', padding: '60px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#52525b', fontSize: 11, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' }}>Ezra</p>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>Mumbai</p>
            </div>
            <div style={{
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 20, padding: '5px 12px', fontSize: 11, color: '#818cf8', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
              LIVE
            </div>
          </div>
          {/* map */}
          <div style={{
            height: 140, borderRadius: 16, background: 'linear-gradient(135deg, #0a0a14, #0e1020)',
            border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
          }}>
            {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 25}%`, width: 1, background: 'rgba(255,255,255,0.03)' }} />)}
            {Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 33}%`, height: 1, background: 'rgba(255,255,255,0.03)' }} />)}
            {[{ x: '30%', y: '45%', c: '#818cf8' }, { x: '58%', y: '30%', c: '#38bdf8' }, { x: '72%', y: '60%', c: '#34d399' }].map((d, i) => (
              <div key={i} style={{ position: 'absolute', left: d.x, top: d.y }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.c, boxShadow: `0 0 6px ${d.c}` }} />
                <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1px solid ${d.c}`, opacity: .35, animation: `pulse-ring 2s ${i * .6}s ease-out infinite` }} />
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', color: '#3f3f46', fontSize: 10, fontWeight: 600, letterSpacing: .5, whiteSpace: 'nowrap' }}>BANDRA WEST</div>
          </div>
          {/* worker cards */}
          <p style={{ color: '#3f3f46', fontSize: 11, fontWeight: 700, letterSpacing: .8, textTransform: 'uppercase' }}>Nearby Workers</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {workers.map((w, i) => (
              <motion.div key={i}
                animate={{
                  background: active === i ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
                  borderColor: active === i ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.05)',
                }}
                style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                onClick={() => setActive(i)}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: ['#151530', '#201510', '#152015'][i],
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: ['#818cf8', '#a78bfa', '#34d399'][i],
                }}>
                  {w.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#e4e4e7', fontSize: 12, fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.name}</p>
                  <p style={{ color: '#52525b', fontSize: 11, marginTop: 1 }}>{w.role} · {w.dist}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <p style={{ color: '#fbbf24', fontSize: 11, fontWeight: 700 }}>★ {w.rating}</p>
                  {w.online && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', marginLeft: 'auto', marginTop: 4 }} />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* glass */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.025), transparent 50%)', pointerEvents: 'none', borderRadius: 48 }} />
        {/* home bar */}
        <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 90, height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 5, zIndex: 10 }} />
      </div>
    </div>
  );
}

const CITIES = [
  { label: 'Mumbai' }, { label: 'Delhi' }, { label: 'Bangalore' }, { label: 'Hyderabad' },
  { label: 'Chennai' }, { label: 'Pune' }, { label: 'Kolkata' }, { label: 'Ahmedabad' },
  { label: 'Jaipur' }, { label: 'Surat' }, { label: 'Chandigarh' }, { label: 'Hubli' },
];

const STATS = [
  { value: '50+', label: 'Cities', sub: 'Across India', color: '#818cf8' },
  { value: '2.5K', label: 'Workers', sub: 'Verified & active', color: '#34d399' },
  { value: '10K+', label: 'Jobs done', sub: '& counting', color: '#38bdf8' },
  { value: '4.9★', label: 'Rating', sub: 'Real customer reviews', color: '#fbbf24' },
];

export default function GlobeSection() {
  return (
    <section id="coverage" style={{ background: 'linear-gradient(180deg, #040408, #000)', padding: '120px 5%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pill" style={{ display: 'inline-flex', marginBottom: 20 }}>
            📱 The Ultimate App
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#f4f4f5', marginBottom: 14 }}>
            Experience Seamless{' '}
            <span style={{ background: 'linear-gradient(135deg,#818cf8,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Connections.
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
            style={{ color: '#52525b', fontSize: '1rem', maxWidth: 440, margin: '0 auto' }}>
            A meticulously designed mobile interface that makes finding workers incredibly simple.
          </motion.p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
              <PhoneMockup />
            </motion.div>
          </motion.div>
          <div style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${s.color}`, borderRadius: 14, padding: '18px' }}>
                <p style={{ color: s.color, fontWeight: 900, fontSize: '1.75rem', fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: '#e4e4e7', fontWeight: 600, fontSize: '.875rem', marginTop: 3 }}>{s.label}</p>
                <p style={{ color: '#52525b', fontSize: '.75rem', marginTop: 2 }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 48 }}>
          {CITIES.map(c => <span key={c.label} className="tag">{c.label}</span>)}
          <span className="tag" style={{ color: '#818cf8', borderColor: 'rgba(99,102,241,0.2)' }}>+ 38 more</span>
        </motion.div>
      </div>
    </section>
  );
}
