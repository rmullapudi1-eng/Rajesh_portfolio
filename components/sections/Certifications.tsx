'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CertModal from '@/components/ui/CertModal'
import { CERTIFICATIONS } from '@/lib/constants'
import type { Certification } from '@/types'
import { staggerContainer, scaleIn } from '@/lib/animations'

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <section id="certifications" style={{ backgroundColor: '#0a1628', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certifications</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            Click <strong style={{ color: '#00d4ff' }}>Verify</strong> to view the certificate
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              variants={scaleIn}
              whileHover={{ scale: 1.04, y: -4 }}
              style={{
                backgroundColor: '#050a0e',
                border: `1px solid ${cert.color}30`,
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                cursor: 'default',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = cert.color + '70'
                el.style.boxShadow = `0 8px 32px ${cert.color}20`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = cert.color + '30'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Badge preview */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: `2px solid ${cert.color}40`,
                  flexShrink: 0,
                  boxShadow: `0 0 16px ${cert.color}30`,
                }}
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={80}
                  height={80}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#e8f4f8',
                    lineHeight: 1.3,
                    marginBottom: '0.25rem',
                  }}
                >
                  {cert.name}
                </p>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    color: cert.color,
                    letterSpacing: '0.1em',
                  }}
                >
                  {cert.issuer}
                </p>
              </div>

              <button
                onClick={() => setSelectedCert(cert)}
                style={{
                  padding: '0.4rem 1.25rem',
                  borderRadius: '9999px',
                  border: `1px solid ${cert.color}`,
                  backgroundColor: 'transparent',
                  color: cert.color,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = cert.color
                  el.style.color = '#050a0e'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'transparent'
                  el.style.color = cert.color
                }}
              >
                ✓ Verify
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  )
}
