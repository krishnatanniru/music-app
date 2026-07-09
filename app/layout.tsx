import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { GenerationModal } from '@/components/generation/GenerationModal';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EchoVerse AI - Custom AI Music & Voice Studio',
    template: '%s | EchoVerse AI',
  },
  description:
    'EchoVerse AI is a premium AI-powered music and voice generation studio. Create stunning original tracks, custom voice overs, and unique soundscapes in seconds.',
  keywords: [
    'AI music generation',
    'AI voice studio',
    'music composition AI',
    'text to music',
    'voice cloning',
    'AI audio',
    'music studio',
    'EchoVerse',
    'generative music',
    'AI beats',
  ],
  authors: [{ name: 'EchoVerse AI', url: 'https://echoverse.ai' }],
  creator: 'EchoVerse AI',
  metadataBase: new URL('https://echoverse.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://echoverse.ai',
    siteName: 'EchoVerse AI',
    title: 'EchoVerse AI - Custom AI Music & Voice Studio',
    description:
      'Create stunning AI-generated music and voice content in seconds. Professional-grade audio, powered by cutting-edge AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EchoVerse AI - Custom AI Music & Voice Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EchoVerse AI - Custom AI Music & Voice Studio',
    description:
      'Create stunning AI-generated music and voice content in seconds.',
    images: ['/og-image.png'],
    creator: '@echoverseai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${sora.variable} ${inter.variable} dark`}
        suppressHydrationWarning
      >
        <body className="bg-[#050508] text-[#f8fafc] antialiased">
          {children}
          <GenerationModal />
          <Toaster position="top-right" theme="dark" richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
