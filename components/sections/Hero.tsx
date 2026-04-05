'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#050a0e',
        paddingTop: '5rem',
      }}
    >
      {/* Hex pattern background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%2300d4ff' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 52px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial gradient center glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scan line animation */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scanLine 6s linear infinite',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: '64rem',
          width: '100%',
          padding: '0 1.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#00d4ff',
            marginBottom: '1.25rem',
          }}
        >
          {'>'} US Healthcare Revenue Cycle Management
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
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

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(1.1rem, 3vw, 1.75rem)',
            fontWeight: 600,
            color: '#e8f4f8',
            marginBottom: '1.5rem',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          <span>{displayed}</span>
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.5em',
              backgroundColor: '#00d4ff',
              animation: 'blink 1s step-end infinite',
              marginLeft: '2px',
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            fontSize: '1rem',
            color: '#8ab4c8',
            maxWidth: '42rem',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          {SITE_META.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
        >
          <Button onClick={() => handleScroll('#projects')} variant="primary">
            View My Work →
          </Button>
          <Button onClick={() => handleScroll('#resume')} variant="outline">
            Download Resume
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.5, ease: 'backOut' }}
              style={{
                backgroundColor: 'rgba(10,22,40,0.8)',
                border: '1px solid #1a3a5c',
                borderRadius: '0.75rem',
                padding: '1rem 1.5rem',
                textAlign: 'center',
                minWidth: '130px',
                backdropFilter: 'blur(8px)',
                animation: 'pulseGlow 3s ease-in-out infinite',
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <p
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#00d4ff',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  color: '#8ab4c8',
                  marginTop: '0.25rem',
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ECG line at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <EcgLine className="w-full" height={50} color="#00d4ff" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#4a7a9b',
          fontSize: '0.7rem',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.15em',
        }}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: '#00d4ff', fontSize: '1rem' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
