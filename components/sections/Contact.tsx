'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { sendContactEmail, sendOTPEmail } from '@/lib/emailjs'
import type { ContactFormData } from '@/types'

const PURPOSES = ['General Inquiry', 'Recruitment / Hiring', 'Partnership / Collaboration', 'Other']

const CONTACT_HIGHLIGHTS = [
  { icon: '🏥', label: 'US Healthcare RCM', sub: 'AR, Prior Auth, Denials' },
  { icon: '📊', label: 'KPI Dashboards', sub: 'Excel, Power BI' },
  { icon: '👥', label: 'Team Leadership', sub: '130+ FTEs managed' },
  { icon: '🎯', label: 'Process Excellence', sub: 'SLA governance' },
]

// OTP expires in 10 minutes
const OTP_EXPIRY_MS = 10 * 60 * 1000

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
  })

  // OTP state
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState('')
  const [sendingOtp, setSendingOtp] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const otpRef = useRef<{ code: string; expiry: number } | null>(null)
  const cooldownRef = useRef<NodeJS.Timeout | null>(null)

  // Form submit state
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          clearInterval(cooldownRef.current!)
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  const handleSendOTP = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please enter your name and email first.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setSendingOtp(true)
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      otpRef.current = { code, expiry: Date.now() + OTP_EXPIRY_MS }

      await sendOTPEmail({
        user_name: form.name,
        user_email: form.email,
        otp_code: code,
      })

      setOtpSent(true)
      setOtpInput('')
      setOtpError('')
      startCooldown(60)
      toast.success(`Verification code sent to ${form.email}`)
    } catch {
      toast.error('Failed to send code. Please try again.')
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOTP = () => {
    if (!otpRef.current) return
    if (Date.now() > otpRef.current.expiry) {
      setOtpError('Code expired. Please request a new one.')
      otpRef.current = null
      return
    }
    if (otpInput.trim() !== otpRef.current.code) {
      setOtpError('Incorrect code. Please try again.')
      return
    }
    setOtpVerified(true)
    setOtpError('')
    toast.success('Email verified! You can now send your message.')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.purpose) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (!otpVerified) {
      toast.error('Please verify your email first.')
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

  const resetForm = () => {
    setSubmitted(false)
    setOtpSent(false)
    setOtpVerified(false)
    setOtpInput('')
    setOtpError('')
    otpRef.current = null
    setForm({ name: '', email: '', phone: '', purpose: '', message: '' })
  }

  return (
    <section id="contact" style={{ backgroundColor: '#0a1628', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p style={{ color: '#8ab4c8', marginTop: '0.75rem' }}>
            Interested in connecting? Verify your email and send a message.
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
                      <p style={{ fontSize: '0.7rem', color: '#8ab4c8', fontFamily: 'JetBrains Mono, monospace' }}>
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
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── SUCCESS STATE ── */
                <motion.div
                  key="success"
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
                    Thank you, {form.name}! Rajesh will review your message and respond to{' '}
                    <strong style={{ color: '#e8f4f8' }}>{form.email}</strong> shortly.
                  </p>
                  <Button onClick={resetForm} variant="outline">
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                /* ── FORM STATE ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                  {/* Step indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    {[
                      { n: 1, label: 'Details' },
                      { n: 2, label: 'Verify Email' },
                      { n: 3, label: 'Send' },
                    ].map((step, i) => {
                      const done =
                        (step.n === 1 && (otpSent || otpVerified)) ||
                        (step.n === 2 && otpVerified)
                      const active =
                        (step.n === 1 && !otpSent) ||
                        (step.n === 2 && otpSent && !otpVerified) ||
                        (step.n === 3 && otpVerified)
                      return (
                        <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: done ? '#00ff88' : active ? '#00d4ff' : '#1a3a5c',
                              color: done || active ? '#050a0e' : '#4a7a9b',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              transition: 'all 0.3s',
                            }}
                          >
                            {done ? '✓' : step.n}
                          </div>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: active ? '#00d4ff' : done ? '#00ff88' : '#4a7a9b',
                              fontFamily: 'JetBrains Mono, monospace',
                              transition: 'color 0.3s',
                            }}
                          >
                            {step.label}
                          </span>
                          {i < 2 && (
                            <div
                              style={{
                                flex: 1,
                                height: '1px',
                                backgroundColor: done ? '#00ff88' : '#1a3a5c',
                                minWidth: '20px',
                                transition: 'background-color 0.3s',
                              }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Name + Email — always visible */}
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
                        disabled={otpSent}
                        style={{ ...inputStyle, opacity: otpSent ? 0.6 : 1 }}
                        onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                        onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#8ab4c8', marginBottom: '0.4rem' }}>
                        Email Address <span style={{ color: '#ff6b35' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          disabled={otpSent}
                          style={{ ...inputStyle, opacity: otpSent ? 0.6 : 1, paddingRight: otpVerified ? '2.5rem' : '1rem' }}
                          onFocus={(e) => (e.target.style.borderColor = '#00d4ff')}
                          onBlur={(e) => (e.target.style.borderColor = '#1a3a5c')}
                        />
                        {otpVerified && (
                          <span
                            style={{
                              position: 'absolute',
                              right: '0.75rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: '#00ff88',
                              fontSize: '1rem',
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* OTP Section */}
                  <AnimatePresence>
                    {!otpVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                          backgroundColor: '#0a1628',
                          border: '1px solid #1a3a5c',
                          borderRadius: '0.75rem',
                          padding: '1rem',
                          overflow: 'hidden',
                        }}
                      >
                        {!otpSent ? (
                          /* Send OTP button */
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                            <div>
                              <p style={{ fontSize: '0.8rem', color: '#e8f4f8', fontWeight: 600, marginBottom: '0.2rem' }}>
                                Verify your email
                              </p>
                              <p style={{ fontSize: '0.72rem', color: '#8ab4c8' }}>
                                We&apos;ll send a 6-digit code to confirm your email is real.
                              </p>
                            </div>
                            <Button
                              type="button"
                              onClick={handleSendOTP}
                              disabled={sendingOtp}
                              variant="outline"
                            >
                              {sendingOtp ? 'Sending...' : 'Send Code →'}
                            </Button>
                          </div>
                        ) : (
                          /* Enter OTP */
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                          >
                            <p style={{ fontSize: '0.8rem', color: '#e8f4f8', fontWeight: 600 }}>
                              Enter the 6-digit code sent to{' '}
                              <span style={{ color: '#00d4ff' }}>{form.email}</span>
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                              <div style={{ flex: 1, minWidth: '160px' }}>
                                <input
                                  value={otpInput}
                                  onChange={(e) => {
                                    setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))
                                    setOtpError('')
                                  }}
                                  placeholder="000000"
                                  maxLength={6}
                                  style={{
                                    ...inputStyle,
                                    letterSpacing: '0.3em',
                                    fontSize: '1.1rem',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    textAlign: 'center',
                                    borderColor: otpError ? '#ff6b35' : '#1a3a5c',
                                  }}
                                  onFocus={(e) => (e.target.style.borderColor = otpError ? '#ff6b35' : '#00d4ff')}
                                  onBlur={(e) => (e.target.style.borderColor = otpError ? '#ff6b35' : '#1a3a5c')}
                                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOTP()}
                                />
                                {otpError && (
                                  <p style={{ fontSize: '0.72rem', color: '#ff6b35', marginTop: '0.3rem' }}>
                                    {otpError}
                                  </p>
                                )}
                              </div>
                              <Button type="button" onClick={handleVerifyOTP} variant="primary">
                                Verify
                              </Button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                              <p style={{ fontSize: '0.7rem', color: '#4a7a9b' }}>
                                Code valid for 10 minutes. Check spam if not received.
                              </p>
                              <button
                                type="button"
                                onClick={() => { setOtpSent(false); setOtpInput(''); setOtpError('') }}
                                disabled={resendCooldown > 0}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: resendCooldown > 0 ? '#4a7a9b' : '#00d4ff',
                                  fontSize: '0.72rem',
                                  cursor: resendCooldown > 0 ? 'default' : 'pointer',
                                  textDecoration: 'underline',
                                  padding: 0,
                                  fontFamily: 'Inter, sans-serif',
                                }}
                              >
                                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Rest of form — shown only after OTP verified */}
                  <AnimatePresence>
                    {otpVerified && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                      >
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
                          * Your contact details are not publicly displayed.
                        </p>

                        <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
                          {submitting ? 'Sending...' : 'Send Message →'}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
