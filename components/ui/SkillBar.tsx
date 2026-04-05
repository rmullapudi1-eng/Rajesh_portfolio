'use client'

import { motion } from 'framer-motion'
import { skillBarFill } from '@/lib/animations'

interface SkillBarProps {
  label: string
  percent: number
  color?: string
  inView: boolean
  delay?: number
}

export default function SkillBar({ label, percent, color = '#00d4ff', inView, delay = 0 }: SkillBarProps) {
  const fill = skillBarFill(percent)

  const filledVariant = {
    hidden: { width: '0%' },
    visible: {
      width: `${percent}%`,
      transition: { duration: 1.4, ease: 'easeOut' as const, delay },
    },
  }

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#e8f4f8', fontWeight: 500 }}
        >
          {label}
        </span>
        <span
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: color, fontWeight: 500 }}
        >
          {percent}%
        </span>
      </div>
      <div
        style={{
          height: '6px',
          borderRadius: '9999px',
          backgroundColor: '#0d1f3c',
          overflow: 'hidden',
          border: '1px solid #1a3a5c',
        }}
      >
        <motion.div
          variants={filledVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            height: '100%',
            borderRadius: '9999px',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}
