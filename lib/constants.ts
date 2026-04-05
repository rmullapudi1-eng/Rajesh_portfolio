import type { Experience, Skill, SkillCardItem, Certification, Project } from '@/types'

export const SITE_META = {
  name: 'Rajesh Mullapudi',
  title: 'Senior RCM Operations Leader',
  tagline: 'Transforming Revenue Cycles. Driving Operational Excellence.',
  roles: [
    'Senior RCM Operations Leader',
    'US Healthcare AR Specialist',
    'Prior Authorization Expert',
    'KPI Dashboard Architect',
    'RCM Process Optimizer',
  ],
  linkedin: 'https://linkedin.com/in/rajeshmullapudi',
}

export const STATS = [
  { value: '12+', label: 'Years RCM Experience' },
  { value: '130+', label: 'FTEs Led' },
  { value: '9', label: 'Active Projects' },
  { value: '5', label: 'Certifications' },
]

export const EXPERIENCE: Experience[] = [
  {
    id: 'r1-rcm',
    company: 'R1 RCM',
    role: 'Operations Manager',
    period: 'Aug 2023 – Present',
    location: 'Hyderabad, India',
    highlights: [
      'Lead 9 AR and Prior Authorization projects with 130+ FTEs, owning delivery, financial performance, quality, and operational governance',
      'Govern SLAs and KPIs including TAT, aging, collections, denial ratios, appeal success rate, and compliance metrics',
      'Drive cash acceleration by reducing high-aging inventory through strategic queue prioritization and structured denial management',
      'Oversee end-to-end AR lifecycle: claim follow-ups, denial resolution, underpayment analysis, appeals tracking, payer negotiations',
      'Own complete Prior Authorization workflows: benefits verification, authorization initiation, clinical documentation validation, P2P coordination',
      'Lead client onboarding initiatives with cross-functional coordination, FTE ramp-up, and stabilization',
      'Present performance dashboards and governance reports to leadership and clients',
    ],
    color: '#00d4ff',
  },
  {
    id: 'reventics',
    company: 'Reventics / Omega Healthcare',
    role: 'Team Lead – Delivery',
    period: 'Jul 2022 – Aug 2023',
    location: 'Hyderabad, India',
    highlights: [
      'Managed AR and authorization teams ensuring SLA adherence and quality benchmarks',
      'Handled payer escalations, productivity optimization, and performance improvement initiatives',
      'Conducted performance reviews, mentoring, and capability development sessions',
    ],
    color: '#00ff88',
  },
  {
    id: 'omega-qa',
    company: 'Omega Healthcare',
    role: 'Quality Analyst',
    period: 'Jun 2018 – Jan 2022',
    location: 'Hyderabad, India',
    highlights: [
      'Performed audits across AR and authorization processes to ensure compliance with payer guidelines',
      'Identified systemic process gaps and implemented corrective action frameworks to improve accuracy',
    ],
    color: '#ff6b35',
  },
  {
    id: 'phycare',
    company: 'Phycare',
    role: 'Senior Analyst',
    period: 'Oct 2014 – May 2018',
    location: 'Hyderabad, India',
    highlights: [
      'Handled end-to-end AR operations including claims follow-up, denial management, and payer communications',
      'Contributed to process improvements that enhanced first-pass resolution rates',
    ],
    color: '#8b5cf6',
  },
  {
    id: 'vision2k',
    company: 'Vision 2K',
    role: 'Senior AR Associate',
    period: 'Jan 2013 – Sep 2014',
    location: 'Hyderabad, India',
    highlights: [
      'Managed accounts receivable for US healthcare clients with focus on timely collections',
      'Developed strong foundation in payer-specific billing requirements and denial workflows',
    ],
    color: '#f59e0b',
  },
]

export const SKILLS: Skill[] = [
  { label: 'End-to-End AR Operations', percent: 97, category: 'rcm' },
  { label: 'Prior Authorization Lifecycle', percent: 95, category: 'rcm' },
  { label: 'Denial Management & Appeals', percent: 96, category: 'rcm' },
  { label: 'KPI Dashboard Development', percent: 92, category: 'analytics' },
  { label: 'SLA / KPI Governance', percent: 95, category: 'rcm' },
  { label: 'MS Excel (Advanced)', percent: 93, category: 'analytics' },
  { label: 'Power BI Reporting', percent: 80, category: 'analytics' },
  { label: 'Team Leadership & Coaching', percent: 90, category: 'leadership' },
]

