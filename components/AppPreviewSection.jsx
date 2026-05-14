'use client';
import { motion } from 'framer-motion';

function Dashboard() {
  const stats = [
    { label: 'Active Workers', value: '2,847', delta: '+12%', color: '#818cf8' },
    { label: 'Bookings Today', value: '1,293', delta: '+8%', color: '#34d399' },
    { label: 'Avg Response', value: '< 45s', delta: 'Live', color: '#38bdf8' },
  ];
  const workers = [
    { initials: 'RK', name: 'Rajesh Kumar', role: 'Plumber', rating: 4.9, dist: '0.3 km', hue: '#151530', accent: '#818cf8' },
    { initials: 'PS', name: 'Priya Sharma', role: 'Painter', rating: 4.8, dist: '0.7 km', hue: '#201520', accent: '#a78bfa' },
    { initials: 'SV', name: 'Suresh Verma', role: 'Electrician', rating: 5.0, dist: '1.2 km', hue: '#152015', accent: '#34d399' },
    { initials: 'AN', name: 'Anita Nair', role: 'Carpenter', rating: 4.7, dist: '1.8 km', hue: '#201525', accent: '#fb7185' },
  ];
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden shadow-2xl rounded-[20px] md:rounded-[24px] w-full" style={{ minHeight: 600, background: '#060610' }}>
      {/* sidebar */}
      <div className="lg:w-[240px] shrink-0 flex flex-col gap-3 p-5 md:p-6 lg:p-10" style={{ background: '#040408', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingLeft: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Ezra</span>
        </div>
        <div className="flex flex-row overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 scrollbar-hide -mx-2 px-2 lg:mx-0 lg:px-0">
          {[{ l: 'Dashboard', a: true }, { l: 'Workers', a: false }, { l: 'Bookings', a: false }, { l: 'Map', a: false }, { l: 'Reviews', a: false }, { l: 'Settings', a: false }].map(n => (
            <div key={n.l} className="shrink-0" style={{
              padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: n.a ? 600 : 400, cursor: 'pointer',
              background: n.a ? 'rgba(99,102,241,0.1)' : 'transparent', color: n.a ? '#818cf8' : '#52525b',
              transition: 'background 0.2s',
            }}>{n.l}</div>
          ))}
        </div>
      </div>
      {/* main */}
      <div className="flex-1 flex flex-col gap-6 p-5 md:p-6 lg:p-10" style={{ overflow: 'hidden', background: '#0a0a14' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p style={{ color: '#f4f4f5', fontWeight: 800 }} className="text-xl md:text-2xl">Good morning, Admin</p>
            <p style={{ color: '#71717a', marginTop: 4 }} className="text-xs md:text-sm">Mumbai • 24 workers online</p>
          </div>
          <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 20, padding: '6px 12px', color: '#818cf8', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            Live System Status
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-5 lg:p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16 }}>
              <p style={{ color: '#71717a', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
              <p style={{ color: '#f4f4f5', fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }} className="text-[28px] md:text-[32px]">{s.value}</p>
              <p style={{ color: s.color, fontSize: 12, marginTop: 8, fontWeight: 600 }}>↑ {s.delta} this week</p>
            </div>
          ))}
        </div>
        <div className="p-4 md:p-6 lg:p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ color: '#f4f4f5', fontWeight: 700, fontSize: 16 }}>Nearby Workers</p>
            <p style={{ color: '#818cf8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>View all →</p>
          </div>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 pb-2 scrollbar-hide">
            {workers.map((w, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12 }}>
                <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: w.hue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: w.accent, flexShrink: 0 }}>{w.initials}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#f4f4f5', fontSize: 14, fontWeight: 600 }}>{w.name}</p>
                    <p style={{ color: '#71717a', fontSize: 12, marginTop: 2 }}>{w.role} • {w.dist}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-0 border-[rgba(255,255,255,0.05)]">
                  <p style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>★ {w.rating}</p>
                  <div style={{ background: 'linear-gradient(135deg,#6366f1,#818cf8)', borderRadius: 8, padding: '6px 16px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>Book</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppPreviewSection() {
  return (
    <section id="app-preview" style={{ background: 'linear-gradient(180deg, #000, #040408)', position: 'relative', overflow: 'hidden', padding: '100px 5%' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(99,102,241,0.03), transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 60 }}>
        <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pill" style={{ display: 'inline-flex', marginBottom: 20 }}>
          🚀 The Full Platform
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,4vw,4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#f4f4f5', marginBottom: 20 }}>
          The Platform{' '}
          <span style={{ background: 'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            That Delivers.
          </span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
          style={{ color: '#71717a', fontSize: '1.125rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          A real-time, hyperlocal worker marketplace — beautifully designed and blindingly fast.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full"
        style={{ maxWidth: 1100, margin: '0 auto 80px', borderRadius: 24, padding: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Dashboard />
      </motion.div>

      {/* feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {[
          { h: 'Instant Booking', p: 'Book a worker in under 60 seconds.', c: '#818cf8' },
          { h: 'Verified Workers', p: 'Every worker passes background checks.', c: '#34d399' },
          { h: 'Hyperlocal First', p: 'Sorted by real-time proximity.', c: '#38bdf8' },
        ].map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }} viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: 'rgba(129,140,248,0.2)' }}
            style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20, padding: '32px 28px', transition: 'all .2s ease',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: f.c, marginBottom: 20, boxShadow: `0 0 12px ${f.c}50` }} />
            <p style={{ color: '#f4f4f5', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{f.h}</p>
            <p style={{ color: '#71717a', fontSize: '.95rem', lineHeight: 1.6 }}>{f.p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
