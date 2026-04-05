'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { sendContactEmail } from '@/lib/emailjs'
import type { ContactFormData } from '@/types'

const PURPOSES = ['General Inquiry', 'Recruitment / Hiring', 'Partnership / Collaboration', 'Other']

const CONTACT_HIGHLIGHTS = [
  { icon: '🏥', label: 'US Healthcare RCM', sub: 'AR, Prior Auth, Denials' },
  { icon: '📊', label: 'KPI Dashboards', sub: 'Excel, Power BI' },
  { icon: '👥', label: 'Team Leadership', sub: '130+ FTEs managed' },
  { icon: '🎯', label: 'Process Excellence', sub: 'SLA governance' },
]

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.purpose) {
      toast.error('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    try {
      await sendContactEmail({
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        purpose: form.purpose,
        message: form.message,
      })
      setSubmitted(true)
      toast.success('Message sent! Rajesh will get back to you soon.')
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

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

  return (
    <section id="contact" style={{ backgroundColor: '#0a1628', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            Interested in connecting? Send a message and I&apos;ll respond promptly.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left panel */}
          <AnimatedSection variants={undefined} className="">
            <div
              style={{
                backgroundColor: '#050a0e',
                border: '1px solid #1a3a5c',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#e8f4f8',
                  marginBottom: '0.5rem',
                }}
              >
                Rajesh Mullapudi
              </h3>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#00d4ff',
                  letterSpacing: '0.1em',
                  marginBottom: '1.5rem',
                }}
              >
                Senior RCM Operations Leader
              </p>
              <p style={{ color: '#8ab4c8', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Open to roles in US Healthcare RCM leadership, consulting, and operational excellence.
                Based in Hyderabad, India with extensive experience serving US clients.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {CONTACT_HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.75rem',
                      backgroundColor: '#0a1628',
                      borderRadius: '0.5rem',
                      border: '1px solid #1a3a5c',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{h.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8f4f8' }}>{h.label}</p>
                      <p
                        style={{
                          fontSize: '0.7rem',
                          color: '#8ab4c8',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {h.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #1a3a5c' }}>
                <a
                  href="https://linkedin.com/in/rajeshmullapudi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#00d4ff',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <span>🔗</span>
                  <span>linkedin.com/in/rajeshmullapudi</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variants={undefined} delay={0.2} className="">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  backgroundColor: '#050a0e',
                  border: '1px solid #00ff88',
                  borderRadius: '1rem',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 0 30px rgba(0,255,136,0.15)',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#00ff88',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: '#8ab4c8', marginBottom: '1.5rem' }}>
                  Thank you, {form.name}! Rajesh will review your message and respond to {form.email} shortly.
                </p>
                <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', purpose: '', message: '' }) }} variant="outline">
                  Send Another
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#050a0e',
                  border: '1px solid #1a3a5c',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                      Full Name <span style={{ color: '#ff6b35' }}>*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                      onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                      Email Address <span style={{ color: '#ff6b35' }}>*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                      onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                    />
                  </div>
                </div>

                {/* Phone + Purpose */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                      Phone Number <span style={{ color: '#ff6b35' }}>*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      required
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                      onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                      Purpose <span style={{ color: '#ff6b35' }}>*</span>
                    </label>
                    <select
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                      onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                    >
                      <option value="" disabled>Select purpose</option>
                      {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                    Message <span style={{ color: '#4a7a9b' }}>(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me more about your inquiry..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                    onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                  />
                </div>

                <p style={{ fontSize: '0.7rem', color: '#4a7a9b' }}>
                  * Your contact details are not publicly displayed. You will be contacted privately.
                </p>

                <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
                  {submitting ? 'Sending...' : 'Send Message →'}
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
