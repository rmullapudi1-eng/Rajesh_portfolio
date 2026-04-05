'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  variants?: Variants
  threshold?: number
  id?: string
  delay?: number
}

export default function AnimatedSection({
  children,
  className = '',
  style,
  variants = fadeInUp,
  threshold = 0.15,
  id,
  delay = 0,
}: AnimatedSectionProps) {
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
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const v: Variants = {
    hidden: variants.hidden ?? { opacity: 0, y: 30 },
    visible: {
      ...(typeof variants.visible === 'object' ? variants.visible : {}),
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
        ...(typeof variants.visible === 'object' && 'transition' in variants.visible
          ? (variants.visible as { transition?: object }).transition
          : {}),
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      variants={v}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
