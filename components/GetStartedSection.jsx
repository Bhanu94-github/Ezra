'use client';
import { motion } from 'framer-motion';
import { Home, Wrench, Users } from 'lucide-react';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const CARDS = [
  {
    title: 'I Need Work Done',
    description: 'Post a job and find verified workers near you in minutes. Free to use, no commission.',
    link: '#customer',
  },
  {
    title: 'I Am a Skilled Worker',
    description: 'Find jobs near you, build your professional reputation, and get paid on time.',
    link: '#worker',
  },
  {
    title: 'I Manage a Team',
    description: 'Get more jobs, manage your crew digitally, and scale your business.',
    link: '#mistri',
  },
];

export default function GetStartedSection() {
  return (
    <section id="get-started" style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
      padding: '120px 5%', position: 'relative', overflow: 'hidden',
    }}>
      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px', opacity: 0.4,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', marginBottom: 24, letterSpacing: '-0.04em', lineHeight: '1.2' }}>
            Start Today — Completely Free
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: '1.6' }}>
            Join thousands of workers and customers already using Ezra across India
          </motion.p>
        </div>

        <div style={{ marginTop: 80 }}>
          <HoverEffect items={CARDS} className="py-0" />
        </div>

        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <motion.button
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              background: '#fff', color: '#312e81',
              border: 'none', borderRadius: 999,
              padding: '16px 40px', fontWeight: 800, fontSize: '1rem',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            Get Started — It's Free
          </motion.button>
        </div>
      </div>
    </section>
  );
}
