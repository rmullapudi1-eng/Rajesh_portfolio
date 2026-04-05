'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { sendResumeGateEmail } from '@/lib/emailjs'
import { scaleIn } from '@/lib/animations'

export default function ResumeDownload() {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#050a0e',
    border: '1px solid #1a3a5c',
    borderRadius: '0.5rem',
    color: '#e8f4f8',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !whatsapp.trim()) {
      toast.error('Please enter your name and WhatsApp number.')
      return
    }

    setSubmitting(true)
    try {
      await sendResumeGateEmail({ visitor_name: name, whatsapp_number: whatsapp })
      setUnlocked(true)
      toast.success('Resume unlocked! Your download will start automatically.')
      setTimeout(() => downloadRef.current?.click(), 500)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="resume" style={{ backgroundColor: '#050a0e', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Resume</p>
          <h2 className="section-title">Download My Resume</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            Enter your details to unlock the resume. I&apos;ll reach out via WhatsApp to follow up.
          </p>
        </AnimatedSection>

        <AnimatedSection variants={scaleIn} className="">
          <div
            style={{
              backgroundColor: '#0a1628',
              border: '1px solid #1a3a5c',
              borderRadius: '1.25rem',
              padding: '2.5rem',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* BG glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <AnimatePresence mode="wait">
              {!unlocked ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  {/* Lock icon */}
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#0d1f3c',
                        border: '2px solid #1a3a5c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: '1.75rem',
                        animation: 'pulseGlow 3s ease-in-out infinite',
                      }}
                    >
                      🔒
                    </div>
                    <p style={{ color: '#8ab4c8', fontSize: '0.875rem' }}>
                      Please share your details to access the resume
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label
                        style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}
                      >
                        Your Full Name <span style={{ color: '#ff6b35' }}>*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                        onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                      />
                    </div>

                    <div>
                      <label
                        style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}
                      >
                        WhatsApp Number <span style={{ color: '#ff6b35' }}>*</span>
                      </label>
                      <input
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                        type="tel"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                        onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                      />
                      <p style={{ fontSize: '0.7rem', color: '#4a7a9b', marginTop: '0.35rem' }}>
                        Rajesh will connect with you on WhatsApp to share the resume personally.
                      </p>
                    </div>

                    <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
                      {submitting ? 'Unlocking...' : '🔓 Unlock & Download Resume'}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked"
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📄</div>
                  <h3
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#00ff88',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Resume Unlocked!
                  </h3>
                  <p style={{ color: '#8ab4c8', marginBottom: '2rem', lineHeight: 1.7 }}>
                    Your download should start automatically. Rajesh will also reach out to you on WhatsApp
                    at <strong style={{ color: '#e8f4f8' }}>{whatsapp}</strong>.
                  </p>
                  <Button
                    href="/assets/resume.pdf"
                    variant="primary"
                    className="justify-center"
                  >
                    ↓ Download Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden auto-download link */}
            <a
              ref={downloadRef}
              href="/assets/resume.pdf"
              download="Rajesh_Mullapudi_Resume.pdf"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        </AnimatedSection>

        {/* Resume preview info */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            backgroundColor: '#0a1628',
            border: '1px solid #1a3a5c',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8f4f8' }}>
              Rajesh Mullapudi — Resume
            </p>
            <p style={{ fontSize: '0.75rem', color: '#8ab4c8', fontFamily: 'JetBrains Mono, monospace' }}>
              PDF • Senior RCM Operations Leader • 12+ Years Experience
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: '#00d4ff',
                backgroundColor: 'rgba(0,212,255,0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px',
              }}
            >
              Latest
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
