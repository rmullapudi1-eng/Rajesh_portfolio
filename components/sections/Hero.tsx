'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import EcgLine from '@/components/ui/EcgLine'
import Button from '@/components/ui/Button'
import { SITE_META, STATS } from '@/lib/constants'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const role = SITE_META.roles[roleIndex]
    let timeout: NodeJS.Timeout
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % SITE_META.roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#050a0e',
        paddingTop: '5rem',
      }}
    >
      {/* Hex pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300d4ff' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 52px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow left */}
      <div style={{ position: 'absolute', top: '40%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Radial glow right */}
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Scan line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', animation: 'scanLine 6s linear infinite', opacity: 0.4, pointerEvents: 'none' }} />

      {/* Two-column layout */}
      <div
        style={{
          maxWidth: '82rem',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 2rem 6rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* LEFT — Text content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '1.25rem' }}
          >
            {'>'} US Healthcare Revenue Cycle Management
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #00d4ff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            {SITE_META.name.toUpperCase()}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 600, color: '#e8f4f8', marginBottom: '1.25rem', minHeight: '2.2rem', display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            <span>{displayed}</span>
            <span style={{ display: 'inline-block', width: '2px', height: '1.4em', backgroundColor: '#00d4ff', animation: 'blink 1s step-end infinite', marginLeft: '2px' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{ fontSize: '1rem', color: '#8ab4c8', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '38rem' }}
          >
            {SITE_META.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <Button onClick={() => handleScroll('#projects')} variant="primary">
              View My Work →
            </Button>
            <Button onClick={() => handleScroll('#contact')} variant="outline">
              Download Resume
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.5, ease: 'backOut' }}
                style={{
                  backgroundColor: 'rgba(10,22,40,0.85)',
                  border: '1px solid #1a3a5c',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.25rem',
                  textAlign: 'center',
                  minWidth: '90px',
                  backdropFilter: 'blur(8px)',
                  animation: 'pulseGlow 3s ease-in-out infinite',
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#00d4ff', lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8ab4c8', marginTop: '0.2rem', lineHeight: 1.3 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Profile photo */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ position: 'relative', width: '360px', height: '360px', animation: 'float 6s ease-in-out infinite' }}>
            {/* Outer ring */}
            <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px solid rgba(0,212,255,0.15)' }} />
            {/* Middle ring */}
            <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: '2px solid rgba(0,212,255,0.25)', animation: 'pulseGlow 3s ease-in-out infinite' }} />

            {/* Profile image */}
            <Image
              src="/assets/profile.png"
              alt="Rajesh Mullapudi"
              width={360}
              height={360}
              priority
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                border: '3px solid #00d4ff',
                boxShadow: '0 0 40px rgba(0,212,255,0.35)',
                display: 'block',
              }}
            />

            {/* Status badge */}
            <div style={{ position: 'absolute', bottom: '16px', right: '10px', backgroundColor: '#0a1628', border: '1px solid #00ff88', borderRadius: '9999px', padding: '0.3rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', boxShadow: '0 0 12px rgba(0,255,136,0.3)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88', display: 'inline-block', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              Available
            </div>

            {/* Floating tag — top left */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '10px', left: '-40px', backgroundColor: '#0a1628', border: '1px solid #1a3a5c', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00d4ff', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
            >
              🏥 R1 RCM
            </motion.div>

            {/* Floating tag — bottom left */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ position: 'absolute', bottom: '60px', left: '-55px', backgroundColor: '#0a1628', border: '1px solid #1a3a5c', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00ff88', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
            >
              📊 KPI Expert
            </motion.div>

            {/* Floating tag — top right */}
            <motion.div
              animate={{ y: [-3, 5, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ position: 'absolute', top: '40px', right: '-55px', backgroundColor: '#0a1628', border: '1px solid #1a3a5c', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#ff6b35', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
            >
              ⭐ CRCR Certified
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ECG line at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <EcgLine className="w-full" height={50} color="#00d4ff" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '4.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#4a7a9b', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em' }}
      >
        <span>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: '#00d4ff', fontSize: '1rem' }}>↓</motion.div>
      </motion.div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
          .hero-grid > div:last-child > div {
            width: 240px !important;
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  )
}
