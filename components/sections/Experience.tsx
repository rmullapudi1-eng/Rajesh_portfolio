'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { EXPERIENCE } from '@/lib/constants'
import { fadeInUp, staggerContainer, timelineItem } from '@/lib/animations'

export default function Experience() {
  return (
    <section id="experience" style={{ backgroundColor: '#050a0e', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Career Journey</p>
          <h2 className="section-title">Professional Experience</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            12+ years of progressive growth in US Healthcare Revenue Cycle Management
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #00d4ff, #00ff88, #ff6b35, #8b5cf6, #f59e0b)',
              opacity: 0.4,
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            {EXPERIENCE.map((exp, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={exp.id}
                  variants={timelineItem}
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    position: 'relative',
                  }}
                >
                  {/* Dot on timeline */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '1.5rem',
                      transform: 'translateX(-50%)',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: exp.color,
                      border: '3px solid #050a0e',
                      boxShadow: `0 0 12px ${exp.color}80`,
                      zIndex: 1,
                    }}
                  />

                  {/* Card — takes up ~45% width on each side */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      width: 'calc(50% - 2rem)',
                      backgroundColor: '#0a1628',
                      border: `1px solid ${exp.color}30`,
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = exp.color + '80'
                      el.style.boxShadow = `0 8px 32px ${exp.color}20`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = exp.color + '30'
                      el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Period tag */}
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.7rem',
                        color: exp.color,
                        letterSpacing: '0.1em',
                        backgroundColor: exp.color + '15',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        display: 'inline-block',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {exp.period}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#e8f4f8',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: exp.color,
                        fontWeight: 500,
                        marginBottom: '1rem',
                      }}
                    >
                      {exp.role}
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {exp.highlights.slice(0, 3).map((h, hi) => (
                        <li
                          key={hi}
                          style={{
                            fontSize: '0.8rem',
                            color: '#8ab4c8',
                            lineHeight: 1.6,
                            marginBottom: '0.4rem',
                            paddingLeft: '1rem',
                            position: 'relative',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: exp.color,
                              fontWeight: 700,
                            }}
                          >
                            ›
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile timeline fallback */}
      <style>{`
        @media (max-width: 640px) {
          #experience .timeline-card { width: calc(100% - 2rem) !important; margin-left: 2rem; }
        }
      `}</style>
    </section>
  )
}
