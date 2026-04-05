'use client'

import EcgLine from '@/components/ui/EcgLine'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#050a0e',
        borderTop: '1px solid #1a3a5c',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <EcgLine className="w-full" height={40} color="#00d4ff" />
      <div
        style={{
          maxWidth: '80rem',
          margin: '1.5rem auto 0',
          padding: '0 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#00d4ff',
            }}
          >
            Rajesh Mullapudi
          </p>
          <p style={{ color: '#4a7a9b', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Senior US Healthcare RCM Operations Leader
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="https://linkedin.com/in/rajeshmullapudi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8ab4c8', transition: 'color 0.2s', textDecoration: 'none', fontSize: '0.85rem' }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#00d4ff')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#8ab4c8')}
          >
            LinkedIn
          </a>
          <span style={{ color: '#1a3a5c' }}>|</span>
          <p style={{ color: '#4a7a9b', fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
