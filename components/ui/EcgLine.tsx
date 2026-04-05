'use client'

interface EcgLineProps {
  color?: string
  className?: string
  width?: number
  height?: number
}

export default function EcgLine({
  color = '#00d4ff',
  className = '',
  width = 1200,
  height = 60,
}: EcgLineProps) {
  const path =
    'M0,30 L100,30 L115,30 L120,8 L128,52 L136,8 L144,52 L152,30 L170,30 L175,30 L180,20 L185,40 L190,30 L220,30 L225,30 L230,8 L238,52 L246,8 L254,52 L262,30 L280,30 L350,30 L355,30 L360,8 L368,52 L376,8 L384,52 L392,30 L410,30 L500,30 L505,30 L510,8 L518,52 L526,8 L534,52 L542,30 L560,30 L700,30 L705,30 L710,8 L718,52 L726,8 L734,52 L742,30 L760,30 L900,30 L905,30 L910,8 L918,52 L926,8 L934,52 L942,30 L960,30 L1200,30'

  const pathLength = 3000

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        style={{
          animation: 'ecgDraw 4s ease-in-out infinite',
        }}
        opacity="0.7"
      />
      <path
        d={path}
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.15"
      />
    </svg>
  )
}
