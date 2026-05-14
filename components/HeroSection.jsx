'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { BackgroundLines } from '@/components/ui/background-lines';

const ease = [0.22, 1, 0.36, 1];
const ROLES = ['Painters', 'Plumbers', 'Electricians', 'Carpenters', 'Cleaners'];

function WordRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: 'inline-block', position: 'relative', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Hero Section ────────────────────────────────── */
export default function HeroSection() {
  const [city, setCity] = useState('Mumbai');
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
        const d = await r.json();
        setCity(d.address.city || d.address.town || 'Mumbai');
      } catch { /* keep default */ }
    });
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: 72,
    }}>
      <BackgroundLines className="absolute inset-0 z-0 h-screen w-full bg-[#030308]" />

      {/* Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 z-10" fill="#6366f1" />

      {/* dot grid */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, rgba(129,140,248,0.05) 1px, transparent 1px)',
        backgroundSize:'32px 32px',
        maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
        opacity:.3, zIndex: 1
      }} />

      <div style={{
        width:'100%', maxWidth:1000, margin:'0 auto', padding:'0 6%',
        display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
        position:'relative', zIndex:2,
      }}>
        <motion.div {...fadeUp(0.1)} style={{ marginBottom:28 }}>
          <span className="pill" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', display:'inline-block', boxShadow:'0 0 6px #34d399', marginRight: 8 }} />
            India's #1 Worker Marketplace
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} style={{
          fontSize:'clamp(3rem, 5.5vw, 5.5rem)',
          fontWeight: 900, lineHeight: 1.02,
          letterSpacing: '-0.04em', color: '#f4f4f5',
          marginBottom: 24,
        }}>
          Hire Skilled<br/>
          <WordRotator /><br/>
          Near You.
        </motion.h1>

        <motion.p {...fadeUp(0.35)} style={{ color:'#71717a', fontSize:'1.125rem', lineHeight:1.7, maxWidth:600, marginBottom:40 }}>
          Real-time map of verified painters, plumbers, electricians & carpenters across {city}.
          Book in 60 seconds. No commission. Always free.
        </motion.p>

        <motion.div {...fadeUp(0.45)} style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:56 }}>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
            Find Workers Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="btn-ghost" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>Join as Worker</button>
        </motion.div>

        <motion.div {...fadeUp(0.55)} style={{ display:'flex', gap:60, alignItems:'center', justifyContent:'center', flexWrap:'wrap' }}>
          {[['2,500+','Verified workers','#818cf8'],['50+','Indian cities','#34d399'],['4.9★','Avg rating','#fbbf24']].map(([v,l,c]) => (
            <div key={v}>
              <p style={{ color:c, fontWeight:800, fontSize:'1.6rem', lineHeight:1, fontFamily:"'Space Grotesk', sans-serif" }}>{v}</p>
              <p style={{ color:'#71717a', fontSize:'0.9rem', marginTop:8, fontWeight: 500 }}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'#3f3f46', fontSize:'.6875rem', letterSpacing:2, textTransform:'uppercase', zIndex: 10 }}>
        <span>Scroll</span>
        <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity, duration:1.4, ease:'easeInOut' }}
          style={{ width:1, height:36, background:'linear-gradient(to bottom, rgba(129,140,248,0.5), transparent)' }} />
      </motion.div>
    </section>
  );
}
