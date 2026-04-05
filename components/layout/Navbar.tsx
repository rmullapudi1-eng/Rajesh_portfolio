'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '#resume' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(5,10,14,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a3a5c' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#00d4ff',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          RM<span style={{ color: '#e8f4f8' }}>.portfolio</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '0.25rem' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                color: '#8ab4c8',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLAnchorElement).style.color = '#00d4ff'
                ;(e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(0,212,255,0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLAnchorElement).style.color = '#8ab4c8'
                ;(e.target as HTMLAnchorElement).style.backgroundColor = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#00d4ff',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              backgroundColor: 'rgba(5,10,14,0.98)',
              borderTop: '1px solid #1a3a5c',
            }}
          >
            <nav style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.95rem',
                    color: '#8ab4c8',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    borderLeft: '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLAnchorElement
                    el.style.color = '#00d4ff'
                    el.style.borderLeftColor = '#00d4ff'
                    el.style.backgroundColor = 'rgba(0,212,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLAnchorElement
                    el.style.color = '#8ab4c8'
                    el.style.borderLeftColor = 'transparent'
                    el.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
