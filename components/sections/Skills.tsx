'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SkillBar from '@/components/ui/SkillBar'
import { SKILLS, SKILL_CARDS } from '@/lib/constants'
import { fadeInLeft, fadeInRight, staggerContainer, scaleIn } from '@/lib/animations'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const rcmSkills = SKILLS.filter((s) => s.category === 'rcm')
  const analyticsSkills = SKILLS.filter((s) => s.category !== 'rcm')

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        backgroundColor: '#0a1628',
        padding: '6rem 1.5rem',
        position: 'relative',
      }}
    >
      {/* BG glow */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <AnimatedSection className="" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills & Competencies</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem', maxWidth: '40rem', margin: '0.75rem auto 0' }}>
            Specialized in US Healthcare RCM operations with proven analytical and leadership capabilities.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
          }}
        >
          {/* Skill Bars */}
          <AnimatedSection variants={fadeInLeft} className="">
            <h3
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#e8f4f8',
                marginBottom: '1.5rem',
                borderBottom: '1px solid #1a3a5c',
                paddingBottom: '0.75rem',
              }}
            >
              RCM Operations
            </h3>
            {rcmSkills.map((skill, i) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                percent={skill.percent}
                color="#00d4ff"
                inView={inView}
                delay={i * 0.12}
              />
            ))}

            <h3
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#e8f4f8',
                marginBottom: '1.5rem',
                marginTop: '2rem',
                borderBottom: '1px solid #1a3a5c',
                paddingBottom: '0.75rem',
              }}
            >
              Analytics & Leadership
            </h3>
            {analyticsSkills.map((skill, i) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                percent={skill.percent}
                color={skill.category === 'analytics' ? '#00ff88' : '#ff6b35'}
                inView={inView}
                delay={rcmSkills.length * 0.12 + i * 0.12}
              />
            ))}
          </AnimatedSection>

          {/* Skill Cards */}
          <AnimatedSection variants={fadeInRight} className="">
            <h3
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#e8f4f8',
                marginBottom: '1.5rem',
                borderBottom: '1px solid #1a3a5c',
                paddingBottom: '0.75rem',
              }}
            >
              Core Strengths
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {SKILL_CARDS.map((card) => (
                <motion.div
                  key={card.label}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02, borderColor: '#00d4ff' }}
                  style={{
                    backgroundColor: '#050a0e',
                    border: '1px solid #1a3a5c',
                    borderRadius: '0.875rem',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '1.75rem', lineHeight: 1, flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#e8f4f8',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {card.label}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#8ab4c8', lineHeight: 1.6 }}>
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
