'use client'

import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { fadeInLeft, fadeInRight } from '@/lib/animations'

const METRICS = [
  { value: '12+', label: 'Years of RCM Experience', color: '#00d4ff' },
  { value: '130+', label: 'FTEs Under Management', color: '#00ff88' },
  { value: '9', label: 'Active Client Projects', color: '#ff6b35' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{ backgroundColor: '#050a0e', padding: '6rem 1.5rem', position: 'relative' }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Profile Image */}
          <AnimatedSection variants={fadeInLeft} className="">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '300px',
                  height: '300px',
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                {/* Glow rings */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '50%',
                    border: '2px solid rgba(0,212,255,0.3)',
                    animation: 'pulseGlow 3s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '-24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0,212,255,0.1)',
                  }}
                />
                <Image
                  src="/assets/profile.png"
                  alt="Rajesh Mullapudi"
                  width={300}
                  height={300}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    border: '3px solid #00d4ff',
                    boxShadow: '0 0 30px rgba(0,212,255,0.4)',
                  }}
                  priority
                />

                {/* Status badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: '#0a1628',
                    border: '1px solid #00ff88',
                    borderRadius: '9999px',
                    padding: '0.3rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.7rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#00ff88',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#00ff88',
                      animation: 'pulseGlow 2s ease-in-out infinite',
                    }}
                  />
                  Available
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Bio Content */}
          <AnimatedSection variants={fadeInRight} className="">
            <p className="section-label">About Me</p>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Driving Revenue Cycle Excellence
            </h2>

            <div style={{ color: '#8ab4c8', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                I am a Senior US Healthcare Revenue Cycle Management professional with over{' '}
                <strong style={{ color: '#e8f4f8' }}>12 years of progressive experience</strong> across AR operations,
                Prior Authorization lifecycle management, and Quality governance in US healthcare.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Currently at{' '}
                <strong style={{ color: '#00d4ff' }}>R1 RCM</strong>, I lead 9 AR and Prior Authorization
                projects with a span of <strong style={{ color: '#e8f4f8' }}>130+ FTEs</strong>, owning complete
                delivery, financial performance, and operational governance across multi-specialty physician groups.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                My expertise spans end-to-end AR lifecycle management, payer escalation resolution, client onboarding
                transitions, denial trend analysis, and SLA/KPI governance — translating operational complexity into
                measurable financial performance improvement.
              </p>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#0a1628',
                    border: `1px solid ${m.color}30`,
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    minWidth: '100px',
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: m.color,
                      lineHeight: 1,
                    }}
                  >
                    {m.value}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#8ab4c8', marginTop: '0.25rem', lineHeight: 1.3 }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
