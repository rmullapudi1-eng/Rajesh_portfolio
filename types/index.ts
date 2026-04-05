export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
  color: string
}

export interface Skill {
  label: string
  percent: number
  category: 'rcm' | 'analytics' | 'leadership'
}

export interface SkillCardItem {
  label: string
  description: string
  icon: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  image: string
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  purpose: string
  message: string
}

export interface ResumeFormData {
  name: string
  whatsapp: string
}