export const SKILL_CARDS: SkillCardItem[] = [
  {
    label: 'KPI Dashboard Specialist',
    description: 'Design and deliver executive-level KPI dashboards tracking AR aging, denial ratios, collection rates, and payer mix using Excel and Power BI.',
    icon: '📊',
  },
  {
    label: 'RCM Problem Solver',
    description: 'Deep expertise in diagnosing and resolving complex RCM challenges — from payer credentialing gaps to authorization workflow bottlenecks.',
    icon: '🔍',
  },
  {
    label: 'Payer Relations Expert',
    description: 'Skilled in payer escalation management, portal access coordination, and submission route alignment across major US healthcare payers.',
    icon: '🏥',
  },
  {
    label: 'Process Governance',
    description: 'Design SOP frameworks and corrective action plans that stabilize operations, improve first-pass yield, and ensure payer compliance.',
    icon: '⚙️',
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'crcr',
    name: 'Certified Revenue Cycle Representative (CRCR)',
    issuer: 'HFMA',
    image: '/assets/certifications/crcr.png',
    color: '#00d4ff',
  },
  {
    id: 'csapm',
    name: 'Certified Specialist Ambulatory Practice Management (CSAPM)',
    issuer: 'MGMA',
    image: '/assets/certifications/csapm.png',
    color: '#00ff88',
  },
  {
    id: 'quality',
    name: 'Quality Certification',
    issuer: 'Omega Healthcare',
    image: '/assets/certifications/quality.jpg',
    color: '#ff6b35',
  },
  {
    id: 'ai-fluency',
    name: 'Anthropic AI Fluency',
    issuer: 'Anthropic',
    image: '/assets/certifications/ai-fluency.jpeg',
    color: '#8b5cf6',
  },
  {
    id: 'be10x',
    name: 'Be10X Certification',
    issuer: 'Be10X',
    image: '/assets/certifications/be10x.png',
    color: '#f59e0b',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'deck-01',
    title: 'Month-End RCM Performance Deck',
    description: 'Executive-level month-end KPI analysis covering AR aging buckets, denial trend tracking, and collection performance across multi-specialty physician groups.',
    image: '/assets/projects/deck-01.jpg',
    tags: ['KPI Analysis', 'AR Aging', 'Executive Reporting'],
  },
  {
    id: 'deck-02',
    title: 'Denial Trend & Root Cause Analysis',
    description: 'Comprehensive denial categorization with root cause analysis, payer-specific denial patterns, and corrective action recommendations.',
    image: '/assets/projects/deck-02.jpg',
    tags: ['Denial Management', 'Root Cause Analysis', 'Payer Analytics'],
  },
  {
    id: 'deck-03',
    title: 'Prior Authorization Workflow Metrics',
    description: 'Authorization approval rates, P2P success metrics, submission timeline analysis, and workflow optimization opportunities.',
    image: '/assets/projects/deck-03.jpg',
    tags: ['Prior Auth', 'Workflow Metrics', 'Approval Rates'],
  },
  {
    id: 'deck-04',
    title: 'Collections & Cash Flow Dashboard',
    description: 'Cash flow acceleration analysis, high-aging inventory reduction strategy, and collections performance by payer and specialty.',
    image: '/assets/projects/deck-04.jpg',
    tags: ['Collections', 'Cash Flow', 'Payer Mix'],
  },
  {
    id: 'deck-05',
    title: 'Team Productivity & SLA Compliance',
    description: 'FTE productivity metrics, SLA adherence tracking, quality scores, and capacity utilization analysis across all active projects.',
    image: '/assets/projects/deck-05.jpg',
    tags: ['Productivity', 'SLA Compliance', 'Quality Metrics'],
  },
  {
    id: 'deck-06',
    title: 'Payer Escalation & Resolution Tracker',
    description: 'Active payer escalation log, resolution timelines, credentialing gap analysis, and portal access status reporting.',
    image: '/assets/projects/deck-06.jpg',
    tags: ['Payer Escalations', 'Credentialing', 'Resolution Tracking'],
  },
  {
    id: 'deck-07',
    title: 'Client Onboarding Transition Report',
    description: 'Client onboarding milestone tracking, risk/issue log, FTE ramp-up progress, and BAU stabilization readiness assessment.',
    image: '/assets/projects/deck-07.jpg',
    tags: ['Client Onboarding', 'Transition', 'BAU Stabilization'],
  },
]
