'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const StatsSection = dynamic(() => import('@/components/StatsSection'), { ssr: false });
const AppPreviewSection = dynamic(() => import('@/components/AppPreviewSection'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), { ssr: false });
const GlobeSection = dynamic(() => import('@/components/GlobeSection'), { ssr: false });
const ForEveryoneSection = dynamic(() => import('@/components/ForEveryoneSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const GetStartedSection = dynamic(() => import('@/components/GetStartedSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let animFrame;

    const moveCursor = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
    };

    const animateRing = () => {
      ringPos.current.x += (cursorPos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (cursorPos.current.y - ringPos.current.y) * 0.12;
      if (ring) { ring.style.left = ringPos.current.x + 'px'; ring.style.top = ringPos.current.y + 'px'; }
      animFrame = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', moveCursor);
    animFrame = requestAnimationFrame(animateRing);

    const handleEnter = () => {
      if (ring) { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.background = 'rgba(99,102,241,0.06)'; ring.style.borderColor = 'rgba(129,140,248,0.5)'; }
    };
    const handleLeave = () => {
      if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.background = 'transparent'; ring.style.borderColor = 'rgba(129,140,248,0.35)'; }
    };
    const updateBtns = () => {
      const btns = document.querySelectorAll('button, a');
      btns.forEach(b => { b.removeEventListener('mouseenter', handleEnter); b.removeEventListener('mouseleave', handleLeave); b.addEventListener('mouseenter', handleEnter); b.addEventListener('mouseleave', handleLeave); });
    };
    updateBtns();
    const mutObs = new MutationObserver(updateBtns);
    mutObs.observe(document.body, { childList: true, subtree: true });

    const progressBar = document.getElementById('scroll-progress');
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + '%';
      const backTop = document.getElementById('back-to-top');
      if (backTop) { backTop.classList.toggle('visible', scrollTop > 500); }
    };
    window.addEventListener('scroll', updateProgress);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', updateProgress);
      cancelAnimationFrame(animFrame);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div id="scroll-progress" style={{
        position:'fixed', top:0, left:0, height:'2px',
        background:'linear-gradient(90deg, #6366f1, #818cf8, #a78bfa)',
        zIndex:99997, width:'0%',
      }} />

      {/* Custom Cursor */}
      <div id="cursor-dot" style={{ position:'fixed', width:6, height:6, background:'#818cf8', borderRadius:'50%', pointerEvents:'none', zIndex:99999, transform:'translate(-50%,-50%)', transition:'width .15s, height .15s' }} />
      <div id="cursor-ring" style={{ position:'fixed', width:36, height:36, border:'1.5px solid rgba(129,140,248,0.35)', borderRadius:'50%', pointerEvents:'none', zIndex:99998, transform:'translate(-50%,-50%)', transition:'width .25s, height .25s, background .25s, border-color .25s' }} />

      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <AppPreviewSection />
        <HowItWorks />
        <ServicesSection />
        <GlobeSection />
        <ForEveryoneSection />
        <TestimonialsSection />
        <GetStartedSection />
      </main>

      <Footer />

      {/* Back to Top */}
      <button id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position:'fixed', bottom:28, right:28, width:44, height:44,
          background:'#6366f1', borderRadius:'50%', border:'none',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', zIndex:1000, opacity:0, transform:'scale(0)',
          transition:'opacity .3s, transform .3s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow:'0 0 24px rgba(99,102,241,0.3)',
        }}
      >
        <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <style>{`
        #back-to-top.visible { opacity:1 !important; transform:scale(1) !important; }
        #back-to-top:hover { background:#818cf8 !important; box-shadow:0 0 32px rgba(99,102,241,0.5) !important; }
      `}</style>
    </>
  );
}
