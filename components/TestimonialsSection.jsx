'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Customer', location: 'Mumbai', type: 'customer', stars: 5, text: 'Found an excellent painter in 30 minutes. The quality of work was outstanding and the worker arrived exactly on time.', badge: 'House Painting', gradient: ['#818cf8', '#6366f1'] },
  { name: 'Rajesh Kumar', role: 'Painter', location: 'Andheri', type: 'worker', stars: 5, text: 'I get 3-4 job requests every week now. My income has doubled since joining. The payment always comes on time.', badge: 'Earned ₹45,000 this month', gradient: ['#a78bfa', '#7c3aed'] },
  { name: 'Sharma Mistri', role: 'Mistri', location: 'Bandra', type: 'mistri', stars: 5, text: 'Managing my team of 12 workers is now completely digital. No more confusion about attendance or payments.', badge: 'Manages 12 workers', gradient: ['#34d399', '#059669'] },
  { name: 'Priya Mehta', role: 'Customer', location: 'Pune', type: 'customer', stars: 5, text: 'The plumber fixed everything in 2 hours. Transparent pricing, no hidden charges. Will definitely use again.', badge: 'Plumbing', gradient: ['#38bdf8', '#0284c7'] },
  { name: 'Suresh Patil', role: 'Plumber', location: 'Dadar', type: 'worker', stars: 5, text: 'Before Ezra I struggled to find work. Now I have steady income every month and customers can see my ratings.', badge: 'Steady Income', gradient: ['#818cf8', '#6366f1'] },
  { name: 'Amit Singh', role: 'Customer', location: 'Delhi', type: 'customer', stars: 4, text: 'Very easy to use. Posted a job and got 5 quotes within an hour. Hired the best rated electrician and loved the work.', badge: 'Electrical', gradient: ['#fbbf24', '#d97706'] },
  { name: 'Ravi Contractor', role: 'Mistri', location: 'Andheri', type: 'mistri', stars: 5, text: 'My team\'s reputation is now visible online. Customers trust us more because they can see our verified reviews.', badge: 'Team of 8', gradient: ['#22d3ee', '#0891b2'] },
  { name: 'Anil Carpenter', role: 'Carpenter', location: 'Thane', type: 'worker', stars: 5, text: 'The attendance tracking is great. Everything is recorded automatically and my earnings are always accurate.', badge: 'Carpentry Expert', gradient: ['#fb7185', '#e11d48'] },
];

const TYPE_COLORS = { customer: '#818cf8', worker: '#38bdf8', mistri: '#a78bfa' };

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= count ? '#fbbf24' : '#27272a', fontSize: '.95rem' }}>★</span>)}
    </div>
  );
}

function TestimonialCard({ t, isActive }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 20, padding: '32px 28px',
      position: 'relative', transition: 'transform .3s, opacity .3s',
      opacity: isActive ? 1 : 0.75,
    }}>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: '4rem', color: 'rgba(129,140,248,0.2)', lineHeight: .7, marginBottom: 12, userSelect: 'none' }}>"</div>
      <Stars count={t.stars} />
      <p style={{ color: '#e4e4e7', fontSize: '.9rem', lineHeight: 1.7, margin: '12px 0 20px', minHeight: 80 }}>{t.text}</p>
      <div style={{
        background: TYPE_COLORS[t.type] + '15',
        border: `1px solid ${TYPE_COLORS[t.type]}30`,
        borderRadius: 999, padding: '4px 12px', fontSize: '.75rem',
        color: TYPE_COLORS[t.type], fontWeight: 600, display: 'inline-block', marginBottom: 16,
      }}>{t.badge}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1.1rem', color: '#fff',
        }}>{t.name[0]}</div>
        <div>
          <div style={{ color: '#f4f4f5', fontWeight: 700, fontSize: '.9rem' }}>{t.name}</div>
          <div style={{ color: '#52525b', fontSize: '.75rem' }}>{t.role} — {t.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const next = () => setCurrent(c => (c + 1) % total);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, current]);

  const visible = Array.from({ length: 3 }, (_, i) => TESTIMONIALS[(current + i) % total]);

  return (
    <section id="testimonials" style={{ background: '#000', padding: '100px 5%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.12), transparent)' }} />

      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pill" style={{ display: 'inline-flex', marginBottom: 16 }}>
            Real Stories
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,3rem)', color: '#f4f4f5', letterSpacing: '-0.04em', marginBottom: 12 }}>
            What People Are{' '}
            <span style={{ background: 'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Saying</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} style={{ color: '#52525b' }}>
            From customers, workers, and mistris across India
          </motion.p>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {visible.map((t, i) => <TestimonialCard key={t.name + i} t={t} isActive={i === 0} />)}
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} style={{
            position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#a1a1aa', zIndex: 2, transition: 'background .2s, color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#a1a1aa'; }}
          ><ChevronLeft size={20} /></button>
          <button onClick={next} style={{
            position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#a1a1aa', zIndex: 2, transition: 'background .2s, color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#a1a1aa'; }}
          ><ChevronRight size={20} /></button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 999,
              background: i === current ? '#818cf8' : '#27272a',
              border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:768px) {
          #testimonials > div > div:nth-child(2) > div > div { grid-template-columns: 1fr !important; }
          #testimonials > div > div:nth-child(2) > div > div > div:nth-child(2),
          #testimonials > div > div:nth-child(2) > div > div > div:nth-child(3) { display:none; }
        }
      `}</style>
    </section>
  );
}
