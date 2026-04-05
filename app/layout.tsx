import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rajesh-portfolio.vercel.app'),
  title: 'Rajesh Mullapudi | Senior Healthcare RCM Operations Leader',
  description:
    'Portfolio of Rajesh Mullapudi — Senior US Healthcare Revenue Cycle Management Operations Leader with 12+ years of expertise in AR operations, denial management, prior authorization, and KPI governance.',
  keywords: [
    'RCM',
    'Healthcare Revenue Cycle',
    'AR Operations',
    'Denial Management',
    'Prior Authorization',
    'KPI Dashboard',
    'US Healthcare',
    'Rajesh Mullapudi',
  ],
  openGraph: {
    title: 'Rajesh Mullapudi | RCM Operations Leader',
    description:
      'Senior US Healthcare RCM Operations Leader with 12+ years of experience managing 130+ FTEs across AR, Prior Auth, and Quality Operations.',
    images: [{ url: '/assets/profile.png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Rajdhani:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#050a0e', color: '#e8f4f8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0a1628',
              color: '#e8f4f8',
              border: '1px solid #1a3a5c',
              borderRadius: '0.75rem',
            },
            success: {
              iconTheme: { primary: '#00ff88', secondary: '#050a0e' },
            },
            error: {
              iconTheme: { primary: '#ff6b35', secondary: '#050a0e' },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
