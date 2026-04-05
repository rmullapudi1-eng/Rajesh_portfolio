'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { PROJECTS } from '@/lib/constants'
import { modalOverlay, modalContent } from '@/lib/animations'

export default function Projects() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = () => setActive((a) => (a - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setActive((a) => (a + 1) % PROJECTS.length)

  const project = PROJECTS[active]

  return (
    <section id="projects" style={{ backgroundColor: '#050a0e', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">Projects</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            Month-End RCM Performance Analysis Deck — Executive reporting & KPI dashboards
          </p>
        </AnimatedSection>

        {/* Main carousel */}
        <div
          style={{
            backgroundColor: '#0a1628',
            border: '1px solid #1a3a5c',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Image area */}
          <div
            style={{ position: 'relative', paddingBottom: '50%', cursor: 'zoom-in', backgroundColor: '#0d1f3c' }}
            onClick={() => setLightbox(active)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'contain', padding: '0.5rem' }}
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>

            {/* Expand hint */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#8ab4c8',
                fontSize: '0.7rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '0.375rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              🔍 Click to expand
            </div>

            {/* Counter */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#8ab4c8',
                fontSize: '0.75rem',
                padding: '0.3rem 0.7rem',
                borderRadius: '9999px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {active + 1} / {PROJECTS.length}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '1.5rem 2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.65rem',
                        color: '#00d4ff',
                        backgroundColor: 'rgba(0,212,255,0.1)',
                        border: '1px solid rgba(0,212,255,0.2)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#e8f4f8',
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#8ab4c8', lineHeight: 1.7 }}>
                  {project.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div
            style={{
              padding: '1rem 2rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #1a3a5c',
            }}
          >
            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: i === active ? '#00d4ff' : '#1a3a5c',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[{ fn: prev, label: '←' }, { fn: next, label: '→' }].map(({ fn, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #1a3a5c',
                    backgroundColor: '#050a0e',
                    color: '#8ab4c8',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = '#00d4ff'
                    el.style.color = '#00d4ff'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = '#1a3a5c'
                    el.style.color = '#8ab4c8'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.25rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                width: '80px',
                height: '60px',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: i === active ? '2px solid #00d4ff' : '2px solid #1a3a5c',
                padding: 0,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                position: 'relative',
                boxShadow: i === active ? '0 0 12px rgba(0,212,255,0.4)' : 'none',
              }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.92)',
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
              style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
            >
              <Image
                src={PROJECTS[lightbox].image}
                alt={PROJECTS[lightbox].title}
                width={1200}
                height={800}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '0.75rem',
                  border: '1px solid #1a3a5c',
                }}
                quality={95}
              />
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '-1rem',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0a1628',
                  border: '1px solid #1a3a5c',
                  color: '#e8f4f8',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
