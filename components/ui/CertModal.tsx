'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Certification } from '@/types'
import { modalOverlay, modalContent } from '@/lib/animations'

interface CertModalProps {
  cert: Certification | null
  onClose: () => void
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0a1628',
              border: `1px solid ${cert.color}`,
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '700px',
              width: '100%',
              boxShadow: `0 0 40px ${cert.color}40`,
              position: 'relative',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#8ab4c8',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0.25rem',
              }}
              aria-label="Close"
            >
              ×
            </button>

            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: cert.color,
                marginBottom: '0.5rem',
              }}
            >
              Certificate Verification
            </p>
            <h3
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#e8f4f8',
                marginBottom: '0.25rem',
              }}
            >
              {cert.name}
            </h3>
            <p style={{ color: '#8ab4c8', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Issued by {cert.issuer}
            </p>

            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                border: `1px solid ${cert.color}40`,
              }}
            >
              <Image
                src={cert.image}
                alt={cert.name}
                width={660}
                height={480}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                quality={90}
              />
            </div>

            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#00ff88',
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span>✓</span>
              <span>Certificate Verified — Rajesh Mullapudi</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
