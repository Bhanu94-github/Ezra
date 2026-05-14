'use client';

const LINKS = {
  Platform: ['How It Works', 'Services', 'For Workers', 'For Businesses', 'Pricing'],
  Services: ['Painting', 'Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'AC Repair'],
  Support: ['Help Center', 'Contact Us', 'Report Issue', 'Privacy Policy', 'Terms'],
};

export default function Footer() {
  return (
    <footer id="footer" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '72px 5% 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px repeat(3,1fr)', gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#f4f4f5', letterSpacing: '-0.03em' }}>
                Ezra.
              </span>
            </div>
            <p style={{ color: '#3f3f46', fontSize: '.875rem', lineHeight: 1.7, marginBottom: 8 }}>India's trusted marketplace for finding skilled workers — instantly.</p>
            <p style={{ color: '#27272a', fontSize: '.8125rem' }}>Free to use · No commission</p>
          </div>
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '.6875rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>{title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ color: '#52525b', textDecoration: 'none', fontSize: '.875rem', transition: 'color .2s', display: 'inline-block' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e4e4e7'}
                      onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#27272a', fontSize: '.8125rem' }}>© 2026 Ezra All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" style={{ color: '#27272a', fontSize: '.8125rem', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#71717a'}
                onMouseLeave={e => e.currentTarget.style.color = '#27272a'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width:900px) { footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width:500px) { footer > div > div:first-child { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
