'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { WobbleCard } from '@/components/ui/wobble-card';

const TABS = [
  {
    id: 'customer', label: '👤 Customers',
    headline: 'Getting quality workers was never this easy',
    benefits: [
      'Post your job in under 2 minutes',
      'See verified workers on map near you',
      'Compare prices, ratings, and reviews',
      'Track work progress with daily photos',
      'Pay only when you are satisfied',
    ],
    cta: 'Start as Customer — Free →',
    color: '#818cf8',
  },
  {
    id: 'worker', label: '🔧 Workers',
    headline: 'Get consistent work and earn more',
    benefits: [
      'Find jobs near your exact location',
      'Set your own availability and schedule',
      'Track your daily and monthly earnings',
      'Build your professional reputation online',
      'Get paid on time, every time',
    ],
    cta: 'Join as Worker — Free →',
    color: '#34d399',
  },
  {
    id: 'mistri', label: '👷 Mistris',
    headline: 'Manage your team the professional way',
    benefits: [
      'Manage up to 20 workers in one platform',
      'Bid on multiple jobs simultaneously',
      'Track each worker\'s attendance digitally',
      'Handle all team payments through the app',
      'Build your business reputation online',
    ],
    cta: 'Join as Mistri — Free →',
    color: '#a78bfa',
  },
];

export default function ForEveryoneSection() {
  const [activeTab, setActiveTab] = useState('customer');
  const tab = TABS.find(t => t.id === activeTab);

  return (
    <section id="for-everyone" style={{ background: '#000', padding: '120px 5%', position: 'relative' }}>
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg, transparent, rgba(129,140,248,0.12), transparent)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.span initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="pill" style={{ display:'inline-flex', marginBottom:20 }}>
            Built For Everyone
          </motion.span>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:0.1 }} viewport={{ once:true }}
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(1.8rem,3vw,3rem)', fontWeight:900, color:'#f4f4f5', letterSpacing:'-0.04em', marginBottom:32 }}>
            The Platform That{' '}
            <span style={{ background:'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Works For All
            </span>
          </motion.h2>

          {/* Tab Bar */}
          <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, padding:3, gap:3 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                background: activeTab === t.id ? 'linear-gradient(135deg,#6366f1,#818cf8)' : 'transparent',
                color: activeTab === t.id ? '#fff' : '#71717a',
                border: 'none', borderRadius: 11, padding: '10px 22px',
                fontWeight: 600, fontSize: '.875rem', cursor: 'pointer',
                transition: 'all 0.2s ease', fontFamily: "'Inter', sans-serif",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-40 }} transition={{ duration:0.4 }}
          >
            <WobbleCard containerClassName="bg-indigo-950" className="px-8 py-16 sm:px-16">
              <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:60, alignItems:'center' }}>
                <div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:'clamp(1.5rem,3vw,2.5rem)', color:'#fff', marginBottom:32, lineHeight:1.2 }}>
                    {tab.headline}
                  </h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:18, marginBottom:40 }}>
                    {tab.benefits.map((b, i) => (
                      <motion.div key={b} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                        style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                        <CheckCircle size={22} color={tab.color} style={{ flexShrink:0, marginTop:2 }} />
                        <span style={{ color:'rgba(255,255,255,0.85)', fontSize:'1.1rem', lineHeight: 1.5 }}>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ background:'#fff', color:'#312e81', fontSize: '1.05rem', padding: '14px 28px' }}>{tab.cta}</button>
                </div>

                {/* Visual */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 360, background:'rgba(255,255,255,0.06)', borderRadius:24, border:'1px solid rgba(255,255,255,0.08)', padding:32, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    {tab.id === 'customer' && (
                      <>
                        <p style={{ color:'#a1a1aa', fontSize:'.85rem', marginBottom:12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Your notifications</p>
                        {['Worker accepted your job', 'Worker arrived on location', 'Job completed — rate now'].map((n,i) => (
                          <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.2 }}
                            style={{ background:'rgba(255,255,255,0.05)', borderRadius:12, padding:'16px 20px', marginBottom:12, fontSize:'.95rem', color:'#f4f4f5', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#818cf8' }} />
                            {n}
                          </motion.div>
                        ))}
                      </>
                    )}
                    {tab.id === 'worker' && (
                      <>
                        <p style={{ color:'#a1a1aa', fontSize:'.85rem', marginBottom:12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>This Month</p>
                        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:'2.5rem', color:'#fff', marginBottom:8, lineHeight: 1 }}>₹12,400</p>
                        <p style={{ color:'#34d399', fontSize:'.95rem', marginBottom:24, fontWeight: 600 }}>↑ 24% from last month</p>
                        <div style={{ display:'flex', gap:6, alignItems:'flex-end', height:100 }}>
                          {[40,70,55,80,65,90,75].map((h,i) => (
                            <motion.div key={i} initial={{ height:0 }} whileInView={{ height:`${h}%` }} transition={{ duration:.6, delay:i*.06 }} viewport={{ once:true }}
                              style={{ flex:1, background:'linear-gradient(to top,#6366f1,#a78bfa)', borderRadius:'4px 4px 0 0', minHeight:4 }} />
                          ))}
                        </div>
                      </>
                    )}
                    {tab.id === 'mistri' && (
                      <>
                        <p style={{ color:'#a1a1aa', fontSize:'.85rem', marginBottom:16, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Team of 12 · 8 Active</p>
                        {['Raj','Suresh','Amit','Dev'].map((m,i) => (
                          <div key={m} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, padding: '8px 0' }}>
                            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#818cf8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff' }}>{m[0]}</div>
                            <span style={{ color:'#f4f4f5', fontSize:'1rem', flex:1, fontWeight: 500 }}>{m}</span>
                            <span style={{ width:8, height:8, borderRadius:'50%', background: i%2===0 ? '#34d399' : '#fbbf24' }} />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </WobbleCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width:900px) {
          #for-everyone div[style*="grid-template-columns: 1.2fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
          #for-everyone div[style*="justify-content: center"] { display:none !important; }
        }
      `}</style>
    </section>
  );
}
