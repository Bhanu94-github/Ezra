'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'For Workers', href: '#for-everyone' },
  { label: 'Coverage', href: '#coverage' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000, height: 60,
          display: 'flex', alignItems: 'center', padding: '0 5%',
          background: scrolled ? 'rgba(0,0,0,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background .35s, border-color .35s',
        }}
      >
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#f4f4f5', letterSpacing: '-0.03em' }}>
            Ezra
          </span>
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center', marginRight: 32 }}>
          {NAV.map(l => (
            <a key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '.875rem', fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f4f4f5'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >{l.label}</a>
          ))}
        </div>

        <div className="nav-actions" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.65)', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 500, fontSize: '.875rem', cursor: 'pointer', transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f4f4f5'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          >Log in</button>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'linear-gradient(135deg,#6366f1,#818cf8)', color: '#fff', border: 'none', borderRadius: 999, padding: '8px 20px', fontWeight: 700, fontSize: '.875rem', cursor: 'pointer', letterSpacing: '-0.01em' }}
          >Get Started</motion.button>
        </div>

        <button className="nav-hamburger" onClick={() => setMobile(true)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
            <button onClick={() => setMobile(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            {NAV.map((l, i) => (
              <motion.a key={l.label} href={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} onClick={() => setMobile(false)}
                style={{ color: '#f4f4f5', textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.04em' }}
              >{l.label}</motion.a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 260, marginTop: 8 }}>
              <button className="btn-ghost" style={{ textAlign: 'center', justifyContent: 'center' }}>Log in</button>
              <button className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Get Started — Free</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width:769px) { .nav-hamburger { display:none !important; } }
        @media (max-width:768px) { .nav-links, .nav-actions { display:none !important; } .nav-hamburger { display:flex !important; } }
      `}</style>
    </>
  );
}
