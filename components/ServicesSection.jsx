'use client';
import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const SERVICE_ITEMS = [
  { title: 'Painting',   description: '340 verified painters • ₹800/day avg',  link: '#painting' },
  { title: 'Plumbing',   description: '280 licensed plumbers • ₹700/job avg',   link: '#plumbing' },
  { title: 'Electrical',  description: '215 certified electricians • ₹900/day', link: '#electrical' },
  { title: 'Carpentry',  description: '180 skilled carpenters • ₹850/day avg',  link: '#carpentry' },
  { title: 'Cleaning',   description: '420 professional cleaners • ₹500/day',   link: '#cleaning' },
  { title: 'AC Repair',  description: '145 HVAC technicians • ₹600/visit',      link: '#ac-repair' },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        background: '#000',
        padding: '120px 5% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* top line */}
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg, transparent, rgba(129,140,248,0.12), transparent)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* header */}
        <div style={{ marginBottom: 16 }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pill"
            style={{ display: 'inline-flex', marginBottom: 20 }}
          >
            🔧 All services
          </motion.span>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 900, lineHeight: 1.05,
                letterSpacing: '-0.04em', color: '#f4f4f5',
                margin: 0,
              }}
            >
              Every skill.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>One platform.</span>
            </motion.h2>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="#"
              style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}
            >
              View all →
            </motion.a>
          </div>
        </div>

        {/* Aceternity HoverEffect cards */}
        <HoverEffect items={SERVICE_ITEMS} />

        {/* bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 24,
            padding: '36px 32px',
            background: 'rgba(99,102,241,0.04)',
            border: '1px solid rgba(99,102,241,0.1)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
          }}
        >
          <div>
            <p style={{ color: '#f4f4f5', fontWeight: 700, fontSize: '1.125rem', marginBottom: 4 }}>
              Don't see your service?
            </p>
            <p style={{ color: '#52525b', fontSize: '0.875rem' }}>
              Request any trade — we'll find the right professional within 24h.
            </p>
          </div>
          <button className="btn-primary">Request a Service</button>
        </motion.div>
      </div>
    </section>
  );
}
