import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

/* ═══════════════════════════════════════════════════
   FONTS
   Loaded via next/font for zero layout shift
   and automatic optimization.
═══════════════════════════════════════════════════ */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ],
  adjustFontFallback: true,
});

/* ═══════════════════════════════════════════════════
   METADATA
   Complete SEO + social sharing configuration
═══════════════════════════════════════════════════ */
export const metadata = {
  metadataBase: new URL('https://ezra.app'), // ← change to your real domain

  title: {
    default: 'Ezra — Find Skilled Workers Near You',
    template: '%s | Ezra',
  },

  description:
    'Location-based marketplace connecting customers with verified painters, plumbers, electricians, and carpenters near you. Free to use, no commission.',

  keywords: [
    'workers near me',
    'painter',
    'plumber',
    'electrician',
    'carpenter',
    'skilled workers',
    'home services',
    'Ezra',
    'local services India',
    'verified workers',
  ],

  authors: [{ name: 'Ezra' }],
  creator: 'Ezra',
  publisher: 'Ezra',

  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  /* ─── Open Graph (Facebook, LinkedIn, WhatsApp) ─── */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ezra.app',
    siteName: 'Ezra',
    title: 'Ezra — Find Skilled Workers Near You',
    description: "India's #1 platform to find skilled workers near you instantly.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ezra — Find Skilled Workers Near You',
      },
    ],
  },

  /* ─── Twitter / X ─── */
  twitter: {
    card: 'summary_large_image',
    title: 'Ezra — Find Skilled Workers Near You',
    description: "India's #1 platform to find skilled workers near you instantly.",
    images: ['/og-image.png'],
    creator: '@ezra',
  },

  /* ─── Robots ─── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  /* ─── Icons (auto-detected from /app, but explicit is safer) ─── */
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  /* ─── Optional: verification tags (uncomment when ready) ─── */
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

/* ═══════════════════════════════════════════════════
   VIEWPORT
   Separate export (Next 14+ requirement)
   Controls mobile scaling + theme color
═══════════════════════════════════════════════════ */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' },
  ],
  colorScheme: 'dark',
};

/* ═══════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════ */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      /*
        suppressHydrationWarning prevents false-positive warnings
        from framer-motion's transform initial states and any
        client-side theme/cursor manipulation.
      */
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}