import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: 'Ezra — Find Skilled Workers Near You',
  description: 'Location-based marketplace connecting customers with verified painters, plumbers, electricians, and carpenters near you. Free to use, no commission.',
  keywords: 'workers near me, painter plumber electrician carpenter, skilled workers, home services, Ezra',
  openGraph: {
    title: 'Ezra — Find Skilled Workers Near You',
    description: "India's #1 platform to find skilled workers near you instantly.",
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
